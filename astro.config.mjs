import { defineConfig } from 'astro/config';
import { readFile, writeFile } from 'node:fs/promises';

const portfolioUiStylesheet = '<link rel="stylesheet" href="/portfolio-ui.css?v=20260524-refactor-v1" data-portfolio-ui="true" />';
const reflectionMotionStylesheet = '<link rel="stylesheet" href="/reflection-motion.css?v=20260524-variable-aurora-v8" data-reflection-motion="true" />';
const portfolioRuntimeScript = '<script src="/portfolio-runtime.js?v=20260524-variable-aurora-v4" defer data-portfolio-runtime="true"></script>';

const reflectionStabilizerStyle = `<style data-reflection-stabilizer="true">
#reflection{
  content-visibility:visible!important;
  contain:none!important;
  contain-intrinsic-size:auto!important;
  overflow:visible!important;
}
#reflection .container,
#reflection .reflection-layout{
  overflow:visible!important;
}
#reflection .reflection-layout{
  padding:18px!important;
  margin:-18px!important;
}
#reflection .reflection-visual{
  position:relative!important;
  overflow:hidden!important;
  isolation:isolate!important;
  transform-origin:65% 50%!important;
  background-image:
    radial-gradient(ellipse at 18% 76%,rgba(0,92,255,.50),transparent 43%),
    radial-gradient(ellipse at 82% 22%,rgba(40,220,255,.52),transparent 41%),
    radial-gradient(ellipse at 78% 86%,rgba(118,92,255,.42),transparent 43%),
    linear-gradient(135deg,#0a6dff 0%,#10baf2 46%,#3979ff 72%,#675cff 100%)!important;
  background-size:100% 100%!important;
  background-position:0 0!important;
  animation:none!important;
  transition:transform .72s cubic-bezier(.16,1,.3,1),box-shadow .56s cubic-bezier(.22,1,.36,1),border-color .36s ease!important;
  will-change:transform!important;
}
#reflection .reflection-visual:hover,
#reflection .reflection-visual:focus-within{
  transform:translate3d(5px,-3px,0) scale(1.006)!important;
  border-color:rgba(255,255,255,.64)!important;
  box-shadow:0 15px 34px rgba(0,122,255,.125),0 7px 16px rgba(20,90,180,.055),inset 0 1px 0 rgba(255,255,255,.60),inset 0 -14px 30px rgba(255,255,255,.075)!important;
}
#reflection .reflection-color-field{display:none!important;}
#reflection .reflection-visual::before{
  content:""!important;
  position:absolute!important;
  inset:-10%!important;
  z-index:0!important;
  pointer-events:none!important;
  border-radius:inherit!important;
  opacity:.24!important;
  mix-blend-mode:screen!important;
  background:radial-gradient(ellipse at 24% 70%,rgba(0,92,255,.26),transparent 54%),radial-gradient(ellipse at 74% 24%,rgba(58,232,255,.28),transparent 54%),radial-gradient(ellipse at 78% 78%,rgba(130,100,255,.20),transparent 58%)!important;
  transform:translate3d(0,0,0) scale(1.02)!important;
  animation:reflectionStabilizedVeil 18s cubic-bezier(.45,0,.2,1) infinite alternate!important;
}
#reflection .reflection-visual::after{
  content:""!important;
  position:absolute!important;
  inset:0!important;
  z-index:1!important;
  pointer-events:none!important;
  border-radius:inherit!important;
  opacity:.24!important;
  background:linear-gradient(135deg,rgba(255,255,255,.27),rgba(255,255,255,.07) 30%,rgba(255,255,255,0) 62%),radial-gradient(ellipse at 76% 8%,rgba(255,255,255,.17),transparent 44%),radial-gradient(ellipse at 18% 98%,rgba(255,255,255,.09),transparent 50%)!important;
}
#reflection .reflection-visual .mono,
#reflection .reflection-visual h3{
  position:relative!important;
  z-index:2!important;
}
@keyframes reflectionStabilizedVeil{
  0%{transform:translate3d(-1%,-1%,0) scale(1.02);opacity:.21;}
  50%{transform:translate3d(2%,2%,0) scale(1.04);opacity:.29;}
  100%{transform:translate3d(4%,-1%,0) scale(1.025);opacity:.24;}
}
@media(max-width:720px){
  #reflection .reflection-layout{padding:8px!important;margin:-8px!important;}
  #reflection .reflection-visual:hover,#reflection .reflection-visual:focus-within{transform:translate3d(2px,-2px,0) scale(1.003)!important;}
}
</style>`;

const reflectionStabilizerScript = `<script data-reflection-stabilizer="true">
(() => {
  const visual = document.querySelector('#reflection .reflection-visual');
  if (!visual || visual.dataset.stabilizedAurora === 'true') return;
  visual.dataset.stabilizedAurora = 'true';
  visual.dataset.runtimeAurora = 'true';

  let raf = 0;
  let last = 0;
  const start = performance.now();
  const pct = (value) => value.toFixed(2) + '%';

  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    if (document.hidden || now - last < 42) return;
    last = now;
    const t = (now - start) / 1000;

    const p1x = 18 + Math.sin(t * 0.48) * 30;
    const p1y = 76 + Math.cos(t * 0.40) * 13;
    const p2x = 82 + Math.cos(t * 0.46 + 0.7) * 23;
    const p2y = 22 + Math.sin(t * 0.52 + 0.4) * 18;
    const p3x = 78 + Math.sin(t * 0.42 + 1.6) * 22;
    const p3y = 86 + Math.cos(t * 0.36 + 1.1) * 13;

    visual.style.setProperty('background-image',
      'radial-gradient(ellipse at ' + pct(p1x) + ' ' + pct(p1y) + ',rgba(0,92,255,.50),transparent 43%),' +
      'radial-gradient(ellipse at ' + pct(p2x) + ' ' + pct(p2y) + ',rgba(40,220,255,.52),transparent 41%),' +
      'radial-gradient(ellipse at ' + pct(p3x) + ' ' + pct(p3y) + ',rgba(118,92,255,.42),transparent 43%),' +
      'linear-gradient(135deg,#0a6dff 0%,#10baf2 46%,#3979ff 72%,#675cff 100%)',
      'important'
    );
  };

  raf = requestAnimationFrame(tick);
  window.addEventListener('pagehide', () => cancelAnimationFrame(raf), { once:true });
})();
</script>`;

const cleanupPatterns = [
  /\s*<style\s+data-reflection-stabilizer=["']true["'][\s\S]*?<\/style>\s*/gi,
  /\s*<script\s+data-reflection-stabilizer=["']true["'][\s\S]*?<\/script>\s*/gi
];

const legacyAssetPatterns = [
  /\s*<link[^>]+href=["']\/premium-interactions\.css[^"']*["'][^>]*>\s*/gi,
  /\s*<link[^>]+href=["']\/lower-section-polish\.css[^"']*["'][^>]*>\s*/gi,
  /\s*<link[^>]+href=["']\/rubric-matrix-v2\.css[^"']*["'][^>]*>\s*/gi,
  /\s*<link[^>]+href=["']\/hero-title-animation\.css[^"']*["'][^>]*>\s*/gi,
  /\s*<link[^>]+href=["']\/profile-card-hover-fix\.css[^"']*["'][^>]*>\s*/gi,
  /\s*<link[^>]+href=["']\/reflection-luxury\.css[^"']*["'][^>]*>\s*/gi,
  /\s*<link[^>]+href=["']\/reflection-aurora-fix\.css[^"']*["'][^>]*>\s*/gi,
  /\s*<link[^>]+href=["']\/reflection-motion\.css[^"']*["'][^>]*>\s*/gi,
  /\s*<script[^>]+src=["']\/reflection-luxury\.js[^"']*["'][^>]*><\/script>\s*/gi,
  /\s*<style\s+data-final-cursor-policy=["']true["'][\s\S]*?<\/style>\s*/gi,
  /\s*<script\s+data-final-cursor-policy=["']true["'][\s\S]*?<\/script>\s*/gi,
  /\s*<script\s+data-anchor-calibration=["']true["'][\s\S]*?<\/script>\s*/gi
];

const removePatterns = (html, patterns) => patterns.reduce((next, pattern) => next.replace(pattern, '\n'), html);

const injectOnce = (html, marker, closingTag, asset) => {
  if (html.includes(marker)) return html;
  return html.replace(closingTag, `${asset}\n  ${closingTag}`);
};

const enhance = (html) => {
  let next = removePatterns(html, cleanupPatterns);
  next = removePatterns(next, legacyAssetPatterns);
  next = injectOnce(next, 'data-portfolio-ui="true"', '</head>', portfolioUiStylesheet);
  next = injectOnce(next, 'data-reflection-motion="true"', '</head>', reflectionMotionStylesheet);
  next = next.replace('</head>', `${reflectionStabilizerStyle}\n  </head>`);
  next = injectOnce(next, 'data-portfolio-runtime="true"', '</body>', portfolioRuntimeScript);
  next = next.replace('</body>', `${reflectionStabilizerScript}\n  </body>`);
  return next;
};

const portfolioIntegration = () => ({
  name: 'portfolio-runtime-integration',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const file = new URL('index.html', dir);
      const html = await readFile(file, 'utf8');
      const next = enhance(html);
      if (next !== html) await writeFile(file, next, 'utf8');
    }
  }
});

const portfolioVitePlugin = () => ({
  name: 'portfolio-runtime-vite-plugin',
  transformIndexHtml(html) {
    return enhance(html);
  }
});

export default defineConfig({
  output: 'static',
  site: 'https://tran-anh-duc-portfolio.vercel.app',
  integrations: [portfolioIntegration()],
  vite: {
    plugins: [portfolioVitePlugin()]
  }
});
