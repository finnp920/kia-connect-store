# Kia Connect Store Display Themes Publishing — Disney 테마 (옵션 06 추가)

디스플레이 Disney 테마 제품 상세 페이지(PDP)에 **옵션 06 라이온 킹**을 추가한 산출물입니다.
기존 옵션 산출물은 `CHANGE_LOG_disney.md`(옵션 01~04), `CHANGE_LOG_disney-2.md`(옵션 05)를 참고하세요.

---

## 변경 파일 목록

```bash
root
├── product/
│   └── pdp_display_theme_disney.html              # [수정] 옵션 06 추가, reasons 2번 구조 교체
│
└── assets/
    ├── css/
    │   └── pdp/disney/
    │       ├── foldable-list-disney.scss           # [추가] reasons 2번 아코디언
    │       ├── index.css                           # [수정] 위 파일 import 추가
    │       ├── themes-disney.scss                  # [수정] 카드 그리드 재구성
    │       ├── reasons-n-disney.scss               # [수정] reasons 2번 PC/모바일 전환
    │       ├── playful-disney.scss                 # [수정] 옵션 06 대응
    │       └── theme-selectors-disney.scss         # [수정] 옵션 06 버튼 대응
    │
    ├── images/
    │   └── kia/pdp/disney/
    │       ├── disneyth06_*                        # [추가] 옵션 06 이미지 일체
    │       ├── productthumb_disneyth06.png         # [추가]
    │       ├── sec02_cardthumb_06(_mo).png         # [추가]
    │       ├── reasons_before_01~06.png            # [추가] reasons 2번 아코디언
    │       ├── reasons_after_01~06.png             # [추가] reasons 2번 아코디언
    │       ├── disneyth05_detail_05(_mo).png       # [추가] 아래 5 참고
    │       ├── disneyth0{1,2,3,5}_disc0{1~4}.png   # [교체] 아래 5 참고
    │       ├── disneyth00_reasons_02(_mo).png      # [삭제] 아래 3 참고
    │       └── sec02_img_staytuned.png             # [삭제] 아래 2 참고
    │
    └── videos/
        └── pdp/disney/th06/                        # [추가] 옵션 06 전용 폴더
```

공통 자산(`assets/css/pdp/index.css`, `section/**`, `assets/js/**`, `assets/icons/**`)은 **변경 없음**.

---

## 특이사항

### 1. `themes-cards-grid` 반응형 3단계

옵션이 6개가 되면서 한 줄 배치가 불가능한 폭이 생겨 **3단계**로 나뉩니다. 마크업 순서는 그대로입니다.

| 뷰포트 | 배치 |
|---|---|
| 1320px 이상 | 테마 카드 6장 + STAY TUNED 카드, **1행** |
| 770 ~ 1319px | 테마 카드 **3열 2행** + STAY TUNED 가로 바 |
| 769px 이하 | 테마 카드 **2열 3행** + STAY TUNED 가로 바 |

- 1320px 이상에서만 카드에 `aspect-ratio` 를 고정합니다. 그보다 좁으면 폰트 `clamp` 하한 때문에
  내용이 비율보다 높아져 잘리므로 내용 높이에 맡깁니다.
- 카드 내부 타이포는 `.card` 에 건 `container-type: inline-size` 기준(`cqw`)으로 스케일합니다.

### 2. pick 카드 `곧 만나요!` → `STAY TUNED`

문구와 아이콘이 바뀌었고, 아이콘은 공통 `assets/icons/icon_staytuned(_mo).png` 를 사용합니다.
이에 따라 기존 `sec02_img_staytuned.png` 는 참조처가 없어져 삭제했습니다.
(Disney 외 테마에서 이 파일을 참조하는 곳은 없습니다.)

> **주의** — `<picture>` 의 `media` 가 `(max-width: 1319px)` 입니다.
> 공통 모바일 분기(769px)가 아니라 **위 1번 표의 3열 전환점과 맞춘 값**입니다.
> STAY TUNED 가 가로 바가 되는 구간에서 모바일용 아이콘을 써야 하기 때문으로,
> 브레이크포인트를 조정할 경우 `themes-disney.scss` 와 **HTML 을 함께** 고쳐야 합니다.

### 3. N Reasons 2번을 아코디언(`foldable-list`)으로 교체

기존 단일 이미지에서 **PC 아코디언 + 모바일 이미지** 구조로 바뀌었습니다.

```html
<div class="reason-n-image">
  <img src="…/disneyth06_reasons_02.png" />   <!-- 모바일 -->
  <div class="foldable-list">                  <!-- PC -->
    <div class="foldable-cards">
      <div class="foldable-card active" data-theme="01"> … </div>
      …
    </div>
  </div>
</div>
```

- 표시 전환은 `reasons-n-disney.scss` 가 처리합니다(PC는 `foldable-list`, 모바일은 `> img`).
- **JS 변경 없음.** `assets/js/pdp/set-detail.js` 의 foldable 로직이 제품 무관 코드라
  hover 확장 / 클릭 시 옵션 변경 / 옵션 변경 시 동기화가 그대로 동작합니다.
  (Starwars 테마와 동일한 마크업 규약입니다.)
- Starwars 와 달리 `.foldable-card-body`(타이틀·설명 오버레이)와 `.foldable-card-logo` 를 쓰지 않습니다.
  펼친 카드의 로고가 `reasons_after_*` 이미지에 합성되어 있습니다.
- 이에 따라 PC 전용이던 `disneyth00_reasons_02.png` 와 모바일용 `_mo.png` 는 참조처가 없어져 삭제했습니다.

### 4. 이미지 네이밍 — 확인 필요

| 파일 | 내용 |
|---|---|
| `reasons_before_01~06.png`<br>`reasons_after_01~06.png` | reasons 2번 아코디언용. **옵션 접두사(`disneyth0N_`)가 없는** 네이밍이며 숫자가 옵션 번호입니다. Starwars 테마도 같은 규칙의 동명 파일을 갖고 있으나 **테마 폴더가 달라 충돌하지 않습니다.** |
| `disneyth06_reasons_02.png` | reasons 2번 **모바일 전용**이지만 파일명에 `_mo` 가 없습니다. 전달받은 파일명을 그대로 사용했습니다. |

### 5. 옵션 06 외 교체·추가된 이미지

라이온 킹 추가와 별개로, 디자인 측 요청에 따라 기존 옵션 이미지도 함께 반영했습니다.

- `disneyth0{1,2,3,5}_disc0{1~4}.png` — 교체
- `disneyth05_detail_05.png` / `_mo.png` — **신규 추가**.
  HTML 에 참조는 있었으나 파일이 없어 옵션 05 의 Goodbye Video 이미지가 표시되지 않던 건이 해소되었습니다.

### 6. 비디오 네이밍

`assets/videos/pdp/disney/th06/` 에 `welcome/goodbye × cluster/avnt` 4개.
파일명은 전 옵션 동일하며 **폴더명으로 옵션을 구분**합니다.
