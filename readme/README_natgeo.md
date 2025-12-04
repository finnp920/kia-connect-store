# National Geographic Display Theme 퍼블리싱 산출물

html 확인을 위해 사용되는 기존 파일은 삭제하지 않고 남겨두었으며, 아래는 테마 작업 시 추가된 디렉터리와 파일에 대한 구조와 설명입니다.

---

## 1. 디렉토리 구조 (Directory Structure)

```bash
root
├── product/
│   └── pdp_display_theme_natgeo.html    # [HTML] 냇지오 테마 상세 페이지 (메인)
│
└── assets/
├── css/
│   ├── index.css                      # [CSS] 공통 스타일
│   ├── buttons.css                    # [CSS] 버튼 컴포넌트 스타일 (Cut-corner 등)
│   └── pdp/                           # [CSS] 제품 상세 전용 스타일 폴더
│       ├── index.css                  #    - PDP CSS
│       ├── product-view-override.css  #    - 상단 상품 정보 영역 오버라이딩
│
├── js/
│   └── pdp/                           # [JS] 제품 상세 전용 스크립트
│       ├── set-detail.js              #    - 상세 페이지 주요 로직 (Swiper, 탭, 인터랙션)
│       └── youtube.js                 #    - 유튜브 영상 플레이어 제어
│
├── images/
│   └── kia/pdp/natgeo/                # [Img] 냇지오 테마 전용 이미지 리소스
│
├── videos/
│   └── pdp/                           # [Video] 비디오 리소스
│
└── icons/                             # [Icon] 신규 추가 아이콘 (SVG/PNG)
```

## 2. 상세 파일 설명

### A. HTML (Page)
* **`product/pdp_display_theme_natgeo.html`**
  * 냇지오 디스플레이 테마 제품 상세 페이지의 메인 HTML 파일입니다.
  * 기존 레이아웃 구조를 상속받으며, `main` 태그 내부를 중심으로 신규 마크업이 작성되었습니다.

### B. CSS (Styles)
* **`assets/css/index.css` & `buttons.css`**
  * 사이트 전반에 사용되는 신규 공통 스타일 및 버튼(구매하기, 더보기 등) 스타일을 정의했습니다.
* **`assets/css/pdp/` (폴더)**
  * **`index.css`**: 상세 페이지의 기본 골격과 공통 레이아웃을 정의합니다.
  * **`natgeo/` (하위 폴더)**: 냇지오 테마 페이지의 섹션별 스타일을 모듈화하여 관리합니다.

### C. JavaScript (Logic)
* **`assets/js/pdp/set-detail.js`**
  * 페이지 내 주요 인터랙션을 담당하는 핵심 스크립트입니다.
  * **주요 기능**:
    * **Swiper 초기화**: 메인 KV 슬라이드와 썸네일 슬라이드(`thumbnailSwiper`) 간의 연동 로직
    * **테마 선택 로직**: 테마 카드 클릭 시 `data-current-theme` 속성 변경 및 이미지/텍스트 업데이트
    * **반응형 처리**: Mobile/Desktop 전환 시 레이아웃 및 기능 분기 처리
    * **비디오 제어**: 썸네일 호버 시 비디오 자동 재생/일시 정지 로직
* **`assets/js/pdp/youtube.js`**
  * 페이지 하단 'Upgrade Guides' 섹션의 유튜브 영상 로딩 및 제어를 담당합니다.

### D. Assets (Resources)
* **`assets/images/kia/pdp/natgeo/`**
  * 페이지 내 사용되는 배경, 제품 이미지, 배너 등이 포함되어 있습니다.
  * PC/Mo용 이미지가 별도로 존재하며 `<picture>` 태그를 통해 분기 처리되었습니다.
* **`assets/videos/pdp/`**
  * **`product_thumb_sample.mp4`**: 상품 thumbnail 샘플 영상이 있습니다.
  * **`natgeo/`**: Playful 섹션 사용되는 MP4 영상 파일들이 위치합니다.
