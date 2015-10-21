export default function(superClass) {
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

	}