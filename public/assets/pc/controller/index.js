(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UIViewController = (function () {
    function UIViewController(element) {
        _classCallCheck(this, UIViewController);

        this.element = element;
    }

    _createClass(UIViewController, [{
        key: 'domChange',
        value: function domChange() {}
    }]);

    return UIViewController;
})();

var protos = [];
var currentProto = {};
function getProtoType(instance) {
    var ins = Object.getPrototypeOf(instance);
    if (ins instanceof UIViewController) {
        protos.unshift(ins);
        getProtoType(ins);
    } else {
        protos.unshift(ins);
        protos.forEach(function (proto) {
            var keys = Object.getOwnPropertyNames(proto);
            keys.forEach(function (key) {
                if (key !== 'constructor') {
                    currentProto[key] = proto[key];
                }
            });
        });
    }
}
function bootstrap(instance, element) {
    getProtoType(instance);
    var keys = Object.getOwnPropertyNames(currentProto);
    keys.forEach(function (key) {
        if (key !== "constructor") {
            element[key] = currentProto[key];
        }
    });
    for (var key in instance) {
        element[key] = instance[key];
    }
    element.addEventListener('dom-change', function () {
        element.domChange();
    });
    return element;
}
function delegate(target) {
    console.log("View-Controller" + target.selector);
    window.addEventListener("WebComponentsReady", function () {
        var element = document.querySelector("View-Controller" + target.selector);
        var viewcontroller = new target(element);
        bootstrap(viewcontroller, element);
    });
}
exports.UIViewController = UIViewController;
exports.delegate = delegate;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _UIViewController2 = require("../../framework/controller/UIViewController");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/// <reference path="../../../../typings/polymer-ts/polymer-ts.d.ts" />
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

var IndexViewController = (function (_UIViewController) {
    _inherits(IndexViewController, _UIViewController);

    function IndexViewController(element) {
        _classCallCheck(this, IndexViewController);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IndexViewController).call(this, element));

        var self = _this;
        document.querySelector('#hihi').addEventListener('response', function () {
            self.readytoshowlist();
        });
        return _this;
    }

    _createClass(IndexViewController, [{
        key: "readytoshowlist",
        value: function readytoshowlist() {
            var player = document.querySelector('audio-player');
            setTimeout(function () {
                var musiclists = document.querySelectorAll('.vis-audio-player__list-item');
                Array.prototype.slice.call(musiclists).forEach(function (musiclist, index) {
                    musiclist.addEventListener('click', function (e) {
                        player.toggleAtIndex(index);
                    });
                });
                player.addEventListener('audio-player-playend', function (e) {
                    console.log("end");
                    player.toggleNext();
                }, false);
            }, 0);
        }
    }]);

    return IndexViewController;
})(_UIViewController2.UIViewController);
IndexViewController.selector = "#index";
IndexViewController = __decorate([_UIViewController2.delegate], IndexViewController);

},{"../../framework/controller/UIViewController":1}]},{},[2])