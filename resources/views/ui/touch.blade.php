<!doctype html>
<html class="" lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <title>Document</title>
    <link rel="stylesheet" href="/assets/static/css/normalize.css">
    <link rel="stylesheet" href="/assets/mobile/css/ui/touch.css?v=<% rand(0, 1000) %>">
    <script src="/assets/static/js/dom4.min.js"></script>
</head>
<body class="ios ios--default ui-touch">
    <div class="drawer-view">
        <div class="view__item" drawer>
            <div class="scroll-panel">
                <div class="scroll-panel__body">
                    <div class="list-group">
                        <div class="list-group__item">菜单1</div>
                        <div class="list-group__item">菜单2</div>
                        <div class="list-group__item">菜单3</div>
                    </div>
                </div>
            </div>
            <div class="bg"></div>
        </div>
        <div class="view__item" main>
            <div class="stack-view">
                <div class="view__item">
                    <header>
                        <div class="navbar">
                            <div class="layout full-parent flex vertical vertical-center">
                                <ul class="nav">
                                    <div class="layout flex">
                                        <li class="nav__item prefix">
                                            <div class="icon-btn nav__action">
                                                <span class="icon iconfont icon-back"></span>
                                            </div>
                                        </li>
                                        <li class="nav__item content">center</li>
                                        <li class="nav__item suffix">
                                            <div class="icon-btn nav__action">
                                                <span>Edit</span>
                                            </div>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </header>
                    <section class="icon">
                        <div class="signal">
                            <span class="icon icon-ios icon-circle"></span><span
                                    class="icon icon-ios icon-circle"></span><span
                                    class="icon icon-ios icon-circle"></span><span
                                    class="icon icon-ios icon-circle-o"></span><span
                                    class="icon icon-ios icon-circle-o"></span>
                        </div>
                    </section>
                    <section>
                        <div class="btn-group">
                            <div class="layout flex horizontal" role="group">
                                <div class="btn layout__item layout__item--prefix">left</div>
                                <div class="btn layout__item layout__item--content">center</div>
                                <div class="btn layout__item layout__item--suffix">right</div>
                            </div>
                        </div>
                        <div class="btn-group">
                            <div class="layout flex horizontal align-items-center" role="group">
                                <div class="btn layout__item">left</div>
                                <div class="btn layout__item">center</div>
                                <div class="btn layout__item">right</div>
                                <div class="btn layout__item">right</div>
                                <div class="btn layout__item">right</div>
                            </div>
                        </div>
                        <div class="navbar navbar--default">
                            <div class="layout full-parent flex horizontal center vertical-center">
                                <div class="btn-group">
                                    <div class="layout flex horizontal align-items-center" role="group">
                                        <div class="btn layout__item active">left</div>
                                        <div class="btn layout__item">center</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="navbar navbar--default">
                            <div class="layout full-parent flex horizontal center vertical-center">
                                <div class="btn-group">
                                    <div class="layout flex horizontal align-items-center" role="group">
                                        <div class="btn layout__item">left</div>
                                        <div class="btn layout__item">center</div>
                                        <div class="btn layout__item">right</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="navbar navbar--default">
                            <div class="layout full-parent flex horizontal center vertical-center">
                                <div class="btn-group">
                                    <div class="layout flex horizontal align-items-center" role="group">
                                        <div class="btn layout__item">left</div>
                                        <div class="btn layout__item">center</div>
                                        <div class="btn layout__item">right</div>
                                        <div class="btn layout__item">right</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div class="btn btn--default">sds</div>
                        <div class="btn btn--primary">sds</div>
                        <div class="btn btn--block btn--default">sds</div>
                        <div class="btn-group">
                            <div class="layout flex horizontal align-items-center" role="group">
                                <div class="btn layout__item">left</div>
                                <div class="btn layout__item">center</div>
                                <div class="btn layout__item">right</div>
                                <div class="btn layout__item">right</div>
                                <div class="btn layout__item">right</div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="view__item active">
                    @include("mobile.ui.partials.form")
                </div>
                <div class="view__item"></div>
                <div class="view__item"></div>
                <div class="view__item"></div>
            </div>
            <div class="bg"></div>
        </div>
    </div>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <filter id="blur">
            <feGaussianBlur stdDeviation="6"></feGaussianBlur>
        </filter>
    </svg>
</body>
<script src="/assets/static/js/validator.min.js"></script>
<script src="/assets/static/js/vue.js"></script>
<script src="/assets/static/js/utils.js"></script>
<script src="/assets/static/js/easydom.js"></script>
<script src="/assets/mobile/controller/ui/touch.js"></script>
</html>