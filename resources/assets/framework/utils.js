var utils;
(function (utils) {
    let getTransalateXReg = /[-\d]+(?=px)/g;
    function css(element, style) {
        for (var stypeprop in style) {
            element.style[stypeprop] = style[stypeprop];
        }
    }
    utils.css = css;
    function getElmentWidth(element) {
        return parseFloat(element.offsetWidth);
    }
    utils.getElmentWidth = getElmentWidth;
    function getChildrenLength(element) {
        return element.children.length;
    }
    utils.getChildrenLength = getChildrenLength;
    function getTranslateX(element) {
        if (element.style.transform.match(getTransalateXReg)) {
            return parseFloat(element.style.transform.match(getTransalateXReg)[0]);
        }
        else {
            return -1;
        }
    }
    utils.getTranslateX = getTranslateX;
    function debounce(func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        if (null == wait)
            wait = 100;
        console.log(Date.now());
        function later() {
            var last = Date.now() - timestamp;
            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last);
            }
            else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout)
                        context = args = null;
                }
            }
        }
        return function debounced() {
            context = this;
            args = arguments;
            timestamp = Date.now();
            var callNow = immediate && !timeout;
            if (!timeout)
                timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    }
    utils.debounce = debounce;
})(utils || (utils = {}));
