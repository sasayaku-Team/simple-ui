var dirdist = 'dist'
;
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

// gulp.task('clean', function() {
// 	return gulp.src('./' + dirbuild, {
// 		read: false
// 	})
// 	.pipe(clean());
// );

// gulp.task('default', ['clean'], function() {
// 	gulp.start(function() {
// 	});
// });

// gulp.task('less', function(){
// 	gulp.src('less/*.less')
// 		.pipe(less())
// 		.pipe(gulp.dest('css'))
// 		.pipe()
// });

//severs
gulp.task('connect', function(){
	connect.server({
		root: 'dist',
		port: 5555,
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('./' + dirdist + '/*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
	gulp.watch(['./' + dirdist + '/*.html'], ['html']);
});
 
gulp.task('default', ['connect', 'watch']);
