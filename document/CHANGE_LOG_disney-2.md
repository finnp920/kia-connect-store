# Kia Connect Store Display Themes Publishing — Disney 테마 (옵션 05 추가)

디스플레이 Disney 테마 제품 상세 페이지(PDP)에 **옵션 05 위니더푸**를 추가한 산출물입니다.
기존 4개 옵션 산출물은 `CHANGE_LOG_disney.md` 를 참고하세요.

---

## 변경 파일 목록

```bash
root
├── product/                                      # [Page] 제품 상세 페이지 HTML
│   └── pdp_display_theme_disney.html              # [수정] 옵션 05 추가
│
└── assets/
    ├── css/
    │   └── pdp/disney/                            # Disney 테마 전용 스타일
    │       ├── themes-disney.scss                  # [수정] 카드 그리드 레이아웃 재구성
    │       ├── key_visual-disney.scss              # [수정] 테마 05 대응
    │       ├── playful-disney.scss                 # [수정] 테마 05 대응
    │       └── theme-selectors-disney.scss         # [수정] 테마 05 버튼 대응
    │
    ├── images/
    │   └── kia/pdp/disney/                        # [추가] disneyth05_* 이미지 일체
    │       ├── disneyth00_reasons_02.png           # [교체] 옵션 5개 반영 (PC/모바일)
    │       └── sec02_img_staytuned_mo.png          # [삭제] 아래 3-2 참고
    │
    └── videos/
        └── pdp/disney/
            └── th05/                               # [추가] 테마 05 전용 폴더
```

- `index.css`, `reasons-n-disney.scss` 는 변경 없음.
- 공통 자산(`assets/css/pdp/index.css`, `section/**`, `assets/js/**`)은 **변경 없음**.

---

## 주요 변경 내용 요약

### 1. `product/pdp_display_theme_disney.html`

- 테마 옵션 **5개**로 확장 (01~05)
  - 01 Mickey & Friends / 02 Frozen / 03 Princesses / 04 Zootopia / **05 Winnie the Pooh (신규)**
- `<main data-theme-list='["01", "02", "03", "04", "05"]'>` — 테마 목록에 `"05"` 추가
- `data-theme="05"` 요소 일괄 추가
  - **상품 옵션** `.checkBtn` (`check5`)
  - **KV** `.kv-slide`
  - **Themes** `.card`
  - **테마 셀렉터** 버튼 / 드롭다운 `li`
  - **Screenshots** `xfade-item` × 5 — detail_01 ~ detail_05
  - **Playful > Welcome 영상** (`welcome_cluster.mp4`, `welcome_avnt.mp4`)
  - **Playful > Goodbye 영상** (`goodbye_cluster.mp4`, `goodbye_avnt.mp4`)
  - **Playful > 이미지** `xfade-stage.image-wrapper` × 4 (disc01~04)
  - **N Reasons > Reason 1** `reason-n-image` picture

### 2. 마크업 · 구조 변경

#### 2-1. `themes-cards-grid` 레이아웃 재구성

옵션이 5개가 되면서 카드 배치가 바뀌었습니다. **마크업 순서는 그대로**이고 `themes-disney.scss` 만 수정했습니다.

| 구분 | 이전 (옵션 4개) | 변경 (옵션 5개) |
|---|---|---|
| PC 그리드 | 테마 카드 4 + pick 1 | 테마 카드 **5** + pick 1 |
| PC 그리드 폭 | `max-width: 1452px` | `max-width: 1765px` (`.themes-stage-inner` 은 `1805px`) |
| 모바일 pick 카드 | 2개 컬럼 전체를 차지하는 가로 바 | **일반 카드와 동일하게 1칸 차지** (3행 2열의 마지막 칸) |
| 모바일 그리드 폭 | `width: fit-content` | `width: 100%` + `max-width: 586px` (카드 최대폭 도달 시 가운데 정렬) |

#### 2-2. pick 카드 이미지 단일화 → `sec02_img_staytuned_mo.png` **삭제**

pick 카드("곧 만나요!") 이미지가 모바일에서만 별도 파일로 교체되고 있었으나,
디자인상 PC·모바일이 동일해져 `<picture>` 내 `<source>` 를 제거하고
`sec02_img_staytuned.png` 하나만 사용하도록 변경했습니다.

이에 따라 **`sec02_img_staytuned_mo.png` 는 참조처가 없어져 삭제**했습니다.
Disney 테마 외에서 이 파일을 참조하는 곳은 없습니다.

#### 2-3. 공통 이미지 `disneyth00_reasons_02` 교체

N Reasons 두 번째 항목 이미지가 옵션 5개 기준으로 갱신되어 PC·모바일 파일을 교체했습니다.
파일명·마크업은 그대로이며, **모든 옵션에 공통 적용**됩니다.

### 3. 이미지 · 비디오
- 이미지 — `disneyth05_*` (예: `disneyth05_hero.png`, `disneyth05_disc01.png`)
- 비디오 — `assets/videos/pdp/disney/th05/` 폴더에 `welcome/goodbye × cluster/avnt` 4개
  (파일명은 전 옵션 동일, **폴더명으로 옵션을 구분**)
