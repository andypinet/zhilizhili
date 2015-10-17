@extends('base')

@section('head')
    <link rel="stylesheet" href="/css/app.css"/>
    <script src="/js/modernizr.js"></script>
@stop

@section('content')
    你好 我叫<% $name %>

    <div id="main"></div>
    <div id="bg"></div>
    <div id="loading"></div>
    <div id="record"></div>
    <div id="footer"></div>
    <div id="top"></div>
    <div id="gameUi"></div>
    <div id="debug"></div>
    <div id="restart"></div>

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
    <script src="/js/main.js"></script>
@stop