<!DOCTYPE html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/assets/static/css/normalize.css">
        <script src="/assets/static/oldie/modernizr-2.8.3.min.js"></script>
        <!-- 总共35k 提供了dom3 es5 大部分功能 -->
        <!--[if IE 8]>
        <script src="./assets/static/oldie/es5-shim.min.js"></script>
        <script src="./assets/static/oldie/es5-sham.min.js"></script>
        <script src="./assets/static/oldie/ie8.min.js"></script>
        <script type="text/javascript">
            //ie8 console没有的问题
            if (typeof console === "undefined" || typeof console.log === "undefined") {
                console = {};
                console.log = function(msg) {
                    alert(msg);
                };
            }
        </script>
        <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
        <!--[if lt IE 9]>
        <script src="/assets/static/oldie/lt-ie-9.min.js"></script>
        <script src="/assets/static/oldie/calc.min.js"></script>
        <![endif]-->
        <!-- dom4级 功能 -->
        <script src="/assets/static/js/dom4.min.js"></script>

    </head>
    <body>
        <!--[if lt IE 8]>
        <div class="browsehappy">
            <p>
                You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/" target="_blank">upgrade your browser</a> to improve your experience.
            </p>
        </div>
        <![endif]-->

        <style>
            body {
                height: 1200px;
            }

            .test {
                width: 450px;
                height: 200px;
                overflow: auto;
            }
        </style>

        <div id="test" class="test">
            <img src="/assets/static/img/mm.jpeg">
        </div>

        <!--[if lt IE 9]>
        <script src="//cdn.bootcss.com/jquery/1.11.2/jquery.js"></script>
        <script>window.jQuery || document.write('<script src="/assets/static/oldie/jquery-1.11.2.min.js"><\/script>')</script>
        <![endif]-->
        <!--[if gt IE 8]><!-->
        <script src="//cdn.bootcss.com/jquery/2.1.3/jquery.js"></script>
        <script>window.jQuery || document.write('<script src="/assets/static/oldie/jquery-2.1.3.min.js"><\/script>')</script>
        <!--<![endif]-->

        <script>var utils = {};</script>

        <script>utils.ui = {};</script>

        <script>
            var testElement = document.getElementById("test");

            utils.arrayElements = function(element) {
                // 数据检测

                if (Array.isArray(element)) {
                    return element;
                }
                if (element instanceof NodeList)  {
                    return Array.prototype.slice.call(element);
                }
                return [element];
            };

            console.dir(utils.arrayElements(testElement));

            utils.ui.scrollUnique = function(element) {
                var eventType = 'mousewheel';
                if (document.mozHidden !== undefined) {
                    eventType = 'DOMMouseScroll';
                }

                utils.arrayElements(element).forEach(function(arrayele) {
                    var self = arrayele;
                    arrayele.addEventListener(eventType, function(event) {
                        // 一些数据
                        var scrollTop = self.scrollTop,
                                scrollHeight = self.scrollHeight,
                                height = self.clientHeight;                             

                        var delta = (event.wheelDelta) ? event.wheelDelta : -(event.detail || 0);

                        if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                            // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                            self.scrollTop = delta > 0? 0: scrollHeight;
                            // 向上滚 || 向下滚
                            event.preventDefault();
                        }
                    }, false);
                });                    
            };

            utils.ui.scrollUnique(testElement);
        </script>
    </body>
</html>