@extends('base')

@section('head')
    <link rel="stylesheet" href="/bower_components/editor.md/css/editormd.preview.css">
    <link rel="import" href="/bower_components/iron-selector/iron-selector.html">
    <link rel="import" href="/bower_components/iron-icons/av-icons.html">
    <link rel="import" href="/bower_components/iron-selector/iron-selector.html">
    <link rel="import" href="/bower_components/iron-icon/iron-icon.html">
    <link rel="import" href="/bower_components/iron-icons/iron-icons.html">
    <link rel="import" href="/bower_components/zhilizhili-slider/slider-item.html">
    <link rel="import" href="/bower_components/zhilizhili-slider/zhilizhili-slider.html">
    <link rel="import" href="/bower_components/paper-card/paper-card.html">
    <link rel="import" href="/bower_components/paper-icon-button/paper-icon-button.html">
    <link rel="import" href="/bower_components/iron-a11y-keys/iron-a11y-keys.html">
    <link rel="import" href="/components/simple-slider.html">
    <link rel="import" href="/components/simple-slider-item.html">

    <link rel="import" href="/components/lfx-player.html">

    <script src="/framework/utils.js"></script>

    <link rel="stylesheet" href="/css/range_slider.css">
    <link rel="stylesheet" href="/bower_components/vis/dist/vis.min.css">
    <link rel="stylesheet" href="/pc/css/layout.css">
    <link rel="stylesheet" href="/pc/css/article/show.css">
@stop

@section('content')
    @if(!is_null(Auth::user()) && Auth::user()->isAdmin() || $article->status == 1)
        <main>
            <div class="media-player media-player--default">
                <div class="layout horizontal center-justified media-player__inner">
                    <div class="media-player__play">
                        <div class="layout horizontal">
                            <lfx-player src="http://192.168.0.106/test03.mp4">
                                <div class="controlbar btn lfx-player__list" on-click="showModalHandle" title="打开知识窗口">
                                    <iron-icon icon="icons:menu"></iron-icon>
                                </div>
                            </lfx-player>
                        </div>
                    </div>
                    <div class="media-player__list">
                        @for($i = 0; $i < 5; $i++)
                            <figure class="video-figure video-figure--default">
                                <div class="layout horizontal">
                                    <div class="video-figure__img">
                                        <img class="" src="" alt="">
                                        <div class="video-figure__title"></div>
                                        <time class="video-figure__time">35:10</time>
                                    </div>
                                    <div class="video-figure__content">
                                        <h3 class="video-figure__title">sadsadasdasdasdsads</h3>
                                        <div class="video-figure__origin">sdsdsdsdsds</div>
                                    </div>
                                </div>
                            </figure>
                        @endfor
                    </div>
                </div>
            </div>
            <section class="panel panel--default main-content">
                <div class="layout horizontal panel__inner">
                    <div class="panel__main">
                        <paper-card class="video-info-card" heading="<% $article->title %>">
                            <div class="card-content">
                                <div class="user user--default">
                                    <div class="user__logo"></div>
                                    <div class="user__name">
                                        <% $article->user->name %>
                                    </div>
                                    <div class="user__action">
                                        <paper-button class="focus-button">
                                            <iron-icon class="focus-button__icon" icon="icons:add"></iron-icon>
                                            <span class="focus-button__content">关注</span>
                                        </paper-button>
                                    </div>
                                </div>
                            </div>
                            <div class="card-actions">
                                <paper-button>Some action</paper-button>
                            </div>
                        </paper-card>
                        <paper-card class="video-info-card" heading="">
                            <div class="card-content">
                                <div class="user user--default video-user">
                                    <time>2015年1月31日发布</time>
                                </div>
                            </div>
                            <div class="card-actions">
                                <paper-button>展开</paper-button>
                            </div>
                        </paper-card>
                        <paper-card class="video-comment-card" heading="">
                            <div class="card-content">
                            </div>
                        </paper-card>
                    </div>
                    <div class="panel__aside">
                        <paper-card>
                            <div class="card-content">
                                @for($i = 0; $i < 5; $i++)
                                <figure class="video-figure video-figure--default">
                                    <div class="layout horizontal">
                                        <div class="video-figure__img">
                                            <img class="" src="" alt="">
                                            <div class="video-figure__title"></div>
                                            <time class="video-figure__time">35:10</time>
                                        </div>
                                        <div class="video-figure__content">
                                            <h3 class="video-figure__title">sadsadasdasdasdsads</h3>
                                            <div class="video-figure__origin">sdsdsdsdsds</div>
                                        </div>
                                    </div>
                                </figure>
                                @endfor
                            </div>
                        </paper-card>
                    </div>
                </div>
            </section>
        </main>
        <div id="modal" class="modal modal--hide full-fixed">
            <paper-button class="modal__close" on-click="hideModalHandle">
                close
            </paper-button>
            <div class="modal__body full-parent">
                <div class="gallery gallery--default">
                    <zhilizhili-slider id="gallerySlider" class="gallery__slider" direction="horizontal">
                        <slider-item>
                            1
                        </slider-item>
                        <slider-item>
                            2
                        </slider-item>
                        <slider-item>
                            3
                        </slider-item>
                        <slider-item>
                            4
                        </slider-item>
                        <slider-item>
                            5
                        </slider-item>
                        <slider-item>
                            6
                        </slider-item>
                    </zhilizhili-slider>

                    <simple-slider id="galleryControls" class="layout horizontal gallery__thumbnail-control">
                        <simple-slider-item class="gallery__thumbnail active">
                            1
                        </simple-slider-item>
                        <simple-slider-item class="gallery__thumbnail">
                            2
                        </simple-slider-item>
                        <simple-slider-item class="gallery__thumbnail">
                            3
                        </simple-slider-item>
                        <simple-slider-item class="gallery__thumbnail">
                            4
                        </simple-slider-item>
                        <simple-slider-item class="gallery__thumbnail">
                            5
                        </simple-slider-item>
                        <simple-slider-item class="gallery__thumbnail">
                            6
                        </simple-slider-item>
                    </simple-slider>
                    <div class="simple-slider-prev" on-click="prevSliderHandle">prev</div>
                    <div class="simple-slider-next" on-click="nextSliderHandle">next</div>

                    <iron-a11y-keys id="prevkey"  keys="left"
                                    on-keys-pressed="onPrev"></iron-a11y-keys>

                    <iron-a11y-keys id="nextkey" keys="right"
                                    on-keys-pressed="onNext"></iron-a11y-keys>

                    <iron-a11y-keys id="hidekey" keys="esc"
                                    on-keys-pressed="onEsc"></iron-a11y-keys>


                </div>
            </div>
        </div>
        <!-- /modal -->
        <div class="modal modal--default timeline-modal fixed">
            <div id="timelineWrapper" class="timeline-wrapper">
                <div id="visualization" class="timeline-inner"></div>
            </div>
        </div>
        <!-- /modal -->
    @else
        这篇文章还在审核中
    @endif
@stop

@section('script')
    <script src="/js/rangeSlider.js"></script>
    <script src="/bower_components/jquery/dist/jquery.js"></script>
    <script src="/js/lib/vis-custom.min.js"></script>
    <script src="/assets/pc/lib/vis-timeline.js"></script>
    <script src="/pc/controller/article/show.js"></script>
@stop