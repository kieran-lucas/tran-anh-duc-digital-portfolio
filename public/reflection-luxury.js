(() => {
  const notes = [
    'Qua 7 bài thực hành, tôi nhận ra kỹ năng số không chỉ nằm ở việc biết sử dụng một phần mềm cụ thể, mà nằm ở khả năng xây dựng quy trình làm việc có kiểm soát: tổ chức file, tìm nguồn đáng tin cậy, đặt prompt rõ ràng, phối hợp nhóm, tạo sản phẩm và đánh giá rủi ro đạo đức.',
    'Thách thức lớn nhất là biến các nhiệm vụ rời rạc thành một hệ thống thống nhất. Portfolio này giải quyết điều đó bằng cách xem mỗi bài như một artifact trong hành trình học tập, có minh chứng, có công cụ và có phần phản tư cá nhân.',
    'Sau dự án, tôi có thể áp dụng các kỹ năng này vào nghiên cứu tài liệu, làm việc nhóm, chuẩn bị báo cáo học thuật và xây dựng các sản phẩm số trong tương lai. Đặc biệt, tôi hiểu rằng AI mạnh nhất khi được sử dụng minh bạch, có kiểm chứng và đặt dưới trách nhiệm của con người.'
  ];

  const enhanceReflection = () => {
    const copy = document.querySelector('#reflection .reflection-copy');
    if (!copy || copy.dataset.luxuryReflection === 'true') return;
    copy.dataset.luxuryReflection = 'true';
    copy.classList.add('reflection-copy-luxury');
    copy.innerHTML = notes.map((note) => `
      <article class="reflection-point" tabindex="0">
        <span class="reflection-marker" aria-hidden="true"></span>
        <div class="reflection-point-body">
          <p>${note}</p>
        </div>
      </article>
    `).join('');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceReflection, { once: true });
  } else {
    enhanceReflection();
  }
})();