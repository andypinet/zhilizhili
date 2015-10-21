export default function(superClass) {
		extend(lifeUiView, superClass);

		function lifeUiView() {
			this.reset = bind(this.reset, this);
			this.upLifeAnimation = bind(this.upLifeAnimation, this);
			this.setLifeStatus = bind(this.setLifeStatus, this);
			this.setLife = bind(this.setLife, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.update = bind(this.update, this);
			this._makeTriangles = bind(this._makeTriangles, this);
			this.addStage = bind(this.addStage, this);
			lifeUiView.__super__.constructor.call(this, {
				resize: true,
				update: true
			});
			this._bg;
			this._gageTop;
			this._gageBtm;
			this._color;
			this._status = -1;
			this._container;
			this._lifeContainer;
			this._lifeImg = [];
			this._tri = [];
			this._nowLife = 1;
			this._conf = root.MY.app.conf;
		}

		lifeUiView.prototype.addStage = function() {
			var i, lifeImg, num;
			this._container = new root._LIBS.display();
			this.addChild(this._container);
			this._container.mask();
			this._container.size(this._conf.UI_LIFE_SIZE.WIDTH[this._device], this._conf.UI_LIFE_SIZE.HEIGHT[this._device]);
			this._container.elm().css({
				border: "1px solid #FFF",
				backgroundColor: "rgba(0,0,0,0.1)"
			});
			if (this._isSmt) {
				this._lifeContainer = new root._LIBS.display();
				this._container.addChild(this._lifeContainer);
				this._lifeContainer.mask();
				this._lifeContainer.size(this._conf.UI_LIFE_SIZE.WIDTH[this._device], this._conf.UI_LIFE_SIZE.HEIGHT[this._device]);
				i = 0;
				num = 3;
				while (i < num) {
					lifeImg = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.GAMEUI + "life" + String(i) + ".png", root.MY.app.conf.IMG_RETINA);
					this._lifeContainer.addChild(lifeImg);
					this._lifeImg.push(lifeImg);
					i++;
				}
			} else {
				this._makeTriangles();
			}
			return this.setLifeStatus(0);
		};

		lifeUiView.prototype._makeTriangles = function() {
			var colorH, colorL, colorS, dai, i, num, opt, totalWidth, tri, w;
			w = this._conf.UI_LIFE_SIZE.TRI_WIDTH[this._device];
			colorH = 117 / 360;
			colorS = [89 / 100, 100 / 100, 66 / 100];
			colorL = [44 / 100, 35 / 100, 33 / 100];
			totalWidth = -w;
			while (totalWidth < this._container.width()) {
				opt = {};
				opt.isTop = this._tri.length % 2 === 0;
				opt.width = w;
				opt.height = this._container.height();
				opt.h = colorH;
				if (this._tri.length % 2 === 0) {
					opt.s = colorS[0];
					opt.l = colorL[0];
				} else {
					opt.s = colorS[1];
					opt.l = colorL[1];
				}
				tri = new root.MY_CLASS.lifeTriangle(opt);
				this._container.addChild(tri);
				tri.xy(totalWidth, 0);
				tri.centerX = tri.x() + opt.width * 0.5;
				this._tri.push(tri);
				totalWidth += opt.width * 0.5;
			}
			i = 0;
			num = this._tri.length;
			while (i < num) {
				if (i % 4 === 1 || i % 4 === 2) {
					dai = this._tri[i];
					opt = {};
					opt.isTop = i % 2 === 0;
					opt.width = w * 0.5;
					opt.height = this._container.height() * 0.5;
					opt.h = colorH;
					opt.s = colorS[2];
					opt.l = colorL[2];
					tri = new root.MY_CLASS.lifeTriangle(opt);
					this._container.addChild(tri);
					if (opt.isTop) {
						tri.xy(dai.x() + opt.width, 0);
					} else {
						tri.xy(dai.x(), opt.height);
					}
					tri.centerX = tri.x() + opt.width * 0.5;
					this._tri.push(tri);
				}
				i++;
			}
			return this._u.sort(this._tri, "centerX");
		};

		lifeUiView.prototype.update = function() {};

		lifeUiView.prototype.dispose2 = function() {};

		lifeUiView.prototype.resize = function(w, h) {
			if (root.MY.myfw.conf.IS_SMT) {
				return this._container.xy(~~(w * 0.5 - this._container.width() * 0.5), 15);
			} else {
				return this._container.xy(~~(w * 0.5 - this._container.width() * 0.5), 30);
			}
		};

		lifeUiView.prototype.setLife = function(life, isAnimate) {
			var i, j, len1, num, ref, val;
			if (isAnimate == null) {
				isAnimate = true;
			}
			if (isAnimate) {
				this._nowLife += (life - this._nowLife) * 0.3;
			} else {
				this._nowLife = life;
			}
			num = this._tri.length;
			ref = this._tri;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				if (this._nowLife >= (i / num)) {
					val.show(isAnimate);
				} else {
					val.hide(isAnimate);
				}
			}
			if (this._isSmt) {
				this._lifeContainer.width(~~(this._conf.UI_LIFE_SIZE.WIDTH[this._device] * life));
			}
			if (this._nowLife > 0.25 && this._nowLife <= 0.5) {
				return this.setLifeStatus(1);
			} else if (this._nowLife <= 0.25) {
				return this.setLifeStatus(2);
			} else {
				return this.setLifeStatus(0);
			}
		};

		lifeUiView.prototype.setLifeStatus = function(status) {
			var i, j, k, len1, len2, ref, ref1, results, val;
			if (this._status === status) {
				return;
			}
			this._status = status;
			ref = this._tri;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.updateColor2([120, 60, 0][this._status]);
				val.draw();
			}
			if (this._isSmt) {
				ref1 = this._lifeImg;
				results = [];
				for (i = k = 0, len2 = ref1.length; k < len2; i = ++k) {
					val = ref1[i];
					results.push(val.visible(i === this._status));
				}
				return results;
			}
		};

		lifeUiView.prototype.upLifeAnimation = function() {
			var i, j, len1, ref, results, val;
			if (!this._isSmt) {
				ref = this._tri;
				results = [];
				for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
					val = ref[i];
					results.push(val.lifeUp());
				}
				return results;
			}
		};

		lifeUiView.prototype.reset = function() {
			var i, j, len1, ref, val;
			this.setLife(1, false);
			ref = this._tri;
			for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
				val = ref[i];
				val.reset();
			}
			if (this._isSmt) {
				this._lifeContainer.width(~~(this._conf.UI_LIFE_SIZE.WIDTH[this._device] * 1));
			}
			return this.setLifeStatus(0);
		};

		return lifeUiView;

	}