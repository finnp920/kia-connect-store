// Kia Connect Store Display Themes
// Product Detail JavaScript File

// ----------------------------------------
// Global State
// ----------------------------------------
let themeList = [];
let currentTheme = '01';
let thumbnail_swiper = null;
let kv_swiper = null;
let kv_swiper_paging_type = 'basic';
let kv_swiper_paging_bars = null;

// ----------------------------------------
// Initialization
// ----------------------------------------
function initThemeDetailElements() {
  const mainElement = document.querySelector('main');
  // dataset 값 가져오기
  if (mainElement) {
    // (1) Theme List 가져오기 (JSON 문자열 -> 배열 변환)
    const themeListAttr = mainElement.dataset.themeList;
    if (themeListAttr) {
      try {
        // JSON.parse를 사용하여 문자열을 진짜 배열로 변환
        themeList = JSON.parse(themeListAttr);
      } catch (e) {
        console.warn('HTML data-theme-list 파싱 실패. 기본값을 사용합니다.', e);
      }
    }

    // (2) Current Theme 가져오기
    const currentThemeAttr = mainElement.dataset.currentTheme;
    if (currentThemeAttr) {
      currentTheme = currentThemeAttr;
    }
  }

  const urlTheme = getQueryParam('theme');
  setDetailCurrentTheme(urlTheme);

  setDetailEventListeners();

  kv_swiper_paging_type =
    document.querySelector('section.kv .paging-wrapper')?.dataset.type ||
    'basic';
  initDetailSwiper();
}

document.addEventListener('DOMContentLoaded', async () => {
  initThemeDetailElements();
});

function setDetailCurrentTheme(newTheme) {
  if (newTheme && themeList.includes(newTheme)) {
    currentTheme = newTheme;
  }

  const mainElements = document.getElementsByTagName('main');
  if (!mainElements || !mainElements.length) {
    return;
  }

  mainElements[0].dataset.currentTheme = currentTheme;

  // 카드 선택시 드롭다운 선택자도 변경
  const dropdownButton = document.getElementById('theme-selector-dropdown');
  const foundItem = Array.from(
    document.querySelectorAll('.theme-selector.dropdown .theme-list li')
  ).find((item) => item.getAttribute('value') === currentTheme);
  if (foundItem) {
    dropdownButton.textContent = foundItem.textContent;
  }

  // Foldable List 카드 active 상태 동기화
  syncFoldableListActive(currentTheme);
}

// ----------------------------------------
// Event Binding
// ----------------------------------------
function setDetailEventListeners() {
  // 테마 카드 클릭 시 테마 변경
  const themeCardGridEl = document.querySelectorAll('.themes-cards-grid');
  if (
    themeCardGridEl &&
    themeCardGridEl.length > 0 &&
    themeCardGridEl[0].dataset.clickable === 'true'
  ) {
    document
      .querySelectorAll('.themes-cards-grid .card')
      .forEach((selector) => {
        selector.addEventListener('click', () =>
          setDetailCurrentTheme(selector.dataset.theme)
        );
      });
  }

  // Foldable List 카드 hover 시 아코디언 토글
  const foldableContainers = document.querySelectorAll('.foldable-list .foldable-cards');
  foldableContainers.forEach((container) => {
    const cards = container.querySelectorAll('.foldable-card');

    // 카드에 마우스 진입 시 해당 카드만 active
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        cards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
      });

      // 카드 클릭 시 테마 변경 + sticky-layout으로 스크롤
      card.addEventListener('click', () => {
        setDetailCurrentTheme(card.dataset.theme);
        scrollToSelector('.sticky-layout');
      });
    });

    // 컨테이너에서 마우스 빠지면 선택된 테마 카드로 복귀
    container.addEventListener('mouseleave', () => {
      cards.forEach((c) => c.classList.remove('active'));
      const themeCard = container.querySelector(`.foldable-card[data-theme="${currentTheme}"]`);
      if (themeCard) themeCard.classList.add('active');
    });
  });

  // PC용 테마 선택 버튼
  const themeSelectorButtons = document.querySelectorAll(
    '.theme-selector.buttons button'
  );
  if (themeSelectorButtons) {
    themeSelectorButtons.forEach((selector) => {
      selector.addEventListener('click', () => {
        setDetailCurrentTheme(selector.dataset.theme);
        scrollToSelector('.sticky-layout');
      });
    });
  }

  const themeSelectors = document.querySelector('.theme-selector-wrapper');
  if (themeSelectors) {
    const stickyTop = parseInt(getComputedStyle(themeSelectors).top, 10) || 0;
    function checkThemeSelectorsSticky() {
      const rect = themeSelectors.getBoundingClientRect();
      if (rect.top <= stickyTop) {
        document.body.classList.add('tab-sticky');
        themeSelectors.classList.add('is-sticky');
      } else {
        document.body.classList.remove('tab-sticky');
        themeSelectors.classList.remove('is-sticky');
      }
    }
    window.addEventListener('scroll', checkThemeSelectorsSticky, {
      passive: true,
    });
    window.addEventListener('resize', checkThemeSelectorsSticky);
    checkThemeSelectorsSticky();
  }

  // MO용 테마 선택 Dropdown
  const dropdownBox = document.querySelector('.theme-selector.dropdown');
  const dropdownButton = document.getElementById('theme-selector-dropdown');
  const dropdownList = document.querySelector(
    '.theme-selector.dropdown .theme-list'
  );
  if (dropdownButton && dropdownList && dropdownBox) {
    // 셀렉트 버튼 클릭 시 Dropdown 박스 active 토글
    dropdownButton.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownBox.classList.toggle('active');
    });

    // 리스트 항목 클릭 시
    const themeItems = dropdownList.querySelectorAll('li');
    themeItems.forEach((item) => {
      item.addEventListener('click', () => {
        const themeValue = item.getAttribute('value');
        dropdownButton.textContent = item.textContent;
        dropdownBox.classList.remove('active');
        if (dropdownBox) {
          dropdownBox.setAttribute('data-theme', themeValue);
        }

        setDetailCurrentTheme(themeValue);
        scrollToSelector('.sticky-layout');
      });
    });
  }

  // 외부 클릭 시 Dropdown 닫기
  if (dropdownBox) {
    document.addEventListener('click', (e) => {
      if (dropdownBox && !e.target.closest('.theme-selector.dropdown')) {
        dropdownBox.classList.remove('active');
      }
    });
  }
}

// ----------------------------------------
// Swiper
// ----------------------------------------
function initDetailSwiper() {
  // 상품 썸네일 swiper
  thumbnail_swiper = new Swiper('.thumbnail-swiper', {
    loop: false,
    pagination: {
      el: '#thumbnail-swiper-pagination',
      clickable: true,
    },
  });

  // 상품 썸네일 > video 있는 슬라이드 마우스 Hover 처리
  const videoSlides = document.querySelectorAll(
    '.thumbnail-swiper .thumbnail-slide.withVideo'
  );
  videoSlides.forEach((slide) => {
    const video = slide.querySelector('video');

    if (!video) return;

    // 1. Mouse Enter: 재생
    slide.addEventListener('mouseenter', () => {
      // Promise 처리: 재생 중 에러 방지 (Interrupted by pause error 해결)
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Auto-play was prevented:', error);
        });
      }
    });

    // 2. Mouse Leave: 정지 & 초기화
    slide.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  // Key Visual swiper
  if (kv_swiper_paging_type === 'dynamic_paging') {
    kv_swiper_paging_bars = document.querySelector('.swiper-pagination-bars');

    kv_swiper = new Swiper('.kv-swiper', {
      loop: true,
      pagination: {
        el: '#kv-swiper-fraction',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChange: ({ realIndex, slides }) => {
          const total = slides.length;
          const index = realIndex + 1;
          let barActiveIndex = 3;
          if (index < 3) barActiveIndex = index;
          else if (index === total - 1) barActiveIndex = 4;
          else if (index === total) barActiveIndex = 5;

          kv_swiper_paging_bars.dataset.activeIndex = barActiveIndex;

          if (index === 1 || index === 3) {
            kv_swiper_paging_bars.classList.remove('prev');
          } else if (index === total || index === 4) {
            kv_swiper_paging_bars.classList.add('prev');
          }

          if (index === total || index === total - 2) {
            kv_swiper_paging_bars.classList.remove('next');
          } else if (index === 1 || index === total - 3) {
            kv_swiper_paging_bars.classList.add('next');
          }
        },
      },
    });
  } else {
    kv_swiper = new Swiper('.kv-swiper', {
      loop: true,
      pagination: {
        el: '#kv-swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}

// ----------------------------------------
// Utils
// ----------------------------------------
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function scrollToSelector(selector) {
  const el = document.querySelector(selector);

  if (el) {
    const themeSelectors = document.querySelector('.theme-selector-wrapper');
    let offset = 0;

    if (themeSelectors) {
      offset = parseInt(getComputedStyle(themeSelectors).top, 10) || 0;
    } else {
      let infoStickyEl =
        document.querySelector('#info-sticky') ||
        document.querySelector('.infoSticky');
      offset = infoStickyEl?.clientHeight || 0;
    }

    const layout = document.querySelector('.sticky-layout') || el;
    const absoluteTop = layout.getBoundingClientRect().top + window.scrollY;
    const targetY = Math.ceil(absoluteTop - offset) + 1;

    // smooth 스크롤 실행
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });

    // [추가] 스크롤이 끝나는 시점에 강제로 sticky 체크 로직 실행 (클래스 부여 보장)
    // iOS 등 일부 브라우저에서 smooth 스크롤 시 이벤트를 놓치는 경우 대응
    setTimeout(() => {
      if (typeof checkThemeSelectorsSticky === 'function') {
        checkThemeSelectorsSticky();
      } else {
        // 전역 함수가 아닐 경우 직접 클래스 부여
        if (targetY >= absoluteTop - offset) {
          document.body.classList.add('tab-sticky');
          if (themeSelectors) themeSelectors.classList.add('is-sticky');
        }
      }
    }, 100); // 애니메이션 예상 시간 후 실행
  }
}

function syncFoldableListActive(theme) {
  const foldableCards = document.querySelectorAll('.foldable-list .foldable-card');
  if (!foldableCards.length) return;

  foldableCards.forEach((card) => {
    if (card.dataset.theme === theme) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}
