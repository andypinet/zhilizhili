export default function(superClass) {
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

	}