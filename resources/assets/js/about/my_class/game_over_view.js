export default function(superClass) {
		extend(gameOverView, superClass);

		function gameOverView() {
			this.hide = bind(this.hide, this);
			this.show = bind(this.show, this);
			this.resize = bind(this.resize, this);
			this.dispose2 = bind(this.dispose2, this);
			this._setParts = bind(this._setParts, this);
			this.addStage = bind(this.addStage, this);
			gameOverView.__super__.constructor.call(this, {
				resize: true
			});
			this._strImg;
			this._line;
		}

		gameOverView.prototype.addStage = function() {
			this._line = new root._LIBS.display();
			this.addChild(this._line);
			this._line.bgColor("#FFF");
			this._strImg = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.RESULT_SMT + "gameover.png", root.MY.app.conf.IMG_RETINA);
			this._strImg.onLoad = this._setParts;
			this.addChild(this._strImg);
			return this.visible(false);
		};

		gameOverView.prototype._setParts = function(w, h) {
			if (this._strImg != null) {
				this._strImg.xy(~~(w * 0.5 - this._strImg.width() * 0.5), 0);
				return this._line.y(this._strImg.height() - 2);
			}
		};

		gameOverView.prototype.dispose2 = function() {};

		gameOverView.prototype.resize = function(w, h) {
			this._line.size(w, 4 / 2);
			return this._setParts(w, h);
		};

		gameOverView.prototype.show = function() {
			return this.visible(true);
		};

		gameOverView.prototype.hide = function() {
			return this.visible(false);
		};

		return gameOverView;

	}