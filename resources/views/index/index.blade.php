@extends('base')

@section('head')
    <link rel="stylesheet" href="/assets/pc/css/layout.css"/>
    <link rel="stylesheet" href="/assets/pc/css/index.css"/>
    <link rel="import" href="/bower_components/iron-selector/iron-selector.html">
    <link rel="import" href="/bower_components/iron-ajax/iron-ajax.html">
    <link rel="import" href="/bower_components/iron-list/iron-list.html">
    <link rel="import" href="/assets/pc/elements/view-controller/view-controller.html">
    <link rel="import" href="/assets/pc/elements/lfx-modal/lfx-modal.html">
    <link rel="import" href="/assets/pc/elements/audio-player/audio-player.html">
    <link rel="import" href="/assets/pc/elements/toggle-button/toggle-button.html">
@stop

@section('content')
    <div class="full-fixed body-background">
    </div>
    <view-controller id="index">
        <main>
            <ul class="silder-nav silder-nav--default" id="sliderNav">
                <iron-selector id="selector" selected="0">
                    <li class="silder-nav__item">
                        <div class="btn" slider-index="0">1</div>
                    </li>
                    <li class="silder-nav__item">
                        <div class="btn" slider-index="1">2</div>
                    </li>
                    <li class="silder-nav__item">
                        <div class="btn" slider-index="2">3</div>
                    </li>
                    <li class="silder-nav__item">
                        <div class="btn" slider-index="3">4</div>
                    </li>
                    <li class="silder-nav__item">
                        <div class="btn" slider-index="4">5</div>
                    </li>
                </iron-selector>
            </ul>
            <div id="navItems" class="nav-items">
                <div class="nav-item">
                    <figure class="gallery-figure gallery-figure--default">
                        <div class="gallery-figure__img">
                            <img src="/assets/pc/img/20121108090043196.jpg">
                        </div>
                        <figcaption class="gallery-figure__caption">
                            hello
                        </figcaption>
                    </figure>
                </div>
                <div class="nav-item">
                    <figure class="gallery-figure gallery-figure--default">
                        <div class="gallery-figure__img">
                            <img src="/assets/pc/img/BILIBILI-dong.jpg">
                        </div>
                        <figcaption class="gallery-figure__caption">
                            hello
                        </figcaption>
                    </figure>
                </div>
                <div class="nav-item">
                    <figure class="gallery-figure gallery-figure--default">
                        <div class="gallery-figure__img">
                            <img src="/assets/pc/img/fate_stay_night_anime_game_magic_fight_duo_hd-wallpaper-1897519.jpg">
                        </div>
                        <figcaption class="gallery-figure__caption">
                            hello
                        </figcaption>
                    </figure>
                </div>
                <div class="nav-item">
                    <figure class="gallery-figure gallery-figure--default">
                        <div class="gallery-figure__img">
                            <img src="/assets/pc/img/gundam_00-065.jpg">
                        </div>
                        <figcaption class="gallery-figure__caption">
                            hello
                        </figcaption>
                    </figure>
                </div>
                <div class="nav-item">
                    <figure class="gallery-figure gallery-figure--default">
                        <div class="gallery-figure__img">
                            <img src="/assets/pc/img/KmakGhk.jpg">
                        </div>
                        <figcaption class="gallery-figure__caption">
                            hello
                        </figcaption>
                    </figure>
                </div>
            </div>
        </main>
        <lfx-modal class="full-fixed audio-player-modal">
            <div class="vis-audio-player vis-audio-player--default">
                <div class="vis-audio-player__list">
                    <iron-ajax id="hihi" url="/assets/pc/data/local.json" last-response="{{data}}" auto></iron-ajax>
                    <iron-list items="[[data]]" as="item">
                        <template>
                            <div class="vis-audio-player__list-item">
                                <div>Name: <span>[[item.name]]</span></div>
                            </div>
                        </template>
                    </iron-list>
                </div>
            </div>

            <audio-player jsonurl="/assets/pc/data/local.json"></audio-player>
        </lfx-modal>
    </view-controller>
@stop

@section('script')
    <script src="/js/rangeSlider.js"></script>
    <script src="/assets/pc/controller/index.js"></script>
    <script>
        window.addEventListener("WebComponentsReady", function(){
            const ACTIVE_CLASS_NAME = 'show';

            var navitemsDom = document.querySelector('#navItems');

            var position = genneratePosition();
            var indices = [0, 1, 2, 3, 4];
            var opacityes = [];
            var zindexes = [5, 4, 3, 2, 1];

            // init
            var navItemsChildren = navitemsDom.querySelectorAll('.nav-item');
            
            Array.prototype.slice.call(navItemsChildren).forEach(function(item, idx) {
                // 收集opacity
                var computestyle = window.getComputedStyle(item);
                opacityes[idx] = computestyle.opacity;
            });

            function generateIndices(indices, index) {
                var icopy = indices.map(function(item){
                    return item;
                });
                var change = 0;

                for (var i = 0; i < indices.length - index; i++) {
                    indices[i] = indices[i + index];
                }

                for (var i = 0; i < index; i++) {
                    indices[indices.length - index + i] = icopy[i];
                }

                return indices;
            }

            function genneratePosition() {
                var position = [];

                function handle(i) {
                    var navitem = navitemsDom.children.item(i);
                    var rect =  navitem.getBoundingClientRect();
                    position.push({
                        x: rect.left,
                        y: rect.top
                    });
                }

                for (var i = 0; i < navitemsDom.children.length; i++) {
                    handle(i);
                }

                return position;
            }

            function beforeChange(index) {
                function handle(i) {
                    var navitem = navitemsDom.children.item(indices[i]);
                    var attributes = Object.assign({}, {
                        y: '+=1000'
                    }, {
                        delay: (i - 1) * 0.3,
                        opacity: 0
                    });
                    TweenMax.to(navitem, 0.3, attributes);
                }

                for (var i = 0; i < index; i++) {
                    handle(i);
                }
            }


            function afterChange(index, completeAll) {
                var after = generateIndices(indices.map(function(item){
                    return item
                }), index);
//                console.log(after);

                function handle(i) {
                    var navitem = navitemsDom.children.item(indices[i]);
                    var opacity = parseFloat(getComputedStyle(navitem)['opacity']);
//                    console.log('移动是' + i);
//                    console.log('目标是' + after.indexOf(indices[i]));
                    var attributes = Object.assign({}, {
                        left: position[i - index].x,
                        top: position[i - index].y
                    }, {
                        delay: (i - 1) * 0.3,
                        opacity: opacityes[after.indexOf(indices[i])],
                        zIndex: zindexes[after.indexOf(indices[i])]
                    });
                    if (i == navitemsDom.children.length - 1) {
                        attributes.onComplete = function() {
                            completeAll();
                        }
                    }
                    TweenMax.to(navitem, 0.3, attributes);
                }

                for (var i = index; i < navitemsDom.children.length; i++) {
                    handle(i);
                }
            }

            function resetChange(index) {
                var after = generateIndices(indices.map(function(item){
                    return item
                }), index);

                function handle(i) {
                    var navitem = navitemsDom.children.item(indices[i]);
                    var attributes = Object.assign({}, {
                        x: 0,
                        y: 0,
                        left: position[(navitemsDom.children.length - index) + i].x,
                        top: position[(navitemsDom.children.length - index) + i].y
                    }, {
                        delay: (i + 1) * 0.3,
                        opacity: opacityes[after.indexOf(indices[i])],
                        zIndex: zindexes[after.indexOf(indices[i])]
                    });
                    if (i == index - 1) {
                        attributes.onComplete = function(){
                            setTimeout(function(){
                                indices = generateIndices(indices, index);
                                console.log(indices);
                            }, 300 * (i + 1));
                        }
                    }
                    TweenMax.to(navitem, 0.3, attributes);
                }

                for (var i = 0; i < index; i++) {
                    handle(i);
                }
            }

            function go(index) {
                var sliderIndex = index;
                beforeChange(sliderIndex);
                afterChange(sliderIndex, function () {
                    resetChange(sliderIndex);
                });
            }

            var slideNavItems = document.querySelectorAll('#sliderNav .btn');

//            console.dir(slideNavItems);
            
            var indexes = [0, 1, 2, 3, 4];

            function handle(index) {
                var sliderNavItem = slideNavItems[index];
                var sliderIndex = parseInt(sliderNavItem.getAttribute('slider-index'));

//                console.dir(sliderNavItem);
                
                sliderNavItem.addEventListener('click', function handle(){
                    console.log('请求第' + (sliderIndex +1));
                    var num = indices.indexOf(indexes[index]);
                    console.log(num);
                    if (num > 0) {
                        go(num);
                    }
                }, false)
            }

            for (var i = 0; i < slideNavItems.length; i++) {
                handle(i);
            }
        });
    </script>
@stop