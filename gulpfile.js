var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    browserSync = require('browser-sync').create(),
    liveReload = browserSync.reload;

var config = {
    outPath: 'public',
    appPath: 'app',
    htmlSrc: 'index.html'
};

gulp.task('default', ['start-liveReload-server', 'build-files']);

gulp.task('build-files', ['html', 'css']);

gulp.task('start-liveReload-server', function () {
    browserSync.init({
        server: config.outPath
    });

    gulp.watch('*.html', ['html']);
});


gulp.task('html', function () {
    gulp.src(config.htmlSrc)
        .pipe(rename('index.html'))
        .pipe(minifyHTML())
        .pipe(gulp.dest(config.outPath))
        .pipe(liveReload({stream: true}));
});

gulp.task('css', function () {
    gulp.src(config.appPath + '/css/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest(config.outPath))
        .pipe(liveReload({stream: true}));
});