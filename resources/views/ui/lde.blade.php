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
        System.defaultJSExtensions = true;
        System.config({
            map: {
                angular2: '/assets/static/node_modules/angular2',
                rxjs: '/assets/static/node_modules/rxjs'
            }
        });
        System.import('/assets/pc/controller/ui/lde')
                .then(null, console.error.bind(console));
    </script>

    <link rel="stylesheet" href="/assets/static/css/normalize.css">
    <link rel="stylesheet" href="/assets/pc/css/ui/lde.css?v=<% rand(0, 1000) %>">
    <script src="/assets/static/js/dom4.min.js"></script>
    <!--[if lte IE 10]>
    <script src="/assets/static/js/placeholders.min.js"></script>
    <![endif]-->
</head>
<body class="ui-lde dark-style">
<my-app>Loading...</my-app>
</body>
<script src="/assets/pc/controller/ui.js"></script>
</html>