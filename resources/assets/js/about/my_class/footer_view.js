export default function(superClass) {
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
			// this._google = new root.MY_CLASS.imgBtn2d(this._getImgName2("google"), root.MY.app.conf.IMG_RETINA);
			// this._google.onLoad = this._setParts;
			// this._google.onClick = this._eClickGoogle;
			// this.addChild(this._google);
			// this._banner = new root.MY_CLASS.imgBtn2d(this._getImgName("banner"), root.MY.app.conf.IMG_RETINA);
			// this._banner.onLoad = this._setParts;
			// this._banner.onClick = this._eClickBanner;
			// this.addChild(this._banner);
			this._right = new root._LIBS.display();
			this.addChild(this._right);
			// this._line2 = new root._LIBS.display();
			// this._right.addChild(this._line2);
			// this._line2.size([1, 1][this._device], [14, 14][this._device]);
			// this._line2.bgColor("#FFF");
			// this._tw = new root.MY_CLASS.imgBtn2d(this._getImgName("tw"), root.MY.app.conf.IMG_RETINA);
			// this._tw.onLoad = this._setParts;
			// this._tw.onClick = this._eClickTw;
			// this._right.addChild(this._tw);
			// this._fb = new root.MY_CLASS.imgBtn2d(this._getImgName("fb"), root.MY.app.conf.IMG_RETINA);
			// this._fb.onLoad = this._setParts;
			// this._fb.onClick = this._eClickFb;
			// this._right.addChild(this._fb);
			// if (!this._isSmt) {
			// 	this._system = new root.MY_CLASS.imgBtn2d(this._getImgName("system"), root.MY.app.conf.IMG_RETINA);
			// 	this._system.onLoad = this._setParts;
			// 	this._system.onClick = this._eClickSystem;
			// 	this._right.addChild(this._system);
			// 	this._line = new root._LIBS.display();
			// 	this._right.addChild(this._line);
			// 	this._line.size(1, 10);
			// 	this._line.bgColor("#FFF");
			// 	this._copy = new root._LIBS.displayImage(this._getImgName("copy"), root.MY.app.conf.IMG_RETINA);
			// 	this._copy.onLoad = this._setParts;
			// 	this._right.addChild(this._copy);
			// }
			// if (this._isSmt) {
			// 	this._attention = new root._LIBS.display();
			// 	this._right.addChild(this._attention);
			// 	this._attention.elm().html("<span id='attention'>Twitter銇仼銇偄銉椼儶鍐呫儢銉┿偊銈躲伅<span id='attentionSystem'>鎺ㄥエ鐠板</span>銇惈銇俱倢銇俱仜銈撱€俰OS8浠ヤ笂銇畇afari銉栥儵銈︺偠銇с亰妤姐仐銇裤亸銇犮仌銇勩€�</span><br><span id='copyright'>Copyright 漏 A stAtion All Rights Reserved.</span>");
			// }
			// this._anm.show0 = new root._LIBS.animation();
			// this._anm.show1 = new root._LIBS.animation();
			// this._setParts();
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
			// if (this._isShowAnimation && (!this._anm.show0.isCompleted() || !this._anm.show1.isCompleted())) {
			// 	this._banner.translate(this._anm.show0.get("x"), this._anm.show0.get("y"));
			// 	this._banner.setTransform();
			// 	this._right.translate(this._anm.show1.get("x"), this._anm.show1.get("y"));
			// 	this._right.setTransform();
			// 	this._google.translate(this._anm.show0.get("gx"), this._anm.show0.get("gy"));
			// 	return this._google.setTransform();
			// }
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
			// this._anm.show0.set({
			// 	x: {
			// 		from: x0,
			// 		to: 0
			// 	},
			// 	y: {
			// 		from: y0,
			// 		to: 0
			// 	},
			// 	gx: {
			// 		from: gx0,
			// 		to: 0
			// 	},
			// 	gy: {
			// 		from: gy0,
			// 		to: 0
			// 	},
			// 	frame: f,
			// 	delay: d || 0,
			// 	ease: "easeOutExpo"
			// });
			// this._anm.show0.start();
			// this._anm.show1.set({
			// 	x: {
			// 		from: x1,
			// 		to: 0
			// 	},
			// 	y: {
			// 		from: y1,
			// 		to: 0
			// 	},
			// 	frame: f,
			// 	delay: d || 0,
			// 	ease: "easeOutExpo"
			// });
			// this._anm.show1.start();
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

	}