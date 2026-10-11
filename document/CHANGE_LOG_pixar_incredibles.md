# Pixar 테마 — 옵션 03 인크레더블 추가

Pixar 테마 PDP에 **옵션 03 인크레더블**을 추가하고, 페이지를 **국문**으로 전환한 산출물입니다.

---

## 변경 파일 목록

```bash
root
├── product/
│   └── pdp_display_theme_pixar.html              # [수정] 옵션 03 추가, 국문화, 헤더 교체
│
└── assets/
    ├── css/
    │   └── pdp/pixar/
    │       ├── key_visual-pixar.scss              # [수정] 옵션 03 대응
    │       ├── themes-pixar.scss                  # [수정] 카드 그리드 재구성
    │       ├── theme-selectors-pixar.scss         # [수정] 옵션 03 버튼 대응
    │       └── playful-pixar.scss                 # [수정] 옵션 03 배경 대응
    │
    ├── images/
    │   └── kia/pdp/pixar/
    │       ├── pixarth03_*                        # [추가] 옵션 03 이미지 일체
    │       ├── productthumb_pixarth03.png         # [추가]
    │       ├── sec02_cardthumb_03(_mo).png        # [추가]
    │       ├── pixarth0{1,2}_*                    # [교체] 아래 4 참고
    │       ├── pixarth00_reasons_02(_mo).png      # [교체] 아래 4 참고
    │       ├── ic_check.svg                       # [삭제] 아래 6 참고
    │       └── ic_progress_bar.png                # [삭제] 아래 6 참고
    │
    └── videos/
        └── pdp/pixar/th03/                        # [추가] 옵션 03 전용 폴더
```

공통 자산(`assets/css/pdp/index.css`, `section/**`, `assets/js/**`, `assets/icons/**`)은 **변경 없음**.

---

## 특이사항

### 1. 페이지 국문화

`<main>` 이하 전체를 국문으로 전환했습니다(하단 info · 업그레이드 가이드 · 유의사항 포함). 마크업 구조는 동일합니다.

### 2. 홈카드 설명 문구 통합

옵션별로 나뉘어 있던 `<p data-theme>` 를 공통 `<p>` 1개로 합쳤습니다.

### 3. pick 카드 `STAY TUNED` → `곧 만나요!`

- PC: 테마 카드 3장 + pick 카드, 1행
- 모바일: 가로 바 대신 2×2 그리드의 한 칸으로 배치. 이에 따라 모바일 `<source>` 를 제거하고 `icon_staytuned.png` 만 사용합니다.

### 4. 기존 옵션(01·02) 이미지 교체

차량 화면 UI가 한글인 이미지로 교체했습니다(파일명 동일). `pixarth00_reasons_02_mo.png` 는 3종 구성으로 바뀌면서 비율이 달라졌습니다.

### 5. 비디오 네이밍

`th03/` 에 `welcome/goodbye × cluster/avnt` 4개. 파일명은 전 옵션 동일하며 폴더명으로 옵션을 구분합니다.

### 6. 미참조 이미지 정리

어디에서도 참조하지 않는 `ic_check.svg`, `ic_progress_bar.png` 를 삭제했습니다.

### 7. 헤더 최신화

`.hederWarp_n` 을 구버전에서 최신 공통 헤더(Disney 테마와 동일)로 교체했습니다.
헤더 하단의 sticky 가격 바(`#info-sticky`)도 Disney 테마와 동일하게 제거했습니다.
