var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass({ style: 'expanded' }))
/*    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))*/
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['styles']);
});

gulp.task('default', ['watch'], function() {

});