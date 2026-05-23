import { defineConfig } from 'astro/config';
import { readFile, writeFile } from 'node:fs/promises';

const portfolioUiStylesheet = '<link rel="stylesheet" href="/portfolio-ui.css?v=20260524-refactor-v1" data-portfolio-ui="true" />';
const reflectionMotionStylesheet = '<link rel="stylesheet" href="/reflection-motion.css?v=20260524-calm-aurora-v5" data-reflection-motion="true" />';
const portfolioRuntimeScript = '<script src="/portfolio-runtime.js?v=20260524-real-aurora-v2" defer data-portfolio-runtime="true"></script>';

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

const removeLegacyAssets = (html) => legacyAssetPatterns.reduce((next, pattern) => next.replace(pattern, '\n'), html);

const injectOnce = (html, marker, closingTag, asset) => {
  if (html.includes(marker)) return html;
  return html.replace(closingTag, `${asset}\n  ${closingTag}`);
};

const enhance = (html) => {
  let next = removeLegacyAssets(html);
  next = injectOnce(next, 'data-portfolio-ui="true"', '</head>', portfolioUiStylesheet);
  next = injectOnce(next, 'data-reflection-motion="true"', '</head>', reflectionMotionStylesheet);
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
