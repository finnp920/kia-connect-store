# Kia Connect Store Display Themes Publishing — Marvel 테마 (X-Men 추가 작업)

디스플레이 Marvel 테마 PDP에 대한 **X-Men 테마(04) 추가** 작업 변경 로그입니다.
함께 진행한 변경: **Spider-Man 테마(03) 비노출 처리**, **페이지 전체 국문화**.

---

## 변경 파일 목록

```bash
root
├── product/
│   ├── pdp_display_theme_marvel.html          # [수정] X-Men(04) 추가, Spider-Man(03) 제거, 국문화
│   └── _backup/
│       └── pdp_display_theme_marvel_spiderman.html  # [추가] 스파이더맨 포함 4테마 동작본(빌드 제외, 참고용)
│
└── assets/
    ├── css/
    │   └── pdp/marvel/                          # Marvel 테마 전용 스타일
    │       ├── themes-marvel.scss               # [수정] 테마 04 활성 카드 대응
    │       ├── theme-selectors-marvel.scss      # [수정] 테마 04 버튼 대응
    │       └── playful-marvel.scss              # [수정] 테마 04 배경 대응
    │
    ├── images/
    │   └── kia/pdp/marvel/                      # [추가] marvelth04_* 일괄
    │                                            # [수정] marvelth00_reasons_02(_mo) 교체
    │
    └── videos/
        └── pdp/marvel/                          # [추가] *_04.mp4 (welcome/goodbye × cluster/avnt)
```

---

## 주요 변경 내용

### 1. 테마 구성

```html
<main data-product="marvel" data-current-theme="01" data-theme-list='["01", "02", "04"]'>
```

| 테마 | 내용 | 상태 |
|---|---|---|
| 01 | Avengers Assemble | 기존 |
| 02 | Avengers Comics | 기존 |
| 03 | Spider-Man Retro | **비노출 (주석 보존)** |
| 04 | **X-Men** | **신규** |

X-Men(04) 마크업은 기존 테마와 동일한 위치·구조로 추가했습니다. 전체 텍스트는 국문화했습니다.

### 2. Spider-Man(03) — 제거됨, 별도 백업 보관

`pdp_display_theme_marvel.html` 에서 **Spider-Man(03) 마크업은 완전히 제거**했습니다. (03 흔적 없음)

되살릴 때를 대비해 스파이더맨을 포함한 4테마(01/02/03/04) **동작본**을 별도 보관합니다:

```
product/_backup/pdp_display_theme_marvel_spiderman.html   # 빌드에서 제외됨(참고용)
```

- **스파이더맨을 다시 넣으려면**: 위 백업본을 참고해 03 마크업을 옮기고
  `data-theme-list`에 `"03"` 추가. (03 이미지/영상 에셋은 그대로 남아 있음)
- 백업본의 스파이더맨 텍스트는 **국문화 이전 영문**입니다. 재추가 시 한글 카피 반영 필요.
- ⚠️ 백업본은 `product/_backup/`(한 단계 깊음)에 있어 리소스 경로가 **`../../assets/`** 입니다.
  03 마크업을 `product/` 파일로 옮길 때는 **`../../` → `../`** 로 되돌려야 합니다.

> **주의 (테마 추가/제거 시 공통)**
> `data-theme-list`에서 ID를 빼는 것만으로는 숨겨지지 않습니다.
> **KV 슬라이드 / Themes 카드 / Theme Selector(버튼·드롭다운)** 는 `data-theme-list`와 무관하게
> DOM에 있으면 그대로 노출되므로, 마크업 자체를 삭제해야 합니다.
> (반대로 Screenshots·Playful·Reasons처럼 `data-theme`로 토글되는 요소는 목록에서 빼면 자동으로 숨겨집니다.)

### 3. 공통 셸 — `pdp_display_theme_brand.html` 기준으로 최신화

- **헤더를 brand 최신본으로 교체.** 차량 선택 UI가 신규 패턴으로 변경됨
  (`<div class="mobilecarItem">` + 차량명 노출 + `차량 선택하기 >` / `open_layer_popup('carListPopup')`).
  - ⚠️ 헤더 클래스는 **`hederWarp_n noBoder`** 로 유지했습니다. `noBoder`를 빼면 로고가 흰색
    (`kia-logo-n.svg`)으로 적용되어 흰 배경에서 보이지 않습니다.
  - ⚠️ `open_layer_popup('carListPopup')` 의 대상 팝업 마크업은 brand에도 없어 그대로 뒀습니다.
- **`infoSticky`(상단 가격 바) 제거.** `set-detail.js`가 `#info-sticky`를 참조하지만
  `.theme-selector-wrapper`가 우선하는 폴백 경로라 동작 영향 없음.
- 그 외 공통 영역(정보고시 / 관련상품 / 푸터 / 팝업 / 스크립트)은 이미 brand와 동일 — 변경 없음.

### 4. 마크업 구조 차이 — Playful 타이틀

`h2.playful-title` 을 **테마별로 분기**했습니다 (다른 테마는 단일 요소).

```html
<h2 class="playful-title" data-theme="01">마블 테마, ...</h2>
<h2 class="playful-title" data-theme="04">엑스맨 테마, ...</h2>
```

공통 `section/playful.scss`의 테마 토글 루프는 `.playful-content-item p[data-theme]`와
`.playful-video-player[data-theme]`만 대상이라 타이틀이 커버되지 않습니다.
→ 토글 규칙을 `playful-marvel.scss`에 marvel 스코프로 추가했습니다.

### 5. 이미지/영상 네이밍

- `img_disc_bg_04(_mo).png` (디자인 원본) → **`marvelth04_disc_bg(_mo).png`** 로 리네임 (Playful 배경).
- X-Men 영상은 `_04` 접미사: `welcome_cluster_04.mp4`, `welcome_avnt_04.mp4`,
  `goodbye_cluster_04.mp4`, `goodbye_avnt_04.mp4`.
- 공유 이미지 `marvelth00_reasons_02(_mo).png` 는 X-Men 반영 신규본으로 **교체**(덮어쓰기).
