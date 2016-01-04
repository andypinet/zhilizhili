<!doctype html>
<html class="" lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Mobile Component</title>

    <script>
        if (typeof CSS === "undefined") {
            document.querySelector("html").classList.add("not-support-highlevelcss");
        } else {
            document.querySelector("html").classList.add("support-highlevelcss");
        }
        // https://github.com/jieyou/rem_layout
        !function(a,b,c){function q(){var d=Math.min((o?e[h]().width:f.innerWidth)/(a/b),c);d!=p&&(k.innerHTML="html{font-size:"+d+"px!important;"+n+"}",p=d)}function r(){clearTimeout(l),l=setTimeout(q,500)}var l,d=document,e=d.documentElement,f=window,g="addEventListener",h="getBoundingClientRect",i="pageshow",j=d.head||d.getElementsByTagName("HEAD")[0],k=d.createElement("STYLE"),m="text-size-adjust:100%;",n="-webkit-"+m+"-moz-"+m+"-ms-"+m+"-o-"+m+m,o=h in e,p=null;a=a||320,b=b||16,c=c||32,j.appendChild(k),d[g]("DOMContentLoaded",q,!1),"on"+i in f?f[g](i,function(a){a.persisted&&r()},!1):f[g]("load",r,!1),f[g]("resize",r,!1),q()}(
                320, // 设置设计稿基准宽度
                16, // 设置开发时的被除数（见HOW TO USE第4步） 在设计稿基准宽度为320时最好设置为16（在在设计稿基准宽度为其他值时等比放大，如640时设置为32等）。因为浏览器默认的值就是16，这样代码失效或尚未起效时，不会有布局问题
                32 // 设置最大根元素font-size，请注意这是一个css像素值，而非物理像素值。它的作用是，当用户用非常宽的屏幕（pad、pc）访问页面时，不至于使得根元素的font-size超过这个值，使得布局非常难看。见图“show/wide_max_rem.jpg”
        );
    </script>
    <style>
        .layout.collection-view.phone-test > .layout__item {
            width: 23%;
            width: calc(99.99% * 1/4 - (0px - 0px * 1/4)); }
    </style>
    <script src="/assets/static/oldie/calc-polyfill.js?v=<% rand(0, 1000) %>"></script>
    <script src="/assets/static/oldie/picturefill.js?v=<% rand(0, 1000) %>"></script>
    <link rel="stylesheet" href="/assets/static/css/normalize.css">
    <link rel="stylesheet" href="/assets/mobile/css/ui/tde.css?v=<% rand(0, 1000) %>">
    <script src="/assets/static/js/dom4.min.js"></script>
</head>
<body class="ui-tde dark-style">
    <%--@include("ui.ceshi.layout")--%>
    @include("ui.ceshi.phone")
</body>
<script src="/assets/mobile/controller/mobile.js"></script>
</html>