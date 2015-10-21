export default function() {
		function game() {
			this.isUpdatePoint = bind(this.isUpdatePoint, this);
			this.clearType = bind(this.clearType, this);
			this.gameLevel = bind(this.gameLevel, this);
			this.life = bind(this.life, this);
			this.point = bind(this.point, this);
			this.endGame = bind(this.endGame, this);
			this.resumeGame = bind(this.resumeGame, this);
			this.waitGame = bind(this.waitGame, this);
			this.resetGame = bind(this.resetGame, this);
			this.startGame = bind(this.startGame, this);
			this.isPlaying = bind(this.isPlaying, this);
			this.upLife = bind(this.upLife, this);
			this._updateGame = bind(this._updateGame, this);
			this.nextGameId = bind(this.nextGameId, this);
			this.gameId = bind(this.gameId, this);
			this.nextStageId = bind(this.nextStageId, this);
			this.stageId = bind(this.stageId, this);
			this.goNextStage = bind(this.goNextStage, this);
			this.clearStageNum = bind(this.clearStageNum, this);
			this.update = bind(this.update, this);
			this.start = bind(this.start, this);
			this._stageId = 0;
			this._gameId = 0;
			this._ui;
			this._point = 0;
			this._life = 1;
			this._delayCall;
			this._isPlaying = false;
			this._isUpdateLife = true;
			this._isUpdatePoint = true;
			this._gameLevel;
			this._conf = root.MY.app.conf;
			this._parameter = root.MY.gl.parameter;
			this.onGameOver;
		}

		game.prototype.start = function() {
			this._delayCall = new root.MY_CLASS.delayCall();
			this._delayCall.start();
			this._ui = root.MY.gl.ui;
			this._gameLevel = new root.MY_CLASS.gameLevel();
			this._gameLevel.start();
			this._parameter.registGameParam(this._gameLevel);
			return root.MY.myfw.addUpdate(this.update);
		};

		game.prototype.update = function() {
			if (this._isPlaying) {
				return this._updateGame();
			}
		};

		game.prototype.clearStageNum = function() {
			return (this._gameId * root.MY.app.conf.STAGE_NUM) + this._stageId;
		};

		game.prototype.goNextStage = function() {
			this._stageId++;
			if (this._stageId >= root.MY.app.conf.STAGE_NUM) {
				this._stageId = 0;
				this._gameId++;
			}
			return this._gameLevel.levelUp(this.clearStageNum());
		};

		game.prototype.stageId = function() {
			return this._conf.STAGE_ORDER[this._stageId];
		};

		game.prototype.nextStageId = function() {
			var next;
			next = this._stageId + 1;
			if (next >= root.MY.app.conf.STAGE_NUM) {
				next = 0;
			}
			return this._conf.STAGE_ORDER[next];
		};

		game.prototype.gameId = function() {
			return this._gameId;
		};

		game.prototype.nextGameId = function() {
			if (this._stageId === root.MY.app.conf.STAGE_NUM - 1) {
				return this._gameId + 1;
			} else {
				return this._gameId;
			}
		};

		game.prototype._updateGame = function() {
			var addPoint, deadSpeed;
			if (this._isUpdatePoint) {
				addPoint = 0.1;
				this._point = Math.min(this._point += addPoint, this._conf.MAX_AYAKM);
				this._ui.point().setPoint(~~this._point);
			}
			if (this._isUpdateLife) {
				deadSpeed = this._parameter.get("lifeSpd") / 10000;
				this._life = Math.max(0, this._life -= deadSpeed);
			}
			this._ui.life().setLife(this._life);
			if (this._life <= 0) {
				return this.endGame();
			}
		};

		game.prototype.upLife = function(rank, combo) {
			var up;
			up = [this._parameter.get("kaihuku0"), this._parameter.get("kaihuku1"), this._parameter.get("kaihuku2")][rank];
			if (combo > 1) {
				up += up * (combo * this._parameter.get("combo"));
				if (combo >= this._conf.MAX_COMBO - 1) {
					up = 100;
					this._isUpdateLife = false;
					this._delayCall.onComplete = (function(_this) {
						return function() {
							return _this._isUpdateLife = true;
						};
					})(this);
					this._delayCall.watchStart(60 * 2);
				}
			}
			up *= 0.01;
			return this._life = Math.min(this._life += up, 1);
		};

		game.prototype.isPlaying = function() {
			return this._isPlaying;
		};

		game.prototype.startGame = function() {
			return this._isPlaying = true;
		};

		game.prototype.resetGame = function() {
			this._isPlaying = false;
			this._point = 0;
			this._life = 1;
			this._stageId = 0;
			this._gameId = 0;
			return this._gameLevel.reset();
		};

		game.prototype.waitGame = function() {
			return this._isPlaying = false;
		};

		game.prototype.resumeGame = function() {
			this._isPlaying = true;
			this._isUpdateLife = false;
			this._delayCall.onComplete = (function(_this) {
				return function() {
					return _this._isUpdateLife = true;
				};
			})(this);
			return this._delayCall.watchStart(60 * 2);
		};

		game.prototype.endGame = function() {
			if (!this._isPlaying) {
				return;
			}
			this._isPlaying = false;
			if (typeof localStorage !== "undefined" && localStorage !== null) {
				if ((localStorage.aykm != null) && localStorage.aykm < this.point()) {
					localStorage.aykm = this.point();
				}
			}
			if (this.onGameOver != null) {
				return this.onGameOver();
			}
		};

		game.prototype.point = function() {
			return ~~this._point;
		};

		game.prototype.life = function() {
			return this._life;
		};

		game.prototype.gameLevel = function() {
			return this._gameLevel;
		};

		game.prototype.clearType = function() {
			if (this._gameId > 0) {
				return 1;
			} else {
				return 0;
			}
		};

		game.prototype.isUpdatePoint = function(bool) {
			return this._isUpdatePoint = bool;
		};

		return game;

	}