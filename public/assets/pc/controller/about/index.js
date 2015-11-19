(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.theaterJS=t():e.theaterJS=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function u(){function e(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=arguments.length<=2||void 0===arguments[2]?null:arguments[2],r=i["default"](e,t,n);return A.casting[r.name]=r,this}function t(e){return A.onStage=e,this}function n(){return A.casting[A.onStage]||null}function r(){var e=this,t=l["default"].toArray(arguments);return t.forEach(function(t){if(f["default"].isString(t)){var n=t.split(":"),a=void 0;n.length>1&&"\\"!==n[0].charAt(n[0].length-1)&&(a=n.shift(),A.options.erase&&r({name:"erase",actor:a}));var u=n.join(":").replace(/\\:/g,":"),o={name:"type",args:[u]};null!=a&&(o.actor=a),r(o)}else f["default"].isFunction(t)?r({name:"callback",args:[t]}):f["default"].isNumber(t)?r(t>0?{name:"wait",args:[t]}:{name:"erase",args:[t]}):f["default"].isArray(t)?t.forEach(function(e){r(e)}):f["default"].isObject(t)&&(f["default"].isArray(t.args)||(t.args=[]),t.args.unshift(c.bind(e)),A.scenario.push(t))}),A.options.autoplay&&u(),this}function u(){return"ready"===A.status&&(A.status="playing",c()),this}function o(e){return("ready"===A.status||f["default"].isFunction(e))&&(A.currentScene=-1,"ready"===A.status?u():e()),this}function s(){return A.status="ready",this}function c(){if("playing"!==A.status)return this;var e=A.scenario[A.currentScene];if(null!=e&&x(e.name+":end",e),A.currentScene+1>=A.scenario.length)return A.status="ready",this;var n=A.scenario[++A.currentScene];switch(n.actor&&t(n.actor),x(n.name+":start",n),n.name){case"type":d.apply(void 0,a(n.args));break;case"erase":g.apply(void 0,a(n.args));break;case"callback":y.apply(void 0,a(n.args));break;case"wait":b.apply(void 0,a(n.args));break;default:console.debug("No scene handler for "+n.name)}return this}function d(e,t){var r=n(),a=A.options.locale,u=A.options.minSpeed,o=A.options.maxSpeed,i=r.displayValue,s=-1,l=!1,c=null,f=null,d=h["default"].map(t);return t=h["default"].strip(t),function g(){var n=h["default"].strip(r.displayValue.substr(i.length));if(n===t)return e();var m=t.substr(0,s+1),v=n!==m,y=r.shouldBeMistaken(n,t,c,f),b=l||!y;if(v&&b)l=!0,c=null,r.displayValue=i+h["default"].inject(n.substr(0,n.length-1),d),s--,f=s;else{l=!1;var j=t.charAt(++s);y&&(j=p["default"].randomCharNear(j,a),null==c&&(c=s)),r.displayValue=i+h["default"].inject(n+j,d)}return setTimeout(g,r.getTypingSpeed(u,o))}(),this}function g(e,t){var r=n(),a=A.options.minSpeed,u=A.options.maxSpeed,o=r.displayValue,i=h["default"].map(o);o=h["default"].strip(o);var s=o.length,l=void 0,c=0;return f["default"].isNumber(t)&&(t>0?l=t:c=o.length+t),function d(){return s===c?e():(r.displayValue=h["default"].inject(o.substr(0,--s),i),setTimeout(d,l||r.getTypingSpeed(a,u)))}(),this}function y(e,t){return t.call(this,e),this}function b(e,t){return setTimeout(e.bind(this),t),this}function j(e,t){return e.split(",").forEach(function(e){e=e.trim(),f["default"].isArray(A.events[e])||(A.events[e]=[]),A.events[e].push(t)}),this}function x(e){var t=arguments;return f["default"].isArray(A.events[e])&&!function(){var n=[].slice.call(t,1);n.unshift(e);var r=(A.events[e]||[]).concat(A.events["*"]||[]);r.forEach(function(e){e.apply(void 0,a(n))})}(),this}var S=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];S=l["default"].merge({},m,S),"detect"===S.locale&&null!=v&&null!=v.navigator&&f["default"].isArray(v.navigator.languages)&&f["default"].isString(v.navigator.languages[0])&&(S.locale=v.navigator.languages[0].substr(0,2)),p["default"].supports(S.locale)||(S.locale=p["default"].defaultLocale);var A={options:S,casting:{},status:"ready",onStage:null,currentScene:-1,scenario:[],events:{}};return t(null),Object.freeze(Object.defineProperties({addActor:e,getCurrentActor:n,addScene:r,play:u,replay:o,stop:s,on:j},{options:{get:function(){return A.options},configurable:!0,enumerable:!0},status:{get:function(){return A.status},configurable:!0,enumerable:!0}}))}Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),i=r(o),s=n(3),l=r(s),c=n(2),f=r(c),d=n(4),p=r(d),g=n(6),h=r(g),m={autoplay:!0,erase:!0,minSpeed:80,maxSpeed:450,locale:"detect"},v=(1,eval)("this");u.init=function(){var e=arguments.length<=0||void 0===arguments[0]?"actor":arguments[0],t=u();return t.addActor(e,{accuracy:1,speed:.8}),t},t["default"]=u,e.exports=t["default"]},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(2),u=r(a),o=n(3),i=r(o),s={speed:.6,accuracy:.6},l=(1,eval)("this");t["default"]=function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=arguments.length<=2||void 0===arguments[2]?null:arguments[2],r="",a=void 0;if(u["default"].isNumber(t)&&(t={speed:t,accuracy:t}),t=i["default"].merge({},s,t),null!=l&&null!=l.document&&(null==n&&(n="#"+e),u["default"].isString(n))){var o=n,c=l.document.querySelector(o);if(null==c)throw new Error("no matches for "+e+"'s selector: "+o);a=c,n=function(e){a.innerHTML=e}}return u["default"].isFunction(n)||(n=console.log.bind(console)),Object.defineProperties({$element:a,getTypingSpeed:function(e,n){var r=i["default"].randomFloat(t.speed,1);return i["default"].getPercentageOf(n,e,r)},shouldBeMistaken:function(e,n){var r=arguments.length<=2||void 0===arguments[2]?null:arguments[2],a=arguments.length<=3||void 0===arguments[3]?null:arguments[3],o=10*t.accuracy;if(o>=8)return!1;if(e.length<=o)return!1;if(e.length===n.length)return!1;if(u["default"].isNumber(r)){var s=e.length-r,l=o>=6?10-o:4;if(s>=l)return!1}if(u["default"].isNumber(a)){var s=e.length-a,c=2*Math.max(o,2);if(c>=s)return!1}return i["default"].randomFloat(0,.8)>t.accuracy}},{displayValue:{get:function(){return r},set:function(e){r=e,n(e)},configurable:!0,enumerable:!0},name:{get:function(){return e},configurable:!0,enumerable:!0}})},e.exports=t["default"]},function(e,t){"use strict";function n(e){return{}.toString.call(e)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={isNumber:function(e){return"number"==typeof e},isString:function(e){return"[object String]"===n(e)},isObject:function(e){return"[object Object]"===n(e)},isArray:function(e){return"[object Array]"===n(e)},isFunction:function(e){return"function"==typeof e}},e.exports=t["default"]},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={toArray:function(e){return[].slice.call(e)},merge:function(e){for(var t=[].slice.call(arguments,1),n=0,r=t.length;r>n;n++){var a=t[n];for(var u in a)a.hasOwnProperty(u)&&(e[u]=a[u])}return e},random:function(e,t){return Math.floor(Math.random()*(t-e+1))+e},randomFloat:function(e,t){return Math.random()*(t-e)+e},getPercentageOf:function(e,t,n){return e-e*n+t*n}},e.exports=t["default"]},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e){for(var t={},n=0,r=e.length,a=void 0;r>n;n++){a=e[n];for(var u=0,o=a.length;o>u;u++)t[a[u]]={x:u,y:n}}return t}Object.defineProperty(t,"__esModule",{value:!0});var u=n(2),o=r(u),i=n(3),s=r(i),l=n(5),c=r(l),f="en";for(var d in c["default"])if(c["default"].hasOwnProperty(d)){var p=c["default"][d];c["default"][d]={list:p,mapped:a(p)}}t["default"]={defaultLocale:f,supports:function(e){return o["default"].isObject(c["default"][e])},randomCharNear:function(e,t){if(!this.supports(t))throw new Error('locale "'+t+'" is not supported');var n=c["default"][t].mapped,r=1,a=[],u=/[A-Z]/.test(e);e=e.toLowerCase();var o=n[e]||[],i=void 0;for(var l in n)n.hasOwnProperty(l)&&l!==e&&(i=n[l],Math.abs(o.x-i.x)<=r&&Math.abs(o.y-i.y)<=r&&a.push(l));var f=a.length>0?a[s["default"].random(0,a.length-1)]:this.randomChar(t);return u&&(f=f.toUpperCase()),f},randomChar:function(e){if(!this.supports(e))throw new Error('locale "'+e+'" is not supported');var t=c["default"][e].list.join("");return t.charAt(s["default"].random(0,t.length-1))}},e.exports=t["default"]},function(e,t){e.exports={en:["qwertyuiop","asdfghjkl","zxcvbnm"],fr:["azertyuiop","qsdfghjklm","wxcvbn"],da:["qwertyuiopå","asdfghjklæø","zxcvbnm"],de:["qwertzuiopü","asdfghjklöä","yxcvbnm"],pl:["qwertyuiopęó","asdfghjkląśł","zxcvbnmżźćń"],pt:["qwertyuiop","asdfghjklç","zxcvbnm"],ru:["йцукенгшщзх","фывапролджэ","ячсмитьбюъ"]}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={strip:function(e){return e.replace(/(<([^>]+)>)/gi,"")},map:function(e){for(var t=/<[^>]+>/gi,n=[],r=[],a=void 0,u=void 0;a=t.exec(e);)u={tagName:a[0],position:a.index},"/"===u.tagName.charAt(1)?u.opener=r.pop():"/"!==u.tagName.charAt(u.tagName.length-2)&&r.push(u),n.push(u);return n},inject:function(e,t){for(var n=0,r=void 0;n<t.length;n++)r=t[n],e.length>0&&r.position<=e.length?e=e.substr(0,r.position)+r.tagName+e.substr(r.position):r.opener&&r.opener.position<e.length&&(e+=r.tagName);return e}},e.exports=t["default"]}])});
//# sourceMappingURL=theater.min.js.map
},{}],2:[function(require,module,exports){
module.exports = require('./dist/theater.min.js')

},{"./dist/theater.min.js":1}],3:[function(require,module,exports){
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
//# sourceMappingURL=UIViewController.js.map

},{}],4:[function(require,module,exports){
"use strict";

var _UIViewController2 = require("../../../framework/controller/UIViewController");

var _theaterjs = require("theaterjs");

var _theaterjs2 = _interopRequireDefault(_theaterjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

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

        console.dir(_this.element);
        var zhilizhiliSlider = document.querySelector("#page-content");
        var theater = (0, _theaterjs2.default)();
        var currentIndex = 0;
        window.addEventListener("readyshow", function () {
            console.log("ready");
            theater.addActor('me');
            theater.addScene('me:你好! 我叫凌柏超, 这是我的简历...', 3000).addScene('me:i am happy', 1000).addScene(function (done) {
                // do stuff
                currentIndex++;
                zhilizhiliSlider.go(currentIndex);
                done();
            }).addScene('me:I am', 200, '.', 200, '.', 200, '. ').addScene('Your father!');
        }, false);
        return _this;
    }

    return IndexViewController;
})(_UIViewController2.UIViewController);
IndexViewController.selector = "#index";
IndexViewController = __decorate([_UIViewController2.delegate], IndexViewController);
//# sourceMappingURL=index.js.map

},{"../../../framework/controller/UIViewController":3,"theaterjs":2}]},{},[4])