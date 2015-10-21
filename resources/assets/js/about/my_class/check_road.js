export default function() {
		function checkRoad() {
			this._distStr = bind(this._distStr, this);
			this.depthFromBBox = bind(this.depthFromBBox, this);
			this._makeRoad = bind(this._makeRoad, this);
			this._setTestPosition = bind(this._setTestPosition, this);
			this._update = bind(this._update, this);
			this._resize = bind(this._resize, this);
			this.start = bind(this.start, this);
			this._scene;
			this._camera;
			this._ambLight;
			this._renderer;
			this._hAxis;
			this._trackBall;
			this._container;
			this._binormal = new THREE.Vector3();
			this._normal = new THREE.Vector3();
			this._material;
			this._mesh;
			this._debugger;
			this._pNum = 10;
			this._at = 0;
			this._interval = -300;
			this._u = root.MY.myfw.util;
			this._conf = root.MY.app.conf;
		}

		checkRoad.prototype.start = function() {
			this._scene = new THREE.Scene();
			this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50000);
			this._ambLight = new THREE.AmbientLight(0xffffff);
			this._scene.add(this._ambLight);
			this._ambLight.position.set(0, 0, 0);
			this._renderer = new THREE.WebGLRenderer({
				antialias: false
			});
			this._renderer.setClearColor(0xaaaaaa);
			this._renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(this._renderer.domElement);
			this._container = new THREE.Object3D();
			this._scene.add(this._container);
			this._hAxis = new THREE.AxisHelper(5);
			this._container.add(this._hAxis);
			this._material = new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture(this._conf.PATH_IMG.TEX + "niji.jpg")
			});
			this._setTestPosition();
			root.MY.myfw.addResize(this._resize);
			return root.MY.myfw.addUpdate(this._update);
		};

		checkRoad.prototype._resize = function() {
			var h, w;
			w = root.MY.myfw.stageWidth();
			h = root.MY.myfw.stageHeight();
			this._camera.aspect = w / h;
			this._camera.updateProjectionMatrix();
			return this._renderer.setSize(w, h);
		};

		checkRoad.prototype._update = function() {
			var dir, eyeDist, geo, lookAt, now, pick, pickNext, pickt, pos, segments;
			if (this._mesh != null) {
				this._at += 0.001;
				if (this._at >= 1) {
					this._at = 0;
				}
				geo = this._mesh.geometry;
				console.log(this._at);
				pos = geo.parameters.path.getPointAt(this._at);
				segments = geo.tangents.length;
				pickt = this._at * segments;
				pick = Math.floor(pickt);
				pickNext = (pick + 1) % segments;
				if ((geo.binormals[pickNext] != null) && (geo.binormals[pick] != null)) {
					this._binormal.subVectors(geo.binormals[pickNext], geo.binormals[pick]);
					this._binormal.multiplyScalar(pickt - pick).add(geo.binormals[pick]);
				}
				dir = geo.parameters.path.getTangentAt(this._at);
				this._normal.copy(this._binormal).cross(dir);
				pos.add(this._binormal.clone().multiplyScalar(15));
				this._camera.position.copy(pos);
				eyeDist = 30;
				now = (this._at + eyeDist / geo.parameters.path.getLength()) % 1;
				lookAt = geo.parameters.path.getPointAt(now);
				lookAt.add(this._binormal.clone().multiplyScalar(15));
				this._camera.matrix.lookAt(this._camera.position, lookAt, this._binormal);
				this._camera.rotation.setFromRotationMatrix(this._camera.matrix, this._camera.rotation.order);
			}
			return this._renderer.render(this._scene, this._camera);
		};

		checkRoad.prototype._setTestPosition = function() {
			var base, i, p, param;
			base = [
				{
					x: 0,
					y: 0,
					z: 0
				}, {
					x: 0,
					y: 0,
					z: -850
				}, {
					x: 0,
					y: 0,
					z: -1700
				}, {
					x: 0,
					y: 40,
					z: -2550
				}, {
					x: 0,
					y: -20,
					z: -3400
				}, {
					x: 0,
					y: 20,
					z: -4250
				}, {
					x: 0,
					y: -10,
					z: -5100
				}, {
					x: 0,
					y: 20,
					z: -5950
				}, {
					x: 0,
					y: 0,
					z: -6800
				}, {
					x: 0,
					y: 0,
					z: -7650
				}, {
					x: -190,
					y: 0,
					z: -8500
				}, {
					x: -190,
					y: 0,
					z: -9350
				}, {
					x: -190,
					y: 0,
					z: -10200
				}, {
					x: -190,
					y: 0,
					z: -11050
				}, {
					x: -190,
					y: 0,
					z: -11900
				}, {
					x: -190,
					y: 0,
					z: -12750
				}, {
					x: 0,
					y: 0,
					z: -13600
				}, {
					x: -20,
					y: 0,
					z: -14450
				}, {
					x: 0,
					y: 0,
					z: -15300
				}, {
					x: 0,
					y: 0,
					z: -16150
				}
			];
			if (base != null) {
				this._pNum = base.length;
			} else {
				this._pNum = 20;
				this._interval = -380;
			}
			i = 0;
			param = [];
			while (i < this._pNum) {
				if (base == null) {
					p = {
						x: 0,
						y: 0,
						z: this._interval * i
					};
					param.push({
						type: 0,
						name: String(i) + "_z",
						def: p.z,
						min: this._pNum * this._interval,
						max: 0,
						int: true,
						useStrg: false
					});
				} else {
					p = base[i];
					param.push({
						type: 0,
						name: String(i) + "_z",
						def: p.z,
						min: base[base.length - 1].z,
						max: 0,
						int: true,
						useStrg: false
					});
				}
				param.push({
					type: 0,
					name: String(i) + "_x",
					def: p.x,
					min: -50,
					max: 50,
					int: true,
					useStrg: false
				});
				param.push({
					type: 0,
					name: String(i) + "_y",
					def: p.y,
					min: -50,
					max: 50,
					int: true,
					useStrg: false
				});
				i++;
			}
			this._debugger = new root._LIBS.debugView($("#debug"), param);
			this._debugger.onChange = this._makeRoad;
			this._debugger.setup();
			this._makeRoad();
			return $(window).keydown((function(_this) {
				return function(e) {
					if (e.keyCode === 32) {
						_this._makeRoad();
					}
					if (e.keyCode === 13) {
						return _this._distStr();
					}
				};
			})(this));
		};

		checkRoad.prototype._makeRoad = function() {
			var geo, i, p, radSegments, radius, segments, spline;
			if (this._mesh != null) {
				this._container.remove(this._mesh);
				this._mesh.geometry.dispose();
				this._mesh = null;
			}
			p = [];
			i = 0;
			while (i < this._pNum) {
				p.push(new THREE.Vector3(this._debugger.get(String(i) + "_x"), this._debugger.get(String(i) + "_y"), this._debugger.get(String(i) + "_z")));
				i++;
			}
			segments = 5000;
			radius = 10;
			radSegments = 2;
			spline = new THREE.SplineCurve3(p);
			geo = new THREE.TubeGeometry(spline, segments, radius, radSegments, false);
			geo.computeBoundingSphere();
			geo.computeBoundingBox();
			this._mesh = new THREE.Mesh(geo, this._material);
			this._container.add(this._mesh);
			console.log("闀枫仌::", this.depthFromBBox(geo.boundingBox));
			return this._at = 0;
		};

		checkRoad.prototype.depthFromBBox = function(b) {
			return b.max.z - b.min.z;
		};

		checkRoad.prototype._distStr = function() {
			var i, str;
			str = "[";
			i = 0;
			while (i < this._pNum) {
				str += "{";
				str += "x:" + String(this._debugger.get(String(i) + "_x")) + ",";
				str += "y:" + String(this._debugger.get(String(i) + "_y")) + ",";
				str += "z:" + String(this._debugger.get(String(i) + "_z")) + "}";
				if (i !== this._pNum - 1) {
					str += ",";
				}
				i++;
			}
			str += "]";
			return console.log(str);
		};

		return checkRoad;

	}