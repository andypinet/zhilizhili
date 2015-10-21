export default function(superClass) {
		extend(musicTitleView, superClass);

		function musicTitleView() {
			this.hideTitle = bind(this.hideTitle, this);
			this.showTitle = bind(this.showTitle, this);
			this._setParts = bind(this._setParts, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			musicTitleView.__super__.constructor.call(this, {
				resize: true,
				update: true
			});
			this._container;
			this._titleImg = [];
			this._anm;
			this._conf = root.MY.app.conf;
		}

		musicTitleView.prototype.addStage = function() {
			var i, img;
			this._container = new root._LIBS.display();
			this.addChild(this._container);
			i = 0;
			while (i < this._conf.STAGE_NUM) {
				img = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.GAMEUI + "musicTitle/" + String(i) + ".png", root.MY.app.conf.IMG_RETINA);
				img.onLoad = this._setParts;
				this._container.addChild(img);
				img.visible(false);
				this._titleImg.push(img);
				i++;
			}
			return this._anm = new root._LIBS.animation();
		};

		musicTitleView.prototype.update = function() {
			if (this._anm.isStart() && !this._anm.isCompleted()) {
				this._container.translate(this._anm.get("x"), 0);
				this._container.setTransform();
				return this._container.alpha(this._anm.get("opacity"));
			}
		};

		musicTitleView.prototype.dispose2 = function() {};

		musicTitleView.prototype.resize = function(w, h) {
			if (this._isSmt) {
				return this._container.xy(20 / 2, h - 20 / 2);
			} else {
				return this._container.xy(20, h - 20);
			}
		};

		musicTitleView.prototype._setParts = function(w, h) {
			var i, j, len1, ref, results, val;
			ref = this._titleImg;
			results = [];
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (val != null) {
					results.push(val.xy(0, -val.height()));
				} else {
					results.push(void 0);
				}
			}
			return results;
		};

		musicTitleView.prototype.showTitle = function(stageId) {
			var i, j, len1, ref, val;
			ref = this._titleImg;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (i === stageId) {
					val.visible(true);
				} else {
					val.visible(false);
				}
			}
			this._anm.set({
				x: {
					from: 30,
					to: 0
				},
				opacity: {
					from: 0,
					to: 1
				},
				frame: 200,
				delay: 20,
				ease: "easeInOutExpo"
			});
			this._anm.start();
			this._container.alpha(0);
			return this.update();
		};

		musicTitleView.prototype.hideTitle = function() {
			this._anm.set({
				x: {
					from: 0,
					to: -30
				},
				opacity: {
					from: 1,
					to: 0
				},
				frame: 200,
				delay: 120,
				ease: "easeInOutExpo"
			});
			this._anm.start();
			return this.update();
		};

		return musicTitleView;

	}