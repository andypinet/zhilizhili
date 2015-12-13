<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/static/css/anicollection.css?v=<% rand(0, 1000) %>">
    <link rel="stylesheet" href="/assets/mobile/css/wex/donghua.css?v=<% rand(0, 1000) %>">
</head>
<body>
    <div class="debug"></div>
    <style>
        .item {
            color: #0000C0;
            font-size: 30px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
    <div class="items">
        @for($i = 0; $i < 13; $i++)
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
    </div>
</body>
<script src="/assets/static/js/anijs.min.js"></script>
<script src="/assets/static/js/underscore-min.js"></script>
<script>
    var debug = (window.getComputedStyle(
                    document.querySelector('.debug')
            ).fontFamily) == "true";
    if (!debug) {
        var content = window.getComputedStyle(
                document.querySelector('head')
        ).fontFamily.replace(/\\/g, "").replace(/'/g, '');

        var viewportwidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var viewportheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        function rel(propval, unit) {
            return parseFloat(propval.replace(unit, ""));
        }

        function cal(propval) {
            if (typeof propval != "string") {
                return propval;
            }

            if (propval.indexOf('vw') > -1) {
                return viewportwidth * rel(propval, "vw") / 100 + "px";
            } else if (propval.indexOf('vh') > -1) {
                return viewportheight * rel(propval, "vh") / 100 + "px";
            } else {
                return propval;
            }
        }

        function setVwStyle(ele, cssprops) {
            for (var csspropkey in cssprops) {
                ele.style[csspropkey] = cal(cssprops[csspropkey]);
            }
        }

        var parseobj = ( new Function( 'return (' + content + ');' ) )();

        for (var key in parseobj) {
            var elements = Array.prototype.slice.call(document.querySelectorAll(key));
            if (elements) {
                for (var i = 0; i < elements.length; i++) {
                    console.dir(elements[i]);
                    setVwStyle(elements[i], parseobj[key]);
                }
            }
        }
    }
</script>
<script>
    var loadEvent = new CustomEvent('load', { });
    var elements = Array.prototype.slice.call(document.querySelectorAll(".beijing"));
    var currentIndex = 0;
    var istouch = false;
    var instanceY = 0;
    var delayTime = 2000;
    var debounceTime = 2000;

    function ani111(max) {
        // next 动画结束时清除动画
        function clearPrevAnimation(index, currentAniName, nextAniName) {
            elements[index].classList.remove(currentAniName);
            elements[index].classList.remove("animated");
            elements[index - 1].classList.remove(nextAniName);
            elements[index - 1].classList.remove("animated");
        }

        // next 动画结束时延时触发
        function prevAnimationEnd(index, callback) {
            (function(i){
                setTimeout(function() {
                    // 当前的解除current
                    elements[i].classList.remove("current");
                    elements[i].classList.add("next");
                    // 之前一个收回next
                    if (elements[i+1]) {
                        elements[i+1].classList.remove("next");
                    }
                    // 下下个变成next
                    elements[i-1].classList.add("current");
                    callback(i);
                }, delayTime);
            })(index);
        }

        // next 动画结束时清除动画
        function clearNextAnimation(index, currentAniName, nextAniName) {
            elements[index].classList.remove(currentAniName);
            elements[index].classList.remove("animated");
            elements[index + 1].classList.remove(nextAniName);
            elements[index + 1].classList.remove("animated");
        }

        // next 动画结束时延时触发
        function nextAnimationEnd(index, callback) {
            (function(i){
                setTimeout(function() {
                    // 当前的解除current
                    elements[i].classList.remove("current");
                    // 下一个变成current
                    elements[i+1].classList.remove("next");
                    elements[i+1].classList.add("current");
                    // 下下个变成next
                    if (elements[i+2]) {
                        elements[i+2].classList.add("next");
                    }
                    callback(i);
                }, delayTime);
            })(index);
        }

        return {
            prev: function(currentAniName, nextAniName, onprev) {
                // 当页面不在第一页的时候才可以执行
                if (currentIndex > 0) {
                    onprev(currentIndex);
                    // 当前动画执行区域
                    elements[currentIndex].classList.add(currentAniName);
                    elements[currentIndex].classList.add("animated");

                    // 下一动画执行区域
                    elements[currentIndex - 1].classList.add(nextAniName);
                    elements[currentIndex - 1].classList.add("animated");
                    prevAnimationEnd(currentIndex, function(index) {
                        clearPrevAnimation(index, currentAniName, nextAniName);
                    });
                    currentIndex--;
                }
            },
            next: function(currentAniName, nextAniName, onnext, delayNext) {
                if (currentIndex < max) {
                    onnext(currentIndex);
                    // 当前动画执行区域
                    elements[currentIndex].classList.add(currentAniName);
                    elements[currentIndex].classList.add("animated");

                    // 下一动画执行区域
                    elements[currentIndex + 1].classList.add(nextAniName);
                    elements[currentIndex + 1].classList.add("animated");
                    nextAnimationEnd(currentIndex, function(index) {
                        clearNextAnimation(index, currentAniName, nextAniName);
                        delayNext();
                    });
                    currentIndex++;
                }
            }
        };
    }

    var anicenter = ani111(12);

    document.querySelector("body").addEventListener('touchstart', function(e) {
        e.preventDefault();
        istouch = true;
        instanceY = e.changedTouches[0].clientY;
    });

    var isCan = true;
    var changeItem = _.debounce(function() {
        isCan = true;
    }, debounceTime);

    var deb = function(e) {
        if (isCan) {
            isCan = false;
            if (istouch) {
                istouch = false;
                var ins = e.changedTouches[0].clientY - instanceY;
                var distance = Math.abs(ins);
                if (ins < 0) {
                    if (distance > 30) {
//                    elements[0].innerHTML = "向上";
//                    elements[0].style.backgroundImage = "none";
//                    elements[0].style.backgroundColor = '#' + ('000000' + (distance * 1000).toString(16)).slice(-6);
                        window.nextpageload();
                    }
                } else {
                    if (distance > 30) {
//                    elements[0].innerHTML = "向下";
//                    elements[0].style.backgroundImage = "none";
//                    elements[0].style.backgroundColor = '#' + ('000000' + (distance * 1000).toString(16)).slice(-6);
                        window.prevpageload();
                    }
                }
            }
            changeItem();
        }
    };

//    @-webkit-keyframes rotateIn {
//        0% {
//            -webkit-transform-origin: center;
//            transform-origin: center;
//            -webkit-transform: rotate3d(0, 0, 1, -200deg);
//            transform: rotate3d(0, 0, 1, -200deg);
//            opacity: 0;
//        }
//
//        100% {
//            -webkit-transform-origin: center;
//            transform-origin: center;
//            -webkit-transform: none;
//            transform: none;
//            opacity: 1;
//        }
//    }
//
//    @keyframes rotateIn {
//        0% {
//            -webkit-transform-origin: center;
//            -ms-transform-origin: center;
//            transform-origin: center;
//            -webkit-transform: rotate3d(0, 0, 1, -200deg);
//            -ms-transform: rotate3d(0, 0, 1, -200deg);
//            transform: rotate3d(0, 0, 1, -200deg);
//            opacity: 0;
//        }
//
//        100% {
//            -webkit-transform-origin: center;
//            -ms-transform-origin: center;
//            transform-origin: center;
//            -webkit-transform: none;
//            -ms-transform: none;
//            transform: none;
//            opacity: 1;
//        }
//    }

//    document.querySelector("body").addEventListener("touchmove", function(e) {
//        var ins = e.changedTouches[0].clientY - instanceY;
//        var distance = Math.abs(ins);
//        elements[0].innerHTML = distance;
//    });

    document.querySelector("body").addEventListener("touchend", deb);

    // prevpage 触发
    window.prevpageload = function() {
//        anicenter.prev("rotateOutDownRight", "rotateInDownRight");
//        anicenter.prev("rotateOutDownRight", "rotateInDownRight");
        anicenter.prev("flipOutX", "flipInX", function(index) {
            elements[index-1].style.opacity = 1;
        });
    };

    // nextpage 触发
    window.nextpageload = function() {
//        anicenter.next("rotateOutDownLeft", "rotateInDownLeft");
//        anicenter.next("rotateOutUpRight", "rotateInUpRight");
        anicenter.next("flipOutX", "flipInX", function(index) {
            elements[index+1].style.opacity = 1;
        });
    };
</script>
</html>