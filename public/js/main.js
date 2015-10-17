(function() {
	var root,
		bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
		extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
		hasProp = {}.hasOwnProperty,
		slice = [].slice;

	if (typeof root === "undefined" || root === null) {
		root = this;
		root.MY = {};
		root.MY_CLASS = {};
	}

	root.MY_CLASS.clearTextView = (function(superClass) {
		extend(clearTextView, superClass);

		function clearTextView(option) {
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.setBgColor = bind(this.setBgColor, this);
			this.dispose2 = bind(this.dispose2, this);
			this.resize = bind(this.resize, this);
			this._updateHide = bind(this._updateHide, this);
			this._updateShow = bind(this._updateShow, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			clearTextView.__super__.constructor.call(this, {
				resize: true,
				update: true
			});
			this._option = option;
			this._bg;
			this._anm = {};
			this._status = 0;
			this._conf = root.MY.app.conf;
		}

		clearTextView.prototype.addStage = function() {
			this._bg = new root._LIBS.display();
			this.addChild(this._bg);
			this._bg.elm().css({
				"border-radius": "8px"
			});
			this._bg.bgColor(this._option.bgColor);
			this._bg.alpha(0.8);
			if (this._isSmt) {
				this._bg.size(670 / 2, 270 / 2);
			} else {
				this._bg.size(670, 270);
			}
			this.set3d(this._bg.width() * 0.5, this._bg.height() * 0.5);
			this._anm.show = new root._LIBS.animation();
			this._anm.hide = new root._LIBS.animation();
			return this.visible(false);
		};

		clearTextView.prototype.update = function() {
			this._updateShow();
			return this._updateHide();
		};

		clearTextView.prototype._updateShow = function() {
			var s;
			if (this._status === 1 && !this._anm.show.isCompleted()) {
				s = this._anm.show.get("scale");
				this.scale(s, s);
				this.setTransform();
				this.alpha(this._anm.show.get("opacity"));
				if (this._anm.show.isCompleted()) {
					return this._status = 2;
				}
			}
		};

		clearTextView.prototype._updateHide = function() {
			var s;
			if (this._status === 3 && !this._anm.hide.isCompleted()) {
				s = this._anm.hide.get("scale");
				this.scale(s, s);
				this.setTransform();
				this.alpha(this._anm.hide.get("opacity"));
				if (this._anm.hide.isCompleted()) {
					this.visible(false);
					return this._status = 4;
				}
			}
		};

		clearTextView.prototype.resize = function(w, h) {
			if (this._isSmt) {
				return this.xy(~~(w * 0.5 - this._bg.width() * 0.5), ~~(h * 0.45 - this._bg.height() * 0.5));
			} else {
				return this.xy(~~(w * 0.5 - this._bg.width() * 0.5), ~~(h * 0.5 - this._bg.height() * 0.5));
			}
		};

		clearTextView.prototype.dispose2 = function() {};

		clearTextView.prototype.setBgColor = function(color) {
			this._option.bgColor = color;
			return this._bg.bgColor(this._option.bgColor);
		};

		clearTextView.prototype.show = function(delay) {
			if (this._status === 1) {
				return;
			}
			this._status = 1;
			this.visible(true);
			this._anm.hide.reset();
			if (this._isSmt) {
				this._anm.show.set({
					scale: {
						from: 0.25,
						to: 1
					},
					opacity: {
						from: 1,
						to: 1
					},
					frame: 60,
					delay: delay || 0,
					ease: "easeOutExpo"
				});
			} else {
				this._anm.show.set({
					scale: {
						from: 0.25,
						to: 1
					},
					opacity: {
						from: 0,
						to: 1
					},
					frame: 80,
					delay: delay || 0,
					ease: "easeInOutExpo"
				});
			}
			this._anm.show.start();
			return this.update();
		};

		clearTextView.prototype.hide = function(delay) {
			if (this._status === 3) {
				return;
			}
			this._status = 3;
			if (this._isSmt) {
				this.visible(false);
				this._status = 4;
				return this._anm.show.reset();
			} else {
				this.visible(true);
				this._anm.show.reset();
				this._anm.hide.set({
					scale: {
						from: 1,
						to: 1.75
					},
					opacity: {
						from: 1,
						to: 0
					},
					frame: 80,
					delay: delay || 0,
					ease: "easeInOutExpo"
				});
				this._anm.hide.start();
				return this.update();
			}
		};

		return clearTextView;

	})(root._LIBS.display);

	if (root == null) {
		root = this;
		root.MY = {};
		root.MY_CLASS = {};
	}

	root.MY_CLASS.main = (function() {
		function main() {
			this.log = bind(this.log, this);
			this.contents = bind(this.contents, this);
			this.start = bind(this.start, this);
			this._myfw;
			this.conf;
			this._contents;
		}

		main.prototype.start = function() {
			this._myfw = new root._LIBS.myfw({
				fps: 60
			});
			root.MY.myfw = this._myfw;
			this.conf = new root.MY_CLASS.conf();
			if (this.conf.TEST.STATS) {
				this._myfw.setStats();
			}
			root.MY.gl = {};
			this._contents = new root.MY_CLASS.contents();
			return this._contents.start();
		};

		main.prototype.contents = function() {
			return this._contents;
		};

		main.prototype.log = function() {
			var params;
			params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
			if (root.MY.app.conf.LOG) {
				if ((typeof console !== "undefined" && console !== null) && (console.log != null)) {
					return console.log.apply(console, params);
				}
			}
		};

		return main;

	})();

	$(window).ready((function(_this) {
		return function() {
			root.MY.app = new root.MY_CLASS.main();
			return root.MY.app.start();
		};
	})(this));

	if (root == null) {
		root = this;
		root.MY = {};
		root.MY_CLASS = {};
	}

	root.MY_CLASS.myObject3D = (function() {
		function myObject3D(option) {
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.depthFromBBox = bind(this.depthFromBBox, this);
			this.heightFromBBox = bind(this.heightFromBBox, this);
			this.widthFromBBox = bind(this.widthFromBBox, this);
			this.container = bind(this.container, this);
			this.reset = bind(this.reset, this);
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			this._option = option || {};
			this._scene;
			this._camera;
			this._parameter;
			this._interaction;
			this._audio;
			this._container;
			this._u = root.MY.myfw.util;
			this._isSmt = root.MY.myfw.conf.IS_SMT;
			this._device = this._isSmt ? 1 : 0;
			this._conf = root.MY.app.conf;
			this._cnt = 0;
		}

		myObject3D.prototype.start = function() {
			this._option.addScene = this._option.addScene || true;
			this._scene = root.MY.gl.scene;
			this._camera = root.MY.gl.camera;
			this._parameter = root.MY.gl.parameter;
			this._interaction = root.MY.gl.interaction;
			this._audio = root.MY.gl.audio;
			this._data = root.MY.gl.data;
			this._game = root.MY.gl.game;
			this._container = new THREE.Object3D();
			if (this._option.addScene) {
				this._scene.add(this._container);
				this._container.visible = false;
			}
			return root.MY.myfw.addUpdate(this.update);
		};

		myObject3D.prototype.update = function() {};

		myObject3D.prototype.dispose = function() {
			root.MY.myfw.delUpdate(this.update);
			if ((this._container != null) && this._option.addScene) {
				this._scene.remove(this._container);
				this._container = null;
			}
			this._scene = null;
			this._camera = null;
			this._parameter = null;
			this._interaction = null;
			this._game = null;
			this._data = null;
			this._audio = null;
			this._u = null;
			this._conf = null;
			return this._option = null;
		};

		myObject3D.prototype.reset = function() {};

		myObject3D.prototype.container = function() {
			return this._container;
		};

		myObject3D.prototype.widthFromBBox = function(b) {
			return b.max.x - b.min.x;
		};

		myObject3D.prototype.heightFromBBox = function(b) {
			return b.max.y - b.min.y;
		};

		myObject3D.prototype.depthFromBBox = function(b) {
			return b.max.z - b.min.z;
		};

		myObject3D.prototype.show = function() {
			this._container.visible = true;
			return this.update();
		};

		myObject3D.prototype.hide = function() {
			return this._container.visible = false;
		};

		return myObject3D;

	})();

	if (root == null) {
		root = this;
		root.MY = {};
		root.MY_CLASS = {};
	}

	root.MY_CLASS.myView = (function() {
		function myView() {
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			this._scene;
			this._camera;
			this._parameter;
			this._interaction;
			this._audio;
			this._u = root.MY.myfw.util;
			this._isSmt = root.MY.myfw.conf.IS_SMT;
			this._device = this._isSmt ? 1 : 0;
			this._conf = root.MY.app.conf;
		}

		myView.prototype.start = function() {
			this._scene = root.MY.gl.scene;
			this._camera = root.MY.gl.camera;
			this._parameter = root.MY.gl.parameter;
			this._interaction = root.MY.gl.interaction;
			this._audio = root.MY.gl.audio;
			this._data = root.MY.gl.data;
			this._game = root.MY.gl.game;
			return root.MY.myfw.addUpdate(this.update);
		};

		myView.prototype.update = function() {};

		myView.prototype.dispose = function() {
			root.MY.myfw.delUpdate(this.update);
			this._scene = null;
			this._camera = null;
			this._parameter = null;
			this._interaction = null;
			this._game = null;
			this._data = null;
			this._audio = null;
			this._u = null;
			return this._conf = null;
		};

		return myView;

	})();

	if (root == null) {
		root = this;
		root.MY = {};
		root.MY_CLASS = {};
	}

	root.MY_CLASS.pageView = (function(superClass) {
		extend(pageView, superClass);

		function pageView(elm, option) {
			this._eClickClose = bind(this._eClickClose, this);
			this.dispose2 = bind(this.dispose2, this);
			this._setParts = bind(this._setParts, this);
			this.resize = bind(this.resize, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			pageView.__super__.constructor.call(this, elm, {
				resize: true,
				update: true
			});
			this._option = option || {};
			this._bg;
			this._container;
			this._close;
			this._conf = root.MY.app.conf;
			this.onClickClose;
		}

		pageView.prototype.addStage = function() {
			this._bg = new root._LIBS.display();
			this.addChild(this._bg);
			this._bg.bgColor("#000");
			this._bg.alpha(0);
			if (this._isSmt) {
				this._bg.elm().bind("touchstart", this._eClickClose);
			} else {
				this._bg.elm().bind("click", this._eClickClose);
			}
			this._container = new root._LIBS.display();
			this.addChild(this._container);
			if (this._isSmt) {
				this._container.size(640 / 2, 480 / 2);
			} else {
				this._container.size(640, 480);
			}
			this._close = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.PARTS + "close.png", root.MY.app.conf.IMG_RETINA);
			this._close.onLoad = this._setParts;
			this._close.onClick = this._eClickClose;
			return this._container.addChild(this._close);
		};

		pageView.prototype.update = function() {};

		pageView.prototype.resize = function(w, h) {
			this._container.xy(~~(w * 0.5 - this._container.width() * 0.5), ~~(h * 0.5 - this._container.height() * 0.5));
			return this._bg.size(w, h);
		};

		pageView.prototype._setParts = function(w, h) {
			if (this._close != null) {
				if (this._isSmt) {
					return this._close.xy(this._container.width() - this._close.width() - 20 / 2, 20 / 2);
				} else {
					return this._close.xy(this._container.width() - this._close.width() - 20, 20);
				}
			}
		};

		pageView.prototype.dispose2 = function() {
			if (this._bg != null) {
				this._bg.dispose();
				this._bg = null;
			}
			if (this._close != null) {
				this._close.dispose();
				this._close = null;
			}
			if (this._container != null) {
				this._container.dispose();
				this._container = null;
			}
			this._option = null;
			this._conf = null;
			return this.onClickClose = null;
		};

		pageView.prototype._eClickClose = function(e) {
			return root.MY.gl.contents.disposePage();
		};

		return pageView;

	})(root._LIBS.displayContainer);

	if (root == null) {
		root = this;
		root.MY = {};
		root.MY_CLASS = {};
	}

	root.MY_CLASS.resultUiView = (function(superClass) {
		extend(resultUiView, superClass);

		function resultUiView() {
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.size = bind(this.size, this);
			this.dispose2 = bind(this.dispose2, this);
			this.resize = bind(this.resize, this);
			this._updateShow = bind(this._updateShow, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			resultUiView.__super__.constructor.call(this, {
				resize: true,
				update: true
			});
			this._anm = {};
			this._isShowAnimation = false;
			this._conf = root.MY.app.conf;
		}

		resultUiView.prototype.addStage = function() {
			this._anm.show = new root._LIBS.animation();
			return this.visible(false);
		};

		resultUiView.prototype.update = function() {
			return this._updateShow();
		};

		resultUiView.prototype._updateShow = function() {
			var s;
			if (this._isShowAnimation && !this._anm.show.isCompleted()) {
				s = this._anm.show.get("scale");
				this.scale(s, s);
				this.setTransform();
				return this.alpha(this._anm.show.get("opacity"));
			}
		};

		resultUiView.prototype.resize = function(w, h) {
			return this.xy(~~(w * 0.5 - this.width() * 0.5), ~~(h * 0.5 - this.height() * 0.5));
		};

		resultUiView.prototype.dispose2 = function() {};

		resultUiView.prototype.size = function(w, h) {
			resultUiView.__super__.size.call(this, w, h);
			this.set3d(this.width() * 0.5, this.height() * 0.5);
			return this.resize(root.MY.myfw.stageWidth(), root.MY.myfw.stageHeight());
		};

		resultUiView.prototype.show = function(delay) {
			if (this._isShowAnimation) {
				return;
			}
			this._isShowAnimation = true;
			this.visible(true);
			this._anm.show.set({
				scale: {
					from: 0.25,
					to: 1
				},
				opacity: {
					from: 0,
					to: 1
				},
				frame: 80,
				delay: delay || 0,
				ease: "easeInOutExpo"
			});
			this._anm.show.start();
			return this.update();
		};

		resultUiView.prototype.hide = function() {
			this._isShowAnimation = false;
			return this.visible(false);
		};

		return resultUiView;

	})(root._LIBS.display);

	root.MY_CLASS.circle2d = (function(superClass) {
		extend(circle2d, superClass);

		function circle2d(option) {
			this._eCompleteShape = bind(this._eCompleteShape, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			circle2d.__super__.constructor.call(this, {
				update: true
			});
			this._option = option;
			this._shape;
		}

		circle2d.prototype.addStage = function() {
			this.elm().css({
				"pointer-events": "none"
			});
			if (this._option.fill) {
				this._shape = new root._LIBS.circleView(this._option.color);
				this.addChild(this._shape);
				this._shape.size(100);
				return this._eCompleteShape();
			} else {
				this._shape = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.LOADING + "waku" + this._option.key + ".png", root.MY.app.conf.IMG_RETINA);
				this._shape.onLoad = this._eCompleteShape;
				return this.addChild(this._shape);
			}
		};

		circle2d.prototype.dispose2 = function() {
			if (this._shape != null) {
				this._shape.dispose();
				this._shape = null;
			}
			return this._option = null;
		};

		circle2d.prototype.update = function() {};

		circle2d.prototype._eCompleteShape = function() {
			return this._shape.xy(~~(-this._shape.width() * 0.5), ~~(-this._shape.height() * 0.5));
		};

		return circle2d;

	})(root._LIBS.display);

	root.MY_CLASS.dot2d = (function(superClass) {
		extend(dot2d, superClass);

		function dot2d() {
			this.stop = bind(this.stop, this);
			this.start = bind(this.start, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			dot2d.__super__.constructor.call(this, {
				update: true
			});
			this._ang = 0;
			this._isAnimation = false;
		}

		dot2d.prototype.addStage = function() {
			var size;
			if (this._isSmt) {
				this.elm().css({
					"border-radius": "2px"
				});
			} else {
				this.elm().css({
					"border-radius": "4px"
				});
			}
			this.bgColor("#FFF");
			size = [12, 6][this._device];
			return this.size(size, size);
		};

		dot2d.prototype.dispose2 = function() {};

		dot2d.prototype.update = function() {
			var opacity;
			if (this._isAnimation) {
				this._ang += 16;
				opacity = this._u.map(Math.sin(this._u.radian(this._ang)), 0.5, 1, -1, 1);
				return this.alpha(opacity);
			}
		};

		dot2d.prototype.start = function(ang) {
			this._isAnimation = true;
			this._ang = ang;
			return this.update();
		};

		dot2d.prototype.stop = function() {
			return this._isAnimation = false;
		};

		return dot2d;

	})(root._LIBS.display);

	root.MY_CLASS.imgBtn2d = (function(superClass) {
		extend(imgBtn2d, superClass);

		function imgBtn2d(imgFile, isRetina, option) {
			this._eRollOut = bind(this._eRollOut, this);
			this._eRollOver = bind(this._eRollOver, this);
			this._eClick = bind(this._eClick, this);
			this._eLoadedImg = bind(this._eLoadedImg, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			imgBtn2d.__super__.constructor.call(this);
			this._imgFile = imgFile;
			this._isRetina = isRetina;
			this._option = option || {};
			this._btnImg;
			this._hoverBtnImg;
			this.onLoad;
			this.onClick;
			this.onOver;
			this.onOut;
		}

		imgBtn2d.prototype.addStage = function() {
			this._btnImg = new root._LIBS.displayImage(this._imgFile, this._isRetina);
			this._btnImg.onLoad = this._eLoadedImg;
			this.addChild(this._btnImg);
			if ((this._option.onImg != null) && this._option.onImg && !this._isSmt) {
				this._hoverBtnImg = new root._LIBS.displayImage(this._imgFile.replace(".png", "_on.png"), this._isRetina);
				this._hoverBtnImg.onLoad = this._eLoadedImg;
				this.addChild(this._hoverBtnImg);
			}
			if (this._isSmt) {
				return this._btnImg.elm().bind("touchstart", this._eClick);
			} else {
				return this.elm().bind("click", this._eClick).bind("mouseover", this._eRollOver).bind("mouseout", this._eRollOut);
			}
		};

		imgBtn2d.prototype.dispose2 = function() {
			if (this._btnImg != null) {
				this._btnImg.dispose();
				this._btnImg = null;
			}
			if (this._hoverBtnImg != null) {
				this._hoverBtnImg.dispose();
				this._hoverBtnImg = null;
			}
			this._option = null;
			this.onLoad = null;
			this.onClick = null;
			this.onOver = null;
			return this.onOut = null;
		};

		imgBtn2d.prototype._eLoadedImg = function(w, h) {
			this.size(this._btnImg.width(), this._btnImg.height());
			if (this.onLoad != null) {
				this.onLoad(w, h);
			}
			if (this._hoverBtnImg != null) {
				return this._hoverBtnImg.visible(false);
			}
		};

		imgBtn2d.prototype._eClick = function(e) {
			if (this.onClick != null) {
				return this.onClick();
			}
		};

		imgBtn2d.prototype._eRollOver = function(e) {
			var opacity;
			this._u.buttonMode(true);
			if (this._hoverBtnImg != null) {
				this._hoverBtnImg.visible(true);
				this._btnImg.visible(false);
			} else {
				opacity = this._option.opacity || 0.75;
				this._btnImg.alpha(opacity);
			}
			if (this.onOver != null) {
				return this.onOver();
			}
		};

		imgBtn2d.prototype._eRollOut = function(e) {
			this._u.buttonMode(false);
			if (this._hoverBtnImg != null) {
				this._hoverBtnImg.visible(false);
				this._btnImg.visible(true);
			} else {
				this._btnImg.alpha(1);
			}
			if (this.onOut != null) {
				return this.onOut();
			}
		};

		return imgBtn2d;

	})(root._LIBS.display);

	root.MY_CLASS.onpu2d = (function(superClass) {
		extend(onpu2d, superClass);

		function onpu2d(parent, key) {
			this.hide = bind(this.hide, this);
			this._startEffect = bind(this._startEffect, this);
			this._makeEffect = bind(this._makeEffect, this);
			this._isContainMouse = bind(this._isContainMouse, this);
			this.show = bind(this.show, this);
			this.getOnpuSize = bind(this.getOnpuSize, this);
			this._setTransform = bind(this._setTransform, this);
			this._eCompleteOnpu = bind(this._eCompleteOnpu, this);
			this.setBasePos = bind(this.setBasePos, this);
			this._updateOnpu = bind(this._updateOnpu, this);
			this._updateEffect = bind(this._updateEffect, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			onpu2d.__super__.constructor.call(this, {
				update: true
			});
			this._parent = parent;
			this._key = key;
			this._param = {
				baseScale: 1,
				baseX: 0,
				baseY: 0,
				onpuX: 0,
				onpuY: 0,
				onpuVX: 0,
				onpuVY: 0,
				onpuOffsetX: 0,
				onpuOffsetY: 0,
				onpuTgOffsetX: 0,
				onpuTgOffsetY: 0,
				onpuRot: 0
			};
			this._anm;
			this._onpuImg;
			this._isSmt = root.MY.myfw.conf.IS_SMT;
			this._effect = [];
			this._floater;
			this._interaction;
			this._isEffect = false;
			this._isHide = false;
		}

		onpu2d.prototype.addStage = function() {
			var start;
			this._interaction = root.MY.gl.interaction;
			this._makeEffect();
			this._onpuImg = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.LOADING + "onpu" + this._key + ".png", root.MY.app.conf.IMG_RETINA);
			this._onpuImg.onLoad = this._eCompleteOnpu;
			this.addChild(this._onpuImg);
			start = this._key * 40;
			this._floater = new root._LIBS.float(this._param, [
				{
					target: "onpuX",
					range: 4,
					speed: 1,
					start: start
				}, {
					target: "onpuY",
					range: 20,
					speed: 2,
					start: start
				}, {
					target: "onpuRot",
					range: 16,
					speed: 2,
					start: start
				}
			]);
			this._anm = new root._LIBS.animation();
			return this.visible(false);
		};

		onpu2d.prototype.dispose2 = function() {
			var i, j, len1, ref, val;
			if (this._anm != null) {
				this._anm.dispose();
				this._anm = null;
			}
			if (this._onpuImg != null) {
				this._onpuImg.dispose();
				this._onpuImg = null;
			}
			if (this._effect != null) {
				ref = this._effect;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					val.tg.dispose();
					val.anm.dispose();
					this._effect[i] = null;
				}
				this._effect = null;
			}
			if (this._floater != null) {
				this._floater.dispose();
				this._floater = null;
			}
			this._parent = null;
			this._param = null;
			return this._interaction = null;
		};

		onpu2d.prototype.update = function() {
			this._floater.update();
			if (this._isSmt) {
				if (!this._isEffect && this._isContainMouse()) {
					this._startEffect();
				}
			}
			this._updateEffect();
			this._updateOnpu();
			return this._setTransform();
		};

		onpu2d.prototype._updateEffect = function() {
			var anm, cnt, i, j, len1, ref, s, tg, val;
			if (this._isEffect) {
				cnt = 0;
				ref = this._effect;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					tg = val.tg;
					anm = val.anm;
					if (anm.isStart()) {
						tg.visible(true);
						s = anm.get("scale");
						tg.scale(s, s, s);
						tg.setTransform();
						tg.alpha(anm.get("opacity"));
						if (anm.isCompleted()) {
							cnt++;
							tg.visible(false);
						}
					}
				}
				if (cnt >= this._effect.length) {
					return this._isEffect = false;
				}
			}
		};

		onpu2d.prototype._updateOnpu = function() {
			var ease0, p;
			ease0 = 0.2;
			this._param.onpuTgOffsetX += (0 - this._param.onpuTgOffsetX) * ease0;
			this._param.onpuTgOffsetY += (0 - this._param.onpuTgOffsetY) * ease0;
			p = 0.4;
			this._param.onpuVX += (this._param.onpuTgOffsetX - this._param.onpuOffsetX) * p;
			this._param.onpuVY += (this._param.onpuTgOffsetY - this._param.onpuOffsetY) * p;
			this._param.onpuOffsetX += (this._param.onpuVX *= p);
			return this._param.onpuOffsetY += (this._param.onpuVY *= p);
		};

		onpu2d.prototype.setBasePos = function(x, y, scale) {
			this._param.baseX = x;
			this._param.baseY = y;
			return this._param.baseScale = scale;
		};

		onpu2d.prototype._eCompleteOnpu = function(w, h) {
			this._onpuImg.xy(~~(-this._onpuImg.width() * 0.5), ~~(-this._onpuImg.height() * 0.5));
			if (!this._isSmt) {
				this._onpuImg.elm().bind("mouseover", this._startEffect);
			}
			return this._parent.resize(w, h);
		};

		onpu2d.prototype._setTransform = function() {
			var onpuX, onpuY, rot, scale, x, y;
			x = this._param.baseX;
			y = this._param.baseY;
			if (this._anm.isCompleted()) {
				rot = 0;
				scale = this._param.baseScale;
			} else {
				rot = this._anm.get("rot");
				scale = this._anm.get("scale");
			}
			this.translate(x, y);
			this.rotate(0, 0, rot);
			this.scale(scale, scale);
			this.setTransform();
			onpuX = this._param.onpuX + this._param.onpuOffsetX;
			onpuY = this._param.onpuY + this._param.onpuOffsetY;
			this._onpuImg.translate(onpuX, onpuY);
			this._onpuImg.rotate(0, 0, this._param.onpuRot);
			return this._onpuImg.setTransform();
		};

		onpu2d.prototype.getOnpuSize = function() {
			return {
				width: this._onpuImg.width(),
				height: this._onpuImg.height()
			};
		};

		onpu2d.prototype.show = function() {
			if (this.visible()) {
				return;
			}
			this.visible(true);
			this._anm.set({
				scale: {
					from: 0,
					to: 1
				},
				rot: {
					from: this._u.range(90),
					to: 0
				},
				frame: 40,
				delay: 0,
				ease: "bounceOut"
			});
			return this._anm.start();
		};

		onpu2d.prototype._isContainMouse = function() {
			var x, y;
			if (this._onpuImg.width() <= 0) {
				return false;
			}
			x = this._interaction.mouse().x;
			y = this._interaction.mouse().y;
			if (x >= this._param.baseX - this._onpuImg.width() * 0.5 && x <= this._param.baseX + this._onpuImg.width() * 0.5 && y >= this._param.baseY - this._onpuImg.height() * 0.5 && y <= this._param.baseY + this._onpuImg.height() * 0.5) {
				return true;
			} else {
				return false;
			}
		};

		onpu2d.prototype._makeEffect = function() {
			var anm, circle, color, i, num, obj, results;
			i = 0;
			num = 2;
			results = [];
			while (i < num) {
				color = new THREE.Color(root.MY.app.conf.RAINBOW_COLOR[this._key]);
				circle = new root.MY_CLASS.circle2d({
					color: "#" + color.getHexString(),
					key: this._key,
					fill: i % 2 === 0
				});
				this.addChild(circle);
				circle.visible(false);
				anm = new root._LIBS.animation();
				obj = {
					tg: circle,
					anm: anm
				};
				this._effect.push(obj);
				results.push(i++);
			}
			return results;
		};

		onpu2d.prototype._startEffect = function() {
			var anm, i, j, len1, oldX, oldY, ref, tg, val, x, y;
			if (this._isHide) {
				return;
			}
			if (this._isSmt && this._isEffect) {
				return;
			}
			this._isEffect = true;
			ref = this._effect;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				tg = val.tg;
				anm = val.anm;
				if (i === 0) {
					anm.set({
						scale: {
							from: 0,
							to: 1
						},
						opacity: {
							from: 0.5,
							to: 0
						},
						frame: 30,
						delay: 0,
						ease: "easeOutExpo"
					});
					anm.start();
				} else {
					anm.set({
						scale: {
							from: 0.25,
							to: 1
						},
						opacity: {
							from: 1,
							to: 0
						},
						frame: 30,
						delay: 0,
						ease: "easeInOutExpo"
					});
					anm.start();
				}
			}
			x = this._interaction.mouse().x;
			y = this._interaction.mouse().y;
			oldX = this._interaction.mouse().xOld;
			oldY = this._interaction.mouse().yOld;
			this._param.onpuTgOffsetX = (x - oldX) * 1;
			return this._param.onpuTgOffsetY = (y - oldY) * 1;
		};

		onpu2d.prototype.hide = function() {
			return this._isHide = true;
		};

		return onpu2d;

	})(root._LIBS.display);

	root.MY_CLASS.rect2d = (function(superClass) {
		extend(rect2d, superClass);

		function rect2d(option) {
			this.show = bind(this.show, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			rect2d.__super__.constructor.call(this, {
				update: true
			});
			this._option = option;
			this._rect;
			this._anm = {};
		}

		rect2d.prototype.addStage = function() {
			this._rect = new root._LIBS.display();
			this.addChild(this._rect);
			this._rect.size(9, this._option.h || 42);
			this._rect.bgColor(this._option.color);
			this._rect.set3d(this.width() * 0.5, 0);
			this._anm.show = new root._LIBS.animation();
			return this.visible(false);
		};

		rect2d.prototype.dispose2 = function() {
			if (this._rect != null) {
				this._rect.dispose();
				this._rect = null;
			}
			if ((this._anm != null) && (this._anm.show != null)) {
				this._anm.show.dispose();
				this._anm.show = null;
				this._anm = null;
			}
			return this._option = null;
		};

		rect2d.prototype.update = function() {
			if (!this._anm.show.isCompleted()) {
				this._rect.scale(1, this._anm.show.get("scaleY"));
				this._rect.setTransform();
				return this._rect.alpha(this._anm.show.get("opacity"));
			}
		};

		rect2d.prototype.show = function(d) {
			this.visible(true);
			this._anm.show.set({
				scaleY: {
					from: 0,
					to: 1
				},
				opacity: {
					from: 0,
					to: 1
				},
				frame: 80,
				delay: d || 0,
				ease: "easeInOutExpo"
			});
			this._anm.show.start();
			return this.update();
		};

		return rect2d;

	})(root._LIBS.display);

	root.MY_CLASS.startBtn = (function(superClass) {
		extend(startBtn, superClass);

		function startBtn(imgName, isRetine) {
			this.stopEffect = bind(this.stopEffect, this);
			this._eOut = bind(this._eOut, this);
			this._eOver = bind(this._eOver, this);
			this._eClick = bind(this._eClick, this);
			this._setEffect = bind(this._setEffect, this);
			this._updateEffect = bind(this._updateEffect, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			startBtn.__super__.constructor.call(this, {
				update: true
			});
			this._imgName = imgName;
			this._isRetina = isRetine;
			this._btnImg;
			this._effect;
			this._toColor;
			this._fromColor;
			this._tgColor = [];
			this._isEffectUpdate = true;
			this._isOver = false;
			this.onClick;
			this.onLoad;
		}

		startBtn.prototype.addStage = function() {
			if (!Modernizr.cssgradients) {
				this._imgName = this._imgName.replace(".png", "_nog.png");
			}
			this._btnImg = new root.MY_CLASS.imgBtn2d(this._imgName, this._isRetina, {
				opacity: 1
			});
			this._btnImg.onLoad = this._setEffect;
			this._btnImg.onClick = this._eClick;
			this._btnImg.onOver = this._eOver;
			this._btnImg.onOut = this._eOut;
			return this.addChild(this._btnImg);
		};

		startBtn.prototype.dispose2 = function() {
			if (this._btnImg != null) {
				this._btnImg.dispose();
				this._btnImg = null;
			}
			if (this._effect != null) {
				this._effect.dispose();
				this._effect = null;
			}
			this._toColor = null;
			this._fromColor = null;
			this._tgColor = null;
			this.onClick = null;
			return this.onLoad = null;
		};

		startBtn.prototype.update = function() {
			return this._updateEffect();
		};

		startBtn.prototype._updateEffect = function() {
			var ease, key0, key1, p, t0, t1;
			if ((this._effect != null) && this._isEffectUpdate) {
				p = 0.002;
				key0 = ~~(Date.now() * p % this._tgColor.length);
				key1 = key0 + 1;
				if (key1 >= this._tgColor.length) {
					key1 = 0;
				}
				t0 = this._tgColor[key0];
				t1 = this._tgColor[key1];
				ease = 0.04;
				this._toColor.r += (t0.r - this._toColor.r) * ease;
				this._toColor.g += (t0.g - this._toColor.g) * ease;
				this._toColor.b += (t0.b - this._toColor.b) * ease;
				this._fromColor.r += (t1.r - this._fromColor.r) * ease;
				this._fromColor.g += (t1.g - this._fromColor.g) * ease;
				this._fromColor.b += (t1.b - this._fromColor.b) * ease;
				return this._effect.elm().css({
					background: "-moz-linear-gradient(left top, #" + this._toColor.getHexString() + ", #" + this._fromColor.getHexString() + ")",
					background: "-webkit-gradient(linear, left top, right bottom, from(#" + this._toColor.getHexString() + "), to(#" + this._fromColor.getHexString() + "))"
				});
			}
		};

		startBtn.prototype._setEffect = function() {
			var c, i, j, len1, ref, val;
			this.size(this._btnImg.width(), this._btnImg.height());
			if (Modernizr.cssgradients && !this._isSmt) {
				this._effect = new root._LIBS.display();
				this.unshiftChild(this._effect);
				this._effect.size(160, 40);
				this._effect.xy(~~(this.width() * 0.5 - this._effect.width() * 0.5), ~~(this.height() * 0.5 - this._effect.height() * 0.5));
				ref = root.MY.app.conf.START_BTN_COLOR;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					c = new THREE.Color(val);
					this._tgColor.push(c);
				}
				this._toColor = this._tgColor[0].clone();
				this._fromColor = this._tgColor[1].clone();
			}
			if (this.onLoad != null) {
				return this.onLoad();
			}
		};

		startBtn.prototype._eClick = function() {
			if (this.onClick != null) {
				return this.onClick();
			}
		};

		startBtn.prototype._eOver = function() {};

		startBtn.prototype._eOut = function() {};

		startBtn.prototype.stopEffect = function() {
			return this._isEffectUpdate = false;
		};

		return startBtn;

	})(root._LIBS.display);

	root.MY_CLASS.bgView = (function(superClass) {
		extend(bgView, superClass);

		function bgView(elm) {
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.resize = bind(this.resize, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			bgView.__super__.constructor.call(this, elm, {
				resize: true,
				update: true
			});
			this._anm = {};
			this._isShow = false;
			this._delayCall;
		}

		bgView.prototype.addStage = function() {
			var size, src;
			this._delayCall = new root.MY_CLASS.delayCall();
			this._delayCall.start();
			src = root.MY.app.conf.PATH_IMG.PARTS + "bg.png";
			size = String([236, 118][this._device]);
			this.elm().css({
				backgroundImage: "url('" + src + "')",
				backgroundSize: size + "px " + size + "px"
			});
			this._anm.show = new root._LIBS.animation();
			this.visible(false);
			return this.alpha(0);
		};

		bgView.prototype.dispose2 = function() {};

		bgView.prototype.update = function() {
			if (this._isShow && !this._anm.show.isCompleted()) {
				return this.alpha(this._anm.show.get("opacity"));
			}
		};

		bgView.prototype.resize = function(w, h) {
			return this.size(w, h);
		};

		bgView.prototype.show = function(t, d) {
			if (this._isShow) {
				return;
			}
			this._isShow = true;
			this.visible(true);
			if (!this._isSmt) {
				this._anm.show.set({
					opacity: {
						from: 0,
						to: t
					},
					frame: 40,
					delay: d || 0
				});
				this._anm.show.start();
				return this.update();
			} else {
				this._isShow = false;
				this._delayCall.onComplete = (function(_this) {
					return function() {
						return _this.alpha(t);
					};
				})(this);
				return this._delayCall.watchStart(d);
			}
		};

		bgView.prototype.hide = function() {
			this._isShow = false;
			this.visible(false);
			return this.alpha(0);
		};

		return bgView;

	})(root._LIBS.displayContainer);

	root.MY_CLASS.footerView = (function(superClass) {
		extend(footerView, superClass);

		function footerView(elm) {
			this._eClickGoogle = bind(this._eClickGoogle, this);
			this._eClickFb = bind(this._eClickFb, this);
			this._eClickTw = bind(this._eClickTw, this);
			this._eClickSystem = bind(this._eClickSystem, this);
			this._eClickBanner = bind(this._eClickBanner, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this._setParts = bind(this._setParts, this);
			this.update = bind(this.update, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this._getImgName2 = bind(this._getImgName2, this);
			this._getImgName = bind(this._getImgName, this);
			this.addStage = bind(this.addStage, this);
			footerView.__super__.constructor.call(this, elm, {
				resize: true,
				update: true
			});
			this._banner;
			this._right;
			this._system;
			this._line;
			this._google;
			this._copy;
			this._attention;
			this._tw;
			this._fb;
			this._line2;
			this._conf = root.MY.app.conf;
			this._device = this._isSmt ? 1 : 0;
			this._anm = {};
		}

		footerView.prototype.addStage = function() {
			this.mask();
			this.size(10, 10);
			this._google = new root.MY_CLASS.imgBtn2d(this._getImgName2("google"), root.MY.app.conf.IMG_RETINA);
			this._google.onLoad = this._setParts;
			this._google.onClick = this._eClickGoogle;
			this.addChild(this._google);
			this._banner = new root.MY_CLASS.imgBtn2d(this._getImgName("banner"), root.MY.app.conf.IMG_RETINA);
			this._banner.onLoad = this._setParts;
			this._banner.onClick = this._eClickBanner;
			this.addChild(this._banner);
			this._right = new root._LIBS.display();
			this.addChild(this._right);
			this._line2 = new root._LIBS.display();
			this._right.addChild(this._line2);
			this._line2.size([1, 1][this._device], [14, 14][this._device]);
			this._line2.bgColor("#FFF");
			this._tw = new root.MY_CLASS.imgBtn2d(this._getImgName("tw"), root.MY.app.conf.IMG_RETINA);
			this._tw.onLoad = this._setParts;
			this._tw.onClick = this._eClickTw;
			this._right.addChild(this._tw);
			this._fb = new root.MY_CLASS.imgBtn2d(this._getImgName("fb"), root.MY.app.conf.IMG_RETINA);
			this._fb.onLoad = this._setParts;
			this._fb.onClick = this._eClickFb;
			this._right.addChild(this._fb);
			if (!this._isSmt) {
				this._system = new root.MY_CLASS.imgBtn2d(this._getImgName("system"), root.MY.app.conf.IMG_RETINA);
				this._system.onLoad = this._setParts;
				this._system.onClick = this._eClickSystem;
				this._right.addChild(this._system);
				this._line = new root._LIBS.display();
				this._right.addChild(this._line);
				this._line.size(1, 10);
				this._line.bgColor("#FFF");
				this._copy = new root._LIBS.displayImage(this._getImgName("copy"), root.MY.app.conf.IMG_RETINA);
				this._copy.onLoad = this._setParts;
				this._right.addChild(this._copy);
			}
			if (this._isSmt) {
				this._attention = new root._LIBS.display();
				this._right.addChild(this._attention);
				this._attention.elm().html("<span id='attention'>Twitter銇仼銇偄銉椼儶鍐呫儢銉┿偊銈躲伅<span id='attentionSystem'>鎺ㄥエ鐠板</span>銇惈銇俱倢銇俱仜銈撱€俰OS8浠ヤ笂銇畇afari銉栥儵銈︺偠銇с亰妤姐仐銇裤亸銇犮仌銇勩€�</span><br><span id='copyright'>Copyright 漏 A stAtion All Rights Reserved.</span>");
			}
			this._anm.show0 = new root._LIBS.animation();
			this._anm.show1 = new root._LIBS.animation();
			this._setParts();
			return this.visible(false);
		};

		footerView.prototype._getImgName = function(name) {
			return root.MY.app.conf.PATH_IMG.FOOTER + name + String(this._device) + ".png";
		};

		footerView.prototype._getImgName2 = function(name) {
			return root.MY.app.conf.PATH_IMG.TOP + name + String(this._device) + ".png";
		};

		footerView.prototype.dispose2 = function() {};

		footerView.prototype.resize = function(w, h) {
			this.size(w, h);
			this._setParts(w, h);
			if (this._isSmt) {
				return this._setParts(w, h);
			}
		};

		footerView.prototype.update = function() {
			if (this._isShowAnimation && (!this._anm.show0.isCompleted() || !this._anm.show1.isCompleted())) {
				this._banner.translate(this._anm.show0.get("x"), this._anm.show0.get("y"));
				this._banner.setTransform();
				this._right.translate(this._anm.show1.get("x"), this._anm.show1.get("y"));
				this._right.setTransform();
				this._google.translate(this._anm.show0.get("gx"), this._anm.show0.get("gy"));
				return this._google.setTransform();
			}
		};

		footerView.prototype._setParts = function(w, h) {
			if (this._google != null) {
				this._google.xy([20, 10][this._device], [20, 10][this._device]);
			}
			if (this._banner != null) {
				if (this._isSmt) {
					this._banner.xy(~~(this.width() * 0.5 - this._banner.width() * 0.5), this.height() - 200 / 2);
				} else {
					this._banner.xy(20, this.height() - this._banner.height() - 20);
				}
			}
			if (this._attention != null) {
				this._attention.width(w - 190 / 2);
			}
			if (this._right != null) {
				if (this._isSmt) {
					this._right.size(w - 20, this._attention.height());
					this._right.xy(20 / 2, this.height() - this._right.height() - 20 / 2);
					if (this._banner != null) {
						this._banner.xy(~~(this.width() * 0.5 - this._banner.width() * 0.5), this._right.y() - this._banner.height() - 20 / 2);
					}
				} else {
					this._right.xy(this.width() - 330, this.height() - 30);
				}
			}
			if (this._line != null) {
				this._line.xy(79, 0);
			}
			if (this._copy != null) {
				this._copy.xy(96, 0);
			}
			if (this._tw != null) {
				if (this._isSmt) {
					this._tw.xy(w - 168 / 2, ~~(this._right.height() * 0.5 - this._tw.height() * 0.5));
				} else {
					this._tw.xy(228, -42);
				}
			}
			if (this._fb != null) {
				if (this._isSmt) {
					this._fb.xy(w - 82 / 2, ~~(this._right.height() * 0.5 - this._fb.height() * 0.5));
				} else {
					this._fb.xy(280, -42);
				}
			}
			if (this._line2 != null) {
				if (this._isSmt) {
					return this._line2.xy(w - 95 / 2, ~~(this._right.height() * 0.5 - this._line2.height() * 0.5));
				} else {
					return this._line2.xy(268, -36);
				}
			}
		};

		footerView.prototype.show = function(isAnimate, d) {
			var f, gx0, gy0, x0, x1, y0, y1;
			if (this._isShowAnimation) {
				return;
			}
			this._isShowAnimation = true;
			this.visible(true);
			this._setParts();
			f = 60;
			if (this._isSmt) {
				x0 = 0;
				y0 = 200;
				x1 = 0;
				y1 = 200;
				gx0 = -70;
				gy0 = -70;
			} else {
				x0 = -100;
				y0 = 100;
				x1 = 100;
				y1 = 100;
				gx0 = -140;
				gy0 = -140;
			}
			this._anm.show0.set({
				x: {
					from: x0,
					to: 0
				},
				y: {
					from: y0,
					to: 0
				},
				gx: {
					from: gx0,
					to: 0
				},
				gy: {
					from: gy0,
					to: 0
				},
				frame: f,
				delay: d || 0,
				ease: "easeOutExpo"
			});
			this._anm.show0.start();
			this._anm.show1.set({
				x: {
					from: x1,
					to: 0
				},
				y: {
					from: y1,
					to: 0
				},
				frame: f,
				delay: d || 0,
				ease: "easeOutExpo"
			});
			this._anm.show1.start();
			return this.update();
		};

		footerView.prototype.hide = function() {
			this.visible(false);
			this._isShowAnimation = false;
			return this._google.visible(false);
		};

		footerView.prototype._eClickBanner = function() {
			return window.open(this._conf.LINK_SP_SITE, "");
		};

		footerView.prototype._eClickSystem = function() {
			return root.MY.gl.contents.showSystem();
		};

		footerView.prototype._eClickTw = function() {
			return root.MY.gl.contents.shareSite(this._conf.SNS_TW);
		};

		footerView.prototype._eClickFb = function() {
			return root.MY.gl.contents.shareSite(this._conf.SNS_FB);
		};

		footerView.prototype._eClickGoogle = function() {
			return window.open("https://www.chromeexperiments.com/experiment/rainbow-road", "");
		};

		return footerView;

	})(root._LIBS.displayContainer);

	root.MY_CLASS.gameOverView = (function(superClass) {
		extend(gameOverView, superClass);

		function gameOverView() {
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this._setParts = bind(this._setParts, this);
			this.addStage = bind(this.addStage, this);
			gameOverView.__super__.constructor.call(this, {
				resize: true
			});
			this._strImg;
			this._line;
		}

		gameOverView.prototype.addStage = function() {
			this._line = new root._LIBS.display();
			this.addChild(this._line);
			this._line.bgColor("#FFF");
			this._strImg = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.RESULT_SMT + "gameover.png", root.MY.app.conf.IMG_RETINA);
			this._strImg.onLoad = this._setParts;
			this.addChild(this._strImg);
			return this.visible(false);
		};

		gameOverView.prototype._setParts = function(w, h) {
			if (this._strImg != null) {
				this._strImg.xy(~~(w * 0.5 - this._strImg.width() * 0.5), 0);
				return this._line.y(this._strImg.height() - 2);
			}
		};

		gameOverView.prototype.dispose2 = function() {};

		gameOverView.prototype.resize = function(w, h) {
			this._line.size(w, 4 / 2);
			return this._setParts(w, h);
		};

		gameOverView.prototype.show = function() {
			return this.visible(true);
		};

		gameOverView.prototype.hide = function() {
			return this.visible(false);
		};

		return gameOverView;

	})(root._LIBS.display);

	root.MY_CLASS.gameUiView = (function(superClass) {
		extend(gameUiView, superClass);

		function gameUiView(elm) {
			this.musicTitle = bind(this.musicTitle, this);
			this.stgInterval = bind(this.stgInterval, this);
			this.result = bind(this.result, this);
			this.point = bind(this.point, this);
			this.life = bind(this.life, this);
			this.showResult = bind(this.showResult, this);
			this.reset = bind(this.reset, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.show = bind(this.show, this);
			this.setMouseTg = bind(this.setMouseTg, this);
			this.addStage = bind(this.addStage, this);
			gameUiView.__super__.constructor.call(this, elm, {
				resize: true
			});
			this._life;
			this._point;
			this._result;
			this._stgInterval;
			this._gameOver;
			this._mouseTg;
			this._musicTitle;
			this._conf = root.MY.app.conf;
		}

		gameUiView.prototype.addStage = function() {
			this.unselectable();
			this._life = new root.MY_CLASS.lifeUiView();
			this.addChild(this._life);
			this._point = new root.MY_CLASS.pointUiView();
			this.addChild(this._point);
			this._musicTitle = new root.MY_CLASS.musicTitleView();
			this.addChild(this._musicTitle);
			if (this._isSmt) {
				this._result = new root.MY_CLASS.smtResultUiView();
				this._gameOver = new root.MY_CLASS.gameOverView();
				this.addChild(this._gameOver);
			} else {
				this._result = new root.MY_CLASS.pcResultUiView();
			}
			this.addChild(this._result);
			this._stgInterval = new root.MY_CLASS.stgIntervalView();
			this.addChild(this._stgInterval);
			return this.visible(false);
		};

		gameUiView.prototype.setMouseTg = function() {
			if (!this._conf.IS_CAP && !root.MY.myfw.conf.IS_SMT && (this._mouseTg == null)) {
				this._mouseTg = new root.MY_CLASS.uiMouse();
				return this.unshiftChild(this._mouseTg);
			}
		};

		gameUiView.prototype.show = function() {
			return this.visible(true);
		};

		gameUiView.prototype.dispose2 = function() {};

		gameUiView.prototype.resize = function(w, h) {};

		gameUiView.prototype.reset = function() {
			this._life.visible(true);
			this._life.reset();
			this._point.visible(true);
			this._musicTitle.visible(true);
			if (this._mouseTg != null) {
				this._mouseTg.visible(true);
			}
			if (this._gameOver != null) {
				this._gameOver.hide();
			}
			return this._result.hide();
		};

		gameUiView.prototype.showResult = function(point, clearType) {
			this._result.show(point, clearType);
			root.MY.gl.bg.show(this._conf.BG_OPACITY[1], 20);
			root.MY.gl.footer.show(true, 50);
			if (this._mouseTg != null) {
				this._mouseTg.visible(false);
			}
			this._life.visible(false);
			this._point.visible(false);
			this._musicTitle.visible(false);
			if (this._gameOver != null) {
				return this._gameOver.show();
			}
		};

		gameUiView.prototype.life = function() {
			return this._life;
		};

		gameUiView.prototype.point = function() {
			return this._point;
		};

		gameUiView.prototype.result = function() {
			return this._result;
		};

		gameUiView.prototype.stgInterval = function() {
			return this._stgInterval;
		};

		gameUiView.prototype.musicTitle = function() {
			return this._musicTitle;
		};

		return gameUiView;

	})(root._LIBS.displayContainer);

	root.MY_CLASS.helpView = (function(superClass) {
		extend(helpView, superClass);

		function helpView(elm) {
			this._eClickPrev = bind(this._eClickPrev, this);
			this._eClickNext = bind(this._eClickNext, this);
			this._setPage = bind(this._setPage, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			helpView.__super__.constructor.call(this, elm);
			this._base;
			this._page = [];
			this._prev;
			this._next;
			this._nowPage = 0;
		}

		helpView.prototype.addStage = function() {
			var i, num, page;
			helpView.__super__.addStage.call(this);
			this._prev = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.HELP + "prev.png", root.MY.app.conf.IMG_RETINA);
			this._prev.onClick = this._eClickPrev;
			this._container.unshiftChild(this._prev);
			this._next = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.HELP + "next.png", root.MY.app.conf.IMG_RETINA);
			this._next.onClick = this._eClickNext;
			this._container.unshiftChild(this._next);
			if (this._isSmt) {
				this._prev.xy(26 / 2, 424 / 2);
				this._next.xy(536 / 2, this._prev.y());
			} else {
				this._prev.xy(26, 424);
				this._next.xy(536, this._prev.y());
			}
			i = 0;
			num = 2;
			while (i < num) {
				page = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.HELP + "page" + String(i) + "_" + String(this._device) + ".png", root.MY.app.conf.IMG_RETINA);
				this._container.unshiftChild(page);
				this._page.push(page);
				i++;
			}
			this._base = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.HELP + "help.png", root.MY.app.conf.IMG_RETINA);
			this._container.unshiftChild(this._base);
			return this._setPage();
		};

		helpView.prototype.dispose2 = function() {
			var i, j, len1, ref, val;
			if (this._base != null) {
				this._base.dispose();
				this._base = null;
			}
			if (this._page != null) {
				ref = this._page;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					val.dispose();
				}
				this._page = null;
			}
			return helpView.__super__.dispose2.call(this);
		};

		helpView.prototype.resize = function(w, h) {
			return helpView.__super__.resize.call(this, w, h);
		};

		helpView.prototype._setPage = function() {
			var i, j, len1, ref, val;
			ref = this._page;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.visible(this._nowPage === i);
			}
			this._prev.visible(this._nowPage > 0);
			return this._next.visible(this._nowPage !== this._page.length - 1);
		};

		helpView.prototype._eClickNext = function() {
			this._nowPage = Math.min(this._nowPage + 1, this._page.length - 1);
			return this._setPage();
		};

		helpView.prototype._eClickPrev = function() {
			this._nowPage = Math.max(this._nowPage - 1, 0);
			return this._setPage();
		};

		return helpView;

	})(root.MY_CLASS.pageView);

	root.MY_CLASS.lifeTriangle = (function(superClass) {
		extend(lifeTriangle, superClass);

		function lifeTriangle(option) {
			this.reset = bind(this.reset, this);
			this.lifeUp = bind(this.lifeUp, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.draw = bind(this.draw, this);
			this.updateColor2 = bind(this.updateColor2, this);
			this.updateColor = bind(this.updateColor, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			lifeTriangle.__super__.constructor.call(this, {
				update: true
			});
			this._option = option;
			this._tri;
			this._color;
			this.centerX = 0;
			this._isShow = true;
			this._isColorAnimation = this._u.isChrome() && !this._isSmt;
		}

		lifeTriangle.prototype.addStage = function() {
			this._option.ts = this._option.defS = this._option.s;
			this._option.tl = this._option.defL = this._option.l;
			this._color = new THREE.Color();
			this._color.setHSL(this._option.h, this._option.s, this._option.l);
			this._tri = new root._LIBS.display();
			this.addChild(this._tri);
			if (this._option.isTop) {
				this._tri.elm().css({
					width: 0,
					height: 0,
					borderTop: this._option.height + "px solid #" + this._color.getHexString(),
					borderRight: (this._option.width * 0.5) + "px solid transparent",
					borderBottom: "0px solid transparent",
					borderLeft: (this._option.width * 0.5) + "px solid transparent"
				});
			} else {
				this._tri.elm().css({
					width: 0,
					height: 0,
					borderBottom: this._option.height + "px solid #" + this._color.getHexString(),
					borderRight: (this._option.width * 0.5) + "px solid transparent",
					borderTop: "0px solid transparent",
					borderLeft: (this._option.width * 0.5) + "px solid transparent"
				});
			}
			return this.update();
		};

		lifeTriangle.prototype.update = function() {
			if (this.visible() && this._isColorAnimation) {
				this.updateColor();
				return this.draw();
			}
		};

		lifeTriangle.prototype.dispose2 = function() {};

		lifeTriangle.prototype.updateColor = function() {
			var cEase0, cEase1, h, life;
			if ((root.MY.gl.game != null) && this.visible()) {
				life = root.MY.gl.game.life();
				h = this._u.map(life, 0, 117, 0.2, 1) / 360;
				cEase0 = 0.1;
				cEase1 = 0.5;
				this._option.ts += (this._option.defS - this._option.ts) * cEase0;
				this._option.s += (this._option.ts - this._option.s) * cEase1;
				this._option.tl += (this._option.defL - this._option.tl) * cEase0;
				this._option.l += (this._option.tl - this._option.l) * cEase1;
				return this._color.setHSL(h, this._option.s, this._option.l);
			}
		};

		lifeTriangle.prototype.updateColor2 = function(h) {
			if (root.MY.gl.game != null) {
				return this._color.setHSL(h / 360, this._option.s, this._option.l);
			}
		};

		lifeTriangle.prototype.draw = function() {
			if (this.visible()) {
				if (this._option.isTop) {
					return this._tri.elm().css({
						borderTop: this._option.height + "px solid #" + this._color.getHexString()
					});
				} else {
					return this._tri.elm().css({
						borderBottom: this._option.height + "px solid #" + this._color.getHexString()
					});
				}
			}
		};

		lifeTriangle.prototype.show = function(isAnimate) {
			return this.visible(true);
		};

		lifeTriangle.prototype.hide = function(isAnimate) {
			return this.visible(false);
		};

		lifeTriangle.prototype.lifeUp = function() {
			if (this._isColorAnimation) {
				this._option.ts = 1;
				return this._option.tl = 1;
			}
		};

		lifeTriangle.prototype.reset = function() {
			this._option.s = this._option.ts = this._option.defS;
			this._option.l = this._option.tl = this._option.defL;
			this._color.setHSL(this._option.h, this._option.s, this._option.l);
			this.visible(true);
			this.draw();
			return this.visible(false);
		};

		return lifeTriangle;

	})(root._LIBS.display);

	root.MY_CLASS.lifeUiView = (function(superClass) {
		extend(lifeUiView, superClass);

		function lifeUiView() {
			this.reset = bind(this.reset, this);
			this.upLifeAnimation = bind(this.upLifeAnimation, this);
			this.setLifeStatus = bind(this.setLifeStatus, this);
			this.setLife = bind(this.setLife, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this._makeTriangles = bind(this._makeTriangles, this);
			this.addStage = bind(this.addStage, this);
			lifeUiView.__super__.constructor.call(this, {
				resize: true,
				update: true
			});
			this._bg;
			this._gageTop;
			this._gageBtm;
			this._color;
			this._status = -1;
			this._container;
			this._lifeContainer;
			this._lifeImg = [];
			this._tri = [];
			this._nowLife = 1;
			this._conf = root.MY.app.conf;
		}

		lifeUiView.prototype.addStage = function() {
			var i, lifeImg, num;
			this._container = new root._LIBS.display();
			this.addChild(this._container);
			this._container.mask();
			this._container.size(this._conf.UI_LIFE_SIZE.WIDTH[this._device], this._conf.UI_LIFE_SIZE.HEIGHT[this._device]);
			this._container.elm().css({
				border: "1px solid #FFF",
				backgroundColor: "rgba(0,0,0,0.1)"
			});
			if (this._isSmt) {
				this._lifeContainer = new root._LIBS.display();
				this._container.addChild(this._lifeContainer);
				this._lifeContainer.mask();
				this._lifeContainer.size(this._conf.UI_LIFE_SIZE.WIDTH[this._device], this._conf.UI_LIFE_SIZE.HEIGHT[this._device]);
				i = 0;
				num = 3;
				while (i < num) {
					lifeImg = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.GAMEUI + "life" + String(i) + ".png", root.MY.app.conf.IMG_RETINA);
					this._lifeContainer.addChild(lifeImg);
					this._lifeImg.push(lifeImg);
					i++;
				}
			} else {
				this._makeTriangles();
			}
			return this.setLifeStatus(0);
		};

		lifeUiView.prototype._makeTriangles = function() {
			var colorH, colorL, colorS, dai, i, num, opt, totalWidth, tri, w;
			w = this._conf.UI_LIFE_SIZE.TRI_WIDTH[this._device];
			colorH = 117 / 360;
			colorS = [89 / 100, 100 / 100, 66 / 100];
			colorL = [44 / 100, 35 / 100, 33 / 100];
			totalWidth = -w;
			while (totalWidth < this._container.width()) {
				opt = {};
				opt.isTop = this._tri.length % 2 === 0;
				opt.width = w;
				opt.height = this._container.height();
				opt.h = colorH;
				if (this._tri.length % 2 === 0) {
					opt.s = colorS[0];
					opt.l = colorL[0];
				} else {
					opt.s = colorS[1];
					opt.l = colorL[1];
				}
				tri = new root.MY_CLASS.lifeTriangle(opt);
				this._container.addChild(tri);
				tri.xy(totalWidth, 0);
				tri.centerX = tri.x() + opt.width * 0.5;
				this._tri.push(tri);
				totalWidth += opt.width * 0.5;
			}
			i = 0;
			num = this._tri.length;
			while (i < num) {
				if (i % 4 === 1 || i % 4 === 2) {
					dai = this._tri[i];
					opt = {};
					opt.isTop = i % 2 === 0;
					opt.width = w * 0.5;
					opt.height = this._container.height() * 0.5;
					opt.h = colorH;
					opt.s = colorS[2];
					opt.l = colorL[2];
					tri = new root.MY_CLASS.lifeTriangle(opt);
					this._container.addChild(tri);
					if (opt.isTop) {
						tri.xy(dai.x() + opt.width, 0);
					} else {
						tri.xy(dai.x(), opt.height);
					}
					tri.centerX = tri.x() + opt.width * 0.5;
					this._tri.push(tri);
				}
				i++;
			}
			return this._u.sort(this._tri, "centerX");
		};

		lifeUiView.prototype.update = function() {};

		lifeUiView.prototype.dispose2 = function() {};

		lifeUiView.prototype.resize = function(w, h) {
			if (root.MY.myfw.conf.IS_SMT) {
				return this._container.xy(~~(w * 0.5 - this._container.width() * 0.5), 15);
			} else {
				return this._container.xy(~~(w * 0.5 - this._container.width() * 0.5), 30);
			}
		};

		lifeUiView.prototype.setLife = function(life, isAnimate) {
			var i, j, len1, num, ref, val;
			if (isAnimate == null) {
				isAnimate = true;
			}
			if (isAnimate) {
				this._nowLife += (life - this._nowLife) * 0.3;
			} else {
				this._nowLife = life;
			}
			num = this._tri.length;
			ref = this._tri;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (this._nowLife >= (i / num)) {
					val.show(isAnimate);
				} else {
					val.hide(isAnimate);
				}
			}
			if (this._isSmt) {
				this._lifeContainer.width(~~(this._conf.UI_LIFE_SIZE.WIDTH[this._device] * life));
			}
			if (this._nowLife > 0.25 && this._nowLife <= 0.5) {
				return this.setLifeStatus(1);
			} else if (this._nowLife <= 0.25) {
				return this.setLifeStatus(2);
			} else {
				return this.setLifeStatus(0);
			}
		};

		lifeUiView.prototype.setLifeStatus = function(status) {
			var i, j, k, len1, len2, ref, ref1, results, val;
			if (this._status === status) {
				return;
			}
			this._status = status;
			ref = this._tri;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.updateColor2([120, 60, 0][this._status]);
				val.draw();
			}
			if (this._isSmt) {
				ref1 = this._lifeImg;
				results = [];
				for (i = k = 0, len2 = ref1.length; k < len2; i = ++k) {
					val = ref1[i];
					results.push(val.visible(i === this._status));
				}
				return results;
			}
		};

		lifeUiView.prototype.upLifeAnimation = function() {
			var i, j, len1, ref, results, val;
			if (!this._isSmt) {
				ref = this._tri;
				results = [];
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					results.push(val.lifeUp());
				}
				return results;
			}
		};

		lifeUiView.prototype.reset = function() {
			var i, j, len1, ref, val;
			this.setLife(1, false);
			ref = this._tri;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.reset();
			}
			if (this._isSmt) {
				this._lifeContainer.width(~~(this._conf.UI_LIFE_SIZE.WIDTH[this._device] * 1));
			}
			return this.setLifeStatus(0);
		};

		return lifeUiView;

	})(root._LIBS.display);

	root.MY_CLASS.loadingView = (function(superClass) {
		extend(loadingView, superClass);

		function loadingView(elm) {
			this.setLoading = bind(this.setLoading, this);
			this.hide = bind(this.hide, this);
			this._updateHide = bind(this._updateHide, this);
			this.update = bind(this.update, this);
			this._setOnpuPos = bind(this._setOnpuPos, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			loadingView.__super__.constructor.call(this, elm, {
				resize: true,
				update: true
			});
			this._soundTxt;
			this._onpu = [];
			this._onpuPos = [];
			this._onpuPosAnm = [];
			this._rate = 0;
			this._isHide = false;
			this._isHided = false;
			this.onHided;
		}

		loadingView.prototype.addStage = function() {
			var anm, i, num, onpu, pos, results;
			this._soundTxt = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.LOADING + "sound.png", root.MY.app.conf.IMG_RETINA);
			this._soundTxt.onLoad = this.resize;
			this.addChild(this._soundTxt);
			this._soundTxt.elm().css({
				opacity: 0
			}).animate({
				opacity: 1
			}, 1200);
			i = 0;
			num = 7;
			results = [];
			while (i < num) {
				onpu = new root.MY_CLASS.onpu2d(this, i);
				this.addChild(onpu);
				this._onpu.push(onpu);
				pos = new root._LIBS.point3d(0, 0, 0);
				this._onpuPos.push(pos);
				anm = new root._LIBS.animation();
				this._onpuPosAnm.push(anm);
				results.push(i++);
			}
			return results;
		};

		loadingView.prototype.dispose2 = function() {
			var i, j, k, len1, len2, len3, n, ref, ref1, ref2, val;
			if (this._soundTxt != null) {
				this._soundTxt.dispose();
				this._soundTxt = null;
			}
			if (this._onpu != null) {
				ref = this._onpu;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					val.dispose();
					this._onpu[i] = null;
				}
				this._onpu = null;
			}
			if (this._onpuPos != null) {
				ref1 = this._onpuPos;
				for (i = k = 0, len2 = ref1.length; k < len2; i = ++k) {
					val = ref1[i];
					val.dispose();
					this._onpuPos[i] = null;
				}
				this._onpuPos = null;
			}
			if (this._onpuPosAnm != null) {
				ref2 = this._onpuPosAnm;
				for (i = n = 0, len3 = ref2.length; n < len3; i = ++n) {
					val = ref2[i];
					val.dispose();
					this._onpuPosAnm[i] = null;
				}
				this._onpuPosAnm = null;
			}
			return this.onHided = null;
		};

		loadingView.prototype.resize = function(w, h) {
			this.size(w, h);
			if (this._isSmt) {
				this._soundTxt.xy(~~(w * 0.5 - this._soundTxt.width() * 0.5), ~~(h * 0.5 - this._soundTxt.height() * 0.5) + 110 / 2);
			} else {
				this._soundTxt.xy(~~(w * 0.5 - this._soundTxt.width() * 0.5), ~~(h * 0.5 - this._soundTxt.height() * 0.5) + 110);
			}
			return this._setOnpuPos(w, h);
		};

		loadingView.prototype._setOnpuPos = function(w, h) {
			var i, interval, j, k, len1, len2, offsetY, onpuW, pos, ref, ref1, results, totalWidth, val;
			onpuW = 0;
			ref = this._onpu;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val.getOnpuSize().width > onpuW) {
					onpuW = val.getOnpuSize().width;
				}
			}
			if (onpuW === 0) {
				return;
			}
			interval = ~~(onpuW * 0.75);
			totalWidth = (onpuW + interval) * this._onpu.length - interval;
			ref1 = this._onpu;
			results = [];
			for (i = k = 0, len2 = ref1.length; k < len2; i = ++k) {
				val = ref1[i];
				offsetY = val.getOnpuSize().height * 0.3;
				if (i % 2 === 0) {
					offsetY *= -1;
				}
				pos = this._onpuPos[i];
				pos.setVanishingPoint(w * 0.5, h * 0.5);
				pos.x = i * (onpuW + interval) - totalWidth * 0.5 + onpuW * 0.5;
				pos.y = offsetY;
				results.push(val.setBasePos(pos.screenX(), pos.screenY(), pos.scale()));
			}
			return results;
		};

		loadingView.prototype.update = function() {
			return this._updateHide();
		};

		loadingView.prototype._updateHide = function() {
			var anm, hidedCnt, i, j, len1, onpu, ref, val;
			if (this._isHide && !this._isHided) {
				hidedCnt = 0;
				ref = this._onpuPos;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					anm = this._onpuPosAnm[i];
					val.z = anm.get("z");
					onpu = this._onpu[i];
					onpu.setBasePos(val.screenX(), val.screenY(), val.scale());
					onpu.alpha(anm.get("opacity"));
					if (anm.isCompleted()) {
						onpu.visible(false);
						hidedCnt++;
					}
				}
				if (hidedCnt >= this._onpuPos.length) {
					this._isHided = true;
					if (this.onHided != null) {
						return this.onHided();
					}
				}
			}
		};

		loadingView.prototype.hide = function() {
			var delay, i, j, len1, onpu, ref, val;
			if (this._isHide) {
				return;
			}
			this._isHide = true;
			delay = 2 * 60;
			ref = this._onpuPosAnm;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.set({
					z: {
						from: 0,
						to: -800
					},
					opacity: {
						from: 1,
						to: 0
					},
					frame: 70,
					delay: delay + (3 - Math.abs(3 - i)) * 3,
					ease: "easeInOutExpo"
				});
				val.start();
				onpu = this._onpu[i];
				onpu.hide();
			}
			return this.delay((function(_this) {
				return function() {
					return _this._soundTxt.elm().animate({
						opacity: 0
					}, 400);
				};
			})(this), 2000, 0);
		};

		loadingView.prototype.setLoading = function(rate, key) {
			var i, num, results;
			this._rate = 0;
			i = 0;
			while (i < key) {
				this._rate += root.MY.app.conf.LOADING_RATE[i];
				i++;
			}
			this._rate += root.MY.app.conf.LOADING_RATE[key] * rate;
			i = 0;
			num = ~~(this._rate * this._onpu.length);
			results = [];
			while (i < num) {
				this._onpu[i].show();
				results.push(i++);
			}
			return results;
		};

		return loadingView;

	})(root._LIBS.displayContainer);

	root.MY_CLASS.movieView = (function(superClass) {
		extend(movieView, superClass);

		function movieView(elm) {
			this._eClickClose = bind(this._eClickClose, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			movieView.__super__.constructor.call(this, elm, {
				resize: true
			});
			this._container;
			this._bg;
			this._close;
			this._conf = root.MY.app.conf;
		}

		movieView.prototype.addStage = function() {
			var tag, yh, yw;
			this._bg = new root._LIBS.display();
			this.addChild(this._bg);
			this._bg.bgColor("#000");
			this._bg.alpha(0.3);
			this._bg.elm().bind(["click", "touchstart"][this._device], this._eClickClose);
			this._close = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.PARTS + "close.png", root.MY.app.conf.IMG_RETINA);
			this._close.onLoad = this.resize;
			this._close.onClick = this._eClickClose;
			this.addChild(this._close);
			this._container = new root._LIBS.display();
			this.addChild(this._container);
			yw = [853, 280][this._device];
			yh = [480, 158][this._device];
			tag = this._conf.TAG_SP_MOVIE;
			tag = tag.replace("<width>", yw);
			tag = tag.replace("<height>", yh);
			this._container.elm().html(tag);
			return this._container.size(yw, yh);
		};

		movieView.prototype.dispose2 = function() {
			if (this._bg != null) {
				this._bg.dispose();
				this._bg = null;
			}
			if (this._close != null) {
				this._close.dispose();
				this._close = null;
			}
			if (this._container != null) {
				this._container.dispose();
				this._container = null;
			}
			return this._conf = null;
		};

		movieView.prototype.resize = function(w, h) {
			this._bg.size(w, h);
			if (this._close != null) {
				this._close.xy(w - this._close.width() - [30, 30 / 2][this._device], [30, 30 / 2][this._device]);
			}
			return this._container.xy(~~(w * 0.5 - this._container.width() * 0.5), ~~(h * 0.5 - this._container.height() * 0.5));
		};

		movieView.prototype._eClickClose = function() {
			return root.MY.gl.contents.disposePage();
		};

		return movieView;

	})(root._LIBS.displayContainer);

	root.MY_CLASS.musicTitleView = (function(superClass) {
		extend(musicTitleView, superClass);

		function musicTitleView() {
			this.hideTitle = bind(this.hideTitle, this);
			this.showTitle = bind(this.showTitle, this);
			this._setParts = bind(this._setParts, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			musicTitleView.__super__.constructor.call(this, {
				resize: true,
				update: true
			});
			this._container;
			this._titleImg = [];
			this._anm;
			this._conf = root.MY.app.conf;
		}

		musicTitleView.prototype.addStage = function() {
			var i, img;
			this._container = new root._LIBS.display();
			this.addChild(this._container);
			i = 0;
			while (i < this._conf.STAGE_NUM) {
				img = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.GAMEUI + "musicTitle/" + String(i) + ".png", root.MY.app.conf.IMG_RETINA);
				img.onLoad = this._setParts;
				this._container.addChild(img);
				img.visible(false);
				this._titleImg.push(img);
				i++;
			}
			return this._anm = new root._LIBS.animation();
		};

		musicTitleView.prototype.update = function() {
			if (this._anm.isStart() && !this._anm.isCompleted()) {
				this._container.translate(this._anm.get("x"), 0);
				this._container.setTransform();
				return this._container.alpha(this._anm.get("opacity"));
			}
		};

		musicTitleView.prototype.dispose2 = function() {};

		musicTitleView.prototype.resize = function(w, h) {
			if (this._isSmt) {
				return this._container.xy(20 / 2, h - 20 / 2);
			} else {
				return this._container.xy(20, h - 20);
			}
		};

		musicTitleView.prototype._setParts = function(w, h) {
			var i, j, len1, ref, results, val;
			ref = this._titleImg;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val != null) {
					results.push(val.xy(0, -val.height()));
				} else {
					results.push(void 0);
				}
			}
			return results;
		};

		musicTitleView.prototype.showTitle = function(stageId) {
			var i, j, len1, ref, val;
			ref = this._titleImg;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (i === stageId) {
					val.visible(true);
				} else {
					val.visible(false);
				}
			}
			this._anm.set({
				x: {
					from: 30,
					to: 0
				},
				opacity: {
					from: 0,
					to: 1
				},
				frame: 200,
				delay: 20,
				ease: "easeInOutExpo"
			});
			this._anm.start();
			this._container.alpha(0);
			return this.update();
		};

		musicTitleView.prototype.hideTitle = function() {
			this._anm.set({
				x: {
					from: 0,
					to: -30
				},
				opacity: {
					from: 1,
					to: 0
				},
				frame: 200,
				delay: 120,
				ease: "easeInOutExpo"
			});
			this._anm.start();
			return this.update();
		};

		return musicTitleView;

	})(root._LIBS.display);

	root.MY_CLASS.numView = (function(superClass) {
		extend(numView, superClass);

		function numView(keta, type, margin) {
			this.type = bind(this.type, this);
			this.keta = bind(this.keta, this);
			this.getSize = bind(this.getSize, this);
			this.setNum = bind(this.setNum, this);
			this._disposeNum = bind(this._disposeNum, this);
			this._makeNum = bind(this._makeNum, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			numView.__super__.constructor.call(this);
			this._keta = keta;
			this._numImg = [];
			this._margin = margin || 0;
			this._type = type || "a";
		}

		numView.prototype.addStage = function() {
			return this._makeNum();
		};

		numView.prototype.dispose2 = function() {};

		numView.prototype._makeNum = function() {
			var i, num, results;
			this._disposeNum();
			this._numImg = [];
			i = 0;
			results = [];
			while (i < this._keta) {
				num = new root._LIBS.spriteSheetView(root.MY.app.conf.PATH_IMG.NUM + "all.png", root.MY.app.conf.NUM_SPRITE_JSON, {
					imgRetina: root.MY.app.conf.IMG_RETINA
				});
				this.addChild(num);
				this._numImg.push(num);
				results.push(i++);
			}
			return results;
		};

		numView.prototype._disposeNum = function() {
			var i, j, len1, ref, val;
			if (this._numImg != null) {
				ref = this._numImg;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					val.dispose();
					this._numImg[i] = null;
				}
				return this._numImg = null;
			}
		};

		numView.prototype.setNum = function(num) {
			var i, j, len1, margin, ref, results, val, x;
			num = this._u.numStr(num, this._keta);
			x = 0;
			margin = this._margin;
			ref = this._numImg;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.setState(this._type + num.substr(i, 1) + ".png");
				val.x(x);
				results.push(x += val.width() + margin);
			}
			return results;
		};

		numView.prototype.getSize = function() {
			var h, i, j, len1, ref, size, val, w;
			w = 0;
			h = 0;
			ref = this._numImg;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				size = val.getSize();
				w += size.w + this._margin;
				h = size.h;
			}
			return {
				w: w - this._margin,
				h: h
			};
		};

		numView.prototype.keta = function(val) {
			if (this._keta === val) {
				return;
			}
			this._keta = val;
			return this._makeNum();
		};

		numView.prototype.type = function(val) {
			return this._type = val;
		};

		return numView;

	})(root._LIBS.display);

	root.MY_CLASS.pcResultUiView = (function(superClass) {
		extend(pcResultUiView, superClass);

		function pcResultUiView() {
			this._setMusicTitle = bind(this._setMusicTitle, this);
			this._setAyakm = bind(this._setAyakm, this);
			this._eClickMovie = bind(this._eClickMovie, this);
			this._eClickRetry = bind(this._eClickRetry, this);
			this._eClickFb = bind(this._eClickFb, this);
			this._eClickTw = bind(this._eClickTw, this);
			this.show = bind(this.show, this);
			this._setParts = bind(this._setParts, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			pcResultUiView.__super__.constructor.call(this);
			this._base;
			this._tw;
			this._fb;
			this._retry;
			this._icon;
			this._thumb;
			this._point;
			this._km;
			this._musicTitle;
			this._type = 0;
		}

		pcResultUiView.prototype.addStage = function() {
			pcResultUiView.__super__.addStage.call(this);
			this._base = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.RESULT_PC + "base.png", root.MY.app.conf.IMG_RETINA);
			this._base.onLoad = this._setParts;
			this.addChild(this._base);
			this._tw = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.RESULT_PC + "tw.png", root.MY.app.conf.IMG_RETINA);
			this._tw.onLoad = this._setParts;
			this._tw.onClick = this._eClickTw;
			this.addChild(this._tw);
			this._fb = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.RESULT_PC + "fb.png", root.MY.app.conf.IMG_RETINA);
			this._fb.onLoad = this._setParts;
			this._fb.onClick = this._eClickFb;
			this.addChild(this._fb);
			this._retry = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.RESULT_PC + "retry.png", root.MY.app.conf.IMG_RETINA);
			this._retry.onLoad = this._setParts;
			this._retry.onClick = this._eClickRetry;
			this.addChild(this._retry);
			this._thumb = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.RESULT_PC + "movieThumb.png", root.MY.app.conf.IMG_RETINA);
			this._thumb.onLoad = this._setParts;
			this._thumb.onClick = this._eClickMovie;
			this.addChild(this._thumb);
			this._icon = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.RESULT_PC + "movieIcon.png", root.MY.app.conf.IMG_RETINA);
			this._icon.onLoad = this._setParts;
			this.addChild(this._icon);
			this._point = new root.MY_CLASS.numView(5, "b", 10);
			this.addChild(this._point);
			return this._point.setNum(0);
		};

		pcResultUiView.prototype.update = function() {
			return pcResultUiView.__super__.update.call(this);
		};

		pcResultUiView.prototype.dispose2 = function() {
			return pcResultUiView.__super__.dispose2.call(this);
		};

		pcResultUiView.prototype._setParts = function(w, h) {
			switch (this._type) {
				case 0:
					this.size(640, 302);
					this._thumb.visible(false);
					this._icon.visible(false);
					break;
				case 1:
					this.size(640, 566);
					this._thumb.visible(true);
					this._icon.visible(true);
			}
			if (this._base != null) {
				this._base.xy(~~(this.width() * 0.5 - this._base.width() * 0.5), 0);
			}
			if (this._tw != null) {
				this._tw.xy(460, 94);
			}
			if (this._fb != null) {
				this._fb.xy(560, 94);
			}
			if (this._retry != null) {
				if (this._type === 0) {
					this._retry.xy(~~(this.width() * 0.5 - this._retry.width() * 0.5), 240);
				} else {
					this._retry.xy(~~(this.width() * 0.5 - this._retry.width() * 0.5), 504);
				}
			}
			if (this._thumb != null) {
				this._thumb.xy(~~(this.width() * 0.5 - this._thumb.width() * 0.5), 240);
			}
			if (this._icon != null) {
				this._icon.xy(101, 220);
			}
			if (this._point != null) {
				this._point.xy(0, 112);
			}
			if (this._km != null) {
				return this._km.xy(336, 144);
			}
		};

		pcResultUiView.prototype.show = function(point, clearType) {
			this._type = clearType;
			this._point.type(["b", "c"][clearType]);
			this._point.setNum(point);
			this._setAyakm(clearType);
			this._setMusicTitle();
			this._setParts();
			return pcResultUiView.__super__.show.call(this);
		};

		pcResultUiView.prototype._eClickTw = function() {
			return root.MY.gl.contents.shareSns(this._conf.SNS_TW);
		};

		pcResultUiView.prototype._eClickFb = function() {
			return root.MY.gl.contents.shareSns(this._conf.SNS_FB);
		};

		pcResultUiView.prototype._eClickRetry = function() {
			return root.MY.gl.contents.retry();
		};

		pcResultUiView.prototype._eClickMovie = function() {
			return root.MY.gl.contents.showMovie();
		};

		pcResultUiView.prototype._setAyakm = function(clearType) {
			if (this._km != null) {
				this._km.dispose();
				this._km = null;
			}
			this._km = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.RESULT_PC + "ayakm" + String(clearType) + ".png", root.MY.app.conf.IMG_RETINA);
			return this.addChild(this._km);
		};

		pcResultUiView.prototype._setMusicTitle = function() {
			var stageId;
			if (this._musicTitle != null) {
				this._musicTitle.dispose();
				this._musicTitle = null;
			}
			stageId = root.MY.gl.game.stageId();
			this._musicTitle = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.GAMEUI + "musicTitle/" + String(stageId) + ".png", root.MY.app.conf.IMG_RETINA);
			this.addChild(this._musicTitle);
			return this._musicTitle.xy(0, 72);
		};

		return pcResultUiView;

	})(root.MY_CLASS.resultUiView);

	root.MY_CLASS.pointUiView = (function(superClass) {
		extend(pointUiView, superClass);

		function pointUiView() {
			this.setPoint = bind(this.setPoint, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			pointUiView.__super__.constructor.call(this, {
				resize: true,
				update: true
			});
			this._container;
			this._num;
			this._txtImg;
			this._conf = root.MY.app.conf;
		}

		pointUiView.prototype.addStage = function() {
			this._container = new root._LIBS.display();
			this.addChild(this._container);
			this._num = new root.MY_CLASS.numView(String(this._conf.MAX_AYAKM).length, "a", [2, 1][this._device]);
			this._container.addChild(this._num);
			this._num.setNum(0);
			this._txtImg = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.GAMEUI + "distance.png", root.MY.app.conf.IMG_RETINA);
			this._txtImg.onLoad = this.resize;
			this._container.addChild(this._txtImg);
			if (this._isSmt) {
				return this._num.xy(-this._num.getSize().w, 24 / 2);
			} else {
				return this._num.xy(-this._num.getSize().w, 24);
			}
		};

		pointUiView.prototype.update = function() {};

		pointUiView.prototype.dispose2 = function() {};

		pointUiView.prototype.resize = function(w, h) {
			if (this._isSmt) {
				this._container.xy(~~(w * 0.5 + this._conf.UI_LIFE_SIZE.WIDTH[this._device] * 0.5), 100 / 2);
			} else {
				this._container.xy(w - 30, 30);
			}
			if (this._txtImg != null) {
				return this._txtImg.xy(-this._txtImg.width(), 0);
			}
		};

		pointUiView.prototype.setPoint = function(val) {
			return this._num.setNum(val);
		};

		return pointUiView;

	})(root._LIBS.display);

	root.MY_CLASS.recordView = (function(superClass) {
		extend(recordView, superClass);

		function recordView(elm) {
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.update = bind(this.update, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			recordView.__super__.constructor.call(this, elm, {
				resize: true,
				update: true
			});
			this._container;
			this._recordImg;
			this._num;
			this._conf = root.MY.app.conf;
			this._anm = {};
		}

		recordView.prototype.addStage = function() {
			var point;
			this._anm.show = new root._LIBS.animation();
			if ((typeof localStorage !== "undefined" && localStorage !== null) && (localStorage.aykm != null)) {
				point = Number(localStorage.aykm);
				this.mask();
				this._container = new root._LIBS.display();
				this.addChild(this._container);
				this._num = new root.MY_CLASS.numView(String(this._conf.MAX_AYAKM).length, "a", [2, 1][this._device]);
				this._container.addChild(this._num);
				this._num.setNum(point);
				this._recordImg = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.GAMEUI + "record.png", root.MY.app.conf.IMG_RETINA);
				this._recordImg.onLoad = this.resize;
				this._container.addChild(this._recordImg);
				if (this._isSmt) {
					this._num.xy(-this._num.getSize().w, 24 / 2);
				} else {
					this._num.xy(-this._num.getSize().w, 24);
				}
			}
			return this.visible(false);
		};

		recordView.prototype.dispose2 = function() {};

		recordView.prototype.resize = function(w, h) {
			if (this._container != null) {
				this.size(w, h);
				if (this._isSmt) {
					this._container.xy(w - 30 / 2, 30 / 2);
				} else {
					this._container.xy(w - 30, 30);
				}
				if (this._recordImg != null) {
					return this._recordImg.xy(-this._recordImg.width(), 0);
				}
			}
		};

		recordView.prototype.update = function() {
			if ((this._container != null) && !this._anm.show.isCompleted()) {
				this._container.translate(this._anm.show.get("x"), this._anm.show.get("y"));
				return this._container.setTransform();
			}
		};

		recordView.prototype.show = function(isAnimate, d) {
			var f, x0, y0;
			if (this._container != null) {
				this.visible(true);
				f = 60;
				if (this._isSmt) {
					x0 = 100 / 2;
					y0 = -100 / 2;
				} else {
					x0 = 100;
					y0 = -100;
				}
				this._anm.show.set({
					x: {
						from: x0,
						to: 0
					},
					y: {
						from: y0,
						to: 0
					},
					frame: f,
					delay: d || 0,
					ease: "easeOutExpo"
				});
				this._anm.show.start();
				return this.update();
			}
		};

		recordView.prototype.hide = function() {
			return this.visible(false);
		};

		return recordView;

	})(root._LIBS.displayContainer);

	root.MY_CLASS.restartView = (function(superClass) {
		extend(restartView, superClass);

		function restartView(elm) {
			this.resize = bind(this.resize, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			restartView.__super__.constructor.call(this, elm, {
				resize: true,
				update: false
			});
			this._restartImg;
			this._bg;
		}

		restartView.prototype.addStage = function() {
			this.zIndex(9999);
			this._bg = new root._LIBS.display();
			this.addChild(this._bg);
			this._bg.bgColor("#000000");
			this._bg.alpha(0.75);
			this._restartImg = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.PARTS + "restart_txt.png", root.MY.app.conf.IMG_RETINA);
			this._restartImg.onLoad = this.resize;
			this.addChild(this._restartImg);
			setInterval(this.update, 200);
			return this.visible(false);
		};

		restartView.prototype.dispose2 = function() {};

		restartView.prototype.update = function() {
			if (document.hasFocus()) {
				return this.visible(false);
			} else {
				return this.visible(true);
			}
		};

		restartView.prototype.resize = function(w, h) {
			this._bg.size(w, h);
			if (this._restartImg != null) {
				return this._restartImg.xy(~~(w * 0.5 - this._restartImg.width() * 0.5), ~~(h * 0.5 - this._restartImg.height() * 0.5));
			}
		};

		return restartView;

	})(root._LIBS.displayContainer);

	root.MY_CLASS.smtResultUiView = (function(superClass) {
		extend(smtResultUiView, superClass);

		function smtResultUiView() {
			this._setMusicTitle = bind(this._setMusicTitle, this);
			this._setAyakm = bind(this._setAyakm, this);
			this._eClickMovie = bind(this._eClickMovie, this);
			this._eClickRetry = bind(this._eClickRetry, this);
			this._eClickLine = bind(this._eClickLine, this);
			this._eClickFb = bind(this._eClickFb, this);
			this._eClickTw = bind(this._eClickTw, this);
			this.show = bind(this.show, this);
			this._setParts = bind(this._setParts, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			smtResultUiView.__super__.constructor.call(this);
			this._base;
			this._tw;
			this._fb;
			this._line;
			this._retry;
			this._retry2;
			this._special;
			this._point;
			this._km;
			this._musicTitle;
			this._type = 0;
		}

		smtResultUiView.prototype.addStage = function() {
			smtResultUiView.__super__.addStage.call(this);
			this._base = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.RESULT_SMT + "share.png", root.MY.app.conf.IMG_RETINA);
			this._base.onLoad = this._setParts;
			this.addChild(this._base);
			this._tw = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.RESULT_SMT + "tw.png", root.MY.app.conf.IMG_RETINA);
			this._tw.onLoad = this._setParts;
			this._tw.onClick = this._eClickTw;
			this.addChild(this._tw);
			this._fb = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.RESULT_SMT + "fb.png", root.MY.app.conf.IMG_RETINA);
			this._fb.onLoad = this._setParts;
			this._fb.onClick = this._eClickFb;
			this.addChild(this._fb);
			this._line = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.RESULT_SMT + "line.png", root.MY.app.conf.IMG_RETINA);
			this._line.onLoad = this._setParts;
			this._line.onClick = this._eClickLine;
			this.addChild(this._line);
			this._retry = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.RESULT_SMT + "retry.png", root.MY.app.conf.IMG_RETINA);
			this._retry.onLoad = this._setParts;
			this._retry.onClick = this._eClickRetry;
			this.addChild(this._retry);
			this._retry2 = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.RESULT_SMT + "retry2.png", root.MY.app.conf.IMG_RETINA);
			this._retry2.onLoad = this._setParts;
			this._retry2.onClick = this._eClickRetry;
			this.addChild(this._retry2);
			this._special = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.RESULT_SMT + "special.png", root.MY.app.conf.IMG_RETINA);
			this._special.onLoad = this._setParts;
			this._special.onClick = this._eClickMovie;
			this.addChild(this._special);
			this._point = new root.MY_CLASS.numView(5, "d", 10 / 2);
			this.addChild(this._point);
			return this._point.setNum(0);
		};

		smtResultUiView.prototype.update = function() {
			return smtResultUiView.__super__.update.call(this);
		};

		smtResultUiView.prototype.dispose2 = function() {
			return smtResultUiView.__super__.dispose2.call(this);
		};

		smtResultUiView.prototype._setParts = function(w, h) {
			switch (this._type) {
				case 0:
					this.size(560 / 2, 282 / 2);
					this._special.visible(false);
					break;
				case 1:
					this.size(560 / 2, 282 / 2);
					this._special.visible(true);
			}
			if (this._base != null) {
				this._base.xy(~~(this.width() * 0.5 - this._base.width() * 0.5), 60 / 2);
			}
			if (this._tw != null) {
				this._tw.xy(196 / 2, 84 / 2);
			}
			if (this._fb != null) {
				this._fb.xy(320 / 2, 84 / 2);
			}
			if (this._line != null) {
				this._line.xy(442 / 2, 84 / 2);
			}
			if (this._retry != null) {
				this._retry.xy(~~(this.width() * 0.5 - this._retry.width() * 0.5), 196 / 2);
			}
			if (this._retry2 != null) {
				this._retry2.xy(284 / 2, 196 / 2);
			}
			if (this._special != null) {
				this._special.xy(0, 198 / 2);
			}
			if (this._point != null) {
				this._point.xy(0, 0);
			}
			if (this._km != null) {
				return this._km.xy(412 / 2, 30 / 2);
			}
		};

		smtResultUiView.prototype.show = function(point, clearType) {
			this._type = clearType;
			if (this._type === 0) {
				this._retry.visible(true);
				this._retry2.visible(false);
			} else {
				this._retry.visible(false);
				this._retry2.visible(true);
			}
			this._point.type(["d", "e"][clearType]);
			this._point.setNum(point);
			this._setAyakm(clearType);
			this._setMusicTitle();
			this._setParts();
			return smtResultUiView.__super__.show.call(this);
		};

		smtResultUiView.prototype._eClickTw = function() {
			return root.MY.gl.contents.shareSns(this._conf.SNS_TW);
		};

		smtResultUiView.prototype._eClickFb = function() {
			return root.MY.gl.contents.shareSns(this._conf.SNS_FB);
		};

		smtResultUiView.prototype._eClickLine = function() {
			return root.MY.gl.contents.shareSns(this._conf.SNS_LINE);
		};

		smtResultUiView.prototype._eClickRetry = function() {
			return root.MY.gl.contents.retry();
		};

		smtResultUiView.prototype._eClickMovie = function() {
			return root.MY.gl.contents.showMovie();
		};

		smtResultUiView.prototype._setAyakm = function(clearType) {
			if (this._km != null) {
				this._km.dispose();
				this._km = null;
			}
			this._km = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.RESULT_SMT + "ayakm" + String(clearType) + ".png", root.MY.app.conf.IMG_RETINA);
			return this.addChild(this._km);
		};

		smtResultUiView.prototype._setMusicTitle = function() {
			var stageId;
			if (this._musicTitle != null) {
				this._musicTitle.dispose();
				this._musicTitle = null;
			}
			stageId = root.MY.gl.game.stageId();
			this._musicTitle = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.GAMEUI + "musicTitle/" + String(stageId) + ".png", root.MY.app.conf.IMG_RETINA);
			this._musicTitle.onLoad = (function(_this) {
				return function() {
					return _this._musicTitle.xy(~~(_this.width() * 0.5 - _this._musicTitle.width() * 0.5), -30);
				};
			})(this);
			return this.addChild(this._musicTitle);
		};

		return smtResultUiView;

	})(root.MY_CLASS.resultUiView);

	root.MY_CLASS.sorryView = (function(superClass) {
		extend(sorryView, superClass);

		function sorryView(elm) {
			this._eClickBanner = bind(this._eClickBanner, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			sorryView.__super__.constructor.call(this, elm, {
				resize: true,
				update: true
			});
			this._container;
			this._bg;
			this._banner;
			this._panel;
			this._conf = root.MY.app.conf;
		}

		sorryView.prototype.addStage = function() {
			this.mask();
			this._bg = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.SORRY + "bg.jpg", root.MY.app.conf.IMG_RETINA);
			this._bg.onLoad = this.resize;
			this.addChild(this._bg);
			this._container = new root._LIBS.display();
			this.addChild(this._container);
			this._panel = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.SORRY + "sorry.png", root.MY.app.conf.IMG_RETINA);
			this._panel.onLoad = this.resize;
			this._container.addChild(this._panel);
			this._banner = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.FOOTER + "banner0.png", root.MY.app.conf.IMG_RETINA);
			this._banner.onLoad = this.resize;
			this._banner.onClick = this._eClickBanner;
			return this._container.addChild(this._banner);
		};

		sorryView.prototype.update = function() {};

		sorryView.prototype.dispose2 = function() {};

		sorryView.prototype.resize = function(w, h) {
			var scale;
			this.size(w, h);
			if (this._panel != null) {
				this._container.size(this._panel.width(), this._panel.height());
			}
			if (this._banner != null) {
				this._banner.x(~~(this._container.width() * 0.5 - this._banner.width() * 0.5));
				if (this._isSmt) {
					this._banner.y(this._container.height() - 120 / 2);
				} else {
					this._banner.y(this._container.height() - 120);
				}
			}
			this._container.xy(~~(w * 0.5 - this._container.width() * 0.5), ~~(h * 0.5 - this._container.height() * 0.5));
			if (this._bg != null) {
				if (Modernizr.csstransforms && !root.MY.myfw.conf.IS_ADR) {
					scale = w / this._bg.width();
					if (this._bg.height() * scale < h) {
						scale = h / this._bg.height();
					}
					this._bg.set3d(0, 0);
					this._bg.scale(scale, scale);
					this._bg.setTransform();
					return this._bg.xy(~~(w * 0.5 - this._bg.width() * scale * 0.5), ~~(h * 0.5 - this._bg.height() * scale * 0.5));
				} else {
					return this._bg.xy(~~(w * 0.5 - this._bg.width() * 0.5), ~~(h * 0.5 - this._bg.height() * 0.5));
				}
			}
		};

		sorryView.prototype._eClickBanner = function() {
			return window.open(this._conf.LINK_SP_SITE, "");
		};

		return sorryView;

	})(root._LIBS.displayContainer);

	root.MY_CLASS.stgIntervalClearView = (function(superClass) {
		extend(stgIntervalClearView, superClass);

		function stgIntervalClearView(option) {
			this.show = bind(this.show, this);
			this.setStageNum = bind(this.setStageNum, this);
			this._setParts = bind(this._setParts, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			stgIntervalClearView.__super__.constructor.call(this, {
				bgColor: "#920783"
			});
			this._strClear;
			this._strStage;
			this._strStageNum;
		}

		stgIntervalClearView.prototype.addStage = function() {
			stgIntervalClearView.__super__.addStage.call(this);
			this._strStageNum = new root.MY_CLASS.numView(1, "b", [12, 6][this._device]);
			this.addChild(this._strStageNum);
			this._strStageNum.setNum(3);
			this._strClear = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.CLEAR + "txt0.png", root.MY.app.conf.IMG_RETINA);
			this._strClear.onLoad = this._setParts;
			this.addChild(this._strClear);
			this._strStage = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.CLEAR + "txt1.png", root.MY.app.conf.IMG_RETINA);
			this._strStage.onLoad = this._setParts;
			this.addChild(this._strStage);
			return this._setParts();
		};

		stgIntervalClearView.prototype.update = function() {
			return stgIntervalClearView.__super__.update.call(this);
		};

		stgIntervalClearView.prototype.dispose2 = function() {};

		stgIntervalClearView.prototype._setParts = function(w, h) {
			var margin, strw;
			if (this._strStage != null) {
				margin = [38, 19][this._device];
				strw = this._strStage.width() + margin + this._strStageNum.getSize().w;
				this._strStage.xy(~~(this._bg.width() * 0.5 - strw * 0.5), [68, 68 / 2][this._device]);
				this._strStageNum.xy(this._strStage.right() + margin, this._strStage.y());
			}
			if (this._strClear != null) {
				return this._strClear.xy(~~(this._bg.width() * 0.5 - this._strClear.width() * 0.5), [154, 154 / 2][this._device]);
			}
		};

		stgIntervalClearView.prototype.setStageNum = function(num) {
			this._strStageNum.keta(String(num).length);
			return this._strStageNum.setNum(num);
		};

		stgIntervalClearView.prototype.show = function(num) {
			this.setStageNum(num);
			return stgIntervalClearView.__super__.show.call(this);
		};

		return stgIntervalClearView;

	})(root.MY_CLASS.clearTextView);

	root.MY_CLASS.stgIntervalNextView = (function(superClass) {
		extend(stgIntervalNextView, superClass);

		function stgIntervalNextView(option) {
			this._setHit = bind(this._setHit, this);
			this._setDotAnimation = bind(this._setDotAnimation, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this._setParts = bind(this._setParts, this);
			this._setDot = bind(this._setDot, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			stgIntervalNextView.__super__.constructor.call(this, {
				bgColor: "#920783"
			});
			this._str0;
			this._str1;
			this._dotContainer;
			this._dot = [];
		}

		stgIntervalNextView.prototype.addStage = function() {
			stgIntervalNextView.__super__.addStage.call(this);
			this._str0 = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.CLEAR + "txt2.png", root.MY.app.conf.IMG_RETINA);
			this._str0.onLoad = this._setParts;
			this.addChild(this._str0);
			this._setDot();
			return this._setParts();
		};

		stgIntervalNextView.prototype.update = function() {
			return stgIntervalNextView.__super__.update.call(this);
		};

		stgIntervalNextView.prototype.dispose2 = function() {};

		stgIntervalNextView.prototype._setDot = function() {
			var dot, i, margin, num;
			this._dotContainer = new root._LIBS.display();
			this.addChild(this._dotContainer);
			i = 0;
			num = 3;
			margin = [10, 5][this._device];
			while (i < num) {
				dot = new root.MY_CLASS.dot2d();
				this._dotContainer.addChild(dot);
				dot.x((dot.width() + margin) * i);
				this._dot.push(dot);
				i++;
			}
			return this._dotContainer.size(this._dot[num - 1].right(), this._dot[num - 1].height());
		};

		stgIntervalNextView.prototype._setParts = function(w, h) {
			if (this._str0 != null) {
				if (this._str1 != null) {
					this._str0.xy(~~(this._bg.width() * 0.5 - this._str0.width() * 0.5), [40, 20][this._device]);
				} else {
					this._str0.xy(~~(this._bg.width() * 0.5 - this._str0.width() * 0.5), [50, 25][this._device]);
				}
			}
			if (this._str1 != null) {
				this._str1.xy(~~(this._bg.width() * 0.5 - this._str1.width() * 0.5), [172, 172 / 2][this._device]);
			}
			if (this._dotContainer != null) {
				if (this._str1 != null) {
					return this._dotContainer.xy(~~(this._bg.width() * 0.5 - this._dotContainer.width() * 0.5), [236, 236 / 2][this._device]);
				} else {
					return this._dotContainer.xy(~~(this._bg.width() * 0.5 - this._dotContainer.width() * 0.5), [226, 226 / 2][this._device]);
				}
			}
		};

		stgIntervalNextView.prototype.show = function() {
			stgIntervalNextView.__super__.show.call(this);
			this._setDotAnimation(true);
			this._setHit();
			return this._setParts();
		};

		stgIntervalNextView.prototype.hide = function() {
			stgIntervalNextView.__super__.hide.call(this);
			return this._setDotAnimation(false);
		};

		stgIntervalNextView.prototype._setDotAnimation = function(flg) {
			var i, j, len1, ref, results, val;
			ref = this._dot;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (flg) {
					results.push(val.start(i * 40));
				} else {
					results.push(val.stop());
				}
			}
			return results;
		};

		stgIntervalNextView.prototype._setHit = function() {
			var hintKey;
			if (this._str1 != null) {
				this._str1.dispose();
				this._str1 = null;
			}
			hintKey = root.MY.gl.game.stageId();
			this._str1 = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.CLEAR + "hint/hint" + String(hintKey) + ".png", root.MY.app.conf.IMG_RETINA);
			this._str1.onLoad = this._setParts;
			return this.addChild(this._str1);
		};

		return stgIntervalNextView;

	})(root.MY_CLASS.clearTextView);

	root.MY_CLASS.stgIntervalTitleView = (function(superClass) {
		extend(stgIntervalTitleView, superClass);

		function stgIntervalTitleView() {
			this.setTitle = bind(this.setTitle, this);
			this.setStageNum = bind(this.setStageNum, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this._setParts = bind(this._setParts, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			stgIntervalTitleView.__super__.constructor.call(this, {
				bgColor: "#920783"
			});
			this._strStageNum;
			this._str0;
			this._str1;
		}

		stgIntervalTitleView.prototype.addStage = function() {
			stgIntervalTitleView.__super__.addStage.call(this);
			this._strStageNum = new root.MY_CLASS.numView(1, "b", [12, 6][this._device]);
			this.addChild(this._strStageNum);
			this._strStageNum.setNum(3);
			this._str0 = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.CLEAR + "txt1.png", root.MY.app.conf.IMG_RETINA);
			this._str0.onLoad = this._setParts;
			this.addChild(this._str0);
			return this._setParts();
		};

		stgIntervalTitleView.prototype.update = function() {
			return stgIntervalTitleView.__super__.update.call(this);
		};

		stgIntervalTitleView.prototype.dispose2 = function() {};

		stgIntervalTitleView.prototype._setParts = function(w, h) {
			var margin, strw;
			if (this._str0 != null) {
				margin = [38, 19][this._device];
				strw = this._str0.width() + margin + this._strStageNum.getSize().w;
				this._str0.xy(~~(this._bg.width() * 0.5 - strw * 0.5), [66, 66 / 2][this._device]);
				this._strStageNum.xy(this._str0.right() + margin, this._str0.y());
			}
			if (this._str1 != null) {
				return this._str1.xy(~~(this._bg.width() * 0.5 - this._str1.width() * 0.5), [150, 150 / 2][this._device]);
			}
		};

		stgIntervalTitleView.prototype.show = function() {
			return stgIntervalTitleView.__super__.show.call(this);
		};

		stgIntervalTitleView.prototype.hide = function(delay) {
			return stgIntervalTitleView.__super__.hide.call(this, delay);
		};

		stgIntervalTitleView.prototype.setStageNum = function(num) {
			this._strStageNum.keta(String(num).length);
			return this._strStageNum.setNum(num);
		};

		stgIntervalTitleView.prototype.setTitle = function(clearStgNum) {
			var color;
			if (this._str1 != null) {
				this._str1.dispose();
				this._str1 = null;
			}
			this._str1 = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.CLEAR + "title/title" + String(clearStgNum % this._conf.STAGE_NUM) + ".png", root.MY.app.conf.IMG_RETINA);
			this._str1.onLoad = this._setParts;
			this.addChild(this._str1);
			color = new THREE.Color(this._conf.RAINBOW_COLOR[clearStgNum % this._conf.STAGE_NUM]);
			return this._bg.bgColor("#" + color.getHexString());
		};

		return stgIntervalTitleView;

	})(root.MY_CLASS.clearTextView);

	root.MY_CLASS.stgIntervalView = (function(superClass) {
		extend(stgIntervalView, superClass);

		function stgIntervalView() {
			this.hideTitle = bind(this.hideTitle, this);
			this.showTitle = bind(this.showTitle, this);
			this.hideNext = bind(this.hideNext, this);
			this.showNext = bind(this.showNext, this);
			this.hideClear = bind(this.hideClear, this);
			this.showClear = bind(this.showClear, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			stgIntervalView.__super__.constructor.call(this, {
				resize: true,
				update: true
			});
			this._clear;
			this._next;
			this._title;
		}

		stgIntervalView.prototype.addStage = function() {
			this._clear = new root.MY_CLASS.stgIntervalClearView();
			this.addChild(this._clear);
			this._next = new root.MY_CLASS.stgIntervalNextView();
			this.addChild(this._next);
			this._title = new root.MY_CLASS.stgIntervalTitleView();
			return this.addChild(this._title);
		};

		stgIntervalView.prototype.update = function() {};

		stgIntervalView.prototype.dispose2 = function() {};

		stgIntervalView.prototype.resize = function(w, h) {};

		stgIntervalView.prototype.showClear = function(clearStgNum) {
			return this._clear.show(clearStgNum);
		};

		stgIntervalView.prototype.hideClear = function() {
			return this._clear.hide();
		};

		stgIntervalView.prototype.showNext = function() {
			return this._next.show();
		};

		stgIntervalView.prototype.hideNext = function() {
			return this._next.hide();
		};

		stgIntervalView.prototype.showTitle = function(clearStgNum) {
			this._title.setStageNum(clearStgNum + 1);
			this._title.setTitle(clearStgNum);
			return this._title.show();
		};

		stgIntervalView.prototype.hideTitle = function() {
			return this._title.hide();
		};

		return stgIntervalView;

	})(root._LIBS.display);

	root.MY_CLASS.systemView = (function(superClass) {
		extend(systemView, superClass);

		function systemView(elm) {
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			systemView.__super__.constructor.call(this, elm);
			this._system;
		}

		systemView.prototype.addStage = function() {
			systemView.__super__.addStage.call(this);
			this._system = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.SYSTEM + "system.png", root.MY.app.conf.IMG_RETINA);
			return this._container.unshiftChild(this._system);
		};

		systemView.prototype.dispose2 = function() {
			if (this._system != null) {
				this._system.dispose();
				this._system = null;
			}
			return systemView.__super__.dispose2.call(this);
		};

		systemView.prototype.resize = function(w, h) {
			return systemView.__super__.resize.call(this, w, h);
		};

		return systemView;

	})(root.MY_CLASS.pageView);

	root.MY_CLASS.topTitleView = (function(superClass) {
		extend(topTitleView, superClass);

		function topTitleView() {
			this.show = bind(this.show, this);
			this._makeRect = bind(this._makeRect, this);
			this._setParts = bind(this._setParts, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this._getImgName = bind(this._getImgName, this);
			this.addStage = bind(this.addStage, this);
			topTitleView.__super__.constructor.call(this, {
				update: true
			});
			this._title;
			this._rect = [];
			this.onLoad;
		}

		topTitleView.prototype.addStage = function() {
			this._title = new root._LIBS.displayImage(this._getImgName("title"), root.MY.app.conf.IMG_RETINA);
			this._title.onLoad = this._setParts;
			this.addChild(this._title);
			return this._makeRect();
		};

		topTitleView.prototype._getImgName = function(name) {
			return root.MY.app.conf.PATH_IMG.TOP + name + String(this._device) + ".png";
		};

		topTitleView.prototype.dispose2 = function() {
			var i, j, len1, ref, val;
			if (this._title != null) {
				this._title.dispose();
				this._title = null;
			}
			if (this._rect != null) {
				ref = this._rect;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					val.dispose();
					this._rect[i] = null;
				}
				this._rect = null;
			}
			return this.onLoad = null;
		};

		topTitleView.prototype.update = function() {};

		topTitleView.prototype._setParts = function(w, h) {
			this.size(this._title.width(), this._title.height());
			if (this.onLoad != null) {
				return this.onLoad();
			}
		};

		topTitleView.prototype._makeRect = function() {
			var data, i, j, len1, rect, results, val;
			data = [
				{
					color: "#e60012",
					x: 12,
					y: 105,
					rot: 180
				}, {
					color: "#f39800",
					x: 123,
					y: 88,
					rot: 0
				}, {
					color: "#fff100",
					x: 165,
					y: 129,
					rot: 240
				}, {
					color: "#90c31f",
					x: 280,
					y: 88,
					rot: 0
				}, {
					color: "#00a0e9",
					x: 341,
					y: 99,
					rot: -90
				}, {
					color: "#1d2088",
					x: 426,
					y: 90,
					rot: 0
				}, {
					color: "#920783",
					x: 530,
					y: 99,
					rot: -90
				}, {
					color: "#e4007f",
					x: 592,
					y: 93,
					rot: 0,
					h: 37
				}
			];
			results = [];
			for (i = j = 0, len1 = data.length; j < len1; i = ++j) {
				val = data[i];
				rect = new root.MY_CLASS.rect2d(val);
				this.unshiftChild(rect);
				rect.xy(val.x, val.y - 14);
				rect.set3d(0, 0);
				rect.rotate(0, 0, val.rot);
				rect.setTransform();
				results.push(this._rect.push(rect));
			}
			return results;
		};

		topTitleView.prototype.show = function(d) {
			var i, j, len1, ref, results, val;
			ref = this._rect;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				results.push(val.show(d + i * 8));
			}
			return results;
		};

		return topTitleView;

	})(root._LIBS.display);

	root.MY_CLASS.topUiView = (function(superClass) {
		extend(topUiView, superClass);

		function topUiView(elm) {
			this._eClickSystem = bind(this._eClickSystem, this);
			this._eClickHelp = bind(this._eClickHelp, this);
			this._eClickStart = bind(this._eClickStart, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this._setParts = bind(this._setParts, this);
			this.update = bind(this.update, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this._getImgName = bind(this._getImgName, this);
			this.addStage = bind(this.addStage, this);
			topUiView.__super__.constructor.call(this, elm, {
				resize: true,
				update: true
			});
			this._title;
			this._start;
			this._help;
			this._system;
			this._andAtn;
			this._anm = {};
			this._conf = root.MY.app.conf;
			this._isShowAnimation = false;
			this._isShowed = false;
			this.onClickStart;
		}

		topUiView.prototype.addStage = function() {
			if (this._isSmt) {
				this.size(560 / 2, 390 / 2);
			} else {
				this.size(638, 394);
			}
			this.set3d(this.width() * 0.5, this.height() * 0.5);
			if (this._isSmt) {
				this._title = new root._LIBS.displayImage(this._getImgName("title"), root.MY.app.conf.IMG_RETINA);
			} else {
				this._title = new root.MY_CLASS.topTitleView();
			}
			this._title.onLoad = this._setParts;
			this.addChild(this._title);
			this._start = new root.MY_CLASS.startBtn(this._getImgName("start"), root.MY.app.conf.IMG_RETINA);
			this._start.onLoad = this._setParts;
			this._start.onClick = this._eClickStart;
			this.addChild(this._start);
			this._help = new root.MY_CLASS.imgBtn2d(this._getImgName("help"), root.MY.app.conf.IMG_RETINA, {
				onImg: true
			});
			this._help.onLoad = this._setParts;
			this._help.onClick = this._eClickHelp;
			this.addChild(this._help);
			if (this._isSmt) {
				this._system = new root.MY_CLASS.imgBtn2d(this._getImgName("system"), root.MY.app.conf.IMG_RETINA);
				this._system.onLoad = this._setParts;
				this._system.onClick = this._eClickSystem;
				this.addChild(this._system);
			}
			if (root.MY.myfw.conf.IS_ADR) {
				this._andAtn = new root._LIBS.displayImage(this._getImgName("atn"), root.MY.app.conf.IMG_RETINA);
				this._andAtn.onLoad = this._setParts;
				this.addChild(this._andAtn);
			}
			this._anm.show = new root._LIBS.animation();
			return this.visible(false);
		};

		topUiView.prototype._getImgName = function(name) {
			return root.MY.app.conf.PATH_IMG.TOP + name + String(this._device) + ".png";
		};

		topUiView.prototype.dispose2 = function() {
			if (this._google != null) {
				this._google.dispose();
				this._google = null;
			}
			if (this._title != null) {
				this._title.dispose();
				this._title = null;
			}
			if (this._start != null) {
				this._start.dispose();
				this._start = null;
			}
			if (this._help != null) {
				this._help.dispose();
				this._help = null;
			}
			if (this._system != null) {
				this._system.dispose();
				this._system = null;
			}
			if ((this._anm != null) && (this._anm.show != null)) {
				this._anm.show.dispose();
				this._anm.show = null;
				this._anm = null;
			}
			this._conf = null;
			return this.onClickStart = null;
		};

		topUiView.prototype.resize = function(w, h) {
			this.xy(~~(w * 0.5 - this.width() * 0.5), ~~(h * 0.5 - this.height() * 0.5));
			if (this._isSmt) {
				this.y(this.y() - 30);
			}
			if (this._andAtn != null) {
				return this.y(this.y() - 20);
			}
		};

		topUiView.prototype.update = function() {
			var s;
			if (this._isShowAnimation && !this._anm.show.isCompleted()) {
				if (this._anm.show.isStart()) {
					this.visible(true);
				}
				if (this._isSmt) {
					s = this._anm.show.get("scale");
					this.scale(s, s);
					this.setTransform();
					this.alpha(this._anm.show.get("opacity"));
				} else {
					s = this._anm.show.get("scale");
					this.scale(s, s);
					this.setTransform();
					this.alpha(this._anm.show.get("opacity"));
				}
				if (this._anm.show.isCompleted()) {
					return this._isShowed = true;
				}
			}
		};

		topUiView.prototype._setParts = function(w, h) {
			if (this._title != null) {
				this._title.xy(~~(this.width() * 0.5 - this._title.width() * 0.5), 0);
			}
			if (this._start != null) {
				this._start.xy(~~(this.width() * 0.5 - this._start.width() * 0.5), [255, 208 / 2][this._device]);
			}
			if (this._help != null) {
				if (this._isSmt) {
					this._help.xy(0, 318 / 2);
				} else {
					this._help.xy(~~(this.width() * 0.5 - this._help.width() * 0.5), 350);
				}
			}
			if (this._system != null) {
				this._system.xy(286 / 2, 318 / 2);
			}
			if (this._andAtn != null) {
				return this._andAtn.xy(~~(this.width() * 0.5 - this._andAtn.width() * 0.5), 406 / 2);
			}
		};

		topUiView.prototype.show = function(isAnimate, d) {
			var d2;
			if (this._isShowAnimation) {
				return;
			}
			this._isShowAnimation = true;
			this.visible(true);
			if (this._isSmt) {
				this._anm.show.set({
					scale: {
						from: 0.9,
						to: 1
					},
					opacity: {
						from: 0,
						to: 1
					},
					frame: 60,
					delay: d
				});
				this._anm.show.start();
				this.visible(false);
			} else {
				this._anm.show.set({
					scale: {
						from: 0.9,
						to: 1
					},
					opacity: {
						from: 0,
						to: 1
					},
					frame: 60,
					delay: d
				});
				this._anm.show.start();
			}
			root.MY.gl.bg.show(this._conf.BG_OPACITY[0], d + 150);
			d2 = d + [30, 30][this._device];
			root.MY.gl.footer.show(true, d2);
			root.MY.gl.record.show(true, d2);
			if (!this._isSmt) {
				this._title.show(d);
			}
			return this.update();
		};

		topUiView.prototype.hide = function() {
			this._isShowAnimation = false;
			this.visible(false);
			this._start.stopEffect();
			root.MY.gl.bg.hide();
			return root.MY.gl.footer.hide();
		};

		topUiView.prototype._eClickStart = function() {
			if (!this._isShowed) {
				return;
			}
			if (this.onClickStart != null) {
				return this.onClickStart();
			}
		};

		topUiView.prototype._eClickHelp = function() {
			if (!this._isShowed) {
				return;
			}
			return root.MY.gl.contents.showHelp();
		};

		topUiView.prototype._eClickSystem = function() {
			if (!this._isShowed) {
				return;
			}
			return root.MY.gl.contents.showSystem();
		};

		return topUiView;

	})(root._LIBS.displayContainer);

	root.MY_CLASS.uiMouse = (function(superClass) {
		extend(uiMouse, superClass);

		function uiMouse() {
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			uiMouse.__super__.constructor.call(this, {
				resize: true,
				update: true
			});
			this._mouseImg;
			this._interaction;
		}

		uiMouse.prototype.addStage = function() {
			this._interaction = root.MY.gl.interaction;
			this._mouseImg = new root._LIBS.displayImage("./assets/img/mouse.png");
			return this.addChild(this._mouseImg);
		};

		uiMouse.prototype.update = function() {
			var mx, my;
			mx = this._interaction.mouse().x;
			my = this._interaction.mouse().y;
			this._mouseImg.translate(mx - this._mouseImg.width() * 0.5, my - this._mouseImg.height() * 0.5);
			return this._mouseImg.setTransform();
		};

		uiMouse.prototype.dispose2 = function() {};

		uiMouse.prototype.resize = function(w, h) {};

		return uiMouse;

	})(root._LIBS.display);

	root.MY_CLASS.animationChara = (function(superClass) {
		extend(animationChara, superClass);

		function animationChara() {
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			animationChara.__super__.constructor.call(this, {
				addScene: false
			});
			this._mesh;
			this._ray;
			this._hitList = [];
		}

		animationChara.prototype.start = function() {
			var geometry, material, size;
			animationChara.__super__.start.call(this);
			this._ray = new THREE.Raycaster();
			size = 50;
			geometry = new THREE.PlaneBufferGeometry(size, size);
			material = new THREE.MeshBasicMaterial({
				color: 0xff0000
			});
			this._mesh = new THREE.Mesh(geometry, material);
			this._container.add(this._mesh);
			this._mesh.position.x += this._u.range(100);
			this._mesh.position.y += this._u.range(100);
			return this._hitList.push(this._mesh);
		};

		animationChara.prototype.update = function() {
			var intersects, vec, x, y;
			animationChara.__super__.update.call(this);
			x = (this._interaction.mouse().x / root.MY.myfw.stageWidth()) * 2 - 1;
			y = -(this._interaction.mouse().y / root.MY.myfw.stageHeight()) * 2 + 1;
			vec = new THREE.Vector3(x, y, 1);
			vec.unproject(this._camera);
			vec = vec.sub(this._camera.position).normalize();
			this._ray.set(this._camera.position, vec);
			return intersects = this._ray.intersectObjects(this._hitList);
		};

		animationChara.prototype.dispose = function() {
			return animationChara.__super__.dispose.call(this);
		};

		return animationChara;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.comboMax = (function(superClass) {
		extend(comboMax, superClass);

		function comboMax() {
			this._setDot = bind(this._setDot, this);
			this._setLine = bind(this._setLine, this);
			this.show = bind(this.show, this);
			this.reset = bind(this.reset, this);
			this.dispose = bind(this.dispose, this);
			this._updateDot = bind(this._updateDot, this);
			this._updateLine = bind(this._updateLine, this);
			this.update = bind(this.update, this);
			this._makeDot = bind(this._makeDot, this);
			this._makeLine = bind(this._makeLine, this);
			this.start = bind(this.start, this);
			comboMax.__super__.constructor.call(this);
			this._line = [];
			this._lineAnm = [];
			this._dot = [];
			this._dotAnm = [];
			this._startDelay = 10;
			this._startDelayInterval = 6;
			this._isLineShowed = true;
			this._isDotShowed = true;
		}

		comboMax.prototype.start = function() {
			comboMax.__super__.start.call(this);
			this._makeLine();
			return this._makeDot();
		};

		comboMax.prototype._makeLine = function() {
			var anm, geometry, i, line, material, num, results;
			i = 0;
			num = this._conf.MAX_COMBO;
			results = [];
			while (i < num) {
				geometry = new THREE.TorusGeometry(6, 0.5, 32, 32);
				material = new THREE.MeshBasicMaterial({
					color: this._conf.RAINBOW_COLOR[i],
					transparent: true,
					opacity: 0,
					depthTest: false,
					blending: THREE.CustomBlending,
					blendSrc: THREE[this._conf.BLEND[4]],
					blendDst: THREE[this._conf.BLEND[3]],
					blendEquation: THREE.AddEquation
				});
				line = new THREE.Mesh(geometry, material);
				line.visible = false;
				this._container.add(line);
				this._line.push(line);
				anm = new root._LIBS.animation();
				this._lineAnm.push(anm);
				results.push(i++);
			}
			return results;
		};

		comboMax.prototype._makeDot = function() {
			var anm, geometry, i, material, num, obj, results;
			i = 0;
			num = this._conf.MAX_COMBO;
			results = [];
			while (i < num) {
				geometry = new THREE.CircleGeometry(20, 32);
				material = new THREE.MeshBasicMaterial({
					color: this._conf.RAINBOW_COLOR[i],
					transparent: true,
					opacity: 1,
					blending: THREE.NormalBlending,
					depthTest: false
				});
				obj = new THREE.Mesh(geometry, material);
				this._container.add(obj);
				obj.visible = false;
				this._dot.push(obj);
				anm = new root._LIBS.animation();
				this._dotAnm.push(anm);
				results.push(i++);
			}
			return results;
		};

		comboMax.prototype.update = function() {
			comboMax.__super__.update.call(this);
			if (!this._isLineShowed || !this._isDotShowed) {
				this._updateLine();
				if (this._isLineShowed && this._isDotShowed) {
					return this.reset();
				}
			}
		};

		comboMax.prototype._updateLine = function() {
			var anm, i, j, len1, lineDeadCnt, ref, scale, val;
			lineDeadCnt = 0;
			ref = this._line;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				anm = this._lineAnm[i];
				if (anm.isStart()) {
					val.visible = true;
					scale = anm.get("scale");
					val.scale.set(scale, scale, scale);
					val.material.opacity = anm.get("opacity");
					if (anm.isCompleted()) {
						lineDeadCnt++;
						val.visible = false;
					}
				}
			}
			if (lineDeadCnt >= this._line.length) {
				return this._isLineShowed = true;
			}
		};

		comboMax.prototype._updateDot = function() {
			var anm, dotDeadCnt, i, j, len1, ref, scale, val;
			dotDeadCnt = 0;
			ref = this._dot;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				anm = this._dotAnm[i];
				if (anm.isStart()) {
					val.visible = true;
					scale = anm.get("scale");
					val.scale.set(scale, scale, scale);
					val.material.opacity = anm.get("opacity");
					if (anm.isCompleted()) {
						dotDeadCnt++;
						val.visible = false;
					}
				}
			}
			if (dotDeadCnt >= this._dot.length) {
				return this._isDotShowed = true;
			}
		};

		comboMax.prototype.dispose = function() {
			return comboMax.__super__.dispose.call(this);
		};

		comboMax.prototype.reset = function() {
			this._isLineShowed = true;
			return this._isDotShowed = true;
		};

		comboMax.prototype.show = function(point) {
			comboMax.__super__.show.call(this);
			if (!this._isSmt) {
				root.MY.gl.main.startBrightAnimation([40, 20][this._device], 0, "easeInExpo", 0.2);
			}
			this.reset();
			this._isLineShowed = false;
			return this._setLine(point);
		};

		comboMax.prototype._setLine = function(point) {
			var anm, i, j, len1, ref, results, val;
			ref = this._line;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.position.copy(point[i]);
				val.visible = false;
				anm = this._lineAnm[i];
				anm.set({
					scale: {
						from: [15, 15][this._device],
						to: 0.01
					},
					opacity: {
						from: 1,
						to: 1
					},
					frame: [60, 30][this._device],
					delay: this._startDelay + this._startDelayInterval * i,
					ease: "easeOutExpo"
				});
				results.push(anm.start());
			}
			return results;
		};

		comboMax.prototype._setDot = function(point) {
			var anm, i, j, len1, ref, results, val;
			ref = this._dot;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.position.copy(point[i]);
				val.visible = false;
				anm = this._dotAnm[i];
				anm.set({
					scale: {
						from: 0.1,
						to: 6
					},
					opacity: {
						from: 1,
						to: 1
					},
					frame: 40,
					delay: this._startDelay + i * this._startDelayInterval,
					ease: "easeOutExpo"
				});
				results.push(anm.start());
			}
			return results;
		};

		return comboMax;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.doors = (function(superClass) {
		extend(doors, superClass);

		function doors() {
			this.open = bind(this.open, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			doors.__super__.constructor.call(this, {
				addScene: false
			});
			this._left;
			this._right;
			this._anm = {};
			this._isOpenAnimation = false;
		}

		doors.prototype.start = function() {
			var leftObj, leftWidth, rightObj, rightWidth;
			doors.__super__.start.call(this);
			this._anm.left = new root._LIBS.animation();
			this._anm.right = new root._LIBS.animation();
			this._left = new THREE.Object3D();
			this._container.add(this._left);
			leftObj = root.MY.gl.data.getCmnObj3D("doorLeft");
			this._left.add(leftObj);
			leftWidth = this.widthFromBBox(leftObj.children[0].geometry.boundingBox);
			leftObj.position.x = leftWidth;
			this._left.position.x = -leftWidth;
			this._left.rotation.y = this._u.radian(0);
			this._right = new THREE.Object3D();
			this._container.add(this._right);
			rightObj = root.MY.gl.data.getCmnObj3D("doorRight");
			this._right.add(rightObj);
			rightWidth = this.widthFromBBox(leftObj.children[0].geometry.boundingBox);
			rightObj.position.x = -rightWidth;
			this._right.position.x = rightWidth;
			return this._right.rotation.y = this._u.radian(0);
		};

		doors.prototype.update = function() {
			doors.__super__.update.call(this);
			if (this._container.visible != null) {
				if (!this._anm.left.isCompleted()) {
					this._left.rotation.y = this._anm.left.get("ry");
				}
				if (!this._anm.right.isCompleted()) {
					return this._right.rotation.y = this._anm.right.get("ry");
				}
			}
		};

		doors.prototype.dispose = function() {
			return doors.__super__.dispose.call(this);
		};

		doors.prototype.show = function() {
			doors.__super__.show.call(this);
			this._anm.left.reset();
			this._anm.right.reset();
			this._left.rotation.y = this._u.radian(0);
			this._right.rotation.y = this._u.radian(0);
			return this._isOpenAnimation = false;
		};

		doors.prototype.hide = function() {
			doors.__super__.hide.call(this);
			this._anm.left.reset();
			this._anm.right.reset();
			return this._isOpenAnimation = false;
		};

		doors.prototype.open = function() {
			var e, f;
			if (this._isOpenAnimation) {
				return;
			}
			this._isOpenAnimation = true;
			f = 400;
			e = "easeInOutExpo";
			this._anm.left.set({
				ry: {
					from: 0,
					to: this._u.radian(-90)
				},
				frame: f,
				delay: 0,
				ease: e
			});
			this._anm.left.start();
			this._anm.right.set({
				ry: {
					from: 0,
					to: this._u.radian(90)
				},
				frame: f,
				delay: 0,
				ease: e
			});
			return this._anm.right.start();
		};

		return doors;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.drawingLine = (function(superClass) {
		extend(drawingLine, superClass);

		function drawingLine(color, radius) {
			this.show = bind(this.show, this);
			this._makeLine = bind(this._makeLine, this);
			this.dispose = bind(this.dispose, this);
			this._updateLine = bind(this._updateLine, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			drawingLine.__super__.constructor.call(this, {
				addScene: false
			});
			this._color = color;
			this._radius = radius;
			this._line;
			this._anm = {};
			this._v = [];
			this._vNum = 120;
			this._rotSpeed = {};
		}

		drawingLine.prototype.start = function() {
			drawingLine.__super__.start.call(this);
			this._anm.show = new root._LIBS.animation();
			this._anm.hide = new root._LIBS.animation();
			return this._makeLine();
		};

		drawingLine.prototype.update = function() {
			var s;
			drawingLine.__super__.update.call(this);
			if (this._container.visible) {
				this._updateLine();
				s = this._anm.hide.get("scale");
				this._container.scale.set(s, s, s);
				if (this._anm.hide.isCompleted()) {
					this._container.visible = false;
				}
				this._container.rotation.x += this._rotSpeed.x;
				this._container.rotation.y += this._rotSpeed.y;
				return this._container.rotation.z += this._rotSpeed.z;
			}
		};

		drawingLine.prototype._updateLine = function() {
			var geometry, i, j, key, len1, ref, val;
			if (!this._anm.show.isCompleted()) {
				key = ~~(this._anm.show.get("key"));
				if (this._v.length - key < 6) {
					key = this._v.length - 1;
				}
				geometry = this._line.geometry;
				ref = this._v;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					geometry.vertices[i].x = this._v[Math.min(i, key)].x;
					geometry.vertices[i].y = this._v[Math.min(i, key)].y;
				}
				geometry.computeBoundingSphere();
				return geometry.verticesNeedUpdate = true;
			}
		};

		drawingLine.prototype.dispose = function() {
			return drawingLine.__super__.dispose.call(this);
		};

		drawingLine.prototype._makeLine = function() {
			var ang, geometry, i, j, len1, lineWidth, material, ref, s, val;
			i = 0;
			s = this._u.range(180);
			while (i < this._vNum) {
				ang = s + i * (360 / this._vNum);
				this._v.push(new THREE.Vector3(Math.sin(this._u.radian(ang)) * this._radius, Math.cos(this._u.radian(ang)) * this._radius, 0));
				i++;
			}
			this._v.push(this._v[0].clone());
			geometry = new THREE.Geometry();
			geometry.dynamic = true;
			ref = this._v;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				geometry.vertices.push(val.clone());
			}
			lineWidth = [1, 0.5][this._device];
			material = new THREE.LineBasicMaterial({
				color: this._color,
				vertexColors: false,
				transparent: true,
				opacity: [1, 1][this._device],
				linewidth: lineWidth,
				blending: THREE.AdditiveBlending
			});
			this._line = new THREE.Line(geometry, material);
			return this._container.add(this._line);
		};

		drawingLine.prototype.show = function(f, d, f2, d2) {
			var i, j, len1, ref, val;
			this._anm.show.set({
				key: {
					from: 0,
					to: this._v.length - 1
				},
				frame: f,
				delay: d || 0,
				ease: "easeInOutExpo"
			});
			this._anm.show.start();
			ref = this._line.geometry.vertices;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val = this._v[0].clone();
			}
			this._rotSpeed.x = this._u.range(10) / 1000;
			this._rotSpeed.y = this._u.range(10) / 1000;
			this._rotSpeed.z = this._u.range(10) / 1000;
			this._container.rotation.set(0, 0, 0);
			this._anm.hide.set({
				scale: {
					from: [4, 2][this._device],
					to: 0.001
				},
				frame: f2,
				delay: d2,
				ease: "easeInOutExpo"
			});
			this._anm.hide.start();
			drawingLine.__super__.show.call(this);
			return this.update();
		};

		return drawingLine;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.fusha = (function(superClass) {
		extend(fusha, superClass);

		function fusha() {
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			fusha.__super__.constructor.call(this, {
				addScene: false
			});
			this._mesh;
		}

		fusha.prototype.start = function() {
			fusha.__super__.start.call(this);
			this._mesh = root.MY.gl.data.getCmnObj3D("fusha").clone();
			this._container.add(this._mesh);
			this._mesh.position.x = 33;
			this._mesh.position.y = -28;
			this._mesh.position.z = 14;
			return this._mesh.rotation.y = this._u.radian(-56);
		};

		fusha.prototype.update = function() {
			fusha.__super__.update.call(this);
			return this._mesh.rotation.z += 0.01;
		};

		fusha.prototype.dispose = function() {
			if (this._mesh != null) {
				this._container.remove(this._mesh);
				this._mesh = null;
			}
			return fusha.__super__.dispose.call(this);
		};

		return fusha;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.ground = (function(superClass) {
		extend(ground, superClass);

		function ground(roadSize) {
			this.openDoor = bind(this.openDoor, this);
			this._updateVertices = bind(this._updateVertices, this);
			this._addVerticesAnimation = bind(this._addVerticesAnimation, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this._setStageObjects = bind(this._setStageObjects, this);
			this.upAreaSize = bind(this.upAreaSize, this);
			this.downAreaSize = bind(this.downAreaSize, this);
			this.minGameAreaSize = bind(this.minGameAreaSize, this);
			this.gameAreaEndZ = bind(this.gameAreaEndZ, this);
			this.gameAreaSize = bind(this.gameAreaSize, this);
			this.totalSize = bind(this.totalSize, this);
			this.loopGroundZ = bind(this.loopGroundZ, this);
			this.loopGroundStartZ = bind(this.loopGroundStartZ, this);
			this.loopStartZ = bind(this.loopStartZ, this);
			this.loopZ = bind(this.loopZ, this);
			this._addLoopGround = bind(this._addLoopGround, this);
			this._loopOffsetScale = bind(this._loopOffsetScale, this);
			this._addUpArea = bind(this._addUpArea, this);
			this._addDownArea2 = bind(this._addDownArea2, this);
			this._addDownArea = bind(this._addDownArea, this);
			this._addUpLoopArea = bind(this._addUpLoopArea, this);
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			ground.__super__.constructor.call(this);
			this._stageId;
			this._roadSize = roadSize;
			this._groundSize = 0;
			this._groundTotalSize = 0;
			this._addLoopGroundNum;
			this._loopZ = 0;
			this._loopGroundSize = 0;
			this._loopGroundTotalSize = 0;
			this._downAreaSize = 0;
			this._downAreaNum = 1;
			this._upAreaSize = 0;
			this._upAreaNum = 0;
			this._upArea2Num = 1;
			this._objects = [];
			this._animateMesh = [];
			this._kujira = [];
			this._doors;
			this._delayCall;
		}

		ground.prototype.start = function() {
			var animal, flg, fusha, i, kumo, obj, objDepth, offsetScale, orgObj, totalStgDepth;
			ground.__super__.start.call(this);
			this._delayCall = new root.MY_CLASS.delayCall();
			this._delayCall.start();
			this._stageId = this._game.stageId();
			orgObj = root.MY.gl.data.getStageObj3D(this._stageId, "stage");
			this._addLoopGroundNum = this._conf.LOOP_STAGE_NUM[this._stageId];
			totalStgDepth = 0;
			flg = true;
			i = 0;
			while (flg) {
				if (this._stageId === -1) {
					if (i % 2 === 0) {
						obj = orgObjA.clone();
					} else {
						obj = orgObj.clone();
					}
					objDepth = this.depthFromBBox(obj.children[0].geometry.boundingBox) * this._conf.GROUND_OFFSET.SCALE1;
					this._container.add(obj);
					obj.position.y = this._conf.GROUND_OFFSET.Y;
					obj.position.z = -totalStgDepth - (objDepth * 0.5);
				} else {
					obj = orgObj.clone();
					objDepth = this.depthFromBBox(orgObj.children[0].geometry.boundingBox) * this._conf.GROUND_OFFSET.SCALE1;
					switch (this._stageId) {
						case 0:
						case 1:
						case 2:
						case 3:
							if (i % 2 !== 0) {
								obj.scale.x = -1;
							} else {
								obj.scale.x = 1;
							}
							break;
						case 4:
							obj.scale.x = 1;
							obj.scale.z = 1;
							break;
						default:
							obj.scale.z = 1;
					}
					this._container.add(obj);
					obj.position.y = this._conf.GROUND_OFFSET.Y;
					obj.position.z = -totalStgDepth - (objDepth * 0.5);
					switch (this._stageId) {
						case 3:
							offsetScale = 1.2;
							obj.scale.x *= offsetScale;
							obj.scale.y *= offsetScale;
							obj.scale.z *= offsetScale;
							break;
						case 4:
							offsetScale = 1.195;
							obj.scale.x *= offsetScale;
							obj.scale.y *= offsetScale;
							obj.scale.z *= offsetScale;
					}
				}
				if (this._stageId !== 5 && this._stageId !== 6) {
					kumo = root.MY.gl.data.getCmnObj3D("cloud" + String(this._stageId)).clone();
					this._container.add(kumo);
					kumo.position.copy(obj.position);
					kumo.position.x = this._conf.CLOUD_POS.BASE_X + this._u.range(this._conf.CLOUD_POS.RANEGE_X);
					kumo.position.y = this._conf.CLOUD_POS.BASE_Y + this._u.range(this._conf.CLOUD_POS.RANEGE_Y);
					this._objects.push(kumo);
				}
				if (this._stageId === 0) {
					fusha = new root.MY_CLASS.fusha();
					fusha.start();
					this._container.add(fusha.container());
					fusha.show();
					fusha.container().position.z = obj.position.z;
					fusha.container().scale.x = obj.scale.x;
					this._objects.push(fusha);
				}
				if (this._stageId === 4) {
					animal = root.MY.gl.data.getCmnObj3D("stg4Etc").clone();
					this._container.add(animal);
					animal.scale.copy(obj.scale);
					animal.position.copy(obj.position);
					animal.position.z += 110;
					animal.position.y += 0;
					this._objects.push(animal);
				}
				totalStgDepth += objDepth;
				this._objects.push(obj);
				if (totalStgDepth * this._conf.GROUND_SCALE > this._roadSize || (this._stageId === 5 || this._stageId === 6)) {
					flg = false;
				}
				i++;
			}
			this._groundTotalSize = totalStgDepth;
			switch (this._stageId) {
				case 4:
					this._groundTotalSize -= 50;
			}
			if (this._stageId === 4) {
				this._addDownArea();
			}
			if (this._stageId === 5) {
				this._addUpArea();
			}
			if (this._stageId === 6) {
				this._addDownArea2();
			}
			this._addLoopGround();
			this._container.scale.set(this._conf.GROUND_SCALE, this._conf.GROUND_SCALE, this._conf.GROUND_SCALE);
			this._setStageObjects();
			return this.update();
		};

		ground.prototype.update = function() {
			ground.__super__.update.call(this);
			if (this._container.visible) {
				this._container.rotation.z = this._camera.rotation.z;
				this._container.position.x = -this._camera.position.x;
				this._container.position.y = -this._camera.position.y;
				if (!this._isSmt) {
					return this._updateVertices();
				}
			}
		};

		ground.prototype.dispose = function() {
			var i, j, len1, ref, val;
			if (this._objects != null) {
				ref = this._objects;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					if (val != null) {
						this._container.remove(val);
						this._objects[i] = null;
					}
				}
				this._objects = null;
			}
			return ground.__super__.dispose.call(this);
		};

		ground.prototype._addUpLoopArea = function() {
			var depth, i, num, obj, orgObj, results;
			orgObj = root.MY.gl.data.getCmnObj3D("stageLoading6");
			depth = this.depthFromBBox(orgObj.children[0].geometry.boundingBox);
			depth *= this._loopOffsetScale();
			i = 0;
			num = ~~(this._groundTotalSize / depth);
			if (depth * num < this._groundTotalSize) {
				num += 1;
			}
			results = [];
			while (i < num) {
				obj = orgObj.clone();
				this._container.add(obj);
				if (i % 2 !== 0) {
					obj.scale.z = -1;
				} else {
					obj.scale.z = 1;
				}
				obj.position.y = this._conf.GROUND_OFFSET.Y;
				obj.position.z = -depth * i - depth * 0.5;
				this._objects.push(obj);
				results.push(i++);
			}
			return results;
		};

		ground.prototype._addDownArea = function() {
			var depth, i, num, obj, orgObj0, orgObj1;
			orgObj0 = root.MY.gl.data.getCmnObj3D("seaDown");
			orgObj1 = root.MY.gl.data.getCmnObj3D("stageLoading5");
			depth = this.depthFromBBox(orgObj1.children[0].geometry.boundingBox);
			depth *= this._loopOffsetScale();
			num = this._downAreaNum + 1;
			i = 0;
			while (i < num) {
				obj = i === 0 ? orgObj0.clone() : orgObj1.clone();
				this._container.add(obj);
				if (i % 2 !== 0) {
					obj.scale.x = -1;
				} else {
					obj.scale.x = 1;
				}
				obj.position.y = this._conf.GROUND_OFFSET.Y;
				obj.position.z = (-this._groundTotalSize + depth) - depth * i - depth * 0.5;
				this._objects.push(obj);
				i++;
			}
			return this._downAreaSize = depth * this._downAreaNum;
		};

		ground.prototype._addDownArea2 = function() {
			var depth, i, num, obj, orgObj;
			orgObj = root.MY.gl.data.getCmnObj3D("stageLoading6");
			depth = this.depthFromBBox(orgObj.children[0].geometry.boundingBox);
			depth *= this._loopOffsetScale();
			i = 0;
			num = this._upArea2Num + 2;
			while (i < num) {
				obj = orgObj.clone();
				this._container.add(obj);
				if (i % 2 !== 0) {
					obj.scale.x = -1;
				} else {
					obj.scale.x = 1;
				}
				obj.position.y = this._conf.GROUND_OFFSET.Y;
				obj.position.z = (-this._groundTotalSize + depth * 2) - depth * i - depth * 0.5;
				switch (this._stageId) {
					case 6:
						obj.position.y += this._conf.STG7_LOOP_OFFSET.Y;
				}
				this._objects.push(obj);
				i++;
			}
			return this._downAreaSize = depth * this._upArea2Num;
		};

		ground.prototype._addUpArea = function() {
			var depth, i, num, obj, orgObj;
			orgObj = root.MY.gl.data.getCmnObj3D("stageLoading6");
			depth = this.depthFromBBox(orgObj.children[0].geometry.boundingBox);
			depth *= this._loopOffsetScale();
			i = 0;
			num = this._upAreaNum;
			while (i < num) {
				obj = orgObj.clone();
				this._container.add(obj);
				if (i % 2 !== 0) {
					obj.scale.z = -1;
				} else {
					obj.scale.z = 1;
				}
				obj.position.y = this._conf.GROUND_OFFSET.Y;
				obj.position.z = -this._groundTotalSize - depth * i - depth * 0.5;
				this._objects.push(obj);
				i++;
			}
			return this._upAreaSize = depth * num;
		};

		ground.prototype._loopOffsetScale = function() {
			switch (this._stageId) {
				case 4:
					return 0.9;
				default:
					return this._conf.GROUND_OFFSET.SCALE2;
			}
		};

		ground.prototype._addLoopGround = function() {
			var i, loopNum, loopStartZ, obj, orgObj;
			orgObj = root.MY.gl.data.getCmnObj3D("stageLoading" + String(this._game.nextStageId()));
			this._loopGroundSize = this.depthFromBBox(orgObj.children[0].geometry.boundingBox);
			this._loopGroundSize *= this._loopOffsetScale();
			loopNum = 2;
			loopStartZ = -this._groundTotalSize;
			switch (this._stageId) {
				case 4:
					loopStartZ -= this._downAreaSize;
					break;
				case 5:
					loopStartZ -= this._upAreaSize;
					break;
				case 6:
					loopStartZ -= this._downAreaSize;
			}
			i = 0;
			while (i < this._addLoopGroundNum) {
				obj = orgObj.clone();
				this._container.add(obj);
				switch (this._stageId) {
					case 4:
						if (i % 2 !== 0) {
							obj.scale.z = -1;
						} else {
							obj.scale.z = 1;
						}
						break;
					default:
						if (i % 2 !== 0) {
							obj.scale.x = -1;
						} else {
							obj.scale.x = 1;
						}
				}
				obj.position.y = this._conf.GROUND_OFFSET.Y;
				obj.position.z = loopStartZ - this._loopGroundSize * i - this._loopGroundSize * 0.5;
				switch (this._stageId) {
					case 6:
						obj.position.y += this._conf.STG7_LOOP_OFFSET.Y;
				}
				this._objects.push(obj);
				i++;
			}
			this._loopGroundTotalSize = this._loopGroundSize * this._addLoopGroundNum;
			return this._loopZ = this._loopGroundSize * loopNum;
		};

		ground.prototype.loopZ = function() {
			return this._loopZ * this._conf.GROUND_SCALE;
		};

		ground.prototype.loopStartZ = function() {
			switch (this._stageId) {
				case 4:
					return -(this._groundTotalSize + this._downAreaSize) * this._conf.GROUND_SCALE;
				case 5:
					return -(this._groundTotalSize + this._upAreaSize) * this._conf.GROUND_SCALE;
				case 6:
					return -(this._groundTotalSize + this._downAreaSize) * this._conf.GROUND_SCALE;
				default:
					return -(this._groundTotalSize + this._loopGroundSize * 2) * this._conf.GROUND_SCALE;
			}
		};

		ground.prototype.loopGroundStartZ = function() {
			switch (this._stageId) {
				case 4:
					return -(this._groundTotalSize + this._downAreaSize) * this._conf.GROUND_SCALE;
				case 5:
					return -(this._groundTotalSize + this._upAreaSize) * this._conf.GROUND_SCALE;
				case 6:
					return -(this._groundTotalSize + this._downAreaSize) * this._conf.GROUND_SCALE;
				default:
					return -this._groundTotalSize * this._conf.GROUND_SCALE;
			}
		};

		ground.prototype.loopGroundZ = function() {
			return this._loopGroundTotalSize * this._conf.GROUND_SCALE;
		};

		ground.prototype.totalSize = function() {
			switch (this._stageId) {
				case 4:
					return (this._groundTotalSize + this._loopGroundTotalSize + this._downAreaSize) * this._conf.GROUND_SCALE;
				case 5:
					return (this._groundTotalSize + this._loopGroundTotalSize + this._upAreaSize) * this._conf.GROUND_SCALE;
				case 6:
					return (this._groundTotalSize + this._loopGroundTotalSize + this._downAreaSize) * this._conf.GROUND_SCALE;
				default:
					return (this._groundTotalSize + this._loopGroundTotalSize) * this._conf.GROUND_SCALE;
			}
		};

		ground.prototype.gameAreaSize = function() {
			return this._groundTotalSize * this._conf.GROUND_SCALE;
		};

		ground.prototype.gameAreaEndZ = function() {
			return -this._groundTotalSize * this._conf.GROUND_SCALE;
		};

		ground.prototype.minGameAreaSize = function() {
			return this._roadSize;
		};

		ground.prototype.downAreaSize = function() {
			return this._downAreaSize * this._conf.GROUND_SCALE;
		};

		ground.prototype.upAreaSize = function() {
			return this._upAreaSize * this._conf.GROUND_SCALE;
		};

		ground.prototype._setStageObjects = function() {
			var i, kujira, num, results;
			switch (this._stageId) {
				case 5:
					i = 0;
					num = 5;
					results = [];
					while (i < num) {
						kujira = new root.MY_CLASS.kujira(i);
						kujira.start();
						this._container.add(kujira.container());
						this._kujira.push(kujira);
						kujira.container().position.copy(this._objects[0].position);
						results.push(i++);
					}
					return results;
					break;
				case 6:
					this._doors = new root.MY_CLASS.doors();
					this._doors.start();
					this._container.add(this._doors.container());
					this._doors.container().position.copy(this._objects[0].position);
					return this._doors.container().position.z -= 980;
			}
		};

		ground.prototype.show = function() {
			var i, j, len1, ref, val;
			ground.__super__.show.call(this);
			ref = this._kujira;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.show();
			}
			if (this._doors != null) {
				return this._doors.show();
			}
		};

		ground.prototype.hide = function() {
			var i, j, len1, ref, val;
			ground.__super__.hide.call(this);
			ref = this._kujira;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.hide();
			}
			if (this._doors != null) {
				return this._doors.hide();
			}
		};

		ground.prototype._addVerticesAnimation = function(obj) {};

		ground.prototype._updateVertices = function() {
			var ang, bbox, d, dx, dz, i, j, len1, num, pos, ref, results, val, x, y, z;
			ang = Date.now() * 0.05;
			ref = this._animateMesh;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				bbox = val.geometry.boundingBox;
				pos = val.geometry.attributes.position.array;
				i = 0;
				num = pos.length;
				while (i < num) {
					x = pos[i];
					y = pos[i + 1];
					z = pos[i + 2];
					if (y != null) {
						dx = bbox.min.x - x;
						dz = bbox.min.z - z;
						d = Math.sqrt(dx * dx + dz * dz) / 0.45;
						pos[i + 1] += Math.sin(this._u.radian(ang + d)) * 0.045;
					}
					i += 3;
				}
				val.geometry.attributes.position.needsUpdate = true;
				val.geometry.computeFaceNormals();
				results.push(val.geometry.computeVertexNormals());
			}
			return results;
		};

		ground.prototype.openDoor = function() {
			if (this._doors != null) {
				return this._doors.open();
			}
		};

		return ground;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.hit = (function(superClass) {
		extend(hit, superClass);

		function hit() {
			this.setColor = bind(this.setColor, this);
			this.show = bind(this.show, this);
			this._makePrtcl = bind(this._makePrtcl, this);
			this.dispose = bind(this.dispose, this);
			this._updatePrtcl = bind(this._updatePrtcl, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			hit.__super__.constructor.call(this, {
				addScene: false
			});
			this._prtcl = [];
		}

		hit.prototype.start = function() {
			hit.__super__.start.call(this);
			return this._makePrtcl();
		};

		hit.prototype.update = function() {
			hit.__super__.update.call(this);
			if (this._container.visible) {
				return this._updatePrtcl();
			}
		};

		hit.prototype._updatePrtcl = function() {
			var anm, deadCnt, ease, i, j, len1, mesh, ref, tx, ty, tz, val;
			deadCnt = 0;
			ref = this._prtcl;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				anm = val.anm;
				if (++anm.i >= anm.d) {
					mesh.visible = true;
					anm.p = Math.min(1, anm.p += 0.05);
					tx = anm.tx0 * (1 - anm.p) + anm.tx1 * anm.p;
					ty = anm.ty0 * (1 - anm.p) + anm.ty1 * anm.p;
					tz = anm.tz0 * (1 - anm.p) + anm.tz1 * anm.p;
					ease = 0.1;
					mesh.position.x += (tx - mesh.position.x) * ease;
					mesh.position.y += (ty - mesh.position.y) * ease;
					mesh.position.z += (tz - mesh.position.z) * ease;
					if (anm.i >= anm.dead + anm.d) {
						mesh.visible = false;
						deadCnt++;
					}
				}
			}
			if (deadCnt >= this._prtcl.length) {
				return this._container.visible = false;
			}
		};

		hit.prototype.dispose = function() {
			return hit.__super__.dispose.call(this);
		};

		hit.prototype._makePrtcl = function() {
			var anm, geometry, i, material, num, obj, results, size, tri;
			i = 0;
			num = [12, 5][this._device];
			results = [];
			while (i < num) {
				obj = {};
				size = 12;
				geometry = new THREE.Geometry();
				geometry.vertices[0] = new THREE.Vector3(-size * 0.5, size * 0.5, 0);
				geometry.vertices[1] = new THREE.Vector3(size * 0.5, size * 0.5, 0);
				geometry.vertices[2] = new THREE.Vector3(0, -size * 0.5, 0);
				geometry.faces[0] = new THREE.Face3(0, 1, 2);
				if (this._u.hit(4)) {
					material = new THREE.MeshBasicMaterial({
						color: 0x00ff,
						side: THREE.DoubleSide
					});
				} else {
					material = new THREE.MeshBasicMaterial({
						color: 0x00ff,
						transparent: true,
						opacity: 1,
						side: THREE.DoubleSide,
						blending: THREE.AdditiveBlending
					});
				}
				tri = new THREE.Mesh(geometry, material);
				this._container.add(tri);
				tri.visible = false;
				obj.mesh = tri;
				anm = {};
				obj.anm = anm;
				this._prtcl.push(obj);
				results.push(i++);
			}
			return results;
		};

		hit.prototype.show = function(combo) {
			var anm, i, j, len1, mesh, r, radius, ref, scale, start, val;
			radius = 60 + 2 * combo;
			start = this._u.random(0, 360);
			ref = this._prtcl;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				anm = val.anm;
				mesh.visible = false;
				mesh.material.opacity = 1;
				mesh.material.needsUpdate = true;
				mesh.rotation.z = this._u.radian(this._u.range(180));
				if (this._u.hit(5)) {
					scale = this._u.random(1, 10) / 100;
					anm.rotSpdX = this._u.range(10) / 100;
					anm.rotSpdY = this._u.range(10) / 100;
					anm.rotSpdZ = this._u.range(10) / 100;
				} else {
					scale = this._u.random(30, 100) / 100;
					anm.rotSpdX = this._u.range(10) / 10000;
					anm.rotSpdY = this._u.range(10) / 10000;
					anm.rotSpdZ = this._u.range(10) / 10000;
				}
				mesh.scale.set(scale, scale, scale);
				anm.x = 0;
				anm.y = 0;
				anm.z = 0;
				anm.p = 0;
				r = this._u.range(combo * 7);
				anm.tx0 = Math.cos(this._u.radian(start + 360 / this._prtcl.length * (i + r))) * radius * 0.5;
				anm.ty0 = Math.sin(this._u.radian(start + 360 / this._prtcl.length * (i + r))) * radius * 0.5;
				anm.tz0 = Math.cos(this._u.radian(start + 360 / this._prtcl.length * (i + r))) * radius * 0.5;
				anm.tx1 = -this._u.random(40, 100);
				anm.ty1 = Math.sin(this._u.radian(start + 360 / this._prtcl.length * i)) * radius;
				anm.tz1 = Math.cos(this._u.radian(start + 360 / this._prtcl.length * i)) * radius;
				anm.d = i * 2;
				anm.i = 0;
				anm.dead = 20;
				mesh.position.set(anm.x, anm.y, anm.z);
			}
			return hit.__super__.show.call(this);
		};

		hit.prototype.setColor = function(color) {
			var i, j, len1, mesh, ref, results, val;
			ref = this._prtcl;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				mesh.material.setValues({
					color: color
				});
				results.push(mesh.material.needsUpdate = true);
			}
			return results;
		};

		return hit;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.item = (function(superClass) {
		extend(item, superClass);

		function item(rank) {
			this.isHitTarget = bind(this.isHitTarget, this);
			this.isContainStage = bind(this.isContainStage, this);
			this.get3dObject = bind(this.get3dObject, this);
			this.rank = bind(this.rank, this);
			this._getItemRank = bind(this._getItemRank, this);
			this._makeHitEffectObject = bind(this._makeHitEffectObject, this);
			this._makeHitObject = bind(this._makeHitObject, this);
			this.hide = bind(this.hide, this);
			this.hitAnimation = bind(this.hitAnimation, this);
			this.isDead = bind(this.isDead, this);
			this.show = bind(this.show, this);
			this.dispose = bind(this.dispose, this);
			this._updateHit = bind(this._updateHit, this);
			this._updateShow = bind(this._updateShow, this);
			this.update = bind(this.update, this);
			this._makeShowEffectMesh = bind(this._makeShowEffectMesh, this);
			this.start = bind(this.start, this);
			item.__super__.constructor.call(this);
			this._rank = rank;
			this._cnt = 0;
			this._cntMax = 0;
			this._cntDead = 0;
			this._cntDeadMax = 0;
			this._obj;
			this._showLine;
			this._hit;
			this._prtcl;
			this._comboPrtcl;
			this._hitObject = [];
			this._hitEffectParam = [];
			this._hitParam = {};
			this._showParam = {};
			this._showEffect = [];
			this._scale = 5;
			this._isPlayingHitAnimation = false;
		}

		item.prototype.start = function() {
			var orgObj;
			item.__super__.start.call(this);
			orgObj = this._data.getCmnObj3D("item" + String(this._rank));
			this._obj = orgObj.clone();
			this._container.add(this._obj);
			this._makeShowEffectMesh();
			this._makeHitObject();
			this._container.visible = false;
			this._hitParam.anm = new root._LIBS.animation();
			this._hitEffectParam[0] = {
				anm: new root._LIBS.animation()
			};
			if (!this._isSmt) {
				this._hitEffectParam[1] = {
					anm: new root._LIBS.animation()
				};
			}
			this._makeHitEffectObject();
			this._prtcl = new root.MY_CLASS.hit();
			this._prtcl.start();
			this._container.add(this._prtcl.container());
			this._prtcl.setColor(this._conf.ITEM_COLOR[this._rank]);
			this._comboPrtcl = new root.MY_CLASS.prtclCombo();
			this._comboPrtcl.start();
			this._container.add(this._comboPrtcl.container());
			this._comboPrtcl.setColor(this._conf.ITEM_COLOR[this._rank]);
			this._showLine = new root.MY_CLASS.drawingLine(this._conf.ITEM_COLOR[this._rank], 20);
			this._showLine.start();
			this._container.add(this._showLine.container());
			return this._showParam.anm = new root._LIBS.animation();
		};

		item.prototype._makeShowEffectMesh = function() {
			var geometry, material, obj, radius;
			radius = 20;
			geometry = new THREE.CircleGeometry(radius, 32);
			material = new THREE.MeshBasicMaterial({
				color: this._conf.ITEM_COLOR[this._rank],
				transparent: true,
				opacity: 1,
				depthTest: false,
				blending: THREE.AdditiveBlending
			});
			obj = new THREE.Mesh(geometry, material);
			this._container.add(obj);
			obj.visible = false;
			this._showEffect[0] = obj;
			return this._showEffect[1] = new root._LIBS.animation();
		};

		item.prototype.update = function() {
			item.__super__.update.call(this);
			if (this._container.visible) {
				this._cnt++;
				if (this._isPlayingHitAnimation) {
					return this._updateHit();
				} else {
					return this._updateShow();
				}
			}
		};

		item.prototype._updateShow = function() {
			var anm, obj, s;
			if (!this._showParam.anm.isCompleted() || !this._showEffect[1].isCompleted()) {
				this._obj.rotation.x = this._showParam.anm.get("rx");
				this._obj.rotation.y = this._showParam.anm.get("ry");
				this._obj.rotation.z = this._showParam.anm.get("rz");
				s = this._showParam.anm.get("scale");
				this._obj.scale.set(s, s, s);
				anm = this._showEffect[1];
				if (!anm.isCompleted() && anm.isStart()) {
					obj = this._showEffect[0];
					obj.visible = true;
					s = anm.get("scale");
					obj.scale.set(s, s, s);
					if (anm.isCompleted()) {
						return obj.visible = false;
					}
				}
			}
		};

		item.prototype._updateHit = function() {
			var compCnt, i, j, len1, obj, ref, s, val;
			this._cntDead++;
			this._obj.rotation.x = this._hitParam.anm.get("rx");
			this._obj.rotation.y = this._hitParam.anm.get("ry");
			this._obj.rotation.z = this._hitParam.anm.get("rz");
			s = this._hitParam.anm.get("scale");
			this._obj.scale.set(s, s, s);
			compCnt = 0;
			ref = this._hitEffectParam;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				obj = this._hitObject[i];
				s = val.anm.get("scale");
				obj.scale.set(s, s, s);
				obj.material.opacity = val.anm.get("opacity");
				obj.material.needsUpdate = true;
				if (val.anm.isCompleted()) {
					compCnt++;
				}
			}
			if (this._hitParam.anm.isCompleted() && compCnt >= this._hitEffectParam.length) {
				this._isPlayingHitAnimation = false;
				return this._container.visible = false;
			}
		};

		item.prototype.dispose = function() {
			if (this._obj != null) {
				this._container.remove(this._obj);
				this._obj = null;
			}
			if (this._hit != null) {
				this._container.remove(this._hit);
				this._hit.material.dispose();
				this._hit.geometry.dispose();
				this._hit = null;
			}
			return item.__super__.dispose.call(this);
		};

		item.prototype.show = function(pos, delay, interval) {
			var i, j, len1, lineHideDelay, onpuShowDelay, ref, val;
			delay *= interval || 13;
			this._container.visible = true;
			this._hit.visible = true;
			ref = this._hitObject;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.visible = false;
			}
			this._obj.rotation.x = 0;
			this._obj.rotation.y = 0;
			this._obj.rotation.z = this._u.radian(90 + this._u.range(30));
			this._obj.scale.set(0.001, 0.001, 0.001);
			this._container.position.copy(pos);
			this._obj.visible = true;
			this._isPlayingHitAnimation = false;
			this._hitParam.anm.reset();
			lineHideDelay = delay + 40;
			onpuShowDelay = lineHideDelay + 20;
			this._showParam.anm.set({
				rx: {
					from: this._obj.rotation.x,
					to: this._u.radian(this._u.range(0))
				},
				ry: {
					from: this._obj.rotation.y,
					to: this._u.radian(this._u.range(0))
				},
				rz: {
					from: this._obj.rotation.z,
					to: this._u.radian(90)
				},
				scale: {
					from: 0.01,
					to: this._scale
				},
				frame: 30,
				delay: onpuShowDelay,
				ease: "bounceOut"
			});
			this._showParam.anm.start();
			this._showEffect[1].set({
				scale: {
					from: [3.5, 2][this._device],
					to: [0.01, 0.01][this._device]
				},
				opacity: {
					from: 1,
					to: 0
				},
				frame: [30, 40][this._device],
				delay: [onpuShowDelay - 5, onpuShowDelay - 5][this._device],
				ease: "easeOutExpo"
			});
			this._showEffect[1].start();
			this._showEffect[0].visible = false;
			this._showLine.show(70, delay, 40, lineHideDelay);
			this._prtcl.hide();
			this._comboPrtcl.hide();
			this._cnt = 0;
			return this._cntMax = [onpuShowDelay + 5, onpuShowDelay - 10][this._device];
		};

		item.prototype.isDead = function() {
			if (!this._container.visible || (this._isPlayingHitAnimation && this._cntDead >= this._cntDeadMax)) {
				return true;
			} else {
				return false;
			}
		};

		item.prototype.hitAnimation = function(combo) {
			var color, delay, ease, frame, i, j, len1, obj, op0, op1, ref, s0, s1, val;
			if (this._isPlayingHitAnimation) {
				return;
			}
			this._isPlayingHitAnimation = true;
			this._cntDead = 0;
			this._cntDeadMax = 30;
			this._hitParam.anm.set({
				rx: {
					from: this._obj.rotation.x,
					to: this._obj.rotation.x + this._u.radian(this._u.range(80))
				},
				ry: {
					from: this._obj.rotation.y,
					to: this._obj.rotation.y + this._u.radian(this._u.range(80))
				},
				rz: {
					from: this._obj.rotation.z,
					to: this._obj.rotation.z + this._u.radian(330)
				},
				scale: {
					from: this._scale,
					to: 0.0001
				},
				frame: [30, 15][this._device],
				ease: "easeInOutExpo"
			});
			this._hitParam.anm.start();
			color = this._conf.ITEM_COLOR[this._rank];
			ref = this._hitEffectParam;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				switch (i) {
					case 0:
						if (!this._isSmt) {
							s0 = [9, 16, 30][~~((combo - 1) / 3)];
						} else {
							s0 = [8, 16, 16][~~((combo - 1) / 3)];
						}
						s1 = 0.001;
						op0 = 1;
						op1 = op0;
						frame = 50;
						delay = [1, 0][this._device];
						ease = "easeOutExpo";
						break;
					case 1:
						s0 = 0.1;
						s1 = this._u.map(combo, 5, 20, 1, 7);
						op0 = 1;
						op1 = 0;
						frame = 80;
						delay = 0;
						ease = "easeOutExpo";
						break;
					case 2:
						s0 = 1;
						s1 = this._u.map(combo, 2, 6, 1, 7);
						op0 = 1;
						op1 = 0;
						frame = 30;
						delay = 0;
						ease = "easeInExpo";
				}
				val.anm.set({
					scale: {
						from: s0,
						to: s1
					},
					opacity: {
						from: op0,
						to: op1
					},
					frame: frame,
					delay: delay,
					ease: ease
				});
				val.anm.start();
				obj = this._hitObject[i];
				obj.material.setValues({
					color: color,
					opacity: op0
				});
				obj.material.needsUpdate = true;
				obj.visible = true;
			}
			this._showEffect[0].visible = false;
			this._showLine.hide();
			this._hit.visible = false;
			this.update();
			this._prtcl.show(combo);
			if (combo >= 3 && !this._isSmt) {
				return this._comboPrtcl.show(combo);
			}
		};

		item.prototype.hide = function() {
			item.__super__.hide.call(this);
			this._showEffect[0].visible = false;
			this._showLine.hide();
			this._hit.visible = false;
			this._isPlayingHitAnimation = false;
			this._prtcl.hide();
			return this._comboPrtcl.hide();
		};

		item.prototype._makeHitObject = function() {
			var geometry, material, size;
			size = [80, 80][this._device];
			geometry = new THREE.PlaneBufferGeometry(size, size);
			material = new THREE.MeshBasicMaterial({
				color: 0xff0000,
				transparent: true,
				opacity: 0,
				blending: THREE.NormalBlending,
				depthTest: false
			});
			this._hit = new THREE.Mesh(geometry, material);
			return this._container.add(this._hit);
		};

		item.prototype._makeHitEffectObject = function() {
			var geometry, i, material, num, obj, radius, results;
			i = 0;
			num = this._hitEffectParam.length;
			results = [];
			while (i < num) {
				switch (i) {
					case 0:
						radius = [5, 2.5][this._device];
						geometry = new THREE.CircleGeometry(radius, 32);
						material = new THREE.MeshBasicMaterial({
							color: 0xffffff,
							transparent: true,
							opacity: 0,
							depthTest: false,
							blending: THREE.CustomBlending,
							blendSrc: THREE[this._conf.BLEND[7]],
							blendDst: THREE[this._conf.BLEND[1]],
							blendEquation: THREE.AddEquation
						});
						obj = new THREE.Mesh(geometry, material);
						this._container.add(obj);
						this._hitObject.push(obj);
						break;
					case 1:
						geometry = new THREE.TorusGeometry(6, 0.05, 32, 32);
						material = new THREE.MeshBasicMaterial({
							color: 0xffffff,
							transparent: true,
							opacity: 0,
							depthTest: false,
							blending: THREE.AdditiveBlending
						});
						obj = new THREE.Mesh(geometry, material);
						this._container.add(obj);
						this._hitObject.push(obj);
						break;
					case 2:
						geometry = new THREE.TorusGeometry(6, 1, 32, 32);
						material = new THREE.MeshBasicMaterial({
							color: 0xffffff,
							transparent: true,
							opacity: 0,
							blending: THREE.NormalBlending,
							depthTest: false
						});
						obj = new THREE.Mesh(geometry, material);
						this._container.add(obj);
						this._hitObject.push(obj);
				}
				results.push(i++);
			}
			return results;
		};

		item.prototype._getItemRank = function() {
			if (this._u.hit(15)) {
				return 2;
			} else {
				if (this._u.hit(3)) {
					return 1;
				} else {
					return 0;
				}
			}
		};

		item.prototype.rank = function() {
			return this._rank;
		};

		item.prototype.get3dObject = function() {
			return this._hit;
		};

		item.prototype.isContainStage = function() {
			var frustum;
			if (this.isDead()) {
				return false;
			}
			if (this._isPlayingHitAnimation) {
				return true;
			} else {
				frustum = new THREE.Frustum();
				frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(this._camera.projectionMatrix, this._camera.matrixWorldInverse));
				return this._container.visible && frustum.containsPoint(this._container.position);
			}
		};

		item.prototype.isHitTarget = function() {
			return this.isContainStage() && !this._isPlayingHitAnimation && this._cnt >= this._cntMax;
		};

		return item;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.kujira = (function(superClass) {
		extend(kujira, superClass);

		function kujira(key) {
			this.dispose = bind(this.dispose, this);
			this.show = bind(this.show, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			kujira.__super__.constructor.call(this, {
				addScene: false
			});
			this._key = key;
			this._mesh;
			this._pos = [[0, -100, -120, 1], [300, -110, 200, 0.6], [300, -200, -350, 0.5], [-150, -200, 400, 0.35], [0, -300, 100, 0.4]];
			this._spdX;
			this._spdY;
		}

		kujira.prototype.start = function() {
			kujira.__super__.start.call(this);
			this._mesh = root.MY.gl.data.getCmnObj3D("kujira").clone();
			this._container.add(this._mesh);
			this._spdX = -this._u.random(10, 400) / 1000;
			return this._spdY = this._u.random(100, 200) / 10000;
		};

		kujira.prototype.update = function() {
			kujira.__super__.update.call(this);
			if (this._container.visible) {
				this._mesh.position.x += this._spdX;
				return this._mesh.position.y += this._spdY;
			}
		};

		kujira.prototype.show = function() {
			var p;
			kujira.__super__.show.call(this);
			p = this._pos[this._key];
			this._mesh.position.x = p[0] + 400;
			this._mesh.position.y = p[1];
			this._mesh.position.z = p[2] - 400;
			return this._mesh.scale.set(p[3], p[3], p[3]);
		};

		kujira.prototype.dispose = function() {
			if (this._mesh != null) {
				this._container.remove(this._mesh);
				this._mesh = null;
			}
			return kujira.__super__.dispose.call(this);
		};

		return kujira;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.line = (function(superClass) {
		extend(line, superClass);

		function line() {
			this._resetCombo = bind(this._resetCombo, this);
			this._addLine = bind(this._addLine, this);
			this.addPoint = bind(this.addPoint, this);
			this.getCombo = bind(this.getCombo, this);
			this.reset = bind(this.reset, this);
			this.dispose = bind(this.dispose, this);
			this._updateLine = bind(this._updateLine, this);
			this._updatePoint = bind(this._updatePoint, this);
			this.update = bind(this.update, this);
			this._getUseLine2 = bind(this._getUseLine2, this);
			this._getUseLine = bind(this._getUseLine, this);
			this._makeLine2 = bind(this._makeLine2, this);
			this._makeLine = bind(this._makeLine, this);
			this.start = bind(this.start, this);
			line.__super__.constructor.call(this);
			this._points = [];
			this._comboPt = [];
			this._preLines = [];
			this._preLines2 = [];
			this._lines = [];
			this._combo = 0;
			this.onCompleteMaxCombo;
			this._cnt = 0;
		}

		line.prototype.start = function() {
			line.__super__.start.call(this);
			this._resetCombo();
			this._makeLine();
			return this._makeLine2();
		};

		line.prototype._makeLine = function() {
			var i, line, num, results;
			i = 0;
			num = this._conf.PRE_SET_LINE_NUM;
			results = [];
			while (i < num) {
				line = new root.MY_CLASS.prtclLine();
				line.start();
				this._container.add(line.container());
				this._preLines.push(line);
				results.push(i++);
			}
			return results;
		};

		line.prototype._makeLine2 = function() {
			var geo, i, line, mat, num, results;
			i = 0;
			num = this._conf.PRE_SET_LINE_NUM;
			results = [];
			while (i < num) {
				geo = new THREE.Geometry();
				mat = new THREE.LineBasicMaterial({
					color: 0xFFFFFF,
					vertexColors: true,
					transparent: true,
					opacity: 1,
					blending: THREE.AdditiveBlending,
					depthTest: false,
					linewidth: this._isSmt ? this._conf.LINE_WEIGHT_SMT : this._conf.LINE_WEIGHT_PC
				});
				line = new THREE.Line(geo, mat);
				line.visible = false;
				this._container.add(line);
				this._preLines2.push(line);
				results.push(i++);
			}
			return results;
		};

		line.prototype._getUseLine = function() {
			var i, j, len1, ref, val;
			ref = this._preLines;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (!val.container().visible) {
					return val;
				}
			}
			return null;
		};

		line.prototype._getUseLine2 = function() {
			var i, j, len1, ref, val;
			ref = this._preLines2;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (!val.visible) {
					return val;
				}
			}
			return null;
		};

		line.prototype.update = function() {
			line.__super__.update.call(this);
			this._updatePoint();
			return this._updateLine();
		};

		line.prototype._updatePoint = function() {
			var i, j, len1, ref, results, val;
			ref = this._points;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val != null) {
					val[2]--;
					if (val[2] <= 0) {
						results.push(this._points[i] = null);
					} else {
						results.push(void 0);
					}
				} else {
					results.push(void 0);
				}
			}
			return results;
		};

		line.prototype._updateLine = function() {
			var i, j, len1, m, ref, results, val;
			ref = this._lines;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val != null) {
					val.geometry.colorsNeedUpdate = true;
					val.geometry.verticesNeedUpdate = true;
					val.fadeOutDelay--;
					if (val.fadeOutDelay < 0) {
						if (this._isSmt) {
							val.visible = false;
							results.push(this._lines[i] = null);
						} else {
							m = val.material;
							m.opacity += (0 - m.opacity) * 0.1;
							if (Math.abs(0 - m.opacity) < 0.05) {
								val.visible = false;
								results.push(this._lines[i] = null);
							} else {
								results.push(void 0);
							}
						}
					} else {
						results.push(void 0);
					}
				} else {
					results.push(void 0);
				}
			}
			return results;
		};

		line.prototype.dispose = function() {
			return line.__super__.dispose.call(this);
		};

		line.prototype.reset = function() {
			this._lines = [];
			return this._points = [];
		};

		line.prototype.getCombo = function() {
			return this._combo;
		};

		line.prototype.addPoint = function(vec3, rank) {
			this._points = this._u.sliceNull(this._points);
			this._points.push([vec3, this._conf.ITEM_COLOR[rank], this._parameter.get("lineLife")]);
			if (this._points.length >= 2) {
				this._addLine(this._points[this._points.length - 2], this._points[this._points.length - 1]);
				this._cnt++;
				this._combo++;
				this._comboPt.push(vec3.clone());
				if (this._combo >= this._conf.MAX_COMBO) {
					if (this.onCompleteMaxCombo != null) {
						this.onCompleteMaxCombo(this._comboPt);
					}
					this._resetCombo();
					return this._comboPt.push(vec3.clone());
				}
			} else {
				this._resetCombo();
				return this._comboPt.push(vec3.clone());
			}
		};

		line.prototype._addLine = function(pA, pB) {
			var geo, line, line2;
			line = this._getUseLine();
			line.show(pB[0], pA[0], pB[1], pA[1]);
			line2 = this._getUseLine2();
			if (line2 == null) {
				return;
			}
			geo = line2.geometry;
			geo.vertices[0] = pA[0];
			geo.vertices[1] = pB[0];
			geo.colors[0] = new THREE.Color(pA[1]);
			geo.colors[1] = new THREE.Color(pB[1]);
			geo.computeBoundingSphere();
			line2.material.opacity = 0.5;
			line2.fadeOutDelay = this._conf.LINE_HIDE_INTERVAL[this._device];
			line2.visible = true;
			this._lines.push(line2);
			return this._lines = this._u.sliceNull(this._lines);
		};

		line.prototype._resetCombo = function() {
			this._combo = 1;
			return this._comboPt = [];
		};

		return line;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.prtclCombo = (function(superClass) {
		extend(prtclCombo, superClass);

		function prtclCombo() {
			this.setColor = bind(this.setColor, this);
			this.show = bind(this.show, this);
			this._makePrtcl = bind(this._makePrtcl, this);
			this.dispose = bind(this.dispose, this);
			this._updatePrtcl = bind(this._updatePrtcl, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			prtclCombo.__super__.constructor.call(this, {
				addScene: false
			});
			this._prtcl = [];
		}

		prtclCombo.prototype.start = function() {
			prtclCombo.__super__.start.call(this);
			return this._makePrtcl();
		};

		prtclCombo.prototype.update = function() {
			prtclCombo.__super__.update.call(this);
			if (this._container.visible) {
				return this._updatePrtcl();
			}
		};

		prtclCombo.prototype._updatePrtcl = function() {
			var anm, deadCnt, ease, i, j, len1, mesh, ref, showNum, tx, ty, tz, val;
			showNum = 0;
			deadCnt = 0;
			ref = this._prtcl;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				anm = val.anm;
				if (anm.isShow && ++anm.i >= anm.d) {
					showNum++;
					mesh.visible = true;
					anm.p = Math.min(1, anm.p += 0.05);
					tx = anm.tx0 * (1 - anm.p) + anm.tx1 * anm.p;
					ty = anm.ty0 * (1 - anm.p) + anm.ty1 * anm.p;
					tz = anm.tz0 * (1 - anm.p) + anm.tz1 * anm.p;
					ease = 0.1;
					mesh.position.x += (tx - mesh.position.x) * ease;
					mesh.position.y += (ty - mesh.position.y) * ease;
					mesh.position.z += (tz - mesh.position.z) * ease;
					mesh.rotation.x += anm.rotXSpd;
					mesh.rotation.y += anm.rotYSpd;
					mesh.rotation.z += anm.rotZSpd;
					if (anm.i >= anm.dead + anm.d) {
						mesh.visible = false;
						deadCnt++;
					}
				}
			}
			if (deadCnt >= showNum) {
				return this._container.visible = false;
			}
		};

		prtclCombo.prototype.dispose = function() {
			return prtclCombo.__super__.dispose.call(this);
		};

		prtclCombo.prototype._makePrtcl = function() {
			var anm, geometry, i, material, num, obj, results, size, tri;
			i = 0;
			num = [40, 10][this._device];
			results = [];
			while (i < num) {
				obj = {};
				size = 3;
				geometry = new THREE.Geometry();
				geometry.vertices[0] = new THREE.Vector3(-size * 0.5, size * 0.5, 0);
				geometry.vertices[1] = new THREE.Vector3(size * 0.5, size * 0.5, 0);
				geometry.vertices[2] = new THREE.Vector3(0, -size * 0.5, 0);
				geometry.faces[0] = new THREE.Face3(0, 1, 2);
				material = new THREE.MeshBasicMaterial({
					color: 0xff0000,
					transparent: true,
					opacity: 1,
					side: THREE.DoubleSide,
					blending: THREE.AdditiveBlending
				});
				tri = new THREE.Mesh(geometry, material);
				this._container.add(tri);
				tri.visible = false;
				obj.mesh = tri;
				anm = {};
				obj.anm = anm;
				this._prtcl.push(obj);
				results.push(i++);
			}
			return results;
		};

		prtclCombo.prototype.show = function(combo) {
			var anm, i, j, len1, mesh, r, radius, ref, scale, start, useNum, val;
			useNum = ~~(this._prtcl.length * Math.min(combo / this._conf.MAX_COMBO));
			radius = 70 + 10 * combo;
			start = this._u.random(0, 360);
			ref = this._prtcl;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				anm = val.anm;
				if (i <= useNum) {
					mesh.visible = false;
					anm.isShow = true;
					if (this._u.hit(2)) {
						scale = this._u.random(1, 10) / 100;
						anm.rotXSpd = this._u.range(100) / 100;
						anm.rotYSpd = this._u.range(100) / 100;
						anm.rotZSpd = this._u.range(100) / 100;
					} else {
						scale = this._u.random(50, 80) / 100;
						anm.rotXSpd = 0;
						anm.rotYSpd = 0;
						anm.rotZSpd = 0;
					}
					mesh.scale.set(scale, scale, scale);
					mesh.rotation.z = this._u.radian(this._u.range(180));
					anm.x = 0;
					anm.y = 0;
					anm.z = 0;
					anm.p = 0;
					r = this._u.range(combo * 7);
					anm.tx0 = Math.cos(this._u.radian(start + 360 / this._prtcl.length * (i + r))) * radius * 0.5;
					anm.ty0 = Math.sin(this._u.radian(start + 360 / this._prtcl.length * (i + r))) * radius * 0.5;
					anm.tz0 = Math.cos(this._u.radian(start + 360 / this._prtcl.length * (i + r))) * radius * 0.5;
					anm.tx1 = -this._u.random(40, 100);
					anm.ty1 = Math.sin(this._u.radian(start + 360 / this._prtcl.length * i)) * radius;
					anm.tz1 = Math.cos(this._u.radian(start + 360 / this._prtcl.length * i)) * radius;
					anm.d = i * 2;
					anm.i = 0;
					anm.dead = 20;
					mesh.position.set(anm.x, anm.y, anm.z);
				} else {
					mesh.visible = false;
					anm.isShow = false;
				}
			}
			return prtclCombo.__super__.show.call(this);
		};

		prtclCombo.prototype.setColor = function(color) {
			var i, j, len1, mesh, ref, results, val;
			ref = this._prtcl;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				mesh.material.setValues({
					color: color
				});
				results.push(mesh.material.needsUpdate = true);
			}
			return results;
		};

		return prtclCombo;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.prtclLine = (function(superClass) {
		extend(prtclLine, superClass);

		function prtclLine() {
			this._getPosList = bind(this._getPosList, this);
			this.setColor = bind(this.setColor, this);
			this.show = bind(this.show, this);
			this._makePrtcl = bind(this._makePrtcl, this);
			this.dispose = bind(this.dispose, this);
			this._updatePrtcl = bind(this._updatePrtcl, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			prtclLine.__super__.constructor.call(this, {
				addScene: false
			});
			this._prtcl = [];
		}

		prtclLine.prototype.start = function() {
			prtclLine.__super__.start.call(this);
			return this._makePrtcl();
		};

		prtclLine.prototype.update = function() {
			prtclLine.__super__.update.call(this);
			if (this._container.visible) {
				return this._updatePrtcl();
			}
		};

		prtclLine.prototype._updatePrtcl = function() {
			var anm, anmLineNum, deadCnt, ease, i, j, len1, mesh, ref, val;
			anmLineNum = 0;
			deadCnt = 0;
			ref = this._prtcl;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				anm = val.anm;
				if (anm.isShow && ++anm.i >= anm.d) {
					anmLineNum++;
					mesh.visible = true;
					mesh.position.x += anm.g;
					mesh.material.needsUpdate = true;
					mesh.rotation.x += anm.rotXSpd;
					mesh.rotation.y += anm.rotYSpd;
					mesh.rotation.z += anm.rotZSpd;
					if (anm.i >= anm.d + anm.dead) {
						ease = 0.05;
						if (anm.i >= anm.d + anm.dead + anm.dead2) {
							mesh.visible = false;
							deadCnt++;
						}
					}
				}
			}
			if (deadCnt >= anmLineNum) {
				return this._container.visible = false;
			}
		};

		prtclLine.prototype.dispose = function() {
			return prtclLine.__super__.dispose.call(this);
		};

		prtclLine.prototype._makePrtcl = function() {
			var anm, b, geometry, i, material, num, obj, results, size, tri;
			i = 0;
			num = [20, 16][this._device];
			results = [];
			while (i < num) {
				obj = {};
				size = 1.5;
				geometry = new THREE.Geometry();
				geometry.vertices[0] = new THREE.Vector3(-size * 0.5, size * 0.5, 0);
				geometry.vertices[1] = new THREE.Vector3(size * 0.5, size * 0.5, 0);
				geometry.vertices[2] = new THREE.Vector3(0, -size * 0.5, 0);
				geometry.faces[0] = new THREE.Face3(0, 1, 2);
				b = THREE.AdditiveBlending;
				material = new THREE.MeshBasicMaterial({
					color: 0xff0000,
					transparent: true,
					opacity: 1,
					side: THREE.DoubleSide,
					blending: b
				});
				tri = new THREE.Mesh(geometry, material);
				this._container.add(tri);
				tri.visible = false;
				obj.mesh = tri;
				anm = {};
				obj.anm = anm;
				this._prtcl.push(obj);
				results.push(i++);
			}
			return results;
		};

		prtclLine.prototype.show = function(to, from, c0, c1) {
			var anm, color, i, j, len1, mesh, p, pos, ref, scale, val;
			pos = this._getPosList(to, from, c0, c1);
			color = new THREE.Color();
			ref = this._prtcl;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				anm = val.anm;
				if (pos[i] != null) {
					p = pos[i];
					mesh.visible = false;
					anm.isShow = true;
					color.setRGB(p.r, p.g, p.b);
					mesh.material.setValues({
						color: color.getHex(),
						opacity: 1
					});
					mesh.material.needsUpdate = true;
					if (this._u.hit(4)) {
						scale = this._u.random(1, 10) / 100;
					} else {
						scale = this._u.random(50, 100) / 100;
					}
					mesh.scale.set(scale, scale, scale);
					mesh.rotation.x = this._u.radian(this._u.range(180));
					mesh.rotation.y = this._u.radian(this._u.range(180));
					mesh.rotation.z = this._u.radian(this._u.range(180));
					anm.x = p.x;
					anm.y = p.y;
					anm.z = p.z;
					anm.g = this._u.range(100) / 5000;
					anm.d = i * 0.1;
					anm.i = 0;
					anm.dead = this._conf.LINE_HIDE_INTERVAL[this._device];
					anm.dead2 = 20;
					anm.rotXSpd = this._u.range(100) / 100;
					anm.rotYSpd = this._u.range(100) / 100;
					anm.rotZSpd = this._u.range(100) / 100;
					mesh.position.set(anm.x, anm.y, anm.z);
				} else {
					mesh.visible = false;
					anm.isShow = false;
				}
			}
			return prtclLine.__super__.show.call(this);
		};

		prtclLine.prototype.setColor = function(color) {
			var i, j, len1, mesh, ref, results, val;
			ref = this._prtcl;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				mesh = val.mesh;
				mesh.material.setValues({
					color: color
				});
				results.push(mesh.material.needsUpdate = true);
			}
			return results;
		};

		prtclLine.prototype._getPosList = function(to, from, c0, c1) {
			var anm, d, dx, dy, dz, f, fromColor, i, p, pos, toColor;
			pos = [];
			fromColor = new THREE.Color(c1);
			toColor = new THREE.Color(c0);
			dx = from.x - to.x;
			dy = from.y - to.y;
			dz = from.z - to.z;
			d = Math.sqrt(dx * dx + dy * dy + dz * dz);
			f = this._u.map(d, 0, this._prtcl.length, 0, 300);
			anm = new root._LIBS.animation();
			anm.set({
				x: {
					from: from.x,
					to: to.x
				},
				y: {
					from: from.y,
					to: to.y
				},
				z: {
					from: from.z,
					to: to.z
				},
				r: {
					from: fromColor.r,
					to: toColor.r
				},
				g: {
					from: fromColor.g,
					to: toColor.g
				},
				b: {
					from: fromColor.b,
					to: toColor.b
				},
				frame: f,
				ease: "linear"
			});
			i = 0;
			while (i < f) {
				anm.rate(i / f);
				p = {
					x: anm.get("x"),
					y: anm.get("y"),
					z: anm.get("z"),
					r: anm.get("r"),
					g: anm.get("g"),
					b: anm.get("b")
				};
				pos.push(p);
				i++;
			}
			return pos;
		};

		return prtclLine;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.ring = (function(superClass) {
		extend(ring, superClass);

		function ring(id) {
			this.lifeUp = bind(this.lifeUp, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			ring.__super__.constructor.call(this);
			this._id = id;
			this._color;
			this._colorParam = {};
			this._ang = this._id * (360 / this._conf.PRE_SET_RING_NUM);
			this._tgOpacity = 1;
			this._anm = new root._LIBS.animation();
			this._mesh;
		}

		ring.prototype.start = function() {
			var geometry, material;
			ring.__super__.start.call(this);
			this._color = new THREE.Color();
			this._colorParam.s = this._colorParam.defS = this._colorParam.ts = 0.65;
			this._colorParam.l = this._colorParam.defL = this._colorParam.tl = 0.6;
			geometry = new THREE.TorusGeometry(60, 2, 32, 32);
			material = new THREE.MeshBasicMaterial({
				color: 0xffffff,
				transparent: true,
				opacity: 0,
				blending: THREE.AdditiveBlending,
				depthTest: true
			});
			this._mesh = new THREE.Mesh(geometry, material);
			this._container.add(this._mesh);
			this._container.visible = false;
			return this.update();
		};

		ring.prototype.update = function() {
			var ease0, ease1, mat, opacity, scale;
			ring.__super__.update.call(this);
			if (this._container.visible) {
				this._container.rotation.x = this._camera.rotation.x;
				this._container.rotation.y = this._camera.rotation.y;
				ease0 = 0.1;
				ease1 = 0.3;
				this._colorParam.ts += (this._colorParam.defS - this._colorParam.ts) * ease0;
				this._colorParam.tl += (this._colorParam.defL - this._colorParam.tl) * ease0;
				this._colorParam.s += (this._colorParam.ts - this._colorParam.s) * ease1;
				this._colorParam.l += (this._colorParam.tl - this._colorParam.l) * ease1;
				this._ang += 2;
				this._color.setHSL(this._u.map(Math.sin(this._u.radian(this._ang)), 0, 1, -1, 1), this._colorParam.s, this._colorParam.l);
				opacity = this._u.map(this._camera.position.z - this._container.position.z, 1, 0, 200, 3000);
				opacity *= this._anm.get("opacity");
				mat = this._mesh.material;
				mat.setValues({
					color: this._color.getHex(),
					opacity: opacity
				});
				mat.needsUpdate = true;
				if (!this._anm.isCompleted()) {
					scale = this._anm.get("scale");
					return this._mesh.scale.set(scale, scale, scale);
				}
			}
		};

		ring.prototype.dispose = function() {
			if (this._mesh != null) {
				this._container.remove(this._mesh);
				this._mesh.geometry.dispose();
				this._mesh.material.dispose();
				this._mesh = null;
			}
			this._color = null;
			return ring.__super__.dispose.call(this);
		};

		ring.prototype.show = function(pos) {
			this._container.visible = true;
			this._container.position.copy(pos);
			this._anm.set({
				opacity: {
					from: 0,
					to: this._tgOpacity
				},
				scale: {
					from: 5,
					to: 1
				},
				frame: 50,
				delay: this._id * 10,
				ease: "easeInOutExpo"
			});
			this._anm.start();
			return this.update();
		};

		ring.prototype.hide = function() {
			this._container.visible = false;
			this._mesh.material.opacity = 0;
			return this._anm.reset();
		};

		ring.prototype.lifeUp = function() {
			this._colorParam.ts = 1;
			return this._colorParam.tl = 1;
		};

		return ring;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.road = (function(superClass) {
		extend(road, superClass);

		function road(pos, hitCheaker) {
			this._lifeUpEffectLing = bind(this._lifeUpEffectLing, this);
			this._eCompleteMaxCombo = bind(this._eCompleteMaxCombo, this);
			this.disposeGround = bind(this.disposeGround, this);
			this.disposeStgparts = bind(this.disposeStgparts, this);
			this.disposeItems = bind(this.disposeItems, this);
			this.disposeRoad = bind(this.disposeRoad, this);
			this._hideAllItem = bind(this._hideAllItem, this);
			this._hitTestItems = bind(this._hitTestItems, this);
			this._eClick = bind(this._eClick, this);
			this._updateLookOffset = bind(this._updateLookOffset, this);
			this.mesh = bind(this.mesh, this);
			this.dispose = bind(this.dispose, this);
			this._getUseItem = bind(this._getUseItem, this);
			this._eAddItemAtRoad = bind(this._eAddItemAtRoad, this);
			this._initRoadParam = bind(this._initRoadParam, this);
			this._enterNextStage = bind(this._enterNextStage, this);
			this._setUpNextStage = bind(this._setUpNextStage, this);
			this._endStage = bind(this._endStage, this);
			this._hideEtcStage = bind(this._hideEtcStage, this);
			this.usableGame = bind(this.usableGame, this);
			this._offsetLoadAtY = bind(this._offsetLoadAtY, this);
			this._offsetLoadAtX = bind(this._offsetLoadAtX, this);
			this._getLoadAtPos = bind(this._getLoadAtPos, this);
			this._checkSeaState = bind(this._checkSeaState, this);
			this.update = bind(this.update, this);
			this._setPositionAtRoad = bind(this._setPositionAtRoad, this);
			this._computeNextStageAt = bind(this._computeNextStageAt, this);
			this._computeLoopStartAt = bind(this._computeLoopStartAt, this);
			this.reset = bind(this.reset, this);
			this._makeRing = bind(this._makeRing, this);
			this._makeItemRankTable = bind(this._makeItemRankTable, this);
			this._makeItems = bind(this._makeItems, this);
			this._hideRing = bind(this._hideRing, this);
			this._setRing = bind(this._setRing, this);
			this._setStgparts = bind(this._setStgparts, this);
			this._hideStgparts = bind(this._hideStgparts, this);
			this._makeStgparts = bind(this._makeStgparts, this);
			this._addGround = bind(this._addGround, this);
			this._getDepthGeometry = bind(this._getDepthGeometry, this);
			this._switchRoad = bind(this._switchRoad, this);
			this.makeRoad = bind(this.makeRoad, this);
			this._getAtFromX2 = bind(this._getAtFromX2, this);
			this._getAtFromX = bind(this._getAtFromX, this);
			this._getAtFromZ = bind(this._getAtFromZ, this);
			this._makeRoadGeometryFromSplinePoints = bind(this._makeRoadGeometryFromSplinePoints, this);
			this._addLoopAreaSplinePoints = bind(this._addLoopAreaSplinePoints, this);
			this._makeGameAreaSplinePoints = bind(this._makeGameAreaSplinePoints, this);
			this.goNextStage = bind(this.goNextStage, this);
			this.isDraw = bind(this.isDraw, this);
			this.stopRun = bind(this.stopRun, this);
			this.startRun = bind(this.startRun, this);
			this.start = bind(this.start, this);
			road.__super__.constructor.call(this);
			this._geo;
			this._mesh;
			this._nextGeo;
			this._nextMesh;
			this._binormal = new THREE.Vector3();
			this._normal = new THREE.Vector3();
			this._cameraRot;
			this._mat;
			this._maxAt = 0;
			this._lookOffset = {
				x: 0,
				y: 0
			};
			this._at = 0;
			this._bufAt = 0;
			this._atP = 0;
			this._runSpeed = 0;
			this._runSpeedTg = 0;
			this._loopStartAt = 0;
			this._nextStageAt = 0;
			this._loopCnt = 0;
			this._baseFloor = 0;
			this._baseFloorTg = 0;
			this._sky;
			this._sea;
			this._line;
			this._comboMaxEffect;
			this._showItemMgr;
			this._ring = [];
			this._items = [];
			this._stgparts = [];
			this._ground = [];
			this._nowGround;
			this._hitRay;
			this._isInSea = false;
			this._inSeaAt = 0;
			this._outSeaAt = 0;
			this._isPlaying = false;
			this._isMakeRoad = false;
			this._isDraw = true;
			this._isPlayingGame = false;
			this._isShowItem = false;
			this._isEnterLoopArea = false;
			this.onGetItem;
			this.onEndStage;
			this.onEnterLoopArea;
			this.onSetupNextStage;
			this.onEnterNextStage;
			this.onStartNextStage;
		}

		road.prototype.start = function() {
			var roadTex;
			road.__super__.start.call(this);
			this._cameraRot = this._camera.rotation.clone();
			this._hitRay = new THREE.Raycaster();
			this._interaction.addOnClick(this._eClick);
			roadTex = THREE.ImageUtils.loadTexture(this._conf.PATH_IMG.TEX + "niji.jpg");
			this._mat = new THREE.MeshBasicMaterial({
				map: roadTex
			});
			this._sky = new root.MY_CLASS.sky();
			this._sky.start();
			this._sea = new root.MY_CLASS.sea();
			this._sea.start();
			this._line = new root.MY_CLASS.line();
			this._line.start();
			this._line.show();
			this._line.onCompleteMaxCombo = this._eCompleteMaxCombo;
			this._comboMaxEffect = new root.MY_CLASS.comboMax();
			this._comboMaxEffect.start();
			this._makeItems();
			if (!this._conf.IS_CAP) {
				this._makeRing();
			}
			this._showItemMgr = new root.MY_CLASS.showItemMgr(this._items);
			this._showItemMgr.onShowItem = this._eAddItemAtRoad;
			this._showItemMgr.start();
			return this._isPlaying = true;
		};

		road.prototype.startRun = function() {
			this._isPlaying = true;
			this._isPlayingGame = true;
			this._isShowItem = false;
			this._baseFloor = this._conf.BASE_FLOOR;
			this._sky.show();
			this._sea.hide();
			this._initRoadParam();
			this._camera.rotation.z = this._cameraRot.z = 1.5707963267948966 + this._u.radian(0);
			return this._cameraRot = this._camera.rotation.clone();
		};

		road.prototype.stopRun = function() {
			this._isPlaying = false;
			return this.update();
		};

		road.prototype.isDraw = function(bool) {
			var ground;
			this._isDraw = bool;
			this.update();
			if (bool) {
				this._container.visible = true;
				this._sky.show();
			} else {
				this._container.visible = false;
				this._sky.hide();
			}
			ground = this._ground[this._game.stageId()];
			if (ground != null) {
				return ground.update();
			}
		};

		road.prototype.goNextStage = function() {
			return this.makeRoad(true);
		};

		road.prototype._makeGameAreaSplinePoints = function(stageId) {
			var arr, i, j, key, len1, p, val;
			switch (stageId) {
				case 4:
					p = this._conf.ROAD_POINT[0];
					break;
				case 5:
					p = this._conf.ROAD_POINT[1];
					break;
				case 6:
					p = this._conf.ROAD_POINT[2];
					break;
				default:
					key = this._u.random(3, 6);
					p = this._conf.ROAD_POINT[key];
			}
			arr = [];
			for (i = j = 0, len1 = p.length; j < len1; i = ++j) {
				val = p[i];
				arr.push(new THREE.Vector3(val.x, val.y, val.z));
			}
			return arr;
		};

		road.prototype._addLoopAreaSplinePoints = function(stageId, points) {
			var addZ, i, last, len, results, x, y, z;
			last = points[points.length - 1];
			x = last.x;
			y = last.y;
			z = last.z;
			addZ = this._conf.GAME_SPEED[this._game.stageId()];
			i = 0;
			len = this._conf.ROAD_SPLINE_POINT_NUM[this._game.stageId()] - points.length;
			results = [];
			while (i < len) {
				switch (stageId) {
					case 4:
						if (i < 8) {
							z -= addZ * 0.5;
						} else {
							z -= addZ;
						}
						x = this._conf.STG5_OFFSET_Y;
						y = this._conf.LOOP_PT.Y;
						break;
					case 5:
						if (i < 16) {
							z -= addZ * 0.5;
						} else {
							z -= addZ;
						}
						x = this._conf.LOOP_PT.X;
						break;
					case 6:
						z -= addZ;
						x += (this._conf.LOOP_PT.Y - x) * 0.3;
						break;
					default:
						z -= addZ;
						x = this._conf.LOOP_PT.X;
						y = this._conf.LOOP_PT.Y;
				}
				points.push(new THREE.Vector3(x, y, z));
				results.push(i++);
			}
			return results;
		};

		road.prototype._makeRoadGeometryFromSplinePoints = function(points) {
			var geo, radSegments, radius, segments, spline;
			segments = 5000;
			radius = 10;
			radSegments = 2;
			spline = new THREE.SplineCurve3(points);
			geo = new THREE.TubeGeometry(spline, segments, radius, radSegments, false);
			geo.computeBoundingSphere();
			geo.computeBoundingBox();
			return geo;
		};

		road.prototype._getAtFromZ = function(z, useGeometry, useMesh) {
			var add, pos, t;
			pos = new THREE.Vector3();
			t = 0;
			add = this._conf.ROAD_ANALYZE_P;
			while (t < 1) {
				pos = useGeometry.parameters.path.getPointAt(t);
				if (pos.z <= z) {
					return t;
				}
				t += add;
			}
			return 1;
		};

		road.prototype._getAtFromX = function(x, useGeometry) {
			var add, pos, t;
			t = 0;
			add = this._conf.ROAD_ANALYZE_P;
			while (t < 1) {
				pos = useGeometry.parameters.path.getPointAt(t);
				if (pos.x >= x) {
					return t;
				}
				t += add;
			}
			return 1;
		};

		road.prototype._getAtFromX2 = function(x, useGeometry) {
			var add, pos, t;
			t = 0;
			add = this._conf.ROAD_ANALYZE_P;
			while (t < 1) {
				pos = useGeometry.parameters.path.getPointAt(t);
				if (pos.x <= x) {
					return t;
				}
				t += add;
			}
			return 1;
		};

		road.prototype.makeRoad = function(isNext) {
			var dd, gameAreaGeometry, gameAreaSize, gameAreaSize2, gameAreaStgSize, i, last, lastZ, maxAt, mesh, needRoadSize, num, offsetZ, roadGeo, roadPoints, totalStgSize;
			if (isNext == null) {
				isNext = false;
			}
			roadPoints = this._makeGameAreaSplinePoints(this._game.stageId());
			gameAreaGeometry = this._makeRoadGeometryFromSplinePoints(roadPoints);
			gameAreaSize = this._getDepthGeometry(gameAreaGeometry);
			gameAreaGeometry.dispose();
			switch (this._game.stageId()) {
				case 4:
					gameAreaSize2 = gameAreaSize - this._conf.GAME_END_OFFSET[this._game.stageId()];
					break;
				default:
					gameAreaSize2 = gameAreaSize;
			}
			this._addGround(gameAreaSize2);
			gameAreaStgSize = this._ground[this._game.stageId()].gameAreaSize();
			totalStgSize = this._ground[this._game.stageId()].totalSize();
			needRoadSize = totalStgSize - gameAreaSize;
			offsetZ = -1000;
			last = roadPoints[roadPoints.length - 1];
			lastZ = last.z - needRoadSize + offsetZ;
			i = 1;
			dd = 380;
			if (this._game.stageId() === 4) {
				dd = 450;
			}
			if (this._game.stageId() === 5) {
				dd = 450;
			}
			if (this._game.stageId() === 6) {
				dd = 850;
			}
			num = ~~(needRoadSize / dd) + 1;
			while (i <= num) {
				roadPoints.push(new THREE.Vector3(last.x, last.y, last.z + i * ((lastZ - last.z) / num)));
				i++;
			}
			roadGeo = this._makeRoadGeometryFromSplinePoints(roadPoints);
			mesh = new THREE.Mesh(roadGeo, this._mat);
			this._container.add(mesh);
			if (isNext) {
				this._nextGeo = roadGeo;
				this._nextMesh = mesh;
			} else {
				this._geo = roadGeo;
				this._mesh = mesh;
			}
			maxAt = this._getAtFromZ(this._ground[this._game.stageId()].gameAreaEndZ(), this._nextGeo || this._geo, this._nextMesh || this._mesh);
			this._setStgparts(maxAt);
			return this._isMakeRoad = true;
		};

		road.prototype._switchRoad = function() {
			if (this._mesh != null) {
				this._container.remove(this._mesh);
				this._mesh = null;
				this._geo.dispose();
				this._geo = null;
			}
			this._geo = this._nextGeo;
			this._mesh = this._nextMesh;
			this._nextGeo = null;
			return this._nextMesh = null;
		};

		road.prototype._getDepthGeometry = function(geometry) {
			return this.depthFromBBox(geometry.boundingBox);
		};

		road.prototype._addGround = function(gameAreaSize) {
			var ground;
			if (this._ground[this._game.stageId()] != null) {
				ground = this._ground[this._game.stageId()];
				ground.container().position.z = 0;
				ground.container().visible = true;
				ground.show();
			} else {
				ground = new root.MY_CLASS.ground(gameAreaSize);
				ground.start();
				ground.show();
			}
			if (this._nowGround == null) {
				this._nowGround = ground;
			}
			return this._ground[this._game.stageId()] = ground;
		};

		road.prototype._makeStgparts = function() {};

		road.prototype._hideStgparts = function() {};

		road.prototype._setStgparts = function(maxAt) {};

		road.prototype._setRing = function() {
			var i, num, pos, results, ring, t;
			num = this._ring.length;
			i = 0;
			results = [];
			while (i < num) {
				t = (i / num) * this._maxAt;
				pos = this._getLoadAtPos(t, 0);
				this._offsetLoadAtY(pos, 10);
				ring = this._ring[i];
				ring.show(pos);
				results.push(i++);
			}
			return results;
		};

		road.prototype._hideRing = function() {
			var i, j, len1, ref, results, val;
			ref = this._ring;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				results.push(val.hide());
			}
			return results;
		};

		road.prototype._makeItems = function() {
			var i, item, len, rankTable, results;
			rankTable = this._makeItemRankTable();
			i = 0;
			len = this._conf.PRE_SET_ITEM_NUM;
			results = [];
			while (i < len) {
				item = new root.MY_CLASS.item(rankTable[i] || 0);
				item.start();
				this._items.push(item);
				results.push(i++);
			}
			return results;
		};

		road.prototype._makeItemRankTable = function() {
			var i, j, k, l, len1, len2, nums, ref, table, val;
			table = [];
			nums = [];
			ref = this._conf.ITEM_RANK_RATE;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				nums[i] = ~~(val * this._conf.PRE_SET_ITEM_NUM);
			}
			for (i = k = 0, len2 = nums.length; k < len2; i = ++k) {
				val = nums[i];
				l = 0;
				while (l < val) {
					table.push(i);
					l++;
				}
			}
			return table;
		};

		road.prototype._makeRing = function() {
			var i, len, results, ring;
			i = 0;
			len = this._conf.PRE_SET_RING_NUM;
			results = [];
			while (i < len) {
				ring = new root.MY_CLASS.ring(i);
				ring.start();
				this._ring.push(ring);
				results.push(i++);
			}
			return results;
		};

		road.prototype.reset = function() {
			var ground;
			road.__super__.reset.call(this);
			this._isPlaying = false;
			this._isMakeRoad = false;
			this._isPlayingGame = false;
			this._isShowItem = true;
			this._at = 0;
			this._hideStgparts();
			this._hideAllItem();
			this._hideRing();
			this._hideEtcStage();
			this._nowGround = null;
			this.disposeRoad();
			this._line.reset();
			ground = this._ground[this._game.stageId()];
			if (ground != null) {
				ground.container().position.z = 0;
				return ground.container().visible = true;
			}
		};

		road.prototype._computeLoopStartAt = function() {
			var add, pos, t;
			pos = new THREE.Vector3();
			t = this._maxAt;
			add = this._conf.ROAD_ANALYZE_P;
			while (t < 1) {
				pos = this._geo.parameters.path.getPointAt(t);
				if (pos.z <= this._nowGround.container().position.z + this._nowGround.loopStartZ()) {
					this._loopStartAt = t;
					return;
				}
				t += add;
			}
			return this._loopStartAt = t;
		};

		road.prototype._computeNextStageAt = function() {
			var add, maxZ, pos, t;
			pos = new THREE.Vector3();
			maxZ = -this._nowGround.totalSize();
			t = this._loopStartAt;
			add = this._conf.ROAD_ANALYZE_P;
			while (t < 1) {
				pos = this._geo.parameters.path.getPointAt(t);
				if (pos.z <= maxZ) {
					this._nextStageAt = t;
					return;
				}
				t += add;
			}
			return this._nextStageAt = t;
		};

		road.prototype._setPositionAtRoad = function(at, position, useGeometry, useMesh) {
			var dir, pick, pickNext, pickt, pos, segments;
			pos = useGeometry.parameters.path.getPointAt(at);
			segments = useGeometry.tangents.length;
			pickt = at * segments;
			pick = Math.floor(pickt);
			pickNext = (pick + 1) % segments;
			if ((useGeometry.binormals[pickNext] != null) && (useGeometry.binormals[pick] != null)) {
				this._binormal.subVectors(useGeometry.binormals[pickNext], useGeometry.binormals[pick]);
				this._binormal.multiplyScalar(pickt - pick).add(useGeometry.binormals[pick]);
			}
			dir = useGeometry.parameters.path.getTangentAt(at);
			this._normal.copy(this._binormal).cross(dir);
			pos.add(this._binormal.clone().multiplyScalar(this._baseFloor));
			position.copy(pos);
			return position.z += useMesh.position.z;
		};

		road.prototype.update = function() {
			var ease, eyeDist, lookAt, newAt, now, nowSpeed, speedEase, tg0, tg1;
			road.__super__.update.call(this);
			if (!this._isDraw) {
				return;
			}
			this._baseFloorTg = this._conf.BASE_FLOOR;
			this._updateLookOffset();
			this._hitTestItems(this._interaction.mouse().x, this._interaction.mouse().y);
			if (this._isPlaying) {
				if (this.usableGame()) {
					newAt = this._audio.stgBgmRate() * this._maxAt;
					nowSpeed = newAt - this._bufAt;
					this._bufAt = newAt;
					speedEase = this._game.clearStageNum() > 0 && this._at < 0.1 ? 0.01 : 0.75;
					this._runSpeed += (nowSpeed - this._runSpeed) * speedEase;
					tg0 = this._at + this._runSpeed;
					tg1 = this._bufAt;
					this._atP = Math.min(this._atP += 0.000002, 1);
					this._at = tg0 * (1 - this._atP) + tg1 * this._atP;
					if (this._game.clearStageNum() === 0 && this._bufAt > 0.008) {
						this._isShowItem = true;
					} else {
						if (!this._isShowItem && this._bufAt > this._conf.GAME_START_LOAD_AT[this._game.stageId()]) {
							this._isShowItem = true;
							if (this.onStartNextStage != null) {
								this.onStartNextStage();
							}
						}
					}
				} else {
					this._at = Math.min(1, this._at += this._runSpeed);
					if (this._game.stageId() === 4 || this._game.stageId() === 5) {
						if (this._isEnterLoopArea) {
							this._runSpeed += (this._runSpeedTg - this._runSpeed) * 0.02;
						} else {
							this._runSpeed += (this._runSpeedTg - this._runSpeed) * 0.002;
						}
					} else {
						this._runSpeed += (this._runSpeedTg - this._runSpeed) * 0.02;
					}
					this._baseFloorTg = this._conf.BASE_FLOOR + 0;
				}
			} else {
				this._at = this._at;
			}
			this._baseFloor += (this._baseFloorTg - this._baseFloor) * 0.05;
			this._setPositionAtRoad(this._at, this._camera.position, this._geo, this._mesh);
			if (!this.usableGame()) {
				this._endStage();
				if (this._isMakeRoad && this._loopCnt > 0) {
					if (this._nextStageAt <= this._at || this._at >= 1) {
						this._enterNextStage();
						this._setPositionAtRoad(this._at, this._camera.position, this._geo, this._mesh);
					}
				} else {
					if (!this._isEnterLoopArea && this._camera.position.z < this._nowGround.container().position.z + this._nowGround.loopGroundStartZ()) {
						this._isEnterLoopArea = true;
						this._hideStgparts();
						if (this.onEnterLoopArea != null) {
							this.onEnterLoopArea();
						}
					}
					if (this._camera.position.z < (this._nowGround.container().position.z + this._nowGround.loopStartZ()) - this._nowGround.loopZ()) {
						this._loopCnt++;
						this._nowGround.container().position.z = this._mesh.position.z = this._nowGround.totalSize();
						this._at -= this._at - this._loopStartAt;
						this._setPositionAtRoad(this._at, this._camera.position, this._geo, this._mesh);
						if (this._loopCnt === 1) {
							this._setUpNextStage();
						}
					}
				}
			}
			eyeDist = this._conf.LOOK_AT_ROAD;
			now = (this._at + eyeDist / this._geo.parameters.path.getLength()) % 1;
			lookAt = this._geo.parameters.path.getPointAt(now);
			lookAt.z += this._mesh.position.z;
			if (this._isShowItem && this.usableGame()) {
				if (this._showItemMgr.showItem(this._at)) {
					this._u.shuffle(this._items);
				}
			}
			lookAt.add(this._binormal.clone().multiplyScalar(this._baseFloor + this._lookOffset.y));
			lookAt.add(this._normal.clone().multiplyScalar(this._lookOffset.x));
			this._camera.matrix.lookAt(this._camera.position, lookAt, this._binormal);
			this._cameraRot.setFromRotationMatrix(this._camera.matrix, this._camera.rotation.order);
			ease = this._at < 0.005 && this._game.clearStageNum() > 0 ? 0.001 : 0.2;
			this._camera.rotation.x += (this._cameraRot.x - this._camera.rotation.x) * ease;
			this._camera.rotation.y += (this._cameraRot.y - this._camera.rotation.y) * ease;
			this._camera.rotation.z += (this._cameraRot.z - this._camera.rotation.z) * ease;
			this._checkSeaState(this._at);
			if (this._game.stageId() === 6 && this._bufAt >= 0.28 && (this._nowGround != null)) {
				return this._nowGround.openDoor();
			}
		};

		road.prototype._checkSeaState = function(t) {
			if (this._inSeaAt !== -1 && !this._sea.container().visible && t >= this._inSeaAt) {
				this._sky.hide();
				this._sea.show();
				this._audio.playSeaDownSe();
			}
			if (this._outSeaAt !== -1 && !this._sky.container().visible && t >= this._outSeaAt) {
				this._sky.show();
				this._sea.hide();
				return this._audio.playSeaUpSe();
			}
		};

		road.prototype._getLoadAtPos = function(t, offset) {
			var at, dir, geo, pick, pickNext, pickt, segments;
			if (this._nextGeo != null) {
				geo = this._nextGeo;
			} else {
				geo = this._geo;
			}
			at = (t + offset / geo.parameters.path.getLength()) % 1;
			segments = geo.tangents.length;
			pickt = t * segments;
			pick = Math.floor(pickt);
			pickNext = (pick + 1) % segments;
			if ((geo.binormals[pickNext] != null) && (geo.binormals[pick] != null)) {
				this._binormal.subVectors(geo.binormals[pickNext], geo.binormals[pick]);
				this._binormal.multiplyScalar(pickt - pick).add(geo.binormals[pick]);
			}
			dir = geo.parameters.path.getTangentAt(t);
			this._normal.copy(this._binormal).cross(dir);
			return geo.parameters.path.getPointAt(at);
		};

		road.prototype._offsetLoadAtX = function(pos, offset) {
			return pos.add(this._normal.clone().multiplyScalar(offset));
		};

		road.prototype._offsetLoadAtY = function(pos, offset) {
			return pos.add(this._binormal.clone().multiplyScalar(offset));
		};

		road.prototype.usableGame = function() {
			if (this._at > this._bufAt) {
				return this._at < this._maxAt;
			} else {
				return this._bufAt < this._maxAt;
			}
		};

		road.prototype._hideEtcStage = function() {
			var i, j, len1, ref, results, val;
			ref = this._ground;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if ((val != null) && i !== this._game.stageId()) {
					val.container().position.z = 0;
					results.push(val.hide());
				} else {
					results.push(void 0);
				}
			}
			return results;
		};

		road.prototype._endStage = function() {
			if (this._isPlayingGame && this._isMakeRoad) {
				this._isPlayingGame = false;
				this._isMakeRoad = false;
				this._computeLoopStartAt();
				this._computeNextStageAt();
				this._hideRing();
				if (this.onEndStage != null) {
					return this.onEndStage();
				}
			}
		};

		road.prototype._setUpNextStage = function() {
			if (this.onSetupNextStage != null) {
				return this.onSetupNextStage();
			}
		};

		road.prototype._enterNextStage = function() {
			this._switchRoad();
			this._nowGround = this._ground[this._game.stageId()];
			this._isPlayingGame = true;
			this._isShowItem = false;
			this._hideEtcStage();
			this._hideAllItem();
			this._initRoadParam();
			this._sky.setSky(this._game.stageId(), true);
			if (this.onEnterNextStage != null) {
				return this.onEnterNextStage();
			}
		};

		road.prototype._initRoadParam = function() {
			this._at = 0;
			this._bufAt = 0;
			this._atP = 0;
			this._loopStartAt = 0;
			this._loopCnt = 0;
			this._isEnterLoopArea = false;
			this._runSpeedTg = this._conf.LOOP_AREA_SPEED[this._game.stageId()];
			this._inSeaAt = -1;
			this._outSeaAt = -1;
			if (this._game.stageId() === 4) {
				this._inSeaAt = this._getAtFromX(-this._conf.GROUND_OFFSET.Y, this._geo);
			} else if (this._game.stageId() === 5) {
				this._outSeaAt = this._getAtFromX2(-this._conf.GROUND_OFFSET.Y + 100, this._geo);
			}
			switch (this._game.stageId()) {
				case 4:
					this._maxAt = this._getAtFromZ(-this._nowGround.minGameAreaSize() + this._conf.GAME_END_OFFSET[this._game.stageId()], this._geo, this._mesh);
					break;
				case 5:
					this._maxAt = this._getAtFromZ(-this._nowGround.minGameAreaSize() + this._conf.GAME_END_OFFSET[this._game.stageId()], this._geo, this._mesh);
					break;
				case 6:
					this._maxAt = this._getAtFromZ(-this._nowGround.minGameAreaSize() + this._conf.GAME_END_OFFSET[this._game.stageId()], this._geo, this._mesh);
					break;
				default:
					this._maxAt = this._getAtFromZ(this._nowGround.gameAreaEndZ() + this._conf.GAME_END_OFFSET[this._game.stageId()], this._geo, this._mesh);
			}
			return this._setRing();
		};

		road.prototype._eAddItemAtRoad = function(at, offsetX, offsetY, order, interval, zOffset) {
			var itemAt, itemPos, rank, useItem, z, zRange;
			useItem = this._getUseItem();
			if (useItem == null) {
				return;
			}
			rank = useItem.rank();
			zRange = this._conf.SHOW_ITEM_Z[this._game.stageId()];
			z = this._u.random(zRange[0], zRange[1]) + zOffset;
			if (this._isSmt && Math.abs(window.orientation) === 90) {
				z *= 0.9;
			}
			itemAt = (at + z / this._geo.parameters.path.getLength()) % 1;
			itemPos = this._geo.parameters.path.getPointAt(itemAt);
			itemPos.add(this._binormal.clone().multiplyScalar(this._baseFloor + offsetY));
			itemPos.add(this._normal.clone().multiplyScalar(offsetX));
			useItem.show(itemPos, order, interval);
			return useItem;
		};

		road.prototype._getUseItem = function() {
			var i, j, len1, ref, val;
			ref = this._items;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (!val.isContainStage()) {
					return val;
				}
			}
			return null;
		};

		road.prototype.dispose = function() {
			return road.__super__.dispose.call(this);
		};

		road.prototype.mesh = function() {
			return this._mesh;
		};

		road.prototype._updateLookOffset = function() {
			var ease, nm, rangeX, rangeY, tx, ty;
			if (root.MY.myfw.conf.IS_SMT) {
				ease = this._parameter.get("moveSpeed");
				nm = this._interaction.getNormalizeDeviceAng();
				rangeX = this._parameter.get("moveX");
				rangeY = this._parameter.get("moveY");
				tx = this._u.map(nm.x, rangeX, -rangeX, 0, 1);
				ty = this._u.map(nm.y, -rangeY, rangeY, 0, 1);
			} else {
				ease = this._parameter.get("moveSpeed");
				nm = this._interaction.getNormalizeMousePos();
				rangeX = this._parameter.get("moveX");
				rangeY = this._parameter.get("moveY");
				tx = this._u.map(nm.x, rangeX, -rangeX, 0, 1);
				ty = this._u.map(nm.y, rangeY, -rangeY, 0, 1);
			}
			this._lookOffset.x += (tx - this._lookOffset.x) * ease;
			return this._lookOffset.y += (ty - this._lookOffset.y) * ease;
		};

		road.prototype._eClick = function(mouse) {
			if (!this._isPlaying) {
				return;
			}
			return this._hitTestItems(mouse.x, mouse.y);
		};

		road.prototype._hitTestItems = function(x, y) {
			var combo, i, intersects, item, j, len1, obj, ref, testItems, val, vec, x2, y2;
			if (!this._isPlaying || !this.usableGame()) {
				return;
			}
			testItems = [];
			ref = this._items;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if ((val != null) && val.isHitTarget()) {
					obj = val.get3dObject();
					obj.listKey = i;
					testItems.push(obj);
				}
			}
			x2 = (x / root.MY.myfw.stageWidth()) * 2 - 1;
			y2 = -(y / root.MY.myfw.stageHeight()) * 2 + 1;
			vec = new THREE.Vector3(x2, y2, 0.5);
			vec.unproject(this._camera);
			vec = vec.sub(this._camera.position).normalize();
			this._hitRay.set(this._camera.position, vec);
			intersects = this._hitRay.intersectObjects(testItems);
			if (intersects.length > 0) {
				item = this._items[intersects[0].object.listKey];
				if (item != null) {
					this._line.addPoint(item.container().position.clone(), item.rank());
					combo = this._line.getCombo();
					item.hitAnimation(combo);
					this._lifeUpEffectLing();
					if (this.onGetItem != null) {
						return this.onGetItem(item.rank(), combo);
					}
				}
			}
		};

		road.prototype._hideAllItem = function() {
			var i, j, len1, ref, results, val;
			if (this._items != null) {
				ref = this._items;
				results = [];
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					if (val != null) {
						results.push(val.hide());
					} else {
						results.push(void 0);
					}
				}
				return results;
			}
		};

		road.prototype.disposeRoad = function() {
			if (this._mesh != null) {
				this._container.remove(this._mesh);
				if (this._geo != null) {
					this._geo.dispose();
					this._geo = null;
				}
				this._mesh = null;
			}
			if (this._nextMesh != null) {
				this._container.remove(this._nextMesh);
				if (this._nextGeo != null) {
					this._nextGeo.dispose();
					this._nextGeo = null;
				}
				return this._nextMesh = null;
			}
		};

		road.prototype.disposeItems = function() {
			var i, j, len1, ref, val;
			if (this._items != null) {
				ref = this._items;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					if (val != null) {
						val.dispose();
						this._items[i] = null;
					}
				}
				return this._items = [];
			}
		};

		road.prototype.disposeStgparts = function() {
			var i, j, len1, ref, val;
			if (this._stgparts != null) {
				ref = this._stgparts;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					if (val != null) {
						val.dispose();
						this._stgparts[i] = null;
					}
				}
				return this._stgparts = [];
			}
		};

		road.prototype.disposeGround = function() {};

		road.prototype._eCompleteMaxCombo = function(point) {
			return this._comboMaxEffect.show(point);
		};

		road.prototype._lifeUpEffectLing = function() {
			var i, j, len1, ref, results, val;
			ref = this._ring;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				results.push(val.lifeUp());
			}
			return results;
		};

		return road;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.sea = (function(superClass) {
		extend(sea, superClass);

		function sea() {
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			sea.__super__.constructor.call(this);
			this._obj;
		}

		sea.prototype.start = function() {
			var depth, orgObj;
			sea.__super__.start.call(this);
			orgObj = this._data.getCmnObj3D("sea");
			this._obj = orgObj.clone();
			this._obj.children[0].material.side = THREE.BackSide;
			this._container.add(this._obj);
			this._container.scale.set(this._conf.GROUND_SCALE, this._conf.GROUND_SCALE, this._conf.GROUND_SCALE);
			return depth = this.depthFromBBox(this._obj.children[0].geometry.boundingBox);
		};

		sea.prototype.update = function() {
			sea.__super__.update.call(this);
			if (this._container.visible) {
				this._container.position.z = this._camera.position.z + 700;
				return this._container.rotation.z = this._camera.rotation.z + this._u.radian(0);
			}
		};

		sea.prototype.dispose = function() {
			if (this._obj != null) {
				this._container.remove(this._obj);
				this._obj = null;
			}
			return sea.__super__.dispose.call(this);
		};

		return sea;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.sky = (function(superClass) {
		extend(sky, superClass);

		function sky() {
			this.setSky = bind(this.setSky, this);
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			sky.__super__.constructor.call(this);
			this._scale = this._conf.SKY_SCALE[this._device];
			this._soraList = [];
			this._nextStageId = 0;
			this._prevStageId = 0;
		}

		sky.prototype.start = function() {
			var i, num, sora;
			sky.__super__.start.call(this);
			i = 0;
			num = 1;
			while (i < num) {
				sora = this._data.getCmnObj3D("sky" + String(i)).clone();
				sora.children[0].material.side = THREE.BackSide;
				this._container.add(sora);
				this._soraList.push(sora);
				sora.position.y = -400;
				sora.visible = true;
				i++;
			}
			return this._container.scale.set(this._scale, this._scale, this._scale);
		};

		sky.prototype.update = function() {
			sky.__super__.update.call(this);
			if (this._container.visible) {
				this._container.position.z = this._camera.position.z;
				return this._container.rotation.z = this._camera.rotation.z;
			}
		};

		sky.prototype.dispose = function() {
			var i, j, len1, ref, val;
			if (this._soraList != null) {
				ref = this._soraList;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					this._container.remove(val);
				}
				this._soraList = null;
			}
			return sky.__super__.dispose.call(this);
		};

		sky.prototype.setSky = function(stageId, animate) {
			var i, j, len1, ref, results, val;
			return;
			this._prevStageId = this._nextStageId;
			this._nextStageId = stageId;
			ref = this._soraList;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (animate) {
					val.visible = i === this._nextStageId || i === this._prevStageId;
					if (i === this._nextStageId) {
						results.push(val.children[0].material.opacity = 0);
					} else if (i === this._prevStageId) {
						results.push(val.children[0].material.opacity = 1);
					} else {
						results.push(void 0);
					}
				} else {
					results.push(val.visible = i === this._nextStageId);
				}
			}
			return results;
		};

		return sky;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.stgparts = (function(superClass) {
		extend(stgparts, superClass);

		function stgparts() {
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.start = bind(this.start, this);
			stgparts.__super__.constructor.call(this);
			this._scale = 7;
			this._obj;
		}

		stgparts.prototype.start = function() {
			var orgObj;
			stgparts.__super__.start.call(this);
			orgObj = root.MY.gl.data.getCmnObj3D("cloud");
			this._obj = orgObj.clone();
			this._container.add(this._obj);
			this._obj.rotation.x = this._u.radian(180);
			this._obj.rotation.y = this._u.radian(-180);
			this._obj.rotation.z = this._u.radian(-90);
			this._obj.scale.set(this._scale, this._scale, this._scale);
			return this._container.visible = false;
		};

		stgparts.prototype.show = function(pos) {
			this._container.position.copy(pos);
			return this._container.visible = true;
		};

		stgparts.prototype.hide = function() {
			return this._container.visible = false;
		};

		stgparts.prototype.update = function() {
			return stgparts.__super__.update.call(this);
		};

		stgparts.prototype.dispose = function() {
			if (this._obj != null) {
				this._container.remove(this._obj);
				this._obj = null;
			}
			return stgparts.__super__.dispose.call(this);
		};

		return stgparts;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.topGround = (function(superClass) {
		extend(topGround, superClass);

		function topGround(stageId) {
			this._mostDepthObject = bind(this._mostDepthObject, this);
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			topGround.__super__.constructor.call(this);
			this._stageId = stageId;
			this._groundSize = 0;
			this._stg = [];
			this._kumo = [];
			this._fusha = [];
		}

		topGround.prototype.start = function() {
			var fusha, i, kumo, num, obj, orgObj;
			topGround.__super__.start.call(this);
			orgObj = root.MY.gl.data.getStageObj3D(this._stageId, "stage");
			this._groundSize = this.depthFromBBox(orgObj.children[0].geometry.boundingBox);
			this._groundSize *= this._conf.GROUND_OFFSET.SCALE1;
			i = 0;
			num = 5;
			while (i < num) {
				obj = orgObj.clone();
				this._container.add(obj);
				if (i % 2 !== 0) {
					obj.scale.x = -1;
				} else {
					obj.scale.x = 1;
				}
				obj.position.y = this._conf.GROUND_OFFSET.Y;
				obj.position.z = -this._groundSize * 0.5 - this._groundSize * i;
				this._stg.push(obj);
				kumo = root.MY.gl.data.getCmnObj3D("cloud" + String(this._stageId)).clone();
				this._container.add(kumo);
				kumo.position.copy(obj.position);
				kumo.position.x = this._conf.CLOUD_POS.BASE_X + this._u.range(this._conf.CLOUD_POS.RANEGE_X);
				if (this._isSmt) {
					kumo.position.y = this._conf.CLOUD_POS.BASE_Y + 20 + this._u.range(this._conf.CLOUD_POS.RANEGE_Y);
				} else {
					kumo.position.y = this._conf.CLOUD_POS.BASE_Y + this._u.range(this._conf.CLOUD_POS.RANEGE_Y);
				}
				this._kumo.push(kumo);
				fusha = new root.MY_CLASS.fusha();
				fusha.start();
				this._container.add(fusha.container());
				fusha.show();
				fusha.container().position.z = obj.position.z;
				fusha.container().scale.x = obj.scale.x;
				this._fusha.push(fusha);
				i++;
			}
			this._container.scale.set(this._conf.GROUND_SCALE, this._conf.GROUND_SCALE, this._conf.GROUND_SCALE);
			return this.update();
		};

		topGround.prototype.update = function() {
			var i, j, k, len1, len2, len3, mostObj, n, ref, ref1, ref2, results, val;
			topGround.__super__.update.call(this);
			if (this._container.visible) {
				ref = this._kumo;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					val.position.z += this._conf.TOP_MOVE_SPEED;
				}
				ref1 = this._fusha;
				for (i = k = 0, len2 = ref1.length; k < len2; i = ++k) {
					val = ref1[i];
					val.container().position.z += this._conf.TOP_MOVE_SPEED;
				}
				ref2 = this._stg;
				results = [];
				for (i = n = 0, len3 = ref2.length; n < len3; i = ++n) {
					val = ref2[i];
					val.position.z += this._conf.TOP_MOVE_SPEED;
					if (val.position.z > 100) {
						mostObj = this._mostDepthObject();
						val.position.z = mostObj.position.z - this._groundSize * 0.5 - this._groundSize * 0.5;
						this._kumo[i].position.z = val.position.z;
						this._fusha[i].container().position.z = val.position.z;
						if (mostObj.scale.x === 1) {
							val.scale.x = -1;
						} else {
							val.scale.x = 1;
						}
						results.push(this._fusha[i].container().scale.x = val.scale.x);
					} else {
						results.push(void 0);
					}
				}
				return results;
			}
		};

		topGround.prototype.dispose = function() {
			var i, j, k, len1, len2, len3, n, ref, ref1, ref2, val;
			if (this._kumo != null) {
				ref = this._kumo;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					if (val != null) {
						this._container.remove(val);
					}
				}
				this._kumo = null;
			}
			if (this._stg != null) {
				ref1 = this._stg;
				for (i = k = 0, len2 = ref1.length; k < len2; i = ++k) {
					val = ref1[i];
					if (val != null) {
						this._container.remove(val);
					}
				}
				this._stg = null;
			}
			if (this._fusha != null) {
				ref2 = this._fusha;
				for (i = n = 0, len3 = ref2.length; n < len3; i = ++n) {
					val = ref2[i];
					if (val != null) {
						this._container.remove(val);
					}
				}
				this._fusha = null;
			}
			return topGround.__super__.dispose.call(this);
		};

		topGround.prototype._mostDepthObject = function() {
			var i, j, key, len1, ref, val, z;
			key = 0;
			z = this._stg[0].position.z;
			ref = this._stg;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val.position.z < z) {
					z = val.position.z;
					key = i;
				}
			}
			return this._stg[key];
		};

		return topGround;

	})(root.MY_CLASS.myObject3D);

	root.MY_CLASS.topBgView = (function(superClass) {
		extend(topBgView, superClass);

		function topBgView() {
			this.hide = bind(this.hide, this);
			this.update = bind(this.update, this);
			this.dispose = bind(this.dispose, this);
			this.start = bind(this.start, this);
			topBgView.__super__.constructor.call(this);
			this._topGround;
			this._sky;
			this._isShow = true;
		}

		topBgView.prototype.start = function() {
			topBgView.__super__.start.call(this);
			this._topGround = new root.MY_CLASS.topGround(this._conf.STAGE_ORDER[0]);
			this._topGround.start();
			this._topGround.show();
			this._sky = new root.MY_CLASS.sky();
			this._sky.start();
			this._sky.show();
			this._camera.lookAt(new THREE.Vector3(0, 0, 0));
			return this.update();
		};

		topBgView.prototype.dispose = function() {
			if (this._topGround != null) {
				this._topGround.dispose();
				this._topGround = null;
			}
			if (this._sky != null) {
				this._sky.dispose();
				this._sky = null;
			}
			return topBgView.__super__.dispose.call(this);
		};

		topBgView.prototype.update = function() {
			var ang;
			topBgView.__super__.update.call(this);
			if (this._isShow) {
				ang = Date.now() * 0.05;
				return this._camera.position.y = 15 + Math.sin(this._u.radian(ang)) * 50;
			}
		};

		topBgView.prototype.hide = function() {
			this._sky.hide();
			this._topGround.hide();
			return this._isShow = false;
		};

		return topBgView;

	})(root.MY_CLASS.myView);

	root.MY_CLASS.topView = (function(superClass) {
		extend(topView, superClass);

		function topView() {
			this._eClickStart = bind(this._eClickStart, this);
			this.showUi = bind(this.showUi, this);
			this.hide = bind(this.hide, this);
			this.dispose = bind(this.dispose, this);
			this.start = bind(this.start, this);
			topView.__super__.constructor.call(this);
			this._ui;
			this._bg;
			this.onClickStart;
		}

		topView.prototype.start = function() {
			topView.__super__.start.call(this);
			this._ui = new root.MY_CLASS.topUiView($("#top"));
			this._ui.setup();
			this._ui.onClickStart = this._eClickStart;
			this.showUi();
			this._bg = new root.MY_CLASS.topBgView();
			return this._bg.start();
		};

		topView.prototype.dispose = function() {
			if (this._bg != null) {
				this._bg.dispose();
				this._bg = null;
			}
			if (this._ui != null) {
				this._ui.dispose();
				this._ui = null;
			}
			this.onClickStart = null;
			return topView.__super__.dispose.call(this);
		};

		topView.prototype.hide = function() {
			this._ui.hide();
			return this._bg.hide();
		};

		topView.prototype.showUi = function() {
			return this._ui.show(true, [200, 200][this._device]);
		};

		topView.prototype._eClickStart = function() {
			if (this.onClickStart != null) {
				return this.onClickStart();
			}
		};

		return topView;

	})(root.MY_CLASS.myView);

	root.MY_CLASS.checkRoad = (function() {
		function checkRoad() {
			this._distStr = bind(this._distStr, this);
			this.depthFromBBox = bind(this.depthFromBBox, this);
			this._makeRoad = bind(this._makeRoad, this);
			this._setTestPosition = bind(this._setTestPosition, this);
			this._update = bind(this._update, this);
			this._resize = bind(this._resize, this);
			this.start = bind(this.start, this);
			this._scene;
			this._camera;
			this._ambLight;
			this._renderer;
			this._hAxis;
			this._trackBall;
			this._container;
			this._binormal = new THREE.Vector3();
			this._normal = new THREE.Vector3();
			this._material;
			this._mesh;
			this._debugger;
			this._pNum = 10;
			this._at = 0;
			this._interval = -300;
			this._u = root.MY.myfw.util;
			this._conf = root.MY.app.conf;
		}

		checkRoad.prototype.start = function() {
			this._scene = new THREE.Scene();
			this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50000);
			this._ambLight = new THREE.AmbientLight(0xffffff);
			this._scene.add(this._ambLight);
			this._ambLight.position.set(0, 0, 0);
			this._renderer = new THREE.WebGLRenderer({
				antialias: false
			});
			this._renderer.setClearColor(0xaaaaaa);
			this._renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(this._renderer.domElement);
			this._container = new THREE.Object3D();
			this._scene.add(this._container);
			this._hAxis = new THREE.AxisHelper(5);
			this._container.add(this._hAxis);
			this._material = new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture(this._conf.PATH_IMG.TEX + "niji.jpg")
			});
			this._setTestPosition();
			root.MY.myfw.addResize(this._resize);
			return root.MY.myfw.addUpdate(this._update);
		};

		checkRoad.prototype._resize = function() {
			var h, w;
			w = root.MY.myfw.stageWidth();
			h = root.MY.myfw.stageHeight();
			this._camera.aspect = w / h;
			this._camera.updateProjectionMatrix();
			return this._renderer.setSize(w, h);
		};

		checkRoad.prototype._update = function() {
			var dir, eyeDist, geo, lookAt, now, pick, pickNext, pickt, pos, segments;
			if (this._mesh != null) {
				this._at += 0.001;
				if (this._at >= 1) {
					this._at = 0;
				}
				geo = this._mesh.geometry;
				console.log(this._at);
				pos = geo.parameters.path.getPointAt(this._at);
				segments = geo.tangents.length;
				pickt = this._at * segments;
				pick = Math.floor(pickt);
				pickNext = (pick + 1) % segments;
				if ((geo.binormals[pickNext] != null) && (geo.binormals[pick] != null)) {
					this._binormal.subVectors(geo.binormals[pickNext], geo.binormals[pick]);
					this._binormal.multiplyScalar(pickt - pick).add(geo.binormals[pick]);
				}
				dir = geo.parameters.path.getTangentAt(this._at);
				this._normal.copy(this._binormal).cross(dir);
				pos.add(this._binormal.clone().multiplyScalar(15));
				this._camera.position.copy(pos);
				eyeDist = 30;
				now = (this._at + eyeDist / geo.parameters.path.getLength()) % 1;
				lookAt = geo.parameters.path.getPointAt(now);
				lookAt.add(this._binormal.clone().multiplyScalar(15));
				this._camera.matrix.lookAt(this._camera.position, lookAt, this._binormal);
				this._camera.rotation.setFromRotationMatrix(this._camera.matrix, this._camera.rotation.order);
			}
			return this._renderer.render(this._scene, this._camera);
		};

		checkRoad.prototype._setTestPosition = function() {
			var base, i, p, param;
			base = [
				{
					x: 0,
					y: 0,
					z: 0
				}, {
					x: 0,
					y: 0,
					z: -850
				}, {
					x: 0,
					y: 0,
					z: -1700
				}, {
					x: 0,
					y: 40,
					z: -2550
				}, {
					x: 0,
					y: -20,
					z: -3400
				}, {
					x: 0,
					y: 20,
					z: -4250
				}, {
					x: 0,
					y: -10,
					z: -5100
				}, {
					x: 0,
					y: 20,
					z: -5950
				}, {
					x: 0,
					y: 0,
					z: -6800
				}, {
					x: 0,
					y: 0,
					z: -7650
				}, {
					x: -190,
					y: 0,
					z: -8500
				}, {
					x: -190,
					y: 0,
					z: -9350
				}, {
					x: -190,
					y: 0,
					z: -10200
				}, {
					x: -190,
					y: 0,
					z: -11050
				}, {
					x: -190,
					y: 0,
					z: -11900
				}, {
					x: -190,
					y: 0,
					z: -12750
				}, {
					x: 0,
					y: 0,
					z: -13600
				}, {
					x: -20,
					y: 0,
					z: -14450
				}, {
					x: 0,
					y: 0,
					z: -15300
				}, {
					x: 0,
					y: 0,
					z: -16150
				}
			];
			if (base != null) {
				this._pNum = base.length;
			} else {
				this._pNum = 20;
				this._interval = -380;
			}
			i = 0;
			param = [];
			while (i < this._pNum) {
				if (base == null) {
					p = {
						x: 0,
						y: 0,
						z: this._interval * i
					};
					param.push({
						type: 0,
						name: String(i) + "_z",
						def: p.z,
						min: this._pNum * this._interval,
						max: 0,
						int: true,
						useStrg: false
					});
				} else {
					p = base[i];
					param.push({
						type: 0,
						name: String(i) + "_z",
						def: p.z,
						min: base[base.length - 1].z,
						max: 0,
						int: true,
						useStrg: false
					});
				}
				param.push({
					type: 0,
					name: String(i) + "_x",
					def: p.x,
					min: -50,
					max: 50,
					int: true,
					useStrg: false
				});
				param.push({
					type: 0,
					name: String(i) + "_y",
					def: p.y,
					min: -50,
					max: 50,
					int: true,
					useStrg: false
				});
				i++;
			}
			this._debugger = new root._LIBS.debugView($("#debug"), param);
			this._debugger.onChange = this._makeRoad;
			this._debugger.setup();
			this._makeRoad();
			return $(window).keydown((function(_this) {
				return function(e) {
					if (e.keyCode === 32) {
						_this._makeRoad();
					}
					if (e.keyCode === 13) {
						return _this._distStr();
					}
				};
			})(this));
		};

		checkRoad.prototype._makeRoad = function() {
			var geo, i, p, radSegments, radius, segments, spline;
			if (this._mesh != null) {
				this._container.remove(this._mesh);
				this._mesh.geometry.dispose();
				this._mesh = null;
			}
			p = [];
			i = 0;
			while (i < this._pNum) {
				p.push(new THREE.Vector3(this._debugger.get(String(i) + "_x"), this._debugger.get(String(i) + "_y"), this._debugger.get(String(i) + "_z")));
				i++;
			}
			segments = 5000;
			radius = 10;
			radSegments = 2;
			spline = new THREE.SplineCurve3(p);
			geo = new THREE.TubeGeometry(spline, segments, radius, radSegments, false);
			geo.computeBoundingSphere();
			geo.computeBoundingBox();
			this._mesh = new THREE.Mesh(geo, this._material);
			this._container.add(this._mesh);
			console.log("闀枫仌::", this.depthFromBBox(geo.boundingBox));
			return this._at = 0;
		};

		checkRoad.prototype.depthFromBBox = function(b) {
			return b.max.z - b.min.z;
		};

		checkRoad.prototype._distStr = function() {
			var i, str;
			str = "[";
			i = 0;
			while (i < this._pNum) {
				str += "{";
				str += "x:" + String(this._debugger.get(String(i) + "_x")) + ",";
				str += "y:" + String(this._debugger.get(String(i) + "_y")) + ",";
				str += "z:" + String(this._debugger.get(String(i) + "_z")) + "}";
				if (i !== this._pNum - 1) {
					str += ",";
				}
				i++;
			}
			str += "]";
			return console.log(str);
		};

		return checkRoad;

	})();

	root.MY_CLASS.checkerMain = (function() {
		function checkerMain() {
			this._update = bind(this._update, this);
			this._resize = bind(this._resize, this);
			this._eCompleteCmnObjData = bind(this._eCompleteCmnObjData, this);
			this._getDae = bind(this._getDae, this);
			this.start = bind(this.start, this);
			this._scene;
			this._camera;
			this._dLight;
			this._ambLight;
			this._renderer;
			this._hCamera;
			this._hLight;
			this._hAxis;
			this._trackBall;
			this._container;
			this._obj;
			this._water;
			this._mesh;
			this._cnt = 0;
			this._geo;
			this._nowZ = 0;
			this._roadGeomeryNowPos = new THREE.Vector3();
			this._cmnObjMgr;
			this._stg;
			this._kujira = [];
			this._u = root.MY.myfw.util;
			this._clock;
			this._fusha;
			this._animation = [];
			this._conf = root.MY.app.conf;
		}

		checkerMain.prototype.start = function() {
			this._clock = new THREE.Clock();
			this._scene = new THREE.Scene();
			this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50000);
			this._camera.position.set(34.1593114077221, 14.246622233488102, 142.6781095688237);
			this._ambLight = new THREE.AmbientLight(0xffffff);
			this._scene.add(this._ambLight);
			this._ambLight.position.set(0, 0, 0);
			this._renderer = new THREE.WebGLRenderer({
				antialias: false
			});
			this._renderer.setClearColor(0x666666);
			this._renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(this._renderer.domElement);
			this._trackBall = new THREE.TrackballControls(this._camera);
			this._trackBall.staticMoving = true;
			this._trackBall.target = new THREE.Vector3(0, 0, 0);
			this._cmnObjMgr = new root.MY_CLASS.multiObjLoader();
			this._cmnObjMgr.onComplete = this._eCompleteCmnObjData;
			this._cmnObjMgr.load([
				{
					key: "stg",
					file: "./assets/obj/stage/stage07_01.obj",
					tex: THREE.ImageUtils.loadTexture("./assets/img/tex/stage/stage07.jpg"),
					rePos: true
				}, {
					key: "parts0",
					file: "./assets/obj/parts/stage07_tobira_L.obj",
					tex: THREE.ImageUtils.loadTexture("./assets/img/tex/stage/stage07.jpg"),
					rePos: true
				}, {
					key: "parts1",
					file: "./assets/obj/parts/stage07_tobira_R.obj",
					tex: THREE.ImageUtils.loadTexture("./assets/img/tex/stage/stage07.jpg"),
					rePos: true
				}
			]);
			root.MY.myfw.addResize(this._resize);
			return root.MY.myfw.addUpdate(this._update);
		};

		checkerMain.prototype._getDae = function() {
			return location.hash.replace("#", "") + ".dae";
		};

		checkerMain.prototype._eCompleteCmnObjData = function() {
			var door, i, kujira, kujiras, left, leftCon, leftW, num, pos, right, rightCon, rightW;
			this._container = new THREE.Object3D();
			this._scene.add(this._container);
			this._hAxis = new THREE.AxisHelper(5);
			this._container.add(this._hAxis);
			this._stg = this._cmnObjMgr.get("stg").obj.clone();
			this._container.add(this._stg);
			this._stg.position.y = this._conf.GROUND_OFFSET.Y;
			this._stg.position.z = -(this._stg.children[0].geometry.boundingBox.max.z - this._stg.children[0].geometry.boundingBox.min.z) * 0.5;
			door = new THREE.Object3D();
			this._container.add(door);
			door.position.copy(this._stg.position);
			door.position.z -= 980;
			leftCon = new THREE.Object3D();
			door.add(leftCon);
			leftCon.add(new THREE.AxisHelper(5));
			left = this._cmnObjMgr.get("parts0").obj.clone();
			leftW = left.children[0].geometry.boundingBox.max.x - left.children[0].geometry.boundingBox.min.x;
			leftCon.add(left);
			left.position.x = leftW;
			leftCon.position.x = -leftW;
			leftCon.rotation.y = this._u.radian(-90);
			rightCon = new THREE.Object3D();
			door.add(rightCon);
			rightCon.add(new THREE.AxisHelper(5));
			right = this._cmnObjMgr.get("parts1").obj.clone();
			rightW = right.children[0].geometry.boundingBox.max.x - right.children[0].geometry.boundingBox.min.x;
			rightCon.add(right);
			right.position.x = -rightW;
			rightCon.position.x = rightW;
			rightCon.rotation.y = this._u.radian(90);
			this._container.position.z = 2300;
			this._container.position.y = -100;
			return;
			kujiras = this._cmnObjMgr.get("parts0").obj.clone();
			this._container.add(kujiras);
			kujiras.position.copy(this._stg.position);
			i = 0;
			num = 5;
			pos = [[0, 0, -120, 1], [300, -110, 200, 0.6], [-300, -200, -400, 0.5], [-150, -200, 400, 0.35], [0, -300, 100, 0.4]];
			while (i < num) {
				kujira = this._cmnObjMgr.get("parts1").obj.clone();
				this._container.add(kujira);
				kujira.position.copy(this._stg.position);
				kujira.children[0].material.wireframe = true;
				kujira.position.x += pos[i][0];
				kujira.position.y += pos[i][1];
				kujira.position.z += pos[i][2];
				kujira.scale.set(pos[i][3], pos[i][3], pos[i][3]);
				i++;
			}
			return this._container.scale.set(5, 5, 5);
		};

		checkerMain.prototype._resize = function() {
			var h, w;
			w = root.MY.myfw.stageWidth();
			h = root.MY.myfw.stageHeight();
			this._camera.aspect = w / h;
			this._camera.updateProjectionMatrix();
			return this._renderer.setSize(w, h);
		};

		checkerMain.prototype._update = function() {
			this._trackBall.update();
			THREE.AnimationHandler.update(this._clock.getDelta());
			if (this._fusha != null) {
				this._fusha.rotation.z += 0.01;
			}
			return this._renderer.render(this._scene, this._camera);
		};

		return checkerMain;

	})();

	root.MY_CLASS.conf = (function() {
		function conf() {

			/*   銉儶銉笺偣 */
			var key, ref, val;
			this.RELEASE = true;

			/*   鍏ㄤ綋 */
			this.TEST = {
				DEBUGTOOL: false,
				STATS: false
			};
			if (this.RELEASE) {
				ref = this.TEST;
				for (key in ref) {
					val = ref[key];
					this.TEST[key] = false;
				}
			}
			this.IMG_RETINA = root.MY.myfw.conf.IS_SMT;
			this.IS_CAP = !this.RELEASE && location.hash.replace("#", "") === "cap";
			this.FB_APP_ID = "1622947397934923";

			/*   姗熻兘绯� */
			this.SOUND_SWF = root.MY.myfw.conf.IS_IE;
			this.SOUND_SWF_ID = "soundSwf";

			/*   璀樺垾ID */
			this.SNS_TW = 0;
			this.SNS_FB = 1;
			this.SNS_LINE = 2;

			/*   銉曘偂銈ゃ儷 */
			this.PATH_IMG = {
				TEX: "./assets/img/tex/",
				LOADING: "./assets/img/loading/",
				TOP: "./assets/img/top/",
				FOOTER: "./assets/img/footer/",
				NUM: "./assets/img/parts/num/",
				PARTS: "./assets/img/parts/",
				GAMEUI: "./assets/img/gameUi/",
				CLEAR: "./assets/img/clear/",
				RESULT_PC: "./assets/img/result/pc/",
				RESULT_SMT: "./assets/img/result/smt/",
				SYSTEM: "./assets/img/system/",
				HELP: "./assets/img/help/",
				SORRY: "./assets/img/sorry/"
			};
			this.PATH_JSON = {
				PARAM: "./assets/json/param/"
			};
			this.PATH_SOUND = {
				BGM: "./assets/sound/"
			};
			this.PATH_OBJ = {
				STAGE: "./assets/obj/stage/",
				ONPU: "./assets/obj/onpu/",
				SKY: "./assets/obj/sora/",
				PARTS: "./assets/obj/parts/"
			};
			this.FILE_SOUND = "./assets/swf/sound.swf";
			this.FILE_SWFINSTALL = "./assets/swf/expressInstall.swf";
			this.FILE_STAGE_BGM = [this.PATH_SOUND.BGM + "0.mp3", this.PATH_SOUND.BGM + "1.mp3", this.PATH_SOUND.BGM + "2.mp3", this.PATH_SOUND.BGM + "3.mp3", this.PATH_SOUND.BGM + "4.mp3", this.PATH_SOUND.BGM + "5.mp3", this.PATH_SOUND.BGM + "6.mp3"];
			this.FILE_SKY_OBJ = this.PATH_OBJ.SKY + "sora_base_0413.obj";
			this.FILE_ITEM_OBJ = [this.PATH_OBJ.ONPU + "onpu_1.obj", this.PATH_OBJ.ONPU + "onpu_2.obj", this.PATH_OBJ.ONPU + "onpu_3.obj"];
			this.FILE_STAGE_TEX = [this.PATH_IMG.TEX + "stage/stage01.jpg", this.PATH_IMG.TEX + "stage/stage02.jpg", this.PATH_IMG.TEX + "stage/stage03.jpg", this.PATH_IMG.TEX + "stage/stage04.jpg", this.PATH_IMG.TEX + "stage/stage05.jpg", this.PATH_IMG.TEX + "stage/stage06.jpg", this.PATH_IMG.TEX + "stage/stage07.jpg"];
			this.FILE_STAGE_OBJ = [this.PATH_OBJ.STAGE + "stage01_01.obj", this.PATH_OBJ.STAGE + "stage02_01.obj", this.PATH_OBJ.STAGE + "stage03_01.obj", this.PATH_OBJ.STAGE + "stage04_01.obj", this.PATH_OBJ.STAGE + "stage05_01.obj", this.PATH_OBJ.STAGE + "stage06_01.obj", this.PATH_OBJ.STAGE + "stage07_01.obj"];
			this.FILE_STAGR5_A_OBJ = this.PATH_OBJ.STAGE + "stage05_01_A.obj";
			this.FILE_STAGE_LOADING_OBJ = [this.PATH_OBJ.STAGE + "stage01_00.obj", this.PATH_OBJ.STAGE + "stage02_00.obj", this.PATH_OBJ.STAGE + "stage03_00.obj", this.PATH_OBJ.STAGE + "stage04_00.obj", this.PATH_OBJ.STAGE + "stage05_00.obj", this.PATH_OBJ.STAGE + "stage06_00.obj", this.PATH_OBJ.STAGE + "stage07_00.obj"];
			this.FILE_CLOUD_OBJ = [this.PATH_OBJ.PARTS + "cloud.obj", this.PATH_OBJ.PARTS + "stage02_cloud_0413.obj", this.PATH_OBJ.PARTS + "stage03_cloud_0414.obj", this.PATH_OBJ.PARTS + "stage04_cloud.obj", this.PATH_OBJ.PARTS + "stage05_cloud_0409.obj", this.PATH_OBJ.PARTS + "stage01_cloud_0413.obj"];
			this.FILE_BOAT_OBJ = [this.PATH_OBJ.PARTS + "stage05_fune.obj", this.PATH_OBJ.PARTS + "stage5_animal_fune_0413.obj"];
			this.FILE_KUJIRA_OBJ = [this.PATH_OBJ.PARTS + "stage06_kujira_kari_1piki_0413.obj"];
			this.FILE_SEA_OBJ = [this.PATH_OBJ.PARTS + "stage06_BG_0410.obj"];
			this.FILE_SEADOWN_OBJ = [this.PATH_OBJ.PARTS + "stage06_iwa_only.obj"];
			this.FILE_CASTLE_OBJ = [this.PATH_OBJ.PARTS + "stage07_shiro_tori.obj", this.PATH_OBJ.PARTS + "stage07_tobira_L.obj", this.PATH_OBJ.PARTS + "stage07_tobira_R.obj"];
			this.FILE_FUSYA_OBJ = [this.PATH_OBJ.PARTS + "stage01_fusha.obj"];
			this.FILE_ITEM_TEX = this.PATH_IMG.TEX + "onpu/onpu.jpg";
			this.FILE_SKY_TEX = [this.PATH_IMG.TEX + "sora/sora_base_0413.jpg", this.PATH_IMG.TEX + "sora/sora1.jpg", this.PATH_IMG.TEX + "sora/sora2.jpg", this.PATH_IMG.TEX + "sora/sora3.jpg", this.PATH_IMG.TEX + "sora/sora4.jpg", this.PATH_IMG.TEX + "sora/sora5.jpg", this.PATH_IMG.TEX + "sora/sora6.jpg"];
			this.FILE_CLOUD_TEX = [this.PATH_IMG.TEX + "parts/cloud_01.jpg"];
			this.FILE_BOAT_TEX = [this.PATH_IMG.TEX + "parts/05_boat.jpg"];
			this.FILE_KUJIRA_TEX = [this.PATH_IMG.TEX + "parts/Whale_texture2.jpg"];
			this.FILE_SEA_TEX = [this.PATH_IMG.TEX + "parts/stage06_sea_color.jpg"];
			this.FILE_CASTLE_TEX = [this.PATH_IMG.TEX + "parts/castle3.jpg"];
			this.FILE_FIX_PARAM = this.PATH_JSON.PARAM + "fix.json";
			this.BLEND = ["ZeroFactor", "OneFactor", "SrcAlphaFactor", "OneMinusSrcAlphaFactor", "DstAlphaFactor", "OneMinusDstAlphaFactor", "DstColorFactor", "OneMinusDstColorFactor", "SrcAlphaSaturateFactor"];

			/*   URL */
			this.THIS_SITE = "http://room-ayaka.jp/rainbowroad/special03/";
			this.LINK_SP_SITE = "http://room-ayaka.jp/rainbowroad/";
			this.TAG_SP_MOVIE = '<iframe width="<width>" height="<height>" src="https://www.youtube.com/embed/tm9QCO5ISRY?rel=0" frameborder="0" allowfullscreen></iframe>';
			this.SITE_SHARE_TW = "https://twitter.com/intent/tweet?text=<text>";
			this.SITE_SHARE_FB = "https://www.facebook.com/sharer/sharer.php?u=<url>";
			this.SITE_SHARE_TEXT_TW = "绲㈤ New Album銆屻儸銈ゃ兂銉溿兗銉兗銉夈€峉pecial Contents <url>";
			this.RESULT_SHARE_TW = this.SITE_SHARE_TW;
			this.RESULT_SHARE_LINE = "http://line.me/R/msg/text/?<text>";
			this.RESULT_SHARE_TEXT_TW = "Record <point>AYAKm #ayaka_rainbowroad 绲㈤ New Album銆屻儸銈ゃ兂銉溿兗銉兗銉夈€峉pecial Contents <url>";
			this.RESULT_SHARE_TEXT_FB = "Record <point>AYAKm #ayaka_rainbowroad 绲㈤ New Album銆屻儸銈ゃ兂銉溿兗銉兗銉夈€峉pecial Contents";
			this.RESULT_SHARE_TEXT_LINE = "Record <point>AYAKm 绲㈤ New Album銆屻儸銈ゃ兂銉溿兗銉兗銉夈€峉pecial Contents <url>";

			/*  銈层兗銉犺ō瀹� */
			this.LOADING_RATE = [0.6, 0.2, 0.1, 0.1];
			this.STAGE_ORDER = [0, 1, 2, 3, 4, 5, 6];
			this.BG_COLOR = [0xffffff, 0x2dbae5];
			this.START_BTN_COLOR = [0xf599a0, 0xf39800, 0xfff100, 0x90c31f, 0x1d2088, 0x920783, 0xe4007f];
			this.STG5_OFFSET_Y = 400;
			this.STG_INTERVAL = 60 * 2;
			this.LOOP_AREA_SPEED = [0.001, 0.001, 0.001, 0.001, 0.0008, 0.001, 0.0008];
			this.GAME_END_OFFSET = [500, 500, 500, 500, 1700, 4000, 3000];
			this.SHOW_ITEM_Z = [[1100, 1100], [1100, 1100], [1100, 1100], [1100, 1100], [1100, 1100], [1100, 1100], [1300, 1300]];
			this.GAME_START_LOAD_AT = [0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02];
			this.LOOP_STAGE_NUM = [8, 9, 9, 9, 6, 5, 5];
			this.ROAD_POINT = [
				[
					{
						x: 0,
						y: 0,
						z: 0
					}, {
					x: 0,
					y: 0,
					z: -450
				}, {
					x: 0,
					y: 0,
					z: -900
				}, {
					x: 0,
					y: 0,
					z: -1350
				}, {
					x: 0,
					y: 10,
					z: -1800
				}, {
					x: 0,
					y: -10,
					z: -2250
				}, {
					x: 0,
					y: 20,
					z: -2700
				}, {
					x: 0,
					y: -10,
					z: -3150
				}, {
					x: 0,
					y: 0,
					z: -3600
				}, {
					x: 0,
					y: 0,
					z: -4050
				}, {
					x: 0,
					y: 0,
					z: -4500
				}, {
					x: 0,
					y: 0,
					z: -4950
				}, {
					x: 0,
					y: 0,
					z: -5400
				}, {
					x: 0,
					y: 0,
					z: -5850
				}, {
					x: 30,
					y: 0,
					z: -6300
				}, {
					x: -4,
					y: 0,
					z: -6650
				}, {
					x: 400,
					y: 0,
					z: -6900
				}, {
					x: 400,
					y: 0,
					z: -7387
				}, {
					x: 400,
					y: 0,
					z: -8721
				}, {
					x: 400,
					y: 0,
					z: -9722
				}
				], [
					{
						x: 400,
						y: 0,
						z: 0
					}, {
						x: 400,
						y: 0,
						z: -450
					}, {
						x: 400,
						y: 0,
						z: -900
					}, {
						x: 400,
						y: 0,
						z: -1350
					}, {
						x: 400,
						y: 0,
						z: -1800
					}, {
						x: 400,
						y: 0,
						z: -2250
					}, {
						x: 400,
						y: 0,
						z: -2700
					}, {
						x: 400,
						y: 20,
						z: -3150
					}, {
						x: 400,
						y: -20,
						z: -3600
					}, {
						x: 400,
						y: 10,
						z: -4050
					}, {
						x: 400,
						y: 0,
						z: -4500
					}, {
						x: 400,
						y: 0,
						z: -4950
					}, {
						x: 400,
						y: -10,
						z: -5400
					}, {
						x: 400,
						y: 20,
						z: -5850
					}, {
						x: 400,
						y: 0,
						z: -6300
					}, {
						x: 400,
						y: 0,
						z: -6750
					}, {
						x: 400,
						y: 0,
						z: -7200
					}, {
						x: 400,
						y: 0,
						z: -7650
					}, {
						x: 400,
						y: 0,
						z: -8100
					}, {
						x: 400,
						y: 0,
						z: -8550
					}, {
						x: 400,
						y: 0,
						z: -9000
					}, {
						x: 390,
						y: 0,
						z: -9450
					}, {
						x: 421,
						y: 0,
						z: -9900
					}, {
						x: -50,
						y: 0,
						z: -10350
					}, {
						x: 25,
						y: 0,
						z: -10800
					}, {
						x: 0,
						y: 0,
						z: -11250
					}, {
						x: 0,
						y: 0,
						z: -11700
					}, {
						x: 0,
						y: 0,
						z: -12150
					}, {
						x: 0,
						y: 0,
						z: -12600
					}, {
						x: 0,
						y: 0,
						z: -13050
					}, {
						x: 0,
						y: 0,
						z: -13500
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -850
					}, {
						x: 0,
						y: 0,
						z: -1700
					}, {
						x: 0,
						y: 40,
						z: -2550
					}, {
						x: 0,
						y: -20,
						z: -3400
					}, {
						x: 0,
						y: 20,
						z: -4250
					}, {
						x: 0,
						y: -10,
						z: -5100
					}, {
						x: 0,
						y: 20,
						z: -5950
					}, {
						x: 0,
						y: 0,
						z: -6800
					}, {
						x: 0,
						y: 0,
						z: -7650
					}, {
						x: -190,
						y: 0,
						z: -8500
					}, {
						x: -190,
						y: 0,
						z: -9350
					}, {
						x: -190,
						y: 0,
						z: -10200
					}, {
						x: -190,
						y: 0,
						z: -11050
					}, {
						x: -190,
						y: 0,
						z: -11900
					}, {
						x: -190,
						y: 0,
						z: -12750
					}, {
						x: 0,
						y: 0,
						z: -13600
					}, {
						x: -20,
						y: 0,
						z: -14450
					}, {
						x: 0,
						y: 0,
						z: -15300
					}, {
						x: 0,
						y: 0,
						z: -16150
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -380
					}, {
						x: 0,
						y: 0,
						z: -760
					}, {
						x: 0,
						y: 0,
						z: -1140
					}, {
						x: 0,
						y: 0,
						z: -1520
					}, {
						x: 0,
						y: 10,
						z: -1900
					}, {
						x: 0,
						y: 10,
						z: -2280
					}, {
						x: 0,
						y: 0,
						z: -2660
					}, {
						x: 0,
						y: 0,
						z: -3040
					}, {
						x: 0,
						y: -10,
						z: -3420
					}, {
						x: 0,
						y: -10,
						z: -3800
					}, {
						x: 0,
						y: 0,
						z: -4180
					}, {
						x: 0,
						y: 0,
						z: -4560
					}, {
						x: 0,
						y: 0,
						z: -4940
					}, {
						x: 10,
						y: 0,
						z: -5320
					}, {
						x: -20,
						y: 0,
						z: -5700
					}, {
						x: 0,
						y: 0,
						z: -6080
					}, {
						x: 0,
						y: 0,
						z: -6460
					}, {
						x: 0,
						y: 0,
						z: -6840
					}, {
						x: 0,
						y: 0,
						z: -7220
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -380
					}, {
						x: 0,
						y: 0,
						z: -760
					}, {
						x: -5,
						y: 0,
						z: -1140
					}, {
						x: 0,
						y: 0,
						z: -1520
					}, {
						x: 5,
						y: 0,
						z: -1900
					}, {
						x: 0,
						y: 0,
						z: -2280
					}, {
						x: 0,
						y: 10,
						z: -2660
					}, {
						x: 0,
						y: -10,
						z: -3040
					}, {
						x: 0,
						y: 10,
						z: -3420
					}, {
						x: 0,
						y: -10,
						z: -3800
					}, {
						x: 0,
						y: 0,
						z: -4180
					}, {
						x: 0,
						y: 0,
						z: -4560
					}, {
						x: 0,
						y: 0,
						z: -4940
					}, {
						x: 10,
						y: 0,
						z: -5320
					}, {
						x: -20,
						y: 0,
						z: -5700
					}, {
						x: 0,
						y: 0,
						z: -6080
					}, {
						x: 0,
						y: 0,
						z: -6460
					}, {
						x: 0,
						y: 0,
						z: -6840
					}, {
						x: 0,
						y: 0,
						z: -7220
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -380
					}, {
						x: 0,
						y: 0,
						z: -760
					}, {
						x: 0,
						y: -9,
						z: -1140
					}, {
						x: 0,
						y: 12,
						z: -1520
					}, {
						x: 0,
						y: 10,
						z: -1900
					}, {
						x: 0,
						y: 0,
						z: -2279
					}, {
						x: 0,
						y: 10,
						z: -2660
					}, {
						x: 0,
						y: -10,
						z: -3040
					}, {
						x: 0,
						y: 10,
						z: -3420
					}, {
						x: 0,
						y: -10,
						z: -3800
					}, {
						x: 0,
						y: 0,
						z: -4180
					}, {
						x: 0,
						y: 0,
						z: -4560
					}, {
						x: 20,
						y: 0,
						z: -4940
					}, {
						x: -22,
						y: 0,
						z: -5320
					}, {
						x: 0,
						y: 0,
						z: -5700
					}, {
						x: 0,
						y: 0,
						z: -6080
					}, {
						x: 0,
						y: 0,
						z: -6460
					}, {
						x: 0,
						y: 0,
						z: -6840
					}, {
						x: 0,
						y: 0,
						z: -7220
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -380
					}, {
						x: 0,
						y: 0,
						z: -760
					}, {
						x: -9,
						y: 0,
						z: -1140
					}, {
						x: -29,
						y: 0,
						z: -1520
					}, {
						x: 33,
						y: 0,
						z: -1900
					}, {
						x: -10,
						y: 0,
						z: -2280
					}, {
						x: 0,
						y: 0,
						z: -2660
					}, {
						x: 0,
						y: 0,
						z: -3040
					}, {
						x: 0,
						y: 0,
						z: -3420
					}, {
						x: 0,
						y: 5,
						z: -3800
					}, {
						x: 0,
						y: -48,
						z: -4180
					}, {
						x: 0,
						y: 10,
						z: -4560
					}, {
						x: 0,
						y: -8,
						z: -4982
					}, {
						x: 0,
						y: 0,
						z: -5320
					}, {
						x: 0,
						y: 0,
						z: -5700
					}, {
						x: 0,
						y: 0,
						z: -6080
					}, {
						x: 0,
						y: 0,
						z: -6460
					}, {
						x: 0,
						y: 0,
						z: -6840
					}, {
						x: 0,
						y: 0,
						z: -7220
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -380
					}, {
						x: 0,
						y: 0,
						z: -760
					}, {
						x: 0,
						y: 40,
						z: -1140
					}, {
						x: 0,
						y: -40,
						z: -1520
					}, {
						x: 0,
						y: 0,
						z: -1900
					}, {
						x: 40,
						y: 0,
						z: -2280
					}, {
						x: -32,
						y: 0,
						z: -2660
					}, {
						x: 15,
						y: 0,
						z: -3040
					}, {
						x: 0,
						y: 0,
						z: -3420
					}, {
						x: 0,
						y: 0,
						z: -3800
					}, {
						x: 0,
						y: 20,
						z: -4180
					}, {
						x: 0,
						y: -40,
						z: -4560
					}, {
						x: 0,
						y: 20,
						z: -4940
					}, {
						x: 0,
						y: -20,
						z: -5320
					}, {
						x: 0,
						y: 0,
						z: -5700
					}, {
						x: 0,
						y: 0,
						z: -6080
					}, {
						x: 0,
						y: 0,
						z: -6460
					}, {
						x: 0,
						y: 0,
						z: -6840
					}, {
						x: 0,
						y: 0,
						z: -7220
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -380
					}, {
						x: 0,
						y: 0,
						z: -760
					}, {
						x: 0,
						y: 0,
						z: -1140
					}, {
						x: 0,
						y: -5,
						z: -1520
					}, {
						x: 0,
						y: 40,
						z: -1900
					}, {
						x: 0,
						y: -30,
						z: -2280
					}, {
						x: 0,
						y: 30,
						z: -2660
					}, {
						x: 0,
						y: -10,
						z: -3040
					}, {
						x: 0,
						y: 16,
						z: -3420
					}, {
						x: 0,
						y: 0,
						z: -3800
					}, {
						x: 0,
						y: 0,
						z: -4180
					}, {
						x: 0,
						y: 20,
						z: -4560
					}, {
						x: 0,
						y: -20,
						z: -4940
					}, {
						x: 0,
						y: 25,
						z: -5320
					}, {
						x: 0,
						y: -20,
						z: -5700
					}, {
						x: 0,
						y: 0,
						z: -6080
					}, {
						x: 0,
						y: 0,
						z: -6460
					}, {
						x: 0,
						y: 0,
						z: -6840
					}, {
						x: 0,
						y: 0,
						z: -7220
					}
				]
			];
			this.GAME_SPEED = [320, 370, 380, 300, 375, 400, 150];
			this.ROAD_SPLINE_POINT_NUM = [90, 90, 90, 90, 90, 90, 200];
			this.ROAD_SPLINE_POINT = [
				[
					{
						x: 0,
						y: 8
					}, {
					x: 0,
					y: -8
				}, {
					x: 0,
					y: 0
				}, {
					x: -10,
					y: 0
				}, {
					x: 20,
					y: 0
				}, {
					x: -5,
					y: 0
				}, {
					x: 0,
					y: 10
				}, {
					x: 0,
					y: -10
				}, {
					x: 0,
					y: 5
				}
				], [
					{
						x: 0,
						y: -8
					}, {
						x: 0,
						y: 8
					}, {
						x: 0,
						y: 0
					}, {
						x: -20,
						y: 0
					}, {
						x: 20,
						y: 0
					}, {
						x: -10,
						y: 0
					}, {
						x: 0,
						y: -20
					}, {
						x: 0,
						y: 20
					}, {
						x: 0,
						y: 0
					}
				], [
					{
						x: 0,
						y: 0
					}, {
						x: 10,
						y: 0
					}, {
						x: -10,
						y: 0
					}, {
						x: 0,
						y: 0
					}, {
						x: 8,
						y: 0
					}, {
						x: -8,
						y: 0
					}, {
						x: 0,
						y: 0
					}, {
						x: 0,
						y: 0
					}, {
						x: 0,
						y: 0
					}
				]
			];
			this.ROAD_LOOP_POINT_NUM = [~~(this.ROAD_SPLINE_POINT_NUM[0] * 0.8), ~~(this.ROAD_SPLINE_POINT_NUM[1] * 0.8), ~~(this.ROAD_SPLINE_POINT_NUM[2] * 0.8), ~~(this.ROAD_SPLINE_POINT_NUM[3] * 0.8), ~~(this.ROAD_SPLINE_POINT_NUM[4] * 0.8), ~~(this.ROAD_SPLINE_POINT_NUM[5] * 0.8), ~~(this.ROAD_SPLINE_POINT_NUM[6] * 0.7)];
			this.MAX_AYAKM = 99999;
			this.FAV = 45;
			this.BASE_FLOOR = 15;
			this.LOOK_AT_ROAD = 30;
			this.STAGE_NUM = 7;
			this.BG_OPACITY = [0.15, 0.5];
			this.PRE_SET_LINE_NUM = 6;
			this.PRE_SET_ITEM_NUM = 17;
			this.ITEM_RANK_RATE = [0.5, 0.3, 0.2];
			this.PRE_SET_STGPARTS_NUM = [60, 30];
			this.PRE_SET_RING_NUM = 7;
			this.CLOUD_POS = {
				BASE_X: 0,
				BASE_Y: -20,
				RANEGE_X: 50,
				RANEGE_Y: 50
			};
			this.SOUND_VOL = {
				MIN: -1,
				MAX: -0.7
			};
			this.ITEM_GET_SE_VOL = -0.5;
			this.ITEM_COLOR = [0xe23392, 0x92ef00, 0xf4ea00];
			this.RAINBOW_COLOR = [0xf9c0c4, 0xf8bf61, 0xfff661, 0xbada74, 0x7375b5, 0xbb65b2, 0xee61b0];
			this.MUSIC_NAME = ["銇仒銇勩倣", "number one", "Have fun!!", "銇傘倞銇屻仺銇嗐伄杓�", "No end", "銉勩儴銈兂銇�", "beautiful"];
			this.MAX_COMBO = 7;
			this.LINE_WEIGHT_PC = 1;
			this.LINE_WEIGHT_SMT = 0.75;
			this.LINE_HIDE_INTERVAL = [40, 60];
			this.STG_SIDE_OFFSET_X = [35, 10, 10, 10, 10, 10, 10];
			this.STG_LOADING_OFFSET_Z = [35, 10, 10, 10, 10, 10, 10];
			this.CAMERA_FAR = [10000, 10000];
			this.SKY_SCALE = [2.2, 2.2];
			this.STG7_LOOP_OFFSET = {
				Y: 10
			};
			this.STG6_OFFSET_Y = -160;
			this.ROAD_ANALYZE_P = 0.000007;
			this.DIVE_LOOP_OFFSET_X = 0;
			this.STG7_OFFSET_Y = 0;
			this.LOOP_PT = {
				X: 0,
				Y: 0
			};
			this.GROUND_SCALE = 5;
			this.GROUND_OFFSET = {
				Y: -60,
				SCALE1: 0.98,
				SCALE2: 0.95
			};
			this.HINT_NUM = 1;
			this.TOP_MOVE_SPEED = 1;
			this.UI_LIFE_SIZE = {
				WIDTH: [580, 300],
				HEIGHT: [26, 21],
				TRI_WIDTH: [28, 14],
				TRI_HEIGHT: [22, 11]
			};
			this.NUM_SPRITE_JSON = '{"frames": {"a0.png":{	"frame": {"x":0,"y":0,"w":28,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":28,"h":24},	"sourceSize": {"w":28,"h":24}},"a1.png":{	"frame": {"x":28,"y":0,"w":6,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":6,"h":24},	"sourceSize": {"w":6,"h":24}},"a2.png":{	"frame": {"x":34,"y":0,"w":30,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":30,"h":24},	"sourceSize": {"w":30,"h":24}},"a3.png":{	"frame": {"x":64,"y":0,"w":30,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":30,"h":24},	"sourceSize": {"w":30,"h":24}},"a4.png":{	"frame": {"x":94,"y":0,"w":32,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":32,"h":24},	"sourceSize": {"w":32,"h":24}},"a5.png":{	"frame": {"x":126,"y":0,"w":32,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":32,"h":24},	"sourceSize": {"w":32,"h":24}},"a6.png":{	"frame": {"x":158,"y":0,"w":32,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":32,"h":24},	"sourceSize": {"w":32,"h":24}},"a7.png":{	"frame": {"x":190,"y":0,"w":30,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":30,"h":24},	"sourceSize": {"w":30,"h":24}},"a8.png":{	"frame": {"x":220,"y":0,"w":30,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":30,"h":24},	"sourceSize": {"w":30,"h":24}},"a9.png":{	"frame": {"x":250,"y":0,"w":30,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":30,"h":24},	"sourceSize": {"w":30,"h":24}},"b0.png":{	"frame": {"x":280,"y":0,"w":56,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":56,"h":46},	"sourceSize": {"w":56,"h":46}},"b1.png":{	"frame": {"x":336,"y":0,"w":10,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":10,"h":46},	"sourceSize": {"w":10,"h":46}},"b2.png":{	"frame": {"x":346,"y":0,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"b3.png":{	"frame": {"x":406,"y":0,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"b4.png":{	"frame": {"x":0,"y":46,"w":62,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":62,"h":46},	"sourceSize": {"w":62,"h":46}},"b5.png":{	"frame": {"x":62,"y":46,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"b6.png":{	"frame": {"x":122,"y":46,"w":62,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":62,"h":46},	"sourceSize": {"w":62,"h":46}},"b7.png":{	"frame": {"x":184,"y":46,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"b8.png":{	"frame": {"x":244,"y":46,"w":58,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":58,"h":46},	"sourceSize": {"w":58,"h":46}},"b9.png":{	"frame": {"x":302,"y":46,"w":58,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":58,"h":46},	"sourceSize": {"w":58,"h":46}},"c0.png":{	"frame": {"x":360,"y":46,"w":56,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":56,"h":46},	"sourceSize": {"w":56,"h":46}},"c1.png":{	"frame": {"x":416,"y":46,"w":10,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":10,"h":46},	"sourceSize": {"w":10,"h":46}},"c2.png":{	"frame": {"x":426,"y":46,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"c3.png":{	"frame": {"x":0,"y":92,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"c4.png":{	"frame": {"x":60,"y":92,"w":62,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":62,"h":46},	"sourceSize": {"w":62,"h":46}},"c5.png":{	"frame": {"x":122,"y":92,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"c6.png":{	"frame": {"x":182,"y":92,"w":62,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":62,"h":46},	"sourceSize": {"w":62,"h":46}},"c7.png":{	"frame": {"x":244,"y":92,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"c8.png":{	"frame": {"x":304,"y":92,"w":58,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":58,"h":46},	"sourceSize": {"w":58,"h":46}},"c9.png":{	"frame": {"x":362,"y":92,"w":58,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":58,"h":46},	"sourceSize": {"w":58,"h":46}},"d0.png":{	"frame": {"x":420,"y":92,"w":66,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":66,"h":56},	"sourceSize": {"w":66,"h":56}},"d1.png":{	"frame": {"x":486,"y":92,"w":12,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":12,"h":56},	"sourceSize": {"w":12,"h":56}},"d2.png":{	"frame": {"x":0,"y":148,"w":70,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":56},	"sourceSize": {"w":70,"h":56}},"d3.png":{	"frame": {"x":70,"y":148,"w":70,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":56},	"sourceSize": {"w":70,"h":56}},"d4.png":{	"frame": {"x":140,"y":148,"w":74,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":74,"h":56},	"sourceSize": {"w":74,"h":56}},"d5.png":{	"frame": {"x":214,"y":148,"w":72,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":72,"h":56},	"sourceSize": {"w":72,"h":56}},"d6.png":{	"frame": {"x":286,"y":148,"w":72,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":72,"h":56},	"sourceSize": {"w":72,"h":56}},"d7.png":{	"frame": {"x":358,"y":148,"w":70,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":56},	"sourceSize": {"w":70,"h":56}},"d8.png":{	"frame": {"x":428,"y":148,"w":68,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":68,"h":56},	"sourceSize": {"w":68,"h":56}},"d9.png":{	"frame": {"x":0,"y":204,"w":68,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":68,"h":56},	"sourceSize": {"w":68,"h":56}},"e0.png":{	"frame": {"x":68,"y":204,"w":66,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":66,"h":56},	"sourceSize": {"w":66,"h":56}},"e1.png":{	"frame": {"x":134,"y":204,"w":12,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":12,"h":56},	"sourceSize": {"w":12,"h":56}},"e2.png":{	"frame": {"x":146,"y":204,"w":70,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":56},	"sourceSize": {"w":70,"h":56}},"e3.png":{	"frame": {"x":216,"y":204,"w":70,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":56},	"sourceSize": {"w":70,"h":56}},"e4.png":{	"frame": {"x":286,"y":204,"w":74,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":74,"h":56},	"sourceSize": {"w":74,"h":56}},"e5.png":{	"frame": {"x":360,"y":204,"w":72,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":72,"h":56},	"sourceSize": {"w":72,"h":56}},"e6.png":{	"frame": {"x":432,"y":204,"w":72,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":72,"h":56},	"sourceSize": {"w":72,"h":56}},"e7.png":{	"frame": {"x":0,"y":260,"w":70,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":56},	"sourceSize": {"w":70,"h":56}},"e8.png":{	"frame": {"x":70,"y":260,"w":68,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":68,"h":56},	"sourceSize": {"w":68,"h":56}},"e9.png":{	"frame": {"x":138,"y":260,"w":68,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":68,"h":56},	"sourceSize": {"w":68,"h":56}}},"meta": {	"app": "Adobe Flash Professional",	"version": "14.1.0.96",	"image": "sprite.png",	"format": "RGBA8888",	"size": {"w":512,"h":512},	"scale": "1"}}';
		}

		return conf;

	})();

	root.MY_CLASS.contents = (function() {
		function contents() {
			this.shareSite = bind(this.shareSite, this);
			this.shareSns = bind(this.shareSns, this);
			this._makePageElm = bind(this._makePageElm, this);
			this.disposePage = bind(this.disposePage, this);
			this.showMovie = bind(this.showMovie, this);
			this.showHelp = bind(this.showHelp, this);
			this.showSystem = bind(this.showSystem, this);
			this._scrollOff = bind(this._scrollOff, this);
			this._disposeRecord = bind(this._disposeRecord, this);
			this._makeRecord = bind(this._makeRecord, this);
			this._makeFooter = bind(this._makeFooter, this);
			this.retry = bind(this.retry, this);
			this._eGameOver = bind(this._eGameOver, this);
			this._eGetItem = bind(this._eGetItem, this);
			this._eHidedLoading = bind(this._eHidedLoading, this);
			this._eStartGame = bind(this._eStartGame, this);
			this._eReadyAll = bind(this._eReadyAll, this);
			this._eCompleteFirstStgBgm = bind(this._eCompleteFirstStgBgm, this);
			this._eCompleteCmnSe = bind(this._eCompleteCmnSe, this);
			this._eProgressCmnSound = bind(this._eProgressCmnSound, this);
			this._eCompleteFirstStageData = bind(this._eCompleteFirstStageData, this);
			this._eProgressFirstStageData = bind(this._eProgressFirstStageData, this);
			this._eMakedData = bind(this._eMakedData, this);
			this._eProgressData = bind(this._eProgressData, this);
			this._eCompleteParam = bind(this._eCompleteParam, this);
			this.start = bind(this.start, this);
			this._audioMgr;
			this._parameter;
			this._interaction;
			this._gl;
			this._checker;
			this._data;
			this._game;
			this._bg;
			this._footer;
			this._record;
			this._ui;
			this._page;
			this._loading;
			this._restart;
			this._conf = root.MY.app.conf;
		}

		contents.prototype.start = function() {
			var sorry;
			root.MY.gl.contents = this;
			if (!Modernizr.webgl || !Detector.webgl) {
				sorry = new root.MY_CLASS.sorryView(this._makePageElm());
				sorry.setup();
				return;
			}
			//window.FB.init({
			//	appId: root.MY.app.conf.FB_APP_ID,
			//	apiKey: root.MY.app.conf.FB_APP_ID,
			//	status: true,
			//	cookie: true,
			//	xfbml: true
			//});
			this._scrollOff();
			if (!this._conf.RELEASE && location.pathname.indexOf("checker.html") !== -1) {
				this._checker = new root.MY_CLASS.checkerMain();
				this._checker.start();
				return;
			}
			if (!this._conf.RELEASE && location.pathname.indexOf("road.html") !== -1) {
				this._checker = new root.MY_CLASS.checkRoad();
				this._checker.start();
				return;
			}
			if (!root.MY.myfw.conf.IS_SMT) {
				this._restart = new root.MY_CLASS.restartView($("#restart"));
				this._restart.setup();
			}
			this._interaction = new root.MY_CLASS.interaction();
			this._interaction.start();
			root.MY.gl.interaction = this._interaction;
			this._loading = new root.MY_CLASS.loadingView($("#loading"));
			this._loading.onHided = this._eHidedLoading;
			this._loading.setup();
			this._makeFooter();
			this._makeRecord();
			this._parameter = new root.MY_CLASS.parameter();
			this._parameter.onComplete = this._eCompleteParam;
			root.MY.gl.parameter = this._parameter;
			return this._parameter.start();
		};

		contents.prototype._eCompleteParam = function() {
			this._data = new root.MY_CLASS.data();
			root.MY.gl.data = this._data;
			this._data.onProgress = this._eProgressData;
			this._data.onComplete = this._eMakedData;
			return this._data.start();
		};

		contents.prototype._eProgressData = function(rate) {
			return this._loading.setLoading(rate, 0);
		};

		contents.prototype._eMakedData = function() {
			this._ui = new root.MY_CLASS.gameUiView($("#gameUi"));
			this._ui.setup();
			root.MY.gl.ui = this._ui;
			this._game = new root.MY_CLASS.game();
			this._game.onGameOver = this._eGameOver;
			this._game.start();
			root.MY.gl.game = this._game;
			if (root.MY.app.conf.SOUND_SWF) {
				this._audioMgr = new root.MY_CLASS.audioSwfMgr();
			} else {
				this._audioMgr = new root.MY_CLASS.audioMgr();
			}
			this._audioMgr.start();
			root.MY.gl.audio = this._audioMgr;
			this._gl = new root.MY_CLASS.webglMain();
			this._gl.onGetItem = this._eGetItem;
			this._gl.onStart = this._eStartGame;
			this._gl.start();
			this._gl.makeRoad();
			root.MY.gl.main = this._gl;
			this._data.onProgressNextData = this._eProgressFirstStageData;
			this._data.onCompleteNextData = this._eCompleteFirstStageData;
			return this._data.loadNextStage(root.MY.app.conf.STAGE_ORDER[0], 0, false);
		};

		contents.prototype._eProgressFirstStageData = function(rate) {
			if (this._loading != null) {
				return this._loading.setLoading(rate, 1);
			}
		};

		contents.prototype._eCompleteFirstStageData = function() {
			this._audioMgr.onProgressCmnSound = this._eProgressCmnSound;
			this._audioMgr.onCompleteCmnSe = this._eCompleteCmnSe;
			return this._audioMgr.loadCmnSe();
		};

		contents.prototype._eProgressCmnSound = function(rate) {
			return this._loading.setLoading(rate, 2);
		};

		contents.prototype._eCompleteCmnSe = function() {
			this._audioMgr.onCompleteStageBgm = this._eCompleteFirstStgBgm;
			return this._audioMgr.loadStgBgm(this._game.stageId());
		};

		contents.prototype._eCompleteFirstStgBgm = function() {
			this._loading.setLoading(1, 3);
			this._gl.isPostEffect(true);
			this._bg = new root.MY_CLASS.bgView($("#bg"));
			this._bg.setup();
			root.MY.gl.bg = this._bg;
			this._gl.makeTop();
			return this._eReadyAll();
		};

		contents.prototype._eReadyAll = function() {
			this._loading.hide();
			return this._gl.startBrightAnimation(160, 170, "easeOutExpo", 1);
		};

		contents.prototype._eStartGame = function() {
			this._disposeRecord();
			root.MY.gl.bg.hide();
			root.MY.gl.footer.hide();
			this._audioMgr.playStgBgm(this._game.stageId());
			this._gl.startGame();
			this._ui.show();
			this._ui.setMouseTg();
			return this._game.startGame();
		};

		contents.prototype._eHidedLoading = function() {
			if (this._loading != null) {
				this._loading.dispose();
				return this._loading = null;
			}
		};

		contents.prototype._eGetItem = function(rank, combo) {
			this._game.upLife(rank, combo);
			this._audioMgr.playItemGetSe(combo);
			return this._ui.life().upLifeAnimation();
		};

		contents.prototype._eGameOver = function() {
			this._ui.showResult(this._game.point(), this._game.clearType());
			this._gl.stopGame();
			if (!root.MY.myfw.conf.IS_SMT) {
				return this._gl.startBrightAnimation(100, 10, "easeOutExpo", 0, -0.1, false);
			}
		};

		contents.prototype.retry = function() {
			root.MY.gl.bg.hide();
			root.MY.gl.footer.hide();
			this._game.resetGame();
			this._ui.reset();
			this._gl.resetGame();
			this._audioMgr.playStgBgm(this._game.stageId());
			this._gl.startGame();
			return this._game.startGame();
		};

		contents.prototype._makeFooter = function() {
			this._footer = new root.MY_CLASS.footerView($("#footer"));
			this._footer.setup();
			return root.MY.gl.footer = this._footer;
		};

		contents.prototype._makeRecord = function() {
			this._record = new root.MY_CLASS.recordView($("#record"));
			this._record.setup();
			return root.MY.gl.record = this._record;
		};

		contents.prototype._disposeRecord = function() {
			if (this._record != null) {
				this._record.dispose();
				this._record = null;
				return root.MY.gl.record = null;
			}
		};

		contents.prototype._scrollOff = function() {
			if (root.MY.myfw.conf.IS_SMT) {
				return $(window).on('touchmove.noScroll', (function(_this) {
					return function(e) {
						return e.preventDefault();
					};
				})(this));
			} else {
				$("body,html").css({
					overflow: "hidden",
					height: "100%"
				});
				return $(window).mousewheel((function(_this) {
					return function() {
						if ((typeof event !== "undefined" && event !== null) && (event.preventDefault != null)) {
							return event.preventDefault();
						}
					};
				})(this));
			}
		};

		contents.prototype.showSystem = function() {
			this.disposePage();
			this._page = new root.MY_CLASS.systemView(this._makePageElm());
			return this._page.setup();
		};

		contents.prototype.showHelp = function() {
			this.disposePage();
			this._page = new root.MY_CLASS.helpView(this._makePageElm());
			return this._page.setup();
		};

		contents.prototype.showMovie = function() {
			this.disposePage();
			this._page = new root.MY_CLASS.movieView(this._makePageElm());
			return this._page.setup();
		};

		contents.prototype.disposePage = function() {
			if (this._page != null) {
				this._page.dispose();
				return this._page = null;
			}
		};

		contents.prototype._makePageElm = function() {
			if ($("#page").length > 0) {
				return $("#page");
			}
			$("body").append("<div id='page'></div>");
			return $("#page");
		};

		contents.prototype.shareSns = function(type) {
			var text, url;
			switch (type) {
				case this._conf.SNS_TW:
					text = this._conf.RESULT_SHARE_TEXT_TW.replace("<url>", this._conf.THIS_SITE);
					text = text.replace("<point>", root.MY.gl.game.point());
					url = this._conf.RESULT_SHARE_TW.replace("<text>", encodeURIComponent(text));
					return window.open(url, "");
				case this._conf.SNS_FB:
					text = this._conf.RESULT_SHARE_TEXT_FB.replace("<point>", root.MY.gl.game.point());
					//return window.FB.ui({
					//	method: 'feed',
					//	link: this._conf.THIS_SITE,
					//	caption: text
					//}, (function(_this) {
					//	return function(e) {};
					//})(this));
				case this._conf.SNS_LINE:
					text = this._conf.RESULT_SHARE_TEXT_LINE.replace("<url>", this._conf.THIS_SITE);
					text = text.replace("<point>", root.MY.gl.game.point());
					url = this._conf.RESULT_SHARE_LINE.replace("<text>", encodeURIComponent(text));
					return window.open(url, "");
			}
		};

		contents.prototype.shareSite = function(type) {
			var text, url;
			switch (type) {
				case this._conf.SNS_TW:
					text = this._conf.SITE_SHARE_TEXT_TW.replace("<url>", this._conf.THIS_SITE);
					url = this._conf.SITE_SHARE_TW.replace("<text>", encodeURIComponent(text));
					break;
				case this._conf.SNS_FB:
					url = this._conf.SITE_SHARE_FB.replace("<url>", this._conf.THIS_SITE);
			}
			return window.open(url, "");
		};

		return contents;

	})();

	root.MY_CLASS.audioMgr = (function() {
		function audioMgr() {
			this._makeStgBufferSource = bind(this._makeStgBufferSource, this);
			this.playStgBgm = bind(this.playStgBgm, this);
			this._eLoadedStageBgmBuffer = bind(this._eLoadedStageBgmBuffer, this);
			this.loadStgBgm = bind(this.loadStgBgm, this);
			this.stgBgmRate = bind(this.stgBgmRate, this);
			this.getNowBgmTotalFrame = bind(this.getNowBgmTotalFrame, this);
			this._playSe = bind(this._playSe, this);
			this.playSeaUpSe = bind(this.playSeaUpSe, this);
			this.playSeaDownSe = bind(this.playSeaDownSe, this);
			this.playItemGetSe = bind(this.playItemGetSe, this);
			this._eBlurWin = bind(this._eBlurWin, this);
			this._eFocusWin = bind(this._eFocusWin, this);
			this._update = bind(this._update, this);
			this._eLoadedCmnSe = bind(this._eLoadedCmnSe, this);
			this.loadCmnSe = bind(this.loadCmnSe, this);
			this.start = bind(this.start, this);
			this._context;
			this._seBuffer = [];
			this._stgBgmBuffer = [];
			this._nowStageId = -1;
			this._stgBgmSource;
			this._stgBgmGainNode;
			this._conf = root.MY.app.conf;
			this._vol = 1;
			this._u = root.MY.myfw.util;
			this._game;
			this._stgBgmTime = {
				offset: 0,
				total: 0,
				rate: 0,
				stopTimeTotal: 0,
				stopStartTime: 0,
				isPlaying: false
			};
			this.onProgressCmnSound;
			this.onCompleteCmnSe;
			this.onCompleteStageBgm;
		}

		audioMgr.prototype.start = function() {
			this._game = root.MY.gl.game;
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			this._context = new AudioContext();
			if (!root.MY.myfw.conf.IS_SMT) {
				$(window).focus(this._eFocusWin);
				return $(window).blur(this._eBlurWin);
			}
		};

		audioMgr.prototype.loadCmnSe = function() {
			var loader;
			loader = new BufferLoader(this._context, ["./assets/sound/se0.mp3", "./assets/sound/wave_in.mp3", "./assets/sound/wave_out.mp3"], this._eLoadedCmnSe);
			return loader.load();
		};

		audioMgr.prototype._eLoadedCmnSe = function(bufferList) {
			this._seBuffer = bufferList;
			if (this.onProgressCmnSound != null) {
				this.onProgressCmnSound(1);
			}
			if (this.onCompleteCmnSe != null) {
				this.onCompleteCmnSe();
			}
			return root.MY.myfw.addUpdate(this._update);
		};

		audioMgr.prototype._update = function() {
			var ease, tgVol;
			if ((this._stgBgmSource != null) && this._stgBgmTime.isPlaying) {
				ease = 0.1;
				tgVol = this._u.map(this._game.life(), this._conf.SOUND_VOL.MIN, this._conf.SOUND_VOL.MAX, 0, 1);
				this._vol += (tgVol - this._vol) * ease;
				if (this._stgBgmGainNode != null) {
					this._stgBgmGainNode.gain.value = this._vol;
				}
				return this._stgBgmTime.rate = Math.min(1, (this._context.currentTime - this._stgBgmTime.offset) / (this._stgBgmTime.total + this._stgBgmTime.stopTimeTotal));
			}
		};

		audioMgr.prototype._eFocusWin = function() {
			if ((this._stgBgmSource != null) && !this._stgBgmTime.isPlaying && this._stgBgmTime.rate < 1) {
				this._stgBgmTime.isPlaying = true;
				this._makeStgBufferSource(this._stgBgmTime.stageId, this._stgBgmTime.stopStartTime - this._stgBgmTime.offset, false);
				this._stgBgmTime.stopTimeTotal = this._context.currentTime - this._stgBgmTime.stopStartTime;
				this._update();
				return root.MY.gl.game.isUpdatePoint(true);
			}
		};

		audioMgr.prototype._eBlurWin = function() {
			if ((this._stgBgmSource != null) && this._stgBgmTime.isPlaying && this._stgBgmTime.rate < 1) {
				this._stgBgmTime.isPlaying = false;
				this._stgBgmSource.stop(0);
				this._stgBgmTime.stopStartTime = this._context.currentTime;
				return root.MY.gl.game.isUpdatePoint(false);
			}
		};

		audioMgr.prototype.playItemGetSe = function(combo) {
			return this._playSe(0, combo * 0.5);
		};

		audioMgr.prototype.playSeaDownSe = function() {
			return this._playSe(1);
		};

		audioMgr.prototype.playSeaUpSe = function() {
			return this._playSe(2);
		};

		audioMgr.prototype._playSe = function(id, playBackRate) {
			var gain, source;
			if (this._seBuffer[id] != null) {
				source = this._context.createBufferSource();
				source.buffer = this._seBuffer[id];
				source.connect(this._context.destination);
				source.loop = false;
				source.playbackRate.value = playBackRate || 1;
				source.start(0);
				gain = this._context.createGain();
				source.connect(gain);
				gain.connect(this._context.destination);
				return gain.gain.value = this._conf.ITEM_GET_SE_VOL;
			}
		};

		audioMgr.prototype.getNowBgmTotalFrame = function() {
			if (this._stgBgmSource != null) {
				return this._stgBgmSource.buffer.duration * 60;
			} else {
				return 0;
			}
		};

		audioMgr.prototype.stgBgmRate = function() {
			return this._stgBgmTime.rate;
		};

		audioMgr.prototype.loadStgBgm = function(stageId) {
			var loader;
			if (this._stgBgmBuffer[stageId] != null) {
				if (this.onCompleteStageBgm != null) {
					this.onCompleteStageBgm();
				}
				return;
			}
			this._nowStageId = stageId;
			loader = new BufferLoader(this._context, [root.MY.app.conf.FILE_STAGE_BGM[stageId]], this._eLoadedStageBgmBuffer);
			return loader.load();
		};

		audioMgr.prototype._eLoadedStageBgmBuffer = function(bufferList) {
			this._stgBgmBuffer[this._nowStageId] = bufferList;
			if (this.onCompleteStageBgm != null) {
				return this.onCompleteStageBgm();
			}
		};

		audioMgr.prototype.playStgBgm = function(stageId) {
			this._makeStgBufferSource(stageId, 0, true);
			this._stgBgmTime.offset = this._context.currentTime;
			this._stgBgmTime.total = this._stgBgmSource.buffer.duration;
			this._stgBgmTime.rate = 0;
			this._stgBgmTime.isPlaying = true;
			this._stgBgmTime.stopTimeTotal = 0;
			this._stgBgmTime.stopStartTime = 0;
			this._stgBgmTime.stageId = stageId;
			this._vol = this._conf.SOUND_VOL.MIN;
			return this._update();
		};

		audioMgr.prototype._makeStgBufferSource = function(stageId, start, isStop) {
			var error;
			if (this._stgBgmSource != null) {
				if ((isStop != null) && isStop) {
					try {
						this._stgBgmSource.stop(0);
					} catch (_error) {
						error = _error;
						console.log(error);
					}
				}
				this._stgBgmSource = null;
			}
			this._stgBgmSource = this._context.createBufferSource();
			this._stgBgmSource.buffer = this._stgBgmBuffer[stageId][0];
			this._stgBgmSource.connect(this._context.destination);
			this._stgBgmSource.loop = false;
			this._stgBgmSource.start(0, start || 0);
			this._stgBgmGainNode = this._context.createGain();
			this._stgBgmSource.connect(this._stgBgmGainNode);
			return this._stgBgmGainNode.connect(this._context.destination);
		};

		return audioMgr;

	})();

	root.MY_CLASS.audioSwfMgr = (function() {
		function audioSwfMgr() {
			this.playStgBgm = bind(this.playStgBgm, this);
			this.loadStgBgm = bind(this.loadStgBgm, this);
			this.stgBgmRate = bind(this.stgBgmRate, this);
			this.getNowBgmTotalFrame = bind(this.getNowBgmTotalFrame, this);
			this.playSeaUpSe = bind(this.playSeaUpSe, this);
			this.playSeaDownSe = bind(this.playSeaDownSe, this);
			this.playItemGetSe = bind(this.playItemGetSe, this);
			this._checkSwf = bind(this._checkSwf, this);
			this._eBlurWin = bind(this._eBlurWin, this);
			this._eFocusWin = bind(this._eFocusWin, this);
			this._update = bind(this._update, this);
			this.loadCmnSe = bind(this.loadCmnSe, this);
			this.start = bind(this.start, this);
			this._fla;
			this._conf = root.MY.app.conf;
			this._vol = 1;
			this._u = root.MY.myfw.util;
			this._game;
			this._nowStageId = -1;
			this._isCompleteSwf = false;
			this._stopMs = 0;
			this._nowStgBgmMs = 0;
			this._nowStgBgmRateBuf = 0;
			this._cnt = 0;
			this._isPlayingStgBgm = false;
			this.onProgressCmnSound;
			this.onCompleteCmnSe;
			this.onCompleteStageBgm;
		}

		audioSwfMgr.prototype.start = function() {
			this._game = root.MY.gl.game;
			$(window).focus(this._eFocusWin);
			return $(window).blur(this._eBlurWin);
		};

		audioSwfMgr.prototype.loadCmnSe = function() {
			var attributes, params;
			$("body").prepend("<div id='" + this._conf.SOUND_SWF_ID + "'></div>");
			params = {
				allowScriptAccess: "always",
				wmode: "transparent"
			};
			attributes = {
				id: this._conf.SOUND_SWF_ID,
				name: this._conf.SOUND_SWF_ID
			};
			swfobject.embedSWF(this._conf.FILE_SOUND, this._conf.SOUND_SWF_ID, "1", "1", "11.0.0", this._conf.FILE_SWFINSTALL, {}, params, attributes);
			$("#" + this._conf.SOUND_SWF_ID).css({
				position: "absolute",
				top: 0,
				left: 0
			});
			return root.MY.myfw.addUpdate(this._update);
		};

		audioSwfMgr.prototype._getSwf = function() {
			var swf;
			swf = $("#" + this._conf.SOUND_SWF_ID);
			if (swf != null) {
				return swf[0];
			} else {
				return null;
			}
		};

		audioSwfMgr.prototype._update = function() {
			var ease, tgVol;
			if (!this._isCompleteSwf) {
				this._checkSwf();
				return;
			}
			if (this._nowStageId !== -1) {
				ease = 0.1;
				tgVol = this._game.life();
				this._vol += (tgVol - this._vol) * ease;
				if ((this._fla != null) && (this._fla.setStageBgmVolume != null)) {
					return this._fla.setStageBgmVolume(this._nowStageId, this._vol);
				}
			}
		};

		audioSwfMgr.prototype._eFocusWin = function() {
			if (this._nowStageId !== -1 && !this._isPlayingStgBgm && this._nowStgBgmRateBuf < 1) {
				if ((this._fla != null) && (this._fla.stopAllStageBgm != null)) {
					this._isPlayingStgBgm = true;
					this._fla.playStageBgm(this._nowStageId, this._stopMs);
					this._update();
					return root.MY.gl.game.isUpdatePoint(true);
				}
			}
		};

		audioSwfMgr.prototype._eBlurWin = function() {
			if (this._nowStageId !== -1 && this._isPlayingStgBgm && this._nowStgBgmRateBuf < 1) {
				if ((this._fla != null) && (this._fla.stopAllStageBgm != null)) {
					this._isPlayingStgBgm = false;
					this._stopMs = this._fla.getStageBgmPosition(this._nowStageId);
					this._fla.stopAllStageBgm();
					return root.MY.gl.game.isUpdatePoint(false);
				}
			}
		};

		audioSwfMgr.prototype._checkSwf = function() {
			var pct, swf;
			swf = this._getSwf();
			if ((swf != null) && (swf.getProgress != null) && (swf.getIsComplete != null)) {
				pct = swf.getProgress();
				if (this.onProgressCmnSound != null) {
					this.onProgressCmnSound(pct / 100);
				}
				if (swf.getIsComplete() === "OK") {
					if (this.onProgressCmnSound != null) {
						this.onProgressCmnSound(1);
					}
					if (this.onCompleteCmnSe != null) {
						this.onCompleteCmnSe();
					}
					this._fla = swf;
					return this._isCompleteSwf = true;
				}
			}
		};

		audioSwfMgr.prototype.playItemGetSe = function(combo) {
			if ((this._fla != null) && (this._fla.playSe != null)) {
				return this._fla.playSe(Math.min(--combo, this._conf.MAX_COMBO - 1));
			}
		};

		audioSwfMgr.prototype.playSeaDownSe = function() {
			if ((this._fla != null) && (this._fla.playSe != null)) {
				return this._fla.playSe(7);
			}
		};

		audioSwfMgr.prototype.playSeaUpSe = function() {
			if ((this._fla != null) && (this._fla.playSe != null)) {
				return this._fla.playSe(8);
			}
		};

		audioSwfMgr.prototype.getNowBgmTotalFrame = function() {
			if ((this._fla != null) && (this._fla.getStageBgmDuration != null)) {
				return this._fla.getStageBgmDuration(this._nowStageId) * 60;
			} else {
				return 0;
			}
		};

		audioSwfMgr.prototype.stgBgmRate = function() {
			if ((this._fla != null) && (this._fla.getStageBgmDuration != null)) {
				this._nowStgBgmRateBuf = this._fla.getStageBgmPosition(this._nowStageId) / this._nowStgBgmMs;
				return this._nowStgBgmRateBuf;
			} else {
				return this._nowStgBgmRateBuf;
			}
		};

		audioSwfMgr.prototype.loadStgBgm = function(stageId) {
			if (this.onCompleteStageBgm != null) {
				return this.onCompleteStageBgm();
			}
		};

		audioSwfMgr.prototype.playStgBgm = function(stageId) {
			this._nowStageId = stageId;
			if ((this._fla != null) && (this._fla.playStageBgm != null) && (this._fla.getStageBgmDuration != null)) {
				this._fla.playStageBgm(this._nowStageId);
				this._nowStgBgmMs = this._fla.getStageBgmDuration(this._nowStageId) * 1000;
				this._nowStgBgmRateBuf = 0;
				this._cnt = 0;
				this._stopMs = 0;
				this._isPlayingStgBgm = true;
				return this._update();
			}
		};

		return audioSwfMgr;

	})();

	root.MY_CLASS.data = (function() {
		function data() {
			this._eCompleteStgBgm = bind(this._eCompleteStgBgm, this);
			this._eCompleteStageObj = bind(this._eCompleteStageObj, this);
			this._eProgressStageObj = bind(this._eProgressStageObj, this);
			this._getObjList = bind(this._getObjList, this);
			this.loadNextStage = bind(this.loadNextStage, this);
			this._eCompleteMultiObjData = bind(this._eCompleteMultiObjData, this);
			this.getStageObj3D = bind(this.getStageObj3D, this);
			this.getCmnObj3D = bind(this.getCmnObj3D, this);
			this._eCompleteCmnObjData = bind(this._eCompleteCmnObjData, this);
			this._eProgressCmnObjData = bind(this._eProgressCmnObjData, this);
			this._makeStgpartsTex = bind(this._makeStgpartsTex, this);
			this._makeEtcStageTex = bind(this._makeEtcStageTex, this);
			this._makeStageTex = bind(this._makeStageTex, this);
			this.start = bind(this.start, this);
			this._skyTex;
			this._itemTex;
			this._stageTex = [];
			this._etcStageTex = [];
			this._stgpartsTex = [];
			this._cmnObjMgr;
			this._stageObjMgr = [];
			this._clouds = [];
			this._conf = root.MY.app.conf;
			this.onProgress;
			this.onComplete;
			this.onProgressNextData;
			this.onCompleteNextData;
			this._delayCall;
		}

		data.prototype.start = function() {
			this._delayCall = new root.MY_CLASS.delayCall();
			this._delayCall.start();
			this._itemTex = THREE.ImageUtils.loadTexture(root.MY.app.conf.FILE_ITEM_TEX);
			this._makeStageTex();
			this._makeEtcStageTex();
			this._makeStgpartsTex();
			this._cmnObjMgr = new root.MY_CLASS.multiObjLoader();
			this._cmnObjMgr.onProgress = this._eProgressCmnObjData;
			this._cmnObjMgr.onComplete = this._eCompleteCmnObjData;
			return this._cmnObjMgr.load([
				{
					key: "stageLoading0",
					file: this._conf.FILE_STAGE_LOADING_OBJ[6],
					tex: this._stageTex[6],
					rePos: true
				}, {
					key: "stageLoading1",
					file: this._conf.FILE_STAGE_LOADING_OBJ[1],
					tex: this._stageTex[1],
					rePos: true
				}, {
					key: "stageLoading2",
					file: this._conf.FILE_STAGE_LOADING_OBJ[2],
					tex: this._stageTex[2],
					rePos: true
				}, {
					key: "stageLoading3",
					file: this._conf.FILE_STAGE_LOADING_OBJ[2],
					tex: this._stageTex[2],
					rePos: true
				}, {
					key: "stageLoading4",
					file: this._conf.FILE_STAGE_LOADING_OBJ[4],
					tex: this._stageTex[4],
					rePos: true
				}, {
					key: "stageLoading5",
					file: this._conf.FILE_STAGE_LOADING_OBJ[5],
					tex: this._stageTex[5],
					rePos: true
				}, {
					key: "stageLoading6",
					file: this._conf.FILE_STAGE_LOADING_OBJ[6],
					tex: this._stageTex[6],
					rePos: true
				}, {
					key: "seaDown",
					file: this._conf.FILE_SEADOWN_OBJ[0],
					tex: this._stageTex[5],
					rePos: true
				}, {
					key: "item0",
					file: this._conf.FILE_ITEM_OBJ[0],
					tex: this._itemTex,
					rePos: true
				}, {
					key: "item1",
					file: this._conf.FILE_ITEM_OBJ[1],
					tex: this._itemTex,
					rePos: true
				}, {
					key: "item2",
					file: this._conf.FILE_ITEM_OBJ[2],
					tex: this._itemTex,
					rePos: true
				}, {
					key: "sky0",
					file: this._conf.FILE_SKY_OBJ,
					tex: THREE.ImageUtils.loadTexture(root.MY.app.conf.FILE_SKY_TEX[0]),
					rePos: true
				}, {
					key: "cloud0",
					file: this._conf.FILE_CLOUD_OBJ[5],
					tex: this._stageTex[1],
					rePos: true
				}, {
					key: "cloud1",
					file: this._conf.FILE_CLOUD_OBJ[1],
					tex: this._stageTex[1],
					rePos: true
				}, {
					key: "cloud2",
					file: this._conf.FILE_CLOUD_OBJ[2],
					tex: this._stageTex[2],
					rePos: true
				}, {
					key: "cloud3",
					file: this._conf.FILE_CLOUD_OBJ[3],
					tex: this._stageTex[3],
					rePos: true
				}, {
					key: "cloud4",
					file: this._conf.FILE_CLOUD_OBJ[4],
					tex: this._stageTex[4],
					rePos: true
				}, {
					key: "cloud5",
					file: this._conf.FILE_CLOUD_OBJ[1],
					tex: this._stageTex[1],
					rePos: true
				}, {
					key: "cloud6",
					file: this._conf.FILE_CLOUD_OBJ[1],
					tex: this._stageTex[1],
					rePos: true
				}, {
					key: "fusha",
					file: this._conf.FILE_FUSYA_OBJ[0],
					tex: this._stageTex[0],
					rePos: false
				}, {
					key: "sea",
					file: this._conf.FILE_SEA_OBJ[0],
					tex: this._stageTex[5],
					rePos: true
				}, {
					key: "kujira",
					file: this._conf.FILE_KUJIRA_OBJ[0],
					tex: this._stageTex[5],
					rePos: true
				}, {
					key: "doorLeft",
					file: this._conf.FILE_CASTLE_OBJ[1],
					tex: this._stageTex[6],
					rePos: true
				}, {
					key: "doorRight",
					file: this._conf.FILE_CASTLE_OBJ[2],
					tex: this._stageTex[6],
					rePos: true
				}, {
					key: "stg4Etc",
					file: this._conf.FILE_BOAT_OBJ[1],
					tex: this._stageTex[4],
					rePos: true
				}, {
					key: "prestage4",
					file: this._conf.FILE_STAGE_OBJ[4],
					tex: this._stageTex[4],
					rePos: true
				}
			]);
		};

		data.prototype._makeStageTex = function() {
			var i, j, len1, ref, results, tex, val;
			ref = this._conf.FILE_STAGE_TEX;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				tex = THREE.ImageUtils.loadTexture(val);
				results.push(this._stageTex[i] = tex);
			}
			return results;
		};

		data.prototype._makeEtcStageTex = function() {};

		data.prototype._makeStgpartsTex = function() {};

		data.prototype._eProgressCmnObjData = function(rate) {
			if (this.onProgress != null) {
				return this.onProgress(rate);
			}
		};

		data.prototype._eCompleteCmnObjData = function() {
			if (this.onComplete != null) {
				return this.onComplete();
			}
		};

		data.prototype.getCmnObj3D = function(key) {
			return this._cmnObjMgr.get(key).obj;
		};

		data.prototype.getStageObj3D = function(stageId, key) {
			return this._stageObjMgr[stageId].get(key).obj;
		};

		data.prototype._eCompleteMultiObjData = function() {
			if (this.onComplete != null) {
				return this.onComplete();
			}
		};

		data.prototype.loadNextStage = function(stageId, gameId, isDelay) {
			var d, interval;
			interval = stageId === 0 ? this._conf.STG_INTERVAL * 3 : this._conf.STG_INTERVAL;
			if (this._stageObjMgr[stageId] != null) {
				this._delayCall.onComplete = (function(_this) {
					return function() {
						return _this._eCompleteStageObj();
					};
				})(this);
				return this._delayCall.watchStart(interval);
			} else {
				d = isDelay ? interval : 1;
				this._delayCall.onComplete = (function(_this) {
					return function() {
						var loader;
						loader = new root.MY_CLASS.multiObjLoader();
						_this._stageObjMgr[stageId] = loader;
						loader.onProgress = _this._eProgressStageObj;
						loader.onComplete = _this._eCompleteStageObj;
						return loader.load(_this._getObjList(stageId, gameId));
					};
				})(this);
				return this._delayCall.watchStart(d);
			}
		};

		data.prototype._getObjList = function(stageId, gameId) {
			var arr;
			arr = [
				{
					key: "stage",
					file: this._conf.FILE_STAGE_OBJ[stageId],
					tex: this._stageTex[stageId],
					rePos: true
				}
			];
			return arr;
		};

		data.prototype._eProgressStageObj = function(rate) {
			if (this.onProgressNextData != null) {
				return this.onProgressNextData(rate);
			}
		};

		data.prototype._eCompleteStageObj = function() {
			if (root.MY.gl.audio != null) {
				root.MY.gl.audio.onCompleteStageBgm = this._eCompleteStgBgm;
				return root.MY.gl.audio.loadStgBgm(root.MY.gl.game.nextStageId());
			} else {
				return this._eCompleteStgBgm();
			}
		};

		data.prototype._eCompleteStgBgm = function() {
			if (this.onCompleteNextData != null) {
				return this.onCompleteNextData();
			}
		};

		return data;

	})();

	root.MY_CLASS.delayCall = (function() {
		function delayCall() {
			this.watchStart = bind(this.watchStart, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			this._cnt = 0;
			this._cntMax = 0;
			this._isWatch = false;
			this.onComplete;
		}

		delayCall.prototype.start = function() {
			return root.MY.myfw.addUpdate(this.update);
		};

		delayCall.prototype.update = function() {
			if (this._isWatch) {
				if (++this._cnt > this._cntMax) {
					if (this.onComplete != null) {
						this.onComplete();
					}
					return this._isWatch = false;
				}
			}
		};

		delayCall.prototype.watchStart = function(d) {
			this._isWatch = true;
			this._cnt = 0;
			return this._cntMax = d;
		};

		return delayCall;

	})();

	root.MY_CLASS.game = (function() {
		function game() {
			this.isUpdatePoint = bind(this.isUpdatePoint, this);
			this.clearType = bind(this.clearType, this);
			this.gameLevel = bind(this.gameLevel, this);
			this.life = bind(this.life, this);
			this.point = bind(this.point, this);
			this.endGame = bind(this.endGame, this);
			this.resumeGame = bind(this.resumeGame, this);
			this.waitGame = bind(this.waitGame, this);
			this.resetGame = bind(this.resetGame, this);
			this.startGame = bind(this.startGame, this);
			this.isPlaying = bind(this.isPlaying, this);
			this.upLife = bind(this.upLife, this);
			this._updateGame = bind(this._updateGame, this);
			this.nextGameId = bind(this.nextGameId, this);
			this.gameId = bind(this.gameId, this);
			this.nextStageId = bind(this.nextStageId, this);
			this.stageId = bind(this.stageId, this);
			this.goNextStage = bind(this.goNextStage, this);
			this.clearStageNum = bind(this.clearStageNum, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			this._stageId = 0;
			this._gameId = 0;
			this._ui;
			this._point = 0;
			this._life = 1;
			this._delayCall;
			this._isPlaying = false;
			this._isUpdateLife = true;
			this._isUpdatePoint = true;
			this._gameLevel;
			this._conf = root.MY.app.conf;
			this._parameter = root.MY.gl.parameter;
			this.onGameOver;
		}

		game.prototype.start = function() {
			this._delayCall = new root.MY_CLASS.delayCall();
			this._delayCall.start();
			this._ui = root.MY.gl.ui;
			this._gameLevel = new root.MY_CLASS.gameLevel();
			this._gameLevel.start();
			this._parameter.registGameParam(this._gameLevel);
			return root.MY.myfw.addUpdate(this.update);
		};

		game.prototype.update = function() {
			if (this._isPlaying) {
				return this._updateGame();
			}
		};

		game.prototype.clearStageNum = function() {
			return (this._gameId * root.MY.app.conf.STAGE_NUM) + this._stageId;
		};

		game.prototype.goNextStage = function() {
			this._stageId++;
			if (this._stageId >= root.MY.app.conf.STAGE_NUM) {
				this._stageId = 0;
				this._gameId++;
			}
			return this._gameLevel.levelUp(this.clearStageNum());
		};

		game.prototype.stageId = function() {
			return this._conf.STAGE_ORDER[this._stageId];
		};

		game.prototype.nextStageId = function() {
			var next;
			next = this._stageId + 1;
			if (next >= root.MY.app.conf.STAGE_NUM) {
				next = 0;
			}
			return this._conf.STAGE_ORDER[next];
		};

		game.prototype.gameId = function() {
			return this._gameId;
		};

		game.prototype.nextGameId = function() {
			if (this._stageId === root.MY.app.conf.STAGE_NUM - 1) {
				return this._gameId + 1;
			} else {
				return this._gameId;
			}
		};

		game.prototype._updateGame = function() {
			var addPoint, deadSpeed;
			if (this._isUpdatePoint) {
				addPoint = 0.1;
				this._point = Math.min(this._point += addPoint, this._conf.MAX_AYAKM);
				this._ui.point().setPoint(~~this._point);
			}
			if (this._isUpdateLife) {
				deadSpeed = this._parameter.get("lifeSpd") / 10000;
				this._life = Math.max(0, this._life -= deadSpeed);
			}
			this._ui.life().setLife(this._life);
			if (this._life <= 0) {
				return this.endGame();
			}
		};

		game.prototype.upLife = function(rank, combo) {
			var up;
			up = [this._parameter.get("kaihuku0"), this._parameter.get("kaihuku1"), this._parameter.get("kaihuku2")][rank];
			if (combo > 1) {
				up += up * (combo * this._parameter.get("combo"));
				if (combo >= this._conf.MAX_COMBO - 1) {
					up = 100;
					this._isUpdateLife = false;
					this._delayCall.onComplete = (function(_this) {
						return function() {
							return _this._isUpdateLife = true;
						};
					})(this);
					this._delayCall.watchStart(60 * 2);
				}
			}
			up *= 0.01;
			return this._life = Math.min(this._life += up, 1);
		};

		game.prototype.isPlaying = function() {
			return this._isPlaying;
		};

		game.prototype.startGame = function() {
			return this._isPlaying = true;
		};

		game.prototype.resetGame = function() {
			this._isPlaying = false;
			this._point = 0;
			this._life = 1;
			this._stageId = 0;
			this._gameId = 0;
			return this._gameLevel.reset();
		};

		game.prototype.waitGame = function() {
			return this._isPlaying = false;
		};

		game.prototype.resumeGame = function() {
			this._isPlaying = true;
			this._isUpdateLife = false;
			this._delayCall.onComplete = (function(_this) {
				return function() {
					return _this._isUpdateLife = true;
				};
			})(this);
			return this._delayCall.watchStart(60 * 2);
		};

		game.prototype.endGame = function() {
			if (!this._isPlaying) {
				return;
			}
			this._isPlaying = false;
			if (typeof localStorage !== "undefined" && localStorage !== null) {
				if ((localStorage.aykm != null) && localStorage.aykm < this.point()) {
					localStorage.aykm = this.point();
				}
			}
			if (this.onGameOver != null) {
				return this.onGameOver();
			}
		};

		game.prototype.point = function() {
			return ~~this._point;
		};

		game.prototype.life = function() {
			return this._life;
		};

		game.prototype.gameLevel = function() {
			return this._gameLevel;
		};

		game.prototype.clearType = function() {
			if (this._gameId > 0) {
				return 1;
			} else {
				return 0;
			}
		};

		game.prototype.isUpdatePoint = function(bool) {
			return this._isUpdatePoint = bool;
		};

		return game;

	})();

	root.MY_CLASS.gameLevel = (function() {
		function gameLevel() {
			this.registParam = bind(this.registParam, this);
			this.levelUp = bind(this.levelUp, this);
			this.reset = bind(this.reset, this);
			this.start = bind(this.start, this);
			this._parameter;
			this._gameParam = [];
		}

		gameLevel.prototype.start = function() {
			return this._parameter = root.MY.gl.parameter;
		};

		gameLevel.prototype.reset = function() {
			var i, j, len1, ref, results, val;
			ref = this._gameParam;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				results.push(this._parameter.set(val.name, val["default"]));
			}
			return results;
		};

		gameLevel.prototype.levelUp = function(clearStageNum) {
			var i, j, len1, num, ref, results, val;
			ref = this._gameParam;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				num = this._parameter.get(val.name) + (this._parameter.get(val.offset) * clearStageNum);
				num = Math.min(num, this._parameter.get(val.max));
				results.push(this._parameter.set(val.name, num));
			}
			return results;
		};

		gameLevel.prototype.registParam = function(arr) {
			var i, j, len1, results, val;
			results = [];
			for (i = j = 0, len1 = arr.length; j < len1; i = ++j) {
				val = arr[i];
				results.push(this._gameParam.push({
					name: val.name,
					offset: val.offset,
					max: val.max,
					"default": this._parameter.get(val.name)
				}));
			}
			return results;
		};

		return gameLevel;

	})();

	root.MY_CLASS.interaction = (function() {
		function interaction() {
			this.mouse = bind(this.mouse, this);
			this.getNormalizeDeviceAng = bind(this.getNormalizeDeviceAng, this);
			this.getNormalizeMousePos = bind(this.getNormalizeMousePos, this);
			this._eDeviceOrientation = bind(this._eDeviceOrientation, this);
			this._eDeviceMotion = bind(this._eDeviceMotion, this);
			this._eMouseMove = bind(this._eMouseMove, this);
			this._eTouchEnd = bind(this._eTouchEnd, this);
			this._eTouchStart = bind(this._eTouchStart, this);
			this._eClick = bind(this._eClick, this);
			this.addOnClick = bind(this.addOnClick, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			this._mouse;
			this._u = root.MY.myfw.util;
			this._onClick = [];
			this._device = {
				ax: 0,
				ay: 0,
				az: 0
			};
			this._deviceMotionCnt = 0;
		}

		interaction.prototype.start = function() {
			this._mouse = new root.MY_CLASS.mouse();
			this._mouse.x = root.MY.myfw.stageWidth() * 0.5;
			this._mouse.y = root.MY.myfw.stageHeight() * 0.5;
			if (root.MY.myfw.conf.IS_SMT) {
				$("body").bind("touchmove", this._eMouseMove);
				$("body").bind("touchstart", this._eTouchStart);
				$("body").bind("touchend", this._eTouchEnd);
				window.addEventListener("devicemotion", this._eDeviceMotion);
				this._mouse.x = -999;
				this._mouse.y = -999;
			} else {
				$("body").bind("mousemove", this._eMouseMove);
				$("body").bind("click", this._eClick);
			}
			return root.MY.myfw.addUpdate(this.update);
		};

		interaction.prototype.update = function() {
			var ease;
			if (root.MY.myfw.conf.IS_SMT) {
				ease = 0.2;
				this._mouse.ax += (this._device.ax - this._mouse.ax) * ease;
				this._mouse.ay += (this._device.ay - this._mouse.ay) * ease;
				return this._mouse.az += (this._device.az - this._mouse.az) * ease;
			}
		};

		interaction.prototype.addOnClick = function(f) {
			return this._onClick.push(f);
		};

		interaction.prototype._eClick = function(e) {
			var i, j, len1, ref, results, val;
			this._eMouseMove(e);
			ref = this._onClick;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val != null) {
					results.push(val(this._mouse));
				} else {
					results.push(void 0);
				}
			}
			return results;
		};

		interaction.prototype._eTouchStart = function(e) {
			var i, j, len1, ref, results, val;
			this._mouse.isDown = true;
			this._eMouseMove(e);
			ref = this._onClick;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val != null) {
					results.push(val(this._mouse));
				} else {
					results.push(void 0);
				}
			}
			return results;
		};

		interaction.prototype._eTouchEnd = function(e) {
			this._mouse.isDown = false;
			this._mouse.x = -999;
			return this._mouse.y = -999;
		};

		interaction.prototype._eMouseMove = function(e) {
			var touches;
			if (root.MY.myfw.conf.IS_SMT && this._mouse.isDown) {
				touches = event.touches;
				event.preventDefault();
				if ((touches != null) && touches.length > 0) {
					this._mouse.xOld = this._mouse.x;
					this._mouse.yOld = this._mouse.y;
					this._mouse.x = touches[0].pageX;
					return this._mouse.y = touches[0].pageY;
				}
			} else {
				this._mouse.xOld = this._mouse.x;
				this._mouse.yOld = this._mouse.y;
				this._mouse.x = e.clientX;
				return this._mouse.y = e.clientY;
			}
		};

		interaction.prototype._eDeviceMotion = function(e) {
			var ac, acx, acy, acz, ax, ay, az;
			ac = e.accelerationIncludingGravity;
			acx = ac.x;
			acy = ac.y;
			acz = ac.z;
			ax = Math.floor(Math.atan2(acx, acz) / Math.PI * 180) || 0;
			ay = Math.floor(Math.atan2(acy, acz) / Math.PI * 180) || 0;
			az = Math.floor(Math.atan2(acy, acx) / Math.PI * 180) || 0;
			if (ax < 0) {
				ax += 360;
			}
			if (ay < 0) {
				ay += 360;
			}
			if (az < 0) {
				az += 360;
			}
			this._device.ax = ax;
			this._device.ay = ay;
			return this._device.az = az;
		};

		interaction.prototype._eDeviceOrientation = function(e) {
			var heading;
			heading = e.webkitCompassHeading;
			if (heading != null) {
				if (this._mouse.startHeading === 0) {
					this._mouse.startHeading = heading;
				}
				this._mouse.heading = heading;
				this._mouse.alpha = e.alpha;
				this._mouse.beta = e.beta;
				return this._mouse.gamma = e.gamma;
			}
		};

		interaction.prototype.getNormalizeMousePos = function() {
			var h, w;
			w = root.MY.myfw.stageWidth();
			h = root.MY.myfw.stageHeight();
			return {
				x: this._u.map(this._mouse.x, 0, 1, 0, w),
				y: this._u.map(this._mouse.y, 0, 1, 0, h)
			};
		};

		interaction.prototype.getNormalizeDeviceAng = function() {
			var baseHeading, dh, h, offsetHeading;
			baseHeading = 180;
			offsetHeading = baseHeading - this._mouse.startHeading;
			h = this._mouse.heading + offsetHeading;
			if (h > 360) {
				h -= 360;
			}
			if (h < 0) {
				h += 360;
			}
			dh = h - baseHeading;
			switch (window.orientation) {
				case 90:
					return {
						x: this._u.map(this._mouse.ay, 0, 1, 180 - 360, 180 + 360),
						y: 0.5
					};
				case -90:
					return {
						x: this._u.map(this._mouse.ay, 1, 0, 180 - 360, 180 + 360),
						y: 0.5
					};
				default:
					return {
						x: this._u.map(this._mouse.ax, 1, 0, 180 - 360, 180 + 360),
						y: 0.5
					};
			}
		};

		interaction.prototype.mouse = function() {
			return this._mouse;
		};

		return interaction;

	})();

	root.MY_CLASS.mouse = (function() {
		function mouse() {
			this.x = 0;
			this.y = 0;
			this.xOld = 0;
			this.yOld = 0;
			this.ax = 0;
			this.ay = 0;
			this.az = 0;
			this.axOld = -1;
			this.ayOld = -1;
			this.azOld = -1;
			this.heading = 0;
			this.startHeading = 0;
			this.alpha = 0;
			this.beta = 0;
			this.gamma = 0;
			this.isDown = false;
		}

		return mouse;

	})();

	root.MY_CLASS.multiColladaLoader = (function() {
		function multiColladaLoader() {
			this.get = bind(this.get, this);
			this._makeSearchTable = bind(this._makeSearchTable, this);
			this._eCompleteData = bind(this._eCompleteData, this);
			this._eProgressData = bind(this._eProgressData, this);
			this._loadCollada = bind(this._loadCollada, this);
			this.load = bind(this.load, this);
			this._list;
			this._table;
			this._loadedNum = 0;
			this.onProgress;
			this.onComplete;
		}

		multiColladaLoader.prototype.load = function(list) {
			this._list = list;
			return this._loadCollada();
		};

		multiColladaLoader.prototype._loadCollada = function() {
			var loader;
			loader = new THREE.ColladaLoader();
			this._list[this._loadedNum].loader = loader;
			return loader.load(this._list[this._loadedNum].file, this._eCompleteData, this._eProgressData);
		};

		multiColladaLoader.prototype._eProgressData = function(e) {
			if (this.onProgress != null) {
				return this.onProgress((this._loadedNum + (e.loaded / e.total)) / this._list.length);
			}
		};

		multiColladaLoader.prototype._eCompleteData = function(collada) {
			var b, i, j, len1, ref, val;
			this._list[this._loadedNum].obj = collada.scene;
			collada.scene.traverse((function(_this) {
				return function(child) {
					var animation;
					if (child instanceof THREE.SkinnedMesh) {
						animation = new THREE.Animation(child, child.geometry.animation);
						animation.play();
						return _this._list[_this._loadedNum].anm = animation;
					}
				};
			})(this));
			ref = collada.skins;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.material.map = this._list[this._loadedNum].tex;
				val.material.side = THREE.DoubleSide;
				val.geometry.computeBoundingBox();
				if (this._list[this._loadedNum].rePos) {
					b = val.geometry.boundingBox;
					val.position.z = -b.min.z - (b.max.z - b.min.z) * 0.5;
				}
			}
			this._loadedNum++;
			if (this._loadedNum >= this._list.length) {
				this._makeSearchTable();
				if (this.onComplete != null) {
					return this.onComplete();
				}
			} else {
				return this._loadCollada();
			}
		};

		multiColladaLoader.prototype._makeSearchTable = function() {
			var i, j, len1, ref, results, val;
			this._table = {};
			ref = this._list;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				results.push(this._table[val.key] = val);
			}
			return results;
		};

		multiColladaLoader.prototype.get = function(key) {
			return this._table[key];
		};

		return multiColladaLoader;

	})();

	root.MY_CLASS.multiObjLoader = (function() {
		function multiObjLoader() {
			this.get = bind(this.get, this);
			this._makeSearchTable = bind(this._makeSearchTable, this);
			this._eCompleteObjData = bind(this._eCompleteObjData, this);
			this._eProgressObjData = bind(this._eProgressObjData, this);
			this._loadObj = bind(this._loadObj, this);
			this.load = bind(this.load, this);
			this._list;
			this._table;
			this._loadedNum = 0;
			this.onProgress;
			this.onComplete;
		}

		multiObjLoader.prototype.load = function(list) {
			this._list = list;
			return this._loadObj();
		};

		multiObjLoader.prototype._loadObj = function() {
			var loader;
			loader = new THREE.OBJLoader();
			this._list[this._loadedNum].loader = loader;
			return loader.load(this._list[this._loadedNum].file, this._eCompleteObjData, this._eProgressObjData);
		};

		multiObjLoader.prototype._eProgressObjData = function(e) {
			if (this.onProgress != null) {
				return this.onProgress((this._loadedNum + (e.loaded / e.total)) / this._list.length);
			}
		};

		multiObjLoader.prototype._eCompleteObjData = function(obj) {
			obj.traverse((function(_this) {
				return function(child) {
					var b;
					if (child instanceof THREE.Mesh) {
						child.material.map = _this._list[_this._loadedNum].tex;
						child.material.side = THREE.DoubleSide;
						child.geometry.computeBoundingBox();
						if (_this._list[_this._loadedNum].rePos) {
							b = child.geometry.boundingBox;
							return child.position.z = -b.min.z - (b.max.z - b.min.z) * 0.5;
						}
					}
				};
			})(this));
			this._list[this._loadedNum].obj = obj;
			this._loadedNum++;
			if (this._loadedNum >= this._list.length) {
				this._makeSearchTable();
				if (this.onComplete != null) {
					return this.onComplete();
				}
			} else {
				return this._loadObj();
			}
		};

		multiObjLoader.prototype._makeSearchTable = function() {
			var i, j, len1, ref, results, val;
			this._table = {};
			ref = this._list;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				results.push(this._table[val.key] = val);
			}
			return results;
		};

		multiObjLoader.prototype.get = function(key) {
			return this._table[key];
		};

		return multiObjLoader;

	})();

	root.MY_CLASS.parameter = (function() {
		function parameter() {
			this.set = bind(this.set, this);
			this.get = bind(this.get, this);
			this._getUseJson = bind(this._getUseJson, this);
			this.registGameParam = bind(this.registGameParam, this);
			this._eCompleteJson = bind(this._eCompleteJson, this);
			this.start = bind(this.start, this);
			this._data;
			this._debugger;
			this._conf = root.MY.app.conf;
			this._isSmt = root.MY.myfw.conf.IS_SMT;
			this.onComplete;
		}

		parameter.prototype.start = function() {
			var useJson;
			useJson = this._getUseJson();
			return $.getJSON(useJson, this._eCompleteJson);
		};

		parameter.prototype._eCompleteJson = function(e) {
			var param, useData;
			this._data = {};
			this._data.pc = e.param.pc || {};
			this._data.smt = e.param.smt || {};
			if (this._conf.TEST.DEBUGTOOL) {
				if (this._isSmt) {
					useData = this._data.smt;
					param = [
						{
							type: 0,
							name: "lifeSpd",
							def: useData.lifeSpd || 8,
							min: 0,
							max: 30,
							int: true,
							useStrg: useData.lifeSpd == null
						}, {
							type: 0,
							name: "lifeSpdAdd",
							def: useData.lifeSpdAdd || 2,
							min: 0,
							max: 10,
							int: true,
							useStrg: useData.lifeSpdAdd == null
						}, {
							type: 0,
							name: "lifeSpdMax",
							def: useData.lifeSpdMax || 50,
							min: 0,
							max: 50,
							int: true,
							useStrg: useData.lifeSpdMax == null
						}, {
							type: 0,
							name: "item",
							def: useData.itemNum || 3,
							min: 1,
							max: 7,
							int: true,
							useStrg: useData.itemNum == null
						}, {
							type: 0,
							name: "itemAdd",
							def: useData.itemAdd || 1,
							min: 0,
							max: 5,
							int: true,
							useStrg: useData.itemAdd == null
						}, {
							type: 0,
							name: "itemMax",
							def: useData.itemMax || 7,
							min: 1,
							max: 7,
							int: true,
							useStrg: useData.itemMax == null
						}, {
							type: 0,
							name: "kaihuku0",
							def: useData.kaihuku0 || 3,
							min: 0,
							max: 20,
							int: true,
							useStrg: useData.kaihuku0 == null
						}, {
							type: 0,
							name: "kaihuku1",
							def: useData.kaihuku1 || 6,
							min: 0,
							max: 20,
							int: true,
							useStrg: useData.kaihuku1 == null
						}, {
							type: 0,
							name: "kaihuku2",
							def: useData.kaihuku2 || 10,
							min: 0,
							max: 20,
							int: true,
							useStrg: useData.kaihuku2 == null
						}, {
							type: 0,
							name: "combo",
							def: useData.combo || 0.2,
							min: 0,
							max: 1,
							int: false,
							useStrg: useData.combo == null
						}, {
							type: 0,
							name: "fov",
							def: useData.fov || 45,
							min: 0,
							int: true,
							max: 90,
							useStrg: useData.fov == null
						}, {
							type: 0,
							name: "lineLife",
							def: useData.lineLife || 35,
							min: 10,
							max: 100,
							int: true,
							useStrg: useData.lineLife == null
						}, {
							type: 0,
							name: "moveX",
							def: useData.moveX || 60,
							min: 0,
							max: 200,
							int: true,
							useStrg: useData.movexpc == null
						}, {
							type: 0,
							name: "moveY",
							def: useData.moveY || 0,
							min: 0,
							max: 0,
							int: true,
							useStrg: useData.moveypc == null
						}, {
							type: 0,
							name: "moveSpeed",
							def: useData.moveSpeed || 0.1,
							min: 0.001,
							max: 1,
							useStrg: useData.moveSpeed == null
						}, {
							type: 0,
							name: "itemRangeX",
							def: useData.itemRangeX || 200,
							int: true,
							min: 80,
							max: 600,
							useStrg: useData.itemRangeX == null
						}, {
							type: 0,
							name: "itemRangeY",
							def: useData.itemRangeY || 150,
							int: true,
							min: 80,
							max: 600,
							useStrg: useData.itemRangeY == null
						}
					];
				} else {
					useData = this._data.pc;
					param = [
						{
							type: 0,
							name: "lifeSpd",
							def: useData.lifeSpd || 8,
							min: 0,
							max: 30,
							int: true,
							useStrg: useData.lifeSpd == null
						}, {
							type: 0,
							name: "lifeSpdAdd",
							def: useData.lifeSpdAdd || 2,
							min: 0,
							max: 10,
							int: true,
							useStrg: useData.lifeSpdAdd == null
						}, {
							type: 0,
							name: "lifeSpdMax",
							def: useData.lifeSpdMax || 50,
							min: 0,
							max: 100,
							int: true,
							useStrg: useData.lifeSpdMax == null
						}, {
							type: 0,
							name: "item",
							def: useData.itemNum || 3,
							min: 1,
							max: 7,
							int: true,
							useStrg: useData.itemNum == null
						}, {
							type: 0,
							name: "itemAdd",
							def: useData.itemAdd || 1,
							min: 0,
							max: 10,
							int: true,
							useStrg: useData.itemAdd == null
						}, {
							type: 0,
							name: "itemMax",
							def: useData.itemMax || 7,
							min: 1,
							max: 7,
							int: true,
							useStrg: useData.itemMax == null
						}, {
							type: 0,
							name: "kaihuku0",
							def: useData.kaihuku0 || 3,
							min: 0,
							max: 20,
							int: true,
							useStrg: useData.kaihuku0 == null
						}, {
							type: 0,
							name: "kaihuku1",
							def: useData.kaihuku1 || 6,
							min: 0,
							max: 20,
							int: true,
							useStrg: useData.kaihuku1 == null
						}, {
							type: 0,
							name: "kaihuku2",
							def: useData.kaihuku2 || 10,
							min: 0,
							max: 20,
							int: true,
							useStrg: useData.kaihuku2 == null
						}, {
							type: 0,
							name: "combo",
							def: useData.combo || 0.2,
							min: 0,
							max: 2,
							int: false,
							useStrg: useData.combo == null
						}, {
							type: 0,
							name: "moveX",
							def: useData.moveX || 30,
							min: 0,
							int: true,
							max: 200,
							useStrg: useData.movexpc == null
						}, {
							type: 0,
							name: "moveY",
							def: useData.moveY || 20,
							min: 0,
							int: true,
							max: 200,
							useStrg: useData.moveypc == null
						}, {
							type: 0,
							name: "moveSpeed",
							def: useData.moveSpeed || 0.338,
							min: 0.001,
							max: 1,
							useStrg: useData.moveSpeed == null
						}, {
							type: 0,
							name: "itemRangeX",
							def: useData.itemRangeX || 550,
							int: true,
							min: 80,
							max: 600,
							useStrg: useData.itemRangeX == null
						}, {
							type: 0,
							name: "itemRangeY",
							def: useData.itemRangeY || 200,
							int: true,
							min: 80,
							max: 600,
							useStrg: useData.itemRangeY == null
						}, {
							type: 0,
							name: "fov",
							def: useData.fov || 45,
							min: 0,
							int: true,
							max: 90,
							useStrg: useData.fov == null
						}, {
							type: 0,
							name: "lineLife",
							def: useData.lineLife || 35,
							min: 10,
							max: 100,
							int: true,
							useStrg: useData.lineLife == null
						}
					];
				}
				this._debugger = new root._LIBS.debugView($("#debug"), param);
				this._debugger.onChange = this._eChangeDebug;
				this._debugger.setup();
			} else {
				if (root.MY.myfw.conf.IS_IOSUiView || root.MY.myfw.conf.IS_ADR) {
					this._data.smt.moveX = 0;
					this._data.smt.itemRangeX = 150;
				}
			}
			if (this.onComplete != null) {
				return this.onComplete();
			}
		};

		parameter.prototype.registGameParam = function(gameLevel) {
			var arr;
			arr = [
				{
					name: "lifeSpd",
					offset: "lifeSpdAdd",
					max: "lifeSpdMax"
				}, {
					name: "item",
					offset: "itemAdd",
					max: "itemMax"
				}
			];
			return gameLevel.registParam(arr);
		};

		parameter.prototype._getUseJson = function() {
			if (this._conf.TEST.DEBUGTOOL) {
				return this._conf.PATH_JSON.PARAM + "test.json";
			} else {
				return this._conf.FILE_FIX_PARAM;
			}
		};

		parameter.prototype.get = function(name) {
			if (this._conf.TEST.DEBUGTOOL) {
				return this._debugger.get(name);
			} else {
				if (this._isSmt) {
					return this._data.smt[name] || 0;
				} else {
					return this._data.pc[name] || 0;
				}
			}
		};

		parameter.prototype.set = function(name, val) {
			if (this._conf.TEST.DEBUGTOOL) {
				return this._debugger.set(name, val);
			} else {
				if (this._isSmt) {
					return this._data.smt[name] = val;
				} else {
					return this._data.pc[name] = val;
				}
			}
		};

		return parameter;

	})();

	root.MY_CLASS.showItemMgr = (function() {
		function showItemMgr(stockItem) {
			this._spShowItem3 = bind(this._spShowItem3, this);
			this._spShowItem2 = bind(this._spShowItem2, this);
			this._spShowItem1 = bind(this._spShowItem1, this);
			this._spShowItem0 = bind(this._spShowItem0, this);
			this._setItem = bind(this._setItem, this);
			this._hideAllItem = bind(this._hideAllItem, this);
			this.showItem = bind(this.showItem, this);
			this.makeOffsetTable = bind(this.makeOffsetTable, this);
			this._isContainStageItem = bind(this._isContainStageItem, this);
			this._update = bind(this._update, this);
			this.start = bind(this.start, this);
			this._stockItem = stockItem;
			this._parameter;
			this._u = root.MY.myfw.util;
			this._offsetTable = [];
			this._item = [];
			this._isSmt = root.MY.myfw.conf.IS_SMT;
			this._device = this._isSmt ? 1 : 0;
			this._itemSize = {
				w: 0,
				y: 0
			};
			this._isShowed = false;
			this._game;
			this._conf = root.MY.app.conf;
			this.onShowItem;
		}

		showItemMgr.prototype.start = function() {
			this._game = root.MY.gl.game;
			this._parameter = root.MY.gl.parameter;
			this.makeOffsetTable();
			return root.MY.myfw.addUpdate(this._update);
		};

		showItemMgr.prototype._update = function() {
			if (this._isShowed) {
				if (!this._isContainStageItem()) {
					return this._isShowed = false;
				}
			}
		};

		showItemMgr.prototype._isContainStageItem = function() {
			var cnt, i, j, len1, ref, val;
			cnt = 0;
			ref = this._item;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if ((val != null) && !val.isContainStage()) {
					cnt++;
				} else {
					if (val == null) {
						return false;
					}
				}
			}
			return cnt < this._item.length;
		};

		showItemMgr.prototype.makeOffsetTable = function() {
			var ix, iy, obj, results, xLen, xRange, yLen, yRange;
			this._offsetTable = [];
			this._itemSize.w = this._itemSize.h = [80, 30][this._device];
			xRange = this._parameter.get("itemRangeX") * 2;
			yRange = this._parameter.get("itemRangeY");
			ix = 0;
			iy = 0;
			xLen = ~~(xRange / this._itemSize.w);
			yLen = ~~(yRange / this._itemSize.h);
			results = [];
			while (ix < xLen) {
				iy = 0;
				while (iy < yLen) {
					obj = {};
					obj.x = ix * this._itemSize.w - xRange * 0.5;
					obj.y = iy * this._itemSize.h;
					this._offsetTable.push(obj);
					iy++;
				}
				results.push(ix++);
			}
			return results;
		};

		showItemMgr.prototype.showItem = function(at) {
			var i, num, offset;
			if (this._isShowed) {
				return false;
			}
			this._isShowed = true;
			this._hideAllItem();
			if (this._u.hit(10)) {
				this._u.arrRand([this._spShowItem0, this._spShowItem1, this._spShowItem1, this._spShowItem2, this._spShowItem3])(at);
				return;
			}
			this._u.shuffle(this._offsetTable);
			num = this._parameter.get("item");
			if (this._conf.IS_CAP) {
				num = 7;
			}
			this._item = [];
			i = 0;
			while (i < num) {
				offset = this._offsetTable[i];
				if (this.onShowItem != null) {
					this._setItem(at, offset.x, offset.y, i, true);
				}
				i++;
			}
			return true;
		};

		showItemMgr.prototype._hideAllItem = function() {
			var i, j, len1, ref, results, val;
			ref = this._stockItem;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				results.push(val.hide());
			}
			return results;
		};

		showItemMgr.prototype._setItem = function(t, itemX, itemY, i, offset, interval, zOffset) {
			if (zOffset == null) {
				zOffset = 0;
			}
			if ((offset != null) && offset) {
				itemX += root.MY.myfw.util.range(10);
				itemY += root.MY.myfw.util.range(10);
			}
			if (this._isSmt && Math.abs(window.orientation) === 90) {
				itemX *= 2;
				itemY *= 1;
			}
			return this._item.push(this.onShowItem(t, itemX, itemY, i, interval, zOffset));
		};

		showItemMgr.prototype._spShowItem0 = function(t) {
			var cy, i, isSpiral, itemX, itemY, num, rad, radius, results, start;
			radius = [150, 100][this._device];
			cy = [80, 50][this._device];
			start = this._u.range(180);
			isSpiral = this._u.hit(2);
			num = this._conf.MAX_COMBO;
			i = 0;
			results = [];
			while (i < num) {
				rad = start + this._u.radian(360 / num * i);
				itemX = Math.sin(rad) * radius;
				itemY = cy + Math.cos(rad) * radius;
				this._setItem(t, itemX, itemY, i, false, 3, isSpiral ? 0 : -300 + i * 200);
				results.push(i++);
			}
			return results;
		};

		showItemMgr.prototype._spShowItem1 = function(t) {
			var cy, d, i, itemX, itemY, num, rad, radius, results, start, x;
			radius = [100, 50][this._device];
			cy = [80, 50][this._device];
			start = this._u.range(180);
			if (this._u.hit(3)) {
				radius = 0;
			}
			x = -this._parameter.get("itemRangeX");
			num = this._conf.MAX_COMBO;
			i = 0;
			results = [];
			while (i < num) {
				rad = start + this._u.radian(360 / num * i);
				d = Math.abs(x * 2) / num;
				itemX = x + d * i + d * 0.5;
				itemY = cy + Math.sin(rad) * radius;
				this._setItem(t, itemX, itemY, i, false, 3);
				results.push(i++);
			}
			return results;
		};

		showItemMgr.prototype._spShowItem2 = function(t) {
			var h, i, itemX, itemY, j, len1, ofstx, ofsty, results, strTable, use, val, w;
			strTable = [[[0, 1], [0.25, 0.6], [0.5, 0], [0.75, 0.6], [1, 1], [0.45, 0.6], [0.55, 0.6]], [[0, 0], [0.25, 0.25], [0.5, 0.5], [1, 0], [0.75, 0.25], [0.5, 0.75], [0.5, 1]], [[1, 0], [1, 0.5], [1, 1], [0, 0], [0.5, 0.35], [0.5, 0.65], [0, 1]], [[0.5, 0.5], [0, 0], [0.5, 0], [1, 0], [0.75, 0.5], [0.5, 1], [0.25, 0.5]]];
			use = this._u.arrRand(strTable);
			ofstx = [0, 0][this._device];
			ofsty = [90, 50][this._device];
			w = this._parameter.get("itemRangeX") * 2 * [0.25, 0.5][this._device];
			h = this._parameter.get("itemRangeY") * 2 * [0.5, 0.5][this._device];
			results = [];
			for (i = j = 0, len1 = use.length; j < len1; i = ++j) {
				val = use[i];
				itemX = val[0] * w - w * 0.5;
				itemY = ofsty + -val[1] * h + h * 0.5;
				this._setItem(t, itemX, itemY, i, false, 3);
				results.push(i++);
			}
			return results;
		};

		showItemMgr.prototype._spShowItem3 = function(t) {
			var cy, d, i, itemX, itemY, num, rad, radius, results, x;
			radius = [100, 50][this._device];
			cy = [80, 50][this._device];
			x = -this._parameter.get("itemRangeX");
			num = this._conf.MAX_COMBO;
			i = 0;
			results = [];
			while (i < num) {
				rad = this._u.radian(270 * i);
				d = Math.abs(x * 2) / num;
				itemX = x + d * i + d * 0.5;
				itemY = cy + Math.sin(rad) * radius;
				this._setItem(t, itemX, itemY, i, false, 3);
				results.push(i++);
			}
			return results;
		};

		return showItemMgr;

	})();

	root.MY_CLASS.webglMain = (function() {
		function webglMain() {
			this.isPostEffect = bind(this.isPostEffect, this);
			this._eStartNextStage = bind(this._eStartNextStage, this);
			this._eEnterNextStage = bind(this._eEnterNextStage, this);
			this._eCompleteNextData = bind(this._eCompleteNextData, this);
			this._eSetupNextStage = bind(this._eSetupNextStage, this);
			this._eEnterLoopArea = bind(this._eEnterLoopArea, this);
			this._eEndStage = bind(this._eEndStage, this);
			this._eGetItem = bind(this._eGetItem, this);
			this._update = bind(this._update, this);
			this._resize = bind(this._resize, this);
			this.resetGame = bind(this.resetGame, this);
			this.stopGame = bind(this.stopGame, this);
			this.startGame = bind(this.startGame, this);
			this._eClickTopStart = bind(this._eClickTopStart, this);
			this._eCompletePostEffect = bind(this._eCompletePostEffect, this);
			this.startZoomAnimation = bind(this.startZoomAnimation, this);
			this.startBrightAnimation = bind(this.startBrightAnimation, this);
			this.disposeTop = bind(this.disposeTop, this);
			this.makeTop = bind(this.makeTop, this);
			this.makeRoad = bind(this.makeRoad, this);
			this.start = bind(this.start, this);
			this._scene;
			this._camera;
			this._ambLight;
			this._dLight;
			this._renderer;
			this._u = root.MY.myfw.util;
			this._conf = root.MY.app.conf;
			this._isSmt = root.MY.myfw.conf.IS_SMT;
			this._device = this._isSmt ? 1 : 0;
			this._top;
			this._road;
			this._parameter;
			this._data;
			this._game;
			this._composer;
			this._shader = [];
			this._brightAnm;
			this._zoomAnm;
			this._isPostEffect = false;
			this._postEffectType = 0;
			this.onStart;
			this.onGetItem;
			this._delayCall;
		}

		webglMain.prototype.start = function() {
			this._delayCall = new root.MY_CLASS.delayCall();
			this._delayCall.start();
			this._brightAnm = new root._LIBS.animation();
			this._zoomAnm = new root._LIBS.animation();
			this._parameter = root.MY.gl.parameter;
			this._data = root.MY.gl.data;
			this._game = root.MY.gl.game;
			this._scene = new THREE.Scene();
			this._camera = new THREE.PerspectiveCamera(this._conf.FAV, window.innerWidth / window.innerHeight, 1, this._conf.CAMERA_FAR[this._device]);
			this._ambLight = new THREE.AmbientLight(0xffffff);
			this._scene.add(this._ambLight);
			this._ambLight.position.set(0, 0, 0);
			this._renderer = new THREE.WebGLRenderer({
				antialias: false
			});
			if (window.devicePixelRatio != null) {
				this._renderer.setPixelRatio(window.devicePixelRatio);
			}
			this._renderer.setClearColor(this._conf.BG_COLOR[0]);
			this._renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(this._renderer.domElement);
			this._composer = new THREE.EffectComposer(this._renderer);
			this._composer.addPass(new THREE.RenderPass(this._scene, this._camera));
			this._shader[0] = new THREE.ShaderPass(THREE.ZoomBlurShader);
			this._composer.addPass(this._shader[0]);
			this._shader[1] = new THREE.ShaderPass(THREE.BrightnessContrastShader);
			this._shader[1].renderToScreen = true;
			this._composer.addPass(this._shader[1]);
			root.MY.gl.scene = this._scene;
			root.MY.gl.camera = this._camera;
			root.MY.myfw.addResize(this._resize);
			root.MY.myfw.addUpdate(this._update);
			return this._resize();
		};

		webglMain.prototype.makeRoad = function() {
			this._road = new root.MY_CLASS.road();
			this._road.onSetupNextStage = this._eSetupNextStage;
			this._road.onEndStage = this._eEndStage;
			this._road.onGetItem = this._eGetItem;
			this._road.onStartNextStage = this._eStartNextStage;
			this._road.onEnterNextStage = this._eEnterNextStage;
			this._road.onEnterLoopArea = this._eEnterLoopArea;
			this._road.start();
			return this._road.isDraw(false);
		};

		webglMain.prototype.makeTop = function() {
			this._top = new root.MY_CLASS.topView();
			this._top.onClickStart = this._eClickTopStart;
			return this._top.start();
		};

		webglMain.prototype.disposeTop = function() {
			if (this._top != null) {
				this._top.dispose();
				return this._top = null;
			}
		};

		webglMain.prototype.startBrightAnimation = function(f, d, e, from, to, isResetPostEffect) {
			if (to == null) {
				to = 0;
			}
			if (isResetPostEffect == null) {
				isResetPostEffect = true;
			}
			this.isPostEffect(true);
			this._brightAnm.set({
				brightness: {
					from: from,
					to: to
				},
				frame: f,
				delay: d,
				ease: e || "easeOutExpo",
				onComplete: isResetPostEffect ? this._eCompletePostEffect : null
			});
			return this._brightAnm.start();
		};

		webglMain.prototype.startZoomAnimation = function(f0, f1, d, t) {
			this.isPostEffect(true);
			this._zoomAnm.set({
				strength: {
					from: 0,
					to: t
				},
				frame: f0,
				delay: d || 0,
				ease: "easeOutExpo",
				onComplete: (function(_this) {
					return function() {
						_this._zoomAnm.set({
							strength: {
								from: t,
								to: 0
							},
							frame: f1,
							delay: 0,
							ease: "easeOutExpo",
							onComplete: _this._eCompletePostEffect
						});
						return _this._zoomAnm.start();
					};
				})(this)
			});
			return this._zoomAnm.start();
		};

		webglMain.prototype._eCompletePostEffect = function() {
			return this.isPostEffect(false);
		};

		webglMain.prototype._eClickTopStart = function() {
			if (this.onStart != null) {
				return this.onStart();
			}
		};

		webglMain.prototype.startGame = function() {
			this.isPostEffect(false);
			this.disposeTop();
			this._road.makeRoad();
			this._road.startRun();
			this._road.isDraw(true);
			this._update();
			return root.MY.gl.ui.musicTitle().showTitle(this._game.stageId());
		};

		webglMain.prototype.stopGame = function() {
			return this._road.stopRun();
		};

		webglMain.prototype.resetGame = function() {
			return this._road.reset();
		};

		webglMain.prototype._resize = function() {
			var h, w;
			w = root.MY.myfw.stageWidth();
			h = root.MY.myfw.stageHeight();
			this._camera.aspect = w / h;
			this._camera.updateProjectionMatrix();
			this._renderer.setSize(w, h);
			if ((this._composer != null) && this._isPostEffect) {
				return this._composer.setSize(w, h);
			}
		};

		webglMain.prototype._update = function() {
			var zoomBlur;
			this._camera.fov = this._parameter.get("fov");
			this._camera.updateProjectionMatrix();
			if (this._isPostEffect) {
				if (this._brightAnm != null) {
					this._shader[1].uniforms['brightness'].value = this._brightAnm.get("brightness");
				} else {
					this._shader[1].uniforms['brightness'].value = 1;
				}
				this._shader[1].uniforms['contrast'].value = 0;
				zoomBlur = this._shader[0];
				if ((this._zoomAnm != null) && !this._zoomAnm.isCompleted()) {
					zoomBlur.uniforms["strength"].value = this._zoomAnm.get("strength");
				} else {
					zoomBlur.uniforms["strength"].value = 0;
				}
			}
			if (this._isPostEffect) {
				return this._composer.render();
			} else {
				return this._renderer.render(this._scene, this._camera);
			}
		};

		webglMain.prototype._eGetItem = function(rank, combo) {
			if (this.onGetItem != null) {
				return this.onGetItem(rank, combo);
			}
		};

		webglMain.prototype._eEndStage = function() {
			return this._game.waitGame();
		};

		webglMain.prototype._eEnterLoopArea = function() {
			root.MY.gl.ui.stgInterval().showClear(this._game.clearStageNum() + 1);
			root.MY.gl.ui.musicTitle().hideTitle();
			if (!this._isSmt) {
				return this.startZoomAnimation(60, 160, 0, 1.3);
			}
		};

		webglMain.prototype._eSetupNextStage = function() {
			root.MY.gl.ui.stgInterval().hideClear();
			root.MY.gl.ui.stgInterval().showNext();
			this._data.onCompleteNextData = this._eCompleteNextData;
			return this._data.loadNextStage(this._game.nextStageId(), this._game.nextGameId(), true);
		};

		webglMain.prototype._eCompleteNextData = function() {
			root.MY.gl.ui.stgInterval().hideNext();
			root.MY.gl.ui.stgInterval().showTitle(this._game.clearStageNum() + 1);
			this._delayCall.onComplete = (function(_this) {
				return function() {
					_this._game.goNextStage();
					return _this._road.goNextStage();
				};
			})(this);
			return this._delayCall.watchStart(30);
		};

		webglMain.prototype._eEnterNextStage = function() {
			root.MY.gl.ui.stgInterval().hideTitle();
			return root.MY.gl.audio.playStgBgm(this._game.stageId());
		};

		webglMain.prototype._eStartNextStage = function() {
			this._game.resumeGame();
			return root.MY.gl.ui.musicTitle().showTitle(this._game.stageId());
		};

		webglMain.prototype.isPostEffect = function(val) {
			this._isPostEffect = val;
			if (this._isPostEffect) {
				return this._renderer.setClearColor(this._conf.BG_COLOR[0]);
			} else {
				return this._renderer.setClearColor(this._conf.BG_COLOR[1]);
			}
		};

		return webglMain;

	})();

}).call(this);