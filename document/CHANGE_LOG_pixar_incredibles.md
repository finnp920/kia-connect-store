# Kia Connect Store Display Themes Publishing — Pixar 테마 (옵션 03 추가)

디스플레이 Pixar 테마 제품 상세 페이지(PDP)에 **옵션 03 인크레더블**을 추가하고,
페이지를 **국문**으로 전환한 산출물입니다.

---

## 변경 파일 목록

```bash
root
├── product/
│   └── pdp_display_theme_pixar.html              # [수정] 옵션 03 추가, 국문화
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

`index.css` 는 import 대상 파일이 그대로라 **변경 없음**.
공통 자산(`assets/css/pdp/index.css`, `section/**`, `assets/js/**`, `assets/icons/**`)도 **변경 없음**.

---

## 특이사항

### 1. 페이지 국문화

기존 납품본은 `<main>` 이하가 영문이었으나, 이번 버전부터 **info · 업그레이드 가이드 · 유의사항까지 전부 국문**입니다.
마크업 구조는 기존과 같고 텍스트만 바뀌었으며, 하단 공통 섹션은 Disney 국문 페이지와 동일한 문구를 사용합니다.

### 2. 홈카드 설명 문구 — 옵션별 분리 → 공통 1개

기존에는 옵션마다 문구가 달라 `<p data-theme="01">`, `<p data-theme="02">` 로 나뉘어 있었으나,
국문 문구가 전 옵션 공통이 되어 **`data-theme` 없는 `<p>` 1개**로 합쳤습니다.

```html
<div class="playful-content-item homecard">
  …
  <p>각 메뉴 화면을 넘길 때마다 디즈니 픽사 캐릭터와 로고, 다양한 일러스트가 나타납니다.</p>
</div>
```

### 3. pick 카드 `STAY TUNED` → `곧 만나요!`, 모바일 배치 변경

| 뷰포트 | 기존 | 변경 |
|---|---|---|
| 770px 이상 | 테마 카드 2장 + pick 카드, 1행 | 테마 카드 **3장** + pick 카드, 1행 |
| 769px 이하 | 테마 카드 2열 + pick **가로 바**(2열 span) | 테마 카드 + pick 카드 **2열 2행** (pick 이 3번 카드 옆 한 칸) |

- 모바일에서도 pick 카드가 일반 카드 크기가 되어, 가로 바용 모바일 아이콘(`icon_staytuned_mo.png`)을 쓰지 않습니다.
  이에 따라 pick 카드의 `<picture>` 에서 **모바일 `<source>` 를 제거**하고 `icon_staytuned.png` 하나만 사용합니다.

### 4. 기존 옵션(01·02) 이미지 교체

국문 전환에 맞춰 차량 화면 UI가 한글로 된 이미지로 교체했습니다(파일명 동일).

- `pixarth0{1,2}_hero(_mo).png`, `_detail_02·03(_mo).png`, `_detail_04_mo.png`, `_disc01~04.png`, `_reasons_01(_mo).png`
- `pixarth00_reasons_02(_mo).png` — 옵션 3종(토이 스토리 · 인사이드 아웃 · 인크레더블) 구성으로 변경.
  모바일 이미지는 **비율이 바뀌었습니다**(852×348 → 960×714, 2+1 배치).

### 5. 비디오 네이밍

`assets/videos/pdp/pixar/th03/` 에 `welcome/goodbye × cluster/avnt` 4개.
전달 원본의 `avnt_welcome.mp4` / `avnt_goodbye.mp4` 는 기존 규칙에 맞춰
**`welcome_avnt.mp4` / `goodbye_avnt.mp4` 로 이름을 바꿔** 넣었습니다. 폴더명으로 옵션을 구분합니다.

### 6. 미참조 이미지 정리

아래 2개는 HTML·CSS·JS 어디에서도 참조하지 않아 삭제했습니다.

- `ic_check.svg`, `ic_progress_bar.png`
