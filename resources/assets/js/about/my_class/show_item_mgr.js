export default function() {
		function showItemMgr(stockItem) {
			this._spShowItem3 = bind(this._spShowItem3, this);
			this._spShowItem2 = bind(this._spShowItem2, this);
			this._spShowItem1 = bind(this._spShowItem1, this);
			this._spShowItem0 = bind(this._spShowItem0, this);
			this._setItem = bind(this._setItem, this);
			this._hideAllItem = bind(this._hideAllItem, this);
			this.showItem = bind(this.showItem, this);
			this.makeOffsetTable = bind(this.makeOffsetTable, this);
			this._isContainStageItem = bind(this._isContainStageItem, this);
			this._update = bind(this._update, this);
			this.start = bind(this.start, this);
			this._stockItem = stockItem;
			this._parameter;
			this._u = root.MY.myfw.util;
			this._offsetTable = [];
			this._item = [];
			this._isSmt = root.MY.myfw.conf.IS_SMT;
			this._device = this._isSmt ? 1 : 0;
			this._itemSize = {
				w: 0,
				y: 0
			};
			this._isShowed = false;
			this._game;
			this._conf = root.MY.app.conf;
			this.onShowItem;
		}

		showItemMgr.prototype.start = function() {
			this._game = root.MY.gl.game;
			this._parameter = root.MY.gl.parameter;
			this.makeOffsetTable();
			return root.MY.myfw.addUpdate(this._update);
		};

		showItemMgr.prototype._update = function() {
			if (this._isShowed) {
				if (!this._isContainStageItem()) {
					return this._isShowed = false;
				}
			}
		};

		showItemMgr.prototype._isContainStageItem = function() {
			var cnt, i, j, len1, ref, val;
			cnt = 0;
			ref = this._item;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if ((val != null) && !val.isContainStage()) {
					cnt++;
				} else {
					if (val == null) {
						return false;
					}
				}
			}
			return cnt < this._item.length;
		};

		showItemMgr.prototype.makeOffsetTable = function() {
			var ix, iy, obj, results, xLen, xRange, yLen, yRange;
			this._offsetTable = [];
			this._itemSize.w = this._itemSize.h = [80, 30][this._device];
			xRange = this._parameter.get("itemRangeX") * 2;
			yRange = this._parameter.get("itemRangeY");
			ix = 0;
			iy = 0;
			xLen = ~~(xRange / this._itemSize.w);
			yLen = ~~(yRange / this._itemSize.h);
			results = [];
			while (ix < xLen) {
				iy = 0;
				while (iy < yLen) {
					obj = {};
					obj.x = ix * this._itemSize.w - xRange * 0.5;
					obj.y = iy * this._itemSize.h;
					this._offsetTable.push(obj);
					iy++;
				}
				results.push(ix++);
			}
			return results;
		};

		showItemMgr.prototype.showItem = function(at) {
			var i, num, offset;
			if (this._isShowed) {
				return false;
			}
			this._isShowed = true;
			this._hideAllItem();
			if (this._u.hit(10)) {
				this._u.arrRand([this._spShowItem0, this._spShowItem1, this._spShowItem1, this._spShowItem2, this._spShowItem3])(at);
				return;
			}
			this._u.shuffle(this._offsetTable);
			num = this._parameter.get("item");
			if (this._conf.IS_CAP) {
				num = 7;
			}
			this._item = [];
			i = 0;
			while (i < num) {
				offset = this._offsetTable[i];
				if (this.onShowItem != null) {
					this._setItem(at, offset.x, offset.y, i, true);
				}
				i++;
			}
			return true;
		};

		showItemMgr.prototype._hideAllItem = function() {
			var i, j, len1, ref, results, val;
			ref = this._stockItem;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				results.push(val.hide());
			}
			return results;
		};

		showItemMgr.prototype._setItem = function(t, itemX, itemY, i, offset, interval, zOffset) {
			if (zOffset == null) {
				zOffset = 0;
			}
			if ((offset != null) && offset) {
				itemX += root.MY.myfw.util.range(10);
				itemY += root.MY.myfw.util.range(10);
			}
			if (this._isSmt && Math.abs(window.orientation) === 90) {
				itemX *= 2;
				itemY *= 1;
			}
			return this._item.push(this.onShowItem(t, itemX, itemY, i, interval, zOffset));
		};

		showItemMgr.prototype._spShowItem0 = function(t) {
			var cy, i, isSpiral, itemX, itemY, num, rad, radius, results, start;
			radius = [150, 100][this._device];
			cy = [80, 50][this._device];
			start = this._u.range(180);
			isSpiral = this._u.hit(2);
			num = this._conf.MAX_COMBO;
			i = 0;
			results = [];
			while (i < num) {
				rad = start + this._u.radian(360 / num * i);
				itemX = Math.sin(rad) * radius;
				itemY = cy + Math.cos(rad) * radius;
				this._setItem(t, itemX, itemY, i, false, 3, isSpiral ? 0 : -300 + i * 200);
				results.push(i++);
			}
			return results;
		};

		showItemMgr.prototype._spShowItem1 = function(t) {
			var cy, d, i, itemX, itemY, num, rad, radius, results, start, x;
			radius = [100, 50][this._device];
			cy = [80, 50][this._device];
			start = this._u.range(180);
			if (this._u.hit(3)) {
				radius = 0;
			}
			x = -this._parameter.get("itemRangeX");
			num = this._conf.MAX_COMBO;
			i = 0;
			results = [];
			while (i < num) {
				rad = start + this._u.radian(360 / num * i);
				d = Math.abs(x * 2) / num;
				itemX = x + d * i + d * 0.5;
				itemY = cy + Math.sin(rad) * radius;
				this._setItem(t, itemX, itemY, i, false, 3);
				results.push(i++);
			}
			return results;
		};

		showItemMgr.prototype._spShowItem2 = function(t) {
			var h, i, itemX, itemY, j, len1, ofstx, ofsty, results, strTable, use, val, w;
			strTable = [[[0, 1], [0.25, 0.6], [0.5, 0], [0.75, 0.6], [1, 1], [0.45, 0.6], [0.55, 0.6]], [[0, 0], [0.25, 0.25], [0.5, 0.5], [1, 0], [0.75, 0.25], [0.5, 0.75], [0.5, 1]], [[1, 0], [1, 0.5], [1, 1], [0, 0], [0.5, 0.35], [0.5, 0.65], [0, 1]], [[0.5, 0.5], [0, 0], [0.5, 0], [1, 0], [0.75, 0.5], [0.5, 1], [0.25, 0.5]]];
			use = this._u.arrRand(strTable);
			ofstx = [0, 0][this._device];
			ofsty = [90, 50][this._device];
			w = this._parameter.get("itemRangeX") * 2 * [0.25, 0.5][this._device];
			h = this._parameter.get("itemRangeY") * 2 * [0.5, 0.5][this._device];
			results = [];
			for (i = j = 0, len1 = use.length; j < len1; i = ++j) {
				val = use[i];
				itemX = val[0] * w - w * 0.5;
				itemY = ofsty + -val[1] * h + h * 0.5;
				this._setItem(t, itemX, itemY, i, false, 3);
				results.push(i++);
			}
			return results;
		};

		showItemMgr.prototype._spShowItem3 = function(t) {
			var cy, d, i, itemX, itemY, num, rad, radius, results, x;
			radius = [100, 50][this._device];
			cy = [80, 50][this._device];
			x = -this._parameter.get("itemRangeX");
			num = this._conf.MAX_COMBO;
			i = 0;
			results = [];
			while (i < num) {
				rad = this._u.radian(270 * i);
				d = Math.abs(x * 2) / num;
				itemX = x + d * i + d * 0.5;
				itemY = cy + Math.sin(rad) * radius;
				this._setItem(t, itemX, itemY, i, false, 3);
				results.push(i++);
			}
			return results;
		};

		return showItemMgr;

	}