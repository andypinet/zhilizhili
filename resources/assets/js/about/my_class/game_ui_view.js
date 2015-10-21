export default function(superClass) {
		extend(gameUiView, superClass);

		function gameUiView(elm) {
			this.musicTitle = bind(this.musicTitle, this);
			this.stgInterval = bind(this.stgInterval, this);
			this.result = bind(this.result, this);
			this.point = bind(this.point, this);
			this.life = bind(this.life, this);
			this.showResult = bind(this.showResult, this);
			this.reset = bind(this.reset, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this.show = bind(this.show, this);
			this.setMouseTg = bind(this.setMouseTg, this);
			this.addStage = bind(this.addStage, this);
			gameUiView.__super__.constructor.call(this, elm, {
				resize: true
			});
			this._life;
			this._point;
			this._result;
			this._stgInterval;
			this._gameOver;
			this._mouseTg;
			this._musicTitle;
			this._conf = root.MY.app.conf;
		}

		gameUiView.prototype.addStage = function() {
			this.unselectable();
			this._life = new root.MY_CLASS.lifeUiView();
			this.addChild(this._life);
			this._point = new root.MY_CLASS.pointUiView();
			this.addChild(this._point);
			this._musicTitle = new root.MY_CLASS.musicTitleView();
			this.addChild(this._musicTitle);
			if (this._isSmt) {
				this._result = new root.MY_CLASS.smtResultUiView();
				this._gameOver = new root.MY_CLASS.gameOverView();
				this.addChild(this._gameOver);
			} else {
				this._result = new root.MY_CLASS.pcResultUiView();
			}
			this.addChild(this._result);
			this._stgInterval = new root.MY_CLASS.stgIntervalView();
			this.addChild(this._stgInterval);
			return this.visible(false);
		};

		gameUiView.prototype.setMouseTg = function() {
			if (!this._conf.IS_CAP && !root.MY.myfw.conf.IS_SMT && (this._mouseTg == null)) {
				this._mouseTg = new root.MY_CLASS.uiMouse();
				return this.unshiftChild(this._mouseTg);
			}
		};

		gameUiView.prototype.show = function() {
			return this.visible(true);
		};

		gameUiView.prototype.dispose2 = function() {};

		gameUiView.prototype.resize = function(w, h) {};

		gameUiView.prototype.reset = function() {
			this._life.visible(true);
			this._life.reset();
			this._point.visible(true);
			this._musicTitle.visible(true);
			if (this._mouseTg != null) {
				this._mouseTg.visible(true);
			}
			if (this._gameOver != null) {
				this._gameOver.hide();
			}
			return this._result.hide();
		};

		gameUiView.prototype.showResult = function(point, clearType) {
			this._result.show(point, clearType);
			root.MY.gl.bg.show(this._conf.BG_OPACITY[1], 20);
			root.MY.gl.footer.show(true, 50);
			if (this._mouseTg != null) {
				this._mouseTg.visible(false);
			}
			this._life.visible(false);
			this._point.visible(false);
			this._musicTitle.visible(false);
			if (this._gameOver != null) {
				return this._gameOver.show();
			}
		};

		gameUiView.prototype.life = function() {
			return this._life;
		};

		gameUiView.prototype.point = function() {
			return this._point;
		};

		gameUiView.prototype.result = function() {
			return this._result;
		};

		gameUiView.prototype.stgInterval = function() {
			return this._stgInterval;
		};

		gameUiView.prototype.musicTitle = function() {
			return this._musicTitle;
		};

		return gameUiView;

	}