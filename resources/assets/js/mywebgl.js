	var root,
		bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
		extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
		hasProp = {}.hasOwnProperty,
		slice = [].slice;

	if (typeof root === "undefined" || root === null) {
		root = window;
		root.MY = {};
		root.MY_CLASS = {};
	}

	window.root = root;
	window.bind = bind;
	window.extend = extend;
	window.hasProp = hasProp;
	window.slice = slice;

	root.MY_CLASS.clearTextView = require('./about/my_class/clear_text_view')(root._LIBS.display);

	root.MY_CLASS.main = require('./about/my_class/main')();	

	root.MY_CLASS.myObject3D = require('./about/my_class/my_object3d')();

	root.MY_CLASS.myView = require('./about/my_class/my_view')();

	root.MY_CLASS.pageView = require('./about/my_class/page_view')(root._LIBS.displayContainer);	

	root.MY_CLASS.resultUiView = require('./about/my_class/result_ui_view')(root._LIBS.display);	

	root.MY_CLASS.circle2d = require('./about/my_class/circle2d')(root._LIBS.display);	

	root.MY_CLASS.dot2d = require('./about/my_class/dot2d')(root._LIBS.display);	

	root.MY_CLASS.imgBtn2d = require('./about/my_class/img_btn2d')(root._LIBS.display);	

	root.MY_CLASS.onpu2d = require('./about/my_class/onpu2d')(root._LIBS.display);	

	root.MY_CLASS.rect2d = require('./about/my_class/rect2d')(root._LIBS.display);	

	root.MY_CLASS.startBtn = require('./about/my_class/start_btn')(root._LIBS.display);	

	root.MY_CLASS.bgView = require('./about/my_class/bg_view')(root._LIBS.displayContainer);	

	root.MY_CLASS.footerView = require('./about/my_class/footer_view')(root._LIBS.displayContainer);	

	root.MY_CLASS.gameOverView = require('./about/my_class/game_over_view')(root._LIBS.display);	

	root.MY_CLASS.gameUiView = require('./about/my_class/game_ui_view')(root._LIBS.displayContainer);	

	root.MY_CLASS.helpView = require('./about/my_class/help_view')(root.MY_CLASS.pageView);	

	root.MY_CLASS.lifeTriangle = require('./about/my_class/life_triangle')(root._LIBS.display);	

	root.MY_CLASS.lifeUiView = require('./about/my_class/life_ui_view')(root._LIBS.display);	

	root.MY_CLASS.loadingView = require('./about/my_class/loading_view')(root._LIBS.displayContainer);	

	root.MY_CLASS.movieView = require('./about/my_class/movie_view')(root._LIBS.displayContainer);

	root.MY_CLASS.musicTitleView = require('./about/my_class/music_title_view')(root._LIBS.display);	

	root.MY_CLASS.numView = require('./about/my_class/num_view')(root._LIBS.display);	

	root.MY_CLASS.pcResultUiView = require('./about/my_class/pc_result_ui_view')(root.MY_CLASS.resultUiView);	

	root.MY_CLASS.pointUiView = require('./about/my_class/point_ui_view')(root._LIBS.display);	

	root.MY_CLASS.recordView = require('./about/my_class/record_view')(root._LIBS.displayContainer);	

	root.MY_CLASS.restartView = require('./about/my_class/restart_view')(root._LIBS.displayContainer);	

	root.MY_CLASS.smtResultUiView = require('./about/my_class/smt_result_ui_view')(root.MY_CLASS.resultUiView);	

	root.MY_CLASS.sorryView = require('./about/my_class/sorry_view')(root._LIBS.displayContainer);	

	root.MY_CLASS.stgIntervalClearView = require('./about/my_class/stg_interval_clear_view')(root.MY_CLASS.clearTextView);	

	root.MY_CLASS.stgIntervalNextView = require('./about/my_class/stg_interval_next_view')(root.MY_CLASS.clearTextView);	

	root.MY_CLASS.stgIntervalTitleView = require('./about/my_class/stg_interval_title_view')(root.MY_CLASS.clearTextView);	

	root.MY_CLASS.stgIntervalView = require('./about/my_class/stg_interval_view')(root._LIBS.display);	

	root.MY_CLASS.systemView = require('./about/my_class/system_view')(root.MY_CLASS.pageView);	

	root.MY_CLASS.topTitleView = require('./about/my_class/top_title_view')(root._LIBS.display);

	root.MY_CLASS.topUiView = require('./about/my_class/top_ui_view')(root._LIBS.displayContainer);		

	root.MY_CLASS.uiMouse = require('./about/my_class/ui_mouse.js')(root._LIBS.display);	

	root.MY_CLASS.animationChara = require('./about/my_class/animation_chara')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.comboMax = require('./about/my_class/combo_max')(root.MY_CLASS.myObject3D);

	root.MY_CLASS.doors = require('./about/my_class/doors')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.drawingLine = require('./about/my_class/drawing_line')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.fusha = require('./about/my_class/fusha')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.ground = require('./about/my_class/ground')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.hit = require('./about/my_class/hit')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.item = require('./about/my_class/item')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.kujira = require('./about/my_class/kujira')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.line = require('./about/my_class/line')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.prtclCombo = require('./about/my_class/prtcl_combo')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.prtclLine = require('./about/my_class/prtcl_line')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.ring = require('./about/my_class/ring')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.road = require('./about/my_class/road')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.sea = require('./about/my_class/sea')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.sky = require('./about/my_class/sky')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.stgparts = require('./about/my_class/stgparts')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.topGround = require('./about/my_class/top_ground')(root.MY_CLASS.myObject3D);	

	root.MY_CLASS.topBgView = require('./about/my_class/top_bg_view')(root.MY_CLASS.myView);

	root.MY_CLASS.topView = require('./about/my_class/top_view')(root.MY_CLASS.myView);		

	root.MY_CLASS.checkRoad = require('./about/my_class/check_road')();		

	root.MY_CLASS.checkerMain = require('./about/my_class/checker_main')();	

	root.MY_CLASS.conf = require('./about/my_class/conf')();	

	root.MY_CLASS.contents = require('./about/my_class/contents')();

	root.MY_CLASS.audioMgr = require('./about/my_class/audio_mgr')();		

	root.MY_CLASS.audioSwfMgr = require('./about/my_class/audio_swf_mgr')();	

	root.MY_CLASS.data = require('./about/my_class/data')();	

	root.MY_CLASS.delayCall = require('./about/my_class/delay_call')();	

	root.MY_CLASS.game = require('./about/my_class/game')();	

	root.MY_CLASS.gameLevel = require('./about/my_class/game_level')();	

	root.MY_CLASS.interaction = require('./about/my_class/interaction')();	

	root.MY_CLASS.mouse = require('./about/my_class/mouse')();	

	root.MY_CLASS.multiColladaLoader = require('./about/my_class/multi_collada_loader')();	

	root.MY_CLASS.multiObjLoader = require('./about/my_class/multi_obj_loader')();	

	root.MY_CLASS.parameter = require('./about/my_class/parameter')();	

	root.MY_CLASS.showItemMgr = require('./about/my_class/show_item_mgr')();	

	root.MY_CLASS.webglMain = require('./about/my_class/webgl_main')();	


	$(window).ready((function(_this) {
		return function() {
			root.MY.app = new root.MY_CLASS.main();
			return root.MY.app.start();
		};
	})(this));	