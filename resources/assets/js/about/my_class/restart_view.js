export default function(superClass) {
		extend(restartView, superClass);

		function restartView(elm) {
			this.resize = bind(this.resize, this);
			this.update = bind(this.update, this);
			this.dispose2 = bind(this.dispose2, this);
			this.addStage = bind(this.addStage, this);
			restartView.__super__.constructor.call(this, elm, {
				resize: true,
				update: false
			});
			this._restartImg;
			this._bg;
		}

		restartView.prototype.addStage = function() {
			// 设置z-indexx
			this.zIndex(9999);
			// 增加背景
			// this._bg = new root._LIBS.display();
			// this.addChild(this._bg);
			// this._bg.bgColor("#000000");
			// this._bg.alpha(0.75);
			// 增加中间文字
			// this._restartImg = new root._LIBS.displayImage(root.MY.app.conf.PATH_IMG.PARTS + "restart_txt.png", root.MY.app.conf.IMG_RETINA);
			// this._restartImg.onLoad = this.resize;
			// this.addChild(this._restartImg);
			// 持续检查页面是否失去焦点
			// setInterval(this.update, 200);
			return this.visible(false);
		};

		restartView.prototype.dispose2 = function() {};

		restartView.prototype.update = function() {
			// if (document.hasFocus()) {
			// 	return this.visible(false);
			// } else {
			// 	return this.visible(true);
			// }
		};

		restartView.prototype.resize = function(w, h) {
			// this._bg.size(w, h);
			// if (this._restartImg != null) {
			// 	return this._restartImg.xy(~~(w * 0.5 - this._restartImg.width() * 0.5), ~~(h * 0.5 - this._restartImg.height() * 0.5));
			// }
		};

		return restartView;

	}