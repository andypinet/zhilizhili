(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _Object$getPrototypeO;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _rangeSlider = require("../../lib/rangeSlider");

var _rangeSlider2 = _interopRequireDefault(_rangeSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/// <reference path="../../../../../public/bower_components/polymer-ts/polymer-ts.d.ts" />
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key), void 0;
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};

var MediaBehavior = (function (_polymer$Base) {
    _inherits(MediaBehavior, _polymer$Base);

    function MediaBehavior() {
        _classCallCheck(this, MediaBehavior);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(MediaBehavior).apply(this, arguments));
    }

    _createClass(MediaBehavior, [{
        key: "created",
        value: function created() {
            console.log("created");
            this.stopped = true;
        }
    }, {
        key: "play",
        value: function play(mediaelement) {
            mediaelement.play();
            this.stopped = false;
            this.fire("audioplay");
        }
    }, {
        key: "pause",
        value: function pause(mediaelement) {
            mediaelement.pause();
            this.fire("audiopause");
        }
    }, {
        key: "stop",
        value: function stop(mediaelement) {
            mediaelement.pause();
            mediaelement.currentTime = 0;
            this.stopped = true;
            this.fire("audiostop");
        }
    }, {
        key: "toggle",
        value: function toggle(mediaelement) {
            var self = this;
            if (mediaelement.paused) {
                self.play(mediaelement);
            } else {
                self.pause(mediaelement);
            }
        }
    }]);

    return MediaBehavior;
})(polymer.Base);

var AudioPlayer = (function (_polymer$Base2) {
    _inherits(AudioPlayer, _polymer$Base2);

    function AudioPlayer() {
        _classCallCheck(this, AudioPlayer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AudioPlayer)).call.apply(_Object$getPrototypeO, [this].concat(_toConsumableArray(args))));

        _this2.currentIndex = 0;
        _this2.formatCurrentTime = 0;
        _this2.formatDuration = 0;
        return _this2;
    }

    _createClass(AudioPlayer, [{
        key: "ready",
        value: function ready() {
            var self = this;
            this.initEle();
            self.sourcelement = self.$.visAudio.querySelector('source');
            self.duration = 600;
            self.changing = false;
        }
    }, {
        key: "readytoshow",
        value: function readytoshow() {
            var self = this;
            console.dir(this);
            console.dir(this.items);
            self.setsource(self.$.visAudio, self.items[self.currentIndex].location);
            var index = 0;
            self.fire("readytoshow");
        }
    }, {
        key: "setsource",
        value: function setsource(element, src) {
            console.log(src);
            element.src = src;
        }
    }, {
        key: "prev",
        value: function prev() {
            var self = this;
            if (self.currentIndex > 0) {
                self.currentIndex--;
                self.setsource(self.$.visAudio, self.items[self.currentIndex].location);
                return true;
            }
            return false;
        }
    }, {
        key: "next",
        value: function next() {
            var self = this;
            if (self.currentIndex < self.items.length - 1) {
                self.currentIndex++;
                self.setsource(self.$.visAudio, self.items[self.currentIndex].location);
                return true;
            }
            return false;
        }
    }, {
        key: "initEle",
        value: function initEle() {
            var self = this;
            var videorange = self.$.videorange;
            var videoprogress = self.$.videoprogress;
            var videovolume = self.$.videovolume;
            _rangeSlider2.default.create(videorange, {
                onSlide: function onSlide(value, parent, position) {},
                onSlideEnd: function onSlideEnd() {}
            });
            _rangeSlider2.default.create(videoprogress, {
                startEvent: []
            });
        }
    }, {
        key: "updatePaperSlider",
        value: function updatePaperSlider(value) {
            var self = this;
            // 更新加载进度
            self.$.videoprogress.value = value / self.duration * 100;
            self.$.videoprogress.rangeSlider.update();
        }
        // 引入时

    }, {
        key: "HanlderLoadStart",
        value: function HanlderLoadStart(e) {
            console.log("start");
            var self = this;
            self.addEventListener("audioplay", function () {
                self.async(function () {}, 3000);
            });
        }
        /**
         * 引入成功 开始播放
         */

    }, {
        key: "HandlerLoad",
        value: function HandlerLoad() {
            var self = this;
            console.log("go");
            console.log(self.$.visAudio.src);
            console.log(self.$.visAudio.duration);
            console.log("end go");
            self.currentTime = self.$.visAudio.currentTime;
            self.duration = self.$.visAudio.duration;
            self.formatCurrentTime = self.currentTime;
            self.formatDuration = self.duration;
            if (self.$.visAudio.buffered.length > 0) {
                self.updatePaperSlider(self.$.visAudio.buffered.end(0));
            }
            self.$.videorange.rangeSlider.update();
        }
        // 播放时更新

    }, {
        key: "HandlerTimeUpdate",
        value: function HandlerTimeUpdate(e) {
            var self = this;
            self.formatCurrentTime = self.$.visAudio.currentTime;
            self.$.videorange.value = self.$.visAudio.currentTime / self.duration * 100;
            if (!self.changing) {
                self.$.videorange.rangeSlider.update();
            }
        }
        // 音频加载

    }, {
        key: "HanlderProgress",
        value: function HanlderProgress(e) {
            var self = this;
            var range = 0;
            var bf = self.$.visAudio.buffered;
            var time = self.$.visAudio.currentTime;
            if (bf.length > 0) {
                var loadEnd = bf.end(bf.length - 1);
                self.updatePaperSlider(loadEnd);
            }
        }
        // 中断时

    }, {
        key: "HandleAbort",
        value: function HandleAbort(e) {
            console.log("abort");
        }
        // 暂停时

    }, {
        key: "HandlePause",
        value: function HandlePause(e) {
            console.log("pause");
        }
        // 播放结束

    }, {
        key: "HandlerPlayEnd",
        value: function HandlerPlayEnd(e) {
            var self = this;
            self.$.videorange.value = 0;
            if (!self.changing) {
                self.$.videorange.rangeSlider.update();
            }
            self.fire("audio-player-playend");
        }
    }, {
        key: "HandlerTimeChange",
        value: function HandlerTimeChange(value) {
            var self = this;
            if (self.duration && !Number.isNaN(self.duration)) {
                self.changing = true;
                self.$.videoMedia.currentTime = value / 100 * self.duration;
            }
        }
        /**
         * 处理播放暂停
         */

    }, {
        key: "toggleHandle",
        value: function toggleHandle() {
            var self = this;
            self.$.toggleAudioButton.toggle();
            self.toggle(self.$.visAudio);
        }
        /**
         * 处理上一首
         */

    }, {
        key: "togglePrev",
        value: function togglePrev() {
            var self = this;
            if (self.currentIndex > 0) {
                self.pause(self.$.visAudio);
                self.prev();
                self.play(self.$.visAudio);
                self.$.toggleAudioButton.toggle();
            } else {
                console.log('已经到第一首了');
            }
        }
        /**
         * 处理下一首
         */

    }, {
        key: "toggleNext",
        value: function toggleNext() {
            var self = this;
            if (self.currentIndex < self.items.length - 1) {
                self.pause(self.$.visAudio);
                self.next();
                self.play(self.$.visAudio);
                self.$.toggleAudioButton.toggle();
            } else {
                console.log('已经到最后一首了');
            }
        }
        /**
         * 听指定歌
         *
         * @param index
         */

    }, {
        key: "toggleAtIndex",
        value: function toggleAtIndex(index) {
            var self = this;
            if (0 < index < self.items.length - 1) {
                self.currentIndex = index;
                self.pause(self.$.visAudio);
                self.setsource(self.$.visAudio, self.items[self.currentIndex].location);
                self.play(self.$.visAudio);
                self.$.toggleAudioButton.toggle();
            } else {
                console.log('已经到最后一首了');
            }
        }
    }]);

    return AudioPlayer;
})(polymer.Base);
__decorate([property({ type: Object })], AudioPlayer.prototype, "items");
__decorate([property({ type: Number })], AudioPlayer.prototype, "currentTime");
__decorate([property({ type: Number })], AudioPlayer.prototype, "duration");
__decorate([property({ type: Number })], AudioPlayer.prototype, "formatCurrentTime");
__decorate([property({ type: Number })], AudioPlayer.prototype, "formatDuration");
AudioPlayer = __decorate([component("audio-player"), behavior(MediaBehavior)], AudioPlayer);
AudioPlayer.register();

},{"../../lib/rangeSlider":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var EVENT_LISTENER_LIST = 'eventListenerList';
var newLineAndTabRegexp = new RegExp('/[\\n\\t]/', 'g');
var MAX_SET_BY_DEFAULT = 100;
var HANDLE_RESIZE_DELAY = 300;
var HANDLE_RESIZE_DEBOUNCE = 50;
/**
 * Range feature detection
 * @return {Boolean}
 */
function supportsRange() {
    var input = document.createElement('input');
    input.setAttribute('type', 'range');
    return input.type !== 'text';
}
var pluginName = 'rangeSlider',
    pluginIdentifier = 0,
    inputrange = supportsRange(),
    defaults = {
    polyfill: true,
    rangeClass: 'rangeSlider',
    disabledClass: 'rangeSlider--disabled',
    fillClass: 'rangeSlider__fill',
    bufferClass: 'rangeSlider__buffer',
    handleClass: 'rangeSlider__handle',
    startEvent: ['mousedown', 'touchstart', 'pointerdown'],
    moveEvent: ['mousemove', 'touchmove', 'pointermove'],
    endEvent: ['mouseup', 'touchend', 'pointerup'],
    min: null,
    max: null,
    step: null,
    value: null,
    buffer: null,
    borderRadius: 10
};
/**
 * Delays a function for the given number of milliseconds, and then calls
 * it with the arguments supplied.
 *
 * @param  {Function} fn   [description]
 * @param  {Number}   wait [description]
 * @return {Function}
 */
function delay(fn, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function () {
        return fn.apply(null, args);
    }, wait);
}
/**
 * Returns a debounced function that will make sure the given
 * function is not triggered too much.
 *
 * @param  {Function} fn Function to debounce.
 * @param  {Number}   debounceDuration OPTIONAL. The amount of time in milliseconds for which we will debounce the function. (defaults to 100ms)
 * @return {Function}
 */
function debounce(fn, debounceDuration) {
    debounceDuration = debounceDuration || 100;
    return function () {
        if (!fn.debouncing) {
            var args = Array.prototype.slice.apply(arguments);
            fn.lastReturnVal = fn.apply(window, args);
            fn.debouncing = true;
        }
        clearTimeout(fn.debounceTimeout);
        fn.debounceTimeout = setTimeout(function () {
            fn.debouncing = false;
        }, debounceDuration);
        return fn.lastReturnVal;
    };
}
/**
 * Check if a `element` is visible in the DOM
 *
 * @param  {Element}  element
 * @return {Boolean}
 */
function isHidden(element) {
    return !!(element.offsetWidth === 0 || element.offsetHeight === 0 || element.open === false);
}
/**
 * Get hidden parentNodes of an `element`
 *
 * @param  {Element} element
 * @return {[type]}
 */
function getHiddenParentNodes(element) {
    var parents = [],
        node = element.parentNode;
    while (isHidden(node)) {
        parents.push(node);
        node = node.parentNode;
    }
    return parents;
}
/**
 * Returns dimensions for an element even if it is not visible in the DOM.
 *
 * @param  {Element} element
 * @param  {string}  key     (e.g. offsetWidth …)
 * @return {Number}
 */
function getDimension(element, key) {
    var hiddenParentNodes = getHiddenParentNodes(element),
        hiddenParentNodesLength = hiddenParentNodes.length,
        displayProperty = [],
        dimension = element[key];
    // Used for native `<details>` elements
    function toggleOpenProperty(element) {
        if (typeof element.open !== 'undefined') {
            element.open = element.open ? false : true;
        }
    }
    if (hiddenParentNodesLength) {
        for (var i = 0; i < hiddenParentNodesLength; i++) {
            // Cache the display property to restore it later.
            displayProperty[i] = hiddenParentNodes[i].style.display;
            hiddenParentNodes[i].style.display = 'block';
            hiddenParentNodes[i].style.height = '0';
            hiddenParentNodes[i].style.overflow = 'hidden';
            hiddenParentNodes[i].style.visibility = 'hidden';
            toggleOpenProperty(hiddenParentNodes[i]);
        }
        dimension = element[key];
        for (var j = 0; j < hiddenParentNodesLength; j++) {
            toggleOpenProperty(hiddenParentNodes[j]);
            hiddenParentNodes[j].style.display = displayProperty[j];
            hiddenParentNodes[j].style.height = '';
            hiddenParentNodes[j].style.overflow = '';
            hiddenParentNodes[j].style.visibility = '';
        }
    }
    return dimension;
}
function isString(obj) {
    return obj === '' + obj;
}
function isNumberLike(obj) {
    return obj !== null && obj !== undefined && (isString(obj) && isFinite(parseFloat(obj)) || isFinite(obj));
}
function getFirsNumberLike() {
    if (!arguments.length) {
        return null;
    }
    for (var i = 0, len = arguments.length; i < len; i++) {
        if (isNumberLike(arguments[i])) {
            return arguments[i];
        }
    }
}
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
function simpleExtend(defaultOpt, options) {
    var opt = {},
        key;
    for (key in defaultOpt) {
        opt[key] = defaultOpt[key];
    }
    for (key in options) {
        opt[key] = options[key];
    }
    return opt;
}
/**
 *
 * @param {HTMLElement} el
 * @param {Object} cssObj
 * @returns {*}
 */
function setCss(el, cssObj) {
    for (var key in cssObj) {
        el.style[key] = cssObj[key];
    }
    return el.style;
}
/**
 *
 * @param {HTMLElement} elem
 * @param {string} className
 */
function addClass(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}
/**
 *
 * @param {HTMLElement} elem
 * @param {string} className
 */
function removeClass(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}
/**
 *
 * @param {HTMLElement} el
 * @callback callback
 * @param {boolean} andForElement - apply callback for el
 * @returns {HTMLElement}
 */
function forEachAncestors(el, callback, andForElement) {
    if (andForElement) {
        callback(el);
    }
    while (el.parentNode && !callback(el)) {
        el = el.parentNode;
    }
    return el;
}
/**
 *
 * @param {HTMLElement} el
 * @param {string} name event name
 * @param {Object} data
 */
function triggerEvent(el, name, data) {
    if (!isString(name)) {
        throw new TypeError('event name must be String');
    }
    if (!(el instanceof HTMLElement)) {
        throw new TypeError('element must be HTMLElement');
    }
    name = name.trim();
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(name, false, false, data);
    el.dispatchEvent(event);
}
/**
 *
 * @param {HTMLElement} elem
 * @param {string} className
 */
function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
/**
 * @param {Object} referenceNode after this
 * @param {Object} newNode insert this
 */
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
/**
 * Add event listeners and push them to el[EVENT_LISTENER_LIST]
 * @param {HTMLElement} el DOM element
 * @param {Array} events
 * @callback listener
 */
function addEventListeners(el, events, listener) {
    events.forEach(function (eventName) {
        if (!el[EVENT_LISTENER_LIST]) {
            el[EVENT_LISTENER_LIST] = {};
        }
        if (!el[EVENT_LISTENER_LIST][eventName]) {
            el[EVENT_LISTENER_LIST][eventName] = [];
        }
        el.addEventListener(eventName, listener, false);
        if (el[EVENT_LISTENER_LIST][eventName].indexOf(listener) < 0) {
            el[EVENT_LISTENER_LIST][eventName].push(listener);
        }
    });
}
/**
 * Remove event listeners and remove them from el[EVENT_LISTENER_LIST]
 * @param {HTMLElement} el DOM element
 * @param {Array} events
 * @callback listener
 */
function removeEventListeners(el, events, listener) {
    events.forEach(function (eventName) {
        el.removeEventListener(eventName, listener, false);
        var index;
        if (el[EVENT_LISTENER_LIST] && el[EVENT_LISTENER_LIST][eventName] && (index = el[EVENT_LISTENER_LIST][eventName].indexOf(listener)) > -1) {
            el[EVENT_LISTENER_LIST][eventName].splice(index, 1);
        }
    });
}
/**
 * Remove ALL event listeners which exists in el[EVENT_LISTENER_LIST]
 * @param {HTMLElement} el DOM element
 */
function removeAllListenersFromEl(el) {
    if (!el[EVENT_LISTENER_LIST]) {
        return;
    }
    /* jshint ignore:start */
    var instance = this;
    /**
     *
     * @callback listener
     * @this {Object} event name
     */
    function rm(listener) {
        if (listener === instance._startEventListener) {
            this.el.removeEventListener(this.eventName, listener, false);
        }
    }
    for (var eventName in el[EVENT_LISTENER_LIST]) {
        el[EVENT_LISTENER_LIST][eventName].forEach(rm, { eventName: eventName, el: el });
    }
    el[EVENT_LISTENER_LIST] = {};
    /* jshint ignore:end */
}
/**
 * Plugin
 * @param {HTMLElement} element
 * @param {this} options
 */
function Plugin(element, options) {
    var minSetByDefault, maxSetByDefault, stepSetByDefault;
    this.element = element;
    this.options = simpleExtend(defaults, options);
    this.polyfill = this.options.polyfill;
    this.onInit = this.options.onInit;
    this.onSlide = this.options.onSlide;
    this.onSlideStart = this.options.onSlideStart;
    this.onSlideEnd = this.options.onSlideEnd;
    this.onSlideEventsCount = -1;
    this.isInteractsNow = false;
    this.needTriggerEvents = false;
    // Plugin should only be used as a polyfill
    if (!this.polyfill) {
        // Input range support?
        if (inputrange) {
            return false;
        }
    }
    this.options.buffer = this.options.buffer || parseFloat(this.element.getAttribute('data-buffer'));
    this.identifier = 'js-' + pluginName + '-' + pluginIdentifier++;
    this.min = getFirsNumberLike(this.options.min, parseFloat(this.element.getAttribute('min')), minSetByDefault = 0);
    this.max = getFirsNumberLike(this.options.max, parseFloat(this.element.getAttribute('max')), maxSetByDefault = MAX_SET_BY_DEFAULT);
    this.value = getFirsNumberLike(this.options.value, this.element.value, parseFloat(this.element.value || this.min + (this.max - this.min) / 2));
    this.step = getFirsNumberLike(this.options.step, parseFloat(this.element.getAttribute('step')) || (stepSetByDefault = 1));
    this.percent = null;
    this._updatePercentFromValue();
    this.toFixed = this._toFixed(this.step);
    this.fill = document.createElement('div');
    this.fill.className = this.options.fillClass;
    this.handle = document.createElement('div');
    this.handle.className = this.options.handleClass;
    this.range = document.createElement('div');
    this.range.className = this.options.rangeClass;
    this.range.id = this.identifier;
    this.range.appendChild(this.handle);
    this.range.appendChild(this.fill);
    if (this.options.bufferClass) {
        this.buffer = document.createElement('div');
        this.buffer.className = this.options.bufferClass;
        this.range.appendChild(this.buffer);
    }
    if (isNumberLike(this.options.value)) {
        this._setValue(this.options.value, true);
        this.element.value = this.options.value;
    }
    if (isNumberLike(this.options.buffer)) {
        this.element.setAttribute('data-buffer', this.options.buffer);
    }
    if (isNumberLike(this.options.min) || minSetByDefault) {
        this.element.setAttribute('min', '' + this.min);
    }
    if (isNumberLike(this.options.max) || maxSetByDefault) {
        this.element.setAttribute('max', '' + this.max);
    }
    if (isNumberLike(this.options.step) || stepSetByDefault) {
        this.element.setAttribute('step', '' + this.step);
    }
    insertAfter(this.element, this.range);
    // visually hide the input
    setCss(this.element, {
        'position': 'absolute',
        'width': '1px',
        'height': '1px',
        'overflow': 'hidden',
        'opacity': '0'
    });
    // Store context
    this._handleDown = this._handleDown.bind(this);
    this._handleMove = this._handleMove.bind(this);
    this._handleEnd = this._handleEnd.bind(this);
    this._startEventListener = this._startEventListener.bind(this);
    this._changeEventListener = this._changeEventListener.bind(this);
    this._handleResize = this._handleResize.bind(this);
    this._init();
    //// Attach Events
    window.addEventListener('resize', this._handleResize, false);
    addEventListeners(document, this.options.startEvent, this._startEventListener);
    // Listen to programmatic value changes
    this.element.addEventListener('change', this._changeEventListener, false);
}
Plugin.prototype.constructor = Plugin;
Plugin.prototype._toFixed = function (step) {
    return (step + '').replace('.', '').length - 1;
};
Plugin.prototype._init = function () {
    if (this.onInit && typeof this.onInit === 'function') {
        this.onInit();
    }
    this._update();
};
Plugin.prototype._updatePercentFromValue = function () {
    this.percent = (this.value - this.min) / (this.max - this.min);
};
/**
 * This method check if this.identifier exists in ev.target's ancestors
 * @param ev
 * @param data
 */
Plugin.prototype._startEventListener = function (ev, data) {
    var _this = this;
    var el = ev.target;
    var isEventOnSlider = false;
    forEachAncestors(el, function (el) {
        return isEventOnSlider = el.id === _this.identifier && !hasClass(el, _this.options.disabledClass);
    }, true);
    if (isEventOnSlider) {
        this._handleDown(ev, data);
    }
};
Plugin.prototype._changeEventListener = function (ev, data) {
    if (data && data.origin === this.identifier) {
        return;
    }
    var value = ev.target.value,
        pos = this._getPositionFromValue(value);
    this._setPosition(pos);
};
Plugin.prototype._update = function () {
    this.handleWidth = getDimension(this.handle, 'offsetWidth');
    this.rangeWidth = getDimension(this.range, 'offsetWidth');
    this.maxHandleX = this.rangeWidth - this.handleWidth;
    this.grabX = this.handleWidth / 2;
    this.position = this._getPositionFromValue(this.value);
    // Consider disabled state
    if (this.element.disabled) {
        addClass(this.range, this.options.disabledClass);
    } else {
        removeClass(this.range, this.options.disabledClass);
    }
    this._setPosition(this.position);
    if (this.options.bufferClass && this.options.buffer) {
        this._setBufferPosition(this.options.buffer);
    }
    this._updatePercentFromValue();
    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, false);
    this.element.dispatchEvent(event);
};
Plugin.prototype._handleResize = function () {
    var _this = this;
    return debounce(function () {
        // Simulate resizeEnd event.
        delay(function () {
            _this._update();
        }, HANDLE_RESIZE_DELAY);
    }, HANDLE_RESIZE_DEBOUNCE)();
};
Plugin.prototype._handleDown = function (e) {
    this.isInteractsNow = true;
    e.preventDefault();
    addEventListeners(document, this.options.moveEvent, this._handleMove);
    addEventListeners(document, this.options.endEvent, this._handleEnd);
    // If we click on the handle don't set the new position
    if ((' ' + e.target.className + ' ').replace(newLineAndTabRegexp, ' ').indexOf(this.options.handleClass) > -1) {
        return;
    }
    var posX = this._getRelativePosition(e),
        rangeX = this.range.getBoundingClientRect().left,
        handleX = this._getPositionFromNode(this.handle) - rangeX;
    this._setPosition(posX - this.grabX);
    if (posX >= handleX && posX < handleX + this.handleWidth) {
        this.grabX = posX - handleX;
    }
    this._updatePercentFromValue();
};
Plugin.prototype._handleMove = function (e) {
    this.isInteractsNow = true;
    e.preventDefault();
    var posX = this._getRelativePosition(e);
    this._setPosition(posX - this.grabX);
    //this.isInteractsNow = false;
};
Plugin.prototype._handleEnd = function (e) {
    e.preventDefault();
    removeEventListeners(document, this.options.moveEvent, this._handleMove);
    removeEventListeners(document, this.options.endEvent, this._handleEnd);
    // Ok we're done fire the change event
    triggerEvent(this.element, 'change', { origin: this.identifier });
    if (this.isInteractsNow || this.needTriggerEvents) {
        if (this.onSlideEnd && typeof this.onSlideEnd === 'function') {
            this.onSlideEnd(this.value, this.percent, this.position);
        }
    }
    this.onSlideEventsCount = 0;
    this.isInteractsNow = false;
};
Plugin.prototype._cap = function (pos, min, max) {
    if (pos < min) {
        return min;
    }
    if (pos > max) {
        return max;
    }
    return pos;
};
Plugin.prototype._setPosition = function (pos) {
    var value, left;
    // Snapping steps
    value = this._getValueFromPosition(this._cap(pos, 0, this.maxHandleX));
    left = this._getPositionFromValue(value);
    // Update ui
    this.fill.style.width = left + this.grabX + 'px';
    this.handle.style.left = left + 'px';
    this._setValue(value);
    // Update globals
    this.position = left;
    this.value = value;
    this._updatePercentFromValue();
    if (this.isInteractsNow || this.needTriggerEventss) {
        if (this.onSlideStart && typeof this.onSlideStart === 'function' && this.onSlideEventsCount === 0) {
            this.onSlideStart(this.value, this.percent, this.position);
        }
        if (this.onSlide && typeof this.onSlide === 'function') {
            this.onSlide(this.value, this.percent, this.position);
        }
    }
    this.onSlideEventsCount++;
};
Plugin.prototype._setBufferPosition = function (pos) {
    var isPercent = true,
        bufferWidth,
        paddingWidth,
        bufferWidthWithPadding;
    if (isFinite(pos)) {
        pos = parseFloat(pos);
    } else if (isString(pos)) {
        if (pos.indexOf('px') > 0) {
            isPercent = false;
        }
        pos = parseFloat(pos);
    } else {
        console.warn('New position must be XXpx or XX%');
        return;
    }
    if (isNaN(pos)) {
        console.warn('New position is NaN');
        return;
    }
    if (!this.options.bufferClass) {
        console.warn('You disabled buffer, it\'s className is empty');
        return;
    }
    bufferWidth = isPercent ? pos : pos / this.rangeWidth * 100;
    if (bufferWidth < 0) {
        bufferWidth = 0;
    }
    if (bufferWidth > 100) {
        bufferWidth = 100;
    }
    this.options.buffer = bufferWidth;
    paddingWidth = this.options.borderRadius / this.rangeWidth * 100;
    bufferWidthWithPadding = bufferWidth - paddingWidth;
    if (bufferWidthWithPadding < 0) {
        bufferWidthWithPadding = 0;
    }
    this.buffer.style.width = bufferWidthWithPadding + '%';
    this.buffer.style.left = paddingWidth * 0.5 + '%';
    this.element.setAttribute('data-buffer', bufferWidth);
};
// Returns element position relative to the parent
Plugin.prototype._getPositionFromNode = function (node) {
    var i = 0;
    while (node !== null) {
        i += node.offsetLeft;
        node = node.offsetParent;
    }
    return i;
};
/**
 *
 * @param {(MouseEvent|TouchEvent)}e
 * @returns {number}
 */
Plugin.prototype._getRelativePosition = function (e) {
    // Get the offset left relative to the viewport
    var rangeX = this.range.getBoundingClientRect().left,
        pageX = 0;
    if (typeof e.pageX !== 'undefined') {
        pageX = e.touches && e.touches.length ? e.touches[0].pageX : e.pageX;
    } else if (typeof e.originalEvent !== 'undefined') {
        if (typeof e.originalEvent.clientX !== 'undefined') {
            pageX = e.originalEvent.clientX;
        } else if (e.originalEvent.touches && e.originalEvent.touches[0] && typeof e.originalEvent.touches[0].clientX !== 'undefined') {
            pageX = e.originalEvent.touches[0].clientX;
        }
    } else if (e.touches && e.touches[0] && typeof e.touches[0].clientX !== 'undefined') {
        pageX = e.touches[0].clientX;
    } else if (e.currentPoint && typeof e.currentPoint.x !== 'undefined') {
        pageX = e.currentPoint.x;
    }
    return pageX - rangeX;
};
Plugin.prototype._getPositionFromValue = function (value) {
    var percentage, pos;
    percentage = (value - this.min) / (this.max - this.min);
    pos = percentage * this.maxHandleX;
    return pos;
};
Plugin.prototype._getValueFromPosition = function (pos) {
    var percentage, value;
    percentage = pos / (this.maxHandleX || 1);
    value = this.step * Math.round(percentage * (this.max - this.min) / this.step) + this.min;
    return Number(value.toFixed(this.toFixed));
};
Plugin.prototype._setValue = function (value, force) {
    if (value === this.value && !force) {
        return;
    }
    // Set the new value and fire the `input` event
    this.element.value = value;
    this.value = value;
    triggerEvent(this.element, 'input', { origin: this.identifier });
};
/**
 *
 * @param {Object} obj like {min : Number, max : Number, value : Number, step : Number, buffer : [String|Number]}
 * @param {Boolean} triggerEvents
 * @returns {Plugin}
 */
Plugin.prototype.update = function (obj, triggerEvents) {
    if (triggerEvents) {
        this.needTriggerEvents = true;
    }
    if (isObject(obj)) {
        if (isNumberLike(obj.min)) {
            this.element.setAttribute('min', '' + obj.min);
            this.min = obj.min;
        }
        if (isNumberLike(obj.max)) {
            this.element.setAttribute('max', '' + obj.max);
            this.max = obj.max;
        }
        if (isNumberLike(obj.step)) {
            this.element.setAttribute('step', '' + obj.step);
            this.step = obj.step;
            this.toFixed = this._toFixed(obj.step);
        }
        if (isNumberLike(obj.buffer)) {
            this._setBufferPosition(obj.buffer);
        }
        if (isNumberLike(obj.value)) {
            this._setValue(obj.value);
        }
    }
    this._update();
    this.onSlideEventsCount = 0;
    this.needTriggerEvents = false;
    return this;
};
Plugin.prototype.destroy = function () {
    removeAllListenersFromEl.call(this, document);
    window.removeEventListener('resize', this._handleResize, false);
    this.element.removeEventListener('change', this._changeEventListener, false);
    this.element.style.cssText = '';
    delete this.element[pluginName];
    // Remove the generated markup
    if (this.range) {
        this.range.parentNode.removeChild(this.range);
    }
};
// A really lightweight plugin wrapper around the constructor,
// preventing against multiple instantiations
Plugin.create = function (el, options) {
    function createInstance(el) {
        var data = el[pluginName];
        // Create a new instance.
        if (!data) {
            data = new Plugin(el, options);
            el[pluginName] = data;
        }
    }
    if (el.length) {
        Array.prototype.slice.call(el).forEach(function (el) {
            createInstance(el);
        });
    } else {
        createInstance(el);
    }
};
exports.default = Plugin;

},{}]},{},[1])