// Kia Connect Store Display Themes
// Product Detail JavaScript File

// ----------------------------------------
// Global State
// ----------------------------------------
// html
const themeList = _themeList || ['01', '02', '03', '04', '05'];
let currentTheme = _currentTheme || '01';
let isLiked = false;

// ----------------------------------------
// Initialization
// ----------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const urlTheme = getQueryParam('theme');
    setCurrentTheme(urlTheme);

    setupEventListeners();
    initSwiper();
  } catch (e) {}
});

function setCurrentTheme(newTheme) {
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
function setupEventListeners() {
  document.querySelectorAll('.option-item').forEach((item) => {
    item.addEventListener('click', () => setCurrentTheme(item.dataset.theme));
  });

  document.querySelectorAll('.themes-cards-grid .card').forEach((selector) => {
    selector.addEventListener('click', () =>
      setCurrentTheme(selector.dataset.theme)
    );
  });

  // PC용 테마 선택 버튼
  document.querySelectorAll('.theme-selector button').forEach((selector) => {
    selector.addEventListener('click', () =>
      setCurrentTheme(selector.dataset.theme)
    );
  });

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
        setCurrentTheme(themeValue);
      });
    });
  }
  // 외부 클릭 시 Dropdown 닫기
  document.addEventListener('click', (e) => {
    if (dropdownBox && !e.target.closest('.theme-selector.dropdown')) {
      dropdownBox.classList.remove('active');
    }
  });

  // 좋아요 버튼
  const btnLike = document.getElementById('btnLike');
  if (btnLike) btnLike.addEventListener('click', handleLikeClick);

  // 구매 버튼
  const btnBuy = document.getElementById('btnBuy');
  if (btnBuy) btnBuy.addEventListener('click', handleBuyClick);
}

// ----------------------------------------
// Swiper
// ----------------------------------------
function initSwiper() {
  natgeo_swiper = new Swiper('.swiper', {
    loop: true,
    // autoplay: {
    //   delay: 3000, // 3초마다 슬라이드 전환
    //   disableOnInteraction: false, // 사용자가 조작해도 자동 재생 유지
    //   pauseOnMouseEnter: true, // 마우스를 올리면 일시 정지 (핵심 옵션)
    // },
    pagination: {
      el: '.swiper-pagination',
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

function handleLikeClick() {
  const btnLike = document.getElementById('btnLike');
  if (!btnLike) return;

  isLiked = !isLiked;
  btnLike.classList.toggle('active', isLiked);
}

function handleBuyClick() {
  console.log('Buy');
  alert(`Proceeding to checkout\nTheme: ${currentTheme}`);
}
