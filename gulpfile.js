var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

var gulp = require('gulp');
var zTask = require("require-dir")("../zhilizhili-gulp-task/build").index;

var paths = {
	srcRoot: 'resources/',
	destRoot: 'public/'
};

gulp.task('build-umd', function(){
	zTask.require('build-umd')({
		src: paths.srcRoot + 'assets/js/**/*.js',
		dest: paths.destRoot + 'js'
	});
});


zTask.scope(gulp);

gulp.task('build-sass', function () {
	zTask.require('build-sass')({
		src: paths.srcRoot + 'assets/sass/**/*.scss',
		dest: paths.destRoot + 'css'
	});
});

gulp.task('watch', function(){
	//gulp.watch(paths.srcRoot + 'assets/js/**/*.js', ['build-umd']);
	gulp.watch(paths.srcRoot + 'assets/sass/**/*.scss', ['build-sass']);
});
