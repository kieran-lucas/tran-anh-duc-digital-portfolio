import { defineConfig } from 'astro/config';
import { readFile, writeFile } from 'node:fs/promises';

const portfolioUiStylesheet = '<link rel="stylesheet" href="/portfolio-ui.css?v=20260524-refactor-v1" data-portfolio-ui="true" />';
const reflectionMotionStylesheet = '<link rel="stylesheet" href="/reflection-motion.css?v=20260524-final-sheet-v9" data-reflection-motion="true" />';
const portfolioRuntimeScript = '<script src="/portfolio-runtime.js?v=20260524-ambient-sheet-v7" defer data-portfolio-runtime="true"></script>';

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
  transform:translate3d(0,0,0) scale(1)!important;
  transform-origin:center center!important;
  background:linear-gradient(135deg,#0a6dff 0%,#10baf2 46%,#3979ff 72%,#675cff 100%)!important;
  animation:none!important;
  transition:transform .62s cubic-bezier(.16,1,.3,1),box-shadow .54s cubic-bezier(.22,1,.36,1),border-color .34s ease,filter .34s ease!important;
  will-change:transform!important;
}
#reflection .reflection-visual:hover,
#reflection .reflection-visual:focus-within{
  transform:translate3d(3px,-3px,0) scale(1.006)!important;
  filter:saturate(1.025) brightness(1.01)!important;
  border-color:rgba(255,255,255,.67)!important;
  box-shadow:0 18px 42px rgba(0,122,255,.14),0 8px 18px rgba(20,90,180,.06),inset 0 1px 0 rgba(255,255,255,.62),inset 0 -14px 30px rgba(255,255,255,.08)!important;
}
#reflection .reflection-color-field{display:none!important;}
#reflection .reflection-ambient-sheet{
  position:absolute!important;
  inset:-78%!important;
  z-index:0!important;
  display:block!important;
  pointer-events:none!important;
  border-radius:36%!important;
  opacity:.96!important;
  mix-blend-mode:screen!important;
  background:
    conic-gradient(from 20deg at 50% 50%,rgba(0,78,255,.70),rgba(72,238,255,.76),rgba(142,92,255,.66),rgba(0,180,255,.46),rgba(0,78,255,.70)),
    radial-gradient(ellipse at 20% 76%,rgba(0,70,255,.62),transparent 30%),
    radial-gradient(ellipse at 84% 18%,rgba(72,238,255,.70),transparent 28%),
    radial-gradient(ellipse at 82% 84%,rgba(142,92,255,.58),transparent 31%)!important;
  transform:translate3d(-10%,-5%,0) scale(1.05) rotate(0deg)!important;
  animation:reflectionAmbientSheetDrift 7.8s cubic-bezier(.45,0,.2,1) infinite alternate!important;
  will-change:transform,opacity!important;
}
#reflection .reflection-visual::before{
  content:""!important;
  position:absolute!important;
  inset:0!important;
  z-index:1!important;
  pointer-events:none!important;
  border-radius:inherit!important;
  opacity:.20!important;
  background:linear-gradient(135deg,rgba(255,255,255,.25),rgba(255,255,255,.07) 30%,rgba(255,255,255,0) 62%),radial-gradient(ellipse at 76% 8%,rgba(255,255,255,.16),transparent 44%),radial-gradient(ellipse at 18% 98%,rgba(255,255,255,.08),transparent 50%)!important;
  transform:none!important;
  animation:none!important;
}
#reflection .reflection-visual::after{
  content:""!important;
  position:absolute!important;
  inset:0!important;
  z-index:1!important;
  pointer-events:none!important;
  border-radius:inherit!important;
  opacity:.12!important;
  background:radial-gradient(ellipse at 50% 50%,rgba(255,255,255,.16),transparent 62%)!important;
  animation:reflectionSoftBreath 7s ease-in-out infinite alternate!important;
}
#reflection .reflection-visual .mono,
#reflection .reflection-visual h3{
  position:relative!important;
  z-index:2!important;
}
@keyframes reflectionAmbientSheetDrift{
  0%{transform:translate3d(-12%,-6%,0) scale(1.05) rotate(0deg);opacity:.74;}
  32%{transform:translate3d(-1%,4%,0) scale(1.09) rotate(9deg);opacity:.98;}
  66%{transform:translate3d(10%,1%,0) scale(1.07) rotate(-7deg);opacity:.86;}
  100%{transform:translate3d(16%,-4%,0) scale(1.06) rotate(5deg);opacity:.94;}
}
@keyframes reflectionSoftBreath{
  0%{opacity:.09;}
  100%{opacity:.16;}
}
@media(max-width:720px){
  #reflection .reflection-layout{padding:8px!important;margin:-8px!important;}
  #reflection .reflection-visual:hover,#reflection .reflection-visual:focus-within{transform:translate3d(2px,-2px,0) scale(1.003)!important;}
}
</style>`;

const cleanupPatterns = [
  /\s*<style\s+data-reflection-stabilizer=["']true["'][\s\S]*?<\/style>\s*/gi,
  /\s*<script\s+data-reflection-stabilizer=["']true["'][\s\S]*?<\/script>\s*/gi,
  /\s*<link[^>]+data-portfolio-ui=["']true["'][^>]*>\s*/gi,
  /\s*<link[^>]+data-reflection-motion=["']true["'][^>]*>\s*/gi,
  /\s*<script[^>]+data-portfolio-runtime=["']true["'][^>]*><\/script>\s*/gi
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

const enhance = (html) => {
  let next = removePatterns(html, cleanupPatterns);
  next = removePatterns(next, legacyAssetPatterns);
  next = next.replace('</head>', `${portfolioUiStylesheet}\n${reflectionMotionStylesheet}\n${reflectionStabilizerStyle}\n  </head>`);
  next = next.replace('</body>', `${portfolioRuntimeScript}\n  </body>`);
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
