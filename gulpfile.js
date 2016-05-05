var dirdist = 'dist',
	dirbuild = 'build';

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
	watch = require('gulp-watch');

//clean
gulp.task('clean', function(){
	return gulp.src('./build', {read: false})
	.pipe(clean());
});

// gulp.task('less', function(){
// 	gulp.src('less/*.less')
// 		.pipe(less())
// 		.pipe(gulp.dest('css'))
// 		.pipe()
// });

//sass
gulp.task('sass', function(){
	return gulp.src('./' + dirdist +'/**/*.scss')
				.pipe(sass().on('error', sass.logError))
				.pipe(gulp.dest('./' + dirbuild));
});

gulp.task('sass:watch', function(){
	return gulp.watch('./' + dirdist +'/**/*.scss', ['sass']);
});

//severs
gulp.task('connect', function(){
	connect.server({
		root: 'build',
		port: 5555,
		livereload: true
	});
});

gulp.task('html', function () {
	return gulp.src('./' + dirdist + '/*.html')
    			.pipe(connect.reload());
});
 
gulp.task('watch', function () {
	return gulp.watch(['./' + dirdist + '/*.html'], ['html']);
});
 
//gulp.task('default', ['connect', 'watch', 'sass:watch']);

gulp.task('default', function(cb) {
	runsequence(['clean'], 'connect', 'sass', ['watch', 'sass:watch'], cb);
});
