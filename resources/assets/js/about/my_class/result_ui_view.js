export default function(superClass) {
		extend(resultUiView, superClass);

		function resultUiView() {
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.size = bind(this.size, this);
			this.dispose2 = bind(this.dispose2, this);
			this.resize = bind(this.resize, this);
			this._updateShow = bind(this._updateShow, this);
			this.update = bind(this.update, this);
			this.addStage = bind(this.addStage, this);
			resultUiView.__super__.constructor.call(this, {
				resize: true,
				update: true
			});
			this._anm = {};
			this._isShowAnimation = false;
			this._conf = root.MY.app.conf;
		}

		resultUiView.prototype.addStage = function() {
			this._anm.show = new root._LIBS.animation();
			return this.visible(false);
		};

		resultUiView.prototype.update = function() {
			return this._updateShow();
		};

		resultUiView.prototype._updateShow = function() {
			var s;
			if (this._isShowAnimation && !this._anm.show.isCompleted()) {
				s = this._anm.show.get("scale");
				this.scale(s, s);
				this.setTransform();
				return this.alpha(this._anm.show.get("opacity"));
			}
		};

		resultUiView.prototype.resize = function(w, h) {
			return this.xy(~~(w * 0.5 - this.width() * 0.5), ~~(h * 0.5 - this.height() * 0.5));
		};

		resultUiView.prototype.dispose2 = function() {};

		resultUiView.prototype.size = function(w, h) {
			resultUiView.__super__.size.call(this, w, h);
			this.set3d(this.width() * 0.5, this.height() * 0.5);
			return this.resize(root.MY.myfw.stageWidth(), root.MY.myfw.stageHeight());
		};

		resultUiView.prototype.show = function(delay) {
			if (this._isShowAnimation) {
				return;
			}
			this._isShowAnimation = true;
			this.visible(true);
			this._anm.show.set({
				scale: {
					from: 0.25,
					to: 1
				},
				opacity: {
					from: 0,
					to: 1
				},
				frame: 80,
				delay: delay || 0,
				ease: "easeInOutExpo"
			});
			this._anm.show.start();
			return this.update();
		};

		resultUiView.prototype.hide = function() {
			this._isShowAnimation = false;
			return this.visible(false);
		};

		return resultUiView;

	}