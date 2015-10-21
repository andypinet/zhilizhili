export default function(superClass) {
		extend(doors, superClass);

		function doors() {
			this.open = bind(this.open, this);
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			doors.__super__.constructor.call(this, {
				addScene: false
			});
			this._left;
			this._right;
			this._anm = {};
			this._isOpenAnimation = false;
		}

		doors.prototype.start = function() {
			var leftObj, leftWidth, rightObj, rightWidth;
			doors.__super__.start.call(this);
			this._anm.left = new root._LIBS.animation();
			this._anm.right = new root._LIBS.animation();
			this._left = new THREE.Object3D();
			this._container.add(this._left);
			leftObj = root.MY.gl.data.getCmnObj3D("doorLeft");
			this._left.add(leftObj);
			leftWidth = this.widthFromBBox(leftObj.children[0].geometry.boundingBox);
			leftObj.position.x = leftWidth;
			this._left.position.x = -leftWidth;
			this._left.rotation.y = this._u.radian(0);
			this._right = new THREE.Object3D();
			this._container.add(this._right);
			rightObj = root.MY.gl.data.getCmnObj3D("doorRight");
			this._right.add(rightObj);
			rightWidth = this.widthFromBBox(leftObj.children[0].geometry.boundingBox);
			rightObj.position.x = -rightWidth;
			this._right.position.x = rightWidth;
			return this._right.rotation.y = this._u.radian(0);
		};

		doors.prototype.update = function() {
			doors.__super__.update.call(this);
			if (this._container.visible != null) {
				if (!this._anm.left.isCompleted()) {
					this._left.rotation.y = this._anm.left.get("ry");
				}
				if (!this._anm.right.isCompleted()) {
					return this._right.rotation.y = this._anm.right.get("ry");
				}
			}
		};

		doors.prototype.dispose = function() {
			return doors.__super__.dispose.call(this);
		};

		doors.prototype.show = function() {
			doors.__super__.show.call(this);
			this._anm.left.reset();
			this._anm.right.reset();
			this._left.rotation.y = this._u.radian(0);
			this._right.rotation.y = this._u.radian(0);
			return this._isOpenAnimation = false;
		};

		doors.prototype.hide = function() {
			doors.__super__.hide.call(this);
			this._anm.left.reset();
			this._anm.right.reset();
			return this._isOpenAnimation = false;
		};

		doors.prototype.open = function() {
			var e, f;
			if (this._isOpenAnimation) {
				return;
			}
			this._isOpenAnimation = true;
			f = 400;
			e = "easeInOutExpo";
			this._anm.left.set({
				ry: {
					from: 0,
					to: this._u.radian(-90)
				},
				frame: f,
				delay: 0,
				ease: e
			});
			this._anm.left.start();
			this._anm.right.set({
				ry: {
					from: 0,
					to: this._u.radian(90)
				},
				frame: f,
				delay: 0,
				ease: e
			});
			return this._anm.right.start();
		};

		return doors;

	}