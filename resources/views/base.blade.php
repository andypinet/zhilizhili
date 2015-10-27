<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <title>Document</title>
    <script>
    window.oldBrowser = false;
    if (!('content' in document.createElement('template'))) {
        window.oldBrowser = true;
    }
    window.addEventListener('WebComponentsReady', function(){
        if (document.querySelector('#polymer-support-oldbrowser')) {
            document.querySelector('#polymer-support-oldbrowser').classList.add('webcomponents-ready');
        }
    });
    </script>
    <script src="/bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="/bower_components/polymer/polymer.html">
    <link rel="stylesheet" href="/bower_components/normalize-css/normalize.css">
    <link rel="import" href="/components/top-bar.html">
    <link rel="stylesheet" href="/css/app.css">
    <script src="/bower_components/gsap/src/minified/TweenMax.min.js"></script>
    <script src="/bower_components/gsap/src/minified/TimelineMax.min.js"></script>
    <script src="/bower_components/es6-shim/es6-shim.min.js"></script>
    <style>
        .polymer-support-oldbrowser {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #c37bf7;
            font-size: 30px;
            color: #ffffff;
            z-index: 10000;
            transition: all 0.65s ease;
        }

        .webcomponents-ready {
            opacity: 0;
            z-index: -1;
            background-color: transparent;
        }
    </style>
    @yield('head')
</head>
<body>
    <top-bar>
        @if (!is_null(Auth::user()))
            <div id="user-info" class="user-info">
                <a href="<% url('user', Auth::user()->id) %>" class="user-info-home"><span class="user-info-name"><% Auth::user()->name %></span></a>
            </div>
        @endif
    </top-bar>
    @yield('content')
    <div class="polymer-support-oldbrowser" id="polymer-support-oldbrowser">
        web components 正在努力加载中
    </div>
</body>
@yield('script')
</html>
