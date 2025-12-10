# Kia Connect Store Display Themes Publishing

디스플레이 테마(FIFA, , National Geographic 등) 제품 상세 페이지(PDP) 퍼블리싱 산출물입니다.
본 프로젝트는 공통 레이아웃과 스크립트를 기반으로 각 테마별 독자적인 스타일과 리소스를 모듈화하여 관리하도록 구성되었습니다.

---

## 1. 디렉토리 구조 (Directory Structure)

```bash
root
├── product/                       # [Page] 제품 상세 페이지 HTML
│   ├── pdp_display_theme_fifa.html      # FIFA 테마
│   ├── pdp_display_theme_natgeo.html    # National Geographic 테마
│   └── pdp_display_theme_starwars.html  # Star Wars 테마
│
└── assets/
    ├── css/                       # [Style] 스타일시트
    │   ├── common.css             # 공통 스타일 (헤더, 푸터 등)
    │   ├── index.css              # 메인/공통
    │   ├── buttons.css            # 버튼 컴포넌트
    │   ├── popup.css              # 팝업 스타일
    │   ├── basic.css              # 기본 스타일 리셋 등
    │   │
    │   └── pdp/                   # [PDP] 제품 상세 전용 스타일
    │       ├── index.css          # PDP 공통 레이아웃
    │       ├── product-view-override.css # 상단 상품 정보 영역 오버라이딩
    │       ├── go_to_list.css     # 하단 목록 버튼 스타일
    │       │
    │       ├── section/           # 공통 섹션 스타일 모듈
    │       │   ├── info.css
    │       │   ├── themes.css
    │       │   ├── playful.css
    │       │   ├── key_visual.css
    │       │   ├── disclaimer.css
    │       │   └── ...
    │       │
    │       ├── fifa/              # [Theme] FIFA 테마 전용 스타일
    │       │   ├── index.css
    │       │   └── ...
    │       │
    │       ├── starwars/          # [Theme] Star Wars 테마 전용 스타일
    │       │   ├── index.css
    │       │   └── ...
    │       │
    │       └── natgeo/            # [Theme] NatGeo 테마 전용 스타일
    │           ├── index.css
    │           └── ...
    │
    ├── js/                        # [Script] 자바스크립트
    │   ├── common.js              # 공통 기능 (GNB, 푸터 등)
    │   └── pdp/                   # PDP 전용 스크립트
    │       ├── set-detail.js      # 상세 페이지 핵심 로직 (Swiper, 테마 변경, 인터랙션)
    │       └── youtube.js         # 유튜브 플레이어 연동
    │
    ├── images/                    # 이미지 리소스
    │   └── kia/pdp/ [fifa, starwars, natgeo] ...
    │
    └── videos/                    # 동영상 리소스
    │   └── pdp/ [fifa, starwars, natgeo] ...
    │
    └── icons/                      # [Icon] 신규 추가 아이콘 (SVG/PNG)
```

## 2. 상세 파일 설명

### A. HTML (Page)
* 각 제품 상세 페이지는 공통적인 구조(`header`, `footer`, `sticky-info`)를 공유하며, main 태그 내부의 컨텐츠 구성을 달리하여 각 테마의 특징을 표현합니다.
* 각 페이지의 핵심 설정값은 `<main>` 태그의 data- 속성을 통해 제어됩니다.
  * data-product: 제품군 식별자 (예: fifa, starwars, natgeo 등)
  * data-current-theme: 페이지 로드 시 최초로 활성화될 테마 ID (예: 01)
  * data-theme-list: 해당 상품에서 사용 가능한 테마 ID 목록. **반드시 JSON Array 문자열 형식('["01", "02"]')**으로 작성해야 합니다.

### B. CSS (Styles)
* **`assets/css/index.css` & `buttons.css`**
  * 사이트 전반에 사용되는 신규 공통 스타일 및 버튼(구매하기, 더보기 등) 스타일을 정의했습니다.
* **`assets/css/pdp/` (폴더)**
  * **`index.css`**: 상세 페이지의 기본 골격과 공통 레이아웃을 정의합니다.
  * **`fifa/`, `natgeo/`, `starwars/` (하위 폴더)**: 각 테마 페이지의 섹션별 스타일을 모듈화하여 관리합니다.

### C. JavaScript (Logic)
* **`assets/js/pdp/set-detail.js`**
  * 페이지 내 주요 인터랙션을 담당하는 핵심 스크립트입니다.
  * **기능**:
    * **initThemeDetailElements**: 로드될 때 데이터를 설정하고 필요한 함수들을 실행
    * **setDetailCurrentTheme**: 테마 변경 함수
    * **setDetailEventListeners**: 페이지 내의 모든 클릭 및 스크롤 이벤트를 등록
    * **initDetailSwiper**: Swiper 라이브러리를 사용하여 슬라이더를 생성하고 설정
* **`assets/js/pdp/youtube.js`**
  * 페이지 하단 'Upgrade Guides' 섹션의 유튜브 영상 로딩 및 제어를 담당합니다.

### D. Assets (Resources)
* **`assets/images/kia/pdp/` (폴더)**
  * **`fifa/`, `natgeo/`, `starwars/` (하위 폴더)**: 각 테마별 사용되는 이미지 파일들이 위치합니다.
* **`assets/videos/pdp/` (폴더)**
  * **`fifa/`, `natgeo/`, `starwars/` (하위 폴더)**: 각 테마별 사용되는 MP4 영상 파일들이 위치합니다.

