# Kia Connect Store Display Themes Publishing — KBO 테마

디스플레이 KBO 테마 제품 상세 페이지(PDP) 퍼블리싱 산출물입니다.

---

## 변경 파일 목록

```bash
root
├── product/                                      # [Page] 제품 상세 페이지 HTML
│   └── pdp_display_theme_kbo.html                 # KBO 테마
│
└── assets/
    ├── css/
    │   └── pdp/                                  # [PDP] 제품 상세 전용 스타일
    │       └── kbo/                              # [추가] KBO 테마 전용 스타일
    │           ├── _variables.scss                 # 공통 변수 ($theme-name, $theme-option-count)
    │           ├── ...                      
    │           └── theme-selectors-kbo.scss        # 테마 셀렉터 스타일
    │
    ├── images/
    │   └── kia/pdp/kbo/                          # [추가] KBO 이미지 리소스
    │
    └── videos/
        └── pdp/kbo/                              # [추가] KBO 비디오 리소스
```

---

## 주요 변경 내용 요약

### `product/pdp_display_theme_kbo.html`
- 테마 옵션 **10개 KBO 구단** 구성 (01~10, 오름차순 정렬)
  - 01 기아 타이거즈 / 02 삼성 라이온즈 / 03 LG 트윈스 / 04 두산 베어스 / 05 KT 위즈
  - 06 SSG 랜더스 / 07 롯데 자이언츠 / 08 한화 이글스 / 09 NC 다이노스 / 10 키움 히어로즈

### `assets/css/pdp/kbo/`
- KBO 전용 SCSS 모듈 **신규 추가** (`@use` / `@forward` 기반 구조)
- `_variables.scss`로 공통 변수 단일 관리 (`$theme-name`, `$theme-option-count`)
- 10개 구단 테마 셀렉터 색상 대응 (구단별 팀 컬러 적용)
