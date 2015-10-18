@extends('base')

@section('head')
    <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="bower_components/polymer/polymer.html">
    <link rel="import" href="bower_components/paper-slider/paper-slider.html">
    <link rel="stylesheet" href="/css/app.css"/>
@stop

@section('content')
    <template id="app" is="dom-bind">
        <h1>zhilizhili beta</h1>
        <div class="theater">
            <div class="scene">
                <div>- <span id="vader"></span></div>
                <div>- <span id="luke"></span></div>
            </div>

            <pre id="nodebug"><code>
                theater.write(
                <span id="log"></span>
                );
            </code></pre>
        </div>

        <div class="test">
            测试
        </div>
        <div class="boxes">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
        </div>

        <div id="controls">
            <button id="play">play</button>
            <button id="pause">pause</button>
            <button id="reverse">reverse</button>
            <button id="resume">resume</button>
            <button id="restart">restart</button>
        </div>

        <paper-slider value="0" on-immediate-value-change="changeAnimation"></paper-slider>
    </template>
@stop

@section('script')
    <script src="/bower_components/jquery/dist/jquery.js"></script>
    <script src="/bower_components/gsap/src/uncompressed/TweenMax.js"></script>
    <script src="/bower_components/gsap/src/uncompressed/TimelineLite.js"></script>
    <script src="bower_components/TheaterJS/build/theater.js"></script>
    <script src="/controller/index/index.js"></script>
@stop