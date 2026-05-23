(() => {
  const reflectionNotes = [
    'Qua 7 bài thực hành, tôi nhận ra kỹ năng số không chỉ nằm ở việc biết sử dụng một phần mềm cụ thể, mà nằm ở khả năng xây dựng quy trình làm việc có kiểm soát: tổ chức file, tìm nguồn đáng tin cậy, đặt prompt rõ ràng, phối hợp nhóm, tạo sản phẩm và đánh giá rủi ro đạo đức.',
    'Thách thức lớn nhất là biến các nhiệm vụ rời rạc thành một hệ thống thống nhất. Portfolio này giải quyết điều đó bằng cách xem mỗi bài như một artifact trong hành trình học tập, có minh chứng, có công cụ và có phần phản tư cá nhân.',
    'Sau dự án, tôi có thể áp dụng các kỹ năng này vào nghiên cứu tài liệu, làm việc nhóm, chuẩn bị báo cáo học thuật và xây dựng các sản phẩm số trong tương lai. Đặc biệt, tôi hiểu rằng AI mạnh nhất khi được sử dụng minh bạch, có kiểm chứng và đặt dưới trách nhiệm của con người.'
  ];

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
    if (!visual || visual.dataset.realAurora === 'true') return;
    visual.dataset.realAurora = 'true';
    visual.classList.add('reflection-real-aurora');
    visual.insertAdjacentHTML('afterbegin', `
      <span class="reflection-color-field field-blue" aria-hidden="true"></span>
      <span class="reflection-color-field field-cyan" aria-hidden="true"></span>
      <span class="reflection-color-field field-violet" aria-hidden="true"></span>
      <span class="reflection-color-field field-aqua" aria-hidden="true"></span>
      <span class="reflection-color-field field-sheen" aria-hidden="true"></span>
    `);
  };

  const startReflectionAuroraMotion = () => {
    const visual = document.querySelector('#reflection .reflection-visual');
    if (!visual || visual.dataset.runtimeAurora === 'true') return;
    visual.dataset.runtimeAurora = 'true';

    let rafId = 0;
    let running = false;
    const start = performance.now();

    const render = (now) => {
      if (!running) return;
      const t = (now - start) / 1000;
      const p1x = 18 + Math.sin(t * 0.34) * 30;
      const p1y = 76 + Math.cos(t * 0.29) * 12;
      const p2x = 82 + Math.cos(t * 0.31 + 0.7) * 18;
      const p2y = 22 + Math.sin(t * 0.36 + 0.4) * 18;
      const p3x = 78 + Math.sin(t * 0.27 + 1.6) * 20;
      const p3y = 86 + Math.cos(t * 0.24 + 1.1) * 12;

      visual.style.setProperty(
        'background-position',
        `${p1x.toFixed(2)}% ${p1y.toFixed(2)}%, ${p2x.toFixed(2)}% ${p2y.toFixed(2)}%, ${p3x.toFixed(2)}% ${p3y.toFixed(2)}%, 0 0`,
        'important'
      );
      rafId = requestAnimationFrame(render);
    };

    const play = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(render);
    };

    const pause = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) play();
        else pause();
      }, { threshold: 0.08 });
      observer.observe(visual);
    } else {
      play();
    }
  };

  const calibrateAnchors = () => {
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
      if (source?.closest?.('.toc')) return Math.max(0, targetTop - contentsTargetY());
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
  };

  const applyCursorPolicy = () => {
    const interactiveSelector = 'a,button,[role="button"],summary,.brand,.btn,.top-action,.action-link,.panel-cta,.nav a,.toc a';
    document.querySelectorAll('body *').forEach((node) => node.style.setProperty('cursor', 'default', 'important'));
    document.querySelectorAll(interactiveSelector).forEach((root) => {
      root.style.setProperty('cursor', 'pointer', 'important');
      root.querySelectorAll('*').forEach((child) => child.style.setProperty('cursor', 'pointer', 'important'));
    });
  };

  const init = () => {
    enhanceReflection();
    startReflectionAuroraMotion();
    calibrateAnchors();
    applyCursorPolicy();
    new MutationObserver(applyCursorPolicy).observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
