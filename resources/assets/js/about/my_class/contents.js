export default function() {
		function contents() {
			this.shareSite = bind(this.shareSite, this);
			this.shareSns = bind(this.shareSns, this);
			this._makePageElm = bind(this._makePageElm, this);
			this.disposePage = bind(this.disposePage, this);
			this.showMovie = bind(this.showMovie, this);
			this.showHelp = bind(this.showHelp, this);
			this.showSystem = bind(this.showSystem, this);
			this._scrollOff = bind(this._scrollOff, this);
			this._disposeRecord = bind(this._disposeRecord, this);
			this._makeRecord = bind(this._makeRecord, this);
			this._makeFooter = bind(this._makeFooter, this);
			this.retry = bind(this.retry, this);
			this._eGameOver = bind(this._eGameOver, this);
			this._eGetItem = bind(this._eGetItem, this);
			this._eHidedLoading = bind(this._eHidedLoading, this);
			this._eStartGame = bind(this._eStartGame, this);
			this._eReadyAll = bind(this._eReadyAll, this);
			this._eCompleteFirstStgBgm = bind(this._eCompleteFirstStgBgm, this);
			this._eCompleteCmnSe = bind(this._eCompleteCmnSe, this);
			this._eProgressCmnSound = bind(this._eProgressCmnSound, this);
			this._eCompleteFirstStageData = bind(this._eCompleteFirstStageData, this);
			this._eProgressFirstStageData = bind(this._eProgressFirstStageData, this);
			this._eMakedData = bind(this._eMakedData, this);
			this._eProgressData = bind(this._eProgressData, this);
			this._eCompleteParam = bind(this._eCompleteParam, this);
			this.start = bind(this.start, this);
			this._audioMgr;
			this._parameter;
			this._interaction;
			this._gl;
			this._checker;
			this._data;
			this._game;
			this._bg;
			this._footer;
			this._record;
			this._ui;
			this._page;
			this._loading;
			this._restart;
			this._conf = root.MY.app.conf;
		}

		contents.prototype.start = function() {
			var sorry;
			root.MY.gl.contents = this;
			// 检测是否有webgl支持
			if (!Modernizr.webgl || !Detector.webgl) {
				sorry = new root.MY_CLASS.sorryView(this._makePageElm());
				sorry.setup();
				return;
			}						
			//window.FB.init({
			//	appId: root.MY.app.conf.FB_APP_ID,
			//	apiKey: root.MY.app.conf.FB_APP_ID,
			//	status: true,
			//	cookie: true,
			//	xfbml: true
			//});
			this._scrollOff();
			if (!this._conf.RELEASE && location.pathname.indexOf("checker.html") !== -1) {
				this._checker = new root.MY_CLASS.checkerMain();
				this._checker.start();
				return;
			}
			if (!this._conf.RELEASE && location.pathname.indexOf("road.html") !== -1) {
				this._checker = new root.MY_CLASS.checkRoad();
				this._checker.start();
				return;
			}
			if (!root.MY.myfw.conf.IS_SMT) {
				this._restart = new root.MY_CLASS.restartView($("#restart"));
				this._restart.setup();
			}
			// this._interaction = new root.MY_CLASS.interaction();
			// this._interaction.start();
			// root.MY.gl.interaction = this._interaction;
			// this._loading = new root.MY_CLASS.loadingView($("#loading"));
			// this._loading.onHided = this._eHidedLoading;
			// this._loading.setup();
			this._makeFooter();
			this._makeRecord();
			this._parameter = new root.MY_CLASS.parameter();
			this._parameter.onComplete = this._eCompleteParam;
			root.MY.gl.parameter = this._parameter;
			return this._parameter.start();
		};

		contents.prototype._eCompleteParam = function() {
			this._data = new root.MY_CLASS.data();
			root.MY.gl.data = this._data;
			this._data.onProgress = this._eProgressData;
			this._data.onComplete = this._eMakedData;
			return this._data.start();
		};

		contents.prototype._eProgressData = function(rate) {
			// return this._loading.setLoading(rate, 0);
		};

		contents.prototype._eMakedData = function() {
			this._ui = new root.MY_CLASS.gameUiView($("#gameUi"));
			// this._ui.setup();
			root.MY.gl.ui = this._ui;
			this._game = new root.MY_CLASS.game();
			this._game.onGameOver = this._eGameOver;
			this._game.start();
			root.MY.gl.game = this._game;
			if (root.MY.app.conf.SOUND_SWF) {
				this._audioMgr = new root.MY_CLASS.audioSwfMgr();
			} else {
				this._audioMgr = new root.MY_CLASS.audioMgr();
			}
			this._audioMgr.start();
			root.MY.gl.audio = this._audioMgr;
			this._gl = new root.MY_CLASS.webglMain();
			this._gl.onGetItem = this._eGetItem;
			this._gl.onStart = this._eStartGame;
			this._gl.start();
			// this._gl.makeRoad();
			root.MY.gl.main = this._gl;
			this._data.onProgressNextData = this._eProgressFirstStageData;
			this._data.onCompleteNextData = this._eCompleteFirstStageData;
			return this._data.loadNextStage(root.MY.app.conf.STAGE_ORDER[0], 0, false);
		};

		contents.prototype._eProgressFirstStageData = function(rate) {
			// if (this._loading != null) {
			// 	return this._loading.setLoading(rate, 1);
			// }
		};

		contents.prototype._eCompleteFirstStageData = function() {
			this._audioMgr.onProgressCmnSound = this._eProgressCmnSound;
			this._audioMgr.onCompleteCmnSe = this._eCompleteCmnSe;
			return this._audioMgr.loadCmnSe();
		};

		contents.prototype._eProgressCmnSound = function(rate) {
			// return this._loading.setLoading(rate, 2);
		};

		contents.prototype._eCompleteCmnSe = function() {
			this._audioMgr.onCompleteStageBgm = this._eCompleteFirstStgBgm;
			return this._audioMgr.loadStgBgm(this._game.stageId());
		};

		contents.prototype._eCompleteFirstStgBgm = function() {
			// this._loading.setLoading(1, 3);
			this._gl.isPostEffect(true);
			this._bg = new root.MY_CLASS.bgView($("#bg"));
			this._bg.setup();
			root.MY.gl.bg = this._bg;
			this._gl.makeTop();
			return this._eReadyAll();
		};

		contents.prototype._eReadyAll = function() {
			// this._loading.hide();
			return this._gl.startBrightAnimation(160, 170, "easeOutExpo", 1);
		};

		contents.prototype._eStartGame = function() {
			this._disposeRecord();
			root.MY.gl.bg.hide();
			root.MY.gl.footer.hide();
			this._audioMgr.playStgBgm(this._game.stageId());
			this._gl.startGame();
			this._ui.show();
			this._ui.setMouseTg();
			return this._game.startGame();
		};

		contents.prototype._eHidedLoading = function() {
			// if (this._loading != null) {
			// 	this._loading.dispose();
			// 	return this._loading = null;
			// }
		};

		contents.prototype._eGetItem = function(rank, combo) {
			this._game.upLife(rank, combo);
			this._audioMgr.playItemGetSe(combo);
			return this._ui.life().upLifeAnimation();
		};

		contents.prototype._eGameOver = function() {
			this._ui.showResult(this._game.point(), this._game.clearType());
			this._gl.stopGame();
			if (!root.MY.myfw.conf.IS_SMT) {
				return this._gl.startBrightAnimation(100, 10, "easeOutExpo", 0, -0.1, false);
			}
		};

		contents.prototype.retry = function() {
			root.MY.gl.bg.hide();
			root.MY.gl.footer.hide();
			this._game.resetGame();
			this._ui.reset();
			this._gl.resetGame();
			this._audioMgr.playStgBgm(this._game.stageId());
			this._gl.startGame();
			return this._game.startGame();
		};

		contents.prototype._makeFooter = function() {
			this._footer = new root.MY_CLASS.footerView($("#footer"));
			this._footer.setup();
			return root.MY.gl.footer = this._footer;
		};

		contents.prototype._makeRecord = function() {
			this._record = new root.MY_CLASS.recordView($("#record"));
			// this._record.setup();
			return root.MY.gl.record = this._record;
		};

		contents.prototype._disposeRecord = function() {
			if (this._record != null) {
				this._record.dispose();
				this._record = null;
				return root.MY.gl.record = null;
			}
		};

		contents.prototype._scrollOff = function() {
			if (root.MY.myfw.conf.IS_SMT) {
				return $(window).on('touchmove.noScroll', (function(_this) {
					return function(e) {
						return e.preventDefault();
					};
				})(this));
			} else {
				$("body,html").css({
					overflow: "hidden",
					height: "100%"
				});
				return $(window).mousewheel((function(_this) {
					return function() {
						if ((typeof event !== "undefined" && event !== null) && (event.preventDefault != null)) {
							return event.preventDefault();
						}
					};
				})(this));
			}
		};

		contents.prototype.showSystem = function() {
			this.disposePage();
			this._page = new root.MY_CLASS.systemView(this._makePageElm());
			return this._page.setup();
		};

		contents.prototype.showHelp = function() {
			this.disposePage();
			this._page = new root.MY_CLASS.helpView(this._makePageElm());
			return this._page.setup();
		};

		contents.prototype.showMovie = function() {
			this.disposePage();
			this._page = new root.MY_CLASS.movieView(this._makePageElm());
			return this._page.setup();
		};

		contents.prototype.disposePage = function() {
			if (this._page != null) {
				this._page.dispose();
				return this._page = null;
			}
		};

		contents.prototype._makePageElm = function() {
			if ($("#page").length > 0) {
				return $("#page");
			}
			$("body").append("<div id='page'></div>");
			return $("#page");
		};

		contents.prototype.shareSns = function(type) {
			var text, url;
			switch (type) {
				case this._conf.SNS_TW:
					text = this._conf.RESULT_SHARE_TEXT_TW.replace("<url>", this._conf.THIS_SITE);
					text = text.replace("<point>", root.MY.gl.game.point());
					url = this._conf.RESULT_SHARE_TW.replace("<text>", encodeURIComponent(text));
					return window.open(url, "");
				case this._conf.SNS_FB:
					text = this._conf.RESULT_SHARE_TEXT_FB.replace("<point>", root.MY.gl.game.point());
					//return window.FB.ui({
					//	method: 'feed',
					//	link: this._conf.THIS_SITE,
					//	caption: text
					//}, (function(_this) {
					//	return function(e) {};
					//})(this));
				case this._conf.SNS_LINE:
					text = this._conf.RESULT_SHARE_TEXT_LINE.replace("<url>", this._conf.THIS_SITE);
					text = text.replace("<point>", root.MY.gl.game.point());
					url = this._conf.RESULT_SHARE_LINE.replace("<text>", encodeURIComponent(text));
					return window.open(url, "");
			}
		};

		contents.prototype.shareSite = function(type) {
			var text, url;
			switch (type) {
				case this._conf.SNS_TW:
					text = this._conf.SITE_SHARE_TEXT_TW.replace("<url>", this._conf.THIS_SITE);
					url = this._conf.SITE_SHARE_TW.replace("<text>", encodeURIComponent(text));
					break;
				case this._conf.SNS_FB:
					url = this._conf.SITE_SHARE_FB.replace("<url>", this._conf.THIS_SITE);
			}
			return window.open(url, "");
		};

		return contents;

	}