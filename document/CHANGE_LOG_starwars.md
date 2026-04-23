# Kia Connect Store Display Themes Publishing — STAR WARS™ 테마

디스플레이 STAR WARS™ 테마 제품 상세 페이지(PDP) 퍼블리싱 산출물입니다.

---

## 변경 파일 목록

```bash
root
├── product/                                       # [Page] 제품 상세 페이지 HTML
│   └── pdp_display_theme_starwars.html              # STAR WARS™ 테마
│
└── assets/
    ├── css/
    │   └── pdp/                                   # [PDP] 제품 상세 전용 스타일
    │       ├── index.scss                           # [수정]
    │       │
    │       ├── section/                           # 공통 섹션 스타일 모듈
    │       │   ├── playful.scss                     # [추가] .css → .scss 전환
    │       │   └── reasons-n.scss                   # [수정] flex 1:1 대응
    │       │
    │       ├── marvel/
    │       │   └── reasons-n-marvel.scss            # [수정] (참고)
    │       │
    │       └── starwars/                          # [추가, 수정] STAR WARS™ 테마 전용 스타일
    │           ├── credit-starwars.scss              # [수정]
    │           ├── foldable-list-starwars.scss      # [추가] foldable-list 컴포넌트
    │           ├── key_visual-starwars.scss         # [수정] 모바일 KV 페이지네이션 bullet 폭 가변 처리
    │           ├── playful-starwars.css             # [수정] 테마 01~06 배경 대응
    │           ├── reasons-n-starwars.scss          # [추가] reasons 섹션 2번째 항목 이미지 영역 대체용
    │           ├── theme-selectors-starwars.scss    # [수정] 01~06 대응
    │           ├── themes-starwars.scss             # [수정] 6 테마 그리드 대응 (1400px 이하 3×2)
    │           └── reasons-starwars.scss            # [삭제] legacy
    │
    ├── js/
    │   └── pdp/
    │       └── set-detail.js                      # [수정] foldable-card hover/click 핸들러 추가
    │
    ├── images/
    │   └── kia/pdp/starwars/                      # [추가, 수정, 삭제] STAR WARS™ 이미지 리소스
    │
    └── videos/
        └── pdp/starwars/                          # [재구성] 테마별 폴더 구조로 전환
            ├── th01/ ~ th06/                        # [추가] 각 폴더에 welcome/goodbye × cluster/avnt 4개
            └── Starwars_*.mp4                       # [삭제] → th01/로 이동
```

---

## 주요 변경 내용 요약

### `product/pdp_display_theme_starwars.html`

- 테마 옵션 **6개**로 확장 (01~06)
  - 01 Rebels / 02 Dark Side / 03 Jedi / 04 Droids / 05 Yoda / 06 Mandalorian
- Reasons 섹션 2번째 항목에 **foldable-list 컴포넌트** 도입
  - 6장의 카드가 나열되어, 펼쳐진 카드(140×200)와 접힌 카드(49×200)가 한 줄에 배치
- Playful 섹션 welcome/goodbye 영상을 테마별로 분기 (`data-theme`로 토글)
  - 기존 공용 `Starwars_*_clu/avnt.mp4` → 테마별 `thNN/thNN_{welcome|goodbye}_{cluster|avnt}.mp4`

### `assets/css/pdp/starwars/foldable-list-starwars.scss` (신규)

- foldable-list 컴포넌트 전용 스타일

### `assets/css/pdp/starwars/themes-starwars.scss`

- 6 테마 대응: `grid-template-columns: repeat(6, minmax(0, 1fr))`, `themes-stage-inner` `max-width: 1694px`
- `@for 1 through 6` 루프로 테마별 활성/비활성 레이어 토글 자동 생성
- **1400px 이하 3×2 레이아웃** 분기 추가
  - `grid-template-columns: repeat(3, minmax(0, 259px))` + `justify-content: center` (화면이 카드 최대폭 합계보다 넓어도 가운데에서 다닥다닥 유지)

### `assets/css/pdp/starwars/reasons-n-starwars.scss` (신규)

- Reasons 섹션 2번째 항목의 이미지 영역을 PC에선 foldable-list, 모바일에선 이미지로 분기
  ```
  .reason-n-item:nth-child(2) .reason-n-image {
    .foldable-list { display: block; }
    > img          { display: none;  }
  }
  /* @media (max-width: 769px) 에서 역전 */
  ```

### `assets/css/pdp/starwars/theme-selectors-starwars.scss`

- 01~06 테마 버튼/드롭다운 색상 대응

### `assets/css/pdp/starwars/playful-starwars.css`

- 01~06 테마별 배경 이미지(`img_disc_bg_NN(_mo).png`) 분기 추가

### `assets/css/pdp/starwars/key_visual-starwars.scss`

- 모바일(≤769px)에서 KV swiper 페이지네이션 bullet 폭을 화면에 맞춰 가변 처리

### `assets/css/pdp/section/playful.scss` (신규, 기존 `.css` 대체)

- `section/playful.css`를 SCSS로 전환 (다른 `section/*` 파일들과 톤 맞춤)

### `assets/css/pdp/section/reasons-n.scss`

- `.reason-n-content-wrapper`, `.reason-n-image`: `flex: 1` → `flex: 1 1 0` + `min-width: 0`
  - 화면이 좁아질 때 자식 고정 폭(foldable-list 445px)이 flex 아이템의 min-content로 작용해 1:1 비율이 깨지던 문제 해결

### `assets/js/pdp/set-detail.js`

- `setDetailCurrentTheme()`에 **foldable-list 카드 active 상태 동기화** 로직 추가
- foldable-cards 전체를 순회하며 이벤트 바인딩:
  - **mouseenter** — 해당 카드만 active로 전환 (프리뷰)
  - **mouseleave (컨테이너)** — 현재 테마 카드로 복귀
  - **click** — `setDetailCurrentTheme(data-theme)` 호출 + `scrollToSelector('.sticky-layout')` 스크롤

### 이미지 리소스 (`assets/images/kia/pdp/starwars/`)

- 구 `starwarsth0{1,2}_reasons-*(-mo).png`, `starwarsth0{1,2}_reasons_num_*.png`, `card_03_gauge*.png`, `card03(_mo).png` **전부 삭제**
- 카드 이미지 네이밍 전환: `cardNN.png` → `cardNN_default.png` / `cardNN_dimed.png` (01~06 전부)
- 테마 03~06용 신규 이미지 추가
  - `starwarsthNN_hero(_mo).png`, `starwarsthNN_detail_0X(_mo).png`, `starwarsthNN_disc0X.png`, `starwarsthNN_reasons_01(_mo).png`
- `reasons_after_05.png` 추가 (foldable-list after 이미지 보강)

### 비디오 리소스 (`assets/videos/pdp/starwars/`)

- 기존 단일 세트 `Starwars_{welcome|goodbye}_{clu|avnt}.mp4`를 `th01/` 폴더로 **rename 이동**
- 테마 02~06 폴더 신규 추가 — 각 폴더에 4개 영상
  - `thNN_welcome_cluster.mp4`, `thNN_welcome_avnt.mp4`
  - `thNN_goodbye_cluster.mp4`, `thNN_goodbye_avnt.mp4`\
