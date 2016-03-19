var gulp = require('gulp');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var cssbeautify = require('gulp-cssbeautify');

gulp.task('scss', function() {
	gulp.src('css/scss/**/*.scss')
		.pipe(changed('css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(cssbeautify())
		.pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
	gulp.watch('css/scss/**/*.scss', ['scss'])
});

gulp.task('default', ['scss']);
