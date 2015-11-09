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
}

