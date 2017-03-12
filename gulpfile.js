const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task(
    'default', function () {
        gulp.src('src/*')
            .pipe(zip('build.zip'))
            .pipe(gulp.dest('dist'))
    }
);