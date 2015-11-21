(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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
var ToggleButton = (function (_polymer$Base) {
    _inherits(ToggleButton, _polymer$Base);

    function ToggleButton() {
        _classCallCheck(this, ToggleButton);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ToggleButton).call(this));

        _this.applyedToggleClassname = false;
        return _this;
    }

    _createClass(ToggleButton, [{
        key: "attachToggleClassname",
        value: function attachToggleClassname() {
            var self = this;
            self.classList.add(self.toggleClassname);
            self.applyedToggleClassname = true;
        }
    }, {
        key: "detachToggleClassname",
        value: function detachToggleClassname() {
            var self = this;
            self.classList.remove(self.toggleClassname);
            self.applyedToggleClassname = false;
        }
    }, {
        key: "toggle",
        value: function toggle() {
            var self = this;
            if (!self.applyedToggleClassname) {
                self.attachToggleClassname();
            } else {
                self.detachToggleClassname();
            }
        }
    }]);

    return ToggleButton;
})(polymer.Base);
__decorate([property({ type: String })], ToggleButton.prototype, "toggleClassname");
ToggleButton = __decorate([
/// <reference path="../../../../../public/bower_components/polymer-ts/polymer-ts.d.ts" />
component("toggle-button")], ToggleButton);
ToggleButton.register();

},{}]},{},[1])