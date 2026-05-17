# CLAUDE.md

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

## 2. 디렉토리 구조

```
root
├── product/                            # 제품 상세 페이지 HTML
│   └── pdp_display_theme_{theme}.html
│
├── assets/
│   ├── css/pdp/
│   │   ├── index.scss / index.css     # PDP 공통 골격
│   │   ├── section/                    # 공통 섹션 모듈 (모든 테마 적용)
│   │   └── {theme}/                    # 테마 전용 SCSS
│   │       ├── index.css               # CSS import 모음 (수동 작성)
│   │       └── {section}-{theme}.scss
│   │
│   ├── js/pdp/
│   │   ├── set-detail.js               # PDP 핵심 로직 (테마 변경, Swiper, 이벤트)
│   │   └── youtube.js
│   │
│   ├── images/kia/pdp/{theme}/
│   └── videos/pdp/{theme}/             # welcome/goodbye × cluster/avnt
│
├── document/                           # 테마별 변경 로그 (납품 동봉)
│   └── CHANGE_LOG_{theme}.md
│
└── gulpfile.mjs                        # SCSS 컴파일 + 테마 분리 빌드
```

---

## 3. 페이지 구조 규약

### `<main>` data-속성

```html
<main
  data-product="kbo"                  <!-- 제품/테마 식별자 -->
  data-current-theme="01"             <!-- 초기 활성 테마 ID -->
  data-theme-list='["01","02","03"]'  <!-- JSON Array 문자열 필수 -->
>
```

- `data-current-theme`, `data-theme-list` 항목 ID는 **2자리 zero-padding 필수** (`"01"`이지 `"1"` 아님).

### 공통 섹션 골격

`section.kv` → `section.themes` → `section.theme-selectors` → `section.playful` → `section.reasons-n` → `section.screenshots` → `section.info` → `section.upgrade-guides` → `section.disclaimer` → `section.credit`

테마마다 사용하는 섹션이 다를 수 있으며, **사용하지 않는 섹션은 HTML에서 제거**한다.

### 활성 상태 토글 패턴

```scss
[data-product='kbo'][data-current-theme='01'] .card[data-theme='01'] { /* 활성 */ }
```

---

## 4. 빌드 명령

| 명령 | 설명 |
|---|---|
| `npm start` | 정적 서버 (`http-server :8000`) |
| `npm run dev` | SCSS watch + Gulp 개발 |
| `npm run sass:watch` | SCSS만 watch |
| `npm run build --theme={theme}` | **단일 테마 분리 빌드** (납품용) |

단일 테마 빌드 시 `gulpfile.mjs`가 포함하는 것: 해당 테마 HTML/SCSS/이미지/비디오 + 공통 PDP 공통 자산. 자세한 목록은 `gulpfile.mjs` 참고.

---

## 5. 새 테마 추가 워크플로우

1. **HTML**: 기존 테마 중 가까운 것을 복사 → `<main data-product/data-current-theme/data-theme-list>` 교체
   - `.hederWarp_n` 헤더와 푸터는 손대지 않음.
   - 사용하지 않는 섹션 마크업 제거.
2. **CSS 폴더 생성**: `assets/css/pdp/{NEW}/`
   - `{section}-{NEW}.scss` (필요 섹션만)
   - `index.css` (수동으로 `@import url('{section}-{NEW}.css');` 모음)
   - 모든 셀렉터에 `[data-product='{NEW}']` 스코프 필수.
3. **이미지/비디오 폴더**: `assets/images/kia/pdp/{NEW}/`, `assets/videos/pdp/{NEW}/`
4. **CHANGE_LOG 작성**: `document/CHANGE_LOG_{NEW}.md` (납품용 — 아래 6장 참고)
5. **빌드 확인**: `npm run build --theme={NEW}`
6. **회귀 확인**: 공통 섹션 수정 시 다른 테마 시각적 영향 없는지 점검.
7. **작업 마무리 — 미사용 자산 정리**:
   - 베이스 테마에서 복사한 후 사용 안 하는 이미지/SCSS 파일은 삭제.
   - 컴파일된 CSS에서 `[data-product='{NEW}']` 스코프 누락 셀렉터 검사:
     ```bash
     grep -E "^[^@/].*\{$" assets/css/pdp/{theme}/*.css | grep -v "data-product=" 
     ```

---

## 6. CHANGE_LOG 작성 원칙 (납품 동봉용)

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

## 7. 자주 하는 실수

| 실수 | 결과 | 해결 |
|---|---|---|
| `.hederWarp_n` 헤더 마크업/링크 수정 | 작업 범위 밖, 공통 영역 깨짐 | 헤더는 그대로 두고 `<main>` 이하만 수정 |
| `[data-product]` 스코프 없이 CSS 작성 | 다른 테마에 누수 | 모든 셀렉터에 스코프 필수 |
| `.css` 파일을 직접 수정 | 다음 빌드 시 덮어쓰임 | `.scss` 수정 후 컴파일 |
| `data-theme-list` 따옴표 혼동 | JSON 파싱 실패 | `data-theme-list='["01","02"]'` 형식 엄수 |
| 테마 ID 1자리 (`"1"`) 사용 | `[data-theme="01"]` 매칭 실패 | 2자리 zero-padding |
| 공통 `section/*.css` 룰 무시하고 테마 SCSS만 삭제 | 공통 룰이 계속 적용되어 화면에 보임 | 테마 스코프로 `content: none` 등 명시적 override |
| 헤로 PNG에 로고 있는데 별도 `.kv-logo` 추가 | 로고 중복 표시 | 헤로 PNG 먼저 열어보고 합성 여부 확인 |

---

## 8. 반응형 브레이크포인트 (관찰값)

- `max-width: 769px` → 모바일
- `max-width: 580px` → 작은 모바일
- `max-width: 980px` → 태블릿
