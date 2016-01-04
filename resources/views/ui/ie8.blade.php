<!DOCTYPE html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/assets/static/css/normalize.css">
        <script src="/assets/static/oldie/modernizr-2.8.3.min.js"></script>
        <!-- 总共35k 提供了dom3 es5 大部分功能 -->
        <!--[if IE 8]><script src="/assets/static/oldie/ie8.min.js"></script><![endif]-->
        <!--[if lt IE 9]>
        <script src="/assets/static/oldie/lt-ie-9.min.js"></script>
        <script src="/assets/static/oldie/calc.min.js"></script>
        <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
        <!--[if lt IE 11]>
        <![endif]-->
        <!-- dom4级 功能 -->
        <script src="/assets/static/js/dom4.min.js"></script>
        <link rel="stylesheet" href="/assets/pc/css/ui/lde.css?v=<% rand(0, 1000) %>">

    </head>
    <body>
        <!--[if lt IE 8]>
        <div class="browsehappy">
            <p>
                You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/" target="_blank">upgrade your browser</a> to improve your experience.
            </p>
        </div>
        <![endif]-->

        @include("ui.ie8.ui.select")

    </body>
</html>