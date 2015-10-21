export default function(superClass) {
		extend(recordView, superClass);

		function recordView(elm) {
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.update = bind(this.update, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			recordView.__super__.constructor.call(this, elm, {
				resize: true,
				update: true
			});
			this._container;
			this._recordImg;
			this._num;
			this._conf = root.MY.app.conf;
			this._anm = {};
		}

		recordView.prototype.addStage = function() {
			var point;
			this._anm.show = new root._LIBS.animation();
			if ((typeof localStorage !== "undefined" && localStorage !== null) && (localStorage.aykm != null)) {
				point = Number(localStorage.aykm);
				this.mask();
				this._container = new root._LIBS.display();
				this.addChild(this._container);
				this._num = new root.MY_CLASS.numView(String(this._conf.MAX_AYAKM).length, "a", [2, 1][this._device]);
				this._container.addChild(this._num);
				this._num.setNum(point);
				this._recordImg = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.GAMEUI + "record.png", root.MY.app.conf.IMG_RETINA);
				this._recordImg.onLoad = this.resize;
				this._container.addChild(this._recordImg);
				if (this._isSmt) {
					this._num.xy(-this._num.getSize().w, 24 / 2);
				} else {
					this._num.xy(-this._num.getSize().w, 24);
				}
			}
			return this.visible(false);
		};

		recordView.prototype.dispose2 = function() {};

		recordView.prototype.resize = function(w, h) {
			if (this._container != null) {
				this.size(w, h);
				if (this._isSmt) {
					this._container.xy(w - 30 / 2, 30 / 2);
				} else {
					this._container.xy(w - 30, 30);
				}
				if (this._recordImg != null) {
					return this._recordImg.xy(-this._recordImg.width(), 0);
				}
			}
		};

		recordView.prototype.update = function() {
			if ((this._container != null) && !this._anm.show.isCompleted()) {
				this._container.translate(this._anm.show.get("x"), this._anm.show.get("y"));
				return this._container.setTransform();
			}
		};

		recordView.prototype.show = function(isAnimate, d) {
			var f, x0, y0;
			if (this._container != null) {
				this.visible(true);
				f = 60;
				if (this._isSmt) {
					x0 = 100 / 2;
					y0 = -100 / 2;
				} else {
					x0 = 100;
					y0 = -100;
				}
				this._anm.show.set({
					x: {
						from: x0,
						to: 0
					},
					y: {
						from: y0,
						to: 0
					},
					frame: f,
					delay: d || 0,
					ease: "easeOutExpo"
				});
				this._anm.show.start();
				return this.update();
			}
		};

		recordView.prototype.hide = function() {
			return this.visible(false);
		};

		return recordView;

	}