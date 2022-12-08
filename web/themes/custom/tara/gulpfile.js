'use strict';

// The streaming build system.
var gulp = require('gulp');

// Gulp plugin for sass.
var sass = require('gulp-sass');

// // Source map support for Gulp.js.
var sourcemaps = require('gulp-sourcemaps');

// Prefix CSS.
var autoprefixer = require('gulp-autoprefixer');

// Prevent pipe breaking caused by errors from gulp plugins.
var plumber = require('gulp-plumber');

// // Rename files
// var rename = require("gulp-rename");

// Allows you to use glob syntax in imports (i.e. @import "dir/*.sass"). Use as a custom importer for node-sass.
var importer = require('node-sass-globbing');

// Default settings.
var src = {
  scss: './scss/**/*.*',
  css: './css'
};

// Define list of vendors.
var _vendors = [];

// For developers. Contain better outputStyle for reading.
gulp.task('styles-dev', function () {
  return gulp.src(src.scss)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      importer: importer,
      includePaths: _vendors,
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(src.css))
});

// Minified css styles.
gulp.task('styles-prod', function () {
  return gulp.src(src.scss)
    .pipe(plumber())
    .pipe(sass({
      importer: importer,
      includePaths: _vendors,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(src.css));
});

// Dev task.
gulp.task('dev', gulp.series(['styles-dev']));

// Watch task.
gulp.task('watch', function () {
  return gulp.watch(src.scss, gulp.series(['styles-dev']));
});

// Default task.
gulp.task('default', gulp.series(['styles-dev', 'watch']), function () {
});
