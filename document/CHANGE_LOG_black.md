# Kia Connect Store Display Themes Publishing — BLACK 테마

디스플레이 BLACK 테마(블랙 에디션) 제품 상세 페이지(PDP) 퍼블리싱 산출물입니다.

---

## 변경 파일 목록

```bash
root
├── product/
│   └── pdp_display_theme_black.html               # [추가] BLACK 테마
│
└── assets/
    ├── css/
    │   └── pdp/
    │       └── black/                             # [추가] BLACK 테마 전용 스타일
    │           ├── index.css                        # CSS import 모음 (수동 작성)
    │           ├── key_visual-black.scss
    │           ├── themes-black.scss
    │           ├── playful-black.scss
    │           ├── theme-selectors-black.scss
    │           └── info-black.scss
    │
    ├── images/
    │   └── kia/pdp/black/                         # [추가] BLACK 이미지 리소스
    │
    └── videos/
        └── pdp/black/                             # [추가] BLACK 비디오 리소스
            └── th01/                                # 옵션 01 전용 영상
```

---

## 주요 변경 내용

- 테마 옵션 **1개** (`01 블랙 에디션`)

- **공통 스크립트(`set-detail.js`) 변경 없음** — 기존 테마와 동일한 로직으로 동작합니다.
