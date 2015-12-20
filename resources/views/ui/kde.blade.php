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
                <div class="scroll-panel main-panel">
                    <div class="scroll-panel__head">
                        <div class="layout table full-parent">
                            <div class="layout__item auto">
                                @include("ui.partials.top-bar")
                                <%--  /top-bar   --%>
                                @include("ui.partials.actions-bar")
                                <%--  /action-bar   --%>
                            </div>
                            <div class="layout__item">
                                <div class="icon-btn add-action">
                                    <span class="icon iconfont icon-plus"></span>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown__list filter-dropdwon-list">
                            <div class="list-group">
                                <div class="list-group__item">1</div>
                                <div class="list-group__item">2</div>
                                <div class="list-group__item">3</div>
                            </div>
                        </div>
                    </div>
                    <%--  /main head   --%>
                    <div class="scroll-panel__body">
                        <div class="fix-panel-bug">
                            <div class="reservations">
                                <div class="view horizontal-columns-view">
                                    <div class="view__item">
                                        <div class="panel">
                                            <div class="panel__head">
                                                <div class="time">17:00</div>
                                            </div>
                                            <div class="panel__body">
                                                <div class="list-group reservations__group">
                                                    <div class="list-group__item">
                                                        <div class="reservation reservation--arrived">
                                                            <div class="layout new-left-right full-parent">
                                                                <div class="float-left">
                                                                    <div class="left-inner">
                                                                        <div class="reservation__prefix">
                                                                            <div class="center-set">
                                                                                <div class="center-set__item"><div class="label label--circle">3</div></div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="reservation__content">
                                                                            <div class="center-set">
                                                                                <div class="center-set__item">
                                                                                    <div class="user">
                                                                                        <div class="user__name">Kate Mara</div>
                                                                                        <div class="user__phone">213214213</div>
                                                                                        <div class="user__location">asdasdsads</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="float-right">
                                                                        <div class="reservation__addons">
                                                                            <div class="center-set">
                                                                                <div class="center-set__item">
                                                                                    <div class="icon-btn icon-btn--block">
                                                                                        <span class="icon iconfont"></span>
                                                                                    </div>
                                                                                    <div>5m</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <%-- /reservation --%>
                                                    </div>
                                                    <div class="list-group__item">
                                                        <div class="reservation reservation--seated">
                                                            <div class="layout new-left-right full-parent">
                                                                <div class="float-left">
                                                                    <div class="left-inner">
                                                                        <div class="reservation__prefix">
                                                                            <div class="center-set">
                                                                                <div class="center-set__item"><div class="label label--circle">3</div></div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="reservation__content">
                                                                            <div class="center-set">
                                                                                <div class="center-set__item">
                                                                                    <div class="user">
                                                                                        <div class="user__name">Kate Mara</div>
                                                                                        <div class="user__phone">213214213</div>
                                                                                        <div class="user__location">asdasdsads</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="float-right">
                                                                        <div class="reservation__addons">
                                                                            <div class="center-set">
                                                                                <div class="center-set__item">
                                                                                    <div class="icon-btn icon-btn--block">
                                                                                        <span class="icon iconfont"></span>
                                                                                    </div>
                                                                                    <div>5m</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <%-- /reservation --%>
                                                    </div>
                                                    <div class="list-group__item">
                                                        <div class="reservation reservation--default">
                                                            <div class="layout new-left-right full-parent">
                                                                <div class="float-left">
                                                                    <div class="left-inner">
                                                                        <div class="reservation__prefix">
                                                                            <div class="center-set">
                                                                                <div class="center-set__item"><div class="label label--circle">3</div></div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="reservation__content">
                                                                            <div class="center-set">
                                                                                <div class="center-set__item">
                                                                                    <div class="user">
                                                                                        <div class="user__name">Kate Mara</div>
                                                                                        <div class="user__phone">213214213</div>
                                                                                        <div class="user__location">asdasdsads</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="float-right">
                                                                        <div class="reservation__addons">
                                                                            <div class="center-set">
                                                                                <div class="center-set__item">
                                                                                    <div class="icon-btn icon-btn--block">
                                                                                        <span class="icon iconfont"></span>
                                                                                    </div>
                                                                                    <div>5m</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <%-- /reservation --%>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <%--  /reservation group   --%>
                                        <div class="panel">
                                            <div class="panel__head">
                                                <div class="time">17:15</div>
                                            </div>
                                            <div class="panel__body">
                                                <div class="list-group reservations__group">
                                                    <div class="list-group__item">
                                                        <div class="reservation reservation--arrived">
                                                            <div class="layout new-left-right full-parent">
                                                                <div class="float-left">
                                                                    <div class="left-inner">
                                                                        <div class="reservation__prefix">
                                                                            <div class="center-set">
                                                                                <div class="center-set__item"><div class="label label--circle">3</div></div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="reservation__content">
                                                                            <div class="center-set">
                                                                                <div class="center-set__item">
                                                                                    <div class="user">
                                                                                        <div class="user__name">Kate Mara</div>
                                                                                        <div class="user__phone">213214213</div>
                                                                                        <div class="user__location">asdasdsads</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="float-right">
                                                                        <div class="reservation__addons">
                                                                            <div class="center-set">
                                                                                <div class="center-set__item">
                                                                                    <div class="icon-btn icon-btn--block">
                                                                                        <span class="icon iconfont"></span>
                                                                                    </div>
                                                                                    <div>5m</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <%-- /reservation --%>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="view__item">
                                        <div class="panel">
                                            <div class="panel__head">
                                                <div class="time">18:00</div>
                                            </div>
                                            <div class="panel__body">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="view__item">
                                        <div class="panel">
                                            <div class="panel__head">
                                                <div class="time">19:00</div>
                                            </div>
                                            <div class="panel__body">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="view__item">
                                        <div class="panel">
                                            <div class="panel__head">
                                                <div class="time">20:00</div>
                                            </div>
                                            <div class="panel__body">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="scroll-panel__footer">
                        <div class="fix-panel-bug">
                            <div class="layout full-parent new-left-right">
                                <div class="float-left" style="text-align: center">
                                    <div class="left-inner">
                                        <ul class="layout center-set nav reservation-indicator">
                                            <li class="layout__item nav__item
                                                        reservation-indicator__item
                                                        reservation-indicator__item--reservation"><span
                                                        class="icon icon-unicode icon-circle"></span><span>reservation</span></li>
                                            <li class="layout__item nav__item
                                                        reservation-indicator__item
                                                        reservation-indicator__item--seated"><span
                                                        class="icon icon-unicode icon-circle"></span><span>seated</span></li>
                                            <li class="layout__item nav__item
                                                        reservation-indicator__item
                                                        reservation-indicator__item--arrived"><span
                                                        class="icon icon-unicode icon-circle"></span><span>arrived</span></li>
                                        </ul>
                                    </div>
                                    <div class="float-right">
                                        <div class="layout center-set">
                                            <div class="layout__item">
                                                <div class="action vip-action">
                                                    <span class="action__text">create block</span>
                                                    <span class="icon iconfont icon-vip"></span>
                                                </div>
                                            </div>
                                            <div class="layout__item">
                                                <div class="action quick-search-action">
                                                    <span class="action__text">quick search</span>
                                                    <div class="layout center-set nav">
                                                        <div class="layout__item nav__item">
                                                            <div class="span icon iconfont icon-user">
                                                                <div class="mask">1</div>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item nav__item">
                                                            <div class="span icon iconfont icon-user-group">
                                                                <div class="mask">2</div>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item nav__item">
                                                            <div class="span icon iconfont icon-user-group">
                                                                <div class="mask">3</div>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item nav__item">
                                                            <div class="span icon iconfont icon-user-group">
                                                                <div class="mask">4</div>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item nav__item">
                                                            <div class="span icon iconfont icon-user-group">
                                                                <div class="mask">5</div>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item nav__item">
                                                            <div class="span icon iconfont icon-user-group">
                                                                <div class="mask">6</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <%--  /main   --%>
    </div>
    <my-app style="display: none;">Loading...</my-app>
</body>
<script src="/assets/pc/controller/ui.js"></script>
</html>