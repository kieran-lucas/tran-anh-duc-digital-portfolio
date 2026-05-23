import { defineConfig } from 'astro/config';
import { readFile, writeFile } from 'node:fs/promises';

const portfolioUiStylesheet = '<link rel="stylesheet" href="/portfolio-ui.css?v=20260524-refactor-v1" data-portfolio-ui="true" />';
const reflectionMotionStylesheet = '<link rel="stylesheet" href="/reflection-motion.css?v=20260524-variable-aurora-v8" data-reflection-motion="true" />';
const portfolioRuntimeScript = '<script src="/portfolio-runtime.js?v=20260524-no-repaint-v5" defer data-portfolio-runtime="true"></script>';

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
  background:linear-gradient(135deg,#0a6dff 0%,#10baf2 46%,#3979ff 72%,#675cff 100%)!important;
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
  inset:-55%!important;
  z-index:0!important;
  pointer-events:none!important;
  border-radius:42%!important;
  opacity:.72!important;
  mix-blend-mode:screen!important;
  background:
    radial-gradient(ellipse at 18% 72%,rgba(0,78,255,.52),transparent 31%),
    radial-gradient(ellipse at 78% 22%,rgba(64,232,255,.58),transparent 30%),
    radial-gradient(ellipse at 78% 82%,rgba(132,94,255,.48),transparent 32%),
    radial-gradient(ellipse at 42% 48%,rgba(0,180,255,.34),transparent 34%)!important;
  transform:translate3d(-4%,-2%,0) scale(1.02) rotate(0deg)!important;
  animation:reflectionSheetDrift 13s cubic-bezier(.45,0,.2,1) infinite alternate!important;
  will-change:transform,opacity!important;
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
@keyframes reflectionSheetDrift{
  0%{transform:translate3d(-6%,-3%,0) scale(1.02) rotate(0deg);opacity:.58;}
  40%{transform:translate3d(4%,3%,0) scale(1.07) rotate(4deg);opacity:.78;}
  100%{transform:translate3d(11%,-1%,0) scale(1.04) rotate(-3deg);opacity:.64;}
}
@media(max-width:720px){
  #reflection .reflection-layout{padding:8px!important;margin:-8px!important;}
  #reflection .reflection-visual:hover,#reflection .reflection-visual:focus-within{transform:translate3d(2px,-2px,0) scale(1.003)!important;}
}
</style>`;

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
