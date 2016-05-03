var gulp = require('gulp'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	minifycss = require('gulp-minify-css'),
	uncss = require('gulp-uncss'),
	replace = require('gulp-replace'),
	runsequence = require('gulp-run-sequence'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch')
;

gulp.task('clean', function() {
  return gulp.src('./' + dirbuild, {
    read: false
  })
  .pipe(clean());
);

gulp.task('default', ['clean'], function() {
  gulp.start(function() {
  });
});