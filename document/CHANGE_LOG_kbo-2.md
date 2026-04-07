# Kia Connect Store Display Themes Publishing — KBO 테마

디스플레이 KBO 테마 제품 상세 페이지(PDP) 퍼블리싱 산출물입니다.

---

## 주요 변경 내용 요약

### 1. 전달받은 header tag, css, js 반영

### 2. [값 수정] `common.scss` > `.infoSticky` > `margin-top`
- 화면 크기에 따라 `headerInner`, `mobileOpenMenu` 크기 대응
  ```
  .infoSticky {
    ...
    margin-top: calc(5.6rem + 5rem);
    ...
  
    @media (min-width: 1121px) {
      margin-top: 8rem;
    }
    ...
  }
  ```

### 3. [값 수정] `/pdp/section/theme-selectos.scss` > `.theme-selector-wrapper` > `top`
- 화면 크기에 따라 `headerInner` 크기 대응
  ```
  .theme-selector-wrapper {
    ...
    
    top: 5.6rem;
    
    ...
    
    // PC Header height 대응
    @media (min-width: 1121px) {
      top: 8rem;
    }
  }
  ```