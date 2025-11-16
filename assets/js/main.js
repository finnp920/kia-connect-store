// Kia Connect Store - National Geographic Display Themes
// Main JavaScript File

// ----------------------------------------
// Global State
// ----------------------------------------
const themeNames = Object.keys(themeData);
let currentTheme = themeNames[0];
let currentSlide = 1;
let carouselInterval = null;
let isLiked = false;
let realSlideCount = 3; // 실제 슬라이드 개수

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
    setupEventListeners();
    initCarousel();
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
  updateKVSection(theme);
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
  // const productName = document.getElementById('productName');
  const productDescription = document.getElementById('productDescription');
  const productThumbnail = document.getElementById('productThumbnail');
  const thumbnailWrapper = productThumbnail?.closest('.thumbnail-wrapper');

  // if (productName) {
  //   const productTitle = theme.name || theme.fullName || '';
  //   productName.textContent = productTitle;
  //   productName.setAttribute('title', productTitle);
  // }

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

function updateKVSection(theme) {
  const kvTitle = document.getElementById('kvTitle');
  const kvSubtitle = document.getElementById('kvSubtitle');

  // 모바일 여부 확인
  const isMobile = window.innerWidth <= 360;

  // 모바일이면 mobileKvTitle/mobileKvSubtitle 사용, 없으면 기본값 사용
  const titleText =
    isMobile && theme.mobileKvTitle ? theme.mobileKvTitle : theme.kvTitle;
  const subtitleText =
    isMobile && theme.mobileKvSubtitle
      ? theme.mobileKvSubtitle
      : theme.kvSubtitle;

  if (kvTitle) kvTitle.innerHTML = titleText.replace(/\n/g, '<br>');
  if (kvSubtitle) kvSubtitle.innerHTML = subtitleText.replace(/\n/g, '<br>');

  // 테마에 따라 body에 data-theme 속성 설정
  document.body.setAttribute('data-theme', theme.id);

  // 사용할 이미지 배열 결정 (모바일이면 mobile-kv 이미지, PC면 기본 kv 이미지)
  const kvImages =
    isMobile && theme.mobileKvImages ? theme.mobileKvImages : theme.kvImages;

  // 클론을 제외한 원본 슬라이드만 선택
  const kvSlides = document.querySelectorAll('.kv-slide:not(.clone)');
  kvSlides.forEach((slide, index) => {
    const img = slide.querySelector('img[data-role="kv-shot"]');
    if (img && kvImages?.[index]) {
      img.src = kvImages[index];
    }
  });

  // 클론 슬라이드도 업데이트 (무한 스크롤을 위해)
  const slidesContainer = document.querySelector('.kv-slides');
  if (slidesContainer) {
    const allSlides = slidesContainer.querySelectorAll('.kv-slide');
    const clones = Array.from(allSlides).filter((s) =>
      s.classList.contains('clone')
    );

    clones.forEach((clone) => {
      const img = clone.querySelector('img[data-role="kv-shot"]');
      if (img) {
        // 첫 번째 클론(마지막 슬라이드의 복사본)
        if (clone === allSlides[0]) {
          img.src = kvImages[kvImages.length - 1] || kvImages[0];
        }
        // 마지막 클론(첫 번째 슬라이드의 복사본)
        else if (clone === allSlides[allSlides.length - 1]) {
          img.src = kvImages[0];
        }
      }
    });
  }
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
  const isMobile = window.innerWidth <= 360;
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
    const labelValue = themeLabels[key] || defaultLabels[key];
    element.textContent = labelValue;
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
  const sectionThemes = document.querySelector('.section-themes');
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

  const sectionPlayful = document.querySelector('.section-playful');
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
  if (mobileThemeSelect) {
    mobileThemeSelect.value = currentTheme;
  }
}

function updateDiscoverShots(theme) {
  if (!theme || !theme.videos) return;

  const videoItems = document.querySelectorAll('.playful-video-item');
  const isMobile = window.innerWidth <= 360;

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
  const isMobile = window.innerWidth <= 360;

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
  const isMobile = window.innerWidth <= 360;

  // Reason Card 1-4: 모바일/PC 이미지 분리
  const reasonImages = [
    {
      id: 'reasonCardImage1',
      pc: theme.kvImages?.[0] || 'assets/images/details/kv-slide-1.png',
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

    if (isMobile) {
      // 모바일에서는 테마별 배너 사용
      if (themeId === 'baby-animals') {
        bannerSrc = 'assets/images/details/mobile-kv-banner-reasons-1.png';
      } else if (themeId === 'space-wonders') {
        bannerSrc = 'assets/images/details/mobile-kv-banner-reasons-2.png';
      } else if (themeId === 'landscape') {
        bannerSrc = 'assets/images/details/mobile-kv-banner-reasons-3.png';
      }
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

  // 모바일 드롭다운 이벤트
  const mobileThemeSelect = document.getElementById('mobileThemeSelect');
  if (mobileThemeSelect) {
    mobileThemeSelect.addEventListener('change', (e) => {
      handleOptionSelect(e.target.value);
    });
  }

  const btnLike = document.getElementById('btnLike');
  if (btnLike) btnLike.addEventListener('click', handleLikeClick);

  const btnBuy = document.getElementById('btnBuy');
  if (btnBuy) btnBuy.addEventListener('click', handleBuyClick);

  const prevArrow = document.querySelector('.kv-arrow-prev');
  if (prevArrow)
    prevArrow.addEventListener('click', () => navigateCarousel('prev'));

  const nextArrow = document.querySelector('.kv-arrow-next');
  if (nextArrow)
    nextArrow.addEventListener('click', () => navigateCarousel('next'));

  document.querySelectorAll('.kv-indicator').forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });

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
  updateKVSection(theme);
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

  currentSlide = 1; // 클론 때문에 1로 리셋
  updateCarousel(true);
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
  // 화면 크기 변경 시 캐러셀 업데이트
  updateCarousel();

  // 모바일/PC 전환 시 KV 이미지, Preview 이미지, Discover 이미지, 텍스트, Reason 이미지 업데이트
  const theme = themeData[currentTheme];
  if (theme) {
    updateKVSection(theme);
    updatePreviewImages(theme);
    updateDiscoverShots(theme);
    updateDiscoverFeatures(theme);
    updateReasonImages(theme);
    updateCreditText(theme);
  }
}

// ----------------------------------------
// Carousel
// ----------------------------------------
function initCarousel() {
  setupInfiniteSlides();
  startCarouselAutoPlay();

  const carousel = document.getElementById('kvCarousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopCarouselAutoPlay);
    carousel.addEventListener('mouseleave', startCarouselAutoPlay);
  }

  setupCarouselTouchSupport();
}

function setupInfiniteSlides() {
  const slidesContainer = document.querySelector('.kv-slides');
  if (!slidesContainer) return;

  const slides = Array.from(slidesContainer.querySelectorAll('.kv-slide'));
  realSlideCount = slides.length;

  // 마지막 슬라이드 클론을 맨 앞에 추가
  const lastClone = slides[slides.length - 1].cloneNode(true);
  lastClone.classList.add('clone');
  slidesContainer.insertBefore(lastClone, slides[0]);

  // 첫 번째 슬라이드 클론을 맨 뒤에 추가
  const firstClone = slides[0].cloneNode(true);
  firstClone.classList.add('clone');
  slidesContainer.appendChild(firstClone);

  // 초기 위치 설정 (클론을 건너뛰고 첫 번째 실제 슬라이드)
  updateCarousel(true);
}

function startCarouselAutoPlay() {
  stopCarouselAutoPlay();
  carouselInterval = setInterval(() => navigateCarousel('next'), 3000);
}

function stopCarouselAutoPlay() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
}

function navigateCarousel(direction) {
  if (direction === 'next') {
    currentSlide++;
    updateCarousel();

    // 마지막 클론에 도달하면 첫 번째 실제 슬라이드로 점프
    if (currentSlide === realSlideCount + 1) {
      setTimeout(() => {
        currentSlide = 1;
        updateCarousel(true);
      }, 500);
    }
  } else {
    currentSlide--;
    updateCarousel();

    // 첫 번째 클론에 도달하면 마지막 실제 슬라이드로 점프
    if (currentSlide === 0) {
      setTimeout(() => {
        currentSlide = realSlideCount;
        updateCarousel(true);
      }, 500);
    }
  }
}

function goToSlide(index) {
  currentSlide = index + 1; // 클론 때문에 +1
  updateCarousel();
}

function updateCarousel(noTransition = false) {
  const carousel = document.getElementById('kvCarousel');
  const slidesContainer = carousel?.querySelector('.kv-slides');
  const indicators = document.querySelectorAll('.kv-indicator');

  if (slidesContainer) {
    if (noTransition) {
      slidesContainer.classList.add('no-transition');
    }

    const translateX = -(currentSlide * carousel.offsetWidth);
    slidesContainer.style.transform = `translateX(${translateX}px)`;

    // transition을 끈 경우, 다음 프레임에 다시 켜기
    if (noTransition) {
      setTimeout(() => {
        slidesContainer.classList.remove('no-transition');
      }, 50);
    }
  }

  // 인디케이터는 실제 슬라이드 인덱스만 표시
  const realIndex =
    currentSlide === 0
      ? realSlideCount - 1
      : currentSlide === realSlideCount + 1
        ? 0
        : currentSlide - 1;

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === realIndex);
  });

  const kvSectionElement = document.querySelector('section.section-kv');
  if (kvSectionElement) {
    kvSectionElement.dataset.theme = themeNames[realIndex];
  }
}

function setupCarouselTouchSupport() {
  const carousel = document.getElementById('kvCarousel');
  const slides = carousel?.querySelector('.kv-slides');
  if (!carousel || !slides) return;

  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let startTranslate = 0;

  const getTranslateX = () => {
    return -(currentSlide * carousel.offsetWidth);
  };

  const setTranslate = (x) => {
    slides.style.transform = `translateX(${x}px)`;
  };

  // Touch events for mobile
  carousel.addEventListener(
    'touchstart',
    (event) => {
      startX = event.touches[0].clientX;
      currentX = startX;
      startTranslate = getTranslateX();
      isDragging = true;
      slides.classList.add('dragging');
      stopCarouselAutoPlay();
    },
    { passive: true }
  );

  carousel.addEventListener(
    'touchmove',
    (event) => {
      if (!isDragging) return;
      currentX = event.touches[0].clientX;
      const diff = currentX - startX;
      setTranslate(startTranslate + diff);
    },
    { passive: true }
  );

  carousel.addEventListener(
    'touchend',
    () => {
      if (!isDragging) return;
      isDragging = false;
      slides.classList.remove('dragging');

      const diff = startX - currentX;
      const threshold = 50;

      if (Math.abs(diff) >= threshold) {
        if (diff > 0) {
          navigateCarousel('next');
        } else {
          navigateCarousel('prev');
        }
      } else {
        updateCarousel();
      }

      startCarouselAutoPlay();
    },
    { passive: true }
  );

  // Mouse events for desktop drag
  carousel.addEventListener('mousedown', (event) => {
    startX = event.clientX;
    currentX = startX;
    startTranslate = getTranslateX();
    isDragging = true;
    slides.classList.add('dragging');
    carousel.style.cursor = 'grabbing';
    stopCarouselAutoPlay();
    event.preventDefault();
  });

  carousel.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    currentX = event.clientX;
    const diff = currentX - startX;
    setTranslate(startTranslate + diff);
    event.preventDefault();
  });

  const handleDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    slides.classList.remove('dragging');
    carousel.style.cursor = 'grab';

    const diff = startX - currentX;
    const threshold = 50;

    if (Math.abs(diff) >= threshold) {
      if (diff > 0) {
        navigateCarousel('next');
      } else {
        navigateCarousel('prev');
      }
    } else {
      updateCarousel();
    }

    startCarouselAutoPlay();
  };

  carousel.addEventListener('mouseup', handleDragEnd);
  carousel.addEventListener('mouseleave', handleDragEnd);

  // Set initial cursor style
  carousel.style.cursor = 'grab';
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

// Accessibility - keyboard navigation
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') navigateCarousel('prev');
  if (event.key === 'ArrowRight') navigateCarousel('next');
});

// Accessibility - pause autoplay when carousel is focused
document.addEventListener('focusin', (event) => {
  const carousel = document.getElementById('kvCarousel');
  if (carousel && carousel.contains(event.target)) {
    stopCarouselAutoPlay();
  }
});

document.addEventListener('focusout', (event) => {
  const carousel = document.getElementById('kvCarousel');
  if (carousel && !carousel.contains(event.relatedTarget)) {
    startCarouselAutoPlay();
  }
});

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

// ----------------------------------------
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
  menu.querySelectorAll('.sub-item').forEach((item) =>
    item.addEventListener('click', closeMenu)
  );

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
    navigateCarousel,
  };
}
