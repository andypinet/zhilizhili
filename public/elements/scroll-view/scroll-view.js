/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts" />
/// <reference path="../../typings/hammerjs/hammerjs.d.ts" />
/// <reference path="../../typings/framework/utils.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var MoveLine = (function () {
    function MoveLine() {
    }
    Object.defineProperty(MoveLine.prototype, "endPoint", {
        get: function () {
            return this._endPoint;
        },
        set: function (value) {
            this._endPoint = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveLine.prototype, "startPoint", {
        get: function () {
            return this._startPoint;
        },
        set: function (value) {
            this._startPoint = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveLine.prototype, "panPoint", {
        get: function () {
            return this._panPoint;
        },
        set: function (value) {
            this._panPoint = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获得panstart开始 panmove实时x距离
     *
     * @param point
     * @returns {number}
     */
    MoveLine.prototype.getPanX = function (point) {
        if (this._panPoint) {
            return point.x - this._panPoint.x;
        }
        else {
            return 0;
        }
    };
    /**
     * 获得touchstart到touchend结束的距离
     *
     * @returns {number}
     */
    MoveLine.prototype.getPanDistance = function () {
        return this._endPoint.x - this._startPoint.x;
    };
    return MoveLine;
})();
var IndicatorManager = (function () {
    function IndicatorManager() {
        this._index = 0;
    }
    Object.defineProperty(IndicatorManager.prototype, "arr", {
        get: function () {
            return this._arr;
        },
        set: function (value) {
            this._arr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IndicatorManager.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            this._index = value;
        },
        enumerable: true,
        configurable: true
    });
    IndicatorManager.prototype.getCurItem = function () {
        return this._arr[this._index];
    };
    return IndicatorManager;
})();
var MoveRecord = (function () {
    function MoveRecord(element) {
        this._originX = 0;
        this._originY = 0;
        this._offset = element.getBoundingClientRect();
    }
    Object.defineProperty(MoveRecord.prototype, "originX", {
        get: function () {
            return this._originX;
        },
        set: function (value) {
            this._originX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveRecord.prototype, "originY", {
        get: function () {
            return this._originY;
        },
        set: function (value) {
            this._originY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoveRecord.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (value) {
            this._offset = value;
        },
        enumerable: true,
        configurable: true
    });
    return MoveRecord;
})();
function initHammer(element) {
    var mc;
    mc = new Hammer.Manager(element);
    var pan = new Hammer.Pan({
        direction: Hammer.DIRECTION_HORIZONTAL
    });
    // add to the Manager
    mc.add([pan]);
    return mc;
}
var ScrollView = (function (_super) {
    __extends(ScrollView, _super);
    function ScrollView() {
        _super.call(this);
        this.lock = true;
    }
    ScrollView.prototype.ready = function () {
        var self = this;
        var viewInfo = [];
        self.moveRecord = new MoveRecord(self.$.scrollViewInner);
        self.scrollViewInnerHammerManager = initHammer(self.$.scrollViewInner);
        self.indicatorM = new IndicatorManager();
        self.moveLine = new MoveLine();
        document.addEventListener('WebComponentsReady', function () {
            utils.css(self.$.scrollViewInner, {
                "width": (utils.getElmentWidth(self.$.scrollViewInner) * utils.getChildrenLength(self.$.scrollViewInner)) + "px"
            });
            viewInfo = self.generateWidth();
            self.indicatorM.arr = viewInfo[0];
            self.moveDistance = utils.getElmentWidth(self.$.scrollViewWrapper) / 3;
        }, false);
        self.scrollViewInnerHammerManager.on('panstart', function (e) {
            self.moveLine.panPoint = e.center;
            self.lock = false;
        });
        self.scrollViewInnerHammerManager.on('panright', function (e) {
            if (!self.lock) {
                if (self.indicatorM.index > 0) {
                    utils.css(self.$.scrollViewInner, {
                        "transition-duration": "0",
                        "transition": "unset",
                        "transform": "translateX(" + (self.moveRecord.originX + self.moveLine.getPanX(e.center)) + "px)"
                    });
                }
            }
        });
        self.scrollViewInnerHammerManager.on('panleft', function (e) {
            if (!self.lock) {
                if (self.indicatorM.index < 1) {
                    utils.css(self.$.scrollViewInner, {
                        "transition-duration": "0",
                        "transition": "unset",
                        "transform": "translateX(" + (self.moveRecord.originX + self.moveLine.getPanX(e.center)) + "px)"
                    });
                }
            }
        });
        self.scrollViewInnerHammerManager.on('panup', function (e) {
            self.lock = true;
        });
        self.scrollViewInnerHammerManager.on('pandown', function (e) {
            self.lock = true;
        });
        self.scrollViewInnerHammerManager.on('panend', function (e) {
            self.lock = true;
            console.log("directio: " + e.direction);
            console.log("deltaX: " + e.deltaX);
            if (Math.abs(e.deltaX) > 60) {
                self.moveLine.endPoint = e.center;
                console.log("index:" + self.indicatorM.index);
                if (e.deltaX < 0) {
                    if (self.indicatorM.index < 1) {
                        if (e.distance > self.moveDistance) {
                            // 超过一半距离
                            console.log("向后翻页");
                            self.goNextView(1.5);
                        }
                        else {
                            console.log("向前回去");
                            self.goBackView(1.5);
                        }
                    }
                }
                else {
                    if (self.indicatorM.index > 0) {
                        if (e.distance > self.moveDistance) {
                            console.log("向前翻页");
                            self.goPrevView(1.5);
                        }
                        else {
                            console.log("向后回去");
                            self.goBackView(1.5);
                        }
                    }
                }
                self.fire("scrollend", { index: self.indicatorM.index });
            }
            else {
                // 左右滑动距离不够长
                self.debounce("gobackview", function () {
                    self.goBackView(1.5);
                }, 0);
            }
        });
        document.addEventListener('touchstart', function (e) {
            self.touchStartHandle(e);
        }, false);
    };
    ScrollView.prototype.generateWidth = function () {
        var self = this;
        var res = [];
        var totalWidth = 0;
        Array.prototype.slice.call(self.$.scrollViewInner.children).forEach(function (view, index, views) {
            var viewWidth = view.offsetWidth;
            res.push({
                x: totalWidth
            });
            totalWidth = totalWidth + viewWidth;
        });
        return [res, totalWidth];
    };
    ScrollView.prototype.touchStartHandle = function (e) {
        var self = this;
        self.moveLine.startPoint = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        };
        self.moveRecord.originX = utils.getTranslateX(self.$.scrollViewInner);
    };
    ScrollView.prototype.goBackView = function (duration) {
        var self = this;
        utils.css(self.$.scrollViewInner, {
            "transition": "all 1.5s ease",
            "transform": "translateX(-" + self.indicatorM.getCurItem().x + "px)"
        });
    };
    ScrollView.prototype.goPrevView = function (duration) {
        var self = this;
        self.indicatorM.index--;
        if (self.indicatorM.index < 0) {
            self.indicatorM.index = 0;
        }
        utils.css(self.$.scrollViewInner, {
            "transition": "all 0.6s ease",
            "transform": "translateX(-" + self.indicatorM.getCurItem().x + "px)"
        });
    };
    ScrollView.prototype.goNextView = function (duration) {
        var self = this;
        self.indicatorM.index++;
        if (self.indicatorM.index > 1) {
            self.indicatorM.index = 1;
        }
        utils.css(self.$.scrollViewInner, {
            "transition": "all 0.6s ease",
            "transform": "translateX(-" + self.indicatorM.getCurItem().x + "px)"
        });
    };
    ScrollView.prototype.go = function (index, duration) {
        if (duration === void 0) { duration = "0.85s"; }
        var self = this;
        if (index > -1 && index < self.indicatorM.arr.length) {
            utils.css(self.$.scrollViewInner, {
                "transition": "all " + duration + " ease",
                "transform": "translateX(-" + self.indicatorM.arr[index].x + "px)"
            });
            self.indicatorM.index = index;
            self.fire("scrollend", { index: self.indicatorM.index });
        }
        else {
            throw new Error("index " + index + " is not valid");
        }
    };
    ScrollView = __decorate([
        component("scroll-view")
    ], ScrollView);
    return ScrollView;
})(polymer.Base);
ScrollView.register();
//# sourceMappingURL=scroll-view.js.map