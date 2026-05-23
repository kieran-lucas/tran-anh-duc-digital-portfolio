(() => {
  const applyEvidenceCard = () => {
    const terminal = document.querySelector('.terminal-window');
    if (!terminal || terminal.classList.contains('evidence-window')) return;

    terminal.classList.add('evidence-window');
    terminal.innerHTML = [
      '<div class="evidence-head">',
      '<span class="evidence-title">portfolio.status</span>',
      '<span class="evidence-badge">Ready</span>',
      '</div>',
      '<div class="evidence-body">',
      '<div class="evidence-summary">',
      '<strong>Hồ sơ đã sẵn sàng để đánh giá</strong>',
      '<span>Toàn bộ bài chính được gom thành artifact rõ ràng, có PDF minh chứng và phản tư cá nhân theo đúng yêu cầu đề bài.</span>',
      '</div>',
      '<div class="evidence-grid">',
      '<div class="evidence-item"><b>7/7</b><span>Bài học chính</span><small>Đầy đủ artifact</small></div>',
      '<div class="evidence-item"><b>PDF</b><span>Minh chứng gốc</span><small>Mở trực tiếp</small></div>',
      '<div class="evidence-item"><b>AI</b><span>Có trách nhiệm</span><small>Minh bạch</small></div>',
      '<div class="evidence-item"><b>UX</b><span>Mượt & gọn</span><small>Glass nhẹ</small></div>',
      '</div>',
      '</div>'
    ].join('');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyEvidenceCard, { once: true });
  } else {
    applyEvidenceCard();
  }
})();
