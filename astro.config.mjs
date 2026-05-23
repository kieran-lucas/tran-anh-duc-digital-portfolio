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
  const contentsTargetY = () => {
    const toc = document.querySelector('.toc');
    const tocTop = toc?.getBoundingClientRect?.().top;
    const safeTop = chromeOffset() + 18;
    return Math.max(safeTop, Number.isFinite(tocTop) ? tocTop : safeTop);
  };
  const targetScrollY = (target, hash, source) => {
    if (!target || hash === '#top') return 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    if (source?.closest?.('.toc')) {
      return Math.max(0, targetTop - contentsTargetY());
    }
    return Math.max(0, targetTop - chromeOffset() + upwardShift());
  };
  const scrollToHash = (hash, updateUrl = true, source = null) => {
    const target = targetFor(hash);
    if (!target) return false;
    const y = targetScrollY(target, hash, source);
    window.scrollTo({ top: y, behavior: 'smooth' });
    if (updateUrl) history.replaceState(null, '', hash);
    window.setTimeout(() => {
      const corrected = targetScrollY(target, hash, source);
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
    scrollToHash(hash, true, anchor);
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

const heroTitleStylesheet = `<link rel="stylesheet" href="/hero-title-animation.css?v=20260524-sweep-v3" data-hero-title-animation="true" />`;
const profileCardHoverFixStylesheet = `<link rel="stylesheet" href="/profile-card-hover-fix.css?v=20260523-clipfix" data-profile-card-hover-fix="true" />`;
const reflectionLuxuryStylesheet = `<link rel="stylesheet" href="/reflection-luxury.css?v=20260524-1" data-reflection-luxury="true" />`;
const reflectionAuroraFixStylesheet = `<link rel="stylesheet" href="/reflection-aurora-fix.css?v=20260524-aurora-v5" data-reflection-aurora-fix="true" />`;
const reflectionLuxuryScript = `<script src="/reflection-luxury.js?v=20260524-1" defer data-reflection-luxury="true"></script>`;

const cursorPolicy = `
<style data-final-cursor-policy="true">
html,
body,
body * {
  cursor: default !important;
}

:is(a, button, [role="button"], summary, .brand, .btn, .top-action, .action-link, .panel-cta, .nav a, .toc a),
:is(a, button, [role="button"], summary, .brand, .btn, .top-action, .action-link, .panel-cta, .nav a, .toc a) *,
:is(a, button, [role="button"], summary, .brand, .btn, .top-action, .action-link, .panel-cta, .nav a, .toc a)::before,
:is(a, button, [role="button"], summary, .brand, .btn, .top-action, .action-link, .panel-cta, .nav a, .toc a)::after {
  cursor: pointer !important;
}
</style>
<script data-final-cursor-policy="true">
(() => {
  const interactiveSelector = 'a,button,[role="button"],summary,.brand,.btn,.top-action,.action-link,.panel-cta,.nav a,.toc a';
  const applyCursorPolicy = () => {
    document.querySelectorAll('body *').forEach((node) => node.style.setProperty('cursor', 'default', 'important'));
    document.querySelectorAll(interactiveSelector).forEach((root) => {
      root.style.setProperty('cursor', 'pointer', 'important');
      root.querySelectorAll('*').forEach((child) => child.style.setProperty('cursor', 'pointer', 'important'));
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyCursorPolicy, { once: true });
  else applyCursorPolicy();
  new MutationObserver(applyCursorPolicy).observe(document.documentElement, { childList: true, subtree: true });
})();
</script>
`;

const enhance = (html) => {
  let next = html;
  if (!next.includes('data-hero-title-animation="true"')) {
    next = next.replace('</head>', `${heroTitleStylesheet}\n  </head>`);
  }
  if (!next.includes('data-profile-card-hover-fix="true"')) {
    next = next.replace('</head>', `${profileCardHoverFixStylesheet}\n  </head>`);
  }
  if (!next.includes('data-reflection-luxury="true"')) {
    next = next.replace('</head>', `${reflectionLuxuryStylesheet}\n  </head>`);
    next = next.replace('</body>', `${reflectionLuxuryScript}\n  </body>`);
  }
  if (!next.includes('data-reflection-aurora-fix="true"')) {
    next = next.replace('</head>', `${reflectionAuroraFixStylesheet}\n  </head>`);
  }
  if (!next.includes('data-final-cursor-policy="true"')) {
    next = next.replace('</body>', `${cursorPolicy}\n  </body>`);
  }
  if (!next.includes('data-anchor-calibration="true"')) {
    next = next.replace('</body>', `${anchorCalibrationScript}\n  </body>`);
  }
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
