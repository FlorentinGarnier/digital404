'use strict';

// Configuration

const path = {
    sass: './src/scss/**',
    images: './src/images/**',
    javascript: './src/javascript/**',
    dest: './web/assets'
};


// Requires

const gulp = require('gulp');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const uglify = require('gulp-uglify');
const pump = require('pump');
const imagemin = require('gulp-imagemin');

gulp.task('imagemin', () =>
    gulp.src(path.images + '/*')
        .pipe(imagemin())
        .pipe(gulp.dest(path.dest + '/images'))
);

gulp.task('compress', function(){
    gulp.task('compress', function (cb) {
        pump([
                gulp.src(path.javascript + '/*.js'),
                uglify(),
                gulp.dest(path.dest + '/js')
            ],
            cb
        );
    });
});

gulp.task('sass', function () {
    return gulp.src(path.sass + '/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.dest + '/css'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(path.sass + '/*.scss', ['sass']);
    gulp.watch(path.javascript + '/*.js', ['compress']);
    gulp.watch(path.images + '/', ['imagemin'])
    gulp.watch(['./web/**/*.html'], function(files){
        livereload.changed(files);
    })
});


gulp.task('build', ['imagemin', 'compress', "sass"]);

gulp.task('default', ['build']);