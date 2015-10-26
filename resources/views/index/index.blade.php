@extends('base')

@section('head')
    <link rel="stylesheet" href="/css/index/index.css"/>
    <link rel="import" href="/bower_components/iron-ajax/iron-ajax.html">
    <link rel="import" href="/bower_components/zhilizhili-slider/zhilizhili-slider.html">
    <link rel="import" href="/bower_components/zhilizhili-slider/slider-item.html">
    <link rel="import" href="/components/simple-slider.html">
    <link rel="import" href="/components/simple-slider-item.html">
    <link rel="import" href="/components/top-bar.html">
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

        .square {
            text-align: center;
            line-height: 170px;
            font-size: 20px;
        }
    </style>
@stop

@section('content')
    <template id="app" is="dom-bind">
        <top-bar>
            @if (isset($userInfo))
                <div id="user-info" class="user-info">
                    <a href="<% url('user', $userInfo->id) %>" class="user-info-home"><span class="user-info-name"><% $userInfo->name %></span></a>
                </div>
            @endif
        </top-bar>
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
    <main>
        <div class="square-container">
            <div class="square">zhilizhili beta</div>
        </div>
    </main>
    <%-- <main>
        <h1>zhilizhili beta</h1>
        <ul id="sliderNav">
            <li>
                <div class="btn" slider-index="0">1</div>
            </li>
            <li>
                <div class="btn" slider-index="1">2</div>
            </li>
            <li>
                <div class="btn" slider-index="2">3</div>
            </li>
            <li>
                <div class="btn" slider-index="3">4</div>
            </li>
            <li>
                <div class="btn" slider-index="4">5</div>
            </li>
        </ul>
        <div class="nav-items">
            <div class="nav-item">1</div>
            <div class="nav-item">2</div>
            <div class="nav-item">3</div>
            <div class="nav-item">4</div>
            <div class="nav-item">5</div>
        </div>
    </main> --%>
@stop

@section('script')
    <script src="bower_components/TheaterJS/build/theater.js"></script>
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="/js/move.js"></script>
    <script src="/controller/index/index.js"></script>
    <script>
//        const ACTIVE_CLASS_NAME = 'show';
//
//        var navitemsDom = document.querySelector('.nav-items');
//
//        var position = genneratePosition();
//        var indices = [0, 1, 2, 3, 4];
//
//        function generateIndices(indices, index) {
//            var icopy = indices.map(function(item){
//                return item;
//            });
//            var change = 0;
//
//            for (var i = 0; i < indices.length - index; i++) {
//                indices[i] = indices[i + index];
//            }
//
//            for (var i = 0; i < index; i++) {
//                indices[indices.length - index + i] = icopy[i];
//            }
//
//            return indices;
//        }
//
////        indices = generateIndices(indices, 3);
////        console.log(indices);
//
//        function genneratePosition() {
//            var position = [];
//
//            function handle(i) {
//                var navitem = navitemsDom.children.item(i);
//                var rect =  navitem.getBoundingClientRect();
//                position.push({
//                    x: rect.left,
//                    y: rect.top
//                });
//            }
//
//            for (var i = 0; i < navitemsDom.children.length; i++) {
//                handle(i);
//            }
//
//            return position;
//        }
//
//        function beforeChange(index) {
//            function handle(i) {
//                var navitem = navitemsDom.children.item(indices[i]);
//                var attributes = Object.assign({}, {
//                    y: '+=1000'
//                }, {
//                    delay: (i - 1) * 0.3,
//                    opacity: 0
//                });
//                TweenMax.to(navitem, 0.3, attributes);
//            }
//
//            for (var i = 0; i < index; i++) {
//                handle(i);
//            }
//        }
//
//        var opacityes = [1, 0.8, 0.6, 0.4, 0.2];
//        var zindexes = [5, 4, 3, 2, 1];
//
//        function afterChange(index, completeAll) {
//            var after = generateIndices(indices.map(function(item){
//                return item
//            }), index);
//            console.log(after);
//
//            function handle(i) {
//                var navitem = navitemsDom.children.item(indices[i]);
//                var opacity = parseFloat(getComputedStyle(navitem)['opacity']);
//                console.log('移动是' + i);
//                console.log('目标是' + after.indexOf(indices[i]));
//                var attributes = Object.assign({}, {
//                    left: position[i - index].x,
//                    top: position[i - index].y
//                }, {
//                    delay: (i - 1) * 0.3,
//                    opacity: opacityes[after.indexOf(indices[i])],
//                    zIndex: zindexes[after.indexOf(indices[i])]
//                });
//                if (i == navitemsDom.children.length - 1) {
//                    attributes.onComplete = function() {
//                        completeAll();
//                    }
//                }
//                TweenMax.to(navitem, 0.3, attributes);
//            }
//
//            for (var i = index; i < navitemsDom.children.length; i++) {
//                handle(i);
//            }
//        }
//
//        function resetChange(index) {
//            var after = generateIndices(indices.map(function(item){
//                return item
//            }), index);
//
//            function handle(i) {
//                var navitem = navitemsDom.children.item(indices[i]);
//                var attributes = Object.assign({}, {
//                    x: 0,
//                    y: 0,
//                    left: position[(navitemsDom.children.length - index) + i].x,
//                    top: position[(navitemsDom.children.length - index) + i].y
//                }, {
//                    delay: (i + 1) * 0.3,
//                    opacity: opacityes[after.indexOf(indices[i])],
//                    zIndex: zindexes[after.indexOf(indices[i])]
//                });
//                if (i == index - 1) {
//                    attributes.onComplete = function(){
//                        setTimeout(function(){
//                            indices = generateIndices(indices, index);
//                            console.log(indices);
//                        }, 300 * (i + 1));
//                    }
//                }
//                TweenMax.to(navitem, 0.3, attributes);
//            }
//
//            for (var i = 0; i < index; i++) {
//                handle(i);
//            }
//        }
//
//        function go(index) {
//            var sliderIndex = index;
//            beforeChange(sliderIndex);
//            afterChange(sliderIndex, function () {
//                resetChange(sliderIndex);
//            });
//        }
//
//        var slideNavItems = document.querySelectorAll('#sliderNav .btn');
//
//        var indexes = [0, 1, 2, 3, 4];
//
//        function handle(index) {
//            var sliderNavItem = slideNavItems[index];
//            var sliderIndex = parseInt(sliderNavItem.getAttribute('slider-index'));
//
//            sliderNavItem.addEventListener('click', function handle(){
//                console.log('请求第' + (sliderIndex +1));
//                var num = indices.indexOf(indexes[index]);
//                console.log(num);
//                if (num > 0) {
//                    go(num);
//                }
//            }, false)
//        }
//
//        for (var i = 0; i < slideNavItems.length; i++) {
//            handle(i);
//        }
    </script>
@stop