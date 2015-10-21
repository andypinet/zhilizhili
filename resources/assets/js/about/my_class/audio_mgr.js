export default function() {
		function audioMgr() {
			this._makeStgBufferSource = bind(this._makeStgBufferSource, this);
			this.playStgBgm = bind(this.playStgBgm, this);
			this._eLoadedStageBgmBuffer = bind(this._eLoadedStageBgmBuffer, this);
			this.loadStgBgm = bind(this.loadStgBgm, this);
			this.stgBgmRate = bind(this.stgBgmRate, this);
			this.getNowBgmTotalFrame = bind(this.getNowBgmTotalFrame, this);
			this._playSe = bind(this._playSe, this);
			this.playSeaUpSe = bind(this.playSeaUpSe, this);
			this.playSeaDownSe = bind(this.playSeaDownSe, this);
			this.playItemGetSe = bind(this.playItemGetSe, this);
			this._eBlurWin = bind(this._eBlurWin, this);
			this._eFocusWin = bind(this._eFocusWin, this);
			this._update = bind(this._update, this);
			this._eLoadedCmnSe = bind(this._eLoadedCmnSe, this);
			this.loadCmnSe = bind(this.loadCmnSe, this);
			this.start = bind(this.start, this);
			this._context;
			this._seBuffer = [];
			this._stgBgmBuffer = [];
			this._nowStageId = -1;
			this._stgBgmSource;
			this._stgBgmGainNode;
			this._conf = root.MY.app.conf;
			this._vol = 1;
			this._u = root.MY.myfw.util;
			this._game;
			this._stgBgmTime = {
				offset: 0,
				total: 0,
				rate: 0,
				stopTimeTotal: 0,
				stopStartTime: 0,
				isPlaying: false
			};
			this.onProgressCmnSound;
			this.onCompleteCmnSe;
			this.onCompleteStageBgm;
		}

		audioMgr.prototype.start = function() {
			this._game = root.MY.gl.game;
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			this._context = new AudioContext();
			if (!root.MY.myfw.conf.IS_SMT) {
				$(window).focus(this._eFocusWin);
				return $(window).blur(this._eBlurWin);
			}
		};

		audioMgr.prototype.loadCmnSe = function() {
			var loader;
			loader = new BufferLoader(this._context, ["./assets/sound/se0.mp3", "./assets/sound/wave_in.mp3", "./assets/sound/wave_out.mp3"], this._eLoadedCmnSe);
			return loader.load();
		};

		audioMgr.prototype._eLoadedCmnSe = function(bufferList) {
			this._seBuffer = bufferList;
			if (this.onProgressCmnSound != null) {
				this.onProgressCmnSound(1);
			}
			if (this.onCompleteCmnSe != null) {
				this.onCompleteCmnSe();
			}
			return root.MY.myfw.addUpdate(this._update);
		};

		audioMgr.prototype._update = function() {
			var ease, tgVol;
			if ((this._stgBgmSource != null) && this._stgBgmTime.isPlaying) {
				ease = 0.1;
				tgVol = this._u.map(this._game.life(), this._conf.SOUND_VOL.MIN, this._conf.SOUND_VOL.MAX, 0, 1);
				this._vol += (tgVol - this._vol) * ease;
				if (this._stgBgmGainNode != null) {
					this._stgBgmGainNode.gain.value = this._vol;
				}
				return this._stgBgmTime.rate = Math.min(1, (this._context.currentTime - this._stgBgmTime.offset) / (this._stgBgmTime.total + this._stgBgmTime.stopTimeTotal));
			}
		};

		audioMgr.prototype._eFocusWin = function() {
			if ((this._stgBgmSource != null) && !this._stgBgmTime.isPlaying && this._stgBgmTime.rate < 1) {
				this._stgBgmTime.isPlaying = true;
				this._makeStgBufferSource(this._stgBgmTime.stageId, this._stgBgmTime.stopStartTime - this._stgBgmTime.offset, false);
				this._stgBgmTime.stopTimeTotal = this._context.currentTime - this._stgBgmTime.stopStartTime;
				this._update();
				return root.MY.gl.game.isUpdatePoint(true);
			}
		};

		audioMgr.prototype._eBlurWin = function() {
			if ((this._stgBgmSource != null) && this._stgBgmTime.isPlaying && this._stgBgmTime.rate < 1) {
				this._stgBgmTime.isPlaying = false;
				this._stgBgmSource.stop(0);
				this._stgBgmTime.stopStartTime = this._context.currentTime;
				return root.MY.gl.game.isUpdatePoint(false);
			}
		};

		audioMgr.prototype.playItemGetSe = function(combo) {
			return this._playSe(0, combo * 0.5);
		};

		audioMgr.prototype.playSeaDownSe = function() {
			return this._playSe(1);
		};

		audioMgr.prototype.playSeaUpSe = function() {
			return this._playSe(2);
		};

		audioMgr.prototype._playSe = function(id, playBackRate) {
			var gain, source;
			if (this._seBuffer[id] != null) {
				source = this._context.createBufferSource();
				source.buffer = this._seBuffer[id];
				source.connect(this._context.destination);
				source.loop = false;
				source.playbackRate.value = playBackRate || 1;
				source.start(0);
				gain = this._context.createGain();
				source.connect(gain);
				gain.connect(this._context.destination);
				return gain.gain.value = this._conf.ITEM_GET_SE_VOL;
			}
		};

		audioMgr.prototype.getNowBgmTotalFrame = function() {
			if (this._stgBgmSource != null) {
				return this._stgBgmSource.buffer.duration * 60;
			} else {
				return 0;
			}
		};

		audioMgr.prototype.stgBgmRate = function() {
			return this._stgBgmTime.rate;
		};

		audioMgr.prototype.loadStgBgm = function(stageId) {
			var loader;
			if (this._stgBgmBuffer[stageId] != null) {
				if (this.onCompleteStageBgm != null) {
					this.onCompleteStageBgm();
				}
				return;
			}
			this._nowStageId = stageId;
			loader = new BufferLoader(this._context, [root.MY.app.conf.FILE_STAGE_BGM[stageId]], this._eLoadedStageBgmBuffer);
			return loader.load();
		};

		audioMgr.prototype._eLoadedStageBgmBuffer = function(bufferList) {
			this._stgBgmBuffer[this._nowStageId] = bufferList;
			if (this.onCompleteStageBgm != null) {
				return this.onCompleteStageBgm();
			}
		};

		audioMgr.prototype.playStgBgm = function(stageId) {
			this._makeStgBufferSource(stageId, 0, true);
			this._stgBgmTime.offset = this._context.currentTime;
			this._stgBgmTime.total = this._stgBgmSource.buffer.duration;
			this._stgBgmTime.rate = 0;
			this._stgBgmTime.isPlaying = true;
			this._stgBgmTime.stopTimeTotal = 0;
			this._stgBgmTime.stopStartTime = 0;
			this._stgBgmTime.stageId = stageId;
			this._vol = this._conf.SOUND_VOL.MIN;
			return this._update();
		};

		audioMgr.prototype._makeStgBufferSource = function(stageId, start, isStop) {
			var error;
			if (this._stgBgmSource != null) {
				if ((isStop != null) && isStop) {
					try {
						this._stgBgmSource.stop(0);
					} catch (_error) {
						error = _error;
						console.log(error);
					}
				}
				this._stgBgmSource = null;
			}
			this._stgBgmSource = this._context.createBufferSource();
			this._stgBgmSource.buffer = this._stgBgmBuffer[stageId][0];
			this._stgBgmSource.connect(this._context.destination);
			this._stgBgmSource.loop = false;
			this._stgBgmSource.start(0, start || 0);
			this._stgBgmGainNode = this._context.createGain();
			this._stgBgmSource.connect(this._stgBgmGainNode);
			return this._stgBgmGainNode.connect(this._context.destination);
		};

		return audioMgr;

	}