@extends('base')

@section('head')
    <link rel="import" href="bower_components/zhilizhili-slider/slider-item.html">
    <link rel="import" href="bower_components/zhilizhili-slider/zhilizhili-slider.html">
    <link rel="import" href="../bower_components/paper-styles/paper-styles.html">        
    <link rel="stylesheet" href="/css/app.css"/>
    <script src="/bower_components/gsap/src/minified/TimelineMax.min.js"></script>
    <script src="/js/modernizr.js"></script>
    <link rel="import" href="../bower_components/zhilizhili-loading/zhilizhili-loading.html">  
    <style is="custom-style">
        /**
         *  zhilizhili-loading
         */
        zhilizhili-loading {
          width: 100vw;
          height: 100vh;
          background-color: #0ba5eb;
          position: absolute;
          z-index: 1000;
          left: 0;
          top: 0;
        }

        zhilizhili-loading ::content .loading-content > img.zhilizhili-loading {
          margin-left: 10px;
          margin-right: 10px;
          position: relative;
        }

        zhilizhili-loading ::content .loading-content > img.zhilizhili-loading:nth-child(odd) {
          transform: translate3d(0, -20px, 0);
        }

        zhilizhili-loading ::content .loading-content > img.zhilizhili-loading:nth-child(even) {
          transform: translate3d(0, 20px, 0);
        }   

        zhilizhili-loading ::content .loading-text {
          margin-top: 40px;
        }

        zhilizhili-loading ::content .loading-text h3 {
          font-size: 27px;
          color: #ffffff;
          letter-spacing: 7px;
          font-family: Verdana;
        }

        /**
         * zhilizhili-slider
         */
        zhilizhili-slider ::content .zhilizhili-slider-wrapper {
            width: 100%;
            display: none;
        }        
    </style>
@stop

@section('content')
        <zhilizhili-loading imgpath="assets/img/loading/" loadingtime="15300">
            <h3>关于我</h3>
        </zhilizhili-loading>
    <template id="app" is="dom-bind">
        <div class="layout vertical center-center theater" id="introduction">
            <div class="scene">
                <div><span id="me">测试文字</span></div>
            </div>

            <pre id="nodebug"><code>
                theater.write(
                <span id="log"></span>
                );
            </code></pre>
        </div>
        <zhilizhili-slider id="page-content" direction="vertical">
            <slider-item>
                {{-- page1 --}}
                你好 我叫<% $name %>
                <div id="allmap">
                </div>
            </slider-item>
            <slider-item>
            </slider-item>
            <slider-item>
            </slider-item>
            <slider-item>
            </slider-item>
            <slider-item>
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
    <script src="bower_components/TheaterJS/build/theater.js"></script>
    <script src="http://api.map.baidu.com/api?v=2.0&ak=3K4LGyRxytdEBnZmcwPbrtF5"></script>
    <script src="/js/three.min.js"></script>
    <script src="/controller/index/about.js"></script>

                <script src="/bower_components/jquery.easing/js/jquery.easing.js"></script>
                <script src="/bower_components/jquery-mousewheel/jquery.mousewheel.min.js"></script>
                <script src="/bower_components/swfobject/swfobject/src/swfobject.js"></script>
                <script src="/bower_components/stats.js/build/stats.min.js"></script>
                <script src="/js/buffer-loader.js"></script>

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