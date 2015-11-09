/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts" />
/// <reference path="../../typings/hammerjs/hammerjs.d.ts" />
/// <reference path="../../typings/framework/utils.d.ts" />

class MoveLine {
    // touchstart
    private _startPoint;
    // touchend
    private _endPoint;
    // panstart
    private _panPoint;

    get endPoint() {
        return this._endPoint;
    }

    set endPoint(value) {
        this._endPoint = value;
    }

    get startPoint() {
        return this._startPoint;
    }

    set startPoint(value) {
        this._startPoint = value;
    }

    get panPoint() {
        return this._panPoint;
    }

    set panPoint(value) {
        this._panPoint = value;
    }

    /**
     * 获得panstart开始 panmove实时x距离
     *
     * @param point
     * @returns {number}
     */
    public getPanX(point) {
        if (this._panPoint) {
            return point.x - this._panPoint.x;
        }
        else {
            return 0;
        }
    }

    /**
     * 获得touchstart到touchend结束的距离
     *
     * @returns {number}
     */
    public getPanDistance() {
        return this._endPoint.x - this._startPoint.x;
    }
}

class IndicatorManager {
    private _arr;
    private _index = 0;
    get arr() {
        return this._arr;
    }

    set arr(value) {
        this._arr = value;
    }

    get index() {
        return this._index;
    }

    set index(value) {
        this._index = value;
    }

    public getCurItem() {
        return this._arr[this._index];
    }
}

class MoveRecord {
    private _originX = 0;
    private _originY = 0;
    private _offset;

    constructor(element) {
        this._offset = element.getBoundingClientRect();
    }

    get originX() {
        return this._originX;
    }

    set originX(value) {
        this._originX = value;
    }

    get originY() {
        return this._originY;
    }

    set originY(value) {
        this._originY = value;
    }

    get offset() {
        return this._offset;
    }

    set offset(value) {
        this._offset = value;
    }
}

function initHammer(element: HTMLElement) {
    var mc;

    mc = new Hammer.Manager(element);

    var pan = new Hammer.Pan({
        direction: Hammer.DIRECTION_HORIZONTAL
    });
    
    // add to the Manager
    mc.add([pan]);

    return mc;
}

@component("scroll-view")
class ScrollView extends polymer.Base
{
    public scrollViewInnerHammerManager;
    public moveRecord;
    public indicatorM;
    public moveDistance;
    public moveLine;
    public lock = true;

    constructor() {
        super();
    }

    ready() {
        var self = this;
        var viewInfo = [];
        self.moveRecord = new MoveRecord(self.$.scrollViewInner);
        self.scrollViewInnerHammerManager = initHammer(self.$.scrollViewInner);
        self.indicatorM = new IndicatorManager();

        self.moveLine = new MoveLine();

        document.addEventListener('WebComponentsReady', function(){
            utils.css(self.$.scrollViewInner, {
                "width": ( utils.getElmentWidth(self.$.scrollViewInner) * utils.getChildrenLength(self.$.scrollViewInner) ) + "px"
            });

            viewInfo = self.generateWidth();

            self.indicatorM.arr = viewInfo[0];
            self.moveDistance = utils.getElmentWidth(self.$.scrollViewWrapper) / 3;

        }, false);

        self.scrollViewInnerHammerManager.on('panstart', function(e){
            self.moveLine.panPoint = e.center;
            self.lock = false;
        });

        self.scrollViewInnerHammerManager.on('panright', function(e) {
            if (!self.lock) {
                if (self.indicatorM.index > 0) {
                    utils.css(self.$.scrollViewInner, {
                        "transition-duration": `0`,
                        "transition": "unset",
                        "transform": `translateX(${self.moveRecord.originX + self.moveLine.getPanX(e.center)}px)`
                    });
                }
            }
        });

        self.scrollViewInnerHammerManager.on('panleft', function(e) {
            if (!self.lock) {
                if (self.indicatorM.index < 1) {
                    utils.css(self.$.scrollViewInner, {
                        "transition-duration": `0`,
                        "transition": "unset",
                        "transform": `translateX(${self.moveRecord.originX + self.moveLine.getPanX(e.center)}px)`
                    });
                }
            }
        });

        self.scrollViewInnerHammerManager.on('panup', function(e) {
            self.lock = true;
        });

        self.scrollViewInnerHammerManager.on('pandown', function(e) {
            self.lock = true;
        });

        self.scrollViewInnerHammerManager.on('panend', function(e){
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
                        } else {
                            console.log("向前回去");
                            self.goBackView(1.5);
                        }
                    }

                } else {
                    if (self.indicatorM.index > 0) {
                        if (e.distance > self.moveDistance) {
                            console.log("向前翻页");
                            self.goPrevView(1.5);
                        } else {
                            console.log("向后回去");
                            self.goBackView(1.5);
                        }
                    }

                }

                self.fire("scrollend", {index: self.indicatorM.index});
            } else {
                // 左右滑动距离不够长
                self.debounce("gobackview", function(){
                    self.goBackView(1.5);
                }, 0);
            }
        });

        document.addEventListener('touchstart', (e) => {
            self.touchStartHandle(e);
        }, false);

    }

    protected generateWidth() {
        var self = this;
        var res = [];
        var totalWidth = 0;
        Array.prototype.slice.call(self.$.scrollViewInner.children).forEach(function(view, index, views){
            let viewWidth = view.offsetWidth;
            res.push({
                x: totalWidth
            });
            totalWidth = totalWidth + viewWidth;
        });
        return [res, totalWidth];
    }

    protected touchStartHandle(e) {
        var self = this;
        self.moveLine.startPoint = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        };
        self.moveRecord.originX = utils.getTranslateX(self.$.scrollViewInner);
    }

    public goBackView(duration) {
        var self = this;
        utils.css(self.$.scrollViewInner, {
            "transition": `all 1.5s ease`,
            "transform": `translateX(-${self.indicatorM.getCurItem().x}px)`
        });
    }

    public goPrevView(duration) {
        var self = this;
        self.indicatorM.index--;
        if (self.indicatorM.index < 0) {
            self.indicatorM.index = 0;
        }
        utils.css(self.$.scrollViewInner, {
            "transition": `all 0.6s ease`,
            "transform": `translateX(-${self.indicatorM.getCurItem().x}px)`
        });
    }

    public goNextView(duration) {
        var self = this;
        self.indicatorM.index++;
        if (self.indicatorM.index > 1) {
            self.indicatorM.index = 1;
        }
        utils.css(self.$.scrollViewInner, {
            "transition": `all 0.6s ease`,
            "transform": `translateX(-${self.indicatorM.getCurItem().x}px)`
        });
    }

    public go(index, duration = "0.85s") {
        var self = this;
        if (index > -1 && index < self.indicatorM.arr.length) {
            utils.css(self.$.scrollViewInner, {
                "transition": `all ${duration} ease`,
                "transform": `translateX(-${self.indicatorM.arr[index].x}px)`
            });
            self.indicatorM.index = index;
            self.fire("scrollend", {index: self.indicatorM.index});
        } else {
            throw new Error(`index ${index} is not valid`);
        }
    }
}

ScrollView.register();