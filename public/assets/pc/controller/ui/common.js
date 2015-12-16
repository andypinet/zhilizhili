(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004

Copyright (C) 2013 Andrea Giammarchi <spam@hater.me>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
*/
/*jslint browser: true, forin: true, plusplus: true, indent: 4 */
(function(Object, mixin) {
    "use strict"; // happy linter ^_____^

    /* <droppable> interesting code after line 110, here
     * ad-hoc polyfill section for this purpose only
     * never use these functions outside this closure ... like ...
ne*/var

        // borrowed methods for unknown Objects
        ObjectPrototype = Object.prototype,

        lookupGetter = ObjectPrototype.__lookupGetter__,
        lookupSetter = ObjectPrototype.__lookupSetter__,
        defineGetter = ObjectPrototype.__defineGetter__,
        defineSetter = ObjectPrototype.__defineSetter__,
        has          = ObjectPrototype.hasOwnProperty,

        emptyArray   = [],
        // slice        = emptyArray.slice,

        // for IE < 9 and non IE5 yet browsers
        goNative = true,
        defineProperty = (function(defineProperty){
          try{
            return defineProperty && defineProperty({},'_',{value:1})._ && defineProperty;
          } catch(IE8) {
            goNative = false;
          }
        }(Object.defineProperty)) ||
        function (o, k, d) {
            var
                get = d.get, // has.call(d, 'get') would be better but
                set = d.set; // ES5 is just like this
            if (get && defineGetter) {
                defineGetter.call(o, k, get);
            }
            if (set && defineSetter) {
                defineSetter.call(o, k, set);
            }
            if (!(get || set)) {
                o[k] = d.value;
            }
        },
        // for IE < 9 and non IE5 yet browsers
        getOwnPropertyNames = (goNative && Object.getOwnPropertyNames) ||
        (function () {
            var
                addHiddenOwnProperties = function (result) {
                    return result;
                },
                list = [],
                key,
                i,
                length;

            for (key in {valueOf: key}) {
                list.push(key);
            }

            if (!list.length) {
                length = list.push(
                    'constructor',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'toLocaleString',
                    'toString',
                    'valueOf'
                ) - 1;
                addHiddenOwnProperties = function (result, o) {
                    for (i = 0; i < length; i++) {
                        key = list[i];
                        if (has.call(o, key)) {
                            result.push(key);
                        }
                    }
                    return result;
                };
            }

            return function (o) {
                var
                    result = [],
                    key;
                for (key in o) {
                    if (has.call(o, key)) {
                        result.push(key);
                    }
                }
                return addHiddenOwnProperties(result, o);
            };
        }()),
        // IE < 9 or other non ES5 yet browsers
        getOwnPropertyDescriptor = (goNative && Object.getOwnPropertyDescriptor) ||
        function (o, k) {
            var
                descriptor = {
                    enumerable: true,
                    configurable: true
                },
                get = lookupGetter && lookupGetter.call(o, k),
                set = lookupSetter && lookupSetter.call(o, k);
            if (get) {
                descriptor.get = get;
            }
            if (set) {
                descriptor.set = set;
            }
            if (!(get || set)) {
                descriptor.writable = true;
                descriptor.value = o[k];
            }
            return descriptor;
        };
    // </droppable>

    // if already defined get out of here
    // this should be 
    // if (mixin in Object) return;
    // but for some reason I went for JSLint ... 
    if (Object[mixin]) {
        return;
    }
    // same descriptor as other spec'd methods
    defineProperty(
        Object,
        mixin,
        {
            enumerable: false,
            writable: true,
            configurable: true,
            value: function (
                target, // object to enrich with
                source, // mixin object or Trait (Function)
                args    // optional arguments for Trait
            ) {
                var
                    i,
                    length,
                    keys,
                    key;

                if (typeof source === 'function') {
                    // if the source is a function
                    // it will be invoked with object as target
                    // this let us define mixin as closures
                    // function addFunctionality() {
                    //     this.functionality = function () {
                    //       // do amazing stuff
                    //     }
                    // }
                    // addFunctionality.call(Class.prototype);
                    // addFunctionality.call(genericObject);
                    // // or
                    // Object.mixin(Class.prototype, addFunctionality);

                    source.apply(target, args || emptyArray);
                    /*
                    // try to perform as fast as possible
                    if (arguments.length < 3) {
                        // so if no extra args are passed ...
                        source.call(target);
                    } else {
                        // there is no need to slice them as done here
                        source.apply(target, slice.call(arguments, 2));
                    }
                    */
                } else {
                    // if source is an object
                    // grab all possibe properties
                    // and per each of them ...
                    keys = getOwnPropertyNames(source);
                    length = keys.length;
                    i = 0;
                    while (i < length) {
                        key = keys[i++];
                        // ... define it ...
                        defineProperty(
                            target,
                            key,
                            // ... using the same descriptor
                            getOwnPropertyDescriptor(
                                source,
                                key
                            )
                        );
                    }
                }
                // always return the initial target
                // ignoring all possible different return with functions
                return target;
            }
        }
    );
}(Object, 'mixin'));
module.exports = Object.mixin;
},{}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

require("../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//(function (factory) {
//    if ( typeof define === 'function' && define.amd ) {
//        // AMD. Register as an anonymous module.
//        define(['jquery'], factory);
//    } else if (typeof exports === 'object') {
//        // Node/CommonJS style for Browserify
//        module.exports = factory;
//    } else {
//        // Browser globals
//        factory(jQuery);
//    }
//}(function ($) {
//
//    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
//        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
//            ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
//        slice  = Array.prototype.slice,
//        nullLowestDeltaTimeout, lowestDelta;
//
//    if ( $.event.fixHooks ) {
//        for ( var i = toFix.length; i; ) {
//            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
//        }
//    }
//
//    var special = $.event.special.mousewheel = {
//        version: '3.1.12',
//
//        setup: function() {
//            if ( this.addEventListener ) {
//                for ( var i = toBind.length; i; ) {
//                    this.addEventListener( toBind[--i], handler, false );
//                }
//            } else {
//                this.onmousewheel = handler;
//            }
//            // Store the line height and page height for this particular element
//            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
//            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
//        },
//
//        teardown: function() {
//            if ( this.removeEventListener ) {
//                for ( var i = toBind.length; i; ) {
//                    this.removeEventListener( toBind[--i], handler, false );
//                }
//            } else {
//                this.onmousewheel = null;
//            }
//            // Clean up the data we added to the element
//            $.removeData(this, 'mousewheel-line-height');
//            $.removeData(this, 'mousewheel-page-height');
//        },
//
//        getLineHeight: function(elem) {
//            var $elem = $(elem),
//                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
//            if (!$parent.length) {
//                $parent = $('body');
//            }
//            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
//        },
//
//        getPageHeight: function(elem) {
//            return $(elem).height();
//        },
//
//        settings: {
//            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
//            normalizeOffset: true  // calls getBoundingClientRect for each event
//        }
//    };
//
//    $.fn.extend({
//        mousewheel: function(fn) {
//            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
//        },
//
//        unmousewheel: function(fn) {
//            return this.unbind('mousewheel', fn);
//        }
//    });
//
//
//    function handler(event) {
//        var orgEvent   = event || window.event,
//            args       = slice.call(arguments, 1),
//            delta      = 0,
//            deltaX     = 0,
//            deltaY     = 0,
//            absDelta   = 0,
//            offsetX    = 0,
//            offsetY    = 0;
//        event = $.event.fix(orgEvent);
//        event.type = 'mousewheel';
//
//        // Old school scrollwheel delta
//        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
//        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
//        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
//        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }
//
//        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
//        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
//            deltaX = deltaY * -1;
//            deltaY = 0;
//        }
//
//        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
//        delta = deltaY === 0 ? deltaX : deltaY;
//
//        // New school wheel delta (wheel event)
//        if ( 'deltaY' in orgEvent ) {
//            deltaY = orgEvent.deltaY * -1;
//            delta  = deltaY;
//        }
//        if ( 'deltaX' in orgEvent ) {
//            deltaX = orgEvent.deltaX;
//            if ( deltaY === 0 ) { delta  = deltaX * -1; }
//        }
//
//        // No change actually happened, no reason to go any further
//        if ( deltaY === 0 && deltaX === 0 ) { return; }
//
//        // Need to convert lines and pages to pixels if we aren't already in pixels
//        // There are three delta modes:
//        //   * deltaMode 0 is by pixels, nothing to do
//        //   * deltaMode 1 is by lines
//        //   * deltaMode 2 is by pages
//        if ( orgEvent.deltaMode === 1 ) {
//            var lineHeight = $.data(this, 'mousewheel-line-height');
//            delta  *= lineHeight;
//            deltaY *= lineHeight;
//            deltaX *= lineHeight;
//        } else if ( orgEvent.deltaMode === 2 ) {
//            var pageHeight = $.data(this, 'mousewheel-page-height');
//            delta  *= pageHeight;
//            deltaY *= pageHeight;
//            deltaX *= pageHeight;
//        }
//
//        // Store lowest absolute delta to normalize the delta values
//        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );
//
//        if ( !lowestDelta || absDelta < lowestDelta ) {
//            lowestDelta = absDelta;
//
//            // Adjust older deltas if necessary
//            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
//                lowestDelta /= 40;
//            }
//        }
//
//        // Adjust older deltas if necessary
//        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
//            // Divide all the things by 40!
//            delta  /= 40;
//            deltaX /= 40;
//            deltaY /= 40;
//        }
//
//        // Get a whole, normalized value for the deltas
//        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
//        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
//        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);
//
//        // Normalise offsetX and offsetY properties
//        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
//            var boundingRect = this.getBoundingClientRect();
//            offsetX = event.clientX - boundingRect.left;
//            offsetY = event.clientY - boundingRect.top;
//        }
//
//        // Add information to the event object
//        event.deltaX = deltaX;
//        event.deltaY = deltaY;
//        event.deltaFactor = lowestDelta;
//        event.offsetX = offsetX;
//        event.offsetY = offsetY;
//        // Go ahead and set deltaMode to 0 since we converted to pixels
//        // Although this is a little odd since we overwrite the deltaX/Y
//        // properties with normalized deltas.
//        event.deltaMode = 0;
//
//        // Add event and delta to the front of the arguments
//        args.unshift(event, delta, deltaX, deltaY);
//
//        // Clearout lowestDelta after sometime to better
//        // handle multiple device types that give different
//        // a different lowestDelta
//        // Ex: trackpad = 3 and mouse wheel = 120
//        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
//        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);
//
//        return ($.event.dispatch || $.event.handle).apply(this, args);
//    }
//
//    function nullLowestDelta() {
//        lowestDelta = null;
//    }
//
//    function shouldAdjustOldDeltas(orgEvent, absDelta) {
//        // If this is an older event and the delta is divisable by 120,
//        // then we are assuming that the browser is treating this as an
//        // older mouse wheel event and that we should divide the deltas
//        // by 40 to try and get a more usable deltaFactor.
//        // Side note, this actually impacts the reported scroll distance
//        // in older browsers and can cause scrolling to be slower than native.
//        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
//        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
//    }
//
//}));

function toggleActiveClass(ele) {
    var ActiveClassName = "list-group__item--top";
    if (ele.classList.contains(ActiveClassName)) {
        ele.classList.remove(ActiveClassName);
    } else {
        ele.classList.add(ActiveClassName);
    }
}

var Plugin = (function () {
    function Plugin(element, show) {
        _classCallCheck(this, Plugin);

        var select = element.querySelector('[ui-stackview-render="true"]');
        if (select.length < 1) {
            return false;
        }

        var self = this;
        var items = select.queryAll(".list-group__item");
        self.index = 0;
        self.show = show;

        for (var i = 0; i < items.length; i++) {
            if (items[i].classList.contains("list-group__item--top")) {
                self.index = i;
                break;
            }
        }

        self.items = items;
        self.isMouseWheel = false;

        function wheelHandle(e) {
            var yInstance = e.deltaY;
            if (isFF) {
                if (yInstance < 0) {
                    yInstance = yInstance - 24;
                } else {
                    yInstance = yInstance + 24;
                }
            }

            if (!self.isMouseWheel) {
                if (yInstance > 24) {
                    self.isMouseWheel = true;
                    self.nextSelect();
                } else if (yInstance < -24) {
                    self.isMouseWheel = true;
                    self.prevSelect();
                }
                setTimeout(function () {
                    self.isMouseWheel = false;
                }, 500);
            }
        }

        var isFF = 'MozAppearance' in document.documentElement.style;

        var isWebkit = 'WebkitAppearance' in document.documentElement.style;
        var eventName = 'wheel';

        if (isWebkit) {
            eventName = 'mousewheel';
        }

        select.addEventListener(eventName, wheelHandle, false);
        return self;
    }

    _createClass(Plugin, [{
        key: "nextSelect",
        value: function nextSelect() {
            var self = this;
            var items = self.items;
            if (self.index < items.length - self.show) {
                toggleActiveClass(items[self.index]);
                self.index++;
                toggleActiveClass(items[self.index]);
            }
        }
    }, {
        key: "prevSelect",
        value: function prevSelect() {
            var self = this;
            var items = self.items;
            if (self.index > 0) {
                toggleActiveClass(items[self.index]);
                self.index--;
                toggleActiveClass(items[self.index]);
            }
        }
    }]);

    return Plugin;
})();

document.queryAll('[element="ui-stackview"]').forEach(function (element) {
    new Plugin(element, 5);
});

},{"../utils":3}],3:[function(require,module,exports){
'use strict';

require('Object-mixin');

// ie9 input 事件polyfill
(function (d) {
    if (navigator.userAgent.indexOf('MSIE 9') === -1) return;
    var elements = [],
        values = [],
        ev = d.createEvent('CustomEvent');
    ev.initCustomEvent('input', true, true, {});

    d.addEventListener('selectionchange', function () {
        var actEl = d.activeElement;

        if (actEl.tagName === 'TEXTAREA' || actEl.tagName === 'INPUT') {
            var idx = elements.indexOf(actEl),
                el = elements[idx] || elements.push(actEl);
            if (actEl.type === 'text' || actEl.type === 'password' || actEl.type === 'search') {
                if (el.value !== values[idx]) {
                    values[idx] = el.value;
                    el.dispatchEvent(ev);
                }
            }
        }
    });
})(document);

(function () {
    var forEach = [].forEach,
        regex = /^data-(.+)/,
        dashChar = /\-([a-z])/ig,
        el = document.createElement('div'),
        mutationSupported = false,
        match;

    function detectMutation() {
        mutationSupported = true;
        this.removeEventListener('DOMAttrModified', detectMutation, false);
    }

    function toCamelCase(s) {
        return s.replace(dashChar, function (m, l) {
            return l.toUpperCase();
        });
    }

    function updateDataset() {
        var dataset = {};
        forEach.call(this.attributes, function (attr) {
            if (match = attr.name.match(regex)) dataset[toCamelCase(match[1])] = attr.value;
        });
        return dataset;
    }

    // only add support if the browser doesn't support data-* natively
    if (el.dataset != undefined) return;

    el.addEventListener('DOMAttrModified', detectMutation, false);
    el.setAttribute('foo', 'bar');

    function defineElementGetter(obj, prop, getter) {
        if (Object.defineProperty) {
            Object.defineProperty(obj, prop, {
                get: getter
            });
        } else {
            obj.__defineGetter__(prop, getter);
        }
    }

    defineElementGetter(Element.prototype, 'dataset', mutationSupported ? function () {
        if (!this._datasetCache) {
            this._datasetCache = updateDataset.call(this);
        }
        return this._datasetCache;
    } : updateDataset);

    document.addEventListener('DOMAttrModified', function (event) {
        delete event.target._datasetCache;
    }, false);
})();

// 解析sml
utils.sml = (function () {
    function parse(str) {
        var parseobj = {};
        parseobj["event"] = str.match(/(?:if:)\s*\w*/g)[0].replace("if:", "").trim();
        parseobj["regex"] = str.match(/(?:do:)[\s\w\(\),|]+/g)[0].replace("do:", "").split("|").map(function (item) {
            var args = [];
            var reg = /(?:\()[\w\s,]+/g;
            if (item.indexOf("(") > -1 && item.indexOf(")") > -1) {
                var val = item.match(reg)[0].replace("(", "").split(",");
                args = args.concat(val);
            }
            return {
                name: item.trim().replace(reg, "").replace(")", ""),
                args: args
            };
        });
        return parseobj;
    }

    return {
        parse: parse
    };
})();

utils.Math = (function () {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return {
        getRandomInt: getRandomInt
    };
})();

utils.validator = (function () {
    var handles = {};

    function handle(eventName, ele, parseobj) {
        var fun = function fun(e) {
            var args = e;
            var str = null;
            if (Object.prototype.toString.call(args) == '[object String]') {
                str = args;
            } else {
                str = e.target.value;
            }
            var ispass = true;
            for (var i = 0; i < parseobj.regex.length; i++) {
                var regex = parseobj.regex[i];
                var fun = validator[regex.name];
                if (fun) {
                    var args = regex.args.concat([str]);
                    var ret = fun.apply(fun, args);
                    if (!ret) {
                        var event = new CustomEvent("regex-error", {
                            detail: regex
                        });
                        ele.dispatchEvent(event);
                        ispass = false;
                        break;
                    }
                }
            }
            if (ispass) {
                var event = new CustomEvent("regex-success", {
                    detail: regex
                });
                ele.dispatchEvent(event);
                return true;
            } else {
                return false;
            }
        };
        return fun;
    }

    return {
        initregex: function initregex(ele, bindele, isAddListener) {
            var parseobj = utils.sml.parse(ele.getAttribute("data-regex"));
            ele.setAttribute("regex-id", "regex" + utils.Math.getRandomInt(0, 100000));
            var fun = handle(parseobj.event, ele, parseobj);
            handles[ele.getAttribute("regex-id")] = {
                eventName: parseobj.event,
                fun: fun
            };
            if (isAddListener) {
                bindele.addEventListener(parseobj.event, fun, false);
            }
        },
        unuseregex: function unuseregex(ele, bindele) {
            var s = handles[ele.getAttribute("regex-id")];
            bindele.removeEventListener(s.eventName, s.fun, false);
            delete handles[ele.getAttribute("regex-id")];
        },
        getHandle: function getHandle(ele) {
            var s = handles[ele.getAttribute("regex-id")];
            if (s) {
                return s;
            }
            return false;
        }
    };
})();

utils.component = (function () {
    return function component(id, state, options) {
        var defaults = {
            behaviors: []
        };

        var op = Object.mixin(defaults, options);
        var instance = Object.mixin({ el: id }, { data: state });
        instance["attachedFunctions"] = [];

        for (var i = 0; i < options.behaviors.length; i++) {
            var trait = new options.behaviors[i]();
            var keys = Object.getOwnPropertyNames(Object.getPrototypeOf(trait));
            for (var j = 0; j < keys.length; j++) {
                var key = keys[j];
                if (key == "attached") {
                    instance["attachedFunctions"].push(trait[key]);
                    continue;
                }

                if (key != "constructor") {
                    if (instance[key]) {
                        instance[key] = Object.mixin(instance[key], trait[key]());
                    } else {
                        instance[key] = Object.mixin({}, trait[key]());
                    }
                }
            }
        }

        instance["attached"] = function () {
            var self = this;
            for (var i = 0; i < instance["attachedFunctions"].length; i++) {
                instance["attachedFunctions"][i]().bind(self)();
            }
        };
        return new Vue(instance);
    };
})();

},{"Object-mixin":1}]},{},[2])