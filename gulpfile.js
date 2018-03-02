var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var runSequence = require('run-sequence');

gulp.task('default', function() {
    runSequence('css');
});

gulp.task('css', compileCss);

function compileCss(){
    return gulp.src('bos365/scss/style.scss')
        .pipe(sass().on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            })))
        .pipe(gulp.dest('./build/css'))
}