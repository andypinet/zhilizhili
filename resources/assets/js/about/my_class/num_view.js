export default function(superClass) {
		extend(numView, superClass);

		function numView(keta, type, margin) {
			this.type = bind(this.type, this);
			this.keta = bind(this.keta, this);
			this.getSize = bind(this.getSize, this);
			this.setNum = bind(this.setNum, this);
			this._disposeNum = bind(this._disposeNum, this);
			this._makeNum = bind(this._makeNum, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			numView.__super__.constructor.call(this);
			this._keta = keta;
			this._numImg = [];
			this._margin = margin || 0;
			this._type = type || "a";
		}

		numView.prototype.addStage = function() {
			return this._makeNum();
		};

		numView.prototype.dispose2 = function() {};

		numView.prototype._makeNum = function() {
			var i, num, results;
			this._disposeNum();
			this._numImg = [];
			i = 0;
			results = [];
			while (i < this._keta) {
				num = new root._LIBS.spriteSheetView(root.MY.app.conf.PATH_IMG.NUM + "all.png", root.MY.app.conf.NUM_SPRITE_JSON, {
					imgRetina: root.MY.app.conf.IMG_RETINA
				});
				this.addChild(num);
				this._numImg.push(num);
				results.push(i++);
			}
			return results;
		};

		numView.prototype._disposeNum = function() {
			var i, j, len1, ref, val;
			if (this._numImg != null) {
				ref = this._numImg;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					val.dispose();
					this._numImg[i] = null;
				}
				return this._numImg = null;
			}
		};

		numView.prototype.setNum = function(num) {
			var i, j, len1, margin, ref, results, val, x;
			num = this._u.numStr(num, this._keta);
			x = 0;
			margin = this._margin;
			ref = this._numImg;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.setState(this._type + num.substr(i, 1) + ".png");
				val.x(x);
				results.push(x += val.width() + margin);
			}
			return results;
		};

		numView.prototype.getSize = function() {
			var h, i, j, len1, ref, size, val, w;
			w = 0;
			h = 0;
			ref = this._numImg;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				size = val.getSize();
				w += size.w + this._margin;
				h = size.h;
			}
			return {
				w: w - this._margin,
				h: h
			};
		};

		numView.prototype.keta = function(val) {
			if (this._keta === val) {
				return;
			}
			this._keta = val;
			return this._makeNum();
		};

		numView.prototype.type = function(val) {
			return this._type = val;
		};

		return numView;

	}