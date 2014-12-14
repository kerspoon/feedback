'use strict';
/* jshint node:true */

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./client/assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./client/assets/main.css'));
});

gulp.task('default', ['sass'], function() {
  // place code for your default task here
});
