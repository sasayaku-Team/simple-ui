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

//severs
gulp.task('connect', function(){
	connect.server({
		root: 'build',
		port: 5555,
		livereload: true
	});
});

//clean
gulp.task('clean', function(){
	return gulp.src('./build', {read: false})
	.pipe(clean());
});

//sass
gulp.task('sass', function(){
	return gulp.src('./' + dirdist +'/**/*.scss')
				.pipe(sourcemaps.init())	
				.pipe(sass().on('error', sass.logError))
				.pipe(sourcemaps.write('./maps'))
				.pipe(gulp.dest('./' + dirbuild))
				.pipe(connect.reload());
});

//html
gulp.task('html', function () {
	return gulp.src('./' + dirdist + '/**/html/*.html')
				.pipe(gulp.dest('./' + dirbuild))
				.pipe(connect.reload());
});

//watch
gulp.task('watch', function(){
	gulp.watch(['./' + dirdist +'/**/*.scss'], ['sass']);
	gulp.watch(['./' + dirdist + '/**/html/*.html'], ['html']);
});

//default
gulp.task('default', function(cb) {
	runsequence(['clean'], 'connect', ['sass','html'], ['watch'], cb);
});
