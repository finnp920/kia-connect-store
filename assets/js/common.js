//비디오 썸내일 콘트롤
$(document).ready(function () {
  checkStickyEnd('.promotionWrap .tabContentArea, .pdpDetail .tab-wrap');

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  $(document).on('click', '.pdpDetail .tab-menu .tab-btn', function () {
    const $thisBtn = $(this);
    const $tabWrap = $('.pdpDetail .tab-wrap');
    const $tabBtns = $('.pdpDetail .tab-menu .tab-btn');
    const $tabContents = $('.pdpDetail .tab-box');
    const currentIndex = $tabBtns.index($thisBtn); // index 구하기
    const currentTabBtnText = $thisBtn.text();

    // 탭 버튼 active 처리
    $tabBtns.closest('li').removeClass('active');
    $thisBtn.closest('li').addClass('active');

    // 탭 콘텐츠 show/hide
    $tabContents.removeClass('active');
    $tabContents.eq(currentIndex).addClass('active');


    // 스크롤 이동
    $('html, body').animate(
        {
          scrollTop: $tabWrap.offset().top - 60
        },
        200
    );

    // 모바일/태블릿 메뉴 닫기
    if ($('body').hasClass('moblie') || $('body').hasClass('tablet')) {
      $('.pdpDetail .tab-menu .btn-select').removeClass('open').text(currentTabBtnText);
      $('.pdpDetail .tab-menu ul').slideUp(200);
    }
  });

  $(document).on('click', '.pdpDetail .tab-menu .btn-select', function () {
    const $this = $(this);
    $this.toggleClass('open').next().slideToggle(200);
  });

  //윈도우 사이즈 반응형에 따른 스크립트
  const body = document.querySelector('body');
  var targetSize = '';

  // mobileOpenMenu에서 active 클래스를 가진 LI 요소로 스크롤 이동하는 함수
  function scrollToActiveMenuItem() {
    setTimeout(function () {
      const $activeLi = $('.mobileOpenMenu .menu li.active');
      const $menuContainer = $('.mobileOpenMenu .menu');
      if ($activeLi.length > 0 && $menuContainer.length > 0) {
        const activeLeft = $activeLi.position().left;
        const activeWidth = $activeLi.outerWidth();
        const containerWidth = $menuContainer.width();
        const scrollLeft = $menuContainer.scrollLeft();
        const activeCenter = activeLeft + activeWidth / 2;
        const targetScroll = scrollLeft + activeCenter - containerWidth / 2;

        $menuContainer.animate({ scrollLeft: targetScroll }, 300);
      }
    }, 100);
  }

  function handleWindowSize() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 500) {
      //모바일 class
      body.classList.remove('tablet', 'desktop');
      body.classList.add('moblie');

      if (targetSize != 'moblie') {
        menu_init();
        $(document).on('click', '.mobileCarlist > .mobilecarItem .btn-select', function (e) {
          const $btn = $(this);
          if ($btn.is('[data-only-popup]')) {
            e.stopPropagation();
            return;
          }
          if (!$btn.hasClass('noitem')) {
            $btn.next().slideToggle('fast');
            $btn.find('.arrow').toggleClass('on');
            $btn.toggleClass('on');

            if ($btn.hasClass('on')) {
              window.dataLayer.push({
                event: 'navigation',
                event_category: 'Navigation',
                event_action: 'Top menu',
                event_label: 'VIN'
              });
              printDL();
            }
          }
        });
        $(document).on('click', '.menuDepth1Wrap > .menuDepth1', function () {
          if ($(this).hasClass('on') == true) {
            $(this).next().slideToggle('fast');
            $(this).toggleClass('on');
          } else {
            $('.menuDepth1Wrap > .menuDepth1').removeClass('on');
            $('.menuDepth1Wrap > .menuDepth1').next().slideUp('fast');
            $(this).next().slideToggle('fast');
            $(this).toggleClass('on');
          }
        });

        $(document).on('click', '.moblie .menuDepth1Wrap > a.lower', function (e) {
          e.preventDefault();
        });

        $(document).on('click', '.btnClose, .menuWarp .menuDepth2Wrap a', function (e) {
          $('.menuWarp .menuDepth1').removeClass('on');
          $('.menuWarp .menuDepth2Wrap').hide();
          $('.menuWarp').css('right', '-110%');
          $('html').removeClass('scrollDisable');
        });
        $(document).on('click', '.closeBtn', function () {
          $('.menuWarp')
              .stop()
              .animate({ right: '-110%' }, { queue: true, duration: 300, easing: 'easeInOutExpo' });
          $('html').removeClass('scrollDisable');
        });
        $(document).on('click', '.burgurBtn', function () {
          $('.menuWarp')
              .stop()
              .animate({ right: '0' }, { queue: true, duration: 300, easing: 'easeInOutExpo' });
          $('html').addClass('scrollDisable');

          // mobileOpenMenu에서 active 클래스를 가진 LI 요소로 스크롤 이동
          scrollToActiveMenuItem();
        });
      }
      targetSize = 'moblie';
    } else if (windowWidth > 500 && windowWidth <= 1120) {
      //타블릿 class
      body.classList.remove('moblie', 'desktop');
      body.classList.add('tablet');

      if (targetSize != 'tablet') {
        menu_init();
        $(document).on("click", ".mobileCarlist > .mobilecarItem .btn-select", function (e) {
            const $btn = $(this);
            if ($btn.is("[data-only-popup]")) {
              e.stopPropagation();
              return;
            }
          if (!$(this).hasClass('noitem')) {
            $(this).next().slideToggle('fast');
            $(this).find('.arrow').toggleClass('on');
            $(this).toggleClass('on');
            if ($(this).hasClass('on')) {
              window.dataLayer.push({
                event: 'navigation',
                event_category: 'Navigation',
                event_action: 'Top menu',
                event_label: 'VIN'
              });
              printDL();
            }
          }
        });
        $(document).on('click', '.menuDepth1Wrap > .menuDepth1', function () {
          if ($(this).hasClass('on') == true) {
            $(this).next().slideToggle('fast');
            $(this).toggleClass('on');
          } else {
            $('.menuDepth1Wrap > .menuDepth1').removeClass('on');
            $('.menuDepth1Wrap > .menuDepth1').next().slideUp('fast');
            $(this).next().slideToggle('fast');
            $(this).toggleClass('on');
          }
        });
        $(document).on('click', '.tablet .menuDepth1Wrap > a.lower', function (e) {
          e.preventDefault();
        });

        $(document).on('click', '.btnClose, .menuWarp .menuDepth2Wrap a', function (e) {
          $('.menuWarp .menuDepth1').removeClass('on');
          $('.menuWarp .menuDepth2Wrap').hide();
          $('.menuWarp').css('right', '-36rem');
          $('html').removeClass('scrollDisable');
        });
        $(document).on('click', '.closeBtn', function () {
          $('.menuWarp')
              .stop()
              .animate({ right: '-36rem' }, { queue: true, duration: 300, easing: 'easeInOutExpo' });
          $('html').removeClass('scrollDisable');
        });
        $(document).on('click', '.burgurBtn', function () {
          $('.menuWarp')
              .stop()
              .animate({ right: '0' }, { queue: true, duration: 300, easing: 'easeInOutExpo' });
          $('html').addClass('scrollDisable');

          // mobileOpenMenu에서 active 클래스를 가진 LI 요소로 스크롤 이동
          scrollToActiveMenuItem();
        });
      }
      targetSize = 'tablet';
    } else {
      //데스크탑 class
      body.classList.remove('moblie', 'tablet');
      body.classList.add('desktop');

      if (targetSize != 'desktop') {
        let isEntered = false;
        menu_init();

        const $headerInner = $('.hederWarp_n .headerInner');
        let $menuBg = $('.menuBg');
        // menuBg가 없으면 생성 후 삽입
        console.log($menuBg.length);
        if ($menuBg.length <= 0) {
          $menuBg = $('<div class="menuBg" style="height:0;"></div>');
          $headerInner.append($menuBg);
        }

        $(document).on('mouseenter', '.desktop .gnb', function () {
          if (isEntered) return;
          isEntered = true;

          $('.menuDepth2Wrap').hide().stop(true).fadeIn(240);
          $('.desktop .menu').addClass('open');
          $('.desktop .hederWarp_n').addClass('menu-open');

          const menuDepth2WrapHeights = $('.desktop .menuDepth2Wrap')
              .toArray()
              .map(el => Math.floor($(el).outerHeight()));
          const menuDepth2WrapHeight = Math.max(...menuDepth2WrapHeights);

          // 강제로 리플로우 발생시켜야 transition 작동
          requestAnimationFrame(() => {
            $menuBg.css('height', `${menuDepth2WrapHeight + 80}px`);
          });
        });

        $(document).on('mouseleave', '.desktop .gnb, .desktop .menuBg', function (e) {
          const toElement = e.relatedTarget;

          // gnb, menuWarp, logoWrap, menu 내부로 이동한 경우는 무시
          if (
              $(toElement).closest(
                  '.desktop .gnb, .desktop .menuWarp, .desktop .logoWrap, .desktop .menuBg'
              ).length > 0
          ) {
            return;
          }

          $('.desktop .menuBg').css('height', '0');
          $('.menuDepth2Wrap').hide().stop(true);
          $('.desktop .menu').removeClass('open');
          $('.desktop .hederWarp_n').removeClass('menu-open');
          isEntered = false;
        });
      }
      targetSize = 'desktop';
    }

    $(document).on('click', '.menuDepth1Wrap > .menuDepth1', function () {
      window.dataLayer.push({
        event: 'navigation',
        event_category: 'Navigation',
        event_action: 'Top menu',
        event_label: $(this).data('dleventlabel')
      });
      printDL();
    });
  }
  window.addEventListener('resize', handleWindowSize);
  handleWindowSize();

  // 페이지 로드 시 초기 스크롤 위치 확인 (모바일/태블릿)
  // 최상단일 때는 scroll-up 클래스가 없어야 하므로 별도 처리 불필요

  function menu_init() {
    $(document).off('mouseenter', '.menuDepth1Wrap');
    $(document).off('mouseleave', '.menuDepth1Wrap');
    $(document).off('click', '.mobileCarlist > .mobilecarItem');
    $(document).off('click', '.menuDepth1Wrap > .menuDepth1');
    $(document).off('click', '.menuDepth1Wrap > a');
    $(document).off('click', '.closeBtn');
    $(document).off('click', '.burgurBtn');
    $('.mobileCarlist > .mobilecarItem').removeClass('on');
    $('.mobileCarlist > .mobilecarItem').find('.arrow').removeClass('on');
    $('.mobileCarlist > .mobilecarItem').next().css('display', 'none');
    $('.menuDepth1Wrap > .menuDepth1').removeClass('on');
    $('.menuDepth1Wrap > .menuDepth1').next().css('display', 'none');
    $('.menuWarp')
        .stop()
        .animate({ right: '-110%' }, { queue: true, duration: 500, easing: 'easeInOutExpo' });
    $('html').removeClass('scrollDisable');
  }

  initSwiper();

  $(window).on('resize', function () {
    ww = $(window).width();
    initSwiper();
    setBottomStickyPosition();
  });

  $(window).on('load', function () {
    setBottomStickyPosition();
  });

  // 페이지 로드 시 mobileOpenMenu에서 active 클래스를 가진 LI 요소로 스크롤 이동
  scrollToActiveMenuItem();

  //자동차 번호/메뉴/로그인 선택 슬라이드
  $('.menu > a, .user > a')
      .on('mouseover focusin', function () {
        $(this).addClass('on');
        $(this).next('.gnbMenu, .userMenu').addClass('on');
        $(this)
            .next('.gnbMenu, .userMenu')
            .on('mouseover focusin', function () {
              $(this).addClass('on');
            })
            .on('mouseleave', function () {
              $(this).removeClass('on');
            });
      })
      .on('mouseleave', function () {
        $(this).removeClass('on');
        $(this).next('.gnbMenu, .userMenu').removeClass('on');
      });

  let isOverCarItem = false;
  let isOverCarlistItem = false;

  $('.carlist').on('mouseenter', function () {
    isOverCarItem = true;
    $('.carItem, .carlistItem').addClass('on');
  });
  $('.carlist').on('mouseleave', function () {
    isOverCarItem = false;
    setTimeout(removeOnClassIfNeeded, 10);
  });

  function removeOnClassIfNeeded() {
    if (!isOverCarItem && !isOverCarlistItem) {
      $('.carItem, .carlistItem').removeClass('on');
    }
  }

  $('#slide-open').click(function () {
    if ($('#burgur').hasClass('on')) {
      $('#burgur').removeClass('on');
      $('.mMenuWarp').removeClass('on');
      $('.logo').removeClass('on');
      $('html').removeClass('scrollDisable');
    } else {
      $('#burgur').addClass('on');
      $('.mMenuWarp').addClass('on');
      $('html').addClass('scrollDisable');
      $('.logo').addClass('on');
    }
  });

  /*************************************
   accordion
   *************************************/
  $(document).on('click', '.accordion dl', function (e) {
    $(this).toggleClass('active');
    $(this).find('>dd.a').slideToggle();
    $(this).find('>dt.q').toggleClass('active');
    if (
        $('body>div.contentWarp').find('div.productView').length > 0 &&
        $(this).hasClass('active')
    ) {
      window.dataLayer.push({
        event: 'configurator',
        event_category: 'Product',
        event_action: 'Q&A',
        event_label: 'Details',
        customer_ID: ComUtils.getCookie('dlu') === null ? '' : ComUtils.getCookie('dlu'), //ID가 이메일 등의 개인정보일 경우 참고
        fod_product: $('h1.productName').text(), // eg ‘Vehicle To Grid’
        fod_qa_detail: $(this).find('dd.a>p').text().substr(0, 20),
        fod_review_detail: undefined
      });
    } else if (
        $('body>div.contentWarp').find('div.faqWarp').length > 0 &&
        $(this).hasClass('active')
    ) {
      window.dataLayer.push({
        event: 'FAQ',
        event_category: 'FAQ',
        event_action: $('ul.tabList>li.on>a').text(), //eg '전체', '회원', '상품' …
        event_label: $(this).find('dt>p>span').text().substr(0, 20), //eg'회원정보 수정은…'
        customer_ID: ComUtils.getCookie('dlu') === null ? '' : ComUtils.getCookie('dlu') //ID가 이메일 등의 개인정보일 경우 참고
      });
    }
  });

  /*************************************
   payment-history
   *************************************/
  $(document).on('click', '.openView', function () {
    $(this).next().slideToggle();
    $(this).toggleClass('active');
    $(this).next().siblings('.payAll').slideUp();
  });

  //top 버튼

  if ($(this).scrollTop() > 200) {
    $('.floating_menu').fadeIn();
  } else {
    $('.floating_menu').fadeOut();
  }

  var flagScroll = true;
  var lastScrollTop = 0;
  $(window).scroll(function () {
    var currentScrollTop = $(this).scrollTop();

    // 모바일/태블릿에서 스크롤 방향 감지
    if ($('body').hasClass('moblie') || $('body').hasClass('tablet')) {
      if (currentScrollTop <= 0) {
        // 최상단일 때는 scroll-up, scroll-down 클래스 모두 삭제
        $('body').removeClass('scroll-up scroll-down scroll-ing');
      } else if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        // 스크롤 DOWN - 헤더 숨김
        $('body').removeClass('scroll-up').addClass('scroll-down scroll-ing');
      } else if (currentScrollTop < lastScrollTop) {
        // 스크롤 UP - 헤더 노출
        $('body').addClass('scroll-up').removeClass('scroll-down scroll-ing');
      }

      lastScrollTop = currentScrollTop;
    }

    if ($(this).scrollTop() > 400) {
      $('.floating_menu').fadeIn();
    } else {
      $('.floating_menu').fadeOut();
    }
    // .editorWarp 위치 - 50px 이상 스크롤 시 .bottom-sticky 노출
    if ($('.editorWarp').length > 0 && !$('.bottom-sticky').is(':animated')) {
      var editorTop = $('.editorWarp').offset().top - 100;
      if (currentScrollTop >= editorTop) {
        $('body').addClass('bottom-sticky-visible');
      } else {
        $('body').removeClass('bottom-sticky-visible');
        $('body').removeClass('fold-sticky');
      }
    }

    //디스플레이테마 스크롤 시 스와이퍼 실행
    if ($(this).scrollTop() > 10) {
      if (flagScroll) {
        // console.log("스크롤 실행")
        pdpIntro();
        pdpDisplayThemeSwiper();
        pdpDisplayThemeSwiperDtl();
        pdpInCarGameSwiper();
        pdpInCarGameSwiperDtl();
        pdpDisplayThemeKbo();
        pdpDisplayThemeKboSwiperDtl();
        pdpSwiperDtl('.streamingPremium-swiper1');
        pdpSwiperDtl('.streamingPremium-swiper2');
        pdpSwiperDtl('.streamingPremium-swiper3');
        pdpVisualBgSwiper('.displayThemeDesney');

        flagScroll = false;
      }
    }
  });

  $(document).on('click', '.bottom-sticky .btn-fold', function () {
    const $bottomSticky = $('.bottom-sticky');
    const $floatingMenu = $('.floating_menu');
    const $btnFold = $(this);
    const currentBottom = parseInt($bottomSticky.css('bottom'));
    const stickyHeight = parseInt($bottomSticky.outerHeight());
    if (currentBottom === 0) {
      $bottomSticky.css('bottom', '-' + stickyHeight + 'px');
      $floatingMenu.css('bottom', '0');
      $btnFold.addClass('fold');
    } else {
      $bottomSticky.css('bottom', '0');
      $floatingMenu.css('bottom', stickyHeight + 'px');
      $btnFold.removeClass('fold');
    }
  });

  $('.floating_top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
    return false;
  });

  // product button click move to product options area
  $('.paymentButton .go-product').click(function () {
    $('html, body').animate(
        { scrollTop: $('.producOption.scroll').offset().top },
        400,
        function () {
          $('body').removeClass('scroll-up').addClass('scroll-down scroll-ing');
        }
    );
    return false;
  });

  //푸터 페밀리사이트
  const foot_famliy_btn = $('.familyBoxWarp').find('.btn-select');
  foot_famliy_btn.on('click', function () {
    $('.familyBoxWarp')
        .find('.list-member')
        .slideToggle('fast', function () {
          foot_famliy_btn.toggleClass('on', $(this).is(':visible'));
        });
  });

  $('.familyBoxWarp .cont-select').on('click', 'li>a', function () {
    $('.familyBoxWarp .list-member').hide();
    $('.familyBoxWarp .btn-select').removeClass('on');
  });

  //문의하기 글자 수 제한
  var maxInquiryContentsCount = 1000;

  // 글자수 체크 및 업데이트 함수
  function updateInquiryContentsCount($element, showAlert) {
    let content = $element.val() || '';
    let contentLength = content.length;

    // 최대 글자수 초과 시 자르기
    if (contentLength > maxInquiryContentsCount) {
      content = content.substring(0, maxInquiryContentsCount);
      $element.val(content);
      contentLength = maxInquiryContentsCount;
      if (showAlert) {
        alert('글자수는 ' + maxInquiryContentsCount + '자까지 입력 가능합니다.');
      }
    }

    // 글자수 표시 업데이트
    $('.textCount').html(`<em>${contentLength}</em>/${maxInquiryContentsCount}자`);
  }

  // 이벤트 리스너
  $('.inquiryContents').on('change keyup paste', function (e) {
    updateInquiryContentsCount($(this), true);
  });

  // 페이지 로드 시 초기값이 있으면 글자수 체크
  $('.inquiryContents').each(function () {
    updateInquiryContentsCount($(this), false);
  });

  // 문의하기 이미지 미리보기
  $('input[name="inquiryImgFile"]').change(function () {
    let fileSize = $(this)[0].files[0].size;
    let maxSize = 5 * 1024 * 1024;
    let check = $(this)[0].files[0].type.match('.jpg|.jpeg|.gif|.png');
    if (fileSize <= maxSize && check) {
      setImageFromFile(this, $(this).next().find('.inquiryImg'));
      $(this).parent().next().css('display', 'block');
    }
  });

  //PDP bottomSticky
  const $bottomSticky = $('.bottom-sticky');
  if ($bottomSticky.length > 0) {
      const stickyHeight = parseInt($bottomSticky.outerHeight());
      $bottomSticky.css('bottom', '-' + stickyHeight + 'px');
      $('.bottom-sticky .btn-fold').addClass('fold');
  }
});

var dtthumbClickFlag = false;
var flagAutoPlay = true;
// var swiperThemeDtl;
function pdpDisplayThemeSwiper() {
  if ($('.pdpDisplayThemeSwiper').length > 0) {
    var swiperTheme = new Swiper('.pdpDisplayThemeSwiper', {
      slidesPerView: 'auto',
      loop: true,
      freeMode: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
      speed: 3000,
      breakpoints: {
        // when window width is >= 320px
        320: {
          spaceBetween: 8
        },
        // when window width is >= 480px
        480: {},
        // when window width is >= 640px
        640: {
          spaceBetween: 15
        }
      },
      on: {
        init: function () {
          $('.displayTheme .dtthumb').each(function () {
            $(this).attr('data-click', 'false');
          });
        }
      }
    });

    $('.pdpDisplayThemeSwiper').hover(
        function () {
          if (flagAutoPlay == true) {
            swiperTheme.autoplay.stop();
          }
        },
        function () {
          if (flagAutoPlay == true) {
            swiperTheme.autoplay.start();
          }
        }
    );

    swiperTheme.el.onclick = function () {
      // 클릭 시 할 특별한 동작이 없더라도 이 핸들러를 설정해두면,
      // 사용자의 클릭으로 인한 상호작용으로 자동 재생이 중단되는 것을 방지할 수 있습니다.
    };
    $('.displayTheme .dtthumb').hover(
        function () {
          let leftPos = $(this).offset().left;
          if (dtthumbClickFlag === false) {
            $(this).append(
                `<div class="tooltip"><div class="msg">썸네일을 클릭하면 적용예시를 확인<br>할 수 있습니다.</div><button class="btn-close">x</button></div>`
            );
          }
        },
        function () {
          if ($('.displayTheme .tooltip').length > 0) {
            $('.displayTheme .tooltip').remove();
          }
        }
    );
  }

  flagScroll = false;
}

function pdpSwiperDtl(obj) {
  if ($(`${obj}`).length > 0) {
    var swiperThemeDtl = new Swiper(`${obj} .swiper`, {
      slidesPerView: 1,
      navigation: {
        nextEl: `${obj} .swiper-button-next`,
        prevEl: `${obj} .swiper-button-prev`
      },
      pagination: {
        el: `${obj} .swiper-pagination`
      },
      on: {
        init: function () {}
      }
    });
  }

  flagScroll = false;
}
function pdpDisplayThemeSwiperDtl() {
  if ($('.displayThemeDtl .swiper').length > 0) {
    var swiperThemeDtl = new Swiper('.displayThemeDtl .swiper', {
      slidesPerView: 1,
      navigation: {
        nextEl: '.displayThemeDtl .swiper-button-next',
        prevEl: '.displayThemeDtl .swiper-button-prev'
      },
      pagination: {
        el: '.displayThemeDtl .swiper-pagination'
      },
      on: {
        init: function () {
          $(document).on('click', '.displayTheme .dtthumb', function () {
            swiperThemeDtl.slideTo(0);
          });
        }
      }
    });
  }

  flagScroll = false;
}
function pdpInCarGameSwiper() {
  if ($('.inCarGame .visualBg').length > 0) {
  }
  var swiperTheme = new Swiper('.inCarGame .visualBg', {
    slidesPerView: 1,
    loop: true,
    freeMode: false,
    navigation: {
      nextEl: '.inCarGame .visualBg .swiper-button-next',
      prevEl: '.inCarGame .visualBg .swiper-button-prev'
    },
    pagination: {
      el: '.inCarGame .visualBg .swiper-pagination'
    },
    on: {
      init: function () {
        console.log('pdpInCarGameSwiper 실행한다');
      }
    }
  });
  if ($('.pdpInCarGameSwiper').length > 0) {
    var swiperTheme = new Swiper('.pdpInCarGameSwiper', {
      slidesPerView: 'auto',
      loop: true,
      freeMode: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
      speed: 3000,
      breakpoints: {
        // when window width is >= 320px
        320: {
          spaceBetween: 5
        },
        // when window width is >= 480px
        480: {},
        // when window width is >= 640px
        640: {
          spaceBetween: 10
        }
      },
      // navigation: {
      //   nextEl: ".inCarGame .swiper-button-next",
      //   prevEl: ".inCarGame .swiper-button-prev",
      // },
      on: {
        init: function () {
          // console.log('pdpInCarGameSwiper 실행한다')
        }
      }
    });

    $('.pdpInCarGameSwiper').hover(
        function () {
          if (flagAutoPlay == true) {
            swiperTheme.autoplay.stop();
          }
        },
        function () {
          if (flagAutoPlay == true) {
            swiperTheme.autoplay.start();
          }
        }
    );
  }
  flagScroll = false;
}

let inCarGameSwiper;
function pdpInCarGameSwiperDtl() {
  if ($('.inCarGameDtl').length > 0) {
    var inCarGameSwiper = new Swiper('.inCarGameDtlThumb', {
      spaceBetween: 6,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true
    });
    var inCarGameSwiper2 = new Swiper('.inCarGameDtl', {
      spaceBetween: 10,
      // navigation: {
      //     nextEl: ".inCarGameDtl .swiper-button-next",
      //     prevEl: ".inCarGameDtl .swiper-button-prev",
      // },
      thumbs: {
        swiper: inCarGameSwiper
      },
      on: {
        init: function () {
          $(document).on('click', '.inCarGame .dtthumb', function () {
            inCarGameSwiper.slideTo(0);
            inCarGameSwiper2.slideTo(0);
          });
          // const videoEle = `
          //   <video muted="" playsinline poster="../assets/images/kia/pdp/in_car_game/theme1-1.png">
          //     <source src="/kr/assets/images/kia/pdp/in_car_game/theme1-1.mp4" type="video/mp4" class="themeVideo">
          //   </video>
          // `;
          // $(".inCarGameDtlThumb .swiper-slide").eq(0).html(videoEle);
        }
      }
    });
  }
  flagScroll = false;
}

var beforeDtlImgPath = '';
$(document).on('click', '.inCarGame .dtthumb', function (e) {
  const thumbIdx = e + 1;
  const dtlImgPath = $(this).attr('value');
  const dtlImgs = $('.inCarGame .dtlImgs');
  $('.inCarGame .dtthumb').removeClass('active');
  $(this).addClass('active');

  dtlImgs.removeClass();
  dtlImgs.addClass(`comp_body dtlImgs ${dtlImgPath}`);

  $('.inCarGame .dtlImgs .item').addClass('change');
  setTimeout(function () {
    $('.inCarGame .dtlImgs .item').removeClass('change');
  }, 200);

  $('.inCarGame .themeImg').each(function (e) {
    const idx = e + 2;
    const src = $(this).attr('src');
    const lastIndex = src.lastIndexOf('/');
    const pathWithoutFileName = src.substring(0, lastIndex);
    $(this).attr('src', `${pathWithoutFileName}/${dtlImgPath}-${idx}.png`);
  });

  $('.inCarGame .video-slide').each(function (e) {
    const idx = e + 1;
    const src = $(this).find('.themeVideo').attr('src');
    const lastIndex = src.lastIndexOf('/');
    const pathWithoutFileName = src.substring(0, lastIndex);
    const videoEle = `
            <video class="videos" loop="" muted="" playsinline="" autoplay="" poster="${pathWithoutFileName}/${dtlImgPath}-1.png">
                <source src="${pathWithoutFileName}/${dtlImgPath}-1.mp4" type="video/mp4" class="themeVideo">
            </video>
        `;
    $(this).html(videoEle);

    // $(this).attr("src", `${pathWithoutFileName}/${dtlImgPath}-${idx}.mp4`);
  });

  $('.inCarGame .video-slideThumb').each(function (e) {
    $(this).removeClass(`${beforeDtlImgPath}`);
    const idx = e + 1;
    const src = $(this).find('.themeVideo').attr('src');
    const lastIndex = src.lastIndexOf('/');
    const pathWithoutFileName = src.substring(0, lastIndex);
    const videoEle = `
            <video loop="" muted="" playsinline="" poster="${pathWithoutFileName}/${dtlImgPath}-1.png">
                <source src="${pathWithoutFileName}/${dtlImgPath}-1.mp4" type="video/mp4" class="themeVideo">
            </video>
        `;

    $(this).addClass(`${dtlImgPath}`);
    // console.log("videoEle===", videoEle);
    beforeDtlImgPath = dtlImgPath;
    $(this).html(videoEle);

    // $(this).attr("src", `${pathWithoutFileName}/${dtlImgPath}-${idx}.mp4`);
  });
  $('.inCarGame .themeImgThumb').each(function (e) {
    const idx = e + 2;
    const src = $(this).attr('src');
    const lastIndex = src.lastIndexOf('/');
    const pathWithoutFileName = src.substring(0, lastIndex);

    $(this).attr('src', `${pathWithoutFileName}/${dtlImgPath}-${idx}.png`);
  });
  // const visualBgSrc = $(".visualBg img").attr("src");
  // const visualBgLastIndex = visualBgSrc.lastIndexOf("/");
  // const visualBgPathWithoutFileName = visualBgSrc.substring(0, visualBgLastIndex);

  // $(".visualBg img").attr("src", `${visualBgPathWithoutFileName}/${dtlImgPath}_screen.jpg`);

  flagAutoPlay = false;
});

$(document).on('click', '.displayTheme .dtthumb', function () {
  const dtlImgPath = $(this).attr('value');
  const dtlTeamPath = this.dataset.team;
  const dtlImgs = $('.dtlImgs');
  const dtthumbClickState = $(this).attr('data-click');

  if ($('.displayTheme .tooltip').length > 0) {
    $('.displayTheme .tooltip').remove();
  }

  $('.theme-story .btn-dtthumb').removeClass('active');

  const dtthumbItem = $(this).html();
  const dtthumbSelectedItem = $(`.swiper .dtthumb[value=${dtlImgPath}]`);
  const dtthumbHisSelectedItem = $(`.theme-story .dtthumb[value=${dtlImgPath}]`).parent();
  const dtthumbItemHtml = `
    <div class="btn-dtthumb active">
        <button class="dtthumb" value="${dtlImgPath}">
            ${dtthumbItem}
        </button>
        <div class="btn-remove">x</div>
    </div>
    `;

  $('.dtthumb').removeClass('active');
  dtthumbSelectedItem.addClass('active');
  dtthumbHisSelectedItem.addClass('active');

  $('.dtlImgs .item').addClass('change');
  setTimeout(function () {
    $('.dtlImgs .item').removeClass('change');
  }, 200);

  $('.themeImg').each(function (e) {
    const idx = e + 1;
    const src = $(this).attr('src');
    const lastIndex = src.lastIndexOf('/');
    const pathWithoutFileName = src.substring(0, lastIndex);

    $(this).attr('src', `${pathWithoutFileName}/${dtlImgPath}-${idx}.png`);
  });

  //KBO 웰컴/굿바이 비디오 변경
  if ($('.displayTheme-kbo').length > 0) {
    $(this).addClass('active');
    function updateVideoSource(selector, prefix) {
      $(selector).each(function () {
        const video = $(this)[0];
        const source = $(this).find('source')[0];

        if (video && source) {
          const src = $(source).attr('src');
          const pathWithoutFileName = src.substring(0, src.lastIndexOf('/'));
          const newSrc = `${pathWithoutFileName}/${prefix}_${dtlTeamPath}.mp4`;

          $(source).attr('src', newSrc);
          video.load();
          video.play().catch(err => {
            console.warn(`"${prefix}" 비디오 자동 재생 실패:`, err);
          });
        }
      });
    }

    updateVideoSource('.video-welcome', 'welcome');
    updateVideoSource('.video-goodbye', 'goodbye');
  }

  if (dtthumbClickState === 'false') {
    $('.theme-story').append(dtthumbItemHtml);
    $(this).attr('data-click', 'true');
    dtthumbSelectedItem.addClass('selected');
  }

  $('.btn-dtthumb .btn-remove').click(function () {
    const dtthumbValue = $(this).closest('.btn-dtthumb').find('.dtthumb').attr('value');
    const selectedItem = $(`.pdpDisplayThemeSwiper .dtthumb[value=${dtthumbValue}]`);
    $(this).closest('.btn-dtthumb').remove();
    selectedItem.attr('data-click', 'false');
    selectedItem.removeClass('selected');
  });

  dtthumbClickFlag = true;
});

function pdpIntro() {
  // dpThemeVideo 요소가 존재하는지 확인
  if ($('.video_wrap').length > 0) {
    // .video_wrap 내 모든 비디오 요소 선택
    const videoElements = document.querySelectorAll('.video_wrap video');
    let cookieVal;
    $('.editorWarp').addClass('playing');

    const videoWrap = $('.editorWarp .video_wrap');

    const youtubeId = $('.youtube-box').attr('value');
    const youtubeFrame =
        '<iframe src="https://www.youtube.com/embed/' +
        youtubeId +
        '?autoplay=0&controls=1&rel=0&showsearch=0" title="YouTube video player" allow="accelerometer; clipboard-black; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    $('.editorWarp .youtube-box').html(youtubeFrame);

    switch (true) {
      case $('.displayTheme').length > 0:
        cookieVal = 'displayThemeIntro';
        break;
      case $('.inCarGame').length > 0:
        cookieVal = 'inCarGameIntro';
        break;
      case $('.srsPlus').length > 0:
        cookieVal = 'srsPlusIntro';
        break;
      case $('.streamingPremium').length > 0:
        cookieVal = 'streamingPremiumIntro';
        break;
    }

    $('.close-today').html(
        `<span onclick="hideTodayIntroPopup('${cookieVal}')" style="cursor:pointer"><input type="checkbox"> 오늘 하루 재생하지 않기</span>`
    );

    $('.btn-intro')
        .css({ display: 'flex', opacity: '0', marginTop: '2rem' })
        .animate({ opacity: '1', marginTop: '0' }, 400);
    if (getCookie(cookieVal)) {
      $('.editorWarp').removeClass('playing');
      $('.video_wrap').css('display', 'none');

      $('.close-today input').attr('checked', 'checked');
      // videoElements[0].pause();
      // videoElements[0].currentTime = 0;

      $('.close-today').html(
          `<span onclick="deleteCookie('${cookieVal}')" style="cursor:pointer"><input type="checkbox"> 오늘 하루 재생하지 않기</span>`
      );
      $('.editorWarp .youtube-box').html('');
    } else {
      $('.video_wrap').css({ display: 'flex', opacity: '0' }).animate({ opacity: '1' }, 200);
      $('.close-today').html(
          `<span onclick="hideTodayIntroPopup('${cookieVal}')" style="cursor:pointer"><input type="checkbox"> 오늘 하루 재생하지 않기</span>`
      );
      $('.editorWarp .youtube-box').html(youtubeFrame);
    }

    // .btn-intro 버튼 클릭 시 비디오 재생
    $(document).on('click', '.editorWarp .btn-intro', function () {
      // console.log('intro 다시 실행');
      $('.editorWarp').addClass('playing');
      if (getCookie(cookieVal)) {
        $('.close-today input').attr('checked', 'checked');
      }
      $('.editorWarp .youtube-box').html(youtubeFrame);
      $(videoWrap).show();
      // if (video) {
      //   video.currentTime = 0;
      //   video.play();
      // }
    });

    // .btn-close 버튼 클릭 시 비디오 숨기기
    $(document).on('click', '.video_wrap .btn-close', function () {
      // console.log("btn close 실행");
      $('.editorWarp').removeClass('playing');
      $(videoWrap).hide();
      $('.editorWarp .youtube-box').empty();
      // if (video) {
      //   video.currentTime = 0;
      //   video.pause();
      // }
    });

    /*
    videoElements.forEach((video) => {
      const btnIntro = $(".editorWarp .btn-intro");
      const btnClose = $(".video_wrap .btn-close");
      const btnPlay = $(".video_wrap .btn-play");
      // console.log("Intro 실행");

      // 비디오 요소가 존재하는지 확인
      if (video) {
        // 비디오 재생이 끝났을 때 이벤트 리스너 추가
        video.addEventListener("ended", function () {
          // console.log("addEventListener ended 실행");
          $(".editorWarp").removeClass("playing");
          video.currentTime = 0;
          video.pause();
          $(videoWrap).hide();

          // 비디오 재생이 끝나면 비디오 숨기기
          // $(videoWrap).fadeOut('fast',function(){
          //     console.log("fadeOut 실행")
          //     video.currentTime = 0;
          //     video.pause();
          // });
        });
        video.addEventListener("pause", () => {
          btnPlay.removeClass("pause");
          btnPlay.addClass("play");

          videoWrap.removeClass("played");
          videoWrap.addClass("paused");
        });

        // 비디오가 재생되었을 때 호출되는 함수
        video.addEventListener("play", () => {
          btnPlay.addClass("pause");
          btnPlay.removeClass("play");

          videoWrap.addClass("played");
          videoWrap.removeClass("paused");
        });
      }
    });
    */

    // 주석 처리된 부분: 버튼 클릭 시 비디오 숨기기
    // $(btnClose).on('click', function() {
    //     $(videoWrap).show()
    //     // .fadeOut('fast',function(){
    //     //     video.currentTime = 0;
    //     //     video.pause();
    //     // });
    // });
  }
}

$(document).on('click', '.video_wrap .btn-play.play', function () {
  // console.log("intro 플레이");
  const btnPlay = $('.video_wrap .btn-play');
  const videoElements = document.querySelectorAll('.video_wrap video');

  if (videoElements) {
    btnPlay.removeClass('play');
    btnPlay.addClass('pause');
    videoElements[0].play();
  }
});
$(document).on('click', '.video_wrap .btn-play.pause', function () {
  // console.log("intro 정지");
  const btnPlay = $('.video_wrap .btn-play');
  const videoElements = document.querySelectorAll('.video_wrap video');

  if (videoElements) {
    btnPlay.addClass('play');
    btnPlay.removeClass('pause');
    videoElements[0].pause();
  }
});
$(document).on('click', '.video_wrap .btn-sound', function () {
  const videoElements = document.querySelectorAll('.video_wrap video');

  if (videoElements) {
    videoElements[0].muted = !videoElements[0].muted;
    $(this).toggleClass('on');
  }
});

//마이페이지 lnb 스와이프
var ww = $(window).width();
var mySwiper = undefined;
var swiper = null;
function initSwiper() {
  if (ww < 800 && mySwiper == undefined) {
    swiper = new Swiper('.lnbList', {
      slidesPerView: 'auto',
      on: {
        click: function (swiper) {
          let getEventLabel = $(
              '.lnbList>ul>li:nth-of-type(' + (swiper.clickedIndex + 1) + ')>a'
          ).data('dleventlabel');
          if (getEventLabel) {
            myLnbTagManager(getEventLabel);
          }

          location.href = $('.lnbList > ul > li').eq(swiper.clickedIndex).find('a').attr('href');
        }
      }
    });
  } else if (ww >= 800 && mySwiper != undefined) {
    mySwiper.destroy();
    mySwiper = undefined;
  }
}

// 마이페이지 태그매니저
function myLnbTagManager(label) {
  window.dataLayer.push({
    event: 'navigation',
    event_category: 'My page',
    event_action: 'Left menu',
    event_label: label, // eg 메뉴 순서대로 'Purchase history', 'Payment history', 'Wish list', 'Product review', 'Coupon details', 'Notices details', 'Inquiry details', 'My information'
    customer_ID: undefined,
    fod_product: undefined,
    fod_review_detail: undefined
  });
}

// 문의하기 이미지 미리보기
function setImageFromFile(input, expression) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(expression).attr('src', e.target.result).attr('id', input.files[0].lastModified);
      $(expression).closest('.imgItem').find('.delImg').data('index', input.files[0].lastModified);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

//레이어 팝업 오픈 스크립트
function open_layer_popup(popid, addClass) {
  var popid = popid;
  $('#' + popid).css('display', 'flex');
  $('body').css('overflow', 'hidden');
  $('body').css('touch-action', 'none');
  if (addClass) {
    $('#' + popid).addClass(addClass);
  }
  $('#' + popid)
      .stop()
      .animate({ opacity: '1' }, { queue: true, duration: 450, easing: 'easeInOutExpo' });
  $('#' + popid + '>.popInner')
      .stop()
      .animate({ top: '50%' }, { queue: true, duration: 450, easing: 'easeInOutExpo' });
}

//레이어 팝업 클로즈 스크립트
function close_layer_popup(popid, isDuplicated = false, removeClass) {
  var popid = popid;
  if (popid === 'sharePopup' && !isDuplicated) {
    window.dataLayer.push({
      event: 'share',
      click_location: 'Copy FOD page url',
      click_text: '닫기'
    });
  }
  $('#' + popid)
      .stop()
      .animate(
          { opacity: '0' },
          {
            queue: true,
            duration: 200,
            easing: 'easeInOutExpo',
            complete: function () {
              $('#' + popid + '>.popInner').css('top', '53%');
              $('#' + popid).css('display', 'none');
            }
          }
      );
  if (removeClass) {
    $('#' + popid).removeClass(removeClass);
  }
  $('body').css('overflow', 'auto');
  $('body').css('touch-action', 'auto');
}

//[S]PDP 리뷰 더보기 관련
more_contents_chk();
function more_contents_chk() {
  $('.reviewItem').each(function (index, item) {
    if ($(item).find('.contents').height() >= 74) {
      $(item).find('.contents').addClass('abstracted');
      $(item).find('.contentMoreBtn').css('display', 'flex');
    }
  });
}

$(document).on('click', '.contentMoreBtn', function () {
  if ($(this).hasClass('active')) {
    $(this).parent().find('.contents').addClass('abstracted');
    $(this).removeClass('active');
    $(this).html('더보기');
  } else {
    $(this).parent().find('.contents').removeClass('abstracted');
    $(this).addClass('active');
    $(this).html('간단히');
  }
});
// [E]PDP 리뷰 더보기 관련

//PDP Lighting Pattern
$(document).on('click', '.lpthumb', function () {
  $(this).parent().find('li').removeClass('active');
  $(this).addClass('active');

  $('.lighting_pattern_movie').attr('src', $(this).attr('value'));
  $('.lighting_pattern_movie').get(0).load();
  let playPromise = $('.lighting_pattern_movie').get(0).play();
});

function setBottomStickyPosition() {
    const $bottomSticky = $('.bottom-sticky');
    if ($bottomSticky.length > 0) {
        const currentBottom = parseInt($bottomSticky.css('bottom'));
        const stickyHeight = parseInt($bottomSticky.outerHeight());
        if (currentBottom !== 0) {
            $bottomSticky.css('bottom', '-' + stickyHeight + 'px');
            $('.floating_menu').css('bottom', '0');
        } else {
            $('.floating_menu').css('bottom', stickyHeight + 'px');
        }
    }
}

function XSS_Check(strTemp, level) {
  let getType = typeof strTemp;
  if (getType === 'object') {
    strTemp = JSON.stringify(strTemp);
  }

  if (level == undefined || level == 0) {
    strTemp = strTemp.replaceAll(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-|\//g, '');
  } else if (level != undefined && level == 1) {
    strTemp = strTemp.replaceAll(/\</g, '&lt;');
    strTemp = strTemp.replaceAll(/\>/g, '&gt;');
    strTemp = strTemp.replaceAll(/\&/g, '&amp;');
    strTemp = strTemp.replaceAll(/\'/g, '&#x27;');
    strTemp = strTemp.replaceAll(/\"/g, '&quot;');
    strTemp = strTemp.replaceAll(/\(/g, '&#40;');
    strTemp = strTemp.replaceAll(/\)/g, '&#41;');
    strTemp = strTemp.replaceAll(/\//g, '&#x2F;');
  } else if (level != undefined && level == 2) {
    strTemp = strTemp.replaceAll(
        /alert|window|document|eval|cookie|this|self|parent|top|opener|function|constructor|script|on|\-+\\<>=/gi,
        ''
    );
  }

  if (getType === 'object') {
    strTemp = JSON.parse(strTemp);
  }
  return strTemp;
}

function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
}

function getUrlParameter(sParam) {
  let sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? false : sParameterName[1];
    }
  }
}

function enterVideo() {
  var playPromise = null;
  if ($('.withVideo').length > 0) {
    $('.withVideo').find('video').get(0).load();
    $('.withVideo').find('video').get(0).currentTime = 0;
    $(document).on('mouseenter', '.withVideo', function () {
      $(this)
          .find('.productSmallVideo > img')
          .stop()
          .animate({ opacity: '0' }, { queue: true, duration: 300, easing: 'easeInOutExpo' });
      playPromise = $(this).find('video').get(0).play();
    });
    $(document).on('mouseleave', '.withVideo', function () {
      $(this)
          .find('.productSmallVideo > img')
          .stop()
          .animate(
              { opacity: '1' },
              {
                queue: true,
                duration: 300,
                easing: 'easeInOutExpo',
                complete: function () {
                  if (playPromise !== undefined) {
                    playPromise
                        .then(_ => {
                          $(this).parent().find('video').get(0).pause();
                          $(this).parent().find('video').get(0).currentTime = 0;
                        })
                        .catch(error => {
                          console.log(error);
                        });
                  }
                }
              }
          );
    });
  }
}

function dlLoginAttempt() {
  window.dataLayer.push({
    event: 'navigation',
    event_category: 'Navigation',
    event_action: 'Top menu',
    event_label: 'Login/Register'
  });
  printDL();
}

$.fn.clearForm = function () {
  return this.each(function () {
    var type = this.type,
        tag = this.tagName.toLowerCase();
    if (tag === 'form') {
      return $(':input', this).clearForm();
    }
    if (type === 'text' || type === 'password' || type === 'hidden' || tag === 'textarea') {
      this.value = '';
    } else if (type === 'checkbox' || type === 'radio') {
      this.checked = false;
    } else if (tag === 'select') {
      this.selectedIndex = -1;
    }
  });
};
// 쿠키 설정 함수
function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

// 쿠키 가져오는 함수
function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
// 쿠키 삭제 함수
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  $('.close-today input').prop('checked', false);

  $('.close-today').html(
      `<span onclick="hideTodayIntroPopup('${name}')" style="cursor:pointer"><input type="checkbox"> 오늘 하루 재생하지 않기</span>`
  );
}

// 팝업을 숨기는 함수
function hideTodayIntroPopup(name) {
  const videoElements = document.querySelectorAll('.video_wrap video');
  // videoElements[0].pause();
  // videoElements[0].currentTime = 0;
  // $(".video_wrap").hide();
  // $(".editorWarp").removeClass("playing");
  if (name) {
    setCookie(name, 'true', 1);
  } else {
    setCookie('hideIntroPopup', 'true', 1);
  }
  $('.close-today').html(
      `<span onclick="deleteCookie('${name}')" style="cursor:pointer"><input type="checkbox" checked> 오늘 하루 재생하지 않기</span>`
  );
}

$(document).on('click', '.refund-area .btn-fold', function () {
  $(this).toggleClass('fold');
  $('.refund-area .dtl').slideToggle('fast');
});

// 십원 단위로 절사하는 함수
function truncateToTenwon(amount) {
  return Math.floor(amount / 10) * 10;
}

//알럿 레이어 팝업 클로즈 스크립트
function close_alert_popup(popid) {
  if (typeof popid === 'object') {
    popupId = $(popid).parents('.alertPopup');
  } else {
    popupId = $(`#${popid}`);
  }
  popupId.stop().animate(
      { opacity: '0' },
      {
        queue: true,
        duration: 200,
        easing: 'easeInOutExpo',
        complete: function () {
          $(this).find('.popInner').css('top', '53%');
          $(this).css('display', 'none');
        }
      }
  );
}

function pdpDisplayThemeKbo() {
  if ($('.pdpDisplayThemeKbo').length > 0) {
    $('.pdpDisplayThemeKbo .dtthumb').hover(
        function () {
          let leftPos = $(this).offset().left;
          if (dtthumbClickFlag === false) {
            $(this).append(
                `<div class="tooltip"><div class="msg">썸네일을 클릭하면 적용예시를 확인<br>할 수 있습니다.</div><button class="btn-close">x</button></div>`
            );
          }
        },
        function () {
          if ($('.pdpDisplayThemeKbo .tooltip').length > 0) {
            $('.pdpDisplayThemeKbo .tooltip').remove();
          }
        }
    );
  }

  flagScroll = false;
}

let swiperKboThemeDtl = undefined;
function swiperThemeKboDtlInit() {
  const ww = $(window).width();
  const $swiperContainer = $('.displayThemeKboDtl .swiper');

  if ($swiperContainer.length === 0) return;

  if (ww > 640) {
    if (!swiperKboThemeDtl) {
      swiperKboThemeDtl = new Swiper($swiperContainer[0], {
        slidesPerView: 1,
        navigation: {
          nextEl: '.displayThemeKboDtl .swiper-button-next',
          prevEl: '.displayThemeKboDtl .swiper-button-prev'
        },
        pagination: {
          el: '.displayThemeKboDtl .swiper-pagination'
        },
        on: {
          init: function () {
            $(document).on('click', '.pdpDisplayThemeKbo .dtthumb', function () {
              swiperKboThemeDtl.slideTo(0);
            });
          }
        }
      });
    }
  } else {
    if (swiperKboThemeDtl) {
      swiperKboThemeDtl.destroy();
      swiperKboThemeDtl = undefined;
    }
  }
}

function pdpDisplayThemeKboSwiperDtl() {
  // 초기에 실행
  swiperThemeKboDtlInit();

  // 리사이즈 이벤트 바인딩
  $(window).on('resize', function () {
    swiperThemeKboDtlInit();
  });

  flagScroll = false;
}

function slideToggle(button, element) {
  const $target = $(element).first();
  if ($target.length === 0) return;

  $target.stop(true, true).slideToggle(300);
  $(button).toggleClass('fold');
}
function pdpDisplayTab(button, element) {
  // tabmenu 기능 구현
  const tabWrap = $('.pdpDetail .tab-wrap');
  const tabBtn = $('.pdpDetail .tab-menu button');
  const currentTabBtn = $(button);
  const currentTabBtnText = $(button).text();
  tabBtn.closest('li').removeClass('active');
  currentTabBtn.closest('li').addClass('active');
  // 탭 컨텐츠 show/hide
  const tabContents = $('.pdpDetail .tab-box');
  const targetTabContents = $(element);
  tabContents.hide();
  targetTabContents.show();

  // 부드럽게 스크롤 이동
  $('html, body').animate(
      {
        scrollTop: tabWrap.offset().top - 60
      },
      200
  );

  if ($('body').hasClass('moblie') || $('body').hasClass('tablet')) {
    $('.pdpDetail .tab-menu .btn-select').removeClass('open').text(currentTabBtnText);
    $('.pdpDetail .tab-menu ul').slideUp(200);
  }
}
function pdpDisplayTabMobile() {
  // tabmenu 기능 구현
  const molbileTabBtn = $('.pdpDetail .tab-menu .btn-select');
  molbileTabBtn.toggleClass('open').next().slideToggle(200);
}

function pdpDisplayZoom(selector) {
  const $target = $(selector).clone();

  const $popup = $(`
        <div class="pdp-zoom">
          <div class="zoom-wrapper"></div>
          <button class="btn-close-zoom">닫기</button>
        </div>
      `);

  $popup.find('.zoom-wrapper').append($target);
  $('body').append($popup);

  $('.btn-close-zoom').on('click', function () {
    $popup.remove();
  });
}

function btnActive(selector) {
  $(selector).removeClass('active').addClass('active');
  const selectedValue = $('.coupon-list input[type="radio"]:checked');
  const selectedText = selectedValue.next('.coupon-item').find('strong').text();
  $('.coupon-active strong').text(selectedText);
}

// 동적으로 추가되는 .btn-info 요소를 위한 이벤트
$(document).on('mouseenter', '.carlist .btn-info', function (e) {
  // 이미 툴팁이 있다면 제거
  $('.tooltip').remove();

  const $btn = $(this);
  const $tooltip = $('<div class="tooltip"></div>');

  // 툴팁 내용 설정
  const tooltipText = $btn.data('tooltip') || '정보를 확인하세요';
  console.log('🚀 ~ tooltipText:', $btn.attr('data-tooltip'));
  $tooltip.html('<div class="tooltip-bubble"><em class="edge"></em>' + tooltipText + '</div>');

  // 툴팁을 .carlist에 추가
  $('.carlist').append($tooltip);

  // .carlist 요소의 offset 정보 가져오기
  const $carlist = $('.carlist');
  const carlistOffset = $carlist.offset();
  const carlistScrollTop = $carlist.scrollTop();
  const carlistScrollLeft = $carlist.scrollLeft();

  // 툴팁 위치 계산
  const tooltipWidth = $tooltip.outerWidth();
  const tooltipHeight = $tooltip.outerHeight();

  // .carlist 내에서의 상대적 위치 계산
  let left = e.pageX - carlistOffset.left + carlistScrollLeft - tooltipWidth / 2;
  let top = e.pageY - carlistOffset.top + carlistScrollTop - tooltipHeight + 70;

  // .carlist 내에서의 경계 체크
  const carlistWidth = $carlist.width();
  const carlistHeight = $carlist.height();
  const padding = 10; // 경계에서의 여백

  // 오른쪽 경계 체크 - 툴팁이 오른쪽으로 넘어가면 경계에 딱 붙게
  if (left + tooltipWidth > carlistWidth - padding) {
    left = carlistWidth - tooltipWidth - padding;
    $('.tooltip').addClass('right');
    console.log('오른쪽 경계에 딱 붙음');
  }

  // 왼쪽 경계 체크 - 툴팁이 왼쪽으로 넘어가면 경계에 딱 붙게
  if (left < padding) {
    left = padding;
    $('.tooltip').addClass('left');
    console.log('왼쪽 경계에 딱 붙음');
  }

  // 툴팁 위치 설정
  $tooltip.css({
    position: 'absolute',
    left: left + 'px',
    top: top + 'px',
    zIndex: 9999
  });

  // .edge 요소를 .btn-info 요소 위치로 이동
  const $edge = $tooltip.find('.edge');
  const edgeWidth = $edge.outerWidth();
  const edgeHeight = $edge.outerHeight();

  // .btn-info 요소의 위치 정보 가져오기
  const btnOffset = $btn.offset();
  const btnWidth = $btn.outerWidth();

  // .btn-info 요소가 툴팁 내에서의 상대적 위치 계산
  const btnXInTooltip =
      btnOffset.left - carlistOffset.left + carlistScrollLeft - left + btnWidth / 2;
  const btnYInTooltip = btnOffset.top - carlistOffset.top + carlistScrollTop - top;

  // .edge 요소의 위치 설정 (.btn-info 요소 위치 기준)
  $edge.css({
    position: 'absolute',
    left: btnXInTooltip - edgeWidth / 2 + 'px'
  });

  // 툴팁 표시
  $tooltip.fadeIn(200);
});

$(document).on('mouseleave', '.btn-info', function () {
  $('.tooltip').fadeOut(200, function () {
    $(this).remove();
  });
});

$(document).on('mouseleave', '.tooltip', function () {
  $(this).fadeOut(200, function () {
    $(this).remove();
  });
});

// PC 차량 선택
$(document).on('click', '.func .carlist .carlistItem .car-name', function (e) {
  // 클릭한 button 태그의 텍스트 가져오기
  var selectedText = $(this).find('span').text();

  // 상위 li에서 selected 클래스 제거
  $('.func .carlist .carlistItem ul li').removeClass('selected');

  // 클릭한 li에 selected 클래스 추가
  $(this).closest('li').addClass('selected');
  console.log(selectedText);

  // 상위 .carItem span에 선택된 텍스트 적용
  $('.func .carlist > .carItem span').text(selectedText);
  $('.func .carlist .carlistItem').removeClass('on');
});

// 모바일 차량 선택
$(document).on('click', '#carListPopup .popContents .carlistItem button', function (e) {
  // 클릭한 button 태그의 텍스트 가져오기
  var selectedText = $(this).find('strong').text();
  var selectedTextCode = $(this).find('em').text();

  // 상위 li에서 selected 클래스 제거
  $('#carListPopup .popContents .carlistItem ul li').removeClass('selected');

  // 클릭한 li에 selected 클래스 추가
  $(this).closest('li').addClass('selected');

  // 상위 .carItem span에 선택된 텍스트 적용
  // $(".hederWarp_n .headerInner .gnb .menuWarp .mobileCarlist .mobilecarItem .item strong").text(selectedText);
  // $(".hederWarp_n .headerInner .gnb .menuWarp .mobileCarlist .mobilecarItem .item span").text(selectedTextCode);
});

function pdpVisualBgSwiper(obj) {
  if ($(`${obj} .visualBg.swiper`).length > 0) {
    var swiperTheme = new Swiper(`${obj} .visualBg.swiper`, {
      slidesPerView: 1,
      loop: true,
      freeMode: false,
      navigation: {
        nextEl: `${obj} .visualBg .swiper-button-next`,
        prevEl: `${obj} .visualBg .swiper-button-prev`
      },
      pagination: {
        el: `${obj} .visualBg .swiper-pagination`
      },
      on: {
        init: function () {
          console.log('pdpInCarGameSwiper 실행한다');
        }
      }
    });
  }

  flagScroll = false;
}

function btnTabMenu(tabBtnNumber) {
  const $tabMenuLi = $('.tab-menu li');
  const $tabBtnText = $tabMenuLi.eq(tabBtnNumber).find('.tab-btn').text();
  const $tabContent = $('.tab-box');
  $tabMenuLi.removeClass('active');
  $tabMenuLi.eq(tabBtnNumber).addClass('active');
  $tabContent.hide().eq(tabBtnNumber).show();

  const $tabWrap = $('.pdpDetail .tab-wrap');
  // 스크롤 이동
  $('html, body').animate(
      {
        scrollTop: $tabWrap.offset().top - 60
      },
      200
  );

  // 모바일 일때
  if ($('body').hasClass('moblie') || $('body').hasClass('tablet')) {
    $('.tab-menu .btn-select').text($tabBtnText);
  }
}

// 공유하기 팝업 열릴 때 URL 설정
function openSharePopup() {
  window.dataLayer.push({
    event: 'share',
    click_location: 'Share FOD information',
    click_text: 'share button'
  });

  const shareUrl = getCanonicalUrl();
  document.getElementById('shareUrl').value = shareUrl;

  const userAgent = navigator.userAgent;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);

  // 모바일이고 navigator.share API가 지원되는 경우
  if (isMobile && navigator.share) {
    const shareData = { ...getShareMeta(), url: shareUrl };

    (async () => {
      try {
        await navigator.share(shareData);
        console.log('MDN shared successfully');
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    })();
  } else {
    console.log('navigator.share is not supported');
    open_layer_popup('sharePopup');
  }
}

// 링크 복사 함수
function copyShareLink() {
  window.dataLayer.push({
    event: 'share',
    click_location: 'Copy FOD page url',
    click_text: '링크복사'
  });

  var urlInput = document.getElementById('shareUrl');
  urlInput.select();
  urlInput.setSelectionRange(0, 99999); // 모바일 지원

  try {
    document.execCommand('copy');
    alert('링크가 복사되었습니다.');
    close_layer_popup('sharePopup', true);
  } catch (err) {
    // execCommand가 실패한 경우 (최신 브라우저)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(urlInput.value).then(function () {
        alert('링크가 복사되었습니다.');
        close_layer_popup('sharePopup', true);
      });
    } else {
      alert('링크 복사에 실패했습니다. 수동으로 복사해주세요.');
    }
  }
}

// Canonical URL 가져오기 (기존 유지)
function getCanonicalUrl() {
  const link = document.querySelector('link[rel="canonical"][href]');
  if (link && link.href) return link.href;

  const url = new URL(location.href);
  const params = new URLSearchParams(url.search);

  // 특정 페이지에서 필요한 파라미터만 유지
  const preserveParams = [];

  // event-view 페이지인 경우 eventNo, eventType 유지
  if (url.pathname.includes('/event-view')) {
    if (params.has('eventView')) preserveParams.push(['eventView', params.get('eventView')]);
    if (params.has('eventType')) preserveParams.push(['eventType', params.get('eventType')]);
  }

  // 필요한 파라미터만 설정
  url.search = '';
  preserveParams.forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  url.hash = '';
  console.log('Shared URL: ', url.toString());
  return url.toString();
}

// 제목과 설명 메타 가져오기 (기존 유지)
function getShareMeta() {
  const title =
      document.querySelector('meta[property="og:title"]')?.content ||
      document.querySelector('meta[name="title"]')?.content ||
      document.title;
  const desc =
      document.querySelector('meta[property="og:description"]')?.content ||
      document.querySelector('meta[name="description"]')?.content ||
      title;
  return { title, text: desc };
}

// tabNavigation sticky 끝 감지
// 사용법: checkStickyEnd(".tabContentArea") 또는 checkStickyEnd(".classA, .classB")
function checkStickyEnd(selector) {
  var $header = $('.hederWarp_n');
  var $body = $('body');

  function handleSticky() {
    var $target = $(selector).first();
    if (!$target.length) return;

    // Anchor가 없으면 생성 (최초 1회)
    var $anchor = $target.prev('.sticky-anchor-ref');
    if (!$anchor.length) {
      $anchor = $(
          '<div class="sticky-anchor-ref" style="height:0; margin:0; padding:0; visibility:hidden; pointer-events:none;"></div>'
      );
      $target.before($anchor);
    }

    var scrollTop = $(window).scrollTop();
    var headerHeight = $header.outerHeight() || 0;
    var stickyPoint = $anchor.offset().top - headerHeight;
    if (scrollTop >= stickyPoint) {
      if (!$body.hasClass('tab-sticky')) $body.addClass('tab-sticky');
    } else {
      if ($body.hasClass('tab-sticky')) $body.removeClass('tab-sticky');
    }
  }

  $(window).on('scroll resize', handleSticky);
  handleSticky();
}


// 앵커로 스크롤 이동 함수
function goToAnchor(anchorId) {
  const $target = $("#" + anchorId);
  if ($target.length > 0) {
    $("html, body").animate(
        {
          scrollTop: $target.offset().top - 60,
        },
        400,
    );
  }
}

// * infoSticky 영역의 구매 상태 정보를 업데이트하는 공통 함수
// * @param {object} purchaseStatus - 구매 상태 객체 (title, description, buttonText, code, activeButton)

function updateInfoStickyPurchaseStatus(purchaseStatus) {
  if (!purchaseStatus) {
    return;
  }

  // 초기 상태 표시 (stickyBlockWrap 숨김) - infoSticky만
  $('.infoSticky .stickyBlock.initial-status').show();
  $('.infoSticky .stickyBlockWrap').hide();

  // infoSticky 영역의 타이틀과 설명 업데이트 (초기 상태)
  $('.infoSticky .stickyBlock.initial-status .stickyTitle strong').text(purchaseStatus.title);
  $('.infoSticky .stickyBlock.initial-status .stickyDesc').text(purchaseStatus.description);

  // purchaseStatus code에 따라 unsupported 클래스 및 red 아이콘 추가
  var $stickyBlock = $('.infoSticky .stickyBlock.initial-status');
  var $icoInfo = $stickyBlock.find('.stickyTitle .icoInfo');


  if (purchaseStatus.code === 'INCOMPATIBLE' ||
      purchaseStatus.code === 'PURCHASE_STATUS_MISMATCH' ||
      purchaseStatus.code === 'FEATURE_NOT_APPLICABLE') {
    $stickyBlock.addClass('unsupported');
    $icoInfo.addClass('red');
  } else {
    $stickyBlock.removeClass('unsupported');
    $icoInfo.removeClass('red');
  }

  // infoBlock은 초기 상태 유지 (업데이트 안 함)
  $('.infoBlock .initial-status').show();
  $('.infoBlock .stickyBlockWrap').hide();
  $('.infoBlock .textTitle.initial-status').text(purchaseStatus.title);
  $('.infoBlock .textDesc.initial-status').text(purchaseStatus.description);

  // infoBlock에도 unsupported 클래스 추가
  var $infoBlock = $('.infoBlock');
  if (purchaseStatus.code === 'INCOMPATIBLE' ||
      purchaseStatus.code === 'PURCHASE_STATUS_MISMATCH' ||
      purchaseStatus.code === 'FEATURE_NOT_APPLICABLE') {
    $infoBlock.addClass('unsupported');
  } else {
    $infoBlock.removeClass('unsupported');
  }

  // infoSticky 영역 표시는 스크롤 이벤트에서 처리

  // 버튼 상태 업데이트 (infoSticky 영역 + stickyAction 영역 + priceTotal 영역)
  var $infoStickyBtn = $('.infoSticky .paymentButton .PurchaseBtn');
  var $stickyActionBtn = $('.stickyAction .paymentButton .PurchaseBtn');
  var $priceTotalBtn = $('.priceTotal .paymentButton .PurchaseBtn');
  var $allBtns = $infoStickyBtn.add($stickyActionBtn).add($priceTotalBtn);

  // 버튼 텍스트 업데이트
  $allBtns.find('p.purchaseButtonText').text(purchaseStatus.buttonText);
  $allBtns.find('p').text(purchaseStatus.buttonText); // fallback for any p tag

  // purchaseStatus code를 data 속성에 저장
  $allBtns.attr('data-purchase-status', purchaseStatus.code);

  // 버튼 활성화/비활성화
  if (purchaseStatus.activeButton) {
    $allBtns.removeClass('disabledBtn').prop('disabled', false);
  } else {
    // AVAILABLE 상태인 경우 stickyAction 버튼은 항상 활성화
    if (purchaseStatus.code === 'AVAILABLE') {
      $stickyActionBtn.removeClass('disabledBtn').prop('disabled', false);
      $infoStickyBtn.addClass('disabledBtn').prop('disabled', true);
    } else {
      $allBtns.addClass('disabledBtn').prop('disabled', true);
    }
  }
}

/**
 * 옵션 선택 시 상품 정보 표시 (AVAILABLE, PURCHASE_POSSIBLE, ALREADY_PLUS_PURCHASED 상태일 때)
 * @param {object} selectedProduct - 선택된 상품 정보 {productName: '', subProductName: '', price: ''}
 */
function updateSelectedProductInfo(selectedProduct) {
  // AVAILABLE, PURCHASE_POSSIBLE, ALREADY_PLUS_PURCHASED 상태가 아니거나 purchaseStatus 정보가 없으면 업데이트 안 함
  if (!currentPurchaseStatus || (currentPurchaseStatus.title !== '구매 가능' && currentPurchaseStatus.title !== '구독 가능' && currentPurchaseStatus.title !== '구독 중')) {
    return;
  }

  if (!selectedProduct) {
    // 선택 해제 시 초기 상태로 복원
    $('.infoSticky .stickyBlock.initial-status').show();
    $('.infoSticky .stickyBlockWrap').hide();
    $('.infoBlock .initial-status').show();
    $('.infoBlock .stickyBlockWrap').hide();

    $('.infoSticky .stickyBlock.initial-status .stickyDesc').text(currentPurchaseStatus.description);
    $('.infoBlock .textDesc.initial-status').text(currentPurchaseStatus.description);
    return;
  }

  // infoSticky 업데이트 - stickyBlockWrap으로 전환
  $('.infoSticky .stickyBlock.initial-status').hide();
  $('.infoSticky .stickyBlockWrap').show();

  // stickyBlockWrap 내부 텍스트 초기화
  $('.infoSticky .stickyBlockWrap .stickyBlock .stickyDesc').text('');
  $('.infoSticky .stickyBlockWrap .stickyBlock .stickyTitle strong').text('');
  $('.infoSticky .stickyBlockWrap .stickyBlock.amount em').text('');
  $('.infoSticky .stickyBlockWrap .stickyBlock.amount strong').text('');

  console.log("selectedProduct > ", selectedProduct);
  if (selectedProduct.subProductName) {
    // 세부상품 선택한 경우
    $('.infoSticky .stickyBlockWrap .stickyBlock .stickyDesc').text(selectedProduct.productName);
    $('.infoSticky .stickyBlockWrap .stickyBlock .stickyTitle strong').text(selectedProduct.subProductName);
    $('.infoSticky .stickyBlockWrap .stickyBlock.amount em').text(selectedProduct.priceName);
    $('.infoSticky .stickyBlockWrap .stickyBlock.amount strong').text(selectedProduct.price || '');
  } else if (selectedProduct.productName && selectedProduct.price) {
    // 가격 옵션이 있는 상품 (ex 스트리밍 프리미엄)
    $('.infoSticky .stickyBlockWrap .stickyBlock .stickyDesc').text(selectedProduct.productName);
    $('.infoSticky .stickyBlockWrap .stickyBlock .stickyTitle strong').text('');
    $('.infoSticky .stickyBlockWrap .stickyBlock.amount em').text(selectedProduct.priceName);
    $('.infoSticky .stickyBlockWrap .stickyBlock.amount strong').text(selectedProduct.price);
  }

  // infoBlock 업데이트 - AVAILABLE일 때만 initial-status의 textDesc 변경
  if (currentPurchaseStatus.code === 'AVAILABLE' || currentPurchaseStatus.code === 'PURCHASE_POSSIBLE') {
    // initial-status 유지하고 textDesc만 변경
    $('.infoBlock .initial-status').show();
    $('.infoBlock .stickyBlockWrap').hide();
    $('.infoBlock .textDesc.initial-status').text('선택한 내 차량 기준으로 구매를 진행해요.');
  }
}

/**
 * 스트리밍 상품의 버튼 상태를 업데이트하는 함수
 * @param {object} purchaseStatus - 구매 상태 객체
 * @param {string} productType - 'premium' 또는 'plus'
 */
function updateStreamingProductButton(purchaseStatus, productType) {
  if (!purchaseStatus) return;

  // PURCHASE_POSSIBLE 상태일 때만 특별 처리
  if (purchaseStatus.code === 'PURCHASE_POSSIBLE') {
    // 모든 버튼 텍스트를 "요금제 구독하기"로 변경
    $('.paymentButton .PurchaseBtn p').text('요금제 구독하기');
    $('.paymentButton .PurchaseBtn .purchaseButtonText').text('요금제 구독하기');

    // 프리미엄: stickyAction만 활성화
    // 플러스: 모든 버튼 비활성화
    if (productType === 'premium') {
      $('.priceTotal .paymentButton .PurchaseBtn').addClass('disabledBtn').prop('disabled', true);
      $('.infoSticky .paymentButton .PurchaseBtn').addClass('disabledBtn').prop('disabled', true);
      $('.stickyAction .paymentButton .PurchaseBtn').removeClass('disabledBtn').prop('disabled', false);
    } else if (productType === 'plus') {
      $('.paymentButton .PurchaseBtn').addClass('disabledBtn').prop('disabled', true);
    }
  }
}

/**
 * 선택된 세부상품 정보 가져오기
 * @returns {object|null} 선택된 상품 정보 {productName: '', subProductName: '', price: ''}
 */
function getSelectedProductInfo() {
  var $checkedInput = $('.optionList input[type="checkbox"]:checked');

  if ($checkedInput.length === 0) {
    return null;
  }

  var $label = $checkedInput.siblings('label');
  var productName = $('.productName').first().text();
  var subProductName = $label.find('strong').text();
  var price = $label.find('strong').data('price');
  var priceText = '';

  if (price) {
    priceText = numeral(price).format('$ 0,0[.]00');
  }

  return {
    productName: productName,
    subProductName: subProductName,
    price: priceText
  };
}

// stickyAction 내부의 go-product 버튼만 스크롤 동작
$(".stickyAction .paymentButton .go-product").click(function () {
  $("html, body").animate({ scrollTop: $('.producOption.scroll').offset().top}, 400, function(){
    $("body").removeClass("scroll-up").addClass("scroll-down scroll-ing");
  });
  return false;
});

//
// var $header = $('.hederWarp_n');
// var $body = $('body');
//
// function handleSticky() {
//   var $target = $(selector).first();
//   if (!$target.length) return;
//
//   // Anchor가 없으면 생성 (최초 1회)
//   var $anchor = $target.prev('.sticky-anchor-ref');
//   if (!$anchor.length) {
//     $anchor = $(
//         '<div class="sticky-anchor-ref" style="height:0; margin:0; padding:0; visibility:hidden; pointer-events:none;"></div>'
//     );
//     $target.before($anchor);
//   }
//
//   var scrollTop = $(window).scrollTop();
//   var headerHeight = $header.outerHeight() || 0;
//   var stickyPoint = $anchor.offset().top - headerHeight;
//
//   if (scrollTop >= stickyPoint) {
//     if (!$body.hasClass('tab-sticky')) $body.addClass('tab-sticky');
//   } else {
//     if ($body.hasClass('tab-sticky')) $body.removeClass('tab-sticky');
//   }
// }
//
// $(window).on('scroll resize', handleSticky);
// handleSticky();
// }
//
//
