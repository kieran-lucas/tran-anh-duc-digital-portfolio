(() => {
  const enhanceFooter = () => {
    const footerInner = document.querySelector('.footer-inner');
    if (!footerInner || footerInner.dataset.redesigned === 'simple') return;
    footerInner.dataset.redesigned = 'simple';
    footerInner.innerHTML = `
      <div class="footer-main">
        <span class="footer-dot" aria-hidden="true"></span>
        <span>© 2026 · Trần Anh Đức · Digital Portfolio</span>
      </div>
      <div class="footer-note">Designed as a clean learning portfolio · UET.A11</div>
    `;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceFooter, { once: true });
  } else {
    enhanceFooter();
  }
})();
