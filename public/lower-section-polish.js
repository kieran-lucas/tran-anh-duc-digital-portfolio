(() => {
  const applyFinalSectionPolish = () => {
    const targets = [
      ...document.querySelectorAll('#reflection .glass, #reflection .reflection-visual, #rubric .rubric-row, .footer-inner')
    ];

    targets.forEach((el, index) => {
      el.style.setProperty('--final-delay', `${Math.min(index * 45, 360)}ms`);
      el.classList.add('final-polish-ready');
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyFinalSectionPolish, { once: true });
  } else {
    applyFinalSectionPolish();
  }
})();
