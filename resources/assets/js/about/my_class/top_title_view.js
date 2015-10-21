export default function(superClass) {
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

	}