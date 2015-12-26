<!doctype html>
<!--[if IE 8 ]><html class="ie8" lang="zh-cn"><![endif]-->
<!--[if IE 9 ]><html class="ie9" lang="zh-cn"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html class="" lang="zh-cn"><!--<![endif]-->
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Document</title>

    <!-- 1. Load libraries -->
    <script src="/assets/static/node_modules/angular2/bundles/angular2-polyfills.js"></script>
    <script src="/assets/static/node_modules/systemjs/dist/system.src.js"></script>
    <script src="/assets/static/node_modules/rxjs/bundles/Rx.js"></script>
    <script src="/assets/static/node_modules/angular2/bundles/angular2.dev.js"></script>


    <!-- 2. Configure SystemJS -->
    <script>
//        System.config({
//            packages: {
//                app: {
//                    format: 'register',
//                    defaultExtension: 'js'
//                }
//            }
//        });
//        System.import('/assets/pc/controller/ui/kde.js')
//                .then(null, console.error.bind(console));
    </script>

    <link rel="stylesheet" href="/assets/static/css/normalize.css">
    <link rel="stylesheet" href="/assets/pc/css/ui/kde.css?v=<% rand(0, 1000) %>">
    <script src="/assets/static/js/dom4.min.js"></script>
    <!-- 总共35k 提供了dom3 es5 大部分功能 -->
    <!--[if IE 8]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <script src="../../public/js/ie8-support/es5-shim.min.js"></script>
    <script src="../../public/js/ie8-support/es5-sham.min.js"></script>
    <script src="../../public/js/ie8-support/ie8.min.js"></script>
    <script type="text/javascript">
        //ie8 console没有的问题
        if (typeof console === "undefined" || typeof console.log === "undefined") {
            console = {};
            console.log = function(msg) {
                alert(msg);
            };
        }
    </script>
    <![endif]-->
    <!--[if lte IE 9]>
    <script src="/assets/static/js/placeholders.min.js"></script>
    <![endif]-->
</head>
<body class="ui-kde dark-style">
    <div class="layout table full-parent">
        @include("ui.partials.sidebar")
        <main class="layout__item auto">
            <div class="fix-layout-table">
                @include("ui.kde.date")
                @include("ui.kde.concat")
                @include("ui.kde.map")
            </div>
        </main>
        <%--  /main   --%>
    </div>
    <my-app style="display: none;">Loading...</my-app>
</body>
<script src="/assets/pc/controller/ui.js"></script>
</html>