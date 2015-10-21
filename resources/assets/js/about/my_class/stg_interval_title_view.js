export default function(superClass) {
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

	}