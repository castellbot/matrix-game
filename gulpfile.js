var path = require('path'),
	gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	less = require('gulp-less');

var staticFiles = [
	'./public/**/*.js',
	'./public/**/*.css',
	'./public/views/**/*.html',
	'./public/views/**/*.hbs',
];

var hbsFiles = [
	'./views/**/*.hbs'
];

var lessFiles = [
	'./public/**/*.less'
];

gulp.task('less', function() {
	gulp.src(lessFiles)
		.pipe(less())
		.pipe(gulp.dest('./public/stylesheets'))
		.pipe(livereload());
});

gulp.task('livereload', function() {
	gulp.src(hbsFiles)
		.pipe(livereload());
});

gulp.task('default', function() {
	livereload.listen({start: true});
	gulp.watch(lessFiles, ['less']);
	gulp.watch(hbsFiles, ['livereload']);
});
