export default function(superClass) {
		extend(animationChara, superClass);

		function animationChara() {
			this.dispose = bind(this.dispose, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			animationChara.__super__.constructor.call(this, {
				addScene: false
			});
			this._mesh;
			this._ray;
			this._hitList = [];
		}

		animationChara.prototype.start = function() {
			var geometry, material, size;
			animationChara.__super__.start.call(this);
			this._ray = new THREE.Raycaster();
			size = 50;
			geometry = new THREE.PlaneBufferGeometry(size, size);
			material = new THREE.MeshBasicMaterial({
				color: 0xff0000
			});
			this._mesh = new THREE.Mesh(geometry, material);
			this._container.add(this._mesh);
			this._mesh.position.x += this._u.range(100);
			this._mesh.position.y += this._u.range(100);
			return this._hitList.push(this._mesh);
		};

		animationChara.prototype.update = function() {
			var intersects, vec, x, y;
			animationChara.__super__.update.call(this);
			x = (this._interaction.mouse().x / root.MY.myfw.stageWidth()) * 2 - 1;
			y = -(this._interaction.mouse().y / root.MY.myfw.stageHeight()) * 2 + 1;
			vec = new THREE.Vector3(x, y, 1);
			vec.unproject(this._camera);
			vec = vec.sub(this._camera.position).normalize();
			this._ray.set(this._camera.position, vec);
			return intersects = this._ray.intersectObjects(this._hitList);
		};

		animationChara.prototype.dispose = function() {
			return animationChara.__super__.dispose.call(this);
		};

		return animationChara;

	}