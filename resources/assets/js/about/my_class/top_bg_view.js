export default function(superClass) {
		extend(topBgView, superClass);

		function topBgView() {
			this.hide = bind(this.hide, this);
			this.update = bind(this.update, this);
			this.dispose = bind(this.dispose, this);
			this.start = bind(this.start, this);
			topBgView.__super__.constructor.call(this);
			this._topGround;
			this._sky;
			this._isShow = true;
		}

		topBgView.prototype.start = function() {
			topBgView.__super__.start.call(this);
			this._topGround = new root.MY_CLASS.topGround(this._conf.STAGE_ORDER[0]);
			this._topGround.start();
			this._topGround.show();
			this._sky = new root.MY_CLASS.sky();
			this._sky.start();
			this._sky.show();
			this._camera.lookAt(new THREE.Vector3(0, 0, 0));
			return this.update();
		};

		topBgView.prototype.dispose = function() {
			if (this._topGround != null) {
				this._topGround.dispose();
				this._topGround = null;
			}
			if (this._sky != null) {
				this._sky.dispose();
				this._sky = null;
			}
			return topBgView.__super__.dispose.call(this);
		};

		topBgView.prototype.update = function() {
			var ang;
			topBgView.__super__.update.call(this);
			if (this._isShow) {
				ang = Date.now() * 0.05;
				return this._camera.position.y = 15 + Math.sin(this._u.radian(ang)) * 50;
			}
		};

		topBgView.prototype.hide = function() {
			this._sky.hide();
			this._topGround.hide();
			return this._isShow = false;
		};

		return topBgView;

	}