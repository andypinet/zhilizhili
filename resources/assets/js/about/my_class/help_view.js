export default function(superClass) {
		extend(helpView, superClass);

		function helpView(elm) {
			this._eClickPrev = bind(this._eClickPrev, this);
			this._eClickNext = bind(this._eClickNext, this);
			this._setPage = bind(this._setPage, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			helpView.__super__.constructor.call(this, elm);
			this._base;
			this._page = [];
			this._prev;
			this._next;
			this._nowPage = 0;
		}

		helpView.prototype.addStage = function() {
			var i, num, page;
			helpView.__super__.addStage.call(this);
			this._prev = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.HELP + "prev.png", root.MY.app.conf.IMG_RETINA);
			this._prev.onClick = this._eClickPrev;
			this._container.unshiftChild(this._prev);
			this._next = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.HELP + "next.png", root.MY.app.conf.IMG_RETINA);
			this._next.onClick = this._eClickNext;
			this._container.unshiftChild(this._next);
			if (this._isSmt) {
				this._prev.xy(26 / 2, 424 / 2);
				this._next.xy(536 / 2, this._prev.y());
			} else {
				this._prev.xy(26, 424);
				this._next.xy(536, this._prev.y());
			}
			i = 0;
			num = 2;
			while (i < num) {
				page = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.HELP + "page" + String(i) + "_" + String(this._device) + ".png", root.MY.app.conf.IMG_RETINA);
				this._container.unshiftChild(page);
				this._page.push(page);
				i++;
			}
			this._base = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.HELP + "help.png", root.MY.app.conf.IMG_RETINA);
			this._container.unshiftChild(this._base);
			return this._setPage();
		};

		helpView.prototype.dispose2 = function() {
			var i, j, len1, ref, val;
			if (this._base != null) {
				this._base.dispose();
				this._base = null;
			}
			if (this._page != null) {
				ref = this._page;
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					val.dispose();
				}
				this._page = null;
			}
			return helpView.__super__.dispose2.call(this);
		};

		helpView.prototype.resize = function(w, h) {
			return helpView.__super__.resize.call(this, w, h);
		};

		helpView.prototype._setPage = function() {
			var i, j, len1, ref, val;
			ref = this._page;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.visible(this._nowPage === i);
			}
			this._prev.visible(this._nowPage > 0);
			return this._next.visible(this._nowPage !== this._page.length - 1);
		};

		helpView.prototype._eClickNext = function() {
			this._nowPage = Math.min(this._nowPage + 1, this._page.length - 1);
			return this._setPage();
		};

		helpView.prototype._eClickPrev = function() {
			this._nowPage = Math.max(this._nowPage - 1, 0);
			return this._setPage();
		};

		return helpView;

	}