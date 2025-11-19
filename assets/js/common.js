//비디오 썸내일 콘트롤
$(document).ready(function () {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  $(document).on("click", ".pdpDetail .tab-menu .tab-btn", function () {
    const $thisBtn = $(this);
    const $tabWrap = $(".pdpDetail .tab-wrap");
    const $tabBtns = $(".pdpDetail .tab-menu .tab-btn");
    const $tabContents = $(".pdpDetail .tab-box");
    const currentIndex = $tabBtns.index($thisBtn); // index 구하기
    const currentTabBtnText = $thisBtn.text();

    // 탭 버튼 active 처리
    $tabBtns.closest("li").removeClass("active");
    $thisBtn.closest("li").addClass("active");

    // 탭 콘텐츠 show/hide
    $tabContents.hide().eq(currentIndex).show();

    // 스크롤 이동
    $("html, body").animate(
      {
        scrollTop: $tabWrap.offset().top - 60,
      },
      200
    );

    // 모바일/태블릿 메뉴 닫기
    if ($("body").hasClass("moblie") || $("body").hasClass("tablet")) {
      $(".pdpDetail .tab-menu .btn-select").removeClass("open").text(currentTabBtnText);
      $(".pdpDetail .tab-menu ul").slideUp(200);
    }
  });

  $(document).on("click", ".pdpDetail .tab-menu .btn-select", function () {
    const $this = $(this);
    $this.toggleClass("open").next().slideToggle(200);
  });

  //윈도우 사이즈 반응형에 따른 스크립트
  const body = document.querySelector("body");
  var targetSize = "";
  function handleWindowSize() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 500) {
      //모바일 class
      body.className = "moblie";

      if (targetSize != "moblie") {
        menu_init();
        $(document).on("click", ".mobileCarlist > .mobilecarItem", function () {
          if (!$(this).hasClass("noitem")) {
            $(this).next().slideToggle("fast");
            $(this).find(".arrow").toggleClass("on");
            $(this).toggleClass("on");
            if ($(this).hasClass("on")) {
              window.dataLayer.push({
                event: "navigation",
                event_category: "Navigation",
                event_action: "Top menu",
                event_label: "VIN",
              });
              printDL();
            }
          }
        });
        $(document).on("click", ".menuDepth1Wrap > .menuDepth1", function () {
          if ($(this).hasClass("on") == true) {
            $(this).next().slideToggle("fast");
            $(this).toggleClass("on");
          } else {
            $(".menuDepth1Wrap > .menuDepth1").removeClass("on");
            $(".menuDepth1Wrap > .menuDepth1").next().slideUp("fast");
            $(this).next().slideToggle("fast");
            $(this).toggleClass("on");
          }
        });

        $(document).on("click", ".moblie .menuDepth1Wrap > a.lower", function (e) {
          e.preventDefault();
        });

        $(document).on("click", ".btnClose, .menuWarp .menuDepth2Wrap a", function (e) {
          $(".menuWarp .menuDepth1").removeClass("on");
          $(".menuWarp .menuDepth2Wrap").hide();
          $(".menuWarp").css("right", "-100%");
          $("html").removeClass("scrollDisable");
        });
        $(document).on("click", ".closeBtn", function () {
          $(".menuWarp").stop().animate({ right: "-100%" }, { queue: true, duration: 300, easing: "easeInOutExpo" });
          $("html").removeClass("scrollDisable");
        });
        $(document).on("click", ".burgurBtn", function () {
          $(".menuWarp").stop().animate({ right: "0" }, { queue: true, duration: 300, easing: "easeInOutExpo" });
          $("html").addClass("scrollDisable");
        });
      }
      targetSize = "moblie";
    } else if (windowWidth > 500 && windowWidth <= 1024) {
      //타블릿 class
      body.className = "tablet";

      if (targetSize != "tablet") {
        menu_init();
        $(document).on("click", ".mobileCarlist > .mobilecarItem", function () {
          if (!$(this).hasClass("noitem")) {
            $(this).next().slideToggle("fast");
            $(this).find(".arrow").toggleClass("on");
            $(this).toggleClass("on");
            if ($(this).hasClass("on")) {
              window.dataLayer.push({
                event: "navigation",
                event_category: "Navigation",
                event_action: "Top menu",
                event_label: "VIN",
              });
              printDL();
            }
          }
        });
        $(document).on("click", ".menuDepth1Wrap > .menuDepth1", function () {
          if ($(this).hasClass("on") == true) {
            $(this).next().slideToggle("fast");
            $(this).toggleClass("on");
          } else {
            $(".menuDepth1Wrap > .menuDepth1").removeClass("on");
            $(".menuDepth1Wrap > .menuDepth1").next().slideUp("fast");
            $(this).next().slideToggle("fast");
            $(this).toggleClass("on");
          }
        });
        $(document).on("click", ".tablet .menuDepth1Wrap > a.lower", function (e) {
          e.preventDefault();
        });

        $(document).on("click", ".btnClose, .menuWarp .menuDepth2Wrap a", function (e) {
          $(".menuWarp .menuDepth1").removeClass("on");
          $(".menuWarp .menuDepth2Wrap").hide();
          $(".menuWarp").css("right", "-36rem");
          $("html").removeClass("scrollDisable");
        });
        $(document).on("click", ".closeBtn", function () {
          $(".menuWarp").stop().animate({ right: "-36rem" }, { queue: true, duration: 300, easing: "easeInOutExpo" });
          $("html").removeClass("scrollDisable");
        });
        $(document).on("click", ".burgurBtn", function () {
          $(".menuWarp").stop().animate({ right: "0" }, { queue: true, duration: 300, easing: "easeInOutExpo" });
          $("html").addClass("scrollDisable");
        });
      }
      targetSize = "tablet";
    } else {
      //데스크탑 class
      body.className = "desktop";

      if (targetSize != "desktop") {
        let isEntered = false;
        menu_init();

        const $headerInner = $(".hederWarp_n .headerInner");
        let $menuBg = $(".menuBg");
        // menuBg가 없으면 생성 후 삽입
        console.log($menuBg.length);
        if ($menuBg.length <= 0) {
          $menuBg = $('<div class="menuBg" style="height:0;"></div>');
          $headerInner.append($menuBg);
        }

        $(document).on("mouseenter", ".desktop .gnb", function () {
          if (isEntered) return;
          isEntered = true;

          $(".menuDepth2Wrap").hide().stop(true).fadeIn(240);
          $(".desktop .menu").addClass("open");
          $(".desktop .hederWarp_n").addClass("menu-open");

          const menuDepth2WrapHeights = $(".desktop .menuDepth2Wrap")
            .toArray()
            .map((el) => Math.floor($(el).outerHeight()));
          const menuDepth2WrapHeight = Math.max(...menuDepth2WrapHeights);

          // 강제로 리플로우 발생시켜야 transition 작동
          requestAnimationFrame(() => {
            $menuBg.css("height", `${menuDepth2WrapHeight + 80}px`);
          });
        });

        $(document).on("mouseleave", ".desktop .gnb, .desktop .menuBg", function (e) {
          const toElement = e.relatedTarget;

          // gnb, menuWarp, logoWrap, menu 내부로 이동한 경우는 무시
          if ($(toElement).closest(".desktop .gnb, .desktop .menuWarp, .desktop .logoWrap, .desktop .menuBg").length > 0) {
            return;
          }

          $(".desktop .menuBg").css("height", "0");
          $(".menuDepth2Wrap").hide().stop(true);
          $(".desktop .menu").removeClass("open");
          $(".desktop .hederWarp_n").removeClass("menu-open");
          isEntered = false;
        });
      }
      targetSize = "desktop";
    }

    $(document).on("click", ".menuDepth1Wrap > .menuDepth1", function () {
      window.dataLayer.push({
        event: "navigation",
        event_category: "Navigation",
        event_action: "Top menu",
        event_label: $(this).data("dleventlabel"),
      });
      printDL();
    });
  }
  window.addEventListener("resize", handleWindowSize);
  handleWindowSize();

  function menu_init() {
    $(document).off("mouseenter", ".menuDepth1Wrap");
    $(document).off("mouseleave", ".menuDepth1Wrap");
    $(document).off("click", ".mobileCarlist > .mobilecarItem");
    $(document).off("click", ".menuDepth1Wrap > .menuDepth1");
    $(document).off("click", ".menuDepth1Wrap > a");
    $(document).off("click", ".closeBtn");
    $(document).off("click", ".burgurBtn");
    $(".mobileCarlist > .mobilecarItem").removeClass("on");
    $(".mobileCarlist > .mobilecarItem").find(".arrow").removeClass("on");
    $(".mobileCarlist > .mobilecarItem").next().css("display", "none");
    $(".menuDepth1Wrap > .menuDepth1").removeClass("on");
    $(".menuDepth1Wrap > .menuDepth1").next().css("display", "none");
    $(".menuWarp").stop().animate({ right: "-100%" }, { queue: true, duration: 500, easing: "easeInOutExpo" });
    $("html").removeClass("scrollDisable");
  }

  initSwiper();

  $(window).on("resize", function () {
    ww = $(window).width();
    initSwiper();
  });

  //자동차 번호/메뉴/로그인 선택 슬라이드
  $(".menu > a, .user > a")
    .on("mouseover focusin", function () {
      $(this).addClass("on");
      $(this).next(".gnbMenu, .userMenu").addClass("on");
      $(this)
        .next(".gnbMenu, .userMenu")
        .on("mouseover focusin", function () {
          $(this).addClass("on");
        })
        .on("mouseleave", function () {
          $(this).removeClass("on");
        });
    })
    .on("mouseleave", function () {
      $(this).removeClass("on");
      $(this).next(".gnbMenu, .userMenu").removeClass("on");
    });

  let isOverCarItem = false;
  let isOverCarlistItem = false;

  $(".carlist").on("mouseenter", function () {
    isOverCarItem = true;
    $(".carItem, .carlistItem").addClass("on");
  });
  $(".carlist").on("mouseleave", function () {
    isOverCarItem = false;
    setTimeout(removeOnClassIfNeeded, 10);
  });

  function removeOnClassIfNeeded() {
    if (!isOverCarItem && !isOverCarlistItem) {
      $(".carItem, .carlistItem").removeClass("on");
    }
  }

  $("#slide-open").click(function () {
    if ($("#burgur").hasClass("on")) {
      $("#burgur").removeClass("on");
      $(".mMenuWarp").removeClass("on");
      $(".logo").removeClass("on");
      $("html").removeClass("scrollDisable");
    } else {
      $("#burgur").addClass("on");
      $(".mMenuWarp").addClass("on");
      $("html").addClass("scrollDisable");
      $(".logo").addClass("on");
    }
  });

  /*************************************
       accordion
     *************************************/
  $(document).on("click", ".accordion dl", function (e) {
    $(this).toggleClass("active");
    $(this).find(">dd.a").slideToggle();
    $(this).find(">dt.q").toggleClass("active");
    if ($("body>div.contentWarp").find("div.productView").length > 0 && $(this).hasClass("active")) {
      window.dataLayer.push({
        event: "configurator",
        event_category: "Product",
        event_action: "Q&A",
        event_label: "Details",
        customer_ID: ComUtils.getCookie("dlu") === null ? "" : ComUtils.getCookie("dlu"), //ID가 이메일 등의 개인정보일 경우 참고
        fod_product: $("h1.productName").text(), // eg ‘Vehicle To Grid’
        fod_qa_detail: $(this).find("dd.a>p").text().substr(0, 20),
        fod_review_detail: undefined,
      });
    } else if ($("body>div.contentWarp").find("div.faqWarp").length > 0 && $(this).hasClass("active")) {
      window.dataLayer.push({
        event: "FAQ",
        event_category: "FAQ",
        event_action: $("ul.tabList>li.on>a").text(), //eg '전체', '회원', '상품' …
        event_label: $(this).find("dt>p>span").text().substr(0, 20), //eg'회원정보 수정은…'
        customer_ID: ComUtils.getCookie("dlu") === null ? "" : ComUtils.getCookie("dlu"), //ID가 이메일 등의 개인정보일 경우 참고
      });
    }
  });

  /*************************************
       payment-history
     *************************************/
  $(document).on("click", ".openView", function () {
    $(this).next().slideToggle();
    $(this).toggleClass("active");
    $(this).next().siblings(".payAll").slideUp();
  });

  //top 버튼

  if ($(this).scrollTop() > 200) {
    $(".floating_menu").fadeIn();
  } else {
    $(".floating_menu").fadeOut();
  }

  var flagScroll = true;
  $(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
      $(".floating_menu").fadeIn();
    } else {
      $(".floating_menu").fadeOut();
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
        pdpSwiperDtl(".streamingPremium-swiper1");
        pdpSwiperDtl(".streamingPremium-swiper2");
        pdpSwiperDtl(".streamingPremium-swiper3");

        flagScroll = false;
      }
    }
  });
  $(".floating_top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 400);
    return false;
  });

  //푸터 페밀리사이트
  const foot_famliy_btn = $(".familyBoxWarp").find(".btn-select");
  foot_famliy_btn.on("click", function () {
    $(".familyBoxWarp")
      .find(".list-member")
      .slideToggle("fast", function () {
        foot_famliy_btn.toggleClass("on", $(this).is(":visible"));
      });
  });

  $(".familyBoxWarp .cont-select").on("click", "li>a", function () {
    $(".familyBoxWarp .list-member").hide();
    $(".familyBoxWarp .btn-select").removeClass("on");
  });

  //문의하기 글자 수 제한
  var maxInquiryContentsCount = 1000;
  $(".inquiryContents").on("change keyup paste", function (e) {
    let content = $(this).val();

    if (content.length == 0 || content == "") {
      $(".textCount").text("0/" + maxInquiryContentsCount);
    } else {
      $(".textCount").text(content.length + "/" + maxInquiryContentsCount);
    }

    if (content.length > maxInquiryContentsCount) {
      $(this).val($(this).val().substring(0, maxInquiryContentsCount));
      $(".textCount").text(maxInquiryContentsCount + "/" + maxInquiryContentsCount);
      alert("글자수는 " + maxInquiryContentsCount + "자까지 입력 가능합니다.");
    }
  });

  // 문의하기 이미지 미리보기
  $('input[name="inquiryImgFile"]').change(function () {
    let fileSize = $(this)[0].files[0].size;
    let maxSize = 5 * 1024 * 1024;
    let check = $(this)[0].files[0].type.match(".jpg|.jpeg|.gif|.png");
    if (fileSize <= maxSize && check) {
      setImageFromFile(this, $(this).next().find(".inquiryImg"));
      $(this).parent().next().css("display", "block");
    }
  });

  //PDP Display Theme
});

var dtthumbClickFlag = false;
var flagAutoPlay = true;
// var swiperThemeDtl;
function pdpDisplayThemeSwiper() {
  if ($(".pdpDisplayThemeSwiper").length > 0) {
    var swiperTheme = new Swiper(".pdpDisplayThemeSwiper", {
      slidesPerView: "auto",
      loop: true,
      freeMode: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      speed: 3000,
      breakpoints: {
        // when window width is >= 320px
        320: {
          spaceBetween: 8,
        },
        // when window width is >= 480px
        480: {},
        // when window width is >= 640px
        640: {
          spaceBetween: 15,
        },
      },
      on: {
        init: function () {
          $(".displayTheme .dtthumb").each(function () {
            $(this).attr("data-click", "false");
          });
        },
      },
    });

    $(".pdpDisplayThemeSwiper").hover(
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
    $(".displayTheme .dtthumb").hover(
      function () {
        let leftPos = $(this).offset().left;
        if (dtthumbClickFlag === false) {
          $(this).append(`<div class="tooltip"><div class="msg">썸네일을 클릭하면 적용예시를 확인<br>할 수 있습니다.</div><button class="btn-close">x</button></div>`);
        }
      },
      function () {
        if ($(".displayTheme .tooltip").length > 0) {
          $(".displayTheme .tooltip").remove();
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
        prevEl: `${obj} .swiper-button-prev`,
      },
      pagination: {
        el: `${obj} .swiper-pagination`,
      },
      on: {
        init: function () {},
      },
    });
  }

  flagScroll = false;
}
function pdpDisplayThemeSwiperDtl() {
  if ($(".displayThemeDtl .swiper").length > 0) {
    var swiperThemeDtl = new Swiper(".displayThemeDtl .swiper", {
      slidesPerView: 1,
      navigation: {
        nextEl: ".displayThemeDtl .swiper-button-next",
        prevEl: ".displayThemeDtl .swiper-button-prev",
      },
      pagination: {
        el: ".displayThemeDtl .swiper-pagination",
      },
      on: {
        init: function () {
          $(document).on("click", ".displayTheme .dtthumb", function () {
            swiperThemeDtl.slideTo(0);
          });
        },
      },
    });
  }

  flagScroll = false;
}
function pdpInCarGameSwiper() {
  if ($(".inCarGame .visualBg").length > 0) {
  }
  var swiperTheme = new Swiper(".visualBg", {
    slidesPerView: 1,
    loop: true,
    freeMode: false,
    navigation: {
      nextEl: ".inCarGame .visualBg .swiper-button-next",
      prevEl: ".inCarGame .visualBg .swiper-button-prev",
    },
    pagination: {
      el: ".inCarGame .visualBg .swiper-pagination",
    },
    on: {
      init: function () {
        // console.log('pdpInCarGameSwiper 실행한다')
      },
    },
  });
  if ($(".pdpInCarGameSwiper").length > 0) {
    var swiperTheme = new Swiper(".pdpInCarGameSwiper", {
      slidesPerView: "auto",
      loop: true,
      freeMode: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      speed: 3000,
      breakpoints: {
        // when window width is >= 320px
        320: {
          spaceBetween: 5,
        },
        // when window width is >= 480px
        480: {},
        // when window width is >= 640px
        640: {
          spaceBetween: 10,
        },
      },
      // navigation: {
      //   nextEl: ".inCarGame .swiper-button-next",
      //   prevEl: ".inCarGame .swiper-button-prev",
      // },
      on: {
        init: function () {
          // console.log('pdpInCarGameSwiper 실행한다')
        },
      },
    });

    $(".pdpInCarGameSwiper").hover(
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
  if ($(".inCarGameDtl").length > 0) {
    var inCarGameSwiper = new Swiper(".inCarGameDtlThumb", {
      spaceBetween: 6,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
    });
    var inCarGameSwiper2 = new Swiper(".inCarGameDtl", {
      spaceBetween: 10,
      // navigation: {
      //     nextEl: ".inCarGameDtl .swiper-button-next",
      //     prevEl: ".inCarGameDtl .swiper-button-prev",
      // },
      thumbs: {
        swiper: inCarGameSwiper,
      },
      on: {
        init: function () {
          $(document).on("click", ".inCarGame .dtthumb", function () {
            inCarGameSwiper.slideTo(0);
            inCarGameSwiper2.slideTo(0);
          });
          // const videoEle = `
          //   <video muted="" playsinline poster="../assets/images/kia/pdp/in_car_game/theme1-1.png">
          //     <source src="/kr/assets/images/kia/pdp/in_car_game/theme1-1.mp4" type="video/mp4" class="themeVideo">
          //   </video>
          // `;
          // $(".inCarGameDtlThumb .swiper-slide").eq(0).html(videoEle);
        },
      },
    });
  }
  flagScroll = false;
}

var beforeDtlImgPath = "";
$(document).on("click", ".inCarGame .dtthumb", function (e) {
  const thumbIdx = e + 1;
  const dtlImgPath = $(this).attr("value");
  const dtlImgs = $(".inCarGame .dtlImgs");
  $(".inCarGame .dtthumb").removeClass("active");
  $(this).addClass("active");

  dtlImgs.removeClass();
  dtlImgs.addClass(`comp_body dtlImgs ${dtlImgPath}`);

  $(".inCarGame .dtlImgs .item").addClass("change");
  setTimeout(function () {
    $(".inCarGame .dtlImgs .item").removeClass("change");
  }, 200);

  $(".inCarGame .themeImg").each(function (e) {
    const idx = e + 2;
    const src = $(this).attr("src");
    const lastIndex = src.lastIndexOf("/");
    const pathWithoutFileName = src.substring(0, lastIndex);
    $(this).attr("src", `${pathWithoutFileName}/${dtlImgPath}-${idx}.png`);
  });

  $(".inCarGame .video-slide").each(function (e) {
    const idx = e + 1;
    const src = $(this).find(".themeVideo").attr("src");
    const lastIndex = src.lastIndexOf("/");
    const pathWithoutFileName = src.substring(0, lastIndex);
    const videoEle = `
            <video class="videos" loop="" muted="" playsinline="" autoplay="" poster="${pathWithoutFileName}/${dtlImgPath}-1.png">
                <source src="${pathWithoutFileName}/${dtlImgPath}-1.mp4" type="video/mp4" class="themeVideo">
            </video>
        `;
    $(this).html(videoEle);

    // $(this).attr("src", `${pathWithoutFileName}/${dtlImgPath}-${idx}.mp4`);
  });

  $(".inCarGame .video-slideThumb").each(function (e) {
    $(this).removeClass(`${beforeDtlImgPath}`);
    const idx = e + 1;
    const src = $(this).find(".themeVideo").attr("src");
    const lastIndex = src.lastIndexOf("/");
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
  $(".inCarGame .themeImgThumb").each(function (e) {
    const idx = e + 2;
    const src = $(this).attr("src");
    const lastIndex = src.lastIndexOf("/");
    const pathWithoutFileName = src.substring(0, lastIndex);

    $(this).attr("src", `${pathWithoutFileName}/${dtlImgPath}-${idx}.png`);
  });
  // const visualBgSrc = $(".visualBg img").attr("src");
  // const visualBgLastIndex = visualBgSrc.lastIndexOf("/");
  // const visualBgPathWithoutFileName = visualBgSrc.substring(0, visualBgLastIndex);

  // $(".visualBg img").attr("src", `${visualBgPathWithoutFileName}/${dtlImgPath}_screen.jpg`);

  flagAutoPlay = false;
});

$(document).on("click", ".displayTheme .dtthumb", function () {
  const dtlImgPath = $(this).attr("value");
  const dtlTeamPath = this.dataset.team;
  const dtlImgs = $(".dtlImgs");
  const dtthumbClickState = $(this).attr("data-click");

  if ($(".displayTheme .tooltip").length > 0) {
    $(".displayTheme .tooltip").remove();
  }

  $(".theme-story .btn-dtthumb").removeClass("active");

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

  $(".dtthumb").removeClass("active");
  dtthumbSelectedItem.addClass("active");
  dtthumbHisSelectedItem.addClass("active");

  $(".dtlImgs .item").addClass("change");
  setTimeout(function () {
    $(".dtlImgs .item").removeClass("change");
  }, 200);

  $(".themeImg").each(function (e) {
    const idx = e + 1;
    const src = $(this).attr("src");
    const lastIndex = src.lastIndexOf("/");
    const pathWithoutFileName = src.substring(0, lastIndex);

    $(this).attr("src", `${pathWithoutFileName}/${dtlImgPath}-${idx}.png`);
  });

  //KBO 웰컴/굿바이 비디오 변경
  if ($(".displayTheme-kbo").length > 0) {
    $(this).addClass("active");
    function updateVideoSource(selector, prefix) {
      $(selector).each(function () {
        const video = $(this)[0];
        const source = $(this).find("source")[0];

        if (video && source) {
          const src = $(source).attr("src");
          const pathWithoutFileName = src.substring(0, src.lastIndexOf("/"));
          const newSrc = `${pathWithoutFileName}/${prefix}_${dtlTeamPath}.mp4`;

          $(source).attr("src", newSrc);
          video.load();
          video.play().catch((err) => {
            console.warn(`"${prefix}" 비디오 자동 재생 실패:`, err);
          });
        }
      });
    }

    updateVideoSource(".video-welcome", "welcome");
    updateVideoSource(".video-goodbye", "goodbye");
  }

  if (dtthumbClickState === "false") {
    $(".theme-story").append(dtthumbItemHtml);
    $(this).attr("data-click", "true");
    dtthumbSelectedItem.addClass("selected");
  }

  $(".btn-dtthumb .btn-remove").click(function () {
    const dtthumbValue = $(this).closest(".btn-dtthumb").find(".dtthumb").attr("value");
    const selectedItem = $(`.pdpDisplayThemeSwiper .dtthumb[value=${dtthumbValue}]`);
    $(this).closest(".btn-dtthumb").remove();
    selectedItem.attr("data-click", "false");
    selectedItem.removeClass("selected");
  });

  dtthumbClickFlag = true;
});

function pdpIntro() {
  // dpThemeVideo 요소가 존재하는지 확인
  if ($(".video_wrap").length > 0) {
    // .video_wrap 내 모든 비디오 요소 선택
    const videoElements = document.querySelectorAll(".video_wrap video");
    let cookieVal;
    $(".editorWarp").addClass("playing");

    const videoWrap = $(".editorWarp .video_wrap");

    const youtubeId = $(".youtube-box").attr("value");
    const youtubeFrame = '<iframe src="https://www.youtube.com/embed/' + youtubeId + '?autoplay=0&controls=1&rel=0&showsearch=0" title="YouTube video player" allow="accelerometer; clipboard-black; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    $(".editorWarp .youtube-box").html(youtubeFrame);

    switch (true) {
      case $(".displayTheme").length > 0:
        cookieVal = "displayThemeIntro";
        break;
      case $(".inCarGame").length > 0:
        cookieVal = "inCarGameIntro";
        break;
      case $(".srsPlus").length > 0:
        cookieVal = "srsPlusIntro";
        break;
      case $(".streamingPremium").length > 0:
        cookieVal = "streamingPremiumIntro";
        break;
    }

    $(".close-today").html(`<span onclick="hideTodayIntroPopup('${cookieVal}')" style="cursor:pointer"><input type="checkbox"> 오늘 하루 재생하지 않기</span>`);

    $(".btn-intro").css({ display: "flex", opacity: "0", marginTop: "2rem" }).animate({ opacity: "1", marginTop: "0" }, 400);
    if (getCookie(cookieVal)) {
      $(".editorWarp").removeClass("playing");
      $(".video_wrap").css("display", "none");

      $(".close-today input").attr("checked", "checked");
      // videoElements[0].pause();
      // videoElements[0].currentTime = 0;

      $(".close-today").html(`<span onclick="deleteCookie('${cookieVal}')" style="cursor:pointer"><input type="checkbox"> 오늘 하루 재생하지 않기</span>`);
      $(".editorWarp .youtube-box").html("");
    } else {
      $(".video_wrap").css({ display: "flex", opacity: "0" }).animate({ opacity: "1" }, 200);
      $(".close-today").html(`<span onclick="hideTodayIntroPopup('${cookieVal}')" style="cursor:pointer"><input type="checkbox"> 오늘 하루 재생하지 않기</span>`);
      $(".editorWarp .youtube-box").html(youtubeFrame);
    }

    // .btn-intro 버튼 클릭 시 비디오 재생
    $(document).on("click", ".editorWarp .btn-intro", function () {
      // console.log('intro 다시 실행');
      $(".editorWarp").addClass("playing");
      if (getCookie(cookieVal)) {
        $(".close-today input").attr("checked", "checked");
      }
      $(".editorWarp .youtube-box").html(youtubeFrame);
      $(videoWrap).show();
      // if (video) {
      //   video.currentTime = 0;
      //   video.play();
      // }
    });

    // .btn-close 버튼 클릭 시 비디오 숨기기
    $(document).on("click", ".video_wrap .btn-close", function () {
      // console.log("btn close 실행");
      $(".editorWarp").removeClass("playing");
      $(videoWrap).hide();
      $(".editorWarp .youtube-box").empty();
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

$(document).on("click", ".video_wrap .btn-play.play", function () {
  // console.log("intro 플레이");
  const btnPlay = $(".video_wrap .btn-play");
  const videoElements = document.querySelectorAll(".video_wrap video");

  if (videoElements) {
    btnPlay.removeClass("play");
    btnPlay.addClass("pause");
    videoElements[0].play();
  }
});
$(document).on("click", ".video_wrap .btn-play.pause", function () {
  // console.log("intro 정지");
  const btnPlay = $(".video_wrap .btn-play");
  const videoElements = document.querySelectorAll(".video_wrap video");

  if (videoElements) {
    btnPlay.addClass("play");
    btnPlay.removeClass("pause");
    videoElements[0].pause();
  }
});
$(document).on("click", ".video_wrap .btn-sound", function () {
  const videoElements = document.querySelectorAll(".video_wrap video");

  if (videoElements) {
    videoElements[0].muted = !videoElements[0].muted;
    $(this).toggleClass("on");
  }
});

//마이페이지 lnb 스와이프
var ww = $(window).width();
var mySwiper = undefined;
var swiper = null;
function initSwiper() {
  if (ww < 800 && mySwiper == undefined) {
    swiper = new Swiper(".lnbList", {
      slidesPerView: "auto",
      on: {
        click: function (swiper) {
          let getEventLabel = $(".lnbList>ul>li:nth-of-type(" + (swiper.clickedIndex + 1) + ")>a").data("dleventlabel");
          if (getEventLabel) {
            myLnbTagManager(getEventLabel);
          }

          location.href = $(".lnbList > ul > li").eq(swiper.clickedIndex).find("a").attr("href");
        },
      },
    });
  } else if (ww >= 800 && mySwiper != undefined) {
    mySwiper.destroy();
    mySwiper = undefined;
  }
}

// 마이페이지 태그매니저
function myLnbTagManager(label) {
  window.dataLayer.push({
    event: "navigation",
    event_category: "My page",
    event_action: "Left menu",
    event_label: label, // eg 메뉴 순서대로 'Purchase history', 'Payment history', 'Wish list', 'Product review', 'Coupon details', 'Notices details', 'Inquiry details', 'My information'
    customer_ID: undefined,
    fod_product: undefined,
    fod_review_detail: undefined,
  });
}

// 문의하기 이미지 미리보기
function setImageFromFile(input, expression) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(expression).attr("src", e.target.result).attr("id", input.files[0].lastModified);
      $(expression).closest(".imgItem").find(".delImg").data("index", input.files[0].lastModified);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

//레이어 팝업 오픈 스크립트
function open_layer_popup(popid) {
  var popid = popid;
  $("#" + popid).css("display", "flex");
  $("body").css("overflow", "hidden");
  $("body").css("touch-action", "none");
  $("#" + popid)
    .stop()
    .animate({ opacity: "1" }, { queue: true, duration: 450, easing: "easeInOutExpo" });
  $("#" + popid + ">.popInner")
    .stop()
    .animate({ top: "50%" }, { queue: true, duration: 450, easing: "easeInOutExpo" });
}

//레이어 팝업 클로즈 스크립트
function close_layer_popup(popid) {
  var popid = popid;
  $("#" + popid)
    .stop()
    .animate(
      { opacity: "0" },
      {
        queue: true,
        duration: 200,
        easing: "easeInOutExpo",
        complete: function () {
          $("#" + popid + ">.popInner").css("top", "53%");
          $("#" + popid).css("display", "none");
        },
      }
    );
  $("body").css("overflow", "auto");
  $("body").css("touch-action", "auto");
}

//[S]PDP 리뷰 더보기 관련
more_contents_chk();
function more_contents_chk() {
  $(".reviewItem").each(function (index, item) {
    if ($(item).find(".contents").height() >= 74) {
      $(item).find(".contents").addClass("abstracted");
      $(item).find(".contentMoreBtn").css("display", "flex");
    }
  });
}

$(document).on("click", ".contentMoreBtn", function () {
  if ($(this).hasClass("active")) {
    $(this).parent().find(".contents").addClass("abstracted");
    $(this).removeClass("active");
    $(this).html("더보기");
  } else {
    $(this).parent().find(".contents").removeClass("abstracted");
    $(this).addClass("active");
    $(this).html("간단히");
  }
});
// [E]PDP 리뷰 더보기 관련

//PDP Lighting Pattern
$(document).on("click", ".lpthumb", function () {
  $(this).parent().find("li").removeClass("active");
  $(this).addClass("active");

  $(".lighting_pattern_movie").attr("src", $(this).attr("value"));
  $(".lighting_pattern_movie").get(0).load();
  let playPromise = $(".lighting_pattern_movie").get(0).play();
});

function XSS_Check(strTemp, level) {
  let getType = typeof strTemp;
  if (getType === "object") {
    strTemp = JSON.stringify(strTemp);
  }

  if (level == undefined || level == 0) {
    strTemp = strTemp.replaceAll(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-|\//g, "");
  } else if (level != undefined && level == 1) {
    strTemp = strTemp.replaceAll(/\</g, "&lt;");
    strTemp = strTemp.replaceAll(/\>/g, "&gt;");
    strTemp = strTemp.replaceAll(/\&/g, "&amp;");
    strTemp = strTemp.replaceAll(/\'/g, "&#x27;");
    strTemp = strTemp.replaceAll(/\"/g, "&quot;");
    strTemp = strTemp.replaceAll(/\(/g, "&#40;");
    strTemp = strTemp.replaceAll(/\)/g, "&#41;");
    strTemp = strTemp.replaceAll(/\//g, "&#x2F;");
  } else if (level != undefined && level == 2) {
    strTemp = strTemp.replaceAll(/alert|window|document|eval|cookie|this|self|parent|top|opener|function|constructor|script|on|\-+\\<>=/gi, "");
  }

  if (getType === "object") {
    strTemp = JSON.parse(strTemp);
  }
  return strTemp;
}

function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

function getUrlParameter(sParam) {
  let sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? false : sParameterName[1];
    }
  }
}

function enterVideo() {
  var playPromise = null;
  if ($(".withVideo").length > 0) {
    $(".withVideo").find("video").get(0).load();
    $(".withVideo").find("video").get(0).currentTime = 0;
    $(document).on("mouseenter", ".withVideo", function () {
      $(this).find(".productSmallVideo > img").stop().animate({ opacity: "0" }, { queue: true, duration: 300, easing: "easeInOutExpo" });
      playPromise = $(this).find("video").get(0).play();
    });
    $(document).on("mouseleave", ".withVideo", function () {
      $(this)
        .find(".productSmallVideo > img")
        .stop()
        .animate(
          { opacity: "1" },
          {
            queue: true,
            duration: 300,
            easing: "easeInOutExpo",
            complete: function () {
              if (playPromise !== undefined) {
                playPromise
                  .then((_) => {
                    $(this).parent().find("video").get(0).pause();
                    $(this).parent().find("video").get(0).currentTime = 0;
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            },
          }
        );
    });
  }
}

function dlLoginAttempt() {
  window.dataLayer.push({
    event: "navigation",
    event_category: "Navigation",
    event_action: "Top menu",
    event_label: "Login/Register",
  });
  printDL();
}

$.fn.clearForm = function () {
  return this.each(function () {
    var type = this.type,
      tag = this.tagName.toLowerCase();
    if (tag === "form") {
      return $(":input", this).clearForm();
    }
    if (type === "text" || type === "password" || type === "hidden" || tag === "textarea") {
      this.value = "";
    } else if (type === "checkbox" || type === "radio") {
      this.checked = false;
    } else if (tag === "select") {
      this.selectedIndex = -1;
    }
  });
};
// 쿠키 설정 함수
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 쿠키 가져오는 함수
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
// 쿠키 삭제 함수
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  $(".close-today input").prop("checked", false);

  $(".close-today").html(`<span onclick="hideTodayIntroPopup('${name}')" style="cursor:pointer"><input type="checkbox"> 오늘 하루 재생하지 않기</span>`);
}

// 팝업을 숨기는 함수
function hideTodayIntroPopup(name) {
  const videoElements = document.querySelectorAll(".video_wrap video");
  // videoElements[0].pause();
  // videoElements[0].currentTime = 0;
  // $(".video_wrap").hide();
  // $(".editorWarp").removeClass("playing");
  if (name) {
    setCookie(name, "true", 1);
  } else {
    setCookie("hideIntroPopup", "true", 1);
  }
  $(".close-today").html(`<span onclick="deleteCookie('${name}')" style="cursor:pointer"><input type="checkbox" checked> 오늘 하루 재생하지 않기</span>`);
}

$(document).on("click", ".refund-area .btn-fold", function () {
  $(this).toggleClass("fold");
  $(".refund-area .dtl").slideToggle("fast");
});

// 십원 단위로 절사하는 함수
function truncateToTenwon(amount) {
  return Math.floor(amount / 10) * 10;
}

//알럿 레이어 팝업 클로즈 스크립트
function close_alert_popup(popid) {
  if (typeof popid === "object") {
    popupId = $(popid).parents(".alertPopup");
  } else {
    popupId = $(`#${popid}`);
  }
  popupId.stop().animate(
    { opacity: "0" },
    {
      queue: true,
      duration: 200,
      easing: "easeInOutExpo",
      complete: function () {
        $(this).find(".popInner").css("top", "53%");
        $(this).css("display", "none");
      },
    }
  );
}

function pdpDisplayThemeKbo() {
  if ($(".pdpDisplayThemeKbo").length > 0) {
    $(".pdpDisplayThemeKbo .dtthumb").hover(
      function () {
        let leftPos = $(this).offset().left;
        if (dtthumbClickFlag === false) {
          $(this).append(`<div class="tooltip"><div class="msg">썸네일을 클릭하면 적용예시를 확인<br>할 수 있습니다.</div><button class="btn-close">x</button></div>`);
        }
      },
      function () {
        if ($(".pdpDisplayThemeKbo .tooltip").length > 0) {
          $(".pdpDisplayThemeKbo .tooltip").remove();
        }
      }
    );
  }

  flagScroll = false;
}

let swiperKboThemeDtl = undefined;
function swiperThemeKboDtlInit() {
  const ww = $(window).width();
  const $swiperContainer = $(".displayThemeKboDtl .swiper");

  if ($swiperContainer.length === 0) return;

  if (ww > 640) {
    if (!swiperKboThemeDtl) {
      swiperKboThemeDtl = new Swiper($swiperContainer[0], {
        slidesPerView: 1,
        navigation: {
          nextEl: ".displayThemeKboDtl .swiper-button-next",
          prevEl: ".displayThemeKboDtl .swiper-button-prev",
        },
        pagination: {
          el: ".displayThemeKboDtl .swiper-pagination",
        },
        on: {
          init: function () {
            $(document).on("click", ".pdpDisplayThemeKbo .dtthumb", function () {
              swiperKboThemeDtl.slideTo(0);
            });
          },
        },
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
  $(window).on("resize", function () {
    swiperThemeKboDtlInit();
  });

  flagScroll = false;
}

function slideToggle(button, element) {
  const $target = $(element).first();
  if ($target.length === 0) return;

  $target.stop(true, true).slideToggle(300);
  $(button).toggleClass("fold");
}
function pdpDisplayTab(button, element) {
  // tabmenu 기능 구현
  const tabWrap = $(".pdpDetail .tab-wrap");
  const tabBtn = $(".pdpDetail .tab-menu button");
  const currentTabBtn = $(button);
  const currentTabBtnText = $(button).text();
  tabBtn.closest("li").removeClass("active");
  currentTabBtn.closest("li").addClass("active");
  // 탭 컨텐츠 show/hide
  const tabContents = $(".pdpDetail .tab-box");
  const targetTabContents = $(element);
  tabContents.hide();
  targetTabContents.show();

  // 부드럽게 스크롤 이동
  $("html, body").animate(
    {
      scrollTop: tabWrap.offset().top - 60,
    },
    200
  );

  if ($("body").hasClass("moblie") || $("body").hasClass("tablet")) {
    $(".pdpDetail .tab-menu .btn-select").removeClass("open").text(currentTabBtnText);
    $(".pdpDetail .tab-menu ul").slideUp(200);
  }
}
function pdpDisplayTabMobile() {
  // tabmenu 기능 구현
  const molbileTabBtn = $(".pdpDetail .tab-menu .btn-select");
  molbileTabBtn.toggleClass("open").next().slideToggle(200);
}

function pdpDisplayZoom(selector) {
  const $target = $(selector).clone();

  const $popup = $(`
        <div class="pdp-zoom">
          <div class="zoom-wrapper"></div>
          <button class="btn-close-zoom">닫기</button>
        </div>
      `);

  $popup.find(".zoom-wrapper").append($target);
  $("body").append($popup);

  $(".btn-close-zoom").on("click", function () {
    $popup.remove();
  });
}

function btnActive(selector) {
  $(selector).removeClass("active").addClass("active");
  const selectedValue = $('.coupon-list input[type="radio"]:checked');
  const selectedText = selectedValue.next(".coupon-item").find("strong").text();
  $(".coupon-active strong").text(selectedText);
}
