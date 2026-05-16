# Kia Connect Store Display Themes Publishing — BRAND™ 테마

디스플레이 BRAND™ 테마 제품 상세 페이지(PDP) 퍼블리싱 산출물입니다.

---

## 변경 파일 목록

```bash
root
├── product/                                       # [Page] 제품 상세 페이지 HTML
│   └── pdp_display_theme_brand.html               # BRAND™ 테마
│
└── assets/
    ├── css/
    │   └── pdp/
    │       └── brand/                             # [추가] BRAND™ 테마 전용 스타일
    │           ├── index.css                        # CSS import 목록
    │           ├── credit-brand.scss
    │           ├── foldable-list-brand.scss
    │           ├── key_visual-brand.scss
    │           ├── playful-brand.scss
    │           ├── reasons-n-brand.scss
    │           ├── screenshots.scss
    │           ├── theme-selectors-brand.scss
    │           └── themes-brand.scss
    │
    ├── images/
    │   └── kia/pdp/brand/                         # [추가] BRAND™ 이미지 리소스
    │       ├── cardbg.png                           # 테마 카드 배경 (PC)
    │       ├── cardbg_mo.png                        # 테마 카드 배경 (MO)
    │       ├── logo_brand.png                       # brand 로고
    │       ├── product_thumb_01.png ~ 06.png        # 상품 썸네일 (스와이퍼)
    │       ├── product_thumb01.png ~ 06.png         # 옵션 체크버튼 썸네일
    │       ├── card01_default.png ~ card06_*.png    # 테마 카드 (PC/MO, active/inactive)
    │       ├── brandth01_hero.png ~ th06_*.png      # KV 히어로 이미지 (PC/MO)
    │       ├── brandth01_detail_01.png ~ ...        # Screenshots 상세 이미지 (PC/MO, 5장×6테마)
    │       ├── brandth01_disc01.png ~ ...           # Playful Designs 이미지 (4장×6테마)
    │       ├── brandth01_reasons_01.png ~ ...       # Reasons 이미지 (PC/MO, 6테마)
    │       ├── brandth00_reasons02_mo.png           # Reasons 2번째 모바일 이미지
    │       ├── brandth00_reasons_03.png             # Reasons 3번째 이미지 (PC/MO)
    │       ├── img_disc_bg_01.png ~ 06.png          # Playful 섹션 배경 (PC/MO)
    │       ├── reasons_before_01.png ~ 06.png       # Foldable card before 이미지
    │       ├── reasons_after_01.png ~ 06.png        # Foldable card after 이미지
    │       └── reasons-logo.png                     # Foldable card 로고
    │
    └── videos/
        └── pdp/brand/                             # [추가] BRAND™ 비디오 리소스
            ├── th01/                                # th01_welcome_cluster/avnt, th01_goodbye_cluster/avnt
            ├── th02/
            ├── th03/
            ├── th04/
            ├── th05/
            └── th06/
```

---

## 이미지 규격

| 구분 | 파일명 패턴 | PC 권장 해상도 | MO 권장 해상도 |
|------|------------|--------------|--------------|
| KV Hero | `brandthNN_hero.png` | 1920×876 (160:73) | 720×1060 (36:53) |
| 테마 카드 | `cardNN_default/dimed.png` | 259×292 (264:292) | 312×386 |
| Screenshots | `brandthNN_detail_NN.png` | — | — |
| Playful Disc | `brandthNN_disc0N.png` | — | — |
| Reasons | `brandthNN_reasons_01.png` | — | — |
| Playful BG | `img_disc_bg_0N.png` | — | — |

## 비디오 파일 규격

각 테마 폴더(`th01` ~ `th06`)에 4개 파일:
- `thNN_welcome_cluster.mp4`
- `thNN_welcome_avnt.mp4`
- `thNN_goodbye_cluster.mp4`
- `thNN_goodbye_avnt.mp4`
