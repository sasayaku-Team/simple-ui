var dirdist    = './dist/', // HTML�?发目�?
    dirbuild     = './build/', // HTML预览目录
    excludedir   = '!./dist/component/**/*.*',
    watchbuild   = dirbuild + '**/*.*',
    dirhtml      = dirdist + '**/*.html',
    dirimg       = [dirdist + '**/*.png', dirdist + '**/*.gif', dirdist + '**/*.jpg', dirdist + '**/*.svg'],
    dirless      = [dirdist + '**/all.less', excludedir],
    dirless2     = [dirdist + '**/!(all)*.less',excludedir],
    dirsass      = [dirdist + '**/all.scss', excludedir],
    dirsass2     = [dirdist + '**/!(all)*.scss',excludedir],
    dirjs        = [dirdist + '**/*.js',excludedir],
    dircomponent = dirdist + 'component/**/*.*';
    //dirmin       = 'ttd',
    //version      = '6.15';

var gulp         = require('gulp'),
    less         = require('gulp-less'),
    sass		 = require('gulp-sass'),
    path         = require('path'),
    clean        = require('gulp-clean'),
    connect      = require('gulp-connect'),
    sourcemaps   = require('gulp-sourcemaps'),
    minifyCSS    = require('gulp-minify-css'),
    uncss        = require('gulp-uncss'),
    watch        = require('gulp-watch'),
    runSequence  = require('gulp-run-sequence');

var reloadAllSass =  function(){

        gulp.run('sass');
        //gulp.run('livereload');

        console.log('replace all-sass ok!');
};

var replaceAllSass =  function(replacePath){

        console.log(replacePath);

        gulp.task('replace-all-sass', function(){

            if(process.platform == "win32"){
                var toBuildPath = replacePath.replace(/\\/g, '/')
                                             .replace(/dist/g, 'build')
                                             .replace(/\/[^(\/)]*.scss$/g, '');


                
            }else if(process.platform == "darwin"){
                var toBuildPath = replacePath.replace(/dist/g, 'build')
                                             .replace(/\/[^(\/)]*.scss$/g, '')
            }

            console.log(toBuildPath);

            return gulp.src(replacePath)
                   .pipe(sourcemaps.init())
                   .pipe(sass().on('error', sass.logError))
                   .pipe(sourcemaps.write(''))
                   .pipe(gulp.dest(toBuildPath))
                   .pipe(connect.reload());
		});

        gulp.run('replace-all-sass');

        console.log('replace all-sass ok!');
};

var replaceSass =  function(replacePath){

        console.log(replacePath);

        gulp.task('replace-sass', function(){

            if(process.platform == "win32"){
                var todistPath  = replacePath.replace(/\\/g, '/')
                                             .replace(/sass\/[^(\/)]*.scss$/g, 'all.scss'),
                    toBuildPath = replacePath.replace(/\\/g, '/')
                                             .replace(/dist/g, 'build')
                                             .replace(/sass\/[^(\/)]*.scss$/g, '');


                
            }else if(process.platform == "darwin"){
                var todistPath  = replacePath.replace(/sass\/[^(\/)]*.scss$/g, 'all.scss'),
                    toBuildPath = replacePath.replace(/dist/g, 'build')
                                             .replace(/sass\/[^(\/)]*.scss$/g, '');
            }

            console.log(todistPath);
            console.log(toBuildPath);

            return gulp.src(todistPath)
                   .pipe(sourcemaps.init())
                   .pipe(sass().on('error', sass.logError))
                   .pipe(sourcemaps.write(''))
                   .pipe(gulp.dest(toBuildPath))
                   .pipe(connect.reload());
                   
        });

        gulp.run('replace-sass');

        console.log('replace sass ok!');
};

var reloadAllLess =  function(){

        gulp.run('less');
        //gulp.run('livereload');

        console.log('replace all-sass ok!');
};

var replaceAllLess =  function(replacePath){

        console.log(replacePath);

        gulp.task('replace-all-less', function(){

            if(process.platform == "win32"){
                var toBuildPath = replacePath.replace(/\\/g, '/')
                                             .replace(/dist/g, 'build')
                                             .replace(/\/[^(\/)]*.less$/g, '');


                
            }else if(process.platform == "darwin"){
                var toBuildPath = replacePath.replace(/dist/g, 'build')
                                             .replace(/\/[^(\/)]*.less$/g, '')
            }

            console.log(toBuildPath);

            return gulp.src(replacePath)
                   .pipe(sourcemaps.init())
                   .pipe(less({
                            paths: [ path.join(__dirname, 'less', 'includes') ]
                        }))
                   .pipe(sourcemaps.write(''))
                   .pipe(gulp.dest(toBuildPath))
                   .pipe(connect.reload());
                   
        });

        gulp.run('replace-all-less');

        console.log('replace all-less ok!');
};

var replaceLess =  function(replacePath){

        console.log(replacePath);

        gulp.task('replace-less', function(){

            if(process.platform == "win32"){
                var todistPath  = replacePath.replace(/\\/g, '/')
                                             .replace(/less\/[^(\/)]*.less$/g, 'all.less'),
                    toBuildPath = replacePath.replace(/\\/g, '/')
                                             .replace(/dist/g, 'build')
                                             .replace(/less\/[^(\/)]*.less$/g, '');


                
            }else if(process.platform == "darwin"){
                var todistPath  = replacePath.replace(/less\/[^(\/)]*.less$/g, 'all.less'),
                    toBuildPath = replacePath.replace(/dist/g, 'build')
                                             .replace(/less\/[^(\/)]*.less$/g, '');
            }

            console.log(todistPath);
            console.log(toBuildPath);

            return gulp.src(todistPath)
                   .pipe(sourcemaps.init())
                   .pipe(less({
                            paths: [ path.join(__dirname, 'less', 'includes') ]
                        }))
                   .pipe(sourcemaps.write(''))
                   .pipe(gulp.dest(toBuildPath))
                   .pipe(connect.reload());
                   
        });

        gulp.run('replace-less');

        console.log('replace less ok!');
};

var replaceHtml = function(replacePath){

        console.log(replacePath);

        gulp.task('replace-html', function () {


            if(process.platform == "win32"){
                var toBuildPath = replacePath.replace(/\\/g, '/')
                                             .replace(/dist/g, 'build')
                                             .replace(/\/[^(\/)]*.html$/g, '');


                
            }else if(process.platform == "darwin"){
                var toBuildPath = replacePath.replace(/dist/g, 'build')
                                             .replace(/\/[^(\/)]*.html$/g, '')
            }


            console.log(toBuildPath);

            return gulp.src(replacePath)
                       .pipe(gulp.dest(toBuildPath))
                       .pipe(connect.reload());
        });
    
        gulp.run('replace-html');

        console.log('replace html ok!');
};

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

//less
gulp.task('less', function(){
    return gulp.src(dirless)
               .pipe(sourcemaps.init())
               .pipe(less({
                        paths: [ path.join(__dirname, 'less', 'includes') ]
                    }))
               .pipe(sourcemaps.write(''))
               .pipe(gulp.dest(dirbuild));
});

//sass
gulp.task('sass', function(){
	return gulp.src(dirsass)
				.pipe(sourcemaps.init())	
				.pipe(sass().on('error', sass.logError))
				.pipe(sourcemaps.write(''))
				.pipe(gulp.dest(dirbuild));
});

//html
gulp.task('html', function () {
    return gulp.src(dirhtml)
               .pipe(gulp.dest(dirbuild));
});

//img
gulp.task('img', function () {
    return gulp.src(dirimg)
               .pipe(gulp.dest(dirbuild));
});

//watch
gulp.task('watch', function(){
    gulp.watch(dirless, function(file){
        //console.log(file.path);
        //connect.server.changed(file.path);
        replaceAllLess(file.path);
    });
    gulp.watch(dirless2, function(file){
        //console.log(file.path);
        //connect.server.changed(file.path);
        replaceLess(file.path);
    });
    gulp.watch(dirsass, function(file){
        //console.log(file.path);
        //connect.server.changed(file.path);
        replaceAllSass(file.path);
    });
    gulp.watch(dirsass2, function(file){
        //console.log(file.path);
        //connect.server.changed(file.path);
        replaceSass(file.path);
    });
    gulp.watch(dirhtml, function(file){
        //console.log(file.path);
        //connect.server.changed(file.path);
        replaceHtml(file.path);
    });
    gulp.watch(dircomponent, function(file){
        //console.log(file.path);
        reloadAllLess();
    })
    gulp.watch(dircomponent, function(file){
        //console.log(file.path);
        reloadAllSass();
    })
});

//livereload
gulp.task('livereload', function(){
    gulp.src(watchbuild)
        .pipe(watch(watchbuild))
        .pipe(connect.reload());
});

//default
gulp.task('default', function(){
    gulp.run('run');
});

gulp.task('run', function(cb) {
    runSequence('clean','connect',['html','img','less','sass'],['livereload','watch'], cb);
});






