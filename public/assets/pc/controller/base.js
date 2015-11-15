(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewController = (function () {
    function ViewController() {
        _classCallCheck(this, ViewController);
    }

    _createClass(ViewController, [{
        key: 'domChange',
        value: function domChange() {}
    }]);

    return ViewController;
})();

var protos = [];
var currentProto = {};

function getProtoType(instance) {
    var ins = Object.getPrototypeOf(instance);
    if (ins instanceof ViewController) {
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

function bootstrap(instance, app) {
    getProtoType(instance);
    var keys = Object.getOwnPropertyNames(currentProto);
    keys.forEach(function (key) {
        if (key !== "constructor") {
            app[key] = currentProto[key];
        }
    });
    for (var key in instance) {
        app[key] = instance[key];
    }
    app.addEventListener('dom-change', function () {
        app.domChange();
    });
    return app;
}

window.ViewController = ViewController;
window.bootstrap = bootstrap;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

require("../../framework/controller/ViewController");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var app = document.querySelector('#app');

var BaseViewController = (function (_ViewController) {
    _inherits(BaseViewController, _ViewController);

    function BaseViewController() {
        _classCallCheck(this, BaseViewController);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(BaseViewController).call(this));
    }

    _createClass(BaseViewController, [{
        key: "domChange",
        value: function domChange() {
            app.$.toggleUserMenu.addEventListener("click", function (e) {
                app.$.userMenu.toggle();
            }, false);
        }
    }]);

    return BaseViewController;
})(ViewController);

bootstrap(new BaseViewController(), app);
//# sourceMappingURL=base.js.map

},{"../../framework/controller/ViewController":1}]},{},[2])