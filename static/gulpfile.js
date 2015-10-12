//var gulp = require('gulp'),
//    lr = require('tiny-lr'),
//    server = lr(),
//    browserify = require('browserify'),
//    less = require('gulp-less'),
//    path = require('path'),
//    source = require('vinyl-source-stream'),
//    buffer = require('vinyl-buffer'),
//    gulpif = require('gulp-if'),
//    minifyCSS = require('gulp-minify-css'),
//    concat = require('gulp-concat'),
//    imagemin = require('gulp-imagemin'),
//    gutil = require('gulp-util'),
//    uglify =  require('gulp-uglify'),
//    glob = require('glob').sync,
//    sourcemaps = require('gulp-sourcemaps'),
//    htmlhint = require("gulp-htmlhint"),
//    jshint = require('gulp-jshint'),
//    watch = require('gulp-watch'),
//    clean = require('gulp-clean'),
//    autoprefixer = require('gulp-autoprefixer'),
//    zip = require('gulp-zip'),
//    gulpIgnore = require('gulp-ignore'),
//    tplist = require('./src/static/tp/tp-list'),
//    localconfig = require('./config'),
    //    sass = require('gulp-ruby-sass'),
//    babel = require('gulp-babel'),
//    changed = require('gulp-changed');
//
//require("es6-shim");
//
//var DEV_MODE = true,
//    condition = './src/static/js/common/*/**.js';
//
//var sassc = function (src) {
//    return sass(src, {
//        sourcemap: true
//    })
//};
//
//gulp.task('css:common',function(){
//        sassc(localconfig.src_path.common_scss)
//        .on('error', sass.logError)
//        .pipe(autoprefixer({browsers: ['> 1% in CN'], cascade: false}))
//        .pipe(sourcemaps.write('../maps'))
//        .pipe(gulp.dest(localconfig.src_path.common_path));
//    return gulp.src(localconfig.src_path.common_css)
//        .pipe(minifyCSS())
//        .pipe(concat('qianmo_common.min.css'))
//        .pipe(gulp.dest(localconfig.complied_path.css))
//});
//
//
//gulp.task('css:static', function () {
//    return sassc(localconfig.src_path.static_sass)
//        .on('error', sass.logError)
//        .pipe(autoprefixer({browsers: ['> 1% in CN'], cascade: false}))
//        .pipe(sourcemaps.write('../maps'))
//        .pipe(gulpif(!DEV_MODE, minifyCSS()))
//        .pipe(gulp.dest(localconfig.complied_path.css))
//});
//
//
//
//gulp.task('images', function() {
//    return gulp.src(localconfig.src_path.images)
//        .pipe(imagemin({optimizationLevel: 5}))
//        .pipe(gulp.dest(localconfig.complied_path.images));
//});
//
//gulp.task('js:static', function () {
//    return gulp.src('./src/static/js/**/*.js')
//        //.pipe(gulpIgnore.exclude(condition))
//        //.pipe(jshint('.jshintsrc'))
//        //.pipe(jshint.reporter('default'))
//        //.pipe(gulpif(!DEV_MODE, uglify({
//        //    mangle: true
//        //})))
//        .pipe(changed('./dist/static/js'))
//        .pipe(babel())
//        .pipe(gulp.dest('./dist/static/js'));
//});
//
//gulp.task('js:ng',function(){
//    return browserify({
//        entries: glob('./src/static/js/ng/**/*.js'),
//        paths: ['./src/static/js/ng']
//    })
//        .bundle()
//        .pipe(source('qianmo_ng_static.min.js'))
//        .pipe(buffer())
//        .pipe(gulpif(!DEV_MODE, uglify({
//            mangle: true
//        })))
//        .pipe(gulp.dest(localconfig.complied_path.scripts));
//});
//
//gulp.task('js:lib', function () {
//    return gulp.src(tplist)
//        .pipe(gulpif(!DEV_MODE, uglify({
//            mangle: true
//        })))
//        .pipe(concat('qianmo_lib.min.js'))
//        .pipe(gulp.dest('./dist/static/js'));
//});
//
//gulp.task('other',function(){
//    return gulp.src('./src/static/fonts/**/*')
//        .pipe(gulp.dest('./dist/static/fonts'));
//});
//
//gulp.task('js:common',function(){
//    return browserify({
//        entries: glob(localconfig.src_path.common_scripts),
//        paths: ['./src/static/js/common']
//    })
//        .bundle()
//        .pipe(source('qianmo_common.min.js'))
//        .pipe(buffer())
//        .pipe(gulpif(!DEV_MODE, uglify({
//            mangle: true
//        })))
//        .pipe(gulp.dest(localconfig.complied_path.scripts));
//});
//
//gulp.task('watch', function() {
//    gulp.watch('./src/static/js/**/*', ['scripts']);
//    gulp.watch('./src/static/scss/**/*', ['css:static']);
//    gulp.watch(localconfig.src_path.common_css, ['css:common']);
//    gulp.watch(localconfig.src_path.images, ['images']);
//});
//
//
////需要启动服务器时才用，暂时用不到，端口配置在config.json里
//gulp.task('openwebserver', function() {
//    gulp.src( './complied' )
//        .pipe(webserver({
//            host:             localconfig.localserver.host,
//            port:             localconfig.localserver.port,
//            livereload:       true,
//            directoryListing: false
//        }));
//});
//
//gulp.task('openbrowser', function() {
//    opn( 'http://' + localconfig.localserver.host + ':' + localconfig.localserver.port );
//});
//
//
//
//gulp.task('stylesheet',['css:common','css:static']);
//gulp.task('scripts',['js:common','js:static','js:lib','js:ng']);
//gulp.task('view',['images']);
//gulp.task('server',['openwebserver','openbrowser']);
//gulp.task('default', ['scripts','view','stylesheet','other']);
//
//require('../nfs-task/qianmo.js')(localconfig, gulp);
//
//var fs = require("fs");
//var request = require("request");
//var os = require('os');
//var ifaces = os.networkInterfaces();
//var exec = require('child_process').exec;
//
//function getLocalIp() {
//    var result = [];
//
//    Object.keys(ifaces).forEach(function (ifname) {
//        var alias = 0
//            ;
//
//        ifaces[ifname].forEach(function (iface) {
//            if ('IPv4' !== iface.family || iface.internal !== false) {
//                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
//                return;
//            }
//
//            if (alias >= 1) {
//                // this single interface has multiple ipv4 addresses
//                result = result.concat(iface.address);
//            } else {
//                // this interface has only one ipv4 adress
//                result = result.concat(iface.address);
//            }
//        });
//    });
//
//    return result;
//}
//
//var gulp = require('gulp-param')(require('gulp'), process.argv);
//var rename = require("gulp-rename");
//var writefile = require('writefile')
//
//gulp.task("precompile", function (name, port) {
//    var pageurl = name;
//    var localIp = getLocalIp()[0];
//    var port = port;
//
//    var level = 0;
//    if (name.match(/\//)) {
//        level = name.match(/\//).length;
//    }
//
//    var cssfolder = "../static/css";
//    cssfolder = ('../'.repeat(level)) + cssfolder;
//
//    request('http://' + localIp + ':' + port + '/' + pageurl, function (error, response, body) {
//        if (!error && response.statusCode == 200) {
//            body = body.replace(/\/static\/css/g, cssfolder);
//            writefile("dist/precompile/"+ pageurl +".html", body, function (err) {
//                if (err) {
//                    console.log(err);
//                    return false;
//                }
//
//                exec('../font-spider/bin/font-spider dist/precompile/**/*.html', function (err, stdout, stderr) {
//                    console.log(stdout);
//                    console.log(stderr);
//                });
//            });
//        }
//    })
//});
//
//gulp.task("page", function (name) {
//    gulp.src("workbench/test/mockdata/component.tpl.json")
//        .pipe(rename(name + ".json"))
//        .pipe(gulp.dest("tests/mockdata/page"));
//
//    gulp.src("workbench/template/template.tpl.jinja2")
//        .pipe(rename(name + ".jinja2"))
//        .pipe(gulp.dest("src/template/page"));
//
//    gulp.src("workbench/stylesheet/page/template.scss")
//        .pipe(rename(name + ".scss"))
//        .pipe(gulp.dest("src/static/scss/page"));
//
//    exec('gulp watch', function (err, stdout, stderr) {
//        console.log(stdout);
//        console.log(stderr);
//    });
//});
//
//gulp.task("webgl", function (name) {
//    gulp.src("workbench/test/mockdata/component.tpl.json")
//        .pipe(rename(name + ".json"))
//        .pipe(gulp.dest("tests/mockdata/webgl"));
//
//    gulp.src("workbench/template/webgl.tpl.jinja2")
//        .pipe(rename(name + ".jinja2"))
//        .pipe(gulp.dest("src/template/webgl"));
//
//    gulp.src("workbench/javascript/webgl.template.js")
//        .pipe(rename(name + ".js"))
//        .pipe(gulp.dest("src/static/js/webgl"));
//
//    exec('gulp watch', function (err, stdout, stderr) {
//        console.log(stdout);
//        console.log(stderr);
//    });
//});
//
//var taskName = "zhilizhili";
//
//gulp.task(taskName, function (name) {
//
//    var paths = "";
//    var namearr = name.split('/');
//
//    if (name.match(/\//)) {
//        paths = namearr.filter(function(item, index, arr){
//            if (index < arr.length - 1) {
//                return true;
//            }
//            return false;
//        }).join('/');
//        if (paths != '') {
//            paths = '/' + paths;
//            name = namearr[namearr.length - 1];
//        }
//    }
//
//    gulp.src("workbench/test/mockdata/component.tpl.json")
//        .pipe(rename(name + ".json"))
//        .pipe(gulp.dest("tests/mockdata/" + taskName + paths));
//
//    gulp.src("workbench/template/" + taskName + ".tpl.jinja2")
//        .pipe(rename(name + ".jinja2"))
//        .pipe(gulp.dest("src/template/" + taskName + paths));
//
//    gulp.src("workbench/stylesheet/page/template.scss")
//        .pipe(rename(name + ".scss"))
//        .pipe(gulp.dest("src/static/scss/" + taskName + paths));
//});
//
//
//var svgSprite = require("gulp-svg-sprites");
//
//gulp.task('sprites', function () {
//    return gulp.src('dist/static/icons/icon/svg/*.svg')
//        .pipe(svgSprite({
//            cssFile: "scss/_sprite.scss",
//            baseSize: 16
//        }))
//        .pipe(gulp.dest("dist/static/sprites"));
//});
//
//var fs = require("fs");
//
//function getAllFiles(root){
//    var res = [] , files = fs.readdirSync(root);
//    files.forEach(function(file){
//        var pathname = root+'/'+file, stat = fs.lstatSync(pathname);
//         if (!stat.isDirectory()){
//             if (!file.startsWith(".")) {
//                res.push(file.replace(".svg", ""));
//             }
//        } else {
//            res = res.concat(getAllFiles(pathname));
//        }
//    });
//    return res;
//}
//
//gulp.task('getSvgFiles', function(src) {
//    var data = getAllFiles(src).join(",");
//    writefile("/tmp/svg-name.txt", data, function (err) {
//        if (err) {
//            console.log(err);
//            return false;
//        }
//
//        exec('mvim /tmp/svg-name.txt', function (err, stdout, stderr) {
//            console.log(stdout);
//            console.log(stderr);
//        });
//    });
//});

// all gulp tasks are located in the ./build/tasks directory
// gulp configuration is in files in ./build directory
require('require-dir')('build/tasks');
