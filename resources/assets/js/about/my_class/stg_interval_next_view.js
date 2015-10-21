export default function(superClass) {
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

	}