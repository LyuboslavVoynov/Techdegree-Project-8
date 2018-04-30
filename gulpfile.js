'use strict';


const gulp = require("gulp"); //gulp
const concat = require("gulp-concat");//concat files
const uglify = require("gulp-uglify");//minify the files
const rename = require("gulp-rename");//rename files
const sass = require("gulp-sass");//compile sass to css
const cleanCss = require("gulp-clean-css");//minify css
const maps = require("gulp-sourcemaps");//create sourcemaps for css and js
const imageMin = require("gulp-imagemin");//optimize images
const del  = require("del");//delete files/folders


//scripts
gulp.task('scripts', function(){
    return gulp.src(['js/**/*.js'])//grab source files
    .pipe(maps.init())//start map
    .pipe(concat('all.js'))  //concat all files into one file
    .pipe(uglify())//minify the file
    .pipe(rename('all.min.js'))//rename to correct name
    .pipe(maps.write('./'))//write the map
    .pipe(gulp.dest('dist/scripts'));//place into the correct location
});

//styles
gulp.task('styles', function(){
    return gulp.src('sass/global.scss')//grab the correct file
    .pipe(maps.init())  //start map
    .pipe(sass())//compile to css
    .pipe(cleanCss())  //minify the file
    .pipe(rename('all.min.css'))//rename to correct name
    .pipe(maps.write('./'))  //write the map
    .pipe(gulp.dest('dist/styles'));//place into the correct location
});

//images task
gulp.task('images',function(){
    return gulp.src('images/*')    //get all image files
    .pipe(imageMin())//optimize them
    .pipe(gulp.dest('dist/content'));//place them into the correct location
});


//watch task
gulp.task('watch', function(){
    gulp.watch(['sass/**/*.scss'], ['styles']);
    gulp.watch('js/**/*.js', ['scripts']);
  });

//delete the dist folder with all old files
gulp.task('clean', function(){
    del('dist');
});

// runs all the tasks
gulp.task('build', ['scripts', 'styles', 'images','watch']);

//default task runs gulp clean first and then gulp build
gulp.task('default', ['clean'], function(){
  gulp.start('build');
});
