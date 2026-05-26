# Kia Connect Store Display Themes Publishing — Disney 테마

디스플레이 Disney 테마 제품 상세 페이지(PDP) 퍼블리싱 산출물입니다.

---

## 변경 파일 목록

```bash
root
├── product/                                      # [Page] 제품 상세 페이지 HTML
│   └── pdp_display_theme_disney.html              # Disney 테마
│
└── assets/
    ├── css/
    │   └── pdp/disney/                            # Disney 테마 전용 스타일
    │       ├── index.css                           # CSS import 모음
    │       ├── key_visual-disney.scss              # KV 섹션 스타일
    │       ├── playful-disney.scss                 # [수정] 테마 04 배경 대응
    │       ├── theme-selectors-disney.scss         # [수정] 테마 04 버튼/드롭다운 대응
    │       ├── themes-disney.scss                  # [수정] 테마 04 그리드 대응
    │       └── reasons-n-disney.scss               # Reasons 섹션 스타일
    │
    ├── images/
    │   └── kia/pdp/disney/                        # [추가, 수정] Disney 이미지
    │
    └── videos/
    │   └── pdp/disney/                            # [추가] 주토피아 영상 리소스
    │       └── th04/                                # [추가] 테마 04 전용 폴더
```

---

## 주요 변경 내용 요약

### `product/pdp_display_theme_disney.html`

- 테마 옵션 **4개**로 확장 (01~04)
  - 01 Mickey & Friends / 02 Frozen / 03 Princesses / **04 Zootopia (신규)**
- `<main data-theme-list='["01", "02", "03", "04"]'>` — 테마 목록에 `"04"` 추가
- GNB 메뉴 html 최신으로 반영
- `data-theme="04"` 누락 요소 일괄 보완
  - **Screenshots** `xfade-stage` × 5 — detail_01 ~ detail_05
  - **Playful > 타이틀** `h2.playful-title`
  - **Playful > Welcome 영상** (`welcome_cluster.mp4`, `welcome_avnt.mp4`)
  - **Playful > Goodbye 영상** (`goodbye_cluster.mp4`, `goodbye_avnt.mp4`)
  - **Playful > 이미지** `xfade-stage.image-wrapper` × 4 (disc01~04)
  - **N Reasons > Reason 1** `reason-n-image` picture
- 전체 국문화 작업
