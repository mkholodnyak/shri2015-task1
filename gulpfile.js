var gulp = require('gulp'),
    path = require('path'),
    $ = require('gulp-load-plugins')({
        //config: path.join(__dirname, 'package.json'),
        //lazy: false
    }),
    browserSync = require('browser-sync').create(),
    liveReload = browserSync.reload;

var config = {
    outPath: 'public/',
    appPath: 'app/',
    htmlSrc: 'index.html'
};

gulp.task('default', ['start-livereload-server', 'build-files']);

gulp.task('build-files', ['html', 'css', 'image']);

gulp.task('start-livereload-server', function () {
    browserSync.init({
        server: config.outPath
    });

    gulp.watch('*.html', ['html']);
    gulp.watch(config.appPath + '/css/**/*.scss', ['css']);
});


gulp.task('html', function () {
    gulp.src('*.html')
        .pipe($.rename('index.html'))
        .pipe($.minifyHtml())
        .pipe(gulp.dest(config.outPath))
        .pipe(liveReload({stream: true}));
});

gulp.task('css', function () {
    gulp.src(config.appPath + '/css/**/*.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer())
        .pipe($.minifyCss())
        .pipe(gulp.dest(config.outPath + config.appPath + 'css'))
        .pipe(liveReload({stream: true}));
});

gulp.task('image', function () {
    gulp.src(config.appPath + '/images/**/*.{png,svg,jpg,jpeg}')
        .pipe(gulp.dest(config.outPath + config.appPath + 'images'))
        .pipe(liveReload({stream: true}));
});