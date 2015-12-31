<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/static/css/anicollection.css?v=<% rand(0, 1000) %>">
    <link rel="stylesheet" href="/assets/mobile/css/wex/donghua.css?v=<% rand(0, 1000) %>">
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
    <script src="/assets/static/js/modernizr.min.js"></script>
    <!-- dom4级 功能 -->
    <script src="/assets/static/js/dom4.min.js"></script>
</head>
<body>
    <div class="debug"></div>
    <div class="items">
        @for($i = 0; $i < 0; $i++)
            @if($i+1 == 1)
                <div class="item beijing beijing<%$i+1%> current">
                    <%$i%>
                </div>
            @elseif ($i+1 == 2)
                <div class="item beijing beijing<%$i+1%> next">
                    <%$i%>
                </div>
            @else
                <div class="item beijing beijing<%$i+1%>">
                    <%$i%>
                </div>
            @endif
        @endfor
        <div class="item beijing beijing1 current">
            <div class="element ani text1" data-anijs="
            if: load, on: .beijing1, do: element ani text1 fadeIn ani-duration1000 animated;
            if: prev, on: .beijing1, do: element ani text1 fadeIn ani-duration1000 animated;
            if: reset, on: .beijing1, do: element ani text1 hide, to .beijing1 .text1;"></div>
            <div class="element ani text2" data-anijs="
            if: load, on: .beijing1, do: element ani text2 fadeIn delay-100 ani-duration1000 animated;
            if: prev, on: .beijing1, do: element ani text2 fadeIn delay-100 ani-duration1000 animated;
            if: reset, on: .beijing1, do: element ani text2 hide, to .beijing1 .text2;"></div>
        </div>
        <div class="item beijing beijing2">
            <div class="layout flex full-parent vertical vertical-center flex-space-between">
                <div class="layout__item">
                    <div class="element ani image1"></div>
                </div>
                <div class="layout__item">
                    <div class="element ani image2" data-anijs="if: load, on: .beijing2, do: fadeIn delay animated;"></div>
                    <div class="element ani text1" data-anijs="if: load, on: .beijing2, do: slideInLeft animated;"></div>
                    <div class="element ani text2" data-anijs="if: load, on: .beijing2, do: slideInRight animated;"></div>
                    <div class="element ani image3" data-anijs="if: load, on: .beijing2, do: fadeIn delay animated;"></div>
                    <div class="element ani image4" data-anijs="if: load, on: .beijing2, do: fadeIn delay animated;"></div>
                </div>
                <div class="layout__item">
                    <div class="element ani image5"></div>
                </div>
            </div>
        </div>
        <div class="item beijing beijing3">
            <div class="layout flex full-parent vertical vertical-center flex-space-between">
                <div class="layout__item">
                    <div class="element ani image1"></div>
                </div>
                <div class="layout__item">
                    <div class="element ani image2"></div>
                    <div class="element ani text1"></div>
                    <div class="element ani text2"></div>
                    <div class="element ani image3"></div>
                    <div class="element ani image4"></div>
                </div>
                <div class="layout__item">
                    <div class="element ani image5"></div>
                </div>
            </div>
        </div>
        <div class="item beijing beijing4">
            <div class="layout flex full-parent vertical vertical-center flex-space-between">
                <div class="layout__item">
                    <div class="element ani image1"></div>
                </div>
                <div class="layout__item">
                    <div class="element ani image2"></div>
                    <div class="element ani text1"></div>
                    <div class="element ani text2"></div>
                    <div class="element ani image3"></div>
                    <div class="element ani image4"></div>
                </div>
                <div class="layout__item">
                    <div class="element ani image5"></div>
                </div>
            </div>
        </div>
        <div class="item beijing beijing5">
            <div class="element ani text1"></div>
            <div class="element ani text2"></div>
            <div class="element ani image1"></div>
        </div>
        <div class="item beijing beijing6">
            <div class="element ani text1"></div>
            <div class="element ani text2"></div>
            <div class="element ani image1"></div>
        </div>
        <div class="item beijing beijing7">
            <div class="element ani text1"></div>
            <div class="element ani text2"></div>
        </div>
        <div class="item beijing beijing8">
            <div class="layout flex full-height vertical center">
                <div class="layout__item layout__item-head">
                    <img src="/assets/static/img/mobile/wex/donghua/8/8_03.png" alt="">
                </div>
                <div class="layout__item">
                    总有人不忍它们在寒风中流浪
                </div>
                <div class="layout__item">
                    总有人想到让这个世界越来越好
                </div>
                <div class="layout__item">
                    而爱, 会让我们都会更好
                </div>
                <div class="layout__item">
                    12月9号, 猫史∙咖啡
                </div>
                <div class="layout__item">
                    在二十多只猫咪的陪伴下
                </div>
                <div class="layout__item">
                    邀您来一起聆听这些小可爱的故事
                </div>
            </div>
        </div>
        <div class="item beijing beijing9">
            <div class="layout flex full-parent vertical center">
                <div class="layout__item layout__item-head">
                    <img src="/assets/static/img/mobile/wex/donghua/9/touxiang.png" alt="">
                </div>
                <div class="layout__item text-align-left first-p">
                    田园猫, 江湖猫称黄二傻,咖啡店第一
                </div>
                <div class="layout__item text-align-left">
                    掌柜, 身兼保安，保姆，奶妈，保镖，模特等
                </div>
                <div class="layout__item text-align-left">
                    数职. 曾经流浪街头如今定居打豆豆咖啡厅,
                </div>
                <div class="layout__item text-align-left">
                    外表无辜迷人, 内里聪慧过人, 会溜自己会开
                </div>
                <div class="layout__item text-align-left">
                    门, 偶尔客串咖啡屋保安队长站岗放哨~
                </div>
            </div>
        </div>
        <div class="item beijing beijing10">
            <div class="layout flex full-parent vertical center">
                <div class="layout__item layout__item-head">
                    <img src="/assets/static/img/mobile/wex/donghua/10/touxiang.png" alt="">
                </div>
                <div class="layout__item text-align-left first-p">
                    田园猫, 江湖猫称黄二傻,咖啡店第一
                </div>
                <div class="layout__item text-align-left">
                    掌柜, 身兼保安，保姆，奶妈，保镖，模特等
                </div>
                <div class="layout__item text-align-left">
                    数职. 曾经流浪街头如今定居打豆豆咖啡厅,
                </div>
                <div class="layout__item text-align-left">
                    外表无辜迷人, 内里聪慧过人, 会溜自己会开
                </div>
                <div class="layout__item text-align-left">
                    门, 偶尔客串咖啡屋保安队长站岗放哨~
                </div>
            </div>
        </div>
        <div class="item beijing beijing11">
            <div class="layout flex full-parent vertical center">
                <div class="layout__item layout__item-head">
                    <img src="/assets/static/img/mobile/wex/donghua/11/touxiang.png" alt="">
                </div>
                <div class="layout__item text-align-left first-p">
                    田园猫, 江湖猫称黄二傻,咖啡店第一
                </div>
                <div class="layout__item text-align-left">
                    掌柜, 身兼保安，保姆，奶妈，保镖，模特等
                </div>
                <div class="layout__item text-align-left">
                    数职. 曾经流浪街头如今定居打豆豆咖啡厅,
                </div>
                <div class="layout__item text-align-left">
                    外表无辜迷人, 内里聪慧过人, 会溜自己会开
                </div>
                <div class="layout__item text-align-left">
                    门, 偶尔客串咖啡屋保安队长站岗放哨~
                </div>
            </div>
        </div>
    </div>
</body>
<script src="/assets/static/js/anijs.min.js"></script>
<script src="/assets/mobile/controller/wex/donghua.js?v=<% rand(0, 1000) %>"></script>
</html>