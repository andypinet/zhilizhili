export default function(superClass) {
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
			// if (this._isSmt) {
			// 	this._title = new root._LIBS.displayImage(this._getImgName("title"), root.MY.app.conf.IMG_RETINA);
			// } else {
			// 	this._title = new root.MY_CLASS.topTitleView();
			// }
			// this._title.onLoad = this._setParts;
			// this.addChild(this._title);
			// this._start = new root.MY_CLASS.startBtn(this._getImgName("start"), root.MY.app.conf.IMG_RETINA);
			// this._start.onLoad = this._setParts;
			// this._start.onClick = this._eClickStart;
			// this.addChild(this._start);
			// this._help = new root.MY_CLASS.imgBtn2d(this._getImgName("help"), root.MY.app.conf.IMG_RETINA, {
			// 	onImg: true
			// });
			// this._help.onLoad = this._setParts;
			// this._help.onClick = this._eClickHelp;
			// this.addChild(this._help);
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
			// if (this._title != null) {
			// 	this._title.dispose();
			// 	this._title = null;
			// }
			// if (this._start != null) {
			// 	this._start.dispose();
			// 	this._start = null;
			// }
			// if (this._help != null) {
			// 	this._help.dispose();
			// 	this._help = null;
			// }
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
			// if (this._title != null) {
			// 	this._title.xy(~~(this.width() * 0.5 - this._title.width() * 0.5), 0);
			// }
			// if (this._start != null) {
			// 	this._start.xy(~~(this.width() * 0.5 - this._start.width() * 0.5), [255, 208 / 2][this._device]);
			// }
			// if (this._help != null) {
			// 	if (this._isSmt) {
			// 		this._help.xy(0, 318 / 2);
			// 	} else {
			// 		this._help.xy(~~(this.width() * 0.5 - this._help.width() * 0.5), 350);
			// 	}
			// }
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
			// if (!this._isSmt) {
			// 	this._title.show(d);
			// }
			return this.update();
		};

		topUiView.prototype.hide = function() {
			this._isShowAnimation = false;
			this.visible(false);
			// this._start.stopEffect();
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

	}