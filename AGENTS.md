# AGENTS.md

Kia Connect Store 디스플레이 테마 PDP(제품 상세 페이지) 정적 퍼블리싱 산출물.
HTML/CSS/JS/이미지/비디오 리소스를 **기아에 납품**하는 것이 최종 목표.

---

## 1. 프로젝트 핵심 원칙 (최우선)

1. **폴더 구조 유지** — 납품처(기아) 측 구조에 맞춰진 결과물. 비효율적이라도 임의 재구성 금지.
2. **테마 간 격리 (Theme Isolation)** — 가장 중요한 규칙.
   - 모든 테마 전용 스타일은 반드시 `[data-product='{theme}']` 셀렉터로 스코프.
   - 공통 CSS(`assets/css/pdp/index.css`, `section/*.css`)는 `[data-product] .xxx` 형태로 **모든 테마에 자동 적용**. 테마 SCSS에서 룰을 삭제해도 공통 룰은 살아있으므로, 디자인에 맞지 않는 공통 룰은 `[data-product='{theme}']` 스코프로 **명시적 override해서 무효화** (예: `&::after { content: none; }`).
   - 공통 룰과 테마 룰의 명시도가 같으면 후순위(테마 룰)가 이김. 하지만 `:not()` 등으로 공통 명시도가 더 높은 경우 `!important` 필요 (예: `[data-product]:not([data-product=fifa]) .sticky-layout`).
3. **헤더(`.hederWarp_n`)는 테마 퍼블리싱 범위 밖 — 절대 수정 금지.**
   - 기아 측 공통 영역. 마크업/클래스/링크/속성/메뉴 텍스트 모두 원본 그대로 유지.
   - 새 테마 HTML은 기존 테마를 복사한 뒤 **`<main>` 영역과 sticky/breadcrumb 등 PDP 콘텐츠만** 수정.
4. **헤로 이미지(`{theme}th01_hero.png`)에 로고가 합성되어 있을 수 있음** — 별도 `.kv-logo` 요소를 만들지 말 것. Figma 디자인에서 로고가 별도 레이어로 보여도, 실제 PNG는 합성본인 경우가 많음. 헤로 PNG를 먼저 열어 확인.
5. **SCSS만 수정** — `.css`와 `.css.map`은 빌드 산출물.

---

## 2. 테마 현황 (2026-08-13 기준, 9종)

| 테마 (`data-product`) | 테마 수 (`data-theme-list`) | 특징 섹션 | CHANGE_LOG |
|---|---|---|---|
| `black` | 1 (`01` 블랙 에디션) | 없음 (공통 섹션만) | `CHANGE_LOG_black.md` |
| `brand` | 1 (`01` Opposites united) | `experience` | `CHANGE_LOG_brand.md` |
| `disney` | 4 (`01`~`04`) | `reasons-n`, `screenshots` | `CHANGE_LOG_disney.md` |
| `fifa` | 17 (순서 비순차) | `experience` | `CHANGE_LOG_fifa.md` |
| `kbo` | 10 (`01`~`10`) | `reasons-n` | `CHANGE_LOG_kbo.md`, `CHANGE_LOG_kbo-2.md` |
| `marvel` | 3 (`01`,`02`,`04`) | `reasons-n`, `screenshots` | `CHANGE_LOG_marvel_xmen.md` |
| `natgeo` | 3 (`01`~`03`) | `reasons`(구버전), `screenshots`, `credit` | 불필요 (납품 완료) |
| `pixar` | 2 (`01`,`02`) | `reasons-n`, `screenshots` | 불필요 (납품 완료) |
| `starwars` | 6 (`01`~`06`) | `reasons-n`, `screenshots`, `credit`, foldable-list | `CHANGE_LOG_starwars.md` |

- `marvel`의 테마 ID는 `03`이 비어 있음 — **연속이 아니어도 정상**. `data-theme-list` 순서가 곧 화면 노출 순서다(`fifa` 참고).
- `natgeo`만 구버전 `reasons` 섹션을 쓰고, 나머지는 `reasons-n`. 공통 CSS에 둘 다 존재(`section/reasons.css`, `section/reasons-n.css`).
- `black`(블랙 에디션)과 `brand`(KIA 시그니처)는 **서로 다른 테마**다. 둘 다 옵션 1개짜리 다크 테마라 헷갈리기 쉬움. 이미지 파일명으로 구분: `black01_*`/`blackth01_*` vs `brand01_*`/`brandth01_*`.
  - 두 폴더 모두 `img_disc_bg_01.png`, `img_disc_bg_01_mo.png`, `sec02_bg.png`, `sec02_card_thumb01.png`처럼 **테마 접두사 없는 동일 파일명**을 갖는다(`starwars`도 일부 해당). 에셋 교체 시 **경로를 반드시 확인**할 것 — 파일명만 보고 넣으면 다른 테마를 덮어쓴다.
- `product/_backup/`은 작업용 백업 폴더 — 납품 대상 아님.

---

## 3. 디렉토리 구조

```
root
├── index.html                          # 개발용 테마 진입 링크 모음 (납품 대상 아님)
├── product/                            # 제품 상세 페이지 HTML
│   ├── pdp_display_theme_{theme}.html
│   └── _backup/                        # 작업 백업 (납품 제외)
│
├── assets/
│   ├── css/
│   │   ├── common.css / index.css / basic.css / buttons.css / popup.css
│   │   └── pdp/
│   │       ├── index.scss / index.css          # PDP 공통 골격
│   │       ├── go_to_list.css                  # 하단 목록 버튼 (공통)
│   │       ├── product-view-override.css       # 상단 상품정보 영역 override (공통)
│   │       ├── section/                        # 공통 섹션 모듈 (모든 테마 자동 적용)
│   │       └── {theme}/                        # 테마 전용 SCSS
│   │           ├── index.css                   # CSS import 모음 (수동 작성)
│   │           └── {section}-{theme}.scss
│   │
│   ├── js/
│   │   ├── common.js                   # 헤더/푸터 등 공통 (수정 금지 영역)
│   │   ├── library/                    # Swiper 등 외부 라이브러리
│   │   └── pdp/
│   │       ├── set-detail.js           # PDP 핵심 로직
│   │       └── youtube.js              # upgrade-guides 유튜브 로딩
│   │
│   ├── images/kia/pdp/{theme}/         # + 공통 img_disc_video.png
│   ├── videos/pdp/{theme}/             # welcome/goodbye × cluster/avnt
│   ├── font/ , icons/
│
├── document/                           # 테마별 변경 로그 (납품 동봉)
│   └── CHANGE_LOG_{theme}.md
│
├── gulpfile.mjs                        # SCSS 컴파일 + 테마 분리 빌드
└── vercel.json                         # 전체 테마 미리보기 배포 설정
```

---

## 4. 페이지 구조 규약

### `<main>` data-속성

```html
<main
  data-product="kbo"                  <!-- 제품/테마 식별자 -->
  data-current-theme="01"             <!-- 초기 활성 테마 ID -->
  data-theme-list='["01","02","03"]'  <!-- JSON Array 문자열 필수 -->
>
```

- `data-current-theme`, `data-theme-list` 항목 ID는 **2자리 zero-padding 필수** (`"01"`이지 `"1"` 아님).

### 섹션 골격

`section.productView`(상단 상품정보) → `section.kv` → `section.themes` → `section.playful` → `section.reasons-n`(또는 `reasons`) → `section.experience` → `section.screenshots` → `section.info` → `section.upgrade-guides` → `section.disclaimer` → `section.credit` → `section.go-to-list`

- `productView` / `kv` / `themes` / `playful` / `info` / `upgrade-guides` / `disclaimer` / `go-to-list`는 전 테마 공통.
- `experience`는 `brand`·`fifa`만, `credit`은 `natgeo`·`starwars`만 사용. `black`은 공통 섹션만 사용.
- **사용하지 않는 섹션은 HTML에서 제거**한다.

### 테마 셀렉터는 섹션이 아니라 div

- 실제 클래스는 **`.theme-selector-wrapper`** (단수 `selector`) — `section`이 아니라 `div`이고, 9개 테마 전부에 1개씩 있다.
- SCSS 파일명만 복수형(`theme-selectors-{theme}.scss`)이라 혼동하기 쉽다. 마크업을 찾을 땐 `theme-selector-wrapper`로 grep할 것.
- 스크롤 시 `set-detail.js`가 `.is-sticky` 클래스를 붙였다 뗀다.

### 활성 상태 토글 패턴

```scss
[data-product='kbo'][data-current-theme='01'] .card[data-theme='01'] { /* 활성 */ }
```

---

## 5. 빌드 명령

| 명령 | 설명 |
|---|---|
| `npm start` | 정적 서버 (`http-server :8000`) |
| `npm run dev` | SCSS 컴파일 + watch |
| `npm run sass:watch` | SCSS만 watch |
| `npm run sass:build` | SCSS 1회 컴파일 (compressed) |
| `npm run build` | **전체 테마 빌드** → `dist/` (Vercel 미리보기용, 기본값) |
| `npm run build --theme={theme}` | **단일 테마 분리 빌드** (납품용) |
| `gulp build --theme={theme}` | 위와 동일 (gulp 직접 실행) |

- `--theme` 미지정 시 `theme='all'`로 동작해 **모든 테마가 `dist/`에 들어간다**. 납품 시에는 반드시 테마를 지정할 것.
- 단일 테마 빌드에 포함되는 것: 해당 테마 HTML/CSS/이미지/비디오 + 공통 PDP 자산(`index.css`, `go_to_list.css`, `product-view-override.css`, `section/**`, `img_disc_video.png`) + 공통 js/font/icons. 자세한 목록은 `gulpfile.mjs` 참고.
- `npm run build`는 `dist/`를 **먼저 지우고** 복사한다.

---

## 6. 핵심 스크립트 (`assets/js/pdp/set-detail.js`)

`<main>`의 data-속성을 읽어 페이지 전체를 구동한다. 새 테마는 보통 JS 수정 없이 동작한다.

| 함수 | 역할 |
|---|---|
| `initThemeDetailElements()` | `data-theme-list` 파싱 → 전역 `themeList`/`currentTheme` 초기화 후 나머지 실행 |
| `setDetailCurrentTheme(newTheme)` | `data-current-theme` 교체 (CSS 활성 토글의 트리거) |
| `setDetailEventListeners()` | 클릭/스크롤 이벤트 등록. 내부 `checkThemeSelectorsSticky()`가 `.theme-selector-wrapper`에 `.is-sticky` 토글 |
| `initDetailSwiper()` | KV/썸네일 Swiper 생성. `kv_swiper_paging_type`으로 페이징 형태 분기 |
| `getQueryParam(param)` | URL 쿼리로 초기 테마 지정 |
| `scrollToSelector(selector)` | 섹션 앵커 스크롤 |
| `syncFoldableListActive(theme)` | starwars 계열 foldable-list 활성 동기화 |

---

## 7. 새 테마 추가 워크플로우

0. **`git pull` 먼저** — 원격에 이미 진행 중인 테마가 있을 수 있다. `git fetch && git status -sb`로 `behind` 여부부터 확인.
1. **HTML**: 기존 테마 중 가까운 것을 복사 → `<main data-product/data-current-theme/data-theme-list>` 교체
   - `.hederWarp_n` 헤더와 푸터는 손대지 않음.
   - 사용하지 않는 섹션 마크업 제거.
2. **CSS 폴더 생성**: `assets/css/pdp/{NEW}/`
   - `{section}-{NEW}.scss` (필요 섹션만)
   - `index.css` (수동으로 `@import url('{section}-{NEW}.css');` 모음)
   - 모든 셀렉터에 `[data-product='{NEW}']` 스코프 필수.
3. **이미지/비디오 폴더**: `assets/images/kia/pdp/{NEW}/`, `assets/videos/pdp/{NEW}/`
4. **CHANGE_LOG 작성**: `document/CHANGE_LOG_{NEW}.md` (납품용 — 아래 8장 참고)
5. **빌드 확인**: `npm run build --theme={NEW}`
6. **회귀 확인**: 공통 섹션 수정 시 다른 테마 시각적 영향 없는지 점검.
7. **작업 마무리 — 미사용 자산 정리**:
   - 베이스 테마에서 복사한 후 사용 안 하는 이미지/SCSS 파일은 삭제.
   - 컴파일된 CSS에서 `[data-product='{NEW}']` 스코프 누락 셀렉터 검사:
     ```bash
     grep -E "^[^@/].*\{$" assets/css/pdp/{theme}/*.css | grep -v "data-product=" 
     ```

---

## 8. CHANGE_LOG 작성 원칙 (납품 동봉용)

**목적**: 기아 개발자에게 최종 파일을 넘길 때 **어떤 파일이 만들어졌고 기능적/구조적 특이사항이 무엇인지** 알려주기 위함.

**적는 것** (납품 개발자가 코드만 봐서는 알기 어려운 내용):
- 변경 파일 목록 (폴더 트리)
- 기존 테마 대비 **마크업 구조 차이** (예: 옵션 수 변경, 섹션 추가/제거, 컴포넌트 재작성)
- JS 로직 변경
- 이미지/비디오 네이밍 컨벤션 변경
- 빌드/배포 관련 특이사항

**적지 않는 것** (코드/페이지로 확인 가능하거나 당연한 내용):
- 디자인 텍스트/색상/폰트 사이즈/letter-spacing
- 이미지 규격 표 (코드에서 `aspect-ratio` 확인 가능)
- 비디오 규격 (네이밍이 일관되면 자명)
- **공통 CSS와 충돌해서 테마 스코프로 override한 내용** (이 프로젝트의 표준 패턴이라 당연)
- 영향도 섹션 (다른 테마에 변동 없으면 생략)
- 개발용 변경 (`index.html` 진입 링크 등)
- 화면 디자인 설명

→ 결과적으로 CHANGE_LOG는 **간결**해야 함. 디자인은 페이지를 직접 보면 되고, 표준 패턴은 다른 테마 CHANGE_LOG와 비교하면 됨.

---

## 9. 자주 하는 실수

| 실수 | 결과 | 해결 |
|---|---|---|
| `.hederWarp_n` 헤더 마크업/링크 수정 | 작업 범위 밖, 공통 영역 깨짐 | 헤더는 그대로 두고 `<main>` 이하만 수정 |
| `[data-product]` 스코프 없이 CSS 작성 | 다른 테마에 누수 | 모든 셀렉터에 스코프 필수 |
| `.css` 파일을 직접 수정 | 다음 빌드 시 덮어쓰임 | `.scss` 수정 후 컴파일 |
| `data-theme-list` 따옴표 혼동 | JSON 파싱 실패 | `data-theme-list='["01","02"]'` 형식 엄수 |
| 테마 ID 1자리 (`"1"`) 사용 | `[data-theme="01"]` 매칭 실패 | 2자리 zero-padding |
| 공통 `section/*.css` 룰 무시하고 테마 SCSS만 삭제 | 공통 룰이 계속 적용되어 화면에 보임 | 테마 스코프로 `content: none` 등 명시적 override |
| 헤로 PNG에 로고 있는데 별도 `.kv-logo` 추가 | 로고 중복 표시 | 헤로 PNG 먼저 열어보고 합성 여부 확인 |
| 납품 빌드에 `--theme` 미지정 | 전체 테마가 `dist/`에 섞여 들어감 | `npm run build --theme={theme}` 로 지정 |
| **작업 전 `git pull` 안 함** | 원격에만 있는 테마를 "없다"고 오판하고 엉뚱한 폴더에 작업 | 착수 전 `git fetch && git status -sb`로 `behind` 확인 |
| 에셋을 파일명만 보고 교체 | `img_disc_bg_01.png` 등 여러 테마에 같은 이름이 있어 **다른 테마를 덮어씀** | 교체 전 `find assets/images -name "{파일명}"`으로 중복 확인 후 경로 지정 |
| 테마 CSS 파일명에 테마 접미사 누락 | 다른 테마 파일과 혼동 (`fifa/theme-selectors.css`, `starwars/screenshots.css` 등 기존 사례) | 신규 파일은 `{section}-{theme}.scss` 규칙 준수 |

---

## 10. 반응형 브레이크포인트 (관찰값)

- `max-width: 769px` → 모바일
- `max-width: 580px` → 작은 모바일
- `max-width: 980px` → 태블릿

## Imported Claude Cowork project instructions

기아에 퍼블리싱한 html 납품하기 위한 프로젝트.

폴더 구조는 비효율적이라도 유지 필수.
하나의 테마를 시작하면 html, assets 속 전용 이미지, 비디오, css 폴더와 파일을 생성하여 작업.
테마 퍼블리싱할 때 주의할 점은 다른 테마에는 영향이 없도록 해야한다는 점.
