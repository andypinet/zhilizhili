(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function (document) {
    var app = document.querySelector('#app');
    var thumbnailIndex = 0;
    var lastThumbnailIndex = 0;
    var zhilizhiliSlider;
    var control;
    var totallength;
    var prevHandle = function prevHandle() {
        if (thumbnailIndex != 0) {
            thumbnailIndex--;
            control.$.simpleSliderWrapper.children.item(lastThumbnailIndex).classList.remove('active');
            control.$.simpleSliderWrapper.children.item(thumbnailIndex).classList.add('active');
            zhilizhiliSlider.go(thumbnailIndex);
            if (thumbnailIndex < totallength - 2) {
                if (lastThumbnailIndex == 3 || lastThumbnailIndex == 4) {
                    if (thumbnailIndex == 1) {
                        control.go(0);
                    } else {
                        control.go(thumbnailIndex - 2);
                    }
                } else {
                    if (thumbnailIndex > 1) {
                        control.go(thumbnailIndex - 2);
                    }
                }
            }
            lastThumbnailIndex = thumbnailIndex;
        }
    };
    var nextHandle = function nextHandle() {
        if (thumbnailIndex < totallength - 1) {
            thumbnailIndex++;
            control.$.simpleSliderWrapper.children.item(lastThumbnailIndex).classList.remove('active');
            control.$.simpleSliderWrapper.children.item(thumbnailIndex).classList.add('active');
            zhilizhiliSlider.go(thumbnailIndex);
            if (thumbnailIndex > 2) {
                if (thumbnailIndex < totallength - 2) {
                    control.go(thumbnailIndex - 2);
                }
            }
            lastThumbnailIndex = thumbnailIndex;
        }
    };
    var showModal = false;
    var hideModal = function hideModal() {
        if (showModal) {
            showModal = false;
            app.$.modal.classList.remove('modal--default');
            app.$.modal.classList.add('modal--hide');
        }
    };
    app.prevSliderHandle = prevHandle;
    app.onPrev = prevHandle;
    app.nextSliderHandle = nextHandle;
    app.onNext = nextHandle;
    app.showModalHandle = function () {
        if (!showModal) {
            showModal = true;
            app.$.modal.classList.remove('modal--hide');
            app.$.modal.classList.add('modal--default');
        }
    };
    app.hideModalHandle = hideModal;
    app.addEventListener('dom-change', function () {
        zhilizhiliSlider = app.$.gallerySlider;
        control = app.$.galleryControls;
        totallength = control.$.simpleSliderWrapper.children.length;
        var maxmove = totallength - 5;
        app.$.prevkey.target = document.body;
        app.$.nextkey.target = document.body;
        app.$.hidekey.target = document.body;
        Array.prototype.slice.call(control.$.simpleSliderWrapper.children).forEach(function (button, index) {
            var debfun = function debfun() {
                if (index != lastThumbnailIndex) {
                    control.$.simpleSliderWrapper.children.item(lastThumbnailIndex).classList.remove('active');
                    button.classList.add('active');
                    zhilizhiliSlider.go(index);
                    if (index > lastThumbnailIndex) {
                        if (index > 2) {
                            if (index - 2 < maxmove) {
                                control.go(index - 2);
                            } else {
                                control.go(maxmove);
                            }
                        }
                    } else {
                        if (index < totallength - 2) {
                            if (lastThumbnailIndex == 3 || lastThumbnailIndex == 4) {
                                if (index == 1) {
                                    control.go(0);
                                } else {
                                    control.go(index - 2);
                                }
                            } else {
                                if (index > 1) {
                                    control.go(index - 2);
                                }
                            }
                        }
                    }
                    thumbnailIndex = index;
                    lastThumbnailIndex = index;
                }
            };
            button.addEventListener('click', debfun);
        });
    });
    window.addEventListener('WebComponentsReady', function () {
        document.addEventListener('keydown', function (e) {
            if (e.which == 27) {
                hideModal();
            }
        }, false);
    });
})(document);

},{}]},{},[1])
//# sourceMappingURL=../maps/js/show.js.map
