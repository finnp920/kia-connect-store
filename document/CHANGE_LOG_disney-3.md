# Kia Connect Store Display Themes Publishing — Disney 테마 (옵션 06 추가)

디스플레이 Disney 테마 제품 상세 페이지(PDP)에 **옵션 06 라이온 킹**을 추가하고,
일부 기존 옵션 이미지를 교체한 산출물입니다.

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
    │       ├── disneyth0{1,2,3,5}_disc0{1~4}.png   # [교체] 아래 5 참고
    │       ├── disneyth00_reasons_02(_mo).png      # [삭제] 아래 3 참고
    │       ├── sec02_img_staytuned.png             # [삭제] 아래 2 참고
    │       ├── ic_sec03_00_unchecked.svg           # [삭제] 아래 7 참고
    │       ├── ic_sec03_02_checked.svg             # [삭제] 아래 7 참고
    │       ├── ic_sec03_03_checked.svg             # [삭제] 아래 7 참고
    │       ├── ic_unchecked.svg                    # [삭제] 아래 7 참고
    │       ├── mainhumb_disneyth01.png             # [삭제] 아래 7 참고
    │       └── mainhumb_disneyth02.png             # [삭제] 아래 7 참고
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
이에 따라 `sec02_img_staytuned.png` 는 참조처가 없어져 삭제했습니다.

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
      <div class="foldable-card active" data-theme="01">
        <img class="img-before" src="…/reasons_before_01.png" />
        <img class="img-after"  src="…/reasons_after_01.png" />
        <div class="foldable-card-label">미키와 친구들</div>
      </div>
      …
    </div>
  </div>
</div>
```

- 표시 전환은 `reasons-n-disney.scss` 가 처리합니다(PC는 `foldable-list`, 모바일은 `> img`).
- **JS 변경 없음.** `assets/js/pdp/set-detail.js` 에 이미 들어 있는 foldable 로직이 제품 무관 코드라
  hover 확장 / 클릭 시 옵션 변경 / 옵션 변경 시 동기화가 그대로 동작합니다.
- 접힌 탭은 배경 이미지 + 세로 라벨(HTML 텍스트), 펼친 카드는 포스터 이미지만 노출합니다.
  펼친 카드의 로고가 `reasons_after_*` 이미지에 합성되어 있어 **별도 로고 요소를 두지 않습니다.**
- 이에 따라 PC 전용이던 `disneyth00_reasons_02.png` 와 모바일용 `_mo.png` 는 참조처가 없어져 삭제했습니다.

### 4. 이미지 네이밍

- `reasons_before_01~06.png` / `reasons_after_01~06.png` — reasons 2번 아코디언용.
  옵션 접두사(`disneyth0N_`) 없이 **끝 두 자리가 옵션 번호**입니다.
- `disneyth06_reasons_02.png` — reasons 2번 **모바일 전용**입니다(파일명에 `_mo` 없음).

### 5. 옵션 06 외 교체된 이미지

옵션 06 추가와 별개로, 디자인 측 요청에 따라 다른 옵션의 `disc` 이미지도 함께 교체했습니다.

- `disneyth0{1,2,3,5}_disc0{1~4}.png`

### 6. 비디오 네이밍

`assets/videos/pdp/disney/th06/` 에 `welcome/goodbye × cluster/avnt` 4개.
파일명은 전 옵션 동일하며 **폴더명으로 옵션을 구분**합니다.

### 7. 미참조 이미지 정리

아래 6개는 HTML·CSS·JS 어디에서도 참조하지 않아 삭제했습니다.

- `ic_sec03_00_unchecked.svg`, `ic_sec03_02_checked.svg`, `ic_sec03_03_checked.svg`, `ic_unchecked.svg`
- `mainhumb_disneyth01.png`, `mainhumb_disneyth02.png`

`mainhumb_*` 는 옵션 01·02 에만 있던 파일로, 현재 PDP 에서는 사용하지 않습니다.
