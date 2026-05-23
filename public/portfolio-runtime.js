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
    const interactiveSelector = 'a,button,[role="button"],summary,.brand,.btn,.top-action,.action-link,.panel-cta,.nav a,.toc a,.terminal-card .mini-stat';
    document.querySelectorAll('body *').forEach((node) => node.style.setProperty('cursor', 'default', 'important'));
    document.querySelectorAll(interactiveSelector).forEach((root) => {
      root.style.setProperty('cursor', 'pointer', 'important');
      root.querySelectorAll('*').forEach((child) => child.style.setProperty('cursor', 'pointer', 'important'));
    });
  };

  const init = () => {
    enhanceReflection();
    enhanceHeroInteractions();
    calibrateAnchors();
    applyCursorPolicy();
    new MutationObserver(applyCursorPolicy).observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
