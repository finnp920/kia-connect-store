import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass'; // Sass 컴파일러 로드 방식 변경
import { deleteAsync } from 'del'; // del v7+ 방식 (deleteAsync 사용)
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Gulp 메서드 추출
const { src, dest, watch, series, parallel } = gulp;

// Sass 컴파일러 설정
const sass = gulpSass(dartSass);

// CLI 인수 파싱 (ESM 방식)
const argv = yargs(hideBin(process.argv)).argv;

// --------------------------------------------------------
// [설정] 경로 설정
// --------------------------------------------------------
const paths = {
  scss: {
    src: 'assets/scss/**/*.scss',
    dest: 'assets/css',
  },
  build: {
    dest: 'dist',
  },
};

// --------------------------------------------------------
// 1. SCSS 컴파일 태스크
// --------------------------------------------------------
function styles() {
  return src(paths.scss.src)
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(dest(paths.scss.dest));
}

// --------------------------------------------------------
// 2. Watch 태스크
// --------------------------------------------------------
function watchFiles() {
  watch(paths.scss.src, styles);
}

// --------------------------------------------------------
// 3. 빌드 태스크
// --------------------------------------------------------

// (1) dist 폴더 청소 (ESM에서는 deleteAsync 사용)
function clean() {
  return deleteAsync([paths.build.dest]);
}

// (2) 공통 리소스 복사
function copyCommon() {
  return src(
    [
      'assets/js/**/*',
      'assets/font/**/*',
      'assets/icons/**/*',
      'assets/videos/pdp/product_thumb_sample.mp4',

      'assets/images/**/*', // 1. 일단 images 폴더 아래 모든 것을 포함
      '!assets/images/kia/pdp/**/*', // 2. 그 중에서 pdp 폴더 안의 파일들은 제외
      '!assets/images/kia/pdp', // 3. (선택) pdp 폴더 껍데기 자체도 제외

      'assets/css/**/*',
      '!assets/css/pdp/**/*',
      '!assets/css/pdp',
    ],
    { base: '.', encoding: false }
  ).pipe(dest(paths.build.dest));
}

// (3) 선택된 테마 리소스 복사
function copyThemeResources() {
  const theme = argv.theme;

  if (!theme) {
    console.error(
      '❌ 에러: 테마 이름을 입력해주세요. 예: npm run build -- --theme=fifa'
    );
    return Promise.reject(new Error('Theme name missing'));
  }

  console.log(`✨ [${theme}] 테마 빌드를 시작합니다...`);

  const filesToCopy = [
    `product/pdp_display_theme_${theme}.html`,
    'assets/css/pdp/index.css',
    'assets/css/pdp/go_to_list.css',
    'assets/css/pdp/product-view-override.css',
    'assets/css/pdp/section/**/*',
    `assets/css/pdp/${theme}/**/*`,
    `assets/images/kia/pdp/img_disc_video.png`,
    `assets/images/kia/pdp/${theme}/**/*`,
    `assets/videos/pdp/${theme}/**/*`,
  ];

  return src(filesToCopy, { base: '.', encoding: false }).pipe(
    dest(paths.build.dest)
  );
}

// --------------------------------------------------------
// 실행 가능한 커맨드 정의 (ESM Export)
// --------------------------------------------------------
export { styles };
export const dev = series(styles, watchFiles);
export const build = series(
  styles,
  clean,
  parallel(copyCommon, copyThemeResources)
);

// 기본(default) 태스크 설정 (선택 사항)
export default dev;
