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
        <top-bar id="topBar" class="layout horizontal center">
            <div class="row">
                <div class="col-xs">
                    <div class="layout horizontal center start-justified">
                        <div class="logo-con">
                            <span>zhilizhili</span>
                        </div>
                    </div>
                    <dropdown-menu id="navMenu" class="dropdown-menu--close nav-menu">
                        <paper-card heading="Card Title">
                            <div class="card-content">
                                <paper-menu selected="0">
                                    <paper-item>Item 1</paper-item>
                                    <paper-item>Item 2</paper-item>
                                </paper-menu>
                            </div>
                        </paper-card>
                    </dropdown-menu>
                </div>
                <div class="col-xs">
                    <div class="layout horizontal center search-form">
                        {!! Form::open(['url' => '', 'method' => 'post', 'is'=>'iron-form']) !!}
                        <div class="layout horizontal center search-group">
                            {!! Form::text('text', '', ['class' => '', 'is'=>'iron-input']) !!}
                            <button class="layout horizontal">
                                <iron-icon icon="icons:search"></iron-icon>
                            </button>
                        </div>
                        {!! Form::close() !!}
                        <paper-button class="upload-video-button" primary link-button>
                            <a href="">upload</a>
                        </paper-button>
                    </div>
                </div>
                <div class="col-xs">
                    <div class="layout horizontal center end-justified">
                        <div id="user" class="layout inline user">
                            @if (!is_null(Auth::user()))
                                <div class="member member--default">
                                    <div class="layout horizontal center">
                                        <div class="member__action">
                                            <div class="layout horizontal center">
                                                <paper-button>
                                                    <iron-icon icon="communication:email"></iron-icon>
                                                </paper-button>
                                                <paper-button>
                                                    <iron-icon icon="social:notifications-none"></iron-icon>
                                                </paper-button>
                                            </div>
                                        </div>
                                        <div class="member__logo"></div>
                                        <paper-button id="toggleUserMenu" class="member__toggle-nav">
                                            <iron-icon icon="icons:expand-more"></iron-icon>
                                        </paper-button>
                                    </div>
                                </div>
                            @else
                                <a href="<% url('/auth/register') %>">注册</a>
                                <a href="<% url('/auth/login') %>">登陆</a>
                            @endif
                        </div>
                    </div>
                    <dropdown-menu id="userMenu" class="dropdown-menu--close user-menu">
                        <paper-card heading="">
                            <div class="card-content">
                                <paper-menu selected="0">
                                    <paper-item>Item 1</paper-item>
                                    <paper-item>Item 2</paper-item>
                                </paper-menu>
                            </div>
                        </paper-card>
                    </dropdown-menu>
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
<script src="/assets/pc/controller/base.js"></script>
@yield('script')
</html>
