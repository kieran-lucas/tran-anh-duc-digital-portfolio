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

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const setPointerVars = (element, event) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    element.style.setProperty('--mx', `${clamp((x / rect.width) * 100, 0, 100)}%`);
    element.style.setProperty('--my', `${clamp((y / rect.height) * 100, 0, 100)}%`);
  };

  const magneticMove = (element, event) => {
    if (!element.matches('.btn,.top-action,.action-link,.panel-cta')) return;
    const rect = element.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
    element.style.setProperty('--mag-x', `${clamp(dx * 8, -6, 6)}px`);
    element.style.setProperty('--mag-y', `${clamp(dy * 7, -5, 5)}px`);
  };

  document.addEventListener('pointermove', (event) => {
    const element = event.target.closest(selectors);
    if (!element) return;
    setPointerVars(element, event);
    magneticMove(element, event);
  }, { passive: true });

  document.addEventListener('pointerleave', (event) => {
    const element = event.target.closest?.(selectors);
    if (!element) return;
    element.style.removeProperty('--mag-x');
    element.style.removeProperty('--mag-y');
  }, true);
})();
