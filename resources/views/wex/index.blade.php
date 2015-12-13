<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/static/css/anicollection.css?v=<% rand(0, 1000) %>">
    <link rel="stylesheet" href="/assets/mobile/css/wex/index.css?v=<% rand(0, 1000) %>">
</head>
<body>
    <div class="debug"></div>
    <div class="items">
        <div class="item item1">
            <div class="logo"></div>
            <div class="text1">
                <div class="p p1">您的信息已提交成功</div>
                <div class="p p2">我们会在活动开始前给您答复</div>
            </div>
            <div class="bg">
                <img src="/assets/mobile/img/success/beijing.jpg" alt="">
            </div>
        </div>
        <div class="item item2 biaodan">
            <form class="form" action="">
                <div class="intro1">
                    <div class="p p1 form-group">
                        <input type="text" placeholder="请输入你的姓名">
                    </div>
                    <div class="p p2 form-group">
                        <input type="text" placeholder="请输入你的微信号">
                    </div>
                    <div class="p p3 form-group">
                        <input type="text" placeholder="请输入你的手机号">
                    </div>
                    <div class="p p4 form-group">
                        <textarea name="" id="" cols="30" rows="10" placeholder="写点你想对猫咪说的话吧 ..."></textarea>
                    </div>
                </div>
                <div class="list horizontal logos">
                    <div class="center-set">
                        <div class="center-set__item">
                            <button class="btn" type="submit">提交</button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="bg">
                <img src="/assets/mobile/img/success/beijing.jpg" alt="">
            </div>
        </div>
        <div class="item item3">
            <div class="flex horizontal center-center full-parent">
                <div class="flex-1 element">1</div>
                <div class="flex-1 element">2</div>
            </div>
        </div>
        <style>
            /*.item {*/
                /*opacity: 0;*/
            /*}*/
            /*.beijing.current {*/
                /*opacity: 1;*/
            /*}*/


            .item {
                display: none;
            }
            .beijing.current {
                display: block;
            }
        </style>
        <div class="item item4 beijing current beijing1">
        </div>
        @for($i = 0; $i < 13; $i++)
            <div class="item item<%$i+5%> beijing beijing<%$i+1%>">
            </div>
        @endfor
    </div>
</body>
<script src="/assets/static/js/anijs.min.js"></script>
<script src="/assets/static/js/hammer.min.js"></script>
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

    var hammertime = new Hammer(document.querySelector("body"), {

    });
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

//    for (var i = 0; i < elements.length; i++) {
//        elements[i].style.display = "block";
//    }
//    setTimeout(function() {
//        for (var i = 1; i < elements.length; i++) {
//            elements[i].style.display = "none";
//        }
//    }, 500);

function ani111() {
    function hide(elements, currentIndex) {
        for(var i = 0; i < elements.length; i++) {
            if (i != currentIndex) {
                elements[i].style.display = "none";
            }
        }
    }

    function removeAni(index) {
        setTimeout(function() {
            elements[index].classList.remove("slideOutUp");
            elements[index].classList.remove("animated");
            elements[index].style.display = "none";
        }, 1000);
    }

    function prevAni(index) {
        elements[index].classList.add("slideInDown");
        elements[index].classList.add("animated");
        elements[index].style.display = "block";
    }

    function delayHide(index) {
        setTimeout(function() {
            elements[index].style.display = "none";
            elements[index - 1].classList.remove("slideInDown");
            elements[index].classList.remove("slideOutDown");
//            elements[index - 1].classList.remove("animated");
//            elements[index].classList.remove("animated");
        }, 1000);
    }

    return {
        prev: function() {
            prevAni(currentIndex - 1);
            elements[currentIndex].classList.add("slideOutDown");
            elements[currentIndex].classList.add("animated");
            delayHide(currentIndex);
            currentIndex--;
        },
        next: function() {
            currentIndex++;
            console.log(currentIndex);
            //        elements[currentIndex - 1].classList.add("ani-duration-2000");
            elements[currentIndex - 1].classList.add("slideOutUp");
            elements[currentIndex - 1].classList.add("animated");
            removeAni(currentIndex - 1);
            elements[currentIndex].dispatchEvent(loadEvent);
            elements[currentIndex].style.display = "block";
            elements[currentIndex].classList.remove("slideOutUp");
            elements[currentIndex].classList.add("slideInUp");
            elements[currentIndex].classList.add("animated");
            setTimeout(function() {
                elements[currentIndex].classList.remove("slideInUp");
                //            elements[currentIndex].classList.remove("animated");
            }, 1000);
        }
    }
}

function ani222() {
    function hide(elements, currentIndex) {
        for(var i = 0; i < elements.length; i++) {
            if (i != currentIndex) {
                elements[i].style.display = "none";
            }
        }
    }

    function removeAni(index) {
        setTimeout(function() {
            elements[index].classList.remove("fadeOutUp");
            elements[index].classList.remove("animated");
            elements[index].style.display = "none";
        }, 1000);
    }

    function prevAni(index) {
        elements[index].classList.add("fadeInDown");
        elements[index].classList.add("animated");
        elements[index].style.display = "block";
    }

    function delayHide(index) {
        setTimeout(function() {
            elements[index].style.display = "none";
            elements[index - 1].classList.remove("fadeInDown");
            elements[index].classList.remove("fadeOutDown");
//            elements[index - 1].classList.remove("animated");
//            elements[index].classList.remove("animated");
        }, 1000);
    }

    return {
        prev: function() {
            prevAni(currentIndex - 1);
            elements[currentIndex].classList.add("fadeOutDown");
            elements[currentIndex].classList.add("animated");
            delayHide(currentIndex);
            currentIndex--;
        },
        next: function() {
            currentIndex++;
            console.log(currentIndex);
//        elements[currentIndex - 1].classList.add("ani-duration-2000");
            elements[currentIndex - 1].classList.add("fadeOutUp");
            elements[currentIndex - 1].classList.add("animated");
            removeAni(currentIndex - 1);
            elements[currentIndex].dispatchEvent(loadEvent);
            elements[currentIndex].style.display = "block";
            elements[currentIndex].classList.remove("fadeOutUp");
            elements[currentIndex].classList.add("fadeInUp");
            elements[currentIndex].classList.add("animated");
            setTimeout(function() {
                elements[currentIndex].classList.remove("fadeInUp");
//            elements[currentIndex].classList.remove("animated");
            }, 1000);
        }
    }
}

    function ani333() {
        function hide(elements, currentIndex) {
            for(var i = 0; i < elements.length; i++) {
                if (i != currentIndex) {
                    elements[i].opacity = 0;
                }
            }
        }

        function removeAni(index) {
            setTimeout(function() {
                elements[index].classList.remove("fadeOutUp");
//                elements[index].classList.remove("animated");
            }, 1000);
        }

        // 向上时对前一个操作
        function prevAni(index) {
            elements[index].classList.add("fadeInDown");
            elements[index].classList.add("animated");
            elements[index].classList.add("current");
        }

        // 向上时对后一个操作
        function delayHide(index) {
            setTimeout(function() {
                elements[index - 1].classList.remove("fadeInDown");
                elements[index].classList.remove("fadeOutDown");
                // 删除前一个animated
//                elements[index - 1].classList.remove("animated");
//                elements[index].classList.remove("animated");
                elements[index].classList.remove("current");
            }, 1000);
        }

        return {
            prev: function() {
                prevAni(currentIndex - 1);
                elements[currentIndex].classList.add("fadeOutDown");
                elements[currentIndex].classList.add("animated");
                delayHide(currentIndex);
                currentIndex--;
            },
            next: function() {
                currentIndex++;
                console.log(currentIndex);
                elements[currentIndex - 1].classList.remove("current");
                elements[currentIndex - 1].classList.add("fadeOutUp");
                elements[currentIndex - 1].classList.add("animated");
                removeAni(currentIndex - 1);
                elements[currentIndex].dispatchEvent(loadEvent);
                elements[currentIndex].classList.add("current");
                elements[currentIndex].classList.remove("fadeOutUp");
                elements[currentIndex].classList.add("fadeInUp");
                elements[currentIndex].classList.add("animated");
                setTimeout(function() {
                    elements[currentIndex].classList.remove("fadeInUp");
//                    elements[currentIndex].classList.remove("animated");
                }, 1000);
            }
        }
    }


    var anicenter = ani111();

//    hammertime.on('swipeup', function(ev) {
//        elements[0].style.backgroundImage = "none";
//        elements[0].style.backgroundColor = '#' + ('000000' + ev.distance.toString(16)).slice(-6);
//    });

    document.querySelector("body").addEventListener('touchstart', function(e) {
        istouch = true;
        instanceY = e.changedTouches[0].clientY;
    });

    var isCan = true;
    var changeItem = _.debounce(function() {
        isCan = true;
    }, 1000);

    var deb = function(e) {
        if (isCan) {
            isCan = false;
            console.log(1);
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

    document.addEventListener("touchend", deb, false);

    // prevpage 触发
    window.prevpageload = function() {
        anicenter.prev();
    };

    // nextpage 触发
    window.nextpageload = function() {
        anicenter.next();
    };
</script>
</html>