var gulp = require('gulp');
var ts = require('gulp-typescript');
var JSON_FILES = ['src/*.json', 'src/**/*.json','package.json'];

// pull in the project TypeScript config
var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', function (){
    var tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('public', function () {
    return gulp.src('./public/**')
        .pipe(gulp.dest('./dist/public'));
});

gulp.task('json', function () {
    return gulp.src(JSON_FILES)
        .pipe(gulp.dest('dist'));
});

gulp.task('watch-ts', ['scripts'], function (){
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('watch-json', ['scripts'], function (){
    gulp.watch('src/**/*.json', ['json']);
});

gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('default', ['watch-ts','watch-json','json', 'public']);

gulp.task('build',['scripts','json']);