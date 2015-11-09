<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
    <title>Document</title>
    <!-- webcomponents, polymer standard, polymer-ts -->
    <script src="/bower_components/webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="/bower_components/polymer/polymer.html">
    <link rel="import" href="/bower_components/polymer-ts/polymer-ts.html">
    <link rel="import" href="/bower_components/iron-flex-layout/iron-flex-layout.html">
    <link rel="import" href="/bower_components/iron-flex-layout/classes/iron-flex-layout.html">
    <link rel="import" href="/bower_components/iron-icon/iron-icon.html">
    <link rel="import" href="/bower_components/iron-icons/iron-icons.html">
    <link rel="import" href="/bower_components/paper-button/paper-button.html">
    <link rel="import" href="/bower_components/iron-selector/iron-selector.html">

    <script src="/framework/utils.js"></script>

    <link rel="stylesheet" href="/bower_components/normalize-css/normalize.css">
    <link rel="import" href="/elements/view-controller/view-controller.html">
    <link rel="import" href="/elements/lfx-view/lfx-view.html">
    <link rel="import" href="/elements/scroll-view/scroll-view.html">
    <link rel="stylesheet" href="/css/app.css">
    <link rel="stylesheet" href="/css/flexgrid.css">
    <link rel="stylesheet" href="/mobile/css/article/show.css">
</head>
<body>
<template is="dom-bind" id="app">
    @if(!is_null(Auth::user()) && Auth::user()->isAdmin() || $article->status == 1)
        <main>
            <view-controller>
                <div id="player" class="lfx-player">
                    <video src="http://192.168.0.106/wohejimi.mp4" controls></video>
                </div>

                <iron-selector id="scrollviewnav" class="layout horizontal pagenav" selected="0">
                    <div class="flex-1 pagenav__item" on-click="viewchange" data-view-index="0">简介</div>
                    <div class="flex-1 pagenav__item" on-click="viewchange" data-view-index="1">评论</div>
                </iron-selector>

                <scroll-view id="scrollView" on-scrollend="scrollviewchanged">
                    <lfx-view>
                        <section class="videoinfo">
                            <h3 class="videoinfo__title"><a href=""><% $article->title %></a></h3>
                            <div class="layout horizontal videoinfo__up">
                                <div class="row">
                                    <div class="col-xs-2">
                                        <div class="videoinfo__up-logo">
                                            <img src="" alt="">
                                        </div>
                                    </div>
                                    <div class="col-xs-10">
                                        <div class="layout horizontal">
                                            <div class="flex-1 videoinfo__up-name">
                                                <span><% $article->user->name %></span>
                                            </div>
                                            <paper-button role="focus">
                                                <iron-icon icon="icons:add"></iron-icon>
                                                <span>关注</span>
                                            </paper-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="layout vertical videoinfo__slug">
                                <% $article->slug %>
                            </div>
                        </section>
                    </lfx-view>
                    <lfx-view>
                        @for ($i = 0; $i < 3; $i++)
                            <div class="layout horizontal comment">
                                <div class="layout vertical center comment__user">
                                    <div class="comment__user-logo">
                                        <img src="" alt="">
                                    </div>
                                    <div class="comment__user-name">
                                        评论者
                                    </div>
                                </div>
                                <div class="comment__content">
                                    评论内容
                                </div>
                            </div>
                        @endfor
                    </lfx-view>
                </scroll-view>
            </view-controller>
        </main>
    @else
        这篇文章还在审核中
        <section id="test">
            <div id="test-inner">
                <h3 class="video-title"><a href=""><% $article->title %></a></h3>
                <div class="layout horizontal">
                    <div class="video-up">
                        <div class="video-up-name">
                            up主 <span><% $article->user->name %></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    @endif
</template>
</body>
<script src="/mobile/controller/article/show.js"></script>
</html>