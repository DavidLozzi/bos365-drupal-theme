var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var runSequence = require('run-sequence');
var minimist = require('minimist');
var ftp = require('vinyl-ftp');

var options = minimist(process.argv.slice(2), {
    string: ['config'],
    boolean: ['minify', 'deploy', 'watch'],
    default: {
      config: 'bos365',
      minify: false,
      deploy: false,
      watch: false
    }
  });

var config = require('./bos365/config/' + options.config + '.config.js');
var conn = ftp.create(config.FTP_CONNECTION);

gulp.task('default', function() {
    if(options.deploy){
        runSequence('css','cssFtp','templatesFtp','modulesFtp');
    }else if(options.watch){
        runSequence('css','cssFtp','templatesFtp','modulesFtp','watchers');
    }else{
        runSequence('css');
    }
});

gulp.task('css', compileCss);
gulp.task('watchers', watchers);
gulp.task('cssFtp', ftpCss);
gulp.task('templatesWatch', watchers);
gulp.task('templatesFtp', ftpTemplates);
gulp.task('modulesFtp', ftpModules);

function compileCss(){
    return gulp.src('bos365/scss/style.scss')
        .pipe(sass()
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            })))
        .pipe(gulp.dest('./bos365/css'));
}

function ftpCss(){
    var globs = ['bos365/css/style.css'];
    return gulp.src(globs, { base: '.', buffer: false})
    .pipe(conn.dest(config.FTP_PATH));
}

function watchers(){
    gulp.watch('./bos365/templates/**/*', ['templatesFtp']);
    gulp.watch('./bos365/scss/**/*.scss', ['css','cssFtp']);
    gulp.watch('./modules/**/*', ['modulesFtp']);
}

function ftpTemplates(){
    var globs = ['bos365/templates/**/*'];
    return gulp.src(globs, { base: '.', buffer: false})
    .pipe(conn.dest(config.FTP_PATH));
}

function ftpModules(){
    var globs = ['modules/**/*'];
    return gulp.src(globs, { base: '.', buffer: false})
    .pipe(conn.dest('/'));
}