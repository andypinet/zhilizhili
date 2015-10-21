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

elixir(function(mix) {
    mix.sass('app.scss');
});


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

gulp.task('watch', function(){
	gulp.watch(paths.srcRoot + 'assets/js/**/*.js', ['build-umd']);
});
