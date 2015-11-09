var utils;
(function (utils) {
    var getTransalateXReg = /[-\d]+(?=px)/g;
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
})(utils || (utils = {}));
//# sourceMappingURL=utils.js.map