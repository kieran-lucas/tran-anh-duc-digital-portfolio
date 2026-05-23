import { defineConfig } from 'astro/config';
import { readFile, writeFile } from 'node:fs/promises';

const anchorCalibrationScript = `
<script data-anchor-calibration="true">
(() => {
  const SHIFT_RATIO = 0.125;
  const TOP_GAP = 22;

  const topbar = () => document.querySelector('.topbar');
  const navLinks = () => [...document.querySelectorAll('.nav a')];
  const targetFor = (hash) => {
    if (!hash || hash === '#') return null;
    if (hash === '#top') return document.getElementById('top') || document.body;
    return document.querySelector(hash);
  };
  const chromeOffset = () => Math.ceil((topbar()?.getBoundingClientRect().height || 70) + TOP_GAP);
  const upwardShift = () => Math.round(window.innerHeight * SHIFT_RATIO);
  const targetScrollY = (target, hash) => {
    if (!target || hash === '#top') return 0;
    return Math.max(0, target.getBoundingClientRect().top + window.scrollY - chromeOffset() + upwardShift());
  };
  const scrollToHash = (hash, updateUrl = true) => {
    const target = targetFor(hash);
    if (!target) return false;
    const y = targetScrollY(target, hash);
    window.scrollTo({ top: y, behavior: 'smooth' });
    if (updateUrl) history.replaceState(null, '', hash);
    window.setTimeout(() => {
      const corrected = targetScrollY(target, hash);
      if (Math.abs(window.scrollY - corrected) > 4) window.scrollTo({ top: corrected, behavior: 'auto' });
    }, 620);
    return true;
  };

  document.addEventListener('click', (event) => {
    const anchor = event.target?.closest?.('a[href^="#"]');
    if (!anchor) return;
    const hash = anchor.getAttribute('href');
    if (!targetFor(hash)) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    scrollToHash(hash, true);
  }, true);

  const updateActive = () => {
    const links = navLinks();
    const probe = window.scrollY + chromeOffset() - upwardShift() + 8;
    let current = links[0];
    for (const link of links) {
      const target = targetFor(link.getAttribute('href'));
      if (target && probe >= target.offsetTop) current = link;
    }
    for (const link of links) link.classList.toggle('is-active', link === current);
  };
  let raf = 0;
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(() => { raf = 0; updateActive(); });
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();
  if (window.location.hash) window.setTimeout(() => scrollToHash(window.location.hash, false), 160);
})();
</script>
`;

const heroTitleStylesheet = `<link rel="stylesheet" href="/hero-title-animation.css" data-hero-title-animation="true" />`;

const anchorCalibrationIntegration = () => ({
  name: 'anchor-calibration-integration',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const file = new URL('index.html', dir);
      let html = await readFile(file, 'utf8');
      if (!html.includes('data-hero-title-animation="true"')) {
        html = html.replace('</head>', `${heroTitleStylesheet}\n  </head>`);
      }
      if (!html.includes('data-anchor-calibration="true"')) {
        html = html.replace('</body>', `${anchorCalibrationScript}\n  </body>`);
      }
      await writeFile(file, html, 'utf8');
    }
  }
});

const anchorCalibrationVitePlugin = () => ({
  name: 'anchor-calibration-vite-plugin',
  transformIndexHtml(html) {
    let next = html;
    if (!next.includes('data-hero-title-animation="true"')) {
      next = next.replace('</head>', `${heroTitleStylesheet}\n  </head>`);
    }
    if (!next.includes('data-anchor-calibration="true"')) {
      next = next.replace('</body>', `${anchorCalibrationScript}\n  </body>`);
    }
    return next;
  }
});

export default defineConfig({
  output: 'static',
  site: 'https://tran-anh-duc-portfolio.vercel.app',
  integrations: [anchorCalibrationIntegration()],
  vite: {
    plugins: [anchorCalibrationVitePlugin()]
  }
});
