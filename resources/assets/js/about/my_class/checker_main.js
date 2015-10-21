export default function() {
		function checkerMain() {
			this._update = bind(this._update, this);
			this._resize = bind(this._resize, this);
			this._eCompleteCmnObjData = bind(this._eCompleteCmnObjData, this);
			this._getDae = bind(this._getDae, this);
			this.start = bind(this.start, this);
			this._scene;
			this._camera;
			this._dLight;
			this._ambLight;
			this._renderer;
			this._hCamera;
			this._hLight;
			this._hAxis;
			this._trackBall;
			this._container;
			this._obj;
			this._water;
			this._mesh;
			this._cnt = 0;
			this._geo;
			this._nowZ = 0;
			this._roadGeomeryNowPos = new THREE.Vector3();
			this._cmnObjMgr;
			this._stg;
			this._kujira = [];
			this._u = root.MY.myfw.util;
			this._clock;
			this._fusha;
			this._animation = [];
			this._conf = root.MY.app.conf;
		}

		checkerMain.prototype.start = function() {
			this._clock = new THREE.Clock();
			this._scene = new THREE.Scene();
			this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50000);
			this._camera.position.set(34.1593114077221, 14.246622233488102, 142.6781095688237);
			this._ambLight = new THREE.AmbientLight(0xffffff);
			this._scene.add(this._ambLight);
			this._ambLight.position.set(0, 0, 0);
			this._renderer = new THREE.WebGLRenderer({
				antialias: false
			});
			this._renderer.setClearColor(0x666666);
			this._renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(this._renderer.domElement);
			this._trackBall = new THREE.TrackballControls(this._camera);
			this._trackBall.staticMoving = true;
			this._trackBall.target = new THREE.Vector3(0, 0, 0);
			this._cmnObjMgr = new root.MY_CLASS.multiObjLoader();
			this._cmnObjMgr.onComplete = this._eCompleteCmnObjData;
			this._cmnObjMgr.load([
				{
					key: "stg",
					file: "./assets/obj/stage/stage07_01.obj",
					tex: THREE.ImageUtils.loadTexture("./assets/img/tex/stage/stage07.jpg"),
					rePos: true
				}, {
					key: "parts0",
					file: "./assets/obj/parts/stage07_tobira_L.obj",
					tex: THREE.ImageUtils.loadTexture("./assets/img/tex/stage/stage07.jpg"),
					rePos: true
				}, {
					key: "parts1",
					file: "./assets/obj/parts/stage07_tobira_R.obj",
					tex: THREE.ImageUtils.loadTexture("./assets/img/tex/stage/stage07.jpg"),
					rePos: true
				}
			]);
			root.MY.myfw.addResize(this._resize);
			return root.MY.myfw.addUpdate(this._update);
		};

		checkerMain.prototype._getDae = function() {
			return location.hash.replace("#", "") + ".dae";
		};

		checkerMain.prototype._eCompleteCmnObjData = function() {
			var door, i, kujira, kujiras, left, leftCon, leftW, num, pos, right, rightCon, rightW;
			this._container = new THREE.Object3D();
			this._scene.add(this._container);
			this._hAxis = new THREE.AxisHelper(5);
			this._container.add(this._hAxis);
			this._stg = this._cmnObjMgr.get("stg").obj.clone();
			this._container.add(this._stg);
			this._stg.position.y = this._conf.GROUND_OFFSET.Y;
			this._stg.position.z = -(this._stg.children[0].geometry.boundingBox.max.z - this._stg.children[0].geometry.boundingBox.min.z) * 0.5;
			door = new THREE.Object3D();
			this._container.add(door);
			door.position.copy(this._stg.position);
			door.position.z -= 980;
			leftCon = new THREE.Object3D();
			door.add(leftCon);
			leftCon.add(new THREE.AxisHelper(5));
			left = this._cmnObjMgr.get("parts0").obj.clone();
			leftW = left.children[0].geometry.boundingBox.max.x - left.children[0].geometry.boundingBox.min.x;
			leftCon.add(left);
			left.position.x = leftW;
			leftCon.position.x = -leftW;
			leftCon.rotation.y = this._u.radian(-90);
			rightCon = new THREE.Object3D();
			door.add(rightCon);
			rightCon.add(new THREE.AxisHelper(5));
			right = this._cmnObjMgr.get("parts1").obj.clone();
			rightW = right.children[0].geometry.boundingBox.max.x - right.children[0].geometry.boundingBox.min.x;
			rightCon.add(right);
			right.position.x = -rightW;
			rightCon.position.x = rightW;
			rightCon.rotation.y = this._u.radian(90);
			this._container.position.z = 2300;
			this._container.position.y = -100;
			return;
			kujiras = this._cmnObjMgr.get("parts0").obj.clone();
			this._container.add(kujiras);
			kujiras.position.copy(this._stg.position);
			i = 0;
			num = 5;
			pos = [[0, 0, -120, 1], [300, -110, 200, 0.6], [-300, -200, -400, 0.5], [-150, -200, 400, 0.35], [0, -300, 100, 0.4]];
			while (i < num) {
				kujira = this._cmnObjMgr.get("parts1").obj.clone();
				this._container.add(kujira);
				kujira.position.copy(this._stg.position);
				kujira.children[0].material.wireframe = true;
				kujira.position.x += pos[i][0];
				kujira.position.y += pos[i][1];
				kujira.position.z += pos[i][2];
				kujira.scale.set(pos[i][3], pos[i][3], pos[i][3]);
				i++;
			}
			return this._container.scale.set(5, 5, 5);
		};

		checkerMain.prototype._resize = function() {
			var h, w;
			w = root.MY.myfw.stageWidth();
			h = root.MY.myfw.stageHeight();
			this._camera.aspect = w / h;
			this._camera.updateProjectionMatrix();
			return this._renderer.setSize(w, h);
		};

		checkerMain.prototype._update = function() {
			this._trackBall.update();
			THREE.AnimationHandler.update(this._clock.getDelta());
			if (this._fusha != null) {
				this._fusha.rotation.z += 0.01;
			}
			return this._renderer.render(this._scene, this._camera);
		};

		return checkerMain;

	}