# Pixar 테마 — 옵션 04 도리를 찾아서 추가

Pixar 테마 PDP에 **옵션 04 픽사 도리를 찾아서: 함께하는 여정**을 추가한 산출물입니다.
이전 납품(`CHANGE_LOG_pixar_incredibles.md`, 옵션 03 추가) 이후의 변경분입니다.

---

## 변경 파일 목록

```bash
root
├── product/
│   └── pdp_display_theme_pixar.html              # [수정] 옵션 04 추가
│
└── assets/
    ├── css/
    │   └── pdp/pixar/
    │       ├── key_visual-pixar.scss              # [수정] 옵션 04 대응
    │       ├── themes-pixar.scss                  # [수정] 카드 그리드 재구성
    │       ├── theme-selectors-pixar.scss         # [수정] 옵션 04 버튼 대응
    │       └── playful-pixar.scss                 # [수정] 옵션 04 배경 대응
    │
    ├── images/
    │   └── kia/pdp/pixar/
    │       ├── pixarth04_*                        # [추가] 옵션 04 이미지 일체
    │       ├── productthumb_pixarth04.png         # [추가]
    │       ├── sec02_cardthumb_04(_mo).png        # [추가]
    │       └── pixarth00_reasons_02(_mo).png      # [교체] 아래 3 참고
    │
    └── videos/
        └── pdp/pixar/th04/                        # [추가] 옵션 04 전용 폴더
```

공통 자산(`assets/css/pdp/index.css`, `section/**`, `assets/js/**`, `assets/icons/**`)은 **변경 없음**.

---

## 특이사항

### 1. 옵션 4개 구성

`data-theme-list='["01", "02", "03", "04"]'`. 상단 옵션 체크박스, KV 슬라이드, 테마 카드, 테마 셀렉터(버튼·드롭다운)에 `04` 항목이 하나씩 추가됐습니다. JS 수정은 없습니다.

### 2. 테마 카드 그리드 재구성

- PC: 테마 카드 4장 + `곧 만나요!` pick 카드, 1행. 그리드 최대 폭을 `1200px` → `1452px` 로 넓혔습니다.
- 모바일: 테마 카드 4장이 2×2 그리드를 채우므로, pick 카드는 두 칸을 가로지르는 **가로 바**로 바뀌었습니다(옵션 03 때의 "2×2 중 한 칸" 배치를 대체, Disney 테마와 같은 패턴).

### 3. `pixarth00_reasons_02(_mo).png` 교체

Reasons 2번 포스터 이미지가 4종 구성으로 바뀌었습니다. 모바일 이미지는 비율이 달라졌습니다(960×714 → 960×726).

### 4. 비디오

`th04/` 에 `welcome/goodbye × cluster/avnt` 4개. 파일명은 전 옵션 동일하며 폴더명으로 옵션을 구분합니다.
