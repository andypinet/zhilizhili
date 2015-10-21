export default function(superClass) {
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

	}