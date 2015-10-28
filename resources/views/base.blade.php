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
    <link rel="import" href="/bower_components/iron-flex-layout/classes/iron-flex-layout.html">
    <link rel="import" href="/bower_components/iron-form/iron-form.html">
    <link rel="import" href="/bower_components/iron-input/iron-input.html">
    <link rel="import" href="/bower_components/iron-icon/iron-icon.html">
    <link rel="import" href="/bower_components/iron-icons/iron-icons.html">
    <link rel="import" href="/components/top-bar.html">
    <link rel="stylesheet" href="/css/flexgrid.css">
    <link rel="stylesheet" href="/css/app.css">
    <script src="/bower_components/gsap/src/minified/TweenMax.min.js"></script>
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

        .polymer-support-oldbrowser.webcomponents-ready {
            opacity: 0;
            z-index: -1;
            background-color: transparent;
        }
    </style>
    @yield('head')
</head>
<body>
    <template is="dom-bind" id="app">
        <top-bar>
            <div class="row">
                <div class="col-xs">
                    <div class="layout horizontal center start-justified">
                        logo
                    </div>
                </div>
                <div class="col-xs">
                    <div class="layout horizontal center-center search-form">
                        {!! Form::open(['url' => '', 'method' => 'post', 'is'=>'iron-form']) !!}
                        <div class="layout horizontal center">
                            {!! Form::text('text', '', ['class' => '', 'is'=>'iron-input']) !!}
                            <button class="layout horizontal">
                                <iron-icon icon="icons:search"></iron-icon>
                            </button>
                        </div>
                        {!! Form::close() !!}
                    </div>
                </div>
                <div class="col-xs">
                    <div class="layout horizontal center end-justified">
                        <div id="user" class="layout inline">
                            @if (!is_null(Auth::user()))
                                <div id="user-info" class="user-info">
                                    <a href="<% url('user', Auth::user()->id) %>" class="user-info-home"><span class="user-info-name"><% Auth::user()->name %></span></a>
                                </div>
                            @else
                                <a href="<% url('/auth/register') %>">注册</a>
                                <a href="<% url('/auth/login') %>">登陆</a>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </top-bar>
        @yield('content')
        <div class="polymer-support-oldbrowser" id="polymer-support-oldbrowser">
            web components 正在努力加载中
        </div>
    </template>
</body>
<script src="/controller/ViewController.js"></script>
@yield('script')
</html>
