var gulp = require("gulp");
var ts = require("gulp-typescript");
var clean = require("gulp-clean");
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject("tsconfig.json");
const JSON_FILES = ['src/*.json', 'src/**/*.json', 'package.json', 'src/**/*.tpl', 'src/**/*.css'];

gulp.task("scripts", function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(tsProject());

    console.log("Build script success!!");

    return tsResult.js
        .pipe(sourcemaps.write("./")) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest("dist"));
});

gulp.task('public', function () {
    return gulp.src('./public/**')
        .pipe(gulp.dest('./dist/public'));
});

gulp.task('views', function() {
    return gulp.src('./src/views/**')
        .pipe(gulp.dest('./dist/views/'));
});

gulp.task('json', function() {
    return gulp.src(JSON_FILES)
        .pipe(gulp.dest('dist'));
});

gulp.task('watch-ts', ['scripts'], function (){
    gulp.watch(['src/**/*.ts'], ['scripts']);
});
gulp.task('watch-json', ['scripts'], function () {
    gulp.watch(['src/**/*.json'], ['json']);
});
gulp.task('watch-views', ['scripts'], function () {
    gulp.watch(['src/views/*'], ['views']);
});
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});
gulp.task('default', ['watch-ts', 'watch-json', 'watch-views','public', 'views', 'json', 'scripts']);
gulp.task('build', ['public', 'views', 'json', 'scripts']);
