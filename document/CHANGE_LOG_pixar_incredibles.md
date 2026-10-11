# Pixar — 옵션 03 인크레더블 추가

## 변경 파일

```bash
product/pdp_display_theme_pixar.html          # [수정]
assets/css/pdp/pixar/*.scss                   # [수정] key_visual, themes, theme-selectors, playful
assets/images/kia/pdp/pixar/
  ├── pixarth03_*, productthumb_pixarth03.png,
  │   sec02_cardthumb_03(_mo).png             # [추가]
  ├── pixarth0{0,1,2}_*                       # [교체] 한글 UI 이미지
  └── ic_check.svg, ic_progress_bar.png       # [삭제] 미사용
assets/videos/pdp/pixar/th03/                 # [추가]
```

## 변경 사항

- 옵션 03 인크레더블 추가 (`data-theme-list` 에 `"03"` 추가)
- 페이지 전체 국문화 (하단 info · 업그레이드 가이드 · 유의사항 포함)
- 홈카드 설명: 옵션별 `<p data-theme>` → 공통 `<p>` 1개
- `STAY TUNED` → `곧 만나요!`, 모바일은 가로 바 대신 2×2 그리드 한 칸 (모바일 `<source>` 제거)
- th03 비디오는 기존 규칙대로 `welcome_avnt.mp4` / `goodbye_avnt.mp4` 로 리네임
