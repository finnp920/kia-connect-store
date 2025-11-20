// Kia Connect Store Display Themes
// Product Detail JavaScript File

// ----------------------------------------
// Global State
// ----------------------------------------
// html
const themeList = _themeList || ['01', '02', '03', '04', '05'];
let currentTheme = _currentTheme || '01';

// ----------------------------------------
// Initialization
// ----------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const urlTheme = getQueryParam('theme');
    setCurrentTheme(urlTheme);

    initSwiper();
  } catch (e) {}
});

function setCurrentTheme(newTheme) {
  if (newTheme && themeList[newTheme]) {
    currentTheme = newTheme;
  }

  const mainElement = document.getElementsByTagName('main');

  if (!mainElement || !mainElement.length) {
    return;
  }
  mainElement[0].dataset.currentTheme = currentTheme;
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
