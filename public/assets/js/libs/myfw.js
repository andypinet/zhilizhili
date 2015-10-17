(function() {
  var root,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.conf = (function() {
    function conf() {
      this.ID = "MYFW";
      this.IS_IOS = root._LIBS.MYFW.util.isIos();
      this.IS_ADR = root._LIBS.MYFW.util.isAndroid();
      this.IS_SMT = this.IS_IOS || this.IS_ADR;
      this.IS_TABLET = root._LIBS.MYFW.util.isTablet();
      this.IS_PS = root._LIBS.MYFW.util.isPs3() || root._LIBS.MYFW.util.isVita();
      this.IS_WIN = root._LIBS.MYFW.util.isWin();
      this.IS_IPAD = root._LIBS.MYFW.util.isIpad();
      this.IS_U_IE8 = root._LIBS.MYFW.util.isIe8Under();
      this.IS_U_IE9 = root._LIBS.MYFW.util.isIe9Under();
      this.IS_IE = root._LIBS.MYFW.util.isIe();
      this.IS_FF = root._LIBS.MYFW.util.isFF();
      this.IS_IOSUiView = root._LIBS.MYFW.util.isIOSUiView();
      this.IS_RETINA = (window.devicePixelRatio != null) && window.devicePixelRatio > 1;
      this.IS_IMG_RETINA = true;
      this.IS_V_BTNAREA = false;
      this.PATH_IMG = "assets/images/";
      this.DEBUG_MAIN_COLOR1 = "#000000";
      this.DEBUG_MAIN_COLOR2 = "#888888";
    }

    return conf;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.display = (function() {
    function display(option) {
      this.fadeout = bind(this.fadeout, this);
      this.fadein = bind(this.fadein, this);
      this.pixel3 = bind(this.pixel3, this);
      this.pixel2 = bind(this.pixel2, this);
      this.pixel = bind(this.pixel, this);
      this.delayClear = bind(this.delayClear, this);
      this.delay = bind(this.delay, this);
      this.alpha = bind(this.alpha, this);
      this.setTransform = bind(this.setTransform, this);
      this.scale = bind(this.scale, this);
      this.rotate = bind(this.rotate, this);
      this.translate = bind(this.translate, this);
      this.set3d = bind(this.set3d, this);
      this.xy = bind(this.xy, this);
      this.y = bind(this.y, this);
      this.x = bind(this.x, this);
      this.size = bind(this.size, this);
      this.bottom = bind(this.bottom, this);
      this.right = bind(this.right, this);
      this.height = bind(this.height, this);
      this.width = bind(this.width, this);
      this.elm = bind(this.elm, this);
      this.id = bind(this.id, this);
      this.setupElm = bind(this.setupElm, this);
      this.setBg = bind(this.setBg, this);
      this.imgSize = bind(this.imgSize, this);
      this.imgElm = bind(this.imgElm, this);
      this.setImg = bind(this.setImg, this);
      this.getImg = bind(this.getImg, this);
      this.bgColor = bind(this.bgColor, this);
      this.delMask = bind(this.delMask, this);
      this.mask = bind(this.mask, this);
      this.visible = bind(this.visible, this);
      this.fontSize = bind(this.fontSize, this);
      this.textColor = bind(this.textColor, this);
      this.text = bind(this.text, this);
      this.position = bind(this.position, this);
      this.zIndex = bind(this.zIndex, this);
      this.unselectable = bind(this.unselectable, this);
      this.unshiftChild = bind(this.unshiftChild, this);
      this.addChild = bind(this.addChild, this);
      this.dispose2 = bind(this.dispose2, this);
      this.dispose = bind(this.dispose, this);
      this.setId = bind(this.setId, this);
      this.resize = bind(this.resize, this);
      this.update = bind(this.update, this);
      this.addStage = bind(this.addStage, this);
      this.init = bind(this.init, this);
      this._id = root._LIBS.MYFW.conf.ID + "_elm_" + String(root._LIBS.MYFW.main.makeElmCnt++);
      this._elm;
      this._u = root._LIBS.MYFW.util;
      this._isUse3D = !root._LIBS.MYFW.conf.IS_U_IE9;
      this._isUpdate = (option != null) && (option.update != null) ? option.update : false;
      this._isResize = (option != null) && (option.resize != null) ? option.resize : false;
      this._isResizeCall = (option != null) && (option.resizeCall != null) ? option.resizeCall : true;
      this._isSmt = root._LIBS.MYFW.conf.IS_SMT;
      this._device = this._isSmt ? 1 : 0;
      this._image;
      this._position = {
        x: 0,
        y: 0
      };
      this._size = {
        width: -1,
        height: -1
      };
      this._transform = {
        dx: 0,
        dy: 0,
        dz: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        dxOld: 0,
        dyOld: 0,
        dzOld: 0,
        scaleXOld: 1,
        scaleYOld: 1,
        scaleZOld: 1,
        rotXOld: 0,
        rotYOld: 0,
        rotZOld: 0
      };
      this._alpha = 1;
      this._zIndex = 0;
      this._isVisible = true;
      this._text = "";
      this._tm = [];
      this._imgData = [];
      this.init();
    }

    display.prototype.init = function() {
      if (this._elm != null) {
        this._elm.css({
          position: "absolute",
          top: 0,
          left: 0
        });
        this.addStage();
        if (this._isUpdate) {
          root._LIBS.MYFW.main.addUpdate(this.update);
        }
        if (this._isResize) {
          return root._LIBS.MYFW.main.addResize(this.resize, this._isResizeCall);
        }
      }
    };

    display.prototype.addStage = function() {};

    display.prototype.update = function() {};

    display.prototype.resize = function() {};

    display.prototype.setId = function(id) {
      this._id = root._LIBS.MYFW.conf.ID + "_elm_" + root._LIBS.MYFW.main.makeElmCnt++;
      if (this._elm != null) {
        return this._elm.attr({
          id: this._id
        });
      }
    };

    display.prototype.dispose = function() {
      var i, l, len1, len2, m, ref, ref1, val;
      this.dispose2();
      if (this._tm != null) {
        ref = this._tm;
        for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
          val = ref[i];
          if (val != null) {
            clearTimeout(val);
            this._tm[i] = null;
          }
        }
        this._tm = null;
      }
      if (this._imgData != null) {
        ref1 = this._imgData;
        for (i = m = 0, len2 = ref1.length; m < len2; i = ++m) {
          val = ref1[i];
          if (val != null) {
            val.dispose();
            this._imgData[i] = null;
          }
        }
        this._imgData = null;
      }
      if (this._isUpdate) {
        root._LIBS.MYFW.main.delUpdate(this.update);
      }
      if (this._isResize) {
        root._LIBS.MYFW.main.delResize(this.resize);
      }
      if (this._elm != null) {
        root._LIBS.MYFW.util.stop(this._elm);
        this._elm.unbind();
        this._elm.remove();
        this._elm = null;
      }
      if (this._image != null) {
        this._image.dispose();
        this._image = null;
      }
      this._position = null;
      this._size = null;
      this._mouse = null;
      this._transform = null;
      return this._u = null;
    };

    display.prototype.dispose2 = function() {};

    display.prototype.addChild = function(view) {
      if (this._elm != null) {
        if ($("#" + view.id()).length > 0) {
          return $("#" + view.id()).appendTo(this._elm);
        } else {
          this._elm.append("<div id='" + view.id() + "'></div>");
          view.setupElm();
          return view.init();
        }
      }
    };

    display.prototype.unshiftChild = function(view) {
      if (this._elm != null) {
        this._elm.prepend("<div id='" + view.id() + "'></div>");
        view.setupElm();
        return view.init();
      }
    };

    display.prototype.unselectable = function() {
      this.elm().attr({
        onSelectStart: "return false;",
        onMouseDown: "return false;"
      });
      return this.elm().css(root._LIBS.MYFW.util.getVendorCss("user-select", "none"));
    };

    display.prototype.zIndex = function(val) {
      if (val == null) {
        return this._zIndex;
      } else {
        if (this._elm != null) {
          this._elm.css({
            zIndex: val
          });
          return this._zIndex = val;
        }
      }
    };

    display.prototype.position = function(val) {
      if (this._elm != null) {
        return this._elm.css({
          position: val
        });
      }
    };

    display.prototype.text = function(val, f) {
      if ((val == null) && (f == null)) {
        return this._text;
      } else {
        if (this._elm != null) {
          this._elm.html(val);
          if ((f != null) && f !== "") {
            this._elm.removeClass();
            this._elm.addClass(f);
          }
          return this._text = val;
        }
      }
    };

    display.prototype.textColor = function(color) {
      if (this._elm != null) {
        return this._elm.css({
          color: color
        });
      }
    };

    display.prototype.fontSize = function(size) {
      if (this._elm != null) {
        return this._elm.css({
          fontSize: size
        });
      }
    };

    display.prototype.visible = function(bool) {
      if (bool == null) {
        return this._isVisible;
      } else {
        if (this._isVisible === bool) {
          return;
        }
        this._isVisible = bool;
        if (bool) {
          return this._elm.css({
            display: "inline"
          });
        } else {
          return this._elm.css({
            display: "none"
          });
        }
      }
    };

    display.prototype.mask = function() {
      if (this._elm != null) {
        return this._elm.css("overflow", "hidden");
      }
    };

    display.prototype.delMask = function() {
      if (this._elm != null) {
        return this._elm.css("overflow", "visible");
      }
    };

    display.prototype.bgColor = function(color, alpha) {
      var obj;
      if (this._elm != null) {
        obj = {};
        obj.backgroundColor = color;
        if (alpha != null) {
          obj.opacity = alpha;
          this._alpha = alpha;
        }
        return this._elm.css(obj);
      }
    };

    display.prototype.getImg = function() {
      return this._image;
    };

    display.prototype.setImg = function(image) {
      if (this._elm != null) {
        if ((this.imgElm() != null) && this.imgElm().length > 0) {
          this.imgElm().remove();
        }
        this._image = image;
        this._elm.append("<img src='" + this._image.src + "' width='" + this._image.width + "' height='" + this._image.height + "' alt='" + this._image.alt + "'>");
        $("#" + this._id + " img").css({
          position: "absolute",
          top: 0,
          left: 0
        });
        return this.size(this._image.width, this._image.height);
      }
    };

    display.prototype.imgElm = function() {
      return $("#" + this._id + " img");
    };

    display.prototype.imgSize = function(w, h) {
      var elm;
      elm = this.imgElm();
      elm.attr({
        width: w,
        height: h
      });
      return this.size(w, h);
    };

    display.prototype.setBg = function(image, repeat) {
      if (repeat == null) {
        repeat = false;
      }
      if (this._elm != null) {
        this._image = image;
        if (repeat) {
          this._elm.css({
            backgroundImage: "url('" + this._image.src + "')"
          });
        } else {
          this._elm.css({
            backgroundImage: "url('" + this._image.src + "')",
            backgroundSize: "100%"
          });
        }
        return this.size(this._image.width, this._image.height);
      }
    };

    display.prototype.setupElm = function() {
      if (this._elm == null) {
        return this._elm = $("#" + this._id);
      }
    };

    display.prototype.id = function() {
      return this._id;
    };

    display.prototype.elm = function() {
      return this._elm;
    };

    display.prototype.width = function(val) {
      if (val == null) {
        if (this._size.width === -1 && (this._elm != null)) {
          return this._elm.width();
        } else {
          return this._size.width;
        }
      }
      this._size.width = val;
      return this._elm.css("width", this._size.width);
    };

    display.prototype.height = function(val) {
      if (val == null) {
        if (this._size.height === -1 && (this._elm != null)) {
          return this._elm.height();
        } else {
          return this._size.height;
        }
      }
      this._size.height = val;
      return this._elm.css("height", this._size.height);
    };

    display.prototype.right = function() {
      return this._position.x + this.width();
    };

    display.prototype.bottom = function() {
      return this._position.y + this.height();
    };

    display.prototype.size = function(w, h) {
      if (h == null) {
        h = w;
      }
      this._size.width = w;
      this._size.height = h;
      return this._elm.css({
        width: this._size.width,
        height: this._size.height
      });
    };

    display.prototype.x = function(val) {
      if (val == null) {
        return this._position.x;
      }
      if (this._elm != null) {
        this._elm.css("left", val);
        return this._position.x = val;
      }
    };

    display.prototype.y = function(val) {
      if (val == null) {
        return this._position.y;
      }
      if (this._elm != null) {
        this._elm.css("top", val);
        return this._position.y = val;
      }
    };

    display.prototype.xy = function(val1, val2) {
      if (this._elm != null) {
        this._elm.css({
          top: val2,
          left: val1
        });
        this._position.x = val1;
        return this._position.y = val2;
      }
    };

    display.prototype.set3d = function(orginX, orginY, orginZ, p) {
      if (this._elm != null) {
        if (p == null) {
          p = 1500;
        }
        this._elm.css(this._u.getVendorCss("transform-style", "preserve-3d")).css(this._u.getVendorCss("perspective", p));
        if ((orginX != null) || (orginY != null) || (orginZ != null)) {
          if (orginX == null) {
            orginX = this._size.width * 0.5;
          }
          if (orginY == null) {
            orginY = this._size.height * 0.5;
          }
          if (orginZ == null) {
            orginZ = 0;
          }
          return this._elm.css(this._u.getVendorCss("transform-origin", orginX + "px " + orginY + "px " + orginZ + "px"));
        }
      }
    };

    display.prototype.translate = function(val1, val2, val3) {
      if ((val1 == null) && (val2 == null) && (val3 == null)) {
        return this._transform;
      } else {
        if (val2 == null) {
          val2 = 0;
        }
        if (val3 == null) {
          val3 = 0;
        }
        this._transform.dx = val1;
        this._transform.dy = val2;
        return this._transform.dz = val3;
      }
    };

    display.prototype.rotate = function(val1, val2, val3) {
      if ((val1 == null) && (val2 == null) && (val3 == null)) {
        return this._transform;
      } else {
        if (val2 == null) {
          val2 = 0;
        }
        if (val3 == null) {
          val3 = 0;
        }
        this._transform.rotX = val1;
        this._transform.rotY = val2;
        return this._transform.rotZ = val3;
      }
    };

    display.prototype.scale = function(val1, val2, val3) {
      if ((val1 == null) && (val2 == null) && (val3 == null)) {
        return this._transform;
      } else {
        if (val2 == null) {
          val2 = 1;
        }
        if (val3 == null) {
          val3 = 1;
        }
        this._transform.scaleX = val1;
        this._transform.scaleY = val2;
        return this._transform.scaleZ = val3;
      }
    };

    display.prototype.setTransform = function() {
      if (this._elm != null) {
        if (this._transform.dxOld !== this._transform.dx || this._transform.dyOld !== this._transform.dy || this._transform.dzOld !== this._transform.dz || this._transform.rotXOld !== this._transform.rotX || this._transform.rotYOld !== this._transform.rotY || this._transform.rotZOld !== this._transform.rotZ || this._transform.scaleXOld !== this._transform.scaleX || this._transform.scaleYOld !== this._transform.scaleY) {
          this._elm.css(this._u.getVendorCss("transform", this._u.translate3d(this._transform.dx, this._transform.dy, this._transform.dz, this._isUse3D) + " " + this._u.rotateX(this._transform.rotX) + " " + this._u.rotateY(this._transform.rotY) + " " + this._u.rotateZ(this._transform.rotZ) + " " + this._u.scaleX(this._transform.scaleX) + " " + this._u.scaleY(this._transform.scaleY)));
          this._transform.dxOld = this._transform.dx;
          this._transform.dyOld = this._transform.dy;
          this._transform.dzOld = this._transform.dz;
          this._transform.rotXOld = this._transform.rotX;
          this._transform.rotYOld = this._transform.rotY;
          this._transform.rotZOld = this._transform.rotZ;
          this._transform.scaleXOld = this._transform.scaleX;
          return this._transform.scaleYOld = this._transform.scaleY;
        }
      }
    };

    display.prototype.alpha = function(val) {
      if (val == null) {
        return this._alpha;
      } else {
        if (this._elm != null) {
          this._elm.css("opacity", val);
          return this._alpha = val;
        }
      }
    };

    display.prototype.delay = function(f, time, key) {
      this.delayClear(key);
      return this._tm[key] = setTimeout(f, time);
    };

    display.prototype.delayClear = function(key) {
      if (this._tm[key] != null) {
        clearTimeout(this._tm[key]);
        return this._tm[key] = null;
      }
    };

    display.prototype.pixel = function(val) {
      if (root._LIBS.MYFW.conf.IS_RETINA) {
        return ~~(val * 0.5);
      } else {
        return val;
      }
    };

    display.prototype.pixel2 = function(val) {
      if (root._LIBS.MYFW.conf.IS_RETINA && root._LIBS.MYFW.conf.IS_SMT) {
        return ~~(val * 2);
      } else {
        return val;
      }
    };

    display.prototype.pixel3 = function(val) {
      if (root._LIBS.MYFW.conf.IS_RETINA && root._LIBS.MYFW.conf.IS_SMT) {
        return ~~(val * 3);
      } else {
        return val;
      }
    };

    display.prototype.fadein = function(time, ease, callback) {
      if (ease == null) {
        ease = "linear";
      }
      if (callback == null) {
        callback = null;
      }
      this._u.stop(this._elm);
      return this._elm.css({
        opacity: 0
      }).animate({
        opacity: 1
      }, time, ease, callback);
    };

    display.prototype.fadeout = function(time, ease, callback) {
      if (ease == null) {
        ease = "linear";
      }
      if (callback == null) {
        callback = null;
      }
      this._u.stop(this._elm);
      return this._elm.animate({
        opacity: 0
      }, time, ease, callback);
    };

    return display;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  if (root._LIBS.MYFW == null) {
    root._LIBS.MYFW = {};
  }

  root._LIBS.myfw = (function() {
    function myfw(param) {
      this._resize = bind(this._resize, this);
      this._setStageSize = bind(this._setStageSize, this);
      this._update = bind(this._update, this);
      this.refresh = bind(this.refresh, this);
      this.stageHeight = bind(this.stageHeight, this);
      this.stageWidth = bind(this.stageWidth, this);
      this._eMouseWheel = bind(this._eMouseWheel, this);
      this._param = param;
      this._updateList = [];
      this._resizeList = [];
      this._wheelList = [];
      this._stats;
      this._rTimer;
      this.makeElmCnt = 0;
      this.conf;
      this.util;
      this.ws = {
        w: 0,
        h: 0,
        oldW: -1,
        oldH: -1
      };
      this._init();
    }

    myfw.prototype._init = function() {
      root._LIBS.MYFW.main = this;
      this.util = new root._LIBS.utils();
      root._LIBS.MYFW.util = this.util;
      this.conf = new root._LIBS.conf();
      root._LIBS.MYFW.conf = this.conf;
      window.requestAnimationFrame(this._update);
      $(window).bind("resize", this._resize);
      this._resize();
      if (this.conf.IS_SMT) {
        $(window).bind("orientationchange", this._resize);
      }
      if ($("html").mousewheel != null) {
        return $("html").mousewheel(this._eMouseWheel);
      }
    };

    myfw.prototype._eMouseWheel = function(event, delta, deltaX, deltaY) {
      var i, l, len1, ref, results, val;
      ref = this._wheelList;
      results = [];
      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
        val = ref[i];
        results.push(val(event, delta, deltaX, deltaY));
      }
      return results;
    };

    myfw.prototype.addWheel = function(func) {
      return this._wheelList.push(func);
    };

    myfw.prototype.delWheel = function(func) {
      var arr, i, l, len1, ref, val;
      arr = [];
      ref = this._wheelList;
      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
        val = ref[i];
        if (val !== func) {
          arr.push(val);
        }
      }
      return this._wheelList = arr;
    };

    myfw.prototype.stageWidth = function() {
      return this.ws.w;
    };

    myfw.prototype.stageHeight = function() {
      return this.ws.h;
    };

    myfw.prototype.refresh = function() {
      return this._resize();
    };

    myfw.prototype._update = function() {
      var i, l, len1, ref, val;
      if (this.conf.IS_SMT || document.hasFocus()) {
        this._setStageSize();
        ref = this._updateList;
        for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
          val = ref[i];
          val();
        }
        if (this._stats != null) {
          this._stats.update();
        }
      }
      return window.requestAnimationFrame(this._update);
    };

    myfw.prototype.addUpdate = function(func) {
      return this._updateList.push(func);
    };

    myfw.prototype.delUpdate = function(func) {
      var arr, i, l, len1, ref, val;
      arr = [];
      ref = this._updateList;
      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
        val = ref[i];
        if (val !== func) {
          arr.push(val);
        }
      }
      return this._updateList = arr;
    };

    myfw.prototype._setStageSize = function() {
      var h, w;
      if (this.conf.IS_SMT) {
        w = window.innerWidth;
        h = window.innerHeight;
      } else {
        if (this.conf.IS_U_IE8) {
          w = $(window).width();
          h = $(window).height();
        } else {
          w = $(window).width();
          h = window.innerHeight;
        }
      }
      this.ws.oldW = this.ws.w;
      this.ws.oldH = this.ws.h;
      this.ws.w = w;
      return this.ws.h = h;
    };

    myfw.prototype._resize = function(e) {
      var i, l, len1, ref, results, val;
      this._setStageSize();
      ref = this._resizeList;
      results = [];
      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
        val = ref[i];
        results.push(val(this.ws.w, this.ws.h));
      }
      return results;
    };

    myfw.prototype.addResize = function(func, isCall) {
      this._resizeList.push(func);
      if ((isCall != null) && isCall) {
        return func(this.ws.w, this.ws.h);
      }
    };

    myfw.prototype.delResize = function(func) {
      var arr, i, l, len1, ref, val;
      arr = [];
      ref = this._resizeList;
      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
        val = ref[i];
        if (val !== func) {
          arr.push(val);
        }
      }
      return this._resizeList = arr;
    };

    myfw.prototype.setStats = function() {
      this._stats = new Stats();
      this._stats.domElement.style.position = "fixed";
      this._stats.domElement.style.left = "0px";
      this._stats.domElement.style.bottom = "0px";
      return document.body.appendChild(this._stats.domElement);
    };

    return myfw;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.light = (function() {
    function light(x, y, z, brightness) {
      this.brightness = bind(this.brightness, this);
      this.dispose = bind(this.dispose, this);
      this.x = x;
      this.y = y;
      this.z = z;
      this._brightness = brightness;
    }

    light.prototype.dispose = function() {};

    light.prototype.brightness = function(val) {
      if (val == null) {
        return this._brightness;
      } else {
        this._brightness = Math.max(val, 0);
        return this._brightness = Math.min(this._brightness, 1);
      }
    };

    return light;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.point3d = (function() {
    function point3d(x, y, z, option) {
      this.rotateZ = bind(this.rotateZ, this);
      this.rotateY = bind(this.rotateY, this);
      this.rotateX = bind(this.rotateX, this);
      this.screenY = bind(this.screenY, this);
      this.screenX = bind(this.screenX, this);
      this.scale = bind(this.scale, this);
      this.setCenter = bind(this.setCenter, this);
      this.setVanishingPoint = bind(this.setVanishingPoint, this);
      this.dispose = bind(this.dispose, this);
      this.fl = (option != null) && (option.fl != null) ? option.fl : 800;
      this.vpX = 0;
      this.vpY = 0;
      this.cX = 0;
      this.cY = 0;
      this.cZ = 0;
      this.x = x;
      this.y = y;
      this.z = z;
    }

    point3d.prototype.dispose = function() {};

    point3d.prototype.setVanishingPoint = function(vpX, vpY) {
      this.vpX = vpX;
      return this.vpY = vpY;
    };

    point3d.prototype.setCenter = function(cX, cY, cZ) {
      this.cX = cX;
      this.cY = cY;
      return this.cZ = cZ;
    };

    point3d.prototype.scale = function() {
      return this.fl / (this.fl + this.z + this.cZ);
    };

    point3d.prototype.screenX = function() {
      return this.vpX + this.cX + this.x * this.scale();
    };

    point3d.prototype.screenY = function() {
      return this.vpY + this.cY + this.y * this.scale();
    };

    point3d.prototype.rotateX = function(angleX) {
      var cosX, sinX, y1, z1;
      cosX = Math.cos(angleX);
      sinX = Math.sin(angleX);
      y1 = this.y * cosX - this.z * sinX;
      z1 = this.z * cosX + this.y * sinX;
      this.y = y1;
      return this.z = z1;
    };

    point3d.prototype.rotateY = function(angleY) {
      var cosY, sinY, x1, z1;
      cosY = Math.cos(angleY);
      sinY = Math.sin(angleY);
      x1 = this.x * cosY - this.z * sinY;
      z1 = this.z * cosY + this.x * sinY;
      this.x = x1;
      return this.z = z1;
    };

    point3d.prototype.rotateZ = function(angleZ) {
      var cosZ, sinZ, x1, y1;
      cosZ = Math.cos(angleZ);
      sinZ = Math.sin(angleZ);
      x1 = this.x * cosZ - this.y * sinZ;
      y1 = this.y * cosZ + this.x * sinZ;
      this.x = x1;
      return this.y = y1;
    };

    return point3d;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.triangle = (function() {
    function triangle(a, b, c, color, light) {
      this._toRgb = bind(this._toRgb, this);
      this._getLightFactor = bind(this._getLightFactor, this);
      this._adjustedColor = bind(this._adjustedColor, this);
      this._depth = bind(this._depth, this);
      this._isBackFace = bind(this._isBackFace, this);
      this._initColor = bind(this._initColor, this);
      this.draw = bind(this.draw, this);
      this.setDrawInfo = bind(this.setDrawInfo, this);
      this.setColor = bind(this.setColor, this);
      this.dispose = bind(this.dispose, this);
      this.pointA = a;
      this.pointB = b;
      this.pointC = c;
      this.depth = 0;
      this.color = color;
      this.light = light;
      this._isFill = true;
      this._isLine = false;
      this._isDraw = true;
    }

    triangle.prototype.dispose = function() {
      this.pointA = null;
      this.pointB = null;
      this.pointC = null;
      return this.light = null;
    };

    triangle.prototype.setColor = function(color) {
      return this.color = color;
    };

    triangle.prototype.setDrawInfo = function(isFill, isLine, isDraw) {
      this._isFill = isFill;
      this._isLine = isLine;
      return this._isDraw = isDraw;
    };

    triangle.prototype.draw = function(ctx) {
      var color;
      this._depth();
      if (!this._isDraw || this._isBackFace()) {
        return;
      }
      color = "#" + this._initColor(this._adjustedColor());
      ctx.beginPath();
      if (this._isFill) {
        ctx.fillStyle = color;
      }
      if (this._isLine) {
        ctx.strokeStyle = color;
      }
      ctx.moveTo(this.pointA.screenX(), this.pointA.screenY());
      ctx.lineTo(this.pointB.screenX(), this.pointB.screenY());
      ctx.lineTo(this.pointC.screenX(), this.pointC.screenY());
      ctx.lineTo(this.pointA.screenX(), this.pointA.screenY());
      ctx.closePath();
      if (this._isLine) {
        ctx.stroke();
      }
      if (this._isFill) {
        return ctx.fill();
      }
    };

    triangle.prototype._initColor = function(color) {
      var colorStr, i;
      colorStr = color.toString(16);
      i = colorStr.length;
      while (i < 6) {
        colorStr = "0" + colorStr;
        i++;
      }
      return colorStr;
    };

    triangle.prototype._isBackFace = function() {
      var bcx, bcy, cax, cay;
      cax = this.pointC.screenX() - this.pointA.screenX();
      cay = this.pointC.screenY() - this.pointA.screenY();
      bcx = this.pointB.screenX() - this.pointC.screenX();
      bcy = this.pointB.screenY() - this.pointC.screenY();
      return cax * bcy > cay * bcx;
    };

    triangle.prototype._depth = function() {
      var zpos;
      zpos = Math.min(this.pointA.z, this.pointB.z);
      zpos = Math.min(zpos, this.pointC.z);
      return this.depth = zpos;
    };

    triangle.prototype._adjustedColor = function() {
      var b, g, lightFactor, r;
      lightFactor = this._getLightFactor();
      r = this.color >> 16;
      g = this.color >> 8 & 0xff;
      b = this.color & 0xff;
      r *= lightFactor;
      g *= lightFactor;
      b *= lightFactor;
      return r << 16 | g << 8 | b;
    };

    triangle.prototype._getLightFactor = function() {
      var ab, bc, dotProd, lightMag, norm, normMag;
      if (this.light == null) {
        return 1;
      }
      ab = {};
      ab.x = this.pointA.x - this.pointB.x;
      ab.y = this.pointA.y - this.pointB.y;
      ab.z = this.pointA.z - this.pointB.z;
      bc = {};
      bc.x = this.pointB.x - this.pointC.x;
      bc.y = this.pointB.y - this.pointC.y;
      bc.z = this.pointB.z - this.pointC.z;
      norm = {};
      norm.x = (ab.y * bc.z) - (ab.z * bc.y);
      norm.y = -((ab.x * bc.z) - (ab.z * bc.x));
      norm.z = (ab.x * bc.y) - (ab.y * bc.x);
      dotProd = norm.x * this.light.x + norm.y * this.light.y + norm.z * this.light.z;
      normMag = Math.sqrt(norm.x * norm.x + norm.y * norm.y + norm.z * norm.z);
      lightMag = Math.sqrt(this.light.x * this.light.x + this.light.y * this.light.y + this.light.z * this.light.z);
      return (Math.acos(dotProd / (normMag * lightMag)) / Math.PI) * this.light.brightness();
    };

    triangle.prototype._toRgb = function(color) {
      var b, g, r;
      r = color >> 16;
      g = color >> 8 & 0xff;
      b = color & 0xff;
      return "rgb(" + r + ", " + g + ", " + b + ")";
    };

    return triangle;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.animation = (function() {
    function animation() {
      this.to = bind(this.to, this);
      this.get = bind(this.get, this);
      this.rate = bind(this.rate, this);
      this._update = bind(this._update, this);
      this.isCompleted = bind(this.isCompleted, this);
      this.isSet = bind(this.isSet, this);
      this.isComplete = bind(this.isComplete, this);
      this.isStart = bind(this.isStart, this);
      this.start = bind(this.start, this);
      this.set = bind(this.set, this);
      this.reset = bind(this.reset, this);
      this.dispose = bind(this.dispose, this);
      this._init = bind(this._init, this);
      this._cnt = 0;
      this._delay = 0;
      this._frame = 0;
      this._param;
      this._onStart;
      this._onComplete;
      this._isStart = true;
      this._isComplete = true;
      this._isSet = false;
      this._isCompleted = false;
      this._init();
    }

    animation.prototype._init = function() {};

    animation.prototype.dispose = function() {
      return this.reset();
    };

    animation.prototype.reset = function() {
      root._LIBS.MYFW.main.delUpdate(this._update);
      this._isStart = false;
      this._isComplete = false;
      this._isSet = false;
      this._isCompleted = false;
      this._param = null;
      this._onStart = null;
      return this._onComplete = null;
    };

    animation.prototype.set = function(param) {
      var key, results, val;
      this.reset();
      if (param.ease == null) {
        param.ease = "linear";
      }
      this._isSet = true;
      this._cnt = 0;
      this._delay = param.delay == null ? 0 : param.delay;
      this._frame = param.frame == null ? 0 : param.frame;
      this._onStart = param.onStart;
      this._onComplete = param.onComplete;
      this._param = {};
      results = [];
      for (key in param) {
        val = param[key];
        if (key !== "delay" && key !== "frame" && key !== "onStart" && key !== "onComplete" && key !== "ease") {
          val.val = val.from;
          val.easing = new root._LIBS.easing();
          switch (param.ease) {
            case "linear":
              val.easeMethod = val.easing.linear;
              break;
            case "easeInExpo":
              val.easeMethod = val.easing.expoIn;
              break;
            case "easeOutExpo":
              val.easeMethod = val.easing.expoOut;
              break;
            case "easeInOutExpo":
              val.easeMethod = val.easing.expoInOut;
              break;
            case "bounceOut":
              val.easeMethod = val.easing.bounceOut;
          }
          val.easeSpeed = 1 / this._frame;
          results.push(this._param[key] = val);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    animation.prototype.start = function() {
      return root._LIBS.MYFW.main.addUpdate(this._update);
    };

    animation.prototype.isStart = function() {
      return this._isStart;
    };

    animation.prototype.isComplete = function() {
      return this._isComplete;
    };

    animation.prototype.isSet = function() {
      return this._isSet;
    };

    animation.prototype.isCompleted = function() {
      return this._isCompleted;
    };

    animation.prototype._update = function() {
      var key, rate, ref, u, val;
      if (!this._isComplete && ++this._cnt > this._delay) {
        u = root._LIBS.MYFW.util;
        if (!this._isStart) {
          if (this._onStart != null) {
            this._onStart();
          }
          this._isStart = true;
        }
        ref = this._param;
        for (key in ref) {
          val = ref[key];
          val.easing.val += val.easeSpeed;
          val.easing.val = u.floor(val.easing.val, 0, 1);
          val.easing.t = val.easing.val;
          rate = val.easing.val >= 1 ? 1 : val.easeMethod();
          val.val = (val.from * (1 - rate)) + (val.to * rate);
          if (rate >= 1) {
            this._isComplete = true;
          }
        }
        if (this._isComplete) {
          if (this._onComplete != null) {
            return this._onComplete();
          }
        }
      }
    };

    animation.prototype.rate = function(r) {
      var key, rate, ref, results, u, val;
      u = root._LIBS.MYFW.util;
      r = u.floor(r, 0, 1);
      ref = this._param;
      results = [];
      for (key in ref) {
        val = ref[key];
        val.easing.val = r;
        val.easing.t = val.easing.val;
        rate = val.easing.val >= 1 ? 1 : val.easeMethod();
        results.push(val.val = (val.from * (1 - rate)) + (val.to * rate));
      }
      return results;
    };

    animation.prototype.get = function(key) {
      if (this._isComplete) {
        this._isCompleted = true;
      }
      if ((this._param != null) && (this._param[key] != null)) {
        return this._param[key].val;
      } else {
        return 0;
      }
    };

    animation.prototype.to = function(key) {
      if ((this._param != null) && (this._param[key] != null)) {
        return this._param[key].to;
      } else {
        return null;
      }
    };

    return animation;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.easing = (function() {
    function easing() {
      this.bounceOut = bind(this.bounceOut, this);
      this.circInOut = bind(this.circInOut, this);
      this.circOut = bind(this.circOut, this);
      this.circIn = bind(this.circIn, this);
      this.expoInOut = bind(this.expoInOut, this);
      this.expoOut = bind(this.expoOut, this);
      this.expoIn = bind(this.expoIn, this);
      this.sineInOut = bind(this.sineInOut, this);
      this.sineOut = bind(this.sineOut, this);
      this.sineIn = bind(this.sineIn, this);
      this.quintInOut = bind(this.quintInOut, this);
      this.quintOut = bind(this.quintOut, this);
      this.quintIn = bind(this.quintIn, this);
      this.quartInOut = bind(this.quartInOut, this);
      this.quartOut = bind(this.quartOut, this);
      this.quartIn = bind(this.quartIn, this);
      this.cubicInOut = bind(this.cubicInOut, this);
      this.cubicOut = bind(this.cubicOut, this);
      this.cubicIn = bind(this.cubicIn, this);
      this.quadInOut = bind(this.quadInOut, this);
      this.quadOut = bind(this.quadOut, this);
      this.quadIn = bind(this.quadIn, this);
      this.linear = bind(this.linear, this);
      this.reset = bind(this.reset, this);
      this.dispose = bind(this.dispose, this);
      this._init = bind(this._init, this);
      this.t = 0;
      this.b = 0;
      this.c = 1;
      this.d = 1;
      this.val = 0;
      this._init();
    }

    easing.prototype._init = function() {};

    easing.prototype.dispose = function() {};

    easing.prototype.reset = function() {
      this.t = 0;
      return this.val = 0;
    };

    easing.prototype.linear = function() {
      return this.c * this.t / this.d + this.b;
    };

    easing.prototype.quadIn = function() {
      this.t /= this.d;
      return this.c * this.t * this.t + this.b;
    };

    easing.prototype.quadOut = function() {
      this.t /= this.d;
      return -this.c * this.t * (this.t - 2) + this.b;
    };

    easing.prototype.quadInOut = function() {
      this.t /= this.d / 2;
      if (this.t < 1) {
        return this.c / 2 * this.t * this.t + this.b;
      }
      this.t--;
      return -this.c / 2 * (this.t * (this.t - 2) - 1) + this.b;
    };

    easing.prototype.cubicIn = function() {
      this.t /= this.d;
      return this.c * this.t * this.t * this.t + this.b;
    };

    easing.prototype.cubicOut = function() {
      this.t /= this.d;
      this.t--;
      return this.c * (this.t * this.t * this.t + 1) + this.b;
    };

    easing.prototype.cubicInOut = function() {
      this.t /= this.d / 2;
      if (this.t < 1) {
        return this.c / 2 * this.t * this.t * this.t + this.b;
      }
      this.t -= 2;
      return this.c / 2 * (this.t * this.t * this.t + 2) + this.b;
    };

    easing.prototype.quartIn = function() {
      this.t /= this.d;
      return this.c * this.t * this.t * this.t * this.t + this.b;
    };

    easing.prototype.quartOut = function() {
      this.t /= this.d;
      this.t--;
      return -this.c * (this.t * this.t * this.t * this.t - 1) + this.b;
    };

    easing.prototype.quartInOut = function() {
      this.t /= this.d / 2;
      if (this.t < 1) {
        return this.c / 2 * this.t * this.t * this.t * this.t + this.b;
      }
      this.t -= 2;
      return -this.c / 2 * (this.t * this.t * this.t * this.t - 2) + this.b;
    };

    easing.prototype.quintIn = function() {
      this.t /= this.d;
      return this.c * this.t * this.t * this.t * this.t * this.t + this.b;
    };

    easing.prototype.quintOut = function() {
      this.t /= this.d;
      this.t--;
      return this.c * (this.t * this.t * this.t * this.t * this.t + 1) + this.b;
    };

    easing.prototype.quintInOut = function() {
      this.t /= this.d / 2.0;
      if (this.t < 1) {
        return this.c / 2.0 * this.t * this.t * this.t * this.t * this.t + this.b;
      }
      this.t = this.t - 2;
      return this.c / 2.0 * (this.t * this.t * this.t * this.t * this.t + 2) + this.b;
    };

    easing.prototype.sineIn = function() {
      return -this.c * Math.cos(this.t / this.d * (Math.PI / 2)) + this.c + this.b;
    };

    easing.prototype.sineOut = function() {
      return this.c * Math.sin(this.t / this.d * (Math.PI / 2)) + this.b;
    };

    easing.prototype.sineInOut = function() {
      return -this.c / 2 * (Math.cos(Math.PI * this.t / this.d) - 1) + this.b;
    };

    easing.prototype.expoIn = function() {
      return this.c * Math.pow(2, 10 * (this.t / this.d - 1)) + this.b;
    };

    easing.prototype.expoOut = function() {
      return this.c * (-Math.pow(2, -10 * this.t / this.d) + 1) + this.b;
    };

    easing.prototype.expoInOut = function() {
      this.t /= this.d / 2;
      if (this.t < 1) {
        return this.c / 2 * Math.pow(2, 10 * (this.t - 1)) + this.b;
      }
      this.t--;
      return this.c / 2 * (-Math.pow(2, -10 * this.t) + 2) + this.b;
    };

    easing.prototype.circIn = function() {
      this.t /= this.d;
      return -this.c * (Math.sqrt(1 - this.t * this.t) - 1) + this.b;
    };

    easing.prototype.circOut = function() {
      this.t /= this.d;
      this.t--;
      return this.c * Math.sqrt(1 - this.t * this.t) + this.b;
    };

    easing.prototype.circInOut = function() {
      this.t /= this.d / 2;
      if (this.t < 1) {
        return -this.c / 2 * (Math.sqrt(1 - this.t * this.t) - 1) + this.b;
      }
      this.t -= 2;
      return this.c / 2 * (Math.sqrt(1 - this.t * this.t) + 1) + this.b;
    };

    easing.prototype.bounceOut = function() {
      if ((this.t /= this.d) < (1 / 2.75)) {
        return this.c * (7.5625 * this.t * this.t) + this.b;
      }
      if (this.t < (2 / 2.75)) {
        return this.c * (7.5625 * (this.t -= 1.5 / 2.75) * this.t + 0.75) + this.b;
      }
      if (this.t < (2.5 / 2.75)) {
        return this.c * (7.5625 * (this.t -= 2.25 / 2.75) * this.t + 0.9375) + this.b;
      } else {
        return this.c * (7.5625 * (this.t -= 2.625 / 2.75) * this.t + 0.984375) + this.b;
      }
    };

    return easing;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.float = (function() {
    function float(target, para) {
      this.dispose = bind(this.dispose, this);
      this.update = bind(this.update, this);
      this._target = target;
      this._para = para;
      this._sinList1 = [];
      this._sinList2 = {};
      this._init();
    }

    float.prototype._init = function() {
      var i, l, len, len1, ref, results, s, start, val;
      len = this._para.length;
      ref = this._para;
      results = [];
      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
        val = ref[i];
        start = val.start == null ? 0 : val.start;
        s = new root._LIBS.sin(this._target[val.target], -val.range * 0.5, val.range * 0.5, val.speed, start);
        val.delayCnt = 0;
        if (val.delay == null) {
          val.delay = 0;
        }
        this._sinList1.push(s);
        results.push(this._sinList2[val.target] = s);
      }
      return results;
    };

    float.prototype.update = function() {
      var i, l, len1, o, ref, results, val;
      ref = this._sinList1;
      results = [];
      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
        val = ref[i];
        o = this._para[i];
        if (o.delayCnt >= o.delay) {
          results.push(this._target[o.target] = this._sinList1[i].update());
        } else {
          results.push(o.delayCnt++);
        }
      }
      return results;
    };

    float.prototype.dispose = function() {
      this._target = null;
      this._para = null;
      this._sinList1 = null;
      return this._sinList2 = null;
    };

    return float;

  })();

  root._LIBS.sin = (function() {
    function sin(base, min, max, speed, angle) {
      this.base = base;
      this.min = min;
      this.max = max;
      this.speed = speed;
      this.angle = angle;
      this.val = 0;
    }

    sin.prototype.update = function() {
      var u;
      u = root._LIBS.MYFW.util;
      this.angle += this.speed;
      if (this.angle > 360) {
        this.angle = this.angle - 360;
      }
      this.val = this.base + u.map(Math.sin(u.radian(this.angle)), this.min, this.max, -1, 1);
      return this.val;
    };

    return sin;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.displayContainer = (function(superClass) {
    extend(displayContainer, superClass);

    function displayContainer(elm, option) {
      this.dispose2 = bind(this.dispose2, this);
      this.setup = bind(this.setup, this);
      displayContainer.__super__.constructor.call(this, option);
      this._elm = elm;
    }

    displayContainer.prototype.setup = function() {
      this._id = this._elm.attr("id");
      if (this._id == null) {
        this.setId();
      }
      return this.init();
    };

    displayContainer.prototype.dispose2 = function() {};

    return displayContainer;

  })(root._LIBS.display);

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.displayContainerList = (function(superClass) {
    extend(displayContainerList, superClass);

    function displayContainerList(elm, option) {
      this.getDisplayClass = bind(this.getDisplayClass, this);
      this.getDisplayKey = bind(this.getDisplayKey, this);
      this.getDisplay = bind(this.getDisplay, this);
      this.dispose2 = bind(this.dispose2, this);
      this.makeList = bind(this.makeList, this);
      this.setup = bind(this.setup, this);
      displayContainerList.__super__.constructor.call(this, option);
      this._displayList = [];
      this._elm = elm;
    }

    displayContainerList.prototype.setup = function() {
      this._id = this._elm.attr("id");
      if (this._id == null) {
        this.setId();
      }
      this.makeList($("#" + this.id() + ">*"));
      return this.init();
    };

    displayContainerList.prototype.makeList = function(elm) {
      var display, i, l, len1, results, val;
      results = [];
      for (i = l = 0, len1 = elm.length; l < len1; i = ++l) {
        val = elm[i];
        display = new root._LIBS.displayContainer($(val));
        display.setup();
        results.push(this._displayList.push(display));
      }
      return results;
    };

    displayContainerList.prototype.dispose2 = function() {};

    displayContainerList.prototype.getDisplay = function(id) {
      var i, l, len1, ref, val;
      ref = this._displayList;
      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
        val = ref[i];
        if (val.id() === id) {
          return val;
        }
      }
      return null;
    };

    displayContainerList.prototype.getDisplayKey = function(id) {
      var i, l, len1, ref, val;
      ref = this._displayList;
      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
        val = ref[i];
        if (val.id() === id) {
          return i;
        }
      }
      return null;
    };

    displayContainerList.prototype.getDisplayClass = function(cls) {
      var i, l, len1, ref, val;
      ref = this._displayList;
      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
        val = ref[i];
        if (val.elm().attr("class") === cls) {
          return val;
        }
      }
      return null;
    };

    return displayContainerList;

  })(root._LIBS.display);

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.displayImage = (function(superClass) {
    extend(displayImage, superClass);

    function displayImage(src, retina, option) {
      this.getImgSize = bind(this.getImgSize, this);
      this.setRetina = bind(this.setRetina, this);
      this._eLoadMyImg = bind(this._eLoadMyImg, this);
      this.dispose2 = bind(this.dispose2, this);
      this.addStage = bind(this.addStage, this);
      if (retina == null) {
        retina = false;
      }
      this._src = src;
      this._retina = retina;
      this._myImg;
      this.onLoad;
      displayImage.__super__.constructor.call(this, option);
    }

    displayImage.prototype.addStage = function() {
      if (root.MY.myfw.conf.IS_U_IE8) {
        this._src = root.MY.myfw.util.addUnique(this._src);
      }
      this._myImg = new root._LIBS.image(this._src, 0, 0, "", this._retina);
      this._myImg.onLoad = this._eLoadMyImg;
      return this._myImg.load();
    };

    displayImage.prototype.dispose2 = function() {
      if (this._myImg != null) {
        this._myImg.dispose();
        this._myImg = null;
      }
      return this.onLoad = null;
    };

    displayImage.prototype._eLoadMyImg = function() {
      if (this._myImg != null) {
        this.setBg(this._myImg);
      }
      if (this.onLoad != null) {
        return this.onLoad(root.MY.myfw.stageWidth(), root.MY.myfw.stageHeight());
      }
    };

    displayImage.prototype.setRetina = function(bool) {
      this._retina = bool;
      if (this._myImg != null) {
        this._myImg.setRetina(bool);
        return this.setBg(this._myImg);
      }
    };

    displayImage.prototype.getImgSize = function() {
      if (this._myImg != null) {
        return {
          width: this._myImg.width,
          height: this._myImg.height
        };
      } else {
        return {
          width: 0,
          height: 0
        };
      }
    };

    return displayImage;

  })(root._LIBS.display);

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.spriteSheetView = (function(superClass) {
    extend(spriteSheetView, superClass);

    function spriteSheetView(spriteImgFile, param, option) {
      this.getSize = bind(this.getSize, this);
      this._updateSprite = bind(this._updateSprite, this);
      this.setState = bind(this.setState, this);
      this._eCompleteSpriteImg = bind(this._eCompleteSpriteImg, this);
      this.dispose2 = bind(this.dispose2, this);
      this.addStage = bind(this.addStage, this);
      spriteSheetView.__super__.constructor.call(this);
      this._spriteImgFile = spriteImgFile;
      this._param = JSON.parse(param);
      this._option = option || {};
      this._spriteImg;
      this._state = "";
    }

    spriteSheetView.prototype.addStage = function() {
      this._spriteImg = new root._LIBS.displayImage(this._spriteImgFile, this._option.imgRetina || false);
      this._spriteImg.onLoad = this._eCompleteSpriteImg;
      this.addChild(this._spriteImg);
      this.mask();
      return this.size(0, 0);
    };

    spriteSheetView.prototype.dispose2 = function() {
      if (this._spriteImg != null) {
        this._spriteImg.dispose();
        this._spriteImg = null;
      }
      this._option = null;
      return this._param = null;
    };

    spriteSheetView.prototype._eCompleteSpriteImg = function() {
      return this._updateSprite();
    };

    spriteSheetView.prototype.setState = function(state) {
      this._state = state;
      return this._updateSprite();
    };

    spriteSheetView.prototype._updateSprite = function() {
      var pos;
      if (this._state === "") {
        return;
      }
      pos = this._param.frames[this._state].frame;
      if (this._option.imgRetina) {
        this._spriteImg.xy(-pos.x * 0.5, -pos.y * 0.5);
        return this.size(pos.w * 0.5, pos.h * 0.5);
      } else {
        this._spriteImg.xy(-pos.x, -pos.y);
        return this.size(pos.w, pos.h);
      }
    };

    spriteSheetView.prototype.getSize = function(state) {
      var pos;
      pos = this._param.frames[state || this._state].frame;
      if (this._option.imgRetina) {
        return {
          w: pos.w * 0.5,
          h: pos.h * 0.5
        };
      } else {
        return {
          w: pos.w,
          h: pos.h
        };
      }
    };

    return spriteSheetView;

  })(root._LIBS.display);

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.image = (function() {
    function image(src, width, height, alt, isRetina) {
      this.setRetina = bind(this.setRetina, this);
      this._eLoad = bind(this._eLoad, this);
      this.load = bind(this.load, this);
      this.data = bind(this.data, this);
      this.dispose = bind(this.dispose, this);
      this.src = src;
      this.orgSrc = src;
      if (width == null) {
        width = 0;
      }
      if (height == null) {
        height = 0;
      }
      if (alt == null) {
        alt = "";
      }
      if (isRetina == null) {
        isRetina = false;
      }
      this.width = width;
      this.height = height;
      this.orgWidth = width;
      this.orgHeight = height;
      this._isRetina = isRetina;
      if (this._isRetina) {
        this.width = ~~(width * 0.5);
        this.height = ~~(height * 0.5);
      }
      this.alt = alt;
      this._image;
      this.onLoad;
    }

    image.prototype.dispose = function() {
      this._image = null;
      return this.onLoad = null;
    };

    image.prototype.data = function() {
      return this._image;
    };

    image.prototype.load = function() {
      this._image = new Image();
      this._image.onload = this._eLoad;
      return this._image.src = this.src;
    };

    image.prototype._eLoad = function() {
      if (this._image != null) {
        this.width = this._image.width;
        this.height = this._image.height;
        this.orgWidth = this._image.width;
        this.orgHeight = this._image.height;
        if (this._isRetina) {
          this.width = ~~(this.orgWidth * 0.5);
          this.height = ~~(this.orgHeight * 0.5);
        }
        if (this.onLoad != null) {
          return this.onLoad();
        }
      }
    };

    image.prototype.setRetina = function(bool) {
      this._isRetina = bool;
      if (this._isRetina) {
        this.width = ~~(this.orgWidth * 0.5);
        return this.height = ~~(this.orgHeight * 0.5);
      } else {
        this.width = this.orgWidth;
        return this.height = this.orgHeight;
      }
    };

    return image;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.imagesLoader = (function() {
    function imagesLoader(list, num) {
      this.dispose = bind(this.dispose, this);
      this._list = list;
      this._num = num == null ? 1 : num;
      this.imgList = {};
      this.loadedNum = 0;
      this.loaded = false;
      this.onComplete;
      this.onProgress;
    }

    imagesLoader.prototype.start = function() {
      return this._load();
    };

    imagesLoader.prototype.dispose = function() {
      this._list = null;
      this.imgList = null;
      this.onComplete = null;
      return this.onProgress = null;
    };

    imagesLoader.prototype.getImg = function(id) {
      return this.imgList[id];
    };

    imagesLoader.prototype.imgNum = function() {
      return this.imgList.length;
    };

    imagesLoader.prototype._load = function() {
      var end, i, img, o, results, start;
      start = this.loadedNum;
      end = Math.min(start + this._num, this._list.length);
      i = start;
      results = [];
      while (i < end) {
        img = new Image();
        o = this._list[i];
        if ((o.isSmt != null) && o.isSmt && root.MY.conf.IS_SMT) {
          img.src = o.url.replace(".", "Smt.");
        } else {
          img.src = o.url;
        }
        img.imgLoader = this;
        img.imgLoaderId = o.id;
        img.onload = function() {
          this.orgWidth = this.width;
          this.orgHeight = this.height;
          return this.imgLoader._loadedImg(this.imgLoaderId);
        };
        this.imgList[o.id] = img;
        results.push(i++);
      }
      return results;
    };

    imagesLoader.prototype._loadedImg = function() {
      this.loadedNum++;
      if (this.onProgress != null) {
        this.onProgress((this.loadedNum / this._list.length) * 100);
      }
      if (this.loadedNum >= this._list.length) {
        this.loaded = true;
        if (this.onComplete != null) {
          this.onComplete();
        }
        return;
      }
      if (this.loadedNum % this._num === 0) {
        return this._load();
      }
    };

    return imagesLoader;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.imagesMgr = (function() {
    function imagesMgr(imgList, useCache) {
      this.get = bind(this.get, this);
      this._eCompletePreloadImg = bind(this._eCompletePreloadImg, this);
      this._eProgressPreloadImg = bind(this._eProgressPreloadImg, this);
      this.load = bind(this.load, this);
      this.dispose = bind(this.dispose, this);
      this._imgList = imgList;
      this._isUseCache = useCache == null ? true : useCache;
      this._loaderForImg;
      this.onProgress;
      this.onComplete;
      this._init();
    }

    imagesMgr.prototype._init = function() {};

    imagesMgr.prototype.dispose = function() {
      if (this._loaderForImg != null) {
        this._loaderForImg.dispose();
        this._loaderForImg = null;
      }
      this._imgList = null;
      this.onProgress = null;
      return this.onComplete = null;
    };

    imagesMgr.prototype.load = function() {
      var i, l, len1, ref, u, val;
      u = root.MY.util;
      if (!this._isUseCache) {
        ref = this._imgList;
        for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
          val = ref[i];
          val.url = u.addUnique(val.url);
        }
      }
      this._loaderForImg = new root._LIBS.imagesLoader(this._imgList, 5);
      this._loaderForImg.onComplete = this._eCompletePreloadImg;
      this._loaderForImg.onProgress = this._eProgressPreloadImg;
      return this._loaderForImg.start();
    };

    imagesMgr.prototype._eProgressPreloadImg = function(val) {
      var pct;
      if (this.onProgress != null) {
        pct = val / 100;
        return this.onProgress(100 * pct);
      }
    };

    imagesMgr.prototype._eCompletePreloadImg = function() {
      if (this.onProgress != null) {
        this.onProgress(100);
      }
      if (this.onComplete != null) {
        return this.onComplete();
      }
    };

    imagesMgr.prototype.get = function(id) {
      var data;
      data = this._loaderForImg.getImg(id);
      return new root._LIBS.image(data.src, data.width, data.height);
    };

    return imagesMgr;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.blendmode = (function() {
    function blendmode() {
      this.DIFFERENCE = 0;
      this.LINEARDODGE = 1;
      this.MULTIPLY = 2;
      this.SCREEN = 3;
    }

    blendmode.prototype.apply = function(canvasAID, canvasBID, type) {
      var canvasA, canvasB, contextA, contextB, imageDataA, imageDataB, outputImageData;
      canvasA = document.getElementById(canvasAID);
      canvasB = document.getElementById(canvasBID);
      contextA = canvasA.getContext("2d");
      contextB = canvasB.getContext("2d");
      imageDataA = contextA.getImageData(0, 0, canvasA.width, canvasA.height);
      imageDataB = contextB.getImageData(0, 0, canvasA.width, canvasA.height);
      outputImageData;
      switch (type) {
        case this.DIFFERENCE:
          outputImageData = this._difference(imageDataA, imageDataB);
          break;
        case this.LINEARDODGE:
          outputImageData = this._lineardodge(imageDataA, imageDataB);
          break;
        case this.MULTIPLY:
          outputImageData = this._multiply(imageDataA, imageDataB);
          break;
        case this.SCREEN:
          outputImageData = this._screen(imageDataA, imageDataB);
      }
      return contextA.putImageData(outputImageData, 0, 0);
    };

    blendmode.prototype._linearburn = function(imageDataA, imageDataB) {
      var bA, bB, dataA, dataB, gA, gB, i, rA, rB;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    blendmode.prototype._colorburn = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = rB === 0 ? 0 : (rC = 255 - ((255 - rA) * 255) / rB) > 0 ? rC : 0;
        gC = gB === 0 ? 0 : (gC = 255 - ((255 - gA) * 255) / gB) > 0 ? gC : 0;
        bC = bB === 0 ? 0 : (bC = 255 - ((255 - bA) * 255) / bB) > 0 ? bC : 0;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    blendmode.prototype._darken = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = rA < rB ? rA : rB;
        gC = gA < gB ? gA : gB;
        bC = bA < bB ? bA : bB;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    blendmode.prototype._screen = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = rB + rA - (rB * rA) / 255;
        gC = gB + gA - (gB * gA) / 255;
        bC = bB + bA - (bB * bA) / 255;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    blendmode.prototype._lineardodge = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = (rC = rA + rB) > 255 ? 255 : rC;
        gC = (gC = gA + gB) > 255 ? 255 : gC;
        bC = (bC = bA + bB) > 255 ? 255 : bC;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    blendmode.prototype._multiply = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = rA * (rB / 255);
        gC = gA * (gB / 255);
        bC = bA * (bB / 255);
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    blendmode.prototype._difference = function(imageDataA, imageDataB) {
      var bA, bB, bC, dataA, dataB, gA, gB, gC, i, rA, rB, rC;
      dataA = imageDataA.data;
      dataB = imageDataB.data;
      i = 0;
      while (i < dataA.length) {
        rA = dataA[i];
        gA = dataA[i + 1];
        bA = dataA[i + 2];
        rB = dataB[i];
        gB = dataB[i + 1];
        bB = dataB[i + 2];
        rC = (rC = rA - rB) < 0 ? -rC : rC;
        gC = (gC = gA - gB) < 0 ? -gC : gC;
        bC = (bC = bA - bB) < 0 ? -bC : bC;
        dataA[i] = rC;
        dataA[i + 1] = gC;
        dataA[i + 2] = bC;
        i += 4;
      }
      return imageDataA;
    };

    return blendmode;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.drag = (function() {
    function drag() {
      this.setVal = bind(this.setVal, this);
      this.dist = bind(this.dist, this);
      this.distRatio = bind(this.distRatio, this);
      this._setMaxDist = bind(this._setMaxDist, this);
      this.setRangeY = bind(this.setRangeY, this);
      this.setRangeX = bind(this.setRangeX, this);
      this.y = bind(this.y, this);
      this.x = bind(this.x, this);
      this.dispose = bind(this.dispose, this);
      this.offsetX = 0;
      this.offsetY = 0;
      this.startX = 0;
      this.startY = 0;
      this._x = 0;
      this._y = 0;
      this.minX = 0;
      this.maxX = 0;
      this.minY = 0;
      this.maxY = 0;
      this.maxDist = 0;
    }

    drag.prototype.dispose = function() {};

    drag.prototype.x = function(val) {
      if (val != null) {
        return this._x = root.MY.util.floor(this._x, this.minX, this.maxX);
      } else {
        return this._x;
      }
    };

    drag.prototype.y = function(val) {
      if (val != null) {
        return this._y = root.MY.util.floor(this._y, this.minY, this.maxY);
      } else {
        return this._y;
      }
    };

    drag.prototype.setRangeX = function(min, max) {
      this.minX = min;
      this.maxX = max;
      return this._setMaxDist();
    };

    drag.prototype.setRangeY = function(min, max) {
      this.minY = min;
      this.maxY = max;
      return this._setMaxDist();
    };

    drag.prototype._setMaxDist = function() {
      var dx, dy;
      dx = this.minX - this.maxX;
      dy = this.minY - this.maxY;
      return this.maxDist = Math.sqrt(dx * dx + dy * dy);
    };

    drag.prototype.distRatio = function() {
      var d;
      d = this.dist();
      return root.MY.util.floor(d / this.maxDist, 0, 1);
    };

    drag.prototype.dist = function() {
      var dx, dy;
      dx = this._x - this.minX;
      dy = this._y - this.minY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    drag.prototype.setVal = function(val) {
      var u;
      u = root.MY.util;
      this._x = u.map(val, this.minX, this.maxX, 0, 1);
      return this._y = u.map(val, this.minY, this.maxY, 0, 1);
    };

    return drag;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.filters = (function() {
    function filters() {}

    filters.prototype.color = function(id, r, g, b) {
      var canvas, ctx, data, i, imgData;
      canvas = document.getElementById(id);
      ctx = canvas.getContext("2d");
      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      data = imgData.data;
      i = 0;
      while (i < data.length) {
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        i += 4;
      }
      return ctx.putImageData(imgData, 0, 0);
    };

    return filters;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.hsvColor = (function() {
    function hsvColor(h, s, v, a) {
      this.setColor = bind(this.setColor, this);
      this.initColor = bind(this.initColor, this);
      this.getHexColor = bind(this.getHexColor, this);
      this.getColor = bind(this.getColor, this);
      h = h == null ? 0 : h;
      s = s == null ? 1 : s;
      v = v == null ? 1 : v;
      this.h = h;
      this.s = Math.min(1, Math.max(s, 0));
      this.v = Math.min(1, Math.max(v, 0));
      this.a = a == null ? 1 : a;
    }

    hsvColor.prototype.getColor = function() {
      var b, g, h2, r;
      if (this.s > 0) {
        h2 = this.h < 0 ? this.h % 360 + 360 : this.h % 360;
        h2 = h2 / 60;
        if (h2 < 1) {
          r = Math.round(255 * this.v);
          g = Math.round(255 * this.v * (1 - this.s * (1 - h2)));
          b = Math.round(255 * this.v * (1 - this.s));
        } else if (h2 < 2) {
          r = Math.round(255 * this.v * (1 - this.s * (h2 - 1)));
          g = Math.round(255 * this.v);
          b = Math.round(255 * this.v * (1 - this.s));
        } else if (h2 < 3) {
          r = Math.round(255 * this.v * (1 - this.s));
          g = Math.round(255 * this.v);
          b = Math.round(255 * this.v * (1 - this.s * (3 - h2)));
        } else if (h2 < 4) {
          r = Math.round(255 * this.v * (1 - this.s));
          g = Math.round(255 * this.v * (1 - this.s * (h2 - 3)));
          b = Math.round(255 * this.v);
        } else if (h2 < 5) {
          r = Math.round(255 * this.v * (1 - this.s * (5 - h2)));
          g = Math.round(255 * this.v * (1 - this.s));
          b = Math.round(255 * this.v);
        } else {
          r = Math.round(255 * this.v);
          g = Math.round(255 * this.v * (1 - this.s));
          b = Math.round(255 * this.v * (1 - this.s * (h2 - 5)));
        }
      } else {
        r = g = b = Math.round(255 * this.v);
      }
      return r << 16 | g << 8 | b;
    };

    hsvColor.prototype.getHexColor = function() {
      return "#" + this.initColor(this.getColor()).toString(16);
    };

    hsvColor.prototype.initColor = function(color) {
      var colorStr, i;
      colorStr = color.toString(16);
      i = colorStr.length;
      while (i < 6) {
        colorStr = "0" + colorStr;
        i++;
      }
      return colorStr;
    };

    hsvColor.prototype.setColor = function(color) {
      var b, g, r;
      r = color >> 16 & 0xff;
      g = color >> 8 & 0xff;
      b = color & 0xff;
      if (r !== g || r !== b) {
        if (g > b) {
          if (r > g) {
            this.v = r / 255;
            this.s = (r - b) / r;
            return this.h = 60 * (g - b) / (r - b);
          } else if (r < b) {
            this.v = g / 255;
            this.s = (g - r) / g;
            return this.h = 60 * (b - r) / (g - r) + 120;
          } else {
            this.v = g / 255;
            this.s = (g - b) / g;
            return this.h = 60 * (b - r) / (g - b) + 120;
          }
        } else {
          if (r > b) {
            this.v = r / 255;
            this.s = (r - g) / r;
            this.h = 60 * (g - b) / (r - g);
            if (this.h < 0) {
              return this.h += 360;
            }
          } else if (r < g) {
            this.v = b / 255;
            this.s = (b - r) / b;
            return this.h = 60 * (r - g) / (b - r) + 240;
          } else {
            this.v = b / 255;
            this.s = (b - g) / b;
            return this.h = 60 * (r - g) / (b - g) + 240;
          }
        }
      } else {
        this.h = this.s = 0;
        return this.v = r / 255;
      }
    };

    return hsvColor;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.rectangle = (function() {
    function rectangle(x, y, width, height) {
      this.intersection = bind(this.intersection, this);
      this.intersects = bind(this.intersects, this);
      this.contains = bind(this.contains, this);
      this.bottom = bind(this.bottom, this);
      this.right = bind(this.right, this);
      this.dispose = bind(this.dispose, this);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    rectangle.prototype.dispose = function() {};

    rectangle.prototype.right = function() {
      return this.x + this.width;
    };

    rectangle.prototype.bottom = function() {
      return this.y + this.height;
    };

    rectangle.prototype.contains = function(chkX, chkY) {
      return chkX > this.x && chkX < this.right() && chkY > this.y && chkY < this.bottom();
    };

    rectangle.prototype.intersects = function(toIntersect) {
      return this.contains(toIntersect.x, toIntersect.y) || this.contains(toIntersect.right(), toIntersect.y) || this.contains(toIntersect.right(), toIntersect.bottom()) || this.contains(toIntersect.x, toIntersect.bottom());
    };

    rectangle.prototype.intersection = function(p1, p2, p3, p4) {
      var ta, tb, tc, td;
      ta = (p1.x - p2.x) * (p3.y - p1.y) + (p1.y - p2.y) * (p1.x - p3.x);
      tb = (p1.x - p2.x) * (p4.y - p1.y) + (p1.y - p2.y) * (p1.x - p4.x);
      tc = (p3.x - p4.x) * (p1.y - p3.y) + (p3.y - p4.y) * (p3.x - p1.x);
      td = (p3.x - p4.x) * (p2.y - p3.y) + (p3.y - p4.y) * (p3.x - p2.x);
      return ta * tb < 0 && tc * td < 0;
    };

    return rectangle;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.borderView = (function(superClass) {
    extend(borderView, superClass);

    function borderView(borderColor, bgColor) {
      this.dispose2 = bind(this.dispose2, this);
      this.size = bind(this.size, this);
      borderView.__super__.constructor.call(this);
      this._borderColor = borderColor;
      this._bgColor = bgColor;
      this._top;
      this._left;
      this._bottom;
      this._right;
    }

    borderView.prototype.addStage = function() {
      this._top = new root._LIBS.display();
      this.addChild(this._top);
      this._top.bgColor(this._borderColor);
      this._left = new root._LIBS.display();
      this.addChild(this._left);
      this._left.bgColor(this._borderColor);
      this._bottom = new root._LIBS.display();
      this.addChild(this._bottom);
      this._bottom.bgColor(this._borderColor);
      this._right = new root._LIBS.display();
      this.addChild(this._right);
      this._right.bgColor(this._borderColor);
      if (this._bgColor != null) {
        return this.bgColor(this._bgColor);
      }
    };

    borderView.prototype.size = function(w, h, weight) {
      if (h == null) {
        h = w;
      }
      this._size.width = w;
      this._size.height = h;
      this._elm.css({
        width: this._size.width,
        height: this._size.height
      });
      this._top.xy(0, 0);
      this._top.size(this.width(), weight[0]);
      this._left.xy(0, 0);
      this._left.size(weight[3], this.height());
      this._bottom.xy(0, this.height() - weight[2]);
      this._bottom.size(this.width(), weight[2]);
      this._right.xy(this.width() - weight[1], 0);
      return this._right.size(weight[1], this.height());
    };

    borderView.prototype.dispose2 = function() {
      if (this._top != null) {
        this._top.dispose();
        this._top = null;
      }
      if (this._left != null) {
        this._left.dispose();
        this._left = null;
      }
      if (this._bottom != null) {
        this._bottom.dispose();
        this._bottom = null;
      }
      if (this._right != null) {
        this._right.dispose();
        return this._right = null;
      }
    };

    return borderView;

  })(root._LIBS.display);

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.circleView = (function(superClass) {
    extend(circleView, superClass);

    function circleView(color) {
      this.size = bind(this.size, this);
      this.dispose2 = bind(this.dispose2, this);
      circleView.__super__.constructor.call(this);
      this._para = {
        color: color
      };
    }

    circleView.prototype.addStage = function() {
      return this.bgColor(this._para.color);
    };

    circleView.prototype.dispose2 = function() {
      return this._para = null;
    };

    circleView.prototype.size = function(radius) {
      this._para.radius = radius;
      this.elm().css(root.MY.myfw.util.getVendorCss("border-radius", this._para.radius));
      this._size.width = this._para.radius * 2;
      this._size.height = this._para.radius * 2;
      return this._elm.css({
        width: this._size.width,
        height: this._size.height
      });
    };

    return circleView;

  })(root._LIBS.display);

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.roundView = (function(superClass) {
    extend(roundView, superClass);

    function roundView(width, height, color, radius) {
      this.dispose2 = bind(this.dispose2, this);
      roundView.__super__.constructor.call(this);
      this._para = {
        width: width,
        height: height,
        color: color,
        radius: radius
      };
    }

    roundView.prototype.addStage = function() {
      this.size(this._para.width, this._para.height);
      this.bgColor(this._para.color);
      return this.elm().css(root.MY.util.getVendorCss("border-radius", this._para.radius));
    };

    roundView.prototype.dispose2 = function() {
      return this._para = null;
    };

    return roundView;

  })(root._LIBS.display);

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.debugView = (function(superClass) {
    extend(debugView, superClass);

    function debugView(elm, list) {
      this.dispose2 = bind(this.dispose2, this);
      this.set = bind(this.set, this);
      this.get = bind(this.get, this);
      this.val = bind(this.val, this);
      this._eClickToggle = bind(this._eClickToggle, this);
      this._setSliderPos = bind(this._setSliderPos, this);
      this.resize = bind(this.resize, this);
      this._eClickJsonBtn = bind(this._eClickJsonBtn, this);
      this._makeJsonBtn = bind(this._makeJsonBtn, this);
      debugView.__super__.constructor.call(this, elm, {
        resize: true
      });
      this._list = list;
      this._parts = [];
      this._nameList = {};
      this._vBtn;
      this._con;
      this._jsonBtn;
      this.onChange;
    }

    debugView.prototype.addStage = function() {
      var i, l, len1, parts, ref, val;
      this.elm().css({
        position: "fixed",
        zIndex: 9999
      });
      this._con = new root._LIBS.display();
      this.addChild(this._con);
      ref = this._list;
      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
        val = ref[i];
        parts = new root._LIBS.slider(val.min, val.max, val.def, val.name, val.int, val.useStrg);
        this._con.addChild(parts);
        this._parts.push(parts);
        this._nameList[val.name] = parts;
      }
      this._toggle = new root._LIBS.display();
      this.addChild(this._toggle);
      this._toggle.bgColor("#607d8b");
      this._toggle.size(40, 40);
      if (root._LIBS.MYFW.conf.IS_SMT) {
        this._toggle.elm().bind("touchstart", this._eClickToggle);
      } else {
        this._toggle.elm().bind("click", this._eClickToggle);
      }
      this._makeJsonBtn();
      return this._con.visible(false);
    };

    debugView.prototype._makeJsonBtn = function() {
      var btnTxt;
      this._jsonBtn = new root._LIBS.display();
      this._con.addChild(this._jsonBtn);
      this._jsonBtn.size(90, 40);
      this._jsonBtn.bgColor("#000");
      btnTxt = new root._LIBS.display();
      this._jsonBtn.addChild(btnTxt);
      btnTxt.elm().html("JSON");
      btnTxt.elm().css({
        color: "#FFF",
        fontSize: "14px",
        textAlign: "center",
        fontWeight: "bold",
        width: this._jsonBtn.width(),
        lineHeight: this._jsonBtn.height() + "px"
      });
      if (root._LIBS.MYFW.conf.IS_SMT) {
        return this._jsonBtn.elm().bind("touchstart", this._eClickJsonBtn);
      } else {
        return this._jsonBtn.elm().bind("click", this._eClickJsonBtn);
      }
    };

    debugView.prototype._eClickJsonBtn = function() {
      var device, i, l, len1, param, ref, str, val;
      param = {};
      ref = this._parts;
      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
        val = ref[i];
        if (val != null) {
          param[val.name()] = val.val();
        }
      }
      if (typeof JSON !== "undefined" && JSON !== null) {
        str = JSON.stringify(param);
        device = root._LIBS.MYFW.conf.IS_SMT ? "smt" : "pc";
        return location.href = 'mailto:?subject=json&body=' + device + ":" + encodeURI(str);
      }
    };

    debugView.prototype.resize = function(w, h) {
      this._toggle.xy(w - this._toggle.width(), 0);
      this._setSliderPos(w, h);
      return this._jsonBtn.xy(w - this._jsonBtn.width() - 20, h - this._jsonBtn.height() - 20);
    };

    debugView.prototype._setSliderPos = function(w, h) {
      var bh, bw, i, l, len1, offsetY, ref, results, val;
      offsetY = this._toggle.height();
      bw = 0;
      bh = 0;
      ref = this._parts;
      results = [];
      for (i = l = 0, len1 = ref.length; l < len1; i = ++l) {
        val = ref[i];
        if (bw + val.width() >= w) {
          bw = 0;
          bh += val.height() + 20;
        }
        val.xy(bw, offsetY + bh);
        results.push(bw += val.width() + 20);
      }
      return results;
    };

    debugView.prototype._eClickToggle = function() {
      return this._con.visible(!this._con.visible());
    };

    debugView.prototype.val = function(key) {
      return Number(this._parts[key].val());
    };

    debugView.prototype.get = function(name) {
      return Number(this._nameList[name].val());
    };

    debugView.prototype.set = function(name, val) {
      return this._nameList[name].set(val);
    };

    debugView.prototype.dispose2 = function() {};

    return debugView;

  })(root._LIBS.displayContainer);

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.slider = (function(superClass) {
    extend(slider, superClass);

    function slider(min, max, def, name, isInt, isUseStrg) {
      this.dispose2 = bind(this.dispose2, this);
      this.name = bind(this.name, this);
      this.set = bind(this.set, this);
      this.val = bind(this.val, this);
      this.update = bind(this.update, this);
      this.setSlider = bind(this.setSlider, this);
      this._updateNum = bind(this._updateNum, this);
      this._eMouseMove = bind(this._eMouseMove, this);
      this._eMouseUp = bind(this._eMouseUp, this);
      this._eMouseDown = bind(this._eMouseDown, this);
      slider.__super__.constructor.call(this, {
        update: true
      });
      if (isUseStrg && (typeof localStorage !== "undefined" && localStorage !== null) && (localStorage[name] != null)) {
        def = Number(localStorage[name]);
      }
      this._bgElm;
      this._btnElm;
      this._isInt = isInt || false;
      this._btnPara = {
        x: 0,
        offsetX: 0,
        min: 0,
        max: 0
      };
      this._name = name;
      this._nameElm;
      this._numPara = {
        min: min,
        max: max,
        def: def,
        old: def,
        now: def
      };
      this._mouse = {
        x: 0,
        startX: 0,
        isDown: false
      };
      this._isOnSlider = false;
      this._isSmt = navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0;
    }

    slider.prototype.addStage = function() {
      this.unselectable();
      this._nameElm = new root._LIBS.display();
      this.addChild(this._nameElm);
      this._updateNum(this._numPara.def);
      this._nameElm.elm().css({
        fontSize: "12px",
        fontWeight: "bold",
        color: "#FFF",
        backgroundColor: "#000"
      });
      this._bgElm = new root._LIBS.display();
      this.addChild(this._bgElm);
      this._btnElm = new root._LIBS.display();
      this.addChild(this._btnElm);
      if (this._isSmt) {
        this._btnElm.elm().bind("touchstart", this._eMouseDown).bind("touchend", this._eMouseUp).bind("touchmove", this._eMouseMove);
      } else {
        this.elm().bind("mousedown", this._eMouseDown).bind("mouseup", this._eMouseUp).bind("mousemove", this._eMouseMove);
      }
      if (this._isSmt) {
        return this.setSlider(100, 10, root._LIBS.MYFW.conf.DEBUG_MAIN_COLOR1, root._LIBS.MYFW.conf.DEBUG_MAIN_COLOR2);
      } else {
        return this.setSlider(200, 20, root._LIBS.MYFW.conf.DEBUG_MAIN_COLOR1, root._LIBS.MYFW.conf.DEBUG_MAIN_COLOR2);
      }
    };

    slider.prototype._eMouseDown = function(e) {
      var touches;
      if (this._mouse.isDown) {
        return;
      }
      touches = event.touches;
      if ((touches != null) && touches.length > 0) {
        this._mouse.x = this._mouse.startX = touches[0].pageX;
        this._mouse.isDown = true;
        this._btnPara.offsetX = root._LIBS.MYFW.util.floor(this._btnPara.x, this._btnPara.min, this._btnPara.max);
        this._numPara.old = this._numPara.now;
      }
      if (!this._isSmt) {
        this._mouse.x = this._mouse.startX = e.clientX;
        this._mouse.isDown = true;
        this._btnPara.offsetX = root._LIBS.MYFW.util.floor(this._btnPara.x, this._btnPara.min, this._btnPara.max);
        return this._numPara.old = this._numPara.now;
      }
    };

    slider.prototype._eMouseUp = function(e) {
      this._mouse.isDown = false;
      if (this._numPara.old !== this._numPara.now) {
        if (typeof localStorage !== "undefined" && localStorage !== null) {
          return localStorage[this._name] = this.val();
        }
      }
    };

    slider.prototype._eMouseMove = function(e) {
      var touches;
      if (this._mouse.isDown) {
        touches = event.touches;
        if ((touches != null) && touches.length > 0) {
          return this._mouse.x = touches[0].pageX;
        } else {
          return this._mouse.x = e.clientX;
        }
      }
    };

    slider.prototype._updateNum = function(num) {
      return this._nameElm.text(this._name + "::" + String(~~(num * 1000) / 1000));
    };

    slider.prototype.setSlider = function(width, height, bgColor, btnColor) {
      this._isOnSlider = true;
      this._bgElm.size(width, height);
      this._bgElm.bgColor(bgColor);
      this._btnElm.size(height, height);
      this._btnElm.bgColor(btnColor);
      this._nameElm.width(width);
      this._bgElm.xy(0, this._nameElm.height() + 3);
      this._btnElm.y(this._bgElm.y());
      this._btnPara.min = 0;
      this._btnPara.max = width - height;
      this._btnPara.x = root._LIBS.MYFW.util.map(this._numPara.def, this._btnPara.min, this._btnPara.max, this._numPara.min, this._numPara.max);
      this._btnElm.x(this._btnPara.x);
      return this.size(width, height + this._btnElm.height());
    };

    slider.prototype.update = function() {
      var num, u;
      u = root._LIBS.MYFW.util;
      if (this._mouse.isDown) {
        this._btnPara.x = this._btnPara.offsetX - (this._mouse.startX - this._mouse.x);
        this._btnPara.x = root._LIBS.MYFW.util.floor(this._btnPara.x, this._btnPara.min, this._btnPara.max);
        this._btnElm.x(this._btnPara.x);
        num = u.map(this._btnPara.x, this._numPara.min, this._numPara.max, this._btnPara.min, this._btnPara.max);
        if (this._isInt) {
          this._numPara.now = ~~num;
        } else {
          this._numPara.now = num;
        }
        return this._updateNum(this._numPara.now);
      }
    };

    slider.prototype.val = function() {
      return this._numPara.now;
    };

    slider.prototype.set = function(val) {
      var u;
      u = root._LIBS.MYFW.util;
      this._numPara.now = u.floor(val, this._numPara.min, this._numPara.max);
      this._updateNum(this._numPara.now);
      this._btnPara.x = u.map(this._numPara.now, this._btnPara.min, this._btnPara.max, this._numPara.min, this._numPara.max);
      return this._btnElm.x(this._btnPara.x);
    };

    slider.prototype.name = function() {
      return this._name;
    };

    slider.prototype.dispose2 = function() {};

    return slider;

  })(root._LIBS.display);

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.toggle = (function(superClass) {
    extend(toggle, superClass);

    function toggle(def, name) {
      this.dispose2 = bind(this.dispose2, this);
      this.val = bind(this.val, this);
      this._updateVal = bind(this._updateVal, this);
      this._eClick = bind(this._eClick, this);
      toggle.__super__.constructor.call(this);
      this._val = def;
      this._checkBox;
      this._checkBoxMark;
      this._btnArea;
      this._name = name;
      this._toggleName;
      this.onChange;
    }

    toggle.prototype.addStage = function() {
      this._toggleName = new root._LIBS.display();
      this.addChild(this._toggleName);
      this._updateVal();
      this._toggleName.elm().css({
        fontSize: "80%",
        fontWeight: "bold",
        width: this.pixel2(200)
      });
      this._checkBox = new root._LIBS.display();
      this.addChild(this._checkBox);
      this._checkBox.size(this.pixel2(40), this.pixel2(40));
      this._checkBox.bgColor(root._LIBS.MYFW.conf.DEBUG_MAIN_COLOR2);
      this._checkBox.y(this._toggleName.height() + 10);
      this._checkBoxMark = new root._LIBS.display();
      this.addChild(this._checkBoxMark);
      this._checkBoxMark.size(this.pixel2(20), this.pixel2(20));
      this._checkBoxMark.bgColor("#ff0000");
      this._checkBoxMark.xy(this._checkBox.width() * 0.5 - this._checkBoxMark.width() * 0.5, this._checkBox.y() + this._checkBox.height() * 0.5 - this._checkBoxMark.height() * 0.5);
      if (!this._val) {
        this._checkBoxMark.alpha(0);
      }
      this._btnArea = new root._LIBS.btnAreaView();
      this.addChild(this._btnArea);
      this._btnArea.size(this._checkBox.width(), this._checkBox.height());
      this._btnArea.onClick = this._eClick;
      return this._btnArea.xy(this._checkBox.x(), this._checkBox.y());
    };

    toggle.prototype._eClick = function(e) {
      this._val = !this._val;
      this._updateVal();
      if (this.onChange != null) {
        return this.onChange();
      }
    };

    toggle.prototype._updateVal = function() {
      this._toggleName.text(this._name + "::" + this._val);
      if (this._checkBoxMark != null) {
        return this._checkBoxMark.alpha(this._val ? 1 : 0);
      }
    };

    toggle.prototype.val = function() {
      if (this._val) {
        return 1;
      } else {
        return 0;
      }
    };

    toggle.prototype.dispose2 = function() {};

    return toggle;

  })(root._LIBS.display);

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.btnAreaView = (function(superClass) {
    extend(btnAreaView, superClass);

    function btnAreaView(param) {
      this._setMouseData = bind(this._setMouseData, this);
      this._eMouseMove = bind(this._eMouseMove, this);
      this._eClick = bind(this._eClick, this);
      this._eRollOut = bind(this._eRollOut, this);
      this._eRollOver = bind(this._eRollOver, this);
      this.watchMove = bind(this.watchMove, this);
      this.check = bind(this.check, this);
      this.dispose2 = bind(this.dispose2, this);
      btnAreaView.__super__.constructor.call(this);
      if (param == null) {
        param = {};
      }
      this._param = param;
      this.onClick;
      this.onRollOver;
      this.onRollOut;
      this.onMouseMove;
    }

    btnAreaView.prototype.addStage = function() {
      this.bgColor("#FF0000");
      this.alpha(0);
      if (root._LIBS.MYFW.conf.IS_SMT) {
        return this.elm().bind("click", this._eClick);
      } else {
        return this.elm().bind("mouseover", this._eRollOver).bind("mouseout", this._eRollOut).bind("click", this._eClick);
      }
    };

    btnAreaView.prototype.dispose2 = function() {
      this._param = null;
      this.onClick = null;
      this.onRollOver = null;
      return this.onRollOut = null;
    };

    btnAreaView.prototype.check = function() {
      return this.alpha(0.5);
    };

    btnAreaView.prototype.watchMove = function() {
      return this.elm().bind("mousemove", this._eMouseMove);
    };

    btnAreaView.prototype._eRollOver = function(e) {
      this._setMouseData(e);
      root._LIBS.MYFW.util.buttonMode(true);
      if (this.onRollOver != null) {
        return this.onRollOver(this._param);
      }
    };

    btnAreaView.prototype._eRollOut = function(e) {
      this._setMouseData(e);
      root._LIBS.MYFW.util.buttonMode(false);
      if (this.onRollOut != null) {
        return this.onRollOut(this._param);
      }
    };

    btnAreaView.prototype._eClick = function(e) {
      this._setMouseData(e);
      if (this.onClick != null) {
        return this.onClick(this._param);
      }
    };

    btnAreaView.prototype._eMouseMove = function(e) {
      this._setMouseData(e);
      if (this.onMouseMove != null) {
        return this.onMouseMove(this._param);
      }
    };

    btnAreaView.prototype._setMouseData = function(e) {
      var offset;
      if ((e.offsetX != null) && (e.offsetY != null)) {
        this._param.offsetX = e.offsetX;
        this._param.offsetY = e.offsetY;
      } else {
        offset = this.elm().offset();
        this._param.offsetX = e.pageX - offset.left;
        this._param.offsetY = e.pageY - offset.top;
      }
      this._param.pageX = e.pageX;
      return this._param.pageY = e.pageY;
    };

    return btnAreaView;

  })(root._LIBS.display);

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.dragScrollMgr = (function() {
    function dragScrollMgr(tgView, param) {
      this.ease = bind(this.ease, this);
      this._setPos = bind(this._setPos, this);
      this._eMouseMove = bind(this._eMouseMove, this);
      this._eMouseUp = bind(this._eMouseUp, this);
      this._eMouseDown = bind(this._eMouseDown, this);
      this.setTgSize = bind(this.setTgSize, this);
      this._update = bind(this._update, this);
      this.dispose = bind(this.dispose, this);
      this.diff = bind(this.diff, this);
      this.scrollRate = bind(this.scrollRate, this);
      this._init = bind(this._init, this);
      this._tgView = tgView;
      this._param = param;
      this._scroll = {
        isDown: false,
        tgY: 0,
        oldY: 0,
        y: 0,
        startY: 0,
        x: 0,
        startX: 0,
        fSpd: 0,
        fSpdEase: {
          cnt: 0,
          t: 0,
          b: 0,
          c: 0,
          d: 1
        },
        target: {
          y: 0,
          oldY: 0,
          minY: 0,
          maxY: 0,
          startY: 0,
          height: 0,
          width: 0
        }
      };
      this._init();
    }

    dragScrollMgr.prototype._init = function() {
      root._LIBS.MYFW.main.addUpdate(this._update);
      if (root._LIBS.MYFW.conf.IS_SMT) {
        return this._tgView.elm().bind("touchstart", this._eMouseDown).bind("touchend", this._eMouseUp).bind("touchmove", this._eMouseMove);
      } else {
        this._tgView.elm().bind("mousedown", this._eMouseDown).bind("mouseup", this._eMouseUp).bind("mousemove", this._eMouseMove).bind("mouseover", this._eMouseOver).bind("mouseout", this._eMouseOut);
        return $("body").bind("mouseup", this._eMouseUp);
      }
    };

    dragScrollMgr.prototype.scrollRate = function() {
      return root._LIBS.MYFW.util.map(this._scroll.target.y, 1, 0, this._scroll.target.minY, this._scroll.target.maxY);
    };

    dragScrollMgr.prototype.diff = function() {
      if (this._scroll.isDown) {
        return [this._scroll.x - this._scroll.startX, this._scroll.y - this._scroll.startY];
      } else {
        return [0, 0];
      }
    };

    dragScrollMgr.prototype.dispose = function() {
      root._LIBS.MYFW.main.delUpdate(this._update);
      return this._tgView = null;
    };

    dragScrollMgr.prototype._update = function() {
      var tgY, u, v1, v2;
      u = root._LIBS.MYFW.util;
      if (!this._scroll.isDown) {
        this._scroll.fSpd = this.ease(this._scroll.fSpdEase.t, this._scroll.fSpdEase.b, this._scroll.fSpdEase.c, this._scroll.fSpdEase.d);
        this._scroll.fSpdEase.cnt++;
        this._scroll.fSpdEase.t = u.map(this._scroll.fSpdEase.cnt, 0, this._scroll.fSpdEase.d, 0, root._LIBS.MYFW.conf.FPS * this._scroll.fSpdEase.d);
        this._scroll.target.y += this._scroll.fSpd;
      } else {
        tgY = this._scroll.target.startY + (this._scroll.y - this._scroll.startY);
        this._scroll.target.y += (tgY - this._scroll.target.y) * 0.6;
      }
      v1 = this._scroll.target.y;
      v2 = u.floor(this._scroll.target.y, this._scroll.target.minY, this._scroll.target.maxY);
      this._scroll.target.y = v2 + (v1 - v2) * 0.8;
      return this._setPos(0, this._scroll.target.y);
    };

    dragScrollMgr.prototype.setTgSize = function(tgW, tgH, conW, conH) {
      this._scroll.target.maxY = 0;
      this._scroll.target.width = tgW;
      this._scroll.target.height = tgH;
      return this._scroll.target.minY = -this._scroll.target.height + conH;
    };

    dragScrollMgr.prototype._eMouseDown = function(e) {
      var initX, initY, touches;
      if (this._scroll.isDown) {
        return;
      }
      this._scroll.isDown = true;
      this._scroll.target.startY = this._scroll.target.y;
      this._scroll.fSpd = 0;
      initX = 0;
      initY = 0;
      if (root._LIBS.MYFW.conf.IS_SMT) {
        touches = event.touches;
        if ((touches != null) && touches.length > 0) {
          initX = touches[0].pageX;
          initY = touches[0].pageY;
        }
      } else {
        initX = e.clientX;
        initY = e.clientY;
      }
      this._scroll.startX = this._scroll.x = initX;
      return this._scroll.startY = this._scroll.y = this._scroll.tgY = this._scroll.oldY = initY;
    };

    dragScrollMgr.prototype._eMouseUp = function(e) {
      var dY, p, p2, tgY;
      if (!this._scroll.isDown) {
        return;
      }
      this._scroll.isDown = false;
      tgY = this._scroll.y;
      p = 2;
      p2 = 80;
      dY = tgY - this._scroll.oldY;
      if (Math.abs(dY) > 10) {
        this._scroll.fSpd = dY / p;
      } else {
        this._scroll.fSpd = 0;
      }
      this._scroll.fSpd = dY / p;
      if (this._scroll.target.y < this._scroll.target.minY || this._scroll.target.y > this._scroll.target.maxY) {
        this._scroll.fSpd = 0;
      }
      this._scroll.fSpdEase.t = 0;
      this._scroll.fSpdEase.b = this._scroll.fSpd;
      this._scroll.fSpdEase.c = 0 - this._scroll.fSpd;
      this._scroll.fSpdEase.d = 1 + ~~Math.abs(dY / p2);
      return this._scroll.fSpdEase.cnt = 0;
    };

    dragScrollMgr.prototype._eMouseMove = function(e) {
      var touches;
      if (this._scroll.isDown) {
        this._scroll.oldY = this._scroll.y;
        if (root._LIBS.MYFW.conf.IS_SMT) {
          touches = event.touches;
          event.preventDefault();
          if ((touches != null) && touches.length > 0) {
            this._scroll.x = touches[0].pageX;
            return this._scroll.y = touches[0].pageY;
          }
        } else {
          this._scroll.x = e.clientX;
          return this._scroll.y = e.clientY;
        }
      }
    };

    dragScrollMgr.prototype._setPos = function(x, y) {
      if (this._scroll.target.oldY !== y) {
        this._tgView.translate(x, y);
        this._tgView.setTransform();
      }
      return this._scroll.target.oldY = y;
    };

    dragScrollMgr.prototype.ease = function(t, b, c, d) {
      t /= d;
      return -c * t * (t - 2.0) + b;
    };

    return dragScrollMgr;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.fontLoader = (function() {
    function fontLoader(test, font) {
      this._update = bind(this._update, this);
      this.dispose = bind(this.dispose, this);
      this.start = bind(this.start, this);
      this._test = test;
      this._font = font;
      this._dom;
      this._timerId;
      this._isLoadedTest = false;
      this.onComplete;
    }

    fontLoader.prototype.start = function() {
      this._dom = document.createElement('p');
      this._dom.style.fontFamily = this._test;
      this._dom.style.position = 'absolute';
      this._dom.style.top = '-20px';
      this._dom.appendChild(document.createTextNode("abcd"));
      document.body.appendChild(this._dom);
      return this._timerId = setInterval(this._update, 20);
    };

    fontLoader.prototype.dispose = function() {
      if (this._timerId != null) {
        clearInterval(this._timerId);
        this._timerId = null;
      }
      if (this._dom != null) {
        this._dom.parentNode.removeChild(this._dom);
        this._dom = null;
      }
      return this.onComplete = null;
    };

    fontLoader.prototype._update = function() {
      if (!this._isLoadedTest) {
        if (this._dom.offsetWidth === 0) {
          this._isLoadedTest = true;
          return this._dom.style.fontFamily = this._font + "," + this._test;
        }
      } else {
        if (this._dom.offsetWidth > 0) {
          clearInterval(this._timerId);
          this._timerId = null;
          if (this.onComplete != null) {
            return this.onComplete();
          }
        }
      }
    };

    return fontLoader;

  })();

  root = this;

  if (root._LIBS == null) {
    root._LIBS = {};
  }

  root._LIBS.utils = (function() {
    function utils() {
      this.price = bind(this.price, this);
      this.getHexColor = bind(this.getHexColor, this);
      this.scrollTop = bind(this.scrollTop, this);
      this.windowHeight = bind(this.windowHeight, this);
      this.numStr = bind(this.numStr, this);
      this._A = Math.PI / 180;
    }

    utils.prototype.random = function(min, max) {
      if (min < 0) {
        min--;
      }
      return ~~(Math.random() * ((max + 1) - min) + min);
    };

    utils.prototype.hit = function(range) {
      return this.random(0, range - 1) === 0;
    };

    utils.prototype.range = function(val) {
      return this.random(-val, val);
    };

    utils.prototype.arrRand = function(arr) {
      return arr[this.random(0, arr.length - 1)];
    };

    utils.prototype.map = function(num, resMin, resMax, baseMin, baseMax) {
      var p;
      if (num < baseMin) {
        return resMin;
      }
      if (num > baseMax) {
        return resMax;
      }
      p = (resMax - resMin) / (baseMax - baseMin);
      return ((num - baseMin) * p) + resMin;
    };

    utils.prototype.radian = function(degree) {
      return degree * this._A;
    };

    utils.prototype.degree = function(radian) {
      return radian / this._A;
    };

    utils.prototype.decimal = function(num, n) {
      var i, pos;
      num = String(num);
      pos = num.indexOf(".");
      if (n === 0) {
        return num.split(".")[0];
      }
      if (pos === -1) {
        num += ".";
        i = 0;
        while (i < n) {
          num += "0";
          i++;
        }
        return num;
      }
      num = num.substr(0, pos) + num.substr(pos, n + 1);
      return num;
    };

    utils.prototype.floor = function(num, min, max) {
      return Math.min(max, Math.max(num, min));
    };

    utils.prototype.strReverse = function(str) {
      var i, len, res;
      res = "";
      len = str.length;
      i = 1;
      while (i <= len) {
        res += str.substr(-i, 1);
        i++;
      }
      return res;
    };

    utils.prototype.shuffle = function(arr) {
      var i, j, k, results;
      i = arr.length;
      results = [];
      while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        if (i === j) {
          continue;
        }
        k = arr[i];
        arr[i] = arr[j];
        results.push(arr[j] = k);
      }
      return results;
    };

    utils.prototype.sliceNull = function(arr) {
      var i, l, len1, newArr, val;
      newArr = [];
      for (i = l = 0, len1 = arr.length; l < len1; i = ++l) {
        val = arr[i];
        if (val !== null) {
          newArr.push(val);
        }
      }
      return newArr;
    };

    utils.prototype.replaceAll = function(val, org, dest) {
      return val.split(org).join(dest);
    };

    utils.prototype.sort = function(arr, para, desc) {
      if (desc === void 0) {
        desc = false;
      }
      if (desc) {
        return arr.sort(function(a, b) {
          return b[para] - a[para];
        });
      } else {
        return arr.sort(function(a, b) {
          return a[para] - b[para];
        });
      }
    };

    utils.prototype.addUnique = function(file) {
      return file + "?date=" + new Date().getTime();
    };

    utils.prototype.getRandomColor = function() {
      var color, count;
      color = Math.floor(Math.random() * 0xFFFFFF).toString(16);
      count = color.length;
      while (count < 6) {
        color = "0" + color;
        count++;
      }
      color = "#" + color;
      return color;
    };

    utils.prototype.numStr = function(num, keta) {
      var i, len, str;
      str = String(num);
      if (str.length >= keta) {
        return str;
      }
      len = keta - str.length;
      i = 0;
      while (i < len) {
        str = "0" + str;
        i++;
      }
      return str;
    };

    utils.prototype.stop = function(con) {
      var i, len, results;
      if (con.length === 0) {
        return;
      }
      i = 0;
      len = con.queue().length;
      results = [];
      while (i < len) {
        con.stop();
        results.push(i++);
      }
      return results;
    };

    utils.prototype.buttonMode = function(flg) {
      if (flg) {
        return $("body").css("cursor", "pointer");
      } else {
        return $("body").css("cursor", "default");
      }
    };

    utils.prototype.getQuery = function(key) {
      var qs, regex;
      key = key.replace(/[€[]/, "€€€[").replace(/[€]]/, "€€€]");
      regex = new RegExp("[€€?&]" + key + "=([^&#]*)");
      qs = regex.exec(window.location.href);
      if (qs === null) {
        return "";
      } else {
        return qs[1];
      }
    };

    utils.prototype.hash = function() {
      return location.hash.replace("#", "");
    };

    utils.prototype.isSmt = function() {
      return navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0;
    };

    utils.prototype.isAndroid = function() {
      var u;
      u = navigator.userAgent;
      return u.indexOf('BlackBerry') > 0 || u.indexOf('Android') > 0 || u.indexOf('Windows Phone') > 0;
    };

    utils.prototype.isIos = function() {
      return navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0;
    };

    utils.prototype.isPs3 = function() {
      var u;
      u = navigator.userAgent;
      return u.indexOf('PLAYSTATION 3') > 0;
    };

    utils.prototype.isVita = function() {
      var u;
      u = navigator.userAgent;
      return u.indexOf('PlayStation Vita') > 0;
    };

    utils.prototype.isIe8Under = function() {
      var msie;
      msie = navigator.appVersion.toLowerCase();
      msie = msie.indexOf('msie') > -1 ? parseInt(msie.replace(/.*msie[ ]/, '').match(/^[0-9]+/)) : 0;
      return msie <= 8 && msie !== 0;
    };

    utils.prototype.isIe9Under = function() {
      var msie;
      msie = navigator.appVersion.toLowerCase();
      msie = msie.indexOf('msie') > -1 ? parseInt(msie.replace(/.*msie[ ]/, '').match(/^[0-9]+/)) : 0;
      return msie <= 9 && msie !== 0;
    };

    utils.prototype.isIe = function() {
      var ua;
      ua = window.navigator.userAgent.toLowerCase();
      return ua.indexOf('msie') !== -1 || ua.indexOf('trident/7') !== -1;
    };

    utils.prototype.isIpad = function() {
      return navigator.userAgent.indexOf('iPad') > 0;
    };

    utils.prototype.isTablet = function() {
      return this.isIpad() || (this.isAndroid() && navigator.userAgent.indexOf('Mobile') === -1);
    };

    utils.prototype.isWin = function() {
      return navigator.platform.indexOf("Win") !== -1;
    };

    utils.prototype.isChrome = function() {
      return navigator.userAgent.indexOf('Chrome') > 0;
    };

    utils.prototype.isFF = function() {
      return window.navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
    };

    utils.prototype.isIOSUiView = function() {
      var a;
      a = window.navigator.userAgent.toLowerCase();
      return this.isIos() && a.indexOf('safari') === -1;
    };

    utils.prototype.getCookie = function(key) {
      var a, arr, i, l, len1, val;
      if (document.cookie === void 0 || document.cookie === null) {
        return null;
      }
      arr = document.cookie.split("; ");
      for (i = l = 0, len1 = arr.length; l < len1; i = ++l) {
        val = arr[i];
        a = val.split("=");
        if (a[0] === key) {
          return a[1];
        }
      }
      return null;
    };

    utils.prototype.setCookie = function(key, val) {
      return document.cookie = key + "=" + val;
    };

    utils.prototype.useFixed = function() {
      var container, el, elementTop, isSupported, originalHeight, originalScrollTop;
      container = document.body;
      if (document.createElement && container && container.appendChild && container.removeChild) {
        el = document.createElement('div');
        if (!el.getBoundingClientRect) {
          return null;
        }
        el.innerHTML = 'x';
        el.style.cssText = 'position:fixed;top:100px;';
        container.appendChild(el);
        originalHeight = container.style.height;
        originalScrollTop = container.scrollTop;
        container.style.height = '3000px';
        container.scrollTop = 500;
        elementTop = el.getBoundingClientRect().top;
        container.style.height = originalHeight;
        isSupported = elementTop === 100;
        container.removeChild(el);
        container.scrollTop = originalScrollTop;
        return isSupported;
      }
      return false;
    };

    utils.prototype.tag = function(tag, para, close) {
      var i, l, len1, res, val;
      if (para === void 0) {
        para = [];
      }
      if (close === void 0) {
        close = true;
      }
      res = "<" + tag;
      for (i = l = 0, len1 = para.length; l < len1; i = ++l) {
        val = para[i];
        res += " " + val.name + "=" + val.val;
      }
      res += ">";
      if (close) {
        res += "</" + tag + ">";
      }
      return res;
    };

    utils.prototype.translate = function(x, y) {
      if (x === void 0) {
        x = 0;
      }
      if (y === void 0) {
        y = 0;
      }
      return 'translate(' + x + 'px,' + y + 'px)';
    };

    utils.prototype.translateX = function(x) {
      if (x === void 0) {
        x = 0;
      }
      return 'translateX(' + x + 'px)';
    };

    utils.prototype.translateY = function(y) {
      if (y === void 0) {
        y = 0;
      }
      return 'translateY(' + y + 'px)';
    };

    utils.prototype.translate3d = function(x, y, z, use3d) {
      if (x === void 0) {
        x = 0;
      }
      if (y === void 0) {
        y = 0;
      }
      if (z === void 0) {
        z = 0;
      }
      if (use3d === void 0) {
        use3d = true;
      }
      if (use3d) {
        return 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
      } else {
        return 'translate(' + x + 'px,' + y + 'px)';
      }
    };

    utils.prototype.rotate = function(val) {
      if (val === void 0) {
        val = 0;
      }
      return 'rotate(' + val + 'deg)';
    };

    utils.prototype.rotateX = function(val) {
      if (val === void 0) {
        val = 0;
      }
      return 'rotateX(' + val + 'deg)';
    };

    utils.prototype.rotateY = function(val) {
      if (val === void 0) {
        val = 0;
      }
      return 'rotateY(' + val + 'deg)';
    };

    utils.prototype.rotateZ = function(val) {
      if (val === void 0) {
        val = 0;
      }
      return 'rotateZ(' + val + 'deg)';
    };

    utils.prototype.scale3d = function(x, y, z) {
      if (x === void 0) {
        x = 1;
      }
      if (y === void 0) {
        y = 1;
      }
      if (z === void 0) {
        z = 1;
      }
      return 'scale3d(' + x + ',' + y + ',' + z + ')';
    };

    utils.prototype.scaleX = function(x) {
      if (x === void 0) {
        x = 1;
      }
      return 'scaleX(' + x + ')';
    };

    utils.prototype.scaleY = function(y) {
      if (y === void 0) {
        y = 1;
      }
      return 'scaleY(' + y + ')';
    };

    utils.prototype.skew = function(val) {
      if (val === void 0) {
        val = 0;
      }
      return 'skew(' + val + 'deg)';
    };

    utils.prototype.getVendorCss = function(prop, val) {
      var res;
      res = {};
      res["-webkit-" + prop] = val;
      res["-o-" + prop] = val;
      res["-khtml-" + prop] = val;
      res["-ms-" + prop] = val;
      res[prop] = val;
      return res;
    };

    utils.prototype.addDiv = function(parent, id, x, y) {
      parent.append(this.tag("div", [
        {
          name: "id",
          val: id
        }
      ]));
      if (x !== void 0 && y !== void 0) {
        return $("#" + id).css({
          position: "absolute",
          top: y,
          left: x
        });
      } else {
        return $("#" + id);
      }
    };

    utils.prototype.addCanvas = function(parent, id, width, height, x, y) {
      parent.append(this.tag("canvas", [
        {
          name: "id",
          val: id
        }, {
          name: "width",
          val: width
        }, {
          name: "height",
          val: height
        }
      ]));
      if (x !== void 0 && y !== void 0) {
        return $("#" + id).css({
          position: "absolute",
          top: y,
          left: x
        });
      } else {
        return $("#" + id);
      }
    };

    utils.prototype.addImg = function(parent, id, src, width, height) {
      parent.append(this.tag("img", [
        {
          name: "id",
          val: id
        }, {
          name: "src",
          val: src
        }, {
          name: "width",
          val: width
        }, {
          name: "height",
          val: height
        }
      ]), false);
      return $("#" + id);
    };

    utils.prototype.windowHeight = function() {
      return $(document).height();
    };

    utils.prototype.scrollTop = function() {
      return Math.max($(window).scrollTop(), $(document).scrollTop());
    };

    utils.prototype.getHexColor = function(r, g, b) {
      var str;
      str = (r << 16 | g << 8 | b).toString(16);
      return "#" + new Array(7 - str.length).join("0") + str;
    };

    utils.prototype.price = function(num) {
      return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    };

    return utils;

  })();

}).call(this);
