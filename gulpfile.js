const gulp = require('gulp');
const lambda = require('gulp-awslambda');
const zip = require('gulp-zip');

gulp.task(
    'default', function () {
        gulp.src('src/*')
            .pipe(zip('build.zip'))
            .pipe(lambda('noergel', { 'region': 'eu-west-1' }))
            .pipe(gulp.dest('dist'))
    }
);