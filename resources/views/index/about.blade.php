@extends('base')

@section('head')
    <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="bower_components/polymer/polymer.html">
    <link rel="import" href="bower_components/zhilizhili-slider/slider-item.html">
    <link rel="import" href="bower_components/zhilizhili-slider/zhilizhili-slider.html">
    <link rel="stylesheet" href="/css/app.css"/>
    <script src="/js/modernizr.js"></script>
    <script src="http://api.map.baidu.com/api?v=2.0&ak=3K4LGyRxytdEBnZmcwPbrtF5"></script>
    <script src="bower_components/three.js/build/three.min.js"></script>
@stop

@section('content')
    <template id="app" is="dom-bind">
        <div class="theater" id="introduction">
            <div class="scene">
                <div>- <span id="me"></span></div>
            </div>

            <pre id="nodebug"><code>
                theater.write(
                <span id="log"></span>
                );
            </code></pre>
        </div>
        <zhilizhili-slider id="page-content" direction="vertical">
            <slider-item>
                <img src="http://dummyimage.com/650x450/00cfba/dcffcc&text=slider 1" alt=""/>
                你好 我叫<% $name %>
                <div id="allmap">
                </div>
            </slider-item>
            <slider-item>
            </slider-item>
            <slider-item>
                <img src="http://dummyimage.com/650x450/00cfba/dcffcc&text=slider 3" alt=""/>
            </slider-item>
            <slider-item>
                <img src="http://dummyimage.com/650x450/00cfba/dcffcc&text=slider 4" alt=""/>
            </slider-item>
            <slider-item>
                <img src="http://dummyimage.com/650x450/00cfba/dcffcc&text=slider 5" alt=""/>
            </slider-item>
        </zhilizhili-slider>      
    </template>

                <div id="main"></div>
                <div id="bg"></div>
                <div id="loading"></div>
                <div id="record"></div>
                <div id="footer"></div>
                <div id="top"></div>
                <div id="gameUi"></div>
                <div id="debug"></div>
                <div id="restart"></div>      
@stop

@section('script')
    <script src="/bower_components/jquery/dist/jquery.js"></script>
    <script src="/bower_components/gsap/src/uncompressed/TweenMax.js"></script>
    <script src="/bower_components/gsap/src/uncompressed/TimelineLite.js"></script>
    <script src="bower_components/TheaterJS/build/theater.js"></script>
    <script src="/controller/index/about.js"></script>

                <script src="/bower_components/jquery/dist/jquery.js"></script>
                <script src="/bower_components/jquery.easing/js/jquery.easing.js"></script>
                <script src="/bower_components/jquery-mousewheel/jquery.mousewheel.min.js"></script>
                <script src="/bower_components/swfobject/swfobject/src/swfobject.js"></script>
                <script src="/bower_components/stats.js/build/stats.min.js"></script>
                <script src="/js/buffer-loader.js"></script>

                <script src="/bower_components/three.js/build/three.js"></script>
                <script src="/js/EffectComposer.js"></script>
                <script src="/js/MaskPass.js"></script>
                <script src="/js/CopyShader.js"></script>
                <script src="/js/RenderPass.js"></script>
                <script src="/js/ShaderPass.js"></script>
                <script src="/js/OBJLoader.js"></script>
                <script src="/js/Projector.js"></script>
                <script src="/js/Detector.js"></script>

                <script src="/js/shader/BrightnessContrastShader.js"></script>
                <script src="/js/shader/VignetteShader.js"></script>
                <script src="/js/shader/zoomBlur.js"></script>

                <script src="/js/myfw.js"></script>
                <script src="/js/mywebgl.js"></script>  
@stop