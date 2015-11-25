

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
    <link rel="import" href="/bower_components/polymer-ts/polymer-ts.html">
    <link rel="stylesheet" href="/bower_components/normalize-css/normalize.css">
    <link rel="import" href="/bower_components/iron-flex-layout/classes/iron-flex-layout.html">
    <link rel="import" href="/bower_components/iron-form/iron-form.html">
    <link rel="import" href="/bower_components/iron-input/iron-input.html">
    <link rel="import" href="/bower_components/iron-icon/iron-icon.html">
    <link rel="import" href="/bower_components/iron-icons/iron-icons.html">
    <link rel="import" href="/bower_components/iron-icons/communication-icons.html">
    <link rel="import" href="/bower_components/iron-icons/social-icons.html">
    <link rel="import" href="/bower_components/paper-button/paper-button.html">
    <link rel="import" href="/bower_components/paper-menu/paper-menu.html">
    <link rel="import" href="/bower_components/paper-item/paper-item.html">
    <link rel="import" href="/bower_components/paper-card/paper-card.html">
    <link rel="import" href="/components/top-bar.html">
    <link rel="import" href="/components/dropdown-menu.html">
    <link rel="import" href="/components/appstyle.html">
    <link rel="stylesheet" href="/css/app.css">
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
    @yield('content')
    <div class="polymer-support-oldbrowser" id="polymer-support-oldbrowser">
        web components 正在努力加载中
    </div>
    @if (!is_null(Auth::user()))
        <input id="username" type="hidden" value="<% Auth::user()->name %>">
    @else
        <input id="username" type="hidden" value="">
    @endif
</template>
</body>
@yield('script')
</html>
