export default function(superClass) {
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

	}