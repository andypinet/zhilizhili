(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var transformFactor = 0.4;
var shadowFactor = 2.0;

var scale = function scale(n, min, max) {
    return n * (max - min) + min;
};
var calculateAngle = function calculateAngle(x, y, width, height) {
    return Math.atan2(x - width / 2, -(y - height / 2)) * (180 / Math.PI);
};

var $square = $('.square');

var squareW = $square.width();
var squareH = $square.height();

$(document).on('mousemove', function (e) {
    var x = e.pageX - $square.offset().left;
    var y = e.pageY - $square.offset().top;

    var scaledX = scale(x / squareW, -1, 1);
    var scaledY = scale(y / squareH, -1, 1);

    var maxX = Math.atan2(15, squareH * .5 * 180 / Math.PI);
    var maxY = Math.atan2(15, squareW * .5 * 180 / Math.PI);
    var opacity = Math.max(Math.abs(scaledX / maxX), Math.abs(scaledY / maxY));

    var angle = calculateAngle(x, y, squareW, squareH);

    $square.css({
        transform: '\n        matrix3d(\n            1, 0, ' + -scaledX * transformFactor + ', 0,\n            0, 1, ' + -scaledY * transformFactor + ', 0,\n            0, 0, 1, 0,\n            0, 0, 0, 1\n        )'
    });
});

},{}]},{},[1])
//# sourceMappingURL=../maps/js/move.js.map
