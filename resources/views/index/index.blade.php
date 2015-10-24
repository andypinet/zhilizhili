@extends('base')

@section('head')
    <link rel="stylesheet" href="/css/index/index.css"/>
    <link rel="import" href="/bower_components/iron-ajax/iron-ajax.html">
    <link rel="import" href="/bower_components/zhilizhili-slider/zhilizhili-slider.html">
    <link rel="import" href="/bower_components/zhilizhili-slider/slider-item.html">
    <link rel="import" href="/components/simple-slider.html">
    <link rel="import" href="/components/simple-slider-item.html">
    <style is="custom-style">
        #slider simple-slider {
            position: relative;
            display: block;
            width: 1200px;
            height: 170px;
            overflow: hidden;
        }

        #slider simple-slider ::content .simple-slider-wrapper {
            position: absolute;
            width: 999em;
            transition: all 1s ease;
        }

        #slider simple-slider simple-slider-item {
            float: left;
            width: 240px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        #slider simple-slider simple-slider-item ::content div {
            display: block;
            width: 220px;
        }
    </style>
@stop

@section('content')
    <template id="app" is="dom-bind">
        <h1>zhilizhili beta</h1>
        <zhilizhili-slider id="slider" direction="vertical">
            <slider-item>
                <div class="movies">
                    @if(count($articles) > 0)
                        <simple-slider>
                            @foreach($articles as $article)
                                <simple-slider-item>
                                    <div><% $article->title %></div>
                                </simple-slider-item>
                            @endforeach
                        </simple-slider>
                        <div class="simple-slider-prev">prev</div>
                        <div class="simple-slider-next">next</div>
                    @endif
                </div>
                <div>{{index}}</div>
            </slider-item>
        </zhilizhili-slider>
        <iron-ajax id="ajax"
                url="http://192.168.0.103:5000/user/ajax"
                params='{"_token": "<% csrf_token() %>"}'
                method="GET"
                last-response="{{ajaxResponse}}"
                headers='{"prop": "1"}'
        ></iron-ajax>
        <div>{{ajaxResponse.content}}</div>
    </template>
@stop

@section('script')
    <script src="bower_components/TheaterJS/build/theater.js"></script>
    <script src="/controller/index/index.js"></script>
@stop