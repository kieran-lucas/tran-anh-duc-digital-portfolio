(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hoverFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const externalIcon = '<svg class="premium-external-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 17L17 7"/><path d="M9 7h8v8"/></svg>';
  const tocIcon = '<svg class="premium-toc-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';
  const githubIcon = '<svg class="github-btn-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M12 .75A11.25 11.25 0 0 0 8.44 22.67c.56.1.77-.24.77-.54v-1.9c-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1.01 1.72 2.64 1.22 3.28.94.1-.73.4-1.22.72-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.7 10.7 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.32-2.64 5.27-5.15 5.55.41.35.77 1.04.77 2.1v3.12c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z"/></svg>';

  const enhanceIcons = () => {
    const topAction = document.querySelector('.top-action');
    if (topAction && !topAction.querySelector('.github-btn-icon')) {
      topAction.innerHTML = `${githubIcon}<span>GitHub</span>${externalIcon}`;
    }

    document.querySelectorAll('.action-link,.panel-cta').forEach((link) => {
      if (link.querySelector('.premium-external-icon')) return;
      const label = link.textContent.replace(/[↗↘]/g, '').trim();
      link.innerHTML = `<span>${label}</span>${externalIcon}`;
    });

    document.querySelectorAll('.toc a').forEach((link) => {
      if (link.querySelector('.premium-toc-icon')) return;
      const spans = [...link.querySelectorAll('span')];
      const last = spans[spans.length - 1];
      if (last && /^[↗↘→]+$/.test(last.textContent.trim())) {
        last.outerHTML = tocIcon;
      }
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhanceIcons, { once: true });
  else enhanceIcons();

  if (prefersReduced || !hoverFine) return;

  const selectors = [
    '.btn', '.top-action', '.action-link', '.panel-cta',
    '.nav a', '.toc a', '.tool', '.pill',
    '.glass', '.mission-card', '.principle', '.rubric-row',
    '.profile-card', '.terminal-card', '.mini-stat', '.quality-item',
    '.copy-note', '.mission-panel', '.evidence-item'
  ].join(',');

  const cardSelectors = [
    '.glass', '.mission-card', '.principle', '.rubric-row',
    '.profile-card', '.terminal-card', '.mini-stat', '.quality-item',
    '.copy-note', '.mission-panel'
  ].join(',');

  const buttonSelectors = '.btn,.top-action,.action-link,.panel-cta';
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const setPointerVars = (element, event) => {
    const rect = element.getBoundingClientRect();
    const px = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const py = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    element.style.setProperty('--mx', `${px * 100}%`);
    element.style.setProperty('--my', `${py * 100}%`);
    return { px, py, rect };
  };

  const setButtonMotion = (element, event) => {
    if (!element.matches(buttonSelectors)) return;
    const { px, py } = setPointerVars(element, event);
    const dx = (px - .5) * 10;
    const dy = (py - .5) * 8;
    element.style.setProperty('--move-x', `${clamp(dx, -5, 5)}px`);
    element.style.setProperty('--move-y', `${clamp(dy, -4, 4)}px`);
  };

  const setCardMotion = (element, event) => {
    if (!element.matches(cardSelectors)) return;
    const { px, py } = setPointerVars(element, event);
    const tiltY = clamp((px - .5) * 4.4, -2.2, 2.2);
    const tiltX = clamp((.5 - py) * 3.8, -1.9, 1.9);
    const driftX = clamp((px - .5) * 3, -1.5, 1.5);
    element.style.setProperty('--rx', `${tiltX}deg`);
    element.style.setProperty('--ry', `${tiltY}deg`);
    element.style.setProperty('--card-x', `${driftX}px`);
  };

  document.addEventListener('pointermove', (event) => {
    const element = event.target.closest(selectors);
    if (!element) return;
    setPointerVars(element, event);
    setButtonMotion(element, event);
    setCardMotion(element, event);
  }, { passive: true });

  document.addEventListener('pointerleave', (event) => {
    const element = event.target.closest?.(selectors);
    if (!element) return;
    element.style.removeProperty('--move-x');
    element.style.removeProperty('--move-y');
    element.style.removeProperty('--rx');
    element.style.removeProperty('--ry');
    element.style.removeProperty('--card-x');
  }, true);
})();
