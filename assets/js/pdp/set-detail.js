// Kia Connect Store Display Themes
// Product Detail JavaScript File

// ----------------------------------------
// Global State
// ----------------------------------------
// html
const themeList = _themeList || ['01', '02', '03', '04', '05'];
let currentTheme = _currentTheme || '01';
let thumbnail_swiper = null;
let kv_swiper = null;

// ----------------------------------------
// Initialization
// ----------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const urlTheme = getQueryParam('theme');
    setDetailCurrentTheme(urlTheme);
    setDetailEventListeners();
    initDetailSwiper();
  } catch (e) {}
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
}

// ----------------------------------------
// Event Binding
// ----------------------------------------
function setDetailEventListeners() {
  // 상품 옵션 클릭 시
  const optionItems = document.querySelectorAll('.option-item');
  optionItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      // disabled 일 때
      if (item.classList.contains('disabled')) {
        e.preventDefault(); // 태그가 a나 button일 경우 기본 동작 차단
        alert('로그인이 필요한 서비스입니다.');
        return;
      }

      // disabled 아닐 때
      // 기존 선택 해제
      const prevSelected = document.querySelector('.option-item.selected');
      if (prevSelected) {
        prevSelected.classList.remove('selected');
        prevSelected.setAttribute('aria-selected', 'false');
      }

      // 신규 선택
      item.classList.add('selected');
      item.setAttribute('aria-selected', 'true');
    });
  });

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
        themeSelectors.classList.add('is-sticky');
      } else {
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
    '.thumbnail-swiper .thumbnail-slide.with-video'
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
  kv_swiper = new Swiper('.kv-swiper', {
    loop: true,
    // autoplay: {
    //   delay: 3000, // 3초마다 슬라이드 전환
    //   disableOnInteraction: false, // 사용자가 조작해도 자동 재생 유지
    //   pauseOnMouseEnter: true, // 마우스를 올리면 일시 정지 (핵심 옵션)
    // },
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
    const infoStickyEl = document.querySelector('.info-sticky');
    const offset = infoStickyEl?.clientHeight || 0;

    // 요소의 top 위치로 smooth 스크롤
    const elementPosition =
      el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  }
}
