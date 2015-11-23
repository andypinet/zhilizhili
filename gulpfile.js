var gulp = require('gulp-param')(require('gulp'), process.argv);
var zTask = require("require-dir")("../zhilizhili-gulp-task/build").index;

var debug = false;

var paths = {
	srcRoot: 'resources/',
	destRoot: 'public/'
};

var buildPaths = {
	root: 'build',
	template: 'build/template/'
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
	exec("tsc -d resources/assets/framework/utils.ts --module commonjs", function(){
		gulp.src("resources/assets/framework/utils.d.ts")
				.pipe(gulp.dest("public/typings/framework"));
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


gulp.task('build-pcsass', function () {
	zTask.require('build-sass')({
		src: paths.srcRoot + 'assets/pc/sass/**/*.scss',
		dest: paths.destRoot + 'assets/pc/css'
	});
});

gulp.task('watch-pcsass', function() {
	gulp.watch(paths.srcRoot + 'assets/pc/sass/**/*.scss', ["build-pcsass"]);
});


gulp.task('build-pc', function(src, dest){
	zTask.require('build-umd')({
		src: src,
		dest: dest
	});
});

var pcumddeb = debounce(function(){
	var src = paths.srcRoot + 'assets/pc/controller/article/*.js';
	var dest = paths.destRoot + 'pc/controller/article';

	exec("gulp build-pc -d --src " + src + " --dest " + dest, function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
	});
}, 10000);

gulp.task("watch-pc", function(){
	gulp.watch(paths.srcRoot + 'assets/pc/controller/**/*.js', pcumddeb)
});

var uglify = require('gulp-uglify');

gulp.task('build-es', function(src, dest) {
	if (debug) {
		return gulp.src(src)
			.pipe(es5)
			.pipe(gulp.dest(dest))
	} else {
		return gulp.src(src)
			.pipe(es5)
			.pipe(uglify())
			.pipe(gulp.dest(dest))
	}
});

const babel = require('gulp-babel');
const browserify = require("gulp-browserify");
const babelify = require("babelify");

var es5 = browserify({
	transform: function(filename, opts){
		return babelify(filename, {
			presets: ['es2015'],
			plugins: ['transform-regenerator']
		});
	}
});

var zst = function(name, destpath) {
	"use strict";
	return debounce(function(){
		var src = paths.srcRoot + `${destpath}/${name}.js`;
		var dest = paths.destRoot + `${destpath}`;

		exec("gulp build-es -d --src " + src + " --dest " + dest, function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
		});
	}, 0)
};

gulp.task("watch-es5", function(name, dest){
	dest = dest || '';
	gulp.watch(paths.srcRoot + `${dest}/${name}.js`, zst(name, dest))
});

var rename = require("gulp-rename");

gulp.task('build:element', function(name, path){
	var destpath = paths.srcRoot + path + name;

	gulp.src(buildPaths.template + "_element.scss")
			.pipe(rename(name + ".scss"))
			.pipe(gulp.dest(`${destpath}`));

	gulp.src(buildPaths.template + "_element.html")
			.pipe(rename(name + ".html"))
			.pipe(gulp.dest(`${destpath}`));

	gulp.src(buildPaths.template + "_element.ts")
			.pipe(rename(name + ".ts"))
			.pipe(gulp.dest(`${destpath}`));
});

gulp.task("deploy:element", function(name, path) {
	var src = paths.srcRoot + path + name + '/';
	var dest = paths.destRoot + path + name + '/';
	
	gulp.src(`${src}${name}.js`)
		.pipe(es5)
		.pipe(uglify())
		.pipe(gulp.dest(`${dest}`));

	gulp.src(`${src}${name}.html`)
			.pipe(gulp.dest(`${dest}`));

	zTask.require('build-sass')({
		src: `${src}${name}.scss`,
		dest: `${dest}`
	});
});

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function(){
	return gulp.src('resources/assets/pc/img/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('public/assets/pc/img'));
});