(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hoverFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
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
