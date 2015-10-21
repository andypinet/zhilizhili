export default function(superClass) {
		extend(sorryView, superClass);

		function sorryView(elm) {
			this._eClickBanner = bind(this._eClickBanner, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			sorryView.__super__.constructor.call(this, elm, {
				resize: true,
				update: true
			});
			this._container;
			this._bg;
			this._banner;
			this._panel;
			this._conf = root.MY.app.conf;
		}

		sorryView.prototype.addStage = function() {
			// 增加overflow: hidden
			this.mask();
			this._bg = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.SORRY + "bg.jpg", root.MY.app.conf.IMG_RETINA);
			this._bg.onLoad = this.resize;
			this.addChild(this._bg);
			this._container = new root._LIBS.display();
			this.addChild(this._container);
			this._panel = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.SORRY + "sorry.png", root.MY.app.conf.IMG_RETINA);
			this._panel.onLoad = this.resize;
			this._container.addChild(this._panel);
			this._banner = new root.MY_CLASS.imgBtn2d(root.MY.app.conf.PATH_IMG.FOOTER + "banner0.png", root.MY.app.conf.IMG_RETINA);
			this._banner.onLoad = this.resize;
			this._banner.onClick = this._eClickBanner;
			return this._container.addChild(this._banner);
		};

		sorryView.prototype.update = function() {};

		sorryView.prototype.dispose2 = function() {};

		sorryView.prototype.resize = function(w, h) {
			var scale;
			this.size(w, h);
			if (this._panel != null) {
				this._container.size(this._panel.width(), this._panel.height());
			}
			if (this._banner != null) {
				this._banner.x(~~(this._container.width() * 0.5 - this._banner.width() * 0.5));
				if (this._isSmt) {
					this._banner.y(this._container.height() - 120 / 2);
				} else {
					this._banner.y(this._container.height() - 120);
				}
			}
			this._container.xy(~~(w * 0.5 - this._container.width() * 0.5), ~~(h * 0.5 - this._container.height() * 0.5));
			if (this._bg != null) {
				if (Modernizr.csstransforms && !root.MY.myfw.conf.IS_ADR) {
					scale = w / this._bg.width();
					if (this._bg.height() * scale < h) {
						scale = h / this._bg.height();
					}
					this._bg.set3d(0, 0);
					this._bg.scale(scale, scale);
					this._bg.setTransform();
					return this._bg.xy(~~(w * 0.5 - this._bg.width() * scale * 0.5), ~~(h * 0.5 - this._bg.height() * scale * 0.5));
				} else {
					return this._bg.xy(~~(w * 0.5 - this._bg.width() * 0.5), ~~(h * 0.5 - this._bg.height() * 0.5));
				}
			}
		};

		sorryView.prototype._eClickBanner = function() {
			return window.open(this._conf.LINK_SP_SITE, "");
		};

		return sorryView;

	}