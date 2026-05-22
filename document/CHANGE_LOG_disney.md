# Kia Connect Store Display Themes Publishing — Disney 테마

디스플레이 Disney 테마 제품 상세 페이지(PDP) 퍼블리싱 산출물입니다.

---

## 변경 파일 목록

```bash
root
├── product/                                          # [Page] 제품 상세 페이지 HTML
│   └── pdp_display_theme_disney.html                   # Disney 테마
│
└── assets/
    ├── css/
    │   └── pdp/disney/                              # Disney 테마 전용 스타일
    │       ├── index.css                               # CSS import 모음
    │       ├── key_visual-disney.scss                  # KV 섹션 스타일
    │       ├── playful-disney.scss                     # [수정] 테마 04 배경 대응
    │       ├── theme-selectors-disney.scss             # [수정] 테마 04 버튼/드롭다운 대응
    │       ├── themes-disney.scss                      # [수정] 테마 04 그리드 대응
    │       └── reasons-n-disney.scss                   # Reasons 섹션 스타일
    │
    ├── images/
    │   └── kia/pdp/disney/                          # [추가, 수정] Disney 이미지 리소스
    │       ├── disneyth04_hero.png                     # [추가] 주토피아 KV 이미지 (PC)
    │       ├── disneyth04_hero_mo.png                  # [추가] 주토피아 KV 이미지 (MO)
    │       ├── disneyth04_brandlogo.png                # [추가] 주토피아 브랜드 로고
    │       ├── disneyth04_detail_01~05.png             # [추가] 주토피아 스크린샷 (PC)
    │       ├── disneyth04_detail_01~05_mo.png          # [추가] 주토피아 스크린샷 (MO)
    │       ├── disneyth04_disc01~04.png                # [추가] 주토피아 Playful 이미지
    │       ├── disneyth04_disc_bg_mo.png               # [추가] 주토피아 Playful 배경 (MO)
    │       ├── disneyth04_reasons_01.png               # [추가] 주토피아 Reasons 이미지 (PC)
    │       ├── disneyth04_reasons_01_mo.png            # [추가] 주토피아 Reasons 이미지 (MO)
    │       ├── productthumb_disneyth04.png             # [추가] 주토피아 상품 옵션 썸네일
    │       ├── sec02_cardthumb_04.png                  # [추가] 주토피아 테마 카드 (PC)
    │       ├── sec02_cardthumb_04_mo.png               # [추가] 주토피아 테마 카드 (MO)
    │       └── disneyth01~03_*.png                     # [수정] 기존 테마 이미지 교체
    │
    └── videos/
        └── pdp/disney/                              # [추가] 주토피아 영상 리소스
            └── th04/                                   # [추가] 테마 04 전용 폴더
                ├── welcome_cluster.mp4                 # [추가] 웰컴 영상 (클러스터)
                ├── welcome_avnt.mp4                    # [추가] 웰컴 영상 (AVNT)
                ├── goodbye_cluster.mp4                 # [추가] 굿바이 영상 (클러스터)
                └── goodbye_avnt.mp4                    # [추가] 굿바이 영상 (AVNT)
```

---

## 주요 변경 내용 요약

### `product/pdp_display_theme_disney.html`

- 테마 옵션 **4개**로 확장 (01~04)
  - 01 Mickey & Friends / 02 Frozen / 03 Princesses / **04 Zootopia (신규)**
- `<main data-theme-list='["01", "02", "03", "04"]'>` — 테마 목록에 `"04"` 추가
- GNB 메뉴 구조 개편
  - 디지털 사양 / 디즈니 테마를 별도 depth1 카테고리로 분리
  - 모바일 하단 메뉴(`mobileOpenMenu`)에 디즈니 컬렉션 링크 추가
  - PC 전용 차량 선택 UI(`div.carlist`) 제거
  - 주석 처리된 장바구니 버튼 마크업 정리
- `data-theme="04"` 누락 요소 일괄 보완
  - **Screenshots** `xfade-stage` × 5 — detail_01 ~ detail_05
  - **Playful > 타이틀** `h2.playful-title`
  - **Playful > Welcome 영상** (`welcome_cluster.mp4`, `welcome_avnt.mp4`)
  - **Playful > Goodbye 영상** (`goodbye_cluster.mp4`, `goodbye_avnt.mp4`)
  - **Playful > 이미지** `xfade-stage.image-wrapper` × 4 (disc01~04)
  - **N Reasons > Reason 1** `reason-n-image` picture

#### contentWarp 영역 (테마 04 옵션 추가)

| 구분 | 내용 |
|---|---|
| 옵션 4 input value | `Disney Zootopia` |
| 옵션 4 썸네일 | `productthumb_disneyth04.png` |
| 옵션 4 레이블 | `Disney Zootopia` |

#### KV 섹션 (테마 04 슬라이드 추가)

| 항목 | 내용 |
|---|---|
| KV 이미지 | `disneyth04_hero.png` / `disneyth04_hero_mo.png` |
| 브랜드 로고 | `disneyth04_brandlogo.png` |
| 타이틀 | 디즈니 주토피아 테마, 무한한 가능성의 세계 |
| 서브타이틀 | 모두를 위한 주토피아의 다채롭고 활기 넘치는 세상을 특별한 디스플레이 테마와 함께 경험하세요. |

#### Themes 섹션 (카드 04 추가)

| 항목 | 내용 |
|---|---|
| 카드 이미지 | `sec02_cardthumb_04.png` / `sec02_cardthumb_04_mo.png` |
| 카드 타이틀 | `Disney Zootopia` |
| 태그 | `#주디 #닉 / #활기넘치는 #용기와우정` |

#### Theme Selector (테마 04 버튼 추가)

- buttons 방식: `<button data-theme="04">Disney Zootopia</button>`
- dropdown 방식: `<li value="04">Disney Zootopia</li>`

---

### `assets/css/pdp/disney/playful-disney.scss`

- 테마 04(`[data-theme="04"]`) 배경 이미지 분기 추가
  - PC: `disneyth04_disc_bg.png`
  - MO: `disneyth04_disc_bg_mo.png`

### `assets/css/pdp/disney/theme-selectors-disney.scss`

- 테마 04 버튼/드롭다운 활성 색상 추가

### `assets/css/pdp/disney/themes-disney.scss`

- 테마 카드 4개 대응 그리드 레이아웃 수정

---

### 이미지 리소스 (`assets/images/kia/pdp/disney/`)

- 테마 04 신규 이미지 추가 (`disneyth04_*`)
- 기존 테마 01~03 이미지 일부 교체 (디자이너 QA 반영)
  - `disneyth01~03_detail_0X(_mo).png`, `disneyth01~03_disc0X.png`, `disneyth01~03_hero(_mo).png`, `disneyth01~03_reasons_01(_mo).png`

---

### 비디오 리소스 (`assets/videos/pdp/disney/`)

- 테마 04 전용 폴더 `th04/` 신규 추가
  - `welcome_cluster.mp4`, `welcome_avnt.mp4`
  - `goodbye_cluster.mp4`, `goodbye_avnt.mp4`
