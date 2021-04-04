const
  { watch, parallel, src, dest } = require('gulp'),
  sass = require('gulp-sass');

const compileSass = () =>
src('sass/*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(sass({ outputStyle: 'expanded' }))
  .pipe(dest('css'));

const WatchSass = () =>
watch([
  'sass/*.scss',
  'sass/**/*.scss'
], compileSass);

exports.default = parallel(compileSass, WatchSass);
