export default function() {
		function audioSwfMgr() {
			this.playStgBgm = bind(this.playStgBgm, this);
			this.loadStgBgm = bind(this.loadStgBgm, this);
			this.stgBgmRate = bind(this.stgBgmRate, this);
			this.getNowBgmTotalFrame = bind(this.getNowBgmTotalFrame, this);
			this.playSeaUpSe = bind(this.playSeaUpSe, this);
			this.playSeaDownSe = bind(this.playSeaDownSe, this);
			this.playItemGetSe = bind(this.playItemGetSe, this);
			this._checkSwf = bind(this._checkSwf, this);
			this._eBlurWin = bind(this._eBlurWin, this);
			this._eFocusWin = bind(this._eFocusWin, this);
			this._update = bind(this._update, this);
			this.loadCmnSe = bind(this.loadCmnSe, this);
			this.start = bind(this.start, this);
			this._fla;
			this._conf = root.MY.app.conf;
			this._vol = 1;
			this._u = root.MY.myfw.util;
			this._game;
			this._nowStageId = -1;
			this._isCompleteSwf = false;
			this._stopMs = 0;
			this._nowStgBgmMs = 0;
			this._nowStgBgmRateBuf = 0;
			this._cnt = 0;
			this._isPlayingStgBgm = false;
			this.onProgressCmnSound;
			this.onCompleteCmnSe;
			this.onCompleteStageBgm;
		}

		audioSwfMgr.prototype.start = function() {
			this._game = root.MY.gl.game;
			$(window).focus(this._eFocusWin);
			return $(window).blur(this._eBlurWin);
		};

		audioSwfMgr.prototype.loadCmnSe = function() {
			var attributes, params;
			$("body").prepend("<div id='" + this._conf.SOUND_SWF_ID + "'></div>");
			params = {
				allowScriptAccess: "always",
				wmode: "transparent"
			};
			attributes = {
				id: this._conf.SOUND_SWF_ID,
				name: this._conf.SOUND_SWF_ID
			};
			swfobject.embedSWF(this._conf.FILE_SOUND, this._conf.SOUND_SWF_ID, "1", "1", "11.0.0", this._conf.FILE_SWFINSTALL, {}, params, attributes);
			$("#" + this._conf.SOUND_SWF_ID).css({
				position: "absolute",
				top: 0,
				left: 0
			});
			return root.MY.myfw.addUpdate(this._update);
		};

		audioSwfMgr.prototype._getSwf = function() {
			var swf;
			swf = $("#" + this._conf.SOUND_SWF_ID);
			if (swf != null) {
				return swf[0];
			} else {
				return null;
			}
		};

		audioSwfMgr.prototype._update = function() {
			var ease, tgVol;
			if (!this._isCompleteSwf) {
				this._checkSwf();
				return;
			}
			if (this._nowStageId !== -1) {
				ease = 0.1;
				tgVol = this._game.life();
				this._vol += (tgVol - this._vol) * ease;
				if ((this._fla != null) && (this._fla.setStageBgmVolume != null)) {
					return this._fla.setStageBgmVolume(this._nowStageId, this._vol);
				}
			}
		};

		audioSwfMgr.prototype._eFocusWin = function() {
			if (this._nowStageId !== -1 && !this._isPlayingStgBgm && this._nowStgBgmRateBuf < 1) {
				if ((this._fla != null) && (this._fla.stopAllStageBgm != null)) {
					this._isPlayingStgBgm = true;
					this._fla.playStageBgm(this._nowStageId, this._stopMs);
					this._update();
					return root.MY.gl.game.isUpdatePoint(true);
				}
			}
		};

		audioSwfMgr.prototype._eBlurWin = function() {
			if (this._nowStageId !== -1 && this._isPlayingStgBgm && this._nowStgBgmRateBuf < 1) {
				if ((this._fla != null) && (this._fla.stopAllStageBgm != null)) {
					this._isPlayingStgBgm = false;
					this._stopMs = this._fla.getStageBgmPosition(this._nowStageId);
					this._fla.stopAllStageBgm();
					return root.MY.gl.game.isUpdatePoint(false);
				}
			}
		};

		audioSwfMgr.prototype._checkSwf = function() {
			var pct, swf;
			swf = this._getSwf();
			if ((swf != null) && (swf.getProgress != null) && (swf.getIsComplete != null)) {
				pct = swf.getProgress();
				if (this.onProgressCmnSound != null) {
					this.onProgressCmnSound(pct / 100);
				}
				if (swf.getIsComplete() === "OK") {
					if (this.onProgressCmnSound != null) {
						this.onProgressCmnSound(1);
					}
					if (this.onCompleteCmnSe != null) {
						this.onCompleteCmnSe();
					}
					this._fla = swf;
					return this._isCompleteSwf = true;
				}
			}
		};

		audioSwfMgr.prototype.playItemGetSe = function(combo) {
			if ((this._fla != null) && (this._fla.playSe != null)) {
				return this._fla.playSe(Math.min(--combo, this._conf.MAX_COMBO - 1));
			}
		};

		audioSwfMgr.prototype.playSeaDownSe = function() {
			if ((this._fla != null) && (this._fla.playSe != null)) {
				return this._fla.playSe(7);
			}
		};

		audioSwfMgr.prototype.playSeaUpSe = function() {
			if ((this._fla != null) && (this._fla.playSe != null)) {
				return this._fla.playSe(8);
			}
		};

		audioSwfMgr.prototype.getNowBgmTotalFrame = function() {
			if ((this._fla != null) && (this._fla.getStageBgmDuration != null)) {
				return this._fla.getStageBgmDuration(this._nowStageId) * 60;
			} else {
				return 0;
			}
		};

		audioSwfMgr.prototype.stgBgmRate = function() {
			if ((this._fla != null) && (this._fla.getStageBgmDuration != null)) {
				this._nowStgBgmRateBuf = this._fla.getStageBgmPosition(this._nowStageId) / this._nowStgBgmMs;
				return this._nowStgBgmRateBuf;
			} else {
				return this._nowStgBgmRateBuf;
			}
		};

		audioSwfMgr.prototype.loadStgBgm = function(stageId) {
			if (this.onCompleteStageBgm != null) {
				return this.onCompleteStageBgm();
			}
		};

		audioSwfMgr.prototype.playStgBgm = function(stageId) {
			this._nowStageId = stageId;
			if ((this._fla != null) && (this._fla.playStageBgm != null) && (this._fla.getStageBgmDuration != null)) {
				this._fla.playStageBgm(this._nowStageId);
				this._nowStgBgmMs = this._fla.getStageBgmDuration(this._nowStageId) * 1000;
				this._nowStgBgmRateBuf = 0;
				this._cnt = 0;
				this._stopMs = 0;
				this._isPlayingStgBgm = true;
				return this._update();
			}
		};

		return audioSwfMgr;

	}