import { defineConfig } from 'astro/config';
import { readFile, writeFile } from 'node:fs/promises';

const portfolioUiStylesheet = '<link rel="stylesheet" href="/portfolio-ui.css?v=20260524-refactor-v1" data-portfolio-ui="true" />';
const portfolioRuntimeScript = '<script src="/portfolio-runtime.js?v=20260524-ambient-v12" defer data-portfolio-runtime="true"></script>';

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
  padding:14px!important;
  margin:-14px!important;
}
#reflection .reflection-visual{
  position:relative!important;
  overflow:hidden!important;
  isolation:isolate!important;
  transform:translate3d(0,0,0) scale(1)!important;
  transform-style:flat!important;
  transform-origin:50% 50%!important;
  background:linear-gradient(135deg,#0a6dff 0%,#10baf2 46%,#3979ff 72%,#675cff 100%)!important;
  animation:none!important;
  transition:transform .58s cubic-bezier(.16,1,.3,1),box-shadow .50s cubic-bezier(.22,1,.36,1),border-color .34s ease!important;
  will-change:transform!important;
  backface-visibility:hidden!important;
}
#reflection .reflection-visual:hover,
#reflection .reflection-visual:focus-within{
  transform:translate3d(0,-4px,0) scale(1.006)!important;
  border-color:rgba(255,255,255,.66)!important;
  box-shadow:0 22px 48px rgba(0,122,255,.16),0 8px 20px rgba(20,90,180,.08),inset 0 1px 0 rgba(255,255,255,.66),inset 0 -14px 30px rgba(255,255,255,.085)!important;
}
#reflection .reflection-color-field{display:none!important;}
#reflection .reflection-visual::before{
  content:""!important;
  position:absolute!important;
  inset:-28%!important;
  z-index:0!important;
  pointer-events:none!important;
  opacity:1!important;
  mix-blend-mode:screen!important;
  background:
    radial-gradient(46% 50% at 24% 26%,rgba(80,230,255,1),rgba(80,230,255,0) 58%),
    radial-gradient(48% 50% at 78% 24%,rgba(180,120,255,.98),rgba(180,120,255,0) 58%),
    radial-gradient(44% 46% at 28% 80%,rgba(180,120,255,.94),rgba(180,120,255,0) 60%),
    radial-gradient(42% 44% at 82% 78%,rgba(80,230,255,1),rgba(80,230,255,0) 60%)!important;
  transform:translate3d(0,0,0) scale(1.06);
  animation:reflectionAmbientDriftA 9s cubic-bezier(.42,0,.58,1) infinite alternate!important;
  will-change:transform,opacity!important;
  backface-visibility:hidden!important;
}
#reflection .reflection-ambient-sheet{
  position:absolute!important;
  inset:-22%!important;
  z-index:0!important;
  display:block!important;
  pointer-events:none!important;
  opacity:.92!important;
  mix-blend-mode:screen!important;
  background:
    radial-gradient(42% 46% at 50% 46%,rgba(150,240,255,.95),rgba(150,240,255,0) 60%),
    radial-gradient(40% 42% at 20% 70%,rgba(190,130,255,.90),rgba(190,130,255,0) 60%),
    radial-gradient(42% 44% at 84% 18%,rgba(60,235,255,.92),rgba(60,235,255,0) 60%)!important;
  transform:translate3d(0,0,0) scale(1.08);
  animation:reflectionAmbientDriftB 14s cubic-bezier(.42,0,.58,1) infinite alternate!important;
  will-change:transform,opacity!important;
  backface-visibility:hidden!important;
}
#reflection .reflection-visual::after{
  content:""!important;
  position:absolute!important;
  inset:0!important;
  z-index:1!important;
  pointer-events:none!important;
  border-radius:inherit!important;
  opacity:.22!important;
  background:linear-gradient(135deg,rgba(255,255,255,.32),rgba(255,255,255,.06) 32%,rgba(255,255,255,0) 64%),radial-gradient(ellipse at 76% 8%,rgba(255,255,255,.20),transparent 44%),radial-gradient(ellipse at 18% 98%,rgba(255,255,255,.10),transparent 52%)!important;
  animation:reflectionSoftBreath 9s ease-in-out infinite alternate!important;
}
#reflection .reflection-visual .mono,
#reflection .reflection-visual h3{
  position:relative!important;
  z-index:2!important;
}
@keyframes reflectionAmbientDriftA{
  0%  {transform:translate3d(-14%,-9%,0) scale(1.04);opacity:.88;}
  25% {transform:translate3d( 10%,-5%,0) scale(1.12);opacity:1;}
  50% {transform:translate3d( 14%, 10%,0) scale(1.06);opacity:.92;}
  75% {transform:translate3d(-9%, 11%,0) scale(1.14);opacity:.98;}
  100%{transform:translate3d( 7%,-3%,0) scale(1.08);opacity:.90;}
}
@keyframes reflectionAmbientDriftB{
  0%  {transform:translate3d( 11%, 9%,0) scale(1.06);opacity:.78;}
  33% {transform:translate3d(-8%, 5%,0) scale(1.03);opacity:.94;}
  66% {transform:translate3d(-12%,-10%,0) scale(1.10);opacity:.82;}
  100%{transform:translate3d( 9%,-7%,0) scale(1.08);opacity:.90;}
}
@keyframes reflectionSoftBreath{
  0%{opacity:.16;}
  100%{opacity:.28;}
}
@media(max-width:720px){
  #reflection .reflection-layout{padding:10px!important;margin:-10px!important;}
  #reflection .reflection-visual:hover,#reflection .reflection-visual:focus-within{transform:translate3d(0,-3px,0) scale(1.004)!important;}
}
@media(prefers-reduced-motion:reduce){
  #reflection .reflection-visual::before,
  #reflection .reflection-visual::after,
  #reflection .reflection-ambient-sheet{animation:none!important;}
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
  next = next.replace('</head>', `${portfolioUiStylesheet}\n${reflectionStabilizerStyle}\n  </head>`);
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
