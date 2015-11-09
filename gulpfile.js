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

var gulp = require('gulp-param')(require('gulp'), process.argv);
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

gulp.task('build-controller', function(){
	zTask.require('build-umd')({
		src: paths.srcRoot + 'assets/controller/**/*.js',
		dest: paths.destRoot + 'controller'
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

var exec = require('child_process').exec;

gulp.task("typescript-umd", function(name){
	var cwd = `browserify src/controller/${name}.ts -p [ tsify] > dist/controller/${name}.js`;

	exec(cwd, function(err, stdout, stderr){
	});
});

gulp.task('build-mobile', function(src, dest){
	zTask.require('build-umd')({
		src: src,
		dest: dest
	});
});

var debounce = require('debounce');

var umddeb = debounce(function(){
	var src = paths.srcRoot + 'assets/mobile/controller/article/*.js';
	var dest = paths.destRoot + 'mobile/controller/article';

	exec("gulp build-mobile -d --src " + src + " --dest " + dest, function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
	});
}, 10000);

gulp.task("watch-umd", function(){
	//setInterval(function(){
	//    exec("gulp build-umd", function(err, stdout, stderr){
	//        console.log(stdout);
	//        console.log(stderr);
	//    });
	//}, 10000);
	gulp.watch(paths.srcRoot + 'assets/mobile/controller/**/*.js', umddeb)
});

gulp.task("build:d.ts", function() {
	exec("tsc -d src/framework/utils.ts --module commonjs", function(){
		gulp.src("src/framework/utils.d.ts")
				.pipe(gulp.dest("typings/framework"));
	});
});

gulp.task("build:framework", function(){
	gulp.src("resources/assets/framework/*.js")
			.pipe(gulp.dest("public/framework"));

	gulp.src("resources/assets/framework/*.js.map")
			.pipe(gulp.dest("public/framework"));
});


gulp.task('build-mobilesass', function () {
	zTask.require('build-sass')({
		src: paths.srcRoot + 'assets/mobile/sass/**/*.scss',
		dest: paths.destRoot + 'mobile/css'
	});
});

gulp.task('watch-mobilesass', function() {
	gulp.watch(paths.srcRoot + 'assets/mobile/sass/**/*.scss', ["build-mobilesass"]);
});