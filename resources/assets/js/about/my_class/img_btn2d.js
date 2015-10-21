export default function(superClass) {
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

	}