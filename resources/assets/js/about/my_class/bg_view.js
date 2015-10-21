export default function(superClass) {
		extend(bgView, superClass);

		function bgView(elm) {
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.resize = bind(this.resize, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			bgView.__super__.constructor.call(this, elm, {
				resize: true,
				update: true
			});
			this._anm = {};
			this._isShow = false;
			this._delayCall;
		}

		bgView.prototype.addStage = function() {
			var size, src;
			this._delayCall = new root.MY_CLASS.delayCall();
			this._delayCall.start();
			src = root.MY.app.conf.PATH_IMG.PARTS + "bg.png";
			size = String([236, 118][this._device]);
			this.elm().css({
				backgroundImage: "url('" + src + "')",
				backgroundSize: size + "px " + size + "px"
			});
			this._anm.show = new root._LIBS.animation();
			this.visible(false);
			return this.alpha(0);
		};

		bgView.prototype.dispose2 = function() {};

		bgView.prototype.update = function() {
			if (this._isShow && !this._anm.show.isCompleted()) {
				return this.alpha(this._anm.show.get("opacity"));
			}
		};

		bgView.prototype.resize = function(w, h) {
			return this.size(w, h);
		};

		bgView.prototype.show = function(t, d) {
			if (this._isShow) {
				return;
			}
			this._isShow = true;
			this.visible(true);
			if (!this._isSmt) {
				this._anm.show.set({
					opacity: {
						from: 0,
						to: t
					},
					frame: 40,
					delay: d || 0
				});
				this._anm.show.start();
				return this.update();
			} else {
				this._isShow = false;
				this._delayCall.onComplete = (function(_this) {
					return function() {
						return _this.alpha(t);
					};
				})(this);
				return this._delayCall.watchStart(d);
			}
		};

		bgView.prototype.hide = function() {
			this._isShow = false;
			this.visible(false);
			return this.alpha(0);
		};

		return bgView;

	}