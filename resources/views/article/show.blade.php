@extends('base')

@section('head')
    <link rel="stylesheet" href="/bower_components/editor.md/css/editormd.preview.css">
    <link rel="import" href="/bower_components/iron-selector/iron-selector.html">
    <link rel="import" href="/bower_components/paper-button/paper-button.html">
    <link rel="import" href="/bower_components/iron-icons/av-icons.html">
    <link rel="import" href="/components/lfx-player.html">
    <link rel="stylesheet" href="/css/range_slider.css">
    <link rel="stylesheet" href="/css/article/show.css">
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
    @else
        这篇文章还在审核中
    @endif
@stop

@section('script')
    <script src="/js/rangeSlider.js"></script>
    <script src="/bower_components/jquery/dist/jquery.js"></script>
@stop