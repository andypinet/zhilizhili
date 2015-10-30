(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var app = document.querySelector('#app');

function showVieo() {
    var videos = document.querySelectorAll('.video');
    var videoInfo = document.querySelector('.video-info');
    Array.prototype.slice.call(videos).forEach(function (video, index) {
        var info = video.querySelector('.info');
        var infoEmpty = video.querySelector('.info-empty');
        video.addEventListener('click', function handle() {
            if (info.innerText.trim() == '') {
                videoInfo.innerHTML = infoEmpty.innerHTML;
            } else {
                videoInfo.innerHTML = info.innerHTML;
            }
        }, false);
    });
}

var PlayAvContrller = (function (_ViewController) {
    _inherits(PlayAvContrller, _ViewController);

    function PlayAvContrller(name) {
        _classCallCheck(this, PlayAvContrller);

        _get(Object.getPrototypeOf(PlayAvContrller.prototype), 'constructor', this).call(this);
        this.name = 'PlayAvController';
    }

    _createClass(PlayAvContrller, [{
        key: 'domChange',
        value: function domChange() {
            var self = this;
            showVieo();
        }
    }, {
        key: 'fun',
        value: function fun() {}
    }]);

    return PlayAvContrller;
})(ViewController);

bootstrap(new PlayAvContrller('hihi'), app);

},{}]},{},[1])
//# sourceMappingURL=../../maps/js/article/index.js.map
