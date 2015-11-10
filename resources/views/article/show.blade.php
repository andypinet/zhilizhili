@extends('base')

@section('head')
    <link rel="stylesheet" href="/bower_components/editor.md/css/editormd.preview.css">
    <link rel="import" href="/bower_components/iron-selector/iron-selector.html">
    <link rel="import" href="/bower_components/paper-button/paper-button.html">
    <link rel="import" href="/bower_components/iron-icons/av-icons.html">
    <link rel="import" href="/bower_components/iron-selector/iron-selector.html">
    <link rel="import" href="/bower_components/zhilizhili-slider/slider-item.html">
    <link rel="import" href="/bower_components/zhilizhili-slider/zhilizhili-slider.html">
    <link rel="import" href="/bower_components/iron-a11y-keys/iron-a11y-keys.html">
    <link rel="import" href="/components/simple-slider.html">
    <link rel="import" href="/components/simple-slider-item.html">

    <link rel="import" href="/components/lfx-player.html">

    <script src="/framework/utils.js"></script>

    <link rel="stylesheet" href="/css/range_slider.css">
    <link rel="stylesheet" href="/pc/css/layout.css">
    <link rel="stylesheet" href="/pc/css/article/show.css">
@stop

@section('content')
    <nav id="articleNav" class="article-nav">
        @if(count($types))
            @foreach($types as $type)
                <a href="<% url('article/type', $type->id) %>"><% $type->label %></a>
            @endforeach
        @endif
    </nav>
    @if(!is_null(Auth::user()) && Auth::user()->isAdmin() || $article->status == 1)
        @can('admin_access')
        <a href="">编辑文章</a>
        @endcan
        <main>
            <h3 class="video-title"><a href=""><% $article->title %></a></h3>
            <div class="layout horizontal">
                <div class="video-up">
                    <div class="video-up-name">
                        up主 <span><% $article->user->name %></span>
                    </div>
                </div>
            </div>
            <article>
                <div class="row">
                    <div class="col-xs video-play">
                        <div class="layout horizontal">
                            <lfx-player src="http://192.168.0.106/wohejimi.mp4"></lfx-player>
                        </div>
                    </div>
                    <div class="col-xs video-danmu">
                        <div class="layout horizontal ">
                            right
                        </div>
                    </div>
                </div>
            </article>
        </main>
        <div id="test" class="modal modal--default full-fixed">
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


                </div>
            </div>
        </div>
    @else
        这篇文章还在审核中
    @endif
@stop

@section('script')
    <script src="/js/rangeSlider.js"></script>
    <script src="/bower_components/jquery/dist/jquery.js"></script>
    <script src="/pc/controller/article/show.js"></script>
@stop