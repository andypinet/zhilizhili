/// <reference path="../../../../../public/typings/framework/framework.d.ts" />
/// <reference path="../../../../../public/typings/framework/utils.d.ts" />

(function(document) {

    var app = document.querySelector('#app');

    app.scrollviewchanged = function(e) {
        app.$.scrollviewnav.selected = e.detail.index;
    };

    app.viewchange = function(e) {
        app.$.scrollView.go(parseInt(e.target.dataset.viewIndex));
    };

    app.addEventListener('dom-change', function() {
    });

    window.addEventListener('WebComponentsReady', function() {
    });

})(document);