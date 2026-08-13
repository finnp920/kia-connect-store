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

- **`experience` 섹션 미사용** — 옵션 1개 구성인 BRAND 테마와 골격이 같으나, BLACK은 `experience` 섹션을 사용하지 않아 마크업과 SCSS 모두 제외했습니다. (`sec04_img_*` 이미지도 없음)

- **`themes` 섹션의 STAY TUNED 카드 제거** — 다른 테마에 있는 `.card-stay-tuned`(추가 예정 안내 카드)가 BLACK에는 없습니다. 마크업과 관련 스타일을 함께 삭제했습니다.

- **상품 썸네일 이미지 네이밍이 기존 테마와 다름** — 아래 2개는 타 테마의 `product_*` 접두사 규칙을 따르지 않습니다.

  | 용도 | BLACK | 기존 테마(BRAND 기준) |
  |---|---|---|
  | 상단 대표 이미지 | `thumb_01.png` | `product_thumb_01.png` |
  | 옵션 선택 라벨 | `productthumb_blackth01.png` | `product_list_thumb01.png` |

  두 파일은 용도가 서로 바뀌기 쉬우니(대표 이미지가 640×640, 옵션 라벨이 166×160) 교체 시 주의가 필요합니다.

- **`img_disc_bg_01.png` / `img_disc_bg_01_mo.png`는 테마 접두사가 없는 파일명** — `brand`, `starwars` 폴더에도 동일한 이름의 다른 이미지가 존재합니다. 에셋 교체 시 반드시 `assets/images/kia/pdp/black/` 경로를 확인하십시오.

- **공통 스크립트(`set-detail.js`) 변경 없음** — 기존 테마와 동일한 로직으로 동작합니다.
