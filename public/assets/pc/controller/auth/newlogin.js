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
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isOldIE = document.all && !window.atob;

validator.extend('min', function (length, str) {
    return str.length > parseInt(length) - 1;
});

validator.extend('max', function (length, str) {
    return str.length < parseInt(length) + 1;
});

var RegexTrait = (function () {
    function RegexTrait() {
        _classCallCheck(this, RegexTrait);
    }

    _createClass(RegexTrait, [{
        key: 'methods',
        value: function methods() {
            return {
                handleRegexError: function handleRegexError(e) {
                    var self = this;
                    self.$el.classList.add("error");
                    if (self.$el.classList.contains("success")) {
                        self.$el.classList.remove("success");
                    }
                },
                handleRegexSuccess: function handleRegexSuccess(e) {
                    console.log(e);
                    var self = this;
                    self.$el.classList.add("success");
                    if (self.$el.classList.contains("error")) {
                        self.$el.classList.remove("error");
                    }
                    //utils.validator.unuseregex(self.$el, self.$el.querySelector('input'));
                }
            };
        }
    }]);

    return RegexTrait;
})();

var TestTrait = (function () {
    function TestTrait() {
        _classCallCheck(this, TestTrait);
    }

    _createClass(TestTrait, [{
        key: 'attached',
        value: function attached() {
            return function () {
                var self = this;
                utils.validator.initregex.bind(self)(self.$el, self.$el.querySelector('input'), true);
            };
        }
    }]);

    return TestTrait;
})();

utils.component("#email", {}, {
    behaviors: [RegexTrait, TestTrait]
});

utils.component("#password", {}, {
    behaviors: [RegexTrait, TestTrait]
});

var regexFields = document.querySelector('#loginForm').queryAll("[data-regex]");

console.dir(regexFields);

document.querySelector('#loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var formRegexHandles = [];
    regexFields.forEach(function (el, index) {
        formRegexHandles.push({
            element: el,
            index: index,
            handle: utils.validator.getHandle(el)
        });
    });

    for (var i = 0; i < formRegexHandles.length; i++) {
        var element = formRegexHandles[i].element;
        var formRegexHandle = formRegexHandles[i].handle;
        var input = element.querySelector("input");
        if (isOldIE && input.value.trim() == input.getAttribute("placeholder").trim()) {
            var event = new CustomEvent("regex-error", {
                detail: null
            });
            element.dispatchEvent(event);
            continue;
        }
        if (!formRegexHandle.fun(element.querySelector("input").value)) {
            console.log(element.querySelector("input").value);
        }
    }
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