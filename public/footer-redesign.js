(() => {
  const enhanceFooter = () => {
    const footerInner = document.querySelector('.footer-inner');
    if (!footerInner || footerInner.dataset.redesigned === 'true') return;
    footerInner.dataset.redesigned = 'true';
    footerInner.innerHTML = `
      <div class="footer-brand">
        <div class="footer-mark" aria-hidden="true">Đ</div>
        <div class="footer-copy">
          <strong>Trần Anh Đức · Digital Portfolio</strong>
          <span>Hoàn thiện 7/7 bài thực hành chính · minh chứng PDF đầy đủ · trình bày theo hướng sản phẩm học tập số.</span>
        </div>
      </div>
      <div class="footer-badges" aria-label="Tóm tắt portfolio">
        <span class="footer-badge accent">7/7 artifacts</span>
        <span class="footer-badge">PDF gốc</span>
        <span class="footer-badge">AI minh bạch</span>
        <span class="footer-badge">UET.A11</span>
      </div>
    `;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceFooter, { once: true });
  } else {
    enhanceFooter();
  }
})();
