module utils {
    let getTransalateXReg = /[-\d]+(?=px)/g;

    export function css(element, style) {
        for (var stypeprop in style) {
            element.style[stypeprop] = style[stypeprop];
        }
    }

    export function getElmentWidth(element) {
        return parseFloat(element.offsetWidth);
    }

    export function getChildrenLength(element: HTMLElement) {
        return element.children.length
    }


    export function getTranslateX(element) {
        if (element.style.transform.match(getTransalateXReg)) {
            return parseFloat(element.style.transform.match(getTransalateXReg)[0]);
        }
        else {
            return -1;
        }
    }

    export function debounce(func, wait, immediate){
        var timeout, args, context, timestamp, result;
        if (null == wait) wait = 100;

        console.log(Date.now());
        function later() {
            var last = Date.now() - timestamp;

            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        }

        return function debounced() {
            context = this;
            args = arguments;
            timestamp = Date.now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    }
}

