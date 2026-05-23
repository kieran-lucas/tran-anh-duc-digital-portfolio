import { defineConfig } from 'astro/config';
import { readFile, writeFile } from 'node:fs/promises';

const portfolioUiStylesheet = '<link rel="stylesheet" href="/portfolio-ui.css?v=20260524-refactor-v1" data-portfolio-ui="true" />';
const reflectionMotionStylesheet = '<link rel="stylesheet" href="/reflection-motion.css?v=20260524-variable-aurora-v8" data-reflection-motion="true" />';
const portfolioRuntimeScript = '<script src="/portfolio-runtime.js?v=20260524-ambient-sheet-v6" defer data-portfolio-runtime="true"></script>';

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
  transform:none!important;
  transform-origin:center center!important;
  background:linear-gradient(135deg,#0a6dff 0%,#10baf2 46%,#3979ff 72%,#675cff 100%)!important;
  animation:none!important;
  transition:box-shadow .56s cubic-bezier(.22,1,.36,1),border-color .36s ease,filter .42s ease!important;
  will-change:auto!important;
}
#reflection .reflection-visual:hover,
#reflection .reflection-visual:focus-within{
  transform:none!important;
  filter:saturate(1.035) brightness(1.015)!important;
  border-color:rgba(255,255,255,.66)!important;
  box-shadow:0 18px 42px rgba(0,122,255,.14),0 8px 18px rgba(20,90,180,.06),inset 0 1px 0 rgba(255,255,255,.62),inset 0 -14px 30px rgba(255,255,255,.08)!important;
}
#reflection .reflection-color-field{display:none!important;}
#reflection .reflection-ambient-sheet{
  position:absolute!important;
  inset:-72%!important;
  z-index:0!important;
  display:block!important;
  pointer-events:none!important;
  border-radius:38%!important;
  opacity:.82!important;
  mix-blend-mode:screen!important;
  background:
    radial-gradient(ellipse at 16% 72%,rgba(0,70,255,.68),transparent 28%),
    radial-gradient(ellipse at 80% 20%,rgba(72,238,255,.74),transparent 27%),
    radial-gradient(ellipse at 82% 84%,rgba(142,92,255,.62),transparent 30%),
    radial-gradient(ellipse at 44% 48%,rgba(0,180,255,.42),transparent 32%)!important;
  transform:translate3d(-8%,-4%,0) scale(1.04) rotate(0deg)!important;
  animation:reflectionAmbientSheetDrift 9.5s cubic-bezier(.45,0,.2,1) infinite alternate!important;
  will-change:transform,opacity!important;
}
#reflection .reflection-visual::before{
  content:""!important;
  position:absolute!important;
  inset:0!important;
  z-index:1!important;
  pointer-events:none!important;
  border-radius:inherit!important;
  opacity:.22!important;
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
  opacity:.14!important;
  background:radial-gradient(ellipse at 50% 50%,rgba(255,255,255,.16),transparent 62%)!important;
  animation:reflectionSoftBreath 7s ease-in-out infinite alternate!important;
}
#reflection .reflection-visual .mono,
#reflection .reflection-visual h3{
  position:relative!important;
  z-index:2!important;
}
@keyframes reflectionAmbientSheetDrift{
  0%{transform:translate3d(-10%,-5%,0) scale(1.04) rotate(0deg);opacity:.70;}
  38%{transform:translate3d(1%,3%,0) scale(1.08) rotate(5deg);opacity:.88;}
  72%{transform:translate3d(9%,1%,0) scale(1.06) rotate(-4deg);opacity:.78;}
  100%{transform:translate3d(14%,-3%,0) scale(1.05) rotate(3deg);opacity:.84;}
}
@keyframes reflectionSoftBreath{
  0%{opacity:.10;}
  100%{opacity:.18;}
}
@media(max-width:720px){
  #reflection .reflection-layout{padding:8px!important;margin:-8px!important;}
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
