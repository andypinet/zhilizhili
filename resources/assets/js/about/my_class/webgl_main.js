export default function() {
		function webglMain() {
			this.isPostEffect = bind(this.isPostEffect, this);
			this._eStartNextStage = bind(this._eStartNextStage, this);
			this._eEnterNextStage = bind(this._eEnterNextStage, this);
			this._eCompleteNextData = bind(this._eCompleteNextData, this);
			this._eSetupNextStage = bind(this._eSetupNextStage, this);
			this._eEnterLoopArea = bind(this._eEnterLoopArea, this);
			this._eEndStage = bind(this._eEndStage, this);
			this._eGetItem = bind(this._eGetItem, this);
			this._update = bind(this._update, this);
			this._resize = bind(this._resize, this);
			this.resetGame = bind(this.resetGame, this);
			this.stopGame = bind(this.stopGame, this);
			this.startGame = bind(this.startGame, this);
			this._eClickTopStart = bind(this._eClickTopStart, this);
			this._eCompletePostEffect = bind(this._eCompletePostEffect, this);
			this.startZoomAnimation = bind(this.startZoomAnimation, this);
			this.startBrightAnimation = bind(this.startBrightAnimation, this);
			this.disposeTop = bind(this.disposeTop, this);
			this.makeTop = bind(this.makeTop, this);
			this.makeRoad = bind(this.makeRoad, this);
			this.start = bind(this.start, this);
			this._scene;
			this._camera;
			this._ambLight;
			this._dLight;
			this._renderer;
			this._u = root.MY.myfw.util;
			this._conf = root.MY.app.conf;
			this._isSmt = root.MY.myfw.conf.IS_SMT;
			this._device = this._isSmt ? 1 : 0;
			this._top;
			this._road;
			this._parameter;
			this._data;
			this._game;
			this._composer;
			this._shader = [];
			this._brightAnm;
			this._zoomAnm;
			this._isPostEffect = false;
			this._postEffectType = 0;
			this.onStart;
			this.onGetItem;
			this._delayCall;
		}

		webglMain.prototype.start = function() {
			this._delayCall = new root.MY_CLASS.delayCall();
			this._delayCall.start();
			this._brightAnm = new root._LIBS.animation();
			this._zoomAnm = new root._LIBS.animation();
			this._parameter = root.MY.gl.parameter;
			this._data = root.MY.gl.data;
			this._game = root.MY.gl.game;
			this._scene = new THREE.Scene();
			this._camera = new THREE.PerspectiveCamera(this._conf.FAV, window.innerWidth / window.innerHeight, 1, this._conf.CAMERA_FAR[this._device]);
			this._ambLight = new THREE.AmbientLight(0xffffff);
			this._scene.add(this._ambLight);
			this._ambLight.position.set(0, 0, 0);
			this._renderer = new THREE.WebGLRenderer({
				antialias: false
			});
			if (window.devicePixelRatio != null) {
				this._renderer.setPixelRatio(window.devicePixelRatio);
			}
			this._renderer.setClearColor(this._conf.BG_COLOR[0]);
			this._renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(this._renderer.domElement);
			this._composer = new THREE.EffectComposer(this._renderer);
			this._composer.addPass(new THREE.RenderPass(this._scene, this._camera));
			this._shader[0] = new THREE.ShaderPass(THREE.ZoomBlurShader);
			this._composer.addPass(this._shader[0]);
			this._shader[1] = new THREE.ShaderPass(THREE.BrightnessContrastShader);
			this._shader[1].renderToScreen = true;
			this._composer.addPass(this._shader[1]);
			root.MY.gl.scene = this._scene;
			root.MY.gl.camera = this._camera;
			root.MY.myfw.addResize(this._resize);
			root.MY.myfw.addUpdate(this._update);
			return this._resize();
		};

		webglMain.prototype.makeRoad = function() {
			this._road = new root.MY_CLASS.road();
			this._road.onSetupNextStage = this._eSetupNextStage;
			this._road.onEndStage = this._eEndStage;
			this._road.onGetItem = this._eGetItem;
			this._road.onStartNextStage = this._eStartNextStage;
			this._road.onEnterNextStage = this._eEnterNextStage;
			this._road.onEnterLoopArea = this._eEnterLoopArea;
			this._road.start();
			return this._road.isDraw(false);
		};

		webglMain.prototype.makeTop = function() {
			this._top = new root.MY_CLASS.topView();
			this._top.onClickStart = this._eClickTopStart;
			return this._top.start();
		};

		webglMain.prototype.disposeTop = function() {
			if (this._top != null) {
				this._top.dispose();
				return this._top = null;
			}
		};

		webglMain.prototype.startBrightAnimation = function(f, d, e, from, to, isResetPostEffect) {
			if (to == null) {
				to = 0;
			}
			if (isResetPostEffect == null) {
				isResetPostEffect = true;
			}
			this.isPostEffect(true);
			this._brightAnm.set({
				brightness: {
					from: from,
					to: to
				},
				frame: f,
				delay: d,
				ease: e || "easeOutExpo",
				onComplete: isResetPostEffect ? this._eCompletePostEffect : null
			});
			return this._brightAnm.start();
		};

		webglMain.prototype.startZoomAnimation = function(f0, f1, d, t) {
			this.isPostEffect(true);
			this._zoomAnm.set({
				strength: {
					from: 0,
					to: t
				},
				frame: f0,
				delay: d || 0,
				ease: "easeOutExpo",
				onComplete: (function(_this) {
					return function() {
						_this._zoomAnm.set({
							strength: {
								from: t,
								to: 0
							},
							frame: f1,
							delay: 0,
							ease: "easeOutExpo",
							onComplete: _this._eCompletePostEffect
						});
						return _this._zoomAnm.start();
					};
				})(this)
			});
			return this._zoomAnm.start();
		};

		webglMain.prototype._eCompletePostEffect = function() {
			return this.isPostEffect(false);
		};

		webglMain.prototype._eClickTopStart = function() {
			if (this.onStart != null) {
				return this.onStart();
			}
		};

		webglMain.prototype.startGame = function() {
			this.isPostEffect(false);
			this.disposeTop();
			this._road.makeRoad();
			this._road.startRun();
			this._road.isDraw(true);
			this._update();
			return root.MY.gl.ui.musicTitle().showTitle(this._game.stageId());
		};

		webglMain.prototype.stopGame = function() {
			return this._road.stopRun();
		};

		webglMain.prototype.resetGame = function() {
			return this._road.reset();
		};

		webglMain.prototype._resize = function() {
			var h, w;
			w = root.MY.myfw.stageWidth();
			h = root.MY.myfw.stageHeight();
			this._camera.aspect = w / h;
			this._camera.updateProjectionMatrix();
			this._renderer.setSize(w, h);
			if ((this._composer != null) && this._isPostEffect) {
				return this._composer.setSize(w, h);
			}
		};

		webglMain.prototype._update = function() {
			var zoomBlur;
			this._camera.fov = this._parameter.get("fov");
			this._camera.updateProjectionMatrix();
			if (this._isPostEffect) {
				if (this._brightAnm != null) {
					this._shader[1].uniforms['brightness'].value = this._brightAnm.get("brightness");
				} else {
					this._shader[1].uniforms['brightness'].value = 1;
				}
				this._shader[1].uniforms['contrast'].value = 0;
				zoomBlur = this._shader[0];
				if ((this._zoomAnm != null) && !this._zoomAnm.isCompleted()) {
					zoomBlur.uniforms["strength"].value = this._zoomAnm.get("strength");
				} else {
					zoomBlur.uniforms["strength"].value = 0;
				}
			}
			if (this._isPostEffect) {
				return this._composer.render();
			} else {
				return this._renderer.render(this._scene, this._camera);
			}
		};

		webglMain.prototype._eGetItem = function(rank, combo) {
			if (this.onGetItem != null) {
				return this.onGetItem(rank, combo);
			}
		};

		webglMain.prototype._eEndStage = function() {
			return this._game.waitGame();
		};

		webglMain.prototype._eEnterLoopArea = function() {
			root.MY.gl.ui.stgInterval().showClear(this._game.clearStageNum() + 1);
			root.MY.gl.ui.musicTitle().hideTitle();
			if (!this._isSmt) {
				return this.startZoomAnimation(60, 160, 0, 1.3);
			}
		};

		webglMain.prototype._eSetupNextStage = function() {
			root.MY.gl.ui.stgInterval().hideClear();
			root.MY.gl.ui.stgInterval().showNext();
			this._data.onCompleteNextData = this._eCompleteNextData;
			return this._data.loadNextStage(this._game.nextStageId(), this._game.nextGameId(), true);
		};

		webglMain.prototype._eCompleteNextData = function() {
			root.MY.gl.ui.stgInterval().hideNext();
			root.MY.gl.ui.stgInterval().showTitle(this._game.clearStageNum() + 1);
			this._delayCall.onComplete = (function(_this) {
				return function() {
					_this._game.goNextStage();
					return _this._road.goNextStage();
				};
			})(this);
			return this._delayCall.watchStart(30);
		};

		webglMain.prototype._eEnterNextStage = function() {
			root.MY.gl.ui.stgInterval().hideTitle();
			return root.MY.gl.audio.playStgBgm(this._game.stageId());
		};

		webglMain.prototype._eStartNextStage = function() {
			this._game.resumeGame();
			return root.MY.gl.ui.musicTitle().showTitle(this._game.stageId());
		};

		webglMain.prototype.isPostEffect = function(val) {
			this._isPostEffect = val;
			if (this._isPostEffect) {
				return this._renderer.setClearColor(this._conf.BG_COLOR[0]);
			} else {
				return this._renderer.setClearColor(this._conf.BG_COLOR[1]);
			}
		};

		return webglMain;

	}