@extends('base')

@section('head')
    <script src="/bower_components/gsap/src/minified/TweenMax.min.js"></script>
    <link rel="import" href="bower_components/zhilizhili-slider/slider-item.html">
    <link rel="import" href="bower_components/zhilizhili-slider/zhilizhili-slider.html">
    <link rel="import" href="../bower_components/paper-styles/paper-styles.html">
    <script src="/bower_components/gsap/src/minified/TimelineMax.min.js"></script>
    <script src="/js/modernizr.js"></script>
    <link rel="import" href="../bower_components/zhilizhili-loading/zhilizhili-loading.html">
    <link rel="import" href="/assets/pc/elements/view-controller/view-controller.html">
    <link rel="stylesheet" href="/assets/pc/css/about/index.css">
    <style is="custom-style">
        /**
         *  zhilizhili-loading
         */
        zhilizhili-loading {
          width: 100vw;
          height: 100vh;
          background-image: url("/assets/pc/img/about-bg.jpg");
          background-size: 100%;
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

        zhilizhili-loading.end {
            display: none;
            z-index: -1;
        }
    </style>
@stop

@section('content')
    <zhilizhili-loading imgpath="assets/img/loading/" loadingtime="7500">
        <h3>一个愉快的自我介绍 ↖(^ω^)↗</h3>
    </zhilizhili-loading>

    <template id="app" is="dom-bind">
        <view-controller id="index">
            <div class="layout vertical center-center theater introduction" id="introduction">
                <div class="scene">
                    <div><span class="three-text" id="me"></span></div>
                </div>
            </div>
            <zhilizhili-slider id="page-content" direction="vertical">
                <slider-item>
                    <div class='business-card'>
                        <div class='business-card__logo'>
                            <figure><i></i></figure>
                            <h2>Zhilizhili Studio</h2>
                        </div>
                        <div class='business-card__tagline'>
                            <p>zhilizhili是一个邀请制的创作平台 <br> 目前主要是音乐</p>
                        </div>
                    </div>
                </slider-item>
                <slider-item>
                    <div id="allmap">
                    </div>
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
            </zhilizhili-slider>
        </view-controller>
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
    <script src="http://api.map.baidu.com/api?v=2.0&ak=3K4LGyRxytdEBnZmcwPbrtF5"></script>
    <script src="/js/three.min.js"></script>
    <script src="/assets/pc/controller/about/index.js"></script>

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