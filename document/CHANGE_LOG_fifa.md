# Kia Connect Store Display Themes Publishing — FIFA 테마

디스플레이 FIFA 테마 제품 상세 페이지(PDP) 퍼블리싱 산출물입니다.

---

## 변경 파일 목록

```bash
root
├── product/                                      # [Page] 제품 상세 페이지 HTML
│   └── pdp_display_theme_fifa.html                 # FIFA 테마
│
└── assets/
    ├── css/
    │   └── pdp/                                  # [PDP] 제품 상세 전용 스타일
    │       ├── index.scss                          # [수정]
    │       ├── product-view-override               # [수정]
    │       │
    │       ├── section/                          # 공통 섹션 스타일 모듈
    │       │   ├── key_visual                      # [수정] 새로운 pagination 대응
    │       │   └── theme-selectors                 # [수정] 
    │       │
    │       └── fifa/                             # [추가, 수정] FIFA 테마 전용 스타일
    │
    ├── js/
    │   └── pdp/
    │       └── set-detail.js                     # [수정] 상세 페이지 핵심 로직 (Swiper 코드 변경)
    │
    └── images/
        └── kia/pdp/fifa/                         # [추가, 수정] FIFA 이미지 리소스
```

---

## 주요 변경 내용 요약

### `product/pdp_display_theme_fifa.html`
- 텍스트 전체 국문화
- 테마 옵션 **5개 → 17개** 국가로 확장 및 국가 노출 순서 변경
- KV Swiper 새로운 페이징 추가
- 테마 셀렉터 추가

### `assets/js/pdp/set-detail.js`
- KV Swiper 페이징 타입 분기 처리 추가
  - `basic`: 기존 bullet 페이지네이션 유지
  - `dynamic_paging`: fraction 방식 + 슬라이드 위치에 따른 바 인디케이터 동적 업데이트

### `assets/css/pdp/fifa/*.scss`
- 17개 테마 대응 스타일 추가
- KV 슬라이드 `aspect-ratio` 구조 개편
- Playful 섹션 배경 이미지 경로 업데이트
- themes-cards-wrapper 배경 비율 대응

### 이미지 구조 변경 (`assets/images/kia/pdp/fifa/`)
- 구 `details/` 하위 파일 **전체 삭제**
- 파일 네이밍 컨벤션 변경: `img_disc_themeXX_YY.png` → `sec03_disc_thXX_YY.png`
- 17개 국가 × 섹션별 이미지 신규 추가