// Kia Connect Store - National Geographic Display Themes
// Main JavaScript File

// ----------------------------------------
// Global State
// ----------------------------------------
let themeNames = Object.keys(themeData);
let currentTheme = themeNames[0];
let swiper = null;
let isLiked = false;

// ----------------------------------------
// Initialization
// ----------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  try {
    setupThumbnailLoader();

    const urlTheme = getQueryParam('theme');
    if (urlTheme && themeData[urlTheme]) {
      currentTheme = urlTheme;
    }

    initializePage();
    initSwiper();
    setupEventListeners();
  } catch (error) {
    console.error('Initialization error:', error);
    showError('Failed to load page data');
  }
});

// ----------------------------------------
// Query-String Helpers
// ----------------------------------------
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ----------------------------------------
// Page Initialization
// ----------------------------------------
function initializePage() {
  const theme = themeData[currentTheme];
  if (!theme) {
    showError('Theme data not available.');
    return;
  }

  updateTopBar(theme);
  updateProductInfo(theme);
  updateOptionList();
  // updateKVSection(theme);
  updatePreviewImages(theme);
  updatePriceSection(theme);
  updateThemeSelectors();
  updateSectionThemesBackground();
  updateDiscoverShots(theme);
  updateBackgroundImage(theme);
  updateDiscoverFeatures(theme);
  updateReasonImages(theme);
  updateCreditText(theme);
  updateMobileDropdown();
}

// ----------------------------------------
// Thumbnail loading state
// ----------------------------------------
function setupThumbnailLoader() {
  const wrapper = document.querySelector('.thumbnail-wrapper');
  const thumbnail = document.getElementById('productThumbnail');

  if (!wrapper || !thumbnail) return;

  thumbnail.addEventListener('load', () => {
    wrapper.classList.remove('is-loading');
  });

  thumbnail.addEventListener('error', () => {
    wrapper.classList.add('is-loading');
  });
}

// ----------------------------------------
// Content Update Helpers
// ----------------------------------------
function updateTopBar(theme) {
  const priceLabelTop = document.getElementById('priceLabelTop');
  const priceValueTop = document.getElementById('priceValueTop');

  if (priceLabelTop) priceLabelTop.textContent = theme.priceLabel;
  if (priceValueTop) priceValueTop.textContent = formatPrice(theme.price);
}

function updateProductInfo(theme) {
  const productDescription = document.getElementById('productDescription');
  const productThumbnail = document.getElementById('productThumbnail');
  const thumbnailWrapper = productThumbnail?.closest('.thumbnail-wrapper');

  if (productDescription) productDescription.textContent = theme.description;

  if (productThumbnail) {
    if (thumbnailWrapper) {
      thumbnailWrapper.classList.add('is-loading');
    }
    productThumbnail.alt = `${theme.fullName} preview`;
    productThumbnail.src = theme.thumbnail;
  }
}

function updateOptionList() {
  document.querySelectorAll('.option-item').forEach((item) => {
    const isSelected = item.dataset.theme === currentTheme;
    item.classList.toggle('selected', isSelected);
    item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });
}

function updatePreviewImages(theme) {
  const previewCluster = document.getElementById('previewCluster');
  const previewHomecard = document.getElementById('previewHomecard');
  const previewNavigation = document.getElementById('previewNavigation');
  const previewWelcome = document.getElementById('previewWelcome');
  const previewGoodbyeVideo = document.getElementById('previewGoodbyeVideo');
  const previewGoodbye = document.getElementById('previewGoodbye');
  const labelElements = {
    cluster: document.getElementById('previewClusterLabel'),
    welcome: document.getElementById('previewWelcomeLabel'),
    homecard: document.getElementById('previewHomecardLabel'),
    navigation: document.getElementById('previewNavigationLabel'),
    goodbye: document.getElementById('previewGoodbyeLabel'),
  };

  // 모바일 여부 확인
  const isMobile = window.innerWidth <= 769;
  const images = isMobile ? theme.mobilePreviewImages : theme.previewImages;
  const themeLabels = theme.previewLabels || theme.labels?.preview || {};
  const defaultLabels = {
    cluster: 'Cluster',
    welcome: 'Welcome Message',
    homecard: 'Homecard',
    navigation: 'Navigation',
    goodbye: 'Goodbye Video',
  };

  Object.entries(labelElements).forEach(([key, element]) => {
    if (!element) return;
    element.textContent = themeLabels[key] || defaultLabels[key];
  });

  if (previewCluster && images?.cluster) {
    previewCluster.src = images.cluster;
  }

  if (previewHomecard && images?.homecard) {
    previewHomecard.src = images.homecard;
  }

  if (previewNavigation && images?.navigation) {
    previewNavigation.src = images.navigation;
  }

  if (previewWelcome && images?.welcome) {
    previewWelcome.src = images.welcome;
  }

  if (previewGoodbye && images?.goodbye) {
    previewGoodbye.src = images.goodbye;
  }
}

function updatePriceSection(theme) {
  const priceLabel = document.getElementById('priceLabel');
  const priceValue = document.getElementById('priceValue');
  const totalPrice = document.getElementById('totalPrice');

  if (priceLabel) priceLabel.textContent = theme.priceLabel;
  if (priceValue) priceValue.textContent = formatPrice(theme.price);
  if (totalPrice) totalPrice.textContent = formatPrice(theme.price);
}

function updateThemeSelectors() {
  document.querySelectorAll('.theme-selector').forEach((selector) => {
    selector.classList.toggle(
      'selected',
      selector.dataset.theme === currentTheme
    );
  });
}

function updateSectionThemesBackground() {
  const sectionThemes = document.querySelector('section.themes');
  if (sectionThemes) {
    // 모든 테마 클래스 제거
    sectionThemes.classList.remove(
      'theme-baby-animals',
      'theme-space-wonders',
      'theme-landscape'
    );
    // 현재 테마 클래스 추가
    sectionThemes.classList.add(`theme-${currentTheme}`);
  }

  const sectionPlayful = document.querySelector('section#playful');
  if (sectionPlayful) {
    // 모든 테마 클래스 제거
    sectionPlayful.classList.remove(
      'theme-baby-animals',
      'theme-space-wonders',
      'theme-landscape'
    );
    // 현재 테마 클래스 추가
    sectionPlayful.classList.add(`theme-${currentTheme}`);
  }

  const themeHeaderWrapper = document.querySelector('.theme-header-wrapper');
  if (themeHeaderWrapper) {
    // 모든 테마 클래스 제거
    themeHeaderWrapper.classList.remove(
      'theme-baby-animals',
      'theme-space-wonders',
      'theme-landscape'
    );
    // 현재 테마 클래스 추가
    themeHeaderWrapper.classList.add(`theme-${currentTheme}`);
  }
}

function updateMobileDropdown() {
  const mobileThemeSelect = document.getElementById('mobileThemeSelect');
  const mobileThemeBox = document.querySelector('.mobile-theme-dropdown');
  if (mobileThemeSelect) {
    const theme = themeData[currentTheme];
    if (theme) {
      let displayName = theme.name || theme.fullName;
      if (displayName && displayName.endsWith('Display Themes')) {
        displayName = displayName.replace(/\s*Display Themes$/, '');
      }
      mobileThemeSelect.textContent = displayName;
    }
  }
  if (mobileThemeBox) {
    mobileThemeBox.setAttribute('data-theme', currentTheme);
  }
}

function updateDiscoverShots(theme) {
  if (!theme || !theme.videos) return;

  const videoItems = document.querySelectorAll('.playful-video-item');
  const isMobile = window.innerWidth <= 769;

  // 썸네일 이미지 소스 결정
  let thumbnailSources;
  if (
    isMobile &&
    theme.mobileDiscoverShots &&
    theme.mobileDiscoverShots.length > 0
  ) {
    thumbnailSources = theme.mobileDiscoverShots;
  } else if (theme.discoverShots && theme.discoverShots.length > 0) {
    thumbnailSources = theme.discoverShots;
  } else {
    thumbnailSources = theme.kvImages || [];
  }

  // 각 비디오 아이템의 배경 이미지 업데이트
  videoItems.forEach((item, index) => {
    const discoverType = item.dataset.discover; // "welcome" or "goodbye"
    const thumbnailIndex = discoverType === 'welcome' ? 0 : 1;
    const thumbnail = item.querySelector('.playful-video-bg');

    if (thumbnail) {
      thumbnail.src =
        thumbnailSources[thumbnailIndex] || thumbnailSources[0] || '';
    }

    // 각 비디오 셀의 경로 설정
    const videoCells = item.querySelectorAll('.playful-video-cell');
    videoCells.forEach((cell) => {
      const videoType = cell.dataset.videoType;
      if (!videoType) return;

      // Parse video type: "welcome-avnt", "welcome-cluster", "goodbye-avnt", "goodbye-cluster"
      const [type, device] = videoType.split('-');
      const videoPath = theme.videos[type]?.[device];

      // 비디오 경로 설정
      const video = cell.querySelector('.playful-video-player');
      if (video && videoPath) {
        const source = video.querySelector('source');
        if (source) {
          source.src = videoPath;
        } else {
          video.src = videoPath;
        }
        cell.dataset.videoPath = videoPath;

        // 비디오 로드 후 자동 재생
        video.load();
        const playVideo = () => {
          cell.classList.add('playing');
          video.play().catch((err) => {
            console.log('Video autoplay prevented:', err);
            // 브라우저 정책으로 인한 자동 재생 실패는 무시
          });
        };

        if (video.readyState >= 2) {
          // 이미 로드된 경우 즉시 재생 시도
          playVideo();
        } else {
          video.addEventListener('loadedmetadata', playVideo, { once: true });
          video.addEventListener('canplay', playVideo, { once: true });
          video.addEventListener('loadeddata', playVideo, { once: true });
        }
      }
    });
  });
}

function updateBackgroundImage(theme) {
  // 배경 이미지는 CSS 클래스로 관리 (PC: bg_*.png, Mobile: mobile_bg_*.png)
  // updateSectionThemesBackground()에서 테마 클래스를 적용하여 처리
  // 인라인 스타일을 제거하여 미디어 쿼리가 정상 작동하도록 함
  const playfulSection = document.querySelector('.section-playful');
  if (playfulSection) {
    playfulSection.style.backgroundImage = '';
  }
}

function updateDiscoverFeatures(theme) {
  const isMobile = window.innerWidth <= 769;

  // 모바일이면 mobileDiscoverFeatures, 없으면 discoverFeatures 사용
  let features;
  if (isMobile && theme.mobileDiscoverFeatures) {
    features = theme.mobileDiscoverFeatures;
  } else if (theme.discoverFeatures) {
    features = theme.discoverFeatures;
  } else {
    return;
  }

  // Update title
  const playfulTitle = document.querySelector('.playful-title');
  if (playfulTitle) {
    const brTag = playfulTitle.querySelector('.mobile-br');
    const brHTML = brTag ? brTag.outerHTML : '';
    playfulTitle.innerHTML = features.title.replace(
      ' ',
      brHTML ? ` ${brHTML}` : ' '
    );
  }

  // Update video section
  const videoTitle = document.querySelector('.playful-text-block h3');
  const videoDescription = document.querySelector('.playful-text-block p');
  if (videoTitle) videoTitle.textContent = features.videoTitle;
  if (videoDescription)
    videoDescription.textContent = features.videoDescription;

  // Update feature cards
  const featureCards = document.querySelectorAll('.playful-feature');
  featureCards.forEach((card, index) => {
    if (features.cards[index]) {
      const cardData = features.cards[index];
      const img = card.querySelector('.feature-media img');
      const title = card.querySelector('.feature-text h3');
      const description = card.querySelector('.feature-text > p:first-of-type');
      const note = card.querySelector('.feature-note');

      if (img) {
        img.src = cardData.image;
        img.alt = `${cardData.title} preview`;
      }
      if (title) title.textContent = cardData.title;
      if (description) description.textContent = cardData.description;

      if (note && cardData.note) {
        note.textContent = cardData.note;
        note.style.display = 'block';
      } else if (note) {
        note.style.display = 'none';
      }
    }
  });

  console.log('Discover features updated:', features.title);
}

function updateReasonImages(theme) {
  const isMobile = window.innerWidth <= 769;

  // Reason Card 1-4: 모바일/PC 이미지 분리
  const reasonImages = [
    {
      id: 'reasonCardImage1',
      pc: 'assets/images/details/reasons-babycreatures.png',
      mobile: 'assets/images/details/mobile-reason-1.png',
    },
    {
      id: 'reasonCardImage2',
      pc: 'assets/images/details/reasons-space-wonders.png',
      mobile: 'assets/images/details/mobile-reason-2.png',
    },
    {
      id: 'reasonCardImage3',
      pc: 'assets/images/details/reasons-landscape.png',
      mobile: 'assets/images/details/mobile-reason-3.png',
    },
    {
      id: 'reasonCardImage4',
      pc: 'assets/images/details/reasons-car-display.png',
      mobile: 'assets/images/details/mobile-reason-4.png',
    },
  ];

  reasonImages.forEach((imgData) => {
    const img = document.getElementById(imgData.id);
    if (img) {
      img.src = isMobile ? imgData.mobile : imgData.pc;
    }
  });

  // Reasons Banner 이미지: 테마별로 다른 이미지 사용
  const reasonsBannerImage = document.getElementById('reasonsBannerImage');
  if (reasonsBannerImage) {
    const themeId = theme.id;
    let bannerSrc = 'assets/images/details/kv-banner-reasons.png'; // PC 기본

    //  테마별 배너 사용
    if (themeId === 'baby-animals') {
      bannerSrc = 'assets/images/details/kv-banner-reasons.png';
    } else if (themeId === 'space-wonders') {
      bannerSrc = 'assets/images/details/kv-banner-reasons-2.png';
    } else if (themeId === 'landscape') {
      bannerSrc = 'assets/images/details/kv-banner-reasons-3.png';
    }

    reasonsBannerImage.src = bannerSrc;
  }
}

function updateCreditText(theme) {
  const creditTextElement = document.getElementById('credit-text');
  if (creditTextElement)
    creditTextElement.innerHTML = theme.credit.replace(/\n/g, '<br>');
}

// ----------------------------------------
// Event Binding
// ----------------------------------------
function setupEventListeners() {
  document.querySelectorAll('.option-item').forEach((item) => {
    item.addEventListener('click', () =>
      handleOptionSelect(item.dataset.theme)
    );
  });

  document.querySelectorAll('.theme-card[data-theme]').forEach((card) => {
    card.addEventListener('click', () =>
      handleOptionSelect(card.dataset.theme)
    );
  });

  document
    .querySelectorAll('.theme-selector[data-theme]')
    .forEach((selector) => {
      selector.addEventListener('click', () =>
        handleOptionSelect(selector.dataset.theme)
      );
    });

  // 모바일 드롭다운 이벤트 (커스텀 셀렉트 박스)
  const mobileThemeBox = document.querySelector('.mobile-theme-dropdown');
  const mobileThemeSelect = document.getElementById('mobileThemeSelect');
  const mobileThemeList = document.querySelector(
    '.mobile-theme-dropdown .theme-list'
  );

  if (mobileThemeSelect && mobileThemeList && mobileThemeBox) {
    // 셀렉트 버튼 클릭 시 mobile-theme-dropdown에 active 토글
    mobileThemeSelect.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileThemeBox.classList.toggle('active');
    });

    // 리스트 항목 클릭 시
    const themeItems = mobileThemeList.querySelectorAll('li');
    themeItems.forEach((item) => {
      item.addEventListener('click', () => {
        const themeValue = item.getAttribute('value');
        mobileThemeSelect.textContent = item.textContent;
        mobileThemeBox.classList.remove('active');
        if (mobileThemeBox) {
          mobileThemeBox.setAttribute('data-theme', themeValue);
        }
        handleOptionSelect(themeValue);
      });
    });
  }

  // 외부 클릭 시 드롭다운 닫기
  document.addEventListener('click', (e) => {
    if (mobileThemeBox && !e.target.closest('.mobile-theme-dropdown')) {
      mobileThemeBox.classList.remove('active');
    }
  });

  const btnLike = document.getElementById('btnLike');
  if (btnLike) btnLike.addEventListener('click', handleLikeClick);

  const btnBuy = document.getElementById('btnBuy');
  if (btnBuy) btnBuy.addEventListener('click', handleBuyClick);

  // Playful video cells click handlers (inline video playback)
  document.querySelectorAll('.playful-video-cell').forEach((cell) => {
    cell.addEventListener('click', () => handlePlayfulVideoClick(cell));
  });

  window.addEventListener('resize', handleResize);
}

// ----------------------------------------
// Event Handlers
// ----------------------------------------
function handleOptionSelect(themeId) {
  if (!themeId || themeId === currentTheme) return;

  currentTheme = themeId;

  const theme = themeData[currentTheme];
  if (!theme) return;

  updateTopBar(theme);
  updateProductInfo(theme);
  updateOptionList();
  // updateKVSection(theme);
  updatePreviewImages(theme);
  updatePriceSection(theme);
  updateThemeSelectors();
  updateSectionThemesBackground();
  updateDiscoverShots(theme);
  updateBackgroundImage(theme);
  updateDiscoverFeatures(theme);
  updateReasonImages(theme);
  updateCreditText(theme);
  updateMobileDropdown();

  // Sticky 요소로 스크롤 이동
  scrollToThemeSelector();

  themeNames = theme.themeNames;
}

function handleLikeClick() {
  const btnLike = document.getElementById('btnLike');
  if (!btnLike) return;

  isLiked = !isLiked;
  btnLike.classList.toggle('active', isLiked);

  console.log('Like status:', isLiked);
}

function handleBuyClick() {
  const theme = themeData[currentTheme];
  if (!theme) return;

  console.log('Buy button clicked');
  console.log('Selected theme:', theme.name);
  console.log('Price:', formatPrice(theme.price));

  alert(
    `Proceeding to checkout\nTheme: ${theme.name}\nPrice: ${formatPrice(theme.price)}`
  );
}

function handleResize() {
  // 모바일/PC 전환 시 KV 이미지, Preview 이미지, Discover 이미지, 텍스트, Reason 이미지 업데이트
  const theme = themeData[currentTheme];
  if (theme) {
    // updateKVSection(theme);
    updatePreviewImages(theme);
    updateDiscoverShots(theme);
    updateDiscoverFeatures(theme);
    updateReasonImages(theme);
    updateCreditText(theme);
  }
}

// ----------------------------------------
// Swiper
// ----------------------------------------
function initSwiper() {
  swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 3000, // 3초마다 슬라이드 전환
      disableOnInteraction: false, // 사용자가 조작해도 자동 재생 유지
      pauseOnMouseEnter: true, // 마우스를 올리면 일시 정지 (핵심 옵션)
    },
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
// Utilities
// ----------------------------------------
function formatPrice(price) {
  return `₩ ${price.toLocaleString('ko-KR')}`;
}

function showError(message) {
  console.error(message);
}

function scrollToThemeSelector() {
  // sticky-wrapper로 스크롤 이동
  const stickyWrapper = document.querySelector('.sticky-wrapper');

  if (stickyWrapper) {
    // 요소의 top 위치로 smooth 스크롤
    const elementPosition =
      stickyWrapper.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  }
}

// Performance helpers
let resizeTimeout = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleResize, 250);
});

// Lazy loading fallback
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        obs.unobserve(img);
      }
    });
  });

  document
    .querySelectorAll('img[data-src]')
    .forEach((img) => observer.observe(img));
}

// ========================================
// Playful Videos: Inline Video Playback
// ========================================
function handlePlayfulVideoClick(cell) {
  const video = cell.querySelector('.playful-video-player');
  if (!video) return;

  const videoPath = cell.dataset.videoPath;
  if (!videoPath) {
    console.warn('Video path not found for:', cell.dataset.videoType);
    return;
  }

  // 이미 재생 중이면 일시정지, 아니면 재생
  if (cell.classList.contains('playing')) {
    video.pause();
    cell.classList.remove('playing');
  } else {
    // 다른 셀의 재생 중지
    const allCells = document.querySelectorAll('.playful-video-cell');
    allCells.forEach((otherCell) => {
      if (otherCell !== cell && otherCell.classList.contains('playing')) {
        const otherVideo = otherCell.querySelector('.playful-video-player');
        if (otherVideo) {
          otherVideo.pause();
          otherVideo.currentTime = 0;
        }
        otherCell.classList.remove('playing');
      }
    });

    // 비디오 소스가 없으면 설정
    const source = video.querySelector('source');
    if (source && !source.src) {
      source.src = videoPath;
      video.load();
    } else if (!video.src) {
      video.src = videoPath;
      video.load();
    }

    // 재생
    cell.classList.add('playing');
    video.play().catch((err) => {
      console.log('Video play failed:', err);
      cell.classList.remove('playing');
    });
  }
}

// ----------------------------------------
// Footer Navigation Menu Toggle
// ----------------------------------------
function setupFooterMenu() {
  const btn = document.querySelector('button.nav-item');
  const menu = document.getElementById(btn?.getAttribute('aria-controls'));
  if (!btn || !menu) return;

  const closeMenu = () => {
    btn.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    menu.hidden = expanded;
  };

  btn.addEventListener('click', toggleMenu);

  // 메뉴 항목 클릭 시 닫기
  menu
    .querySelectorAll('.sub-item')
    .forEach((item) => item.addEventListener('click', closeMenu));

  // 바깥 클릭 시 닫기
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      closeMenu();
    }
  });
}

document.addEventListener('DOMContentLoaded', setupFooterMenu);

// Testing Support (optional)
// ----------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadThemeData,
    getQueryParam,
    formatPrice,
    handleOptionSelect,
  };
}
