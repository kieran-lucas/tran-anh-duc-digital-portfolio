(() => {
  const reflectionNotes = [
    'Sau khi hoàn thành các bài trong môn học, tôi hiểu rõ hơn rằng AI không chỉ là công cụ tạo câu trả lời nhanh. AI có thể hỗ trợ tìm ý, phản biện, tóm tắt tài liệu, thiết kế nội dung và cải thiện bản thảo, nhưng kết quả cuối cùng vẫn cần người học kiểm chứng và chịu trách nhiệm. So với lúc đầu, tôi biết dùng AI thành thạo và hiệu quả hơn: đặt prompt có mục tiêu, yêu cầu định dạng rõ, kiểm tra lại nguồn và không để AI thay phần tư duy chính của mình.',
    'Điểm tôi thấy tiến bộ rõ nhất là khả năng trình bày sản phẩm học tập. Trước đây tôi thường chỉ làm xong bài rồi nộp file, còn trong portfolio này tôi phải nghĩ thêm về cách tổ chức nội dung, cách dẫn người xem, cách làm báo cáo dễ đọc và cách giữ các minh chứng nhất quán. Nhờ vậy, kỹ năng thiết kế, bố cục và trình bày báo cáo của tôi tốt hơn hẳn, đặc biệt là khi biến nhiều bài rời rạc thành một hồ sơ học tập thống nhất.',
    'Khó khăn lớn nhất là phần làm website portfolio. Việc căn bố cục, điều hướng, hiệu ứng, PDF và trải nghiệm xem không đơn giản như viết một báo cáo thông thường; nhiều chi tiết nhỏ phải thử đi thử lại mới ổn. Tuy vậy, chính quá trình đó giúp tôi học được cách kiểm tra sản phẩm kỹ hơn, kiên nhẫn hơn với lỗi giao diện và hiểu rằng một sản phẩm số tốt cần cả nội dung đúng, thiết kế rõ và trải nghiệm mượt.'
  ];

  const portfolioCopy = {
    profile: 'Sinh viên năm nhất ngành Khoa học máy tính · Portfolio tổng hợp các bài thực hành về kỹ năng số, AI và liêm chính học thuật.',
    heroLead: 'Portfolio này tổng hợp đầy đủ 7 bài thực hành của môn Nhập môn Công nghệ số và Ứng dụng Trí tuệ Nhân tạo. Mỗi bài được trình bày bằng mục tiêu rõ ràng, tóm tắt quá trình thực hiện, nhận xét cá nhân và PDF minh chứng để người chấm có thể kiểm tra trực tiếp.',
    heroNote: 'Mục tiêu của tôi khi làm portfolio không chỉ là gom đủ file nộp bài, mà là trình bày lại toàn bộ quá trình học theo một cấu trúc dễ xem: có phần giới thiệu, có 7 sản phẩm chính, có tổng kết bản thân và có đối chiếu rubric.',
    overviewTitle: 'Một portfolio cá nhân bám sát đề bài và có minh chứng rõ ràng.',
    overviewIntro: 'Website này được xây dựng để thể hiện các kỹ năng số đã học trong môn: quản lý tệp, tìm kiếm học thuật, viết prompt, hợp tác trực tuyến, sáng tạo nội dung với AI, sử dụng AI có trách nhiệm và tổng quan tài liệu bằng công cụ AI.',
    overviewCard1Title: 'Từ bài tập rời rạc thành một hồ sơ học tập thống nhất.',
    overviewCard1Body: 'Tôi sắp xếp mỗi bài như một artifact riêng: có tiêu đề, công cụ sử dụng, nội dung chính, nhận xét cá nhân và nút mở PDF. Cách trình bày này giúp người xem hiểu nhanh tôi đã làm gì, làm bằng công cụ nào và bài đó chứng minh kỹ năng nào.',
    overviewCard2Title: 'Cấu trúc được thiết kế theo tiêu chí chấm điểm.',
    overviewCard2Body: 'Portfolio có trang giới thiệu, khu vực dự án, phần tổng kết và bảng đối chiếu rubric. Các PDF gốc được giữ lại để tránh nói chung chung và để mọi nhận xét trên website đều có minh chứng cụ thể đi kèm.',
    missionsIntro: 'Bảy artifact dưới đây được viết lại ngắn gọn theo đúng nội dung đã làm. Tôi cố gắng nêu cụ thể công cụ, quy trình, kết quả và bài học rút ra, thay vì chỉ ghi tên bài hoặc mô tả chung chung.',
    aiIntro: 'Qua bài sử dụng AI có trách nhiệm, tôi rút ra rằng AI chỉ nên đóng vai trò hỗ trợ. Người học vẫn phải tự hiểu bài, kiểm chứng nguồn, khai báo khi cần và không dùng AI để né tránh trách nhiệm học thuật.',
    reflectionIntro: 'Phần tổng kết ghi lại những điều tôi học được sau khi hoàn thành cả 7 bài và sau quá trình tự xây dựng website portfolio.',
    rubricIntro: 'Bảng này giúp đối chiếu nhanh giữa yêu cầu của đề bài và phần minh chứng tương ứng trong portfolio.',
    missions: {
      'file-system': {
        title: 'Quản lý tệp và thư mục trên Windows',
        tools: ['File Explorer', 'Tạo thư mục', 'Đổi tên file', 'Sao chép/di chuyển', 'Recycle Bin'],
        summary: 'Bài 01 ghi lại bằng ảnh chụp màn hình quy trình thao tác với tệp và thư mục trên Windows: mở File Explorer, vào ổ lưu trữ, tạo thư mục thực hành, đổi tên thư mục, tạo và quản lý các tệp con, sao chép, di chuyển, xóa và khôi phục khi cần.',
        insight: 'Bài này giúp tôi thấy việc quản lý dữ liệu không nên làm tùy hứng. Khi thư mục được đặt tên rõ và các thao tác được làm theo thứ tự, tôi dễ tìm lại file hơn, giảm nhầm lẫn và có nền tảng tốt hơn cho các bài báo cáo sau.',
        status: 'Hoàn thành bằng chuỗi ảnh chụp thao tác trực tiếp trên Windows, có đủ các bước cơ bản với tệp và thư mục.',
        value: 'Chứng minh kỹ năng nền tảng: tổ chức dữ liệu cá nhân, đặt tên dễ hiểu và kiểm soát thao tác file thay vì lưu trữ lộn xộn.'
      },
      'academic-search': {
        title: 'Tìm kiếm và đánh giá thông tin học thuật về AI trong an ninh mạng',
        tools: ['Google Scholar', 'IEEE Xplore', 'ACM DL', 'ScienceDirect', 'SpringerLink'],
        summary: 'Bài 02 tập trung vào chủ đề ứng dụng AI trong an ninh mạng. Tôi xác định phạm vi gồm phát hiện xâm nhập, phân tích malware, phát hiện phishing và bảo mật IoT; sau đó tìm tài liệu từ nhiều cơ sở học thuật, thu thập 12 nguồn và đánh giá theo các tiêu chí như tác giả, nơi xuất bản, phương pháp, trích dẫn và độ cập nhật.',
        insight: 'Điểm quan trọng tôi học được là tìm tài liệu không chỉ là gõ từ khóa. Muốn nguồn đáng tin, tôi phải biết giới hạn phạm vi, dùng từ khóa chuyên ngành, so sánh nhiều nguồn và tự đánh giá độ tin cậy trước khi đưa vào báo cáo.',
        status: 'Có 12 tài liệu tham khảo, trong đó có nhiều bài báo khoa học chất lượng cao và bảng đánh giá độ tin cậy theo tiêu chí rõ ràng.',
        value: 'Thể hiện kỹ năng tìm kiếm học thuật có hệ thống và khả năng phân biệt nguồn học thuật, báo cáo ngành, sách chuyên khảo và tài liệu chính thức.'
      },
      'prompt-engineering': {
        title: 'Kỹ năng viết prompt hiệu quả cho mô hình ngôn ngữ lớn',
        tools: ['ChatGPT', 'Role prompting', 'Structured output', 'Few-shot', 'Constraints'],
        summary: 'Bài 03 thử nghiệm ba cấp độ prompt cho ba tác vụ học tập: tóm tắt tài liệu học thuật, giải thích Gradient Descent và tạo bộ câu hỏi ôn tập về stack, queue, linked list. Mỗi tác vụ đều có prompt cơ bản, prompt cải tiến và prompt nâng cao để so sánh chất lượng đầu ra.',
        insight: 'Tôi nhận ra prompt tốt không phải là câu hỏi dài cho có, mà là một bản mô tả nhiệm vụ rõ: AI đóng vai gì, người đọc là ai, cần định dạng nào, giới hạn ra sao và tiêu chí đánh giá là gì. Khi thêm vai trò, cấu trúc và ví dụ mẫu, kết quả ổn định hơn nhiều.',
        status: 'Đã có bảng so sánh prompt theo ba mức và phân tích vì sao prompt nâng cao cho kết quả tốt hơn.',
        value: 'Chứng minh khả năng điều khiển AI bằng yêu cầu cụ thể thay vì dùng AI theo kiểu hỏi thử và nhận kết quả ngẫu nhiên.'
      },
      'collaboration': {
        title: 'Sử dụng công cụ hợp tác trực tuyến cho dự án nhóm',
        tools: ['Trello', 'Google Docs', 'Google Drive', 'Google Meet'],
        summary: 'Bài 04 ghi lại quá trình tôi tham gia Nhóm 5 trong dự án về ứng dụng AI tạo sinh hỗ trợ học tập và quản lý thời gian. Vai trò chính của tôi là quản lý tiến độ và tổng hợp nội dung, sử dụng Trello để chia task, Google Docs để góp ý, Drive để lưu tài liệu và Meet để họp nhóm.',
        insight: 'Tôi thấy công cụ hợp tác chỉ hiệu quả khi nhóm có quy ước rõ. Trello cần deadline và trạng thái task; Google Docs cần comment đúng chỗ; Drive cần cấu trúc thư mục và quy tắc đặt tên. Nếu không có quy trình, nhiều công cụ cũng dễ thành rối.',
        status: 'Có minh chứng về board Trello, Google Docs, Drive, Meet, 4 nhiệm vụ cá nhân, 10+ tương tác nhóm và cấu trúc thư mục 3 cấp.',
        value: 'Thể hiện khả năng làm việc nhóm trong môi trường số: theo dõi tiến độ, phản hồi thành viên khác và chuẩn hóa tài liệu chung.'
      },
      'ai-content': {
        title: 'Sử dụng AI tạo sinh trong sáng tạo nội dung số',
        tools: ['Claude', 'ChatGPT', 'Adobe Firefly', 'Canva AI'],
        summary: 'Bài 05 xây dựng infographic “Trí tuệ nhân tạo và tương lai việc làm” cho sinh viên đại học. Tôi dùng Claude và ChatGPT để gợi ý cấu trúc, phản biện nội dung; Adobe Firefly để tạo hình minh họa; Canva AI để tham khảo bố cục, sau đó tự biên tập lại nội dung và thiết kế bản cuối.',
        insight: 'Bài này giúp tôi hiểu AI có thể tăng tốc giai đoạn lên ý tưởng, nhưng sản phẩm cuối không nên chỉ là output thô. Tôi phải chọn ý phù hợp, sửa copywriting, kiểm tra thông điệp, phối màu và bố cục để infographic dễ đọc hơn.',
        status: 'Có quy trình dùng nhiều công cụ AI, ghi rõ phần AI hỗ trợ và phần tôi tự biên tập, với sản phẩm infographic hoàn chỉnh.',
        value: 'Chứng minh năng lực sáng tạo nội dung số có kiểm soát: biết tận dụng AI nhưng vẫn giữ vai trò quyết định trong nội dung và thiết kế.'
      },
      'responsible-ai': {
        title: 'Sử dụng AI có trách nhiệm trong học tập và nghiên cứu',
        tools: ['Policy review', 'AI disclosure', 'Ethical analysis', 'Infographic'],
        summary: 'Bài 06 phân tích việc sử dụng AI trong học thuật theo hướng minh bạch và có trách nhiệm. Tôi tìm hiểu quy định liên quan, đối chiếu khi chưa có chính sách AI riêng, ghi lại cách dùng AI trong một nhiệm vụ học tập, phân tích ranh giới hỗ trợ - gian lận và xây dựng 6 nguyên tắc cá nhân.',
        insight: 'Điểm tôi thấy quan trọng nhất là không nên xem AI theo hai cực “cấm hoàn toàn” hoặc “dùng sao cũng được”. Cách an toàn hơn là hỏi rõ yêu cầu môn học, khai báo khi AI ảnh hưởng đáng kể, kiểm chứng đầu ra và giữ lập luận chính là của mình.',
        status: 'Có phần chính sách, prompt và đầu ra AI, phân tích đạo đức, bộ 6 nguyên tắc cá nhân và infographic tổng hợp.',
        value: 'Thể hiện nhận thức về liêm chính học thuật: AI có thể hỗ trợ học tập nhưng không thay thế trách nhiệm, hiểu biết và sự trung thực của người học.'
      },
      'literature-review': {
        title: 'Tổng quan tài liệu bằng công cụ AI Elicit/Consensus',
        tools: ['Elicit', 'Consensus', 'Graphene membrane', 'Literature screening'],
        summary: 'Bài 07 dùng công cụ AI để khảo sát nhanh tài liệu về màng graphene/graphene oxide trong khử mặn và lọc ion. Tôi đặt câu hỏi nghiên cứu cụ thể, dùng các từ khóa như graphene membrane desalination và graphene oxide molecular sieving, lọc kết quả ban đầu rồi chọn 5 bài tiêu biểu nhất để tổng hợp.',
        insight: 'Tôi học được rằng Elicit/Consensus giúp tăng tốc tìm bài, nhưng không thể thay bước đọc và đánh giá của người học. Với chủ đề kỹ thuật như graphene membrane, tôi vẫn phải xem phương pháp, kết quả định lượng, giới hạn nghiên cứu và mức liên quan trước khi chọn nguồn.',
        status: 'Có câu hỏi nghiên cứu rõ, danh sách bài tìm được, 5 bài chính được chọn và tiêu chí trích xuất nhiều hơn 4 thông tin cho mỗi bài.',
        value: 'Chứng minh khả năng dùng AI để hỗ trợ tổng quan tài liệu nhưng vẫn giữ bước sàng lọc, kiểm chứng và nhận xét cá nhân.'
      }
    },
    aiPrinciples: [
      ['Minh bạch khi dùng AI', 'Nếu AI ảnh hưởng đến dàn ý, câu chữ, hình ảnh hoặc cách phản biện bản thảo, tôi cần khai báo công cụ và mục đích sử dụng.'],
      ['Kiểm chứng trước khi tin', 'Số liệu, tên tài liệu, trích dẫn và kết luận do AI gợi ý phải được kiểm tra lại từ nguồn đáng tin cậy.'],
      ['Giữ lập luận cốt lõi', 'AI có thể hỗ trợ sắp xếp ý, nhưng quan điểm, đánh giá và kết luận chính phải do tôi tự hiểu và tự chịu trách nhiệm.'],
      ['Theo yêu cầu môn học', 'Trước khi dùng AI, tôi cần xem đề bài hoặc hỏi giảng viên; không mặc định rằng bài nào cũng được dùng AI như nhau.'],
      ['Không dùng AI làm lối tắt', 'Mục tiêu cuối cùng là học tốt hơn. Nếu dùng AI mà tôi không hiểu bài hơn, cách dùng đó không phù hợp.']
    ],
    rubric: [
      ['Thiết kế & cấu trúc Portfolio', 'Có trang giới thiệu, khu vực 7 dự án, phần AI có trách nhiệm, tổng kết và rubric. Giao diện thống nhất, có điều hướng cố định, PDF gốc và trải nghiệm xem rõ ràng.'],
      ['Quản lý tệp và thư mục', 'Bài 01 có ảnh chụp thao tác File Explorer, tạo thư mục thực hành, đổi tên, quản lý tệp, xóa/khôi phục và thể hiện ý thức tổ chức dữ liệu.'],
      ['Tìm kiếm & đánh giá thông tin', 'Bài 02 chọn chủ đề AI trong an ninh mạng, tìm từ nhiều nguồn học thuật, thu thập 12 tài liệu và đánh giá bằng các tiêu chí rõ ràng.'],
      ['Viết Prompt hiệu quả', 'Bài 03 có 3 tác vụ học tập, mỗi tác vụ gồm prompt cơ bản, cải tiến, nâng cao; phân tích kỹ thuật role, format, constraints và ví dụ mẫu.'],
      ['Hợp tác trực tuyến', 'Bài 04 có minh chứng sử dụng Trello, Google Docs, Google Drive và Google Meet; nêu rõ vai trò quản lý tiến độ và tổng hợp nội dung.'],
      ['Sáng tạo nội dung với AI', 'Bài 05 có infographic hoàn chỉnh, ghi rõ cách phối hợp Claude, ChatGPT, Adobe Firefly và Canva AI, đồng thời nêu phần tự biên tập của người làm.'],
      ['AI có trách nhiệm', 'Bài 06 có phân tích chính sách, khai báo sử dụng AI, ranh giới hỗ trợ - gian lận, vấn đề trích dẫn và bộ 6 nguyên tắc cá nhân.'],
      ['Tổng quan tài liệu bằng AI', 'Bài 07 dùng Elicit/Consensus để tìm bài về graphene/graphene oxide cho khử mặn, chọn 5 bài chính và trích xuất thông tin có hệ thống.'],
      ['Tổng kết và phản tư cá nhân', 'Phần Reflection nêu rõ tôi hiểu AI hơn, dùng AI hiệu quả hơn, tiến bộ về thiết kế/báo cáo và gặp khó khăn thực tế khi xây dựng website.']
    ]
  };

  const setText = (selector, value, root = document) => {
    const node = root.querySelector(selector);
    if (node && typeof value === 'string') node.textContent = value;
  };

  const setTools = (card, tools) => {
    const list = card.querySelector('.tool-list');
    if (!list || !Array.isArray(tools)) return;
    list.innerHTML = tools.map((tool) => `<span class="tool">${tool}</span>`).join('');
  };

  const polishPortfolioCopy = () => {
    setText('.profile-meta p', portfolioCopy.profile);
    setText('.hero-copy .lead', portfolioCopy.heroLead);
    setText('.hero-note p', portfolioCopy.heroNote);

    setText('#overview .section-head h2', portfolioCopy.overviewTitle);
    setText('#overview .section-head p', portfolioCopy.overviewIntro);
    const overviewCards = document.querySelectorAll('#overview .glass');
    if (overviewCards[0]) {
      setText('h3', portfolioCopy.overviewCard1Title, overviewCards[0]);
      setText('p', portfolioCopy.overviewCard1Body, overviewCards[0]);
    }
    if (overviewCards[1]) {
      setText('h3', portfolioCopy.overviewCard2Title, overviewCards[1]);
      setText('p', portfolioCopy.overviewCard2Body, overviewCards[1]);
    }

    setText('#missions .section-head p', portfolioCopy.missionsIntro);
    Object.entries(portfolioCopy.missions).forEach(([slug, data]) => {
      const card = document.getElementById(slug);
      if (!card) return;
      setText('.mission-title', data.title, card);
      const notes = card.querySelectorAll('.copy-note p');
      if (notes[0]) notes[0].textContent = data.summary;
      if (notes[1]) notes[1].textContent = data.insight;
      setTools(card, data.tools);
      const panelValues = card.querySelectorAll('.panel-value');
      if (panelValues[0]) panelValues[0].textContent = data.status;
      if (panelValues[1]) panelValues[1].textContent = data.value;
    });

    setText('#ai .section-head p', portfolioCopy.aiIntro);
    document.querySelectorAll('#ai .principle').forEach((item, index) => {
      const principle = portfolioCopy.aiPrinciples[index];
      if (!principle) return;
      setText('strong', principle[0], item);
      setText('span', principle[1], item);
    });

    setText('#reflection .section-head p', portfolioCopy.reflectionIntro);
    setText('#reflection .reflection-visual h3', 'Tôi hiểu AI rõ hơn và biết trình bày sản phẩm học tập tốt hơn.');

    setText('#rubric .section-head p', portfolioCopy.rubricIntro);
    document.querySelectorAll('#rubric .rubric-row').forEach((row, index) => {
      const item = portfolioCopy.rubric[index];
      if (!item) return;
      setText('.rubric-name', item[0], row);
      setText('.rubric-note', item[1], row);
    });

    setText('.evidence-window .evidence-summary strong', 'Hồ sơ đã sẵn sàng để đánh giá');
    setText('.evidence-window .evidence-summary span', '7 bài chính được gom thành artifact rõ ràng, có PDF gốc và có phần phản tư cá nhân theo đúng yêu cầu portfolio.');
  };

  const enhanceReflection = () => {
    const copy = document.querySelector('#reflection .reflection-copy');
    if (copy && copy.dataset.luxuryReflection !== 'true') {
      copy.dataset.luxuryReflection = 'true';
      copy.classList.add('reflection-copy-luxury');
      copy.innerHTML = reflectionNotes.map((note) => `
        <article class="reflection-point" tabindex="0">
          <span class="reflection-marker" aria-hidden="true"></span>
          <div class="reflection-point-body">
            <p>${note}</p>
          </div>
        </article>
      `).join('');
    }

    const visual = document.querySelector('#reflection .reflection-visual');
    if (!visual || visual.dataset.reflectionEnhanced === 'true') return;
    visual.dataset.reflectionEnhanced = 'true';
    visual.classList.add('reflection-real-aurora');
    visual.insertAdjacentHTML('afterbegin', '<span class="reflection-ambient-sheet" aria-hidden="true"></span>');
  };

  const enhanceHeroInteractions = () => {
    const hoverFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const selector = '.terminal-card .mini-stat';
    let activeCard = null;
    let pointerX = -1;
    let pointerY = -1;
    let raf = 0;

    const terminalBody = document.querySelector('.terminal-body');
    const terminalWindow = document.querySelector('.terminal-window');
    const terminalCard = document.querySelector('.terminal-card');
    const miniStats = document.querySelector('.mini-stats');

    [terminalCard, terminalWindow, terminalBody, miniStats].forEach((node) => {
      if (!node) return;
      node.style.setProperty('overflow', 'visible', 'important');
    });
    if (terminalBody) {
      terminalBody.style.setProperty('contain', 'none', 'important');
      terminalBody.style.setProperty('isolation', 'isolate', 'important');
    }
    if (miniStats) {
      miniStats.style.setProperty('position', 'relative', 'important');
      miniStats.style.setProperty('z-index', '80', 'important');
    }

    const cards = [...document.querySelectorAll(selector)];
    cards.forEach((card) => {
      card.dataset.heroHoverBound = 'true';
      card.style.setProperty('position', 'relative', 'important');
      card.style.setProperty('z-index', '1', 'important');
      card.style.setProperty('cursor', 'pointer', 'important');
      card.style.setProperty('transform', 'translate3d(0,0,0) scale(1)', 'important');
      card.style.setProperty('transform-origin', 'center center', 'important');
      card.style.setProperty('backface-visibility', 'hidden', 'important');
      card.style.setProperty('transition', 'transform .42s cubic-bezier(.16,1,.3,1),box-shadow .42s cubic-bezier(.22,1,.36,1),border-color .26s ease,background .26s ease', 'important');
      card.style.setProperty('will-change', 'transform', 'important');
    });

    const lift = (card) => {
      if (!card || activeCard === card) return;
      if (activeCard) settle(activeCard);
      activeCard = card;
      card.style.setProperty('z-index', '100', 'important');
      card.style.setProperty('transform', 'translate3d(0,-12px,0) scale(1.085)', 'important');
      card.style.setProperty('border-color', 'rgba(0,122,255,.42)', 'important');
      card.style.setProperty('background', 'linear-gradient(180deg,rgba(255,255,255,.98),rgba(214,244,255,.82))', 'important');
      card.style.setProperty('box-shadow', '0 26px 58px rgba(0,122,255,.20),0 10px 24px rgba(20,90,180,.08),inset 0 1px 0 rgba(255,255,255,1)', 'important');
    };

    function settle(card) {
      if (!card) return;
      card.style.setProperty('z-index', '1', 'important');
      card.style.setProperty('transform', 'translate3d(0,0,0) scale(1)', 'important');
      card.style.removeProperty('border-color');
      card.style.removeProperty('background');
      card.style.removeProperty('box-shadow');
      if (activeCard === card) activeCard = null;
    }

    const findCardAt = (x, y) => cards.find((card) => {
      const rect = card.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }) || null;

    const tick = () => {
      raf = 0;
      const card = findCardAt(pointerX, pointerY);
      if (card) lift(card);
      else if (activeCard) settle(activeCard);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    if (hoverFine && !prefersReduced && cards.length) {
      document.addEventListener('pointermove', (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        schedule();
      }, { passive: true });

      document.addEventListener('scroll', () => {
        if (activeCard) settle(activeCard);
      }, { passive: true });

      window.addEventListener('blur', () => {
        if (activeCard) settle(activeCard);
      }, { passive: true });
    }

    const cta = document.querySelector('.hero-actions .btn-primary');
    if (cta && cta.dataset.heroCtaBound !== 'true') {
      cta.dataset.heroCtaBound = 'true';
      cta.style.setProperty('transition', 'transform .58s cubic-bezier(.16,1,.3,1),box-shadow .54s cubic-bezier(.22,1,.36,1),filter .36s ease', 'important');
      cta.style.setProperty('will-change', 'transform', 'important');
      const ctaLift = () => {
        cta.style.setProperty('transform', 'translate3d(0,-4px,0) scale(1.026)', 'important');
        cta.style.setProperty('filter', 'saturate(1.05) brightness(1.02)', 'important');
        cta.style.setProperty('box-shadow', '0 24px 56px rgba(0,122,255,.24),0 8px 22px rgba(11,216,255,.12),inset 0 1px 0 rgba(255,255,255,.62)', 'important');
      };
      const ctaSettle = () => {
        cta.style.removeProperty('transform');
        cta.style.removeProperty('filter');
        cta.style.removeProperty('box-shadow');
      };
      cta.addEventListener('pointerenter', ctaLift, { passive: true });
      cta.addEventListener('pointerleave', ctaSettle, { passive: true });
      cta.addEventListener('focusin', ctaLift);
      cta.addEventListener('focusout', ctaSettle);
    }

    window.__heroMiniHoverDebug = () => ({
      cards: cards.length,
      active: activeCard?.textContent?.trim() || null,
      runtime: 'coordinate-hit-test'
    });
  };

  const stabilizeAnchorLayout = () => {
    if (document.querySelector('[data-anchor-layout-stability="true"]')) return;
    const style = document.createElement('style');
    style.dataset.anchorLayoutStability = 'true';
    style.textContent = `
      section[id], article[id], .section, .mission-card {
        content-visibility: visible !important;
        contain-intrinsic-size: auto !important;
      }
    `;
    document.head.appendChild(style);
  };

  const calibrateAnchors = () => {
    stabilizeAnchorLayout();

    const TOP_GAP = 22;
    const TITLEBAR_SHIFT_RATIO = 0.125;
    const CONTENT_DOWN_SHIFT = 28;
    const navMap = new Map();
    const contentMap = new Map();
    const topbar = () => document.querySelector('.topbar');
    const navLinks = () => [...document.querySelectorAll('.nav a')];

    const targetFor = (hash) => {
      if (!hash || hash === '#') return null;
      if (hash === '#top') return document.getElementById('top') || document.body;
      try {
        return document.querySelector(hash);
      } catch {
        return null;
      }
    };

    const clampY = (y) => {
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      return Math.min(max, Math.max(0, Math.round(y)));
    };

    const chromeOffset = () => Math.ceil((topbar()?.getBoundingClientRect().height || 70) + TOP_GAP);
    const titlebarShift = () => Math.round(window.innerHeight * TITLEBAR_SHIFT_RATIO);

    const contentAlignmentY = () => {
      const toc = document.querySelector('.toc');
      const stickyTop = toc ? parseFloat(getComputedStyle(toc).top) : NaN;
      const safeTop = chromeOffset() + 6;
      return Math.max(safeTop, Number.isFinite(stickyTop) ? stickyTop : safeTop) + CONTENT_DOWN_SHIFT;
    };

    const allAnchorHashes = () => {
      const hashes = new Set(['#top']);
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        const hash = anchor.getAttribute('href');
        if (hash && hash !== '#') hashes.add(hash);
      });
      return hashes;
    };

    const absoluteDocumentTop = (target) => Math.round(target.getBoundingClientRect().top + window.scrollY);

    const buildAnchorMaps = () => {
      const navOffset = chromeOffset();
      const contentY = contentAlignmentY();
      const shift = titlebarShift();
      navMap.clear();
      contentMap.clear();

      allAnchorHashes().forEach((hash) => {
        const target = targetFor(hash);
        if (!target) return;
        const top = absoluteDocumentTop(target);
        navMap.set(hash, hash === '#top' ? 0 : clampY(top - navOffset + shift));
        contentMap.set(hash, hash === '#top' ? 0 : clampY(top - contentY));
      });

      window.__anchorTeleportMap = () => ({
        nav: Object.fromEntries(navMap.entries()),
        content: Object.fromEntries(contentMap.entries()),
        meta: {
          chromeOffset: navOffset,
          titlebarShift: shift,
          contentAlignmentY: contentY,
          contentDownShift: CONTENT_DOWN_SHIFT
        }
      });
    };

    const rebuildAfterLayoutSettles = () => {
      requestAnimationFrame(() => requestAnimationFrame(buildAnchorMaps));
    };

    const mapForSource = (source) => source?.closest?.('.toc') ? contentMap : navMap;

    const coordinateForHash = (hash, source = null) => {
      const map = mapForSource(source);
      if (!map.size || !map.has(hash)) buildAnchorMaps();
      return map.get(hash) ?? 0;
    };

    const scrollToHash = (hash, updateUrl = true, source = null) => {
      if (!targetFor(hash)) return false;
      const y = coordinateForHash(hash, source);
      window.scrollTo({ top: y, behavior: 'smooth' });
      if (updateUrl) history.replaceState(null, '', hash);
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
      const probe = window.scrollY + chromeOffset() + 8;
      let current = links[0];
      for (const link of links) {
        const hash = link.getAttribute('href');
        const y = navMap.has(hash) ? navMap.get(hash) : null;
        if (typeof y === 'number' && probe >= y) current = link;
      }
      for (const link of links) link.classList.toggle('is-active', link === current);
    };

    let raf = 0;
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; updateActive(); });
    };

    buildAnchorMaps();
    rebuildAfterLayoutSettles();
    window.addEventListener('load', rebuildAfterLayoutSettles, { once: true });
    window.addEventListener('resize', rebuildAfterLayoutSettles, { passive: true });
    window.addEventListener('orientationchange', rebuildAfterLayoutSettles, { passive: true });
    document.fonts?.ready?.then(rebuildAfterLayoutSettles).catch(() => {});
    window.setTimeout(rebuildAfterLayoutSettles, 250);
    window.setTimeout(rebuildAfterLayoutSettles, 900);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    schedule();

    if (window.location.hash) {
      requestAnimationFrame(() => {
        buildAnchorMaps();
        window.scrollTo({ top: coordinateForHash(window.location.hash, null), behavior: 'auto' });
      });
    }
  };

  const applyCursorPolicy = () => {
    const interactiveSelector = 'a,button,[role="button"],summary,.brand,.btn,.top-action,.action-link,.panel-cta,.nav a,.toc a,.terminal-card .mini-stat';
    document.querySelectorAll('body *').forEach((node) => node.style.setProperty('cursor', 'default', 'important'));
    document.querySelectorAll(interactiveSelector).forEach((root) => {
      root.style.setProperty('cursor', 'pointer', 'important');
      root.querySelectorAll('*').forEach((child) => child.style.setProperty('cursor', 'pointer', 'important'));
    });
    document.querySelectorAll('.evidence-window .evidence-item').forEach((root) => {
      root.style.setProperty('cursor', 'default', 'important');
      root.querySelectorAll('*').forEach((child) => child.style.setProperty('cursor', 'default', 'important'));
    });
  };

  const init = () => {
    enhanceReflection();
    polishPortfolioCopy();
    enhanceHeroInteractions();
    calibrateAnchors();
    applyCursorPolicy();

    let cursorPolicyRaf = 0;
    const scheduleCursorPolicy = () => {
      if (cursorPolicyRaf) return;
      cursorPolicyRaf = requestAnimationFrame(() => {
        cursorPolicyRaf = 0;
        applyCursorPolicy();
      });
    };

    requestAnimationFrame(polishPortfolioCopy);
    window.setTimeout(polishPortfolioCopy, 120);
    new MutationObserver(scheduleCursorPolicy).observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
