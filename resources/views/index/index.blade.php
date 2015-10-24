@extends('base')

@section('head')
    <link rel="stylesheet" href="/css/index/index.css"/>
    <link rel="import" href="/bower_components/iron-ajax/iron-ajax.html">
    <link rel="import" href="/bower_components/zhilizhili-slider/zhilizhili-slider.html">
    <link rel="import" href="/bower_components/zhilizhili-slider/slider-item.html">
    <link rel="import" href="/components/simple-slider.html">
    <link rel="import" href="/components/simple-slider-item.html">
    <style is="custom-style">
        simple-slider {
            display: block;
            position: relative;
            width: 1200px;
            height: 170px;
            overflow: hidden;
        }

        simple-slider ::content .simple-slider-wrapper {
            position: absolute;
            width: 999em;
            transition: all 1s ease;
        }

        simple-slider simple-slider-item {
            float: left;
            width: 240px;
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 1200px;
        }

        simple-slider simple-slider-item ::content div {
            width: 220px;
        }
    </style>
@stop

@section('content')
    <template id="app" is="dom-bind">
        <div class="movies" style="display: none;">
            @if(count($articles) > 0)
                <simple-slider>
                    @foreach($articles as $article)
                        <simple-slider-item>
                            <div class="video-card">
                                <header>
                                    <% $article->title %>
                                </header>
                            </div>
                        </simple-slider-item>
                    @endforeach
                </simple-slider>
                <div class="simple-slider-prev">prev</div>
                <div class="simple-slider-next">next</div>
            @endif
        </div>
        <div>{{index}}</div>
        <iron-ajax id="ajax"
                url="http://192.168.0.100:5000/user/ajax"
                params='{"_token": "<% csrf_token() %>"}'
                method="GET"
                last-response="{{ajaxResponse}}"
                headers='{"prop": "1"}'
        ></iron-ajax>
        <div>{{ajaxResponse.content}}</div>
    </template>
    <%-- <main>
        <div class="square-container">
            <div class="square"></div>
        </div>
    </main> --%>
    <main>
        <h1>zhilizhili beta</h1>
        <div class="nav-items">
            <div class="nav-item">1</div>
            <div class="nav-item">2</div>
            <div class="nav-item">3</div>
            <div class="nav-item">4</div>
            <div class="nav-item">5</div>
        </div>
    </main>
@stop

@section('script')
    <script src="bower_components/TheaterJS/build/theater.js"></script>
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="/controller/index/index.js"></script>
    <script>
        const ACTIVE_CLASS_NAME = 'hide';

        var navitemsDom = document.querySelector('.nav-items');

        function change(index) {
            function handle(i) {
                var navitem = navitemsDom.children.item(i);
                TweenMax.to(navitem, 0.3, {
                    x: '-=50',
                    y: '+=50',
                    delay: (i - 1) * 0.3,
                    opacity: '+=0.2'
                });
            }

            for (var i = index; i < navitemsDom.children.length; i++) {
                handle(i);
            }
        }

        function handle(index) {
            var navitem = navitemsDom.children.item(index);
            navitem.addEventListener('click', function(){
                if (!navitem.classList.contains(ACTIVE_CLASS_NAME)) {
                    navitem.classList.add(ACTIVE_CLASS_NAME);
                    change(index + 1);
                } else {
                    navitem.classList.remove(ACTIVE_CLASS_NAME);
                }
            }, false);
        }

        for (var i = 0; i < navitemsDom.children.length; i++) {
            handle(i);
        }
    </script>
@stop