@extends('base')

@section('head')
    <link rel="import" href="/bower_components/iron-selector/iron-selector.html">
    <link rel="import" href="/bower_components/paper-slider/paper-slider.html">
    <link rel="import" href="/bower_components/paper-button/paper-button.html">
    <link rel="import" href="/bower_components/iron-icons/av-icons.html">
    <link rel="import" href="/components/lfx-player.html">
    <link rel="stylesheet" href="/css/range_slider.css">
    <link rel="stylesheet" href="/css/article/index.css">
@stop

@section('content')
    <input type="range" min="0" max="2142" data-rangeSlider>
    <nav id="articleNav" class="article-nav">
        @if(count($types))
            @foreach($types as $type)
                <a href="<% url('article/type', $type->id) %>"><% $type->label %></a>
            @endforeach
        @endif
    </nav>
    <div class="row">
        <div class="col-xs videos">
            @if(count($articles))
                <div class="row">
                    @foreach($articles as $article)
                        <div class="col-xs-3 video">
                            <h3><a href="<% url('article', $article->id) %>"><% $article->title %></a></h3>
                            <div class="info">
                                <div><% $article->slug %></div>
                            </div>
                            <div class="hidden info-empty">
                                还没有内容
                            </div>
                        </div>
                    @endforeach
                </div>
                <div class="layout horizontal center">
                    <div class="paignation">
                        <iron-selector selected="<% $articles->currentPage() - 1 %>">
                            @for ($i = 0; $i < $articles->lastPage(); $i++)
                                <paper-button raised>
                                    <a href="<% url('article/type', $type_id).'?page='.($i+1) %>"><% $i + 1 %></a>
                                </paper-button>
                            @endfor
                        </iron-selector>
                    </div>
                    <span>共<% $articles->total() %>篇</span>
                </div>
            @else
                我们还没有发布一篇文章
            @endif
        </div>
        <div class="col-xs videoshow">
            <div class="layout vertical center">
                <lfx-player src="http://192.168.0.106/wohejimi.mp4"></lfx-player>
                <div class="layout vertical self-start video-info">
                </div>
            </div>
        </div>
    </div>
@stop

@section('script')
    <script src="/js/rangeSlider.js"></script>
    <script src="/controller/article/index.js"></script>
    <script>
        window.addEventListener('WebComponentsReady', function(){
            var elements = document.querySelectorAll('input[type="range"][data-rangeSlider]');
            console.log(elements);
            rangeSlider.create(elements);
        });
    </script>
@stop