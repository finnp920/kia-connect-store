# Kia Connect Store Display Themes Publishing — Disney 테마 (옵션 05 추가)

디스플레이 Disney 테마 제품 상세 페이지(PDP)에 **옵션 05 위니더푸**를 추가한 산출물입니다.
기존 4개 옵션 산출물은 `CHANGE_LOG_disney.md` 를 참고하세요.

---

## 변경 파일 목록

```bash
root
├── product/
│   └── pdp_display_theme_disney.html              # [수정] 옵션 05 추가
│
└── assets/
    ├── css/
    │   └── pdp/disney/
    │       ├── themes-disney.scss                  # [수정] 카드 그리드 5개 기준 재구성
    │       ├── key_visual-disney.scss              # [수정] 옵션 05 대응
    │       ├── playful-disney.scss                 # [수정] 옵션 05 대응
    │       └── theme-selectors-disney.scss         # [수정] 옵션 05 버튼 대응
    │
    ├── images/
    │   └── kia/pdp/disney/
    │       ├── disneyth05_*                        # [추가] 옵션 05 이미지 일체
    │       ├── disneyth00_reasons_02.png           # [교체] 옵션 5개 반영 (PC/모바일)
    │       └── sec02_img_staytuned_mo.png          # [삭제] 아래 2 참고
    │
    └── videos/
        └── pdp/disney/th05/                        # [추가] 옵션 05 전용 폴더
```

공통 자산(`assets/css/pdp/index.css`, `section/**`, `assets/js/**`)은 **변경 없음**.

---

## 특이사항

### 1. `themes-cards-grid` 레이아웃 재구성

옵션이 5개가 되면서 카드 배치가 바뀌었습니다. **마크업 순서는 그대로**이고 `themes-disney.scss` 만 수정했습니다.
모바일에서 pick 카드("곧 만나요!")가 **가로 바에서 일반 카드와 같은 1칸으로** 바뀐 점만 확인하시면 됩니다.

### 2. pick 카드 이미지 단일화 → `sec02_img_staytuned_mo.png` **삭제**

pick 카드 이미지가 PC·모바일 동일해져 `<picture>` 내 `<source>` 를 제거하고
`sec02_img_staytuned.png` 하나만 사용합니다. 이에 따라 모바일용 파일은 참조처가 없어져 삭제했습니다.
(Disney 외 테마에서 이 파일을 참조하는 곳은 없습니다.)

### 3. Playful · N Reasons 문구를 **옵션별로 분리**

기존에는 5개 옵션이 문구 하나를 공유했으나, 옵션별 문구로 분리했습니다.

| 위치 | 이전 | 변경 |
|---|---|---|
| `.playful-title` | `<h2>` 1개 | `<h2 data-theme="01~05">` **5개** |
| Playful 5개 항목 설명 | 항목당 `<p>` 1개 | 항목당 `<p data-theme="01~05">` **5개** |
| N Reasons 첫 번째 설명 | `<p class="reason-n-description">` 1개 | `data-theme="01~05"` **5개** |

- **HTML 만 수정했고 CSS·JS 변경은 없습니다.** 표시 전환은 공통 `assets/css/pdp/index.css` 의
  `[data-current-theme] :not(…) > [data-theme]` 규칙이 그대로 처리합니다.
- Playful `cluster` 의 `<p class="warning">` 와 N Reasons 2·3번째 설명은 **공통 유지**(분리 대상 아님).

### 4. 비디오 네이밍

`assets/videos/pdp/disney/th05/` 에 `welcome/goodbye × cluster/avnt` 4개.
파일명은 전 옵션 동일하며 **폴더명으로 옵션을 구분**합니다.
