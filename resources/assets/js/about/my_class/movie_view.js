export default function(superClass) {
		extend(movieView, superClass);

		function movieView(elm) {
			this._eClickClose = bind(this._eClickClose, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			movieView.__super__.constructor.call(this, elm, {
				resize: true
			});
			this._container;
			this._bg;
			this._close;
			this._conf = root.MY.app.conf;
		}

		movieView.prototype.addStage = function() {
			var tag, yh, yw;
			this._bg = new root._LIBS.display();
			this.addChild(this._bg);
			this._bg.bgColor("#000");
			this._bg.alpha(0.3);
			this._bg.elm().bind(["click", "touchstart"][this._device], this._eClickClose);
			this._close = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.PARTS + "close.png", root.MY.app.conf.IMG_RETINA);
			this._close.onLoad = this.resize;
			this._close.onClick = this._eClickClose;
			this.addChild(this._close);
			this._container = new root._LIBS.display();
			this.addChild(this._container);
			yw = [853, 280][this._device];
			yh = [480, 158][this._device];
			tag = this._conf.TAG_SP_MOVIE;
			tag = tag.replace("<width>", yw);
			tag = tag.replace("<height>", yh);
			this._container.elm().html(tag);
			return this._container.size(yw, yh);
		};

		movieView.prototype.dispose2 = function() {
			if (this._bg != null) {
				this._bg.dispose();
				this._bg = null;
			}
			if (this._close != null) {
				this._close.dispose();
				this._close = null;
			}
			if (this._container != null) {
				this._container.dispose();
				this._container = null;
			}
			return this._conf = null;
		};

		movieView.prototype.resize = function(w, h) {
			this._bg.size(w, h);
			if (this._close != null) {
				this._close.xy(w - this._close.width() - [30, 30 / 2][this._device], [30, 30 / 2][this._device]);
			}
			return this._container.xy(~~(w * 0.5 - this._container.width() * 0.5), ~~(h * 0.5 - this._container.height() * 0.5));
		};

		movieView.prototype._eClickClose = function() {
			return root.MY.gl.contents.disposePage();
		};

		return movieView;

	}