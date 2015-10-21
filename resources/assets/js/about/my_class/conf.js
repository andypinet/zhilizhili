export default function() {
		function conf() {

			/*   銉儶銉笺偣 */
			var key, ref, val;
			this.RELEASE = true;

			/*   鍏ㄤ綋 */
			this.TEST = {
				DEBUGTOOL: false,
				STATS: false
			};
			if (this.RELEASE) {
				ref = this.TEST;
				for (key in ref) {
					val = ref[key];
					this.TEST[key] = false;
				}
			}
			this.IMG_RETINA = root.MY.myfw.conf.IS_SMT;
			this.IS_CAP = !this.RELEASE && location.hash.replace("#", "") === "cap";
			this.FB_APP_ID = "1622947397934923";

			/*   姗熻兘绯� */
			this.SOUND_SWF = root.MY.myfw.conf.IS_IE;
			this.SOUND_SWF_ID = "soundSwf";

			/*   璀樺垾ID */
			this.SNS_TW = 0;
			this.SNS_FB = 1;
			this.SNS_LINE = 2;

			/*   銉曘偂銈ゃ儷 */
			this.PATH_IMG = {
				TEX: "./assets/img/tex/",
				LOADING: "./assets/img/loading/",
				TOP: "./assets/img/top/",
				FOOTER: "./assets/img/footer/",
				NUM: "./assets/img/parts/num/",
				PARTS: "./assets/img/parts/",
				GAMEUI: "./assets/img/gameUi/",
				CLEAR: "./assets/img/clear/",
				RESULT_PC: "./assets/img/result/pc/",
				RESULT_SMT: "./assets/img/result/smt/",
				SYSTEM: "./assets/img/system/",
				HELP: "./assets/img/help/",
				SORRY: "./assets/img/sorry/"
			};
			this.PATH_JSON = {
				PARAM: "./assets/json/param/"
			};
			this.PATH_SOUND = {
				BGM: "./assets/sound/"
			};
			this.PATH_OBJ = {
				STAGE: "./assets/obj/stage/",
				ONPU: "./assets/obj/onpu/",
				SKY: "./assets/obj/sora/",
				PARTS: "./assets/obj/parts/"
			};
			this.FILE_SOUND = "./assets/swf/sound.swf";
			this.FILE_SWFINSTALL = "./assets/swf/expressInstall.swf";
			this.FILE_STAGE_BGM = [this.PATH_SOUND.BGM + "0.mp3", this.PATH_SOUND.BGM + "1.mp3", this.PATH_SOUND.BGM + "2.mp3", this.PATH_SOUND.BGM + "3.mp3", this.PATH_SOUND.BGM + "4.mp3", this.PATH_SOUND.BGM + "5.mp3", this.PATH_SOUND.BGM + "6.mp3"];
			this.FILE_SKY_OBJ = this.PATH_OBJ.SKY + "sora_base_0413.obj";
			this.FILE_ITEM_OBJ = [this.PATH_OBJ.ONPU + "onpu_1.obj", this.PATH_OBJ.ONPU + "onpu_2.obj", this.PATH_OBJ.ONPU + "onpu_3.obj"];
			this.FILE_STAGE_TEX = [this.PATH_IMG.TEX + "stage/stage01.jpg", this.PATH_IMG.TEX + "stage/stage02.jpg", this.PATH_IMG.TEX + "stage/stage03.jpg", this.PATH_IMG.TEX + "stage/stage04.jpg", this.PATH_IMG.TEX + "stage/stage05.jpg", this.PATH_IMG.TEX + "stage/stage06.jpg", this.PATH_IMG.TEX + "stage/stage07.jpg"];
			this.FILE_STAGE_OBJ = [this.PATH_OBJ.STAGE + "stage01_01.obj", this.PATH_OBJ.STAGE + "stage02_01.obj", this.PATH_OBJ.STAGE + "stage03_01.obj", this.PATH_OBJ.STAGE + "stage04_01.obj", this.PATH_OBJ.STAGE + "stage05_01.obj", this.PATH_OBJ.STAGE + "stage06_01.obj", this.PATH_OBJ.STAGE + "stage07_01.obj"];
			this.FILE_STAGR5_A_OBJ = this.PATH_OBJ.STAGE + "stage05_01_A.obj";
			this.FILE_STAGE_LOADING_OBJ = [this.PATH_OBJ.STAGE + "stage01_00.obj", this.PATH_OBJ.STAGE + "stage02_00.obj", this.PATH_OBJ.STAGE + "stage03_00.obj", this.PATH_OBJ.STAGE + "stage04_00.obj", this.PATH_OBJ.STAGE + "stage05_00.obj", this.PATH_OBJ.STAGE + "stage06_00.obj", this.PATH_OBJ.STAGE + "stage07_00.obj"];
			this.FILE_CLOUD_OBJ = [this.PATH_OBJ.PARTS + "cloud.obj", this.PATH_OBJ.PARTS + "stage02_cloud_0413.obj", this.PATH_OBJ.PARTS + "stage03_cloud_0414.obj", this.PATH_OBJ.PARTS + "stage04_cloud.obj", this.PATH_OBJ.PARTS + "stage05_cloud_0409.obj", this.PATH_OBJ.PARTS + "stage01_cloud_0413.obj"];
			this.FILE_BOAT_OBJ = [this.PATH_OBJ.PARTS + "stage05_fune.obj", this.PATH_OBJ.PARTS + "stage5_animal_fune_0413.obj"];
			this.FILE_KUJIRA_OBJ = [this.PATH_OBJ.PARTS + "stage06_kujira_kari_1piki_0413.obj"];
			this.FILE_SEA_OBJ = [this.PATH_OBJ.PARTS + "stage06_BG_0410.obj"];
			this.FILE_SEADOWN_OBJ = [this.PATH_OBJ.PARTS + "stage06_iwa_only.obj"];
			this.FILE_CASTLE_OBJ = [this.PATH_OBJ.PARTS + "stage07_shiro_tori.obj", this.PATH_OBJ.PARTS + "stage07_tobira_L.obj", this.PATH_OBJ.PARTS + "stage07_tobira_R.obj"];
			this.FILE_FUSYA_OBJ = [this.PATH_OBJ.PARTS + "stage01_fusha.obj"];
			this.FILE_ITEM_TEX = this.PATH_IMG.TEX + "onpu/onpu.jpg";
			this.FILE_SKY_TEX = [this.PATH_IMG.TEX + "sora/sora_base_0413.jpg", this.PATH_IMG.TEX + "sora/sora1.jpg", this.PATH_IMG.TEX + "sora/sora2.jpg", this.PATH_IMG.TEX + "sora/sora3.jpg", this.PATH_IMG.TEX + "sora/sora4.jpg", this.PATH_IMG.TEX + "sora/sora5.jpg", this.PATH_IMG.TEX + "sora/sora6.jpg"];
			this.FILE_CLOUD_TEX = [this.PATH_IMG.TEX + "parts/cloud_01.jpg"];
			this.FILE_BOAT_TEX = [this.PATH_IMG.TEX + "parts/05_boat.jpg"];
			this.FILE_KUJIRA_TEX = [this.PATH_IMG.TEX + "parts/Whale_texture2.jpg"];
			this.FILE_SEA_TEX = [this.PATH_IMG.TEX + "parts/stage06_sea_color.jpg"];
			this.FILE_CASTLE_TEX = [this.PATH_IMG.TEX + "parts/castle3.jpg"];
			this.FILE_FIX_PARAM = this.PATH_JSON.PARAM + "fix.json";
			this.BLEND = ["ZeroFactor", "OneFactor", "SrcAlphaFactor", "OneMinusSrcAlphaFactor", "DstAlphaFactor", "OneMinusDstAlphaFactor", "DstColorFactor", "OneMinusDstColorFactor", "SrcAlphaSaturateFactor"];

			/*   URL */
			this.THIS_SITE = "http://room-ayaka.jp/rainbowroad/special03/";
			this.LINK_SP_SITE = "http://room-ayaka.jp/rainbowroad/";
			this.TAG_SP_MOVIE = '<iframe width="<width>" height="<height>" src="https://www.youtube.com/embed/tm9QCO5ISRY?rel=0" frameborder="0" allowfullscreen></iframe>';
			this.SITE_SHARE_TW = "https://twitter.com/intent/tweet?text=<text>";
			this.SITE_SHARE_FB = "https://www.facebook.com/sharer/sharer.php?u=<url>";
			this.SITE_SHARE_TEXT_TW = "绲㈤ New Album銆屻儸銈ゃ兂銉溿兗銉兗銉夈€峉pecial Contents <url>";
			this.RESULT_SHARE_TW = this.SITE_SHARE_TW;
			this.RESULT_SHARE_LINE = "http://line.me/R/msg/text/?<text>";
			this.RESULT_SHARE_TEXT_TW = "Record <point>AYAKm #ayaka_rainbowroad 绲㈤ New Album銆屻儸銈ゃ兂銉溿兗銉兗銉夈€峉pecial Contents <url>";
			this.RESULT_SHARE_TEXT_FB = "Record <point>AYAKm #ayaka_rainbowroad 绲㈤ New Album銆屻儸銈ゃ兂銉溿兗銉兗銉夈€峉pecial Contents";
			this.RESULT_SHARE_TEXT_LINE = "Record <point>AYAKm 绲㈤ New Album銆屻儸銈ゃ兂銉溿兗銉兗銉夈€峉pecial Contents <url>";

			/*  銈层兗銉犺ō瀹� */
			this.LOADING_RATE = [0.6, 0.2, 0.1, 0.1];
			this.STAGE_ORDER = [0, 1, 2, 3, 4, 5, 6];
			this.BG_COLOR = [0xffffff, 0x2dbae5];
			this.START_BTN_COLOR = [0xf599a0, 0xf39800, 0xfff100, 0x90c31f, 0x1d2088, 0x920783, 0xe4007f];
			this.STG5_OFFSET_Y = 400;
			this.STG_INTERVAL = 60 * 2;
			this.LOOP_AREA_SPEED = [0.001, 0.001, 0.001, 0.001, 0.0008, 0.001, 0.0008];
			this.GAME_END_OFFSET = [500, 500, 500, 500, 1700, 4000, 3000];
			this.SHOW_ITEM_Z = [[1100, 1100], [1100, 1100], [1100, 1100], [1100, 1100], [1100, 1100], [1100, 1100], [1300, 1300]];
			this.GAME_START_LOAD_AT = [0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02];
			this.LOOP_STAGE_NUM = [8, 9, 9, 9, 6, 5, 5];
			this.ROAD_POINT = [
				[
					{
						x: 0,
						y: 0,
						z: 0
					}, {
					x: 0,
					y: 0,
					z: -450
				}, {
					x: 0,
					y: 0,
					z: -900
				}, {
					x: 0,
					y: 0,
					z: -1350
				}, {
					x: 0,
					y: 10,
					z: -1800
				}, {
					x: 0,
					y: -10,
					z: -2250
				}, {
					x: 0,
					y: 20,
					z: -2700
				}, {
					x: 0,
					y: -10,
					z: -3150
				}, {
					x: 0,
					y: 0,
					z: -3600
				}, {
					x: 0,
					y: 0,
					z: -4050
				}, {
					x: 0,
					y: 0,
					z: -4500
				}, {
					x: 0,
					y: 0,
					z: -4950
				}, {
					x: 0,
					y: 0,
					z: -5400
				}, {
					x: 0,
					y: 0,
					z: -5850
				}, {
					x: 30,
					y: 0,
					z: -6300
				}, {
					x: -4,
					y: 0,
					z: -6650
				}, {
					x: 400,
					y: 0,
					z: -6900
				}, {
					x: 400,
					y: 0,
					z: -7387
				}, {
					x: 400,
					y: 0,
					z: -8721
				}, {
					x: 400,
					y: 0,
					z: -9722
				}
				], [
					{
						x: 400,
						y: 0,
						z: 0
					}, {
						x: 400,
						y: 0,
						z: -450
					}, {
						x: 400,
						y: 0,
						z: -900
					}, {
						x: 400,
						y: 0,
						z: -1350
					}, {
						x: 400,
						y: 0,
						z: -1800
					}, {
						x: 400,
						y: 0,
						z: -2250
					}, {
						x: 400,
						y: 0,
						z: -2700
					}, {
						x: 400,
						y: 20,
						z: -3150
					}, {
						x: 400,
						y: -20,
						z: -3600
					}, {
						x: 400,
						y: 10,
						z: -4050
					}, {
						x: 400,
						y: 0,
						z: -4500
					}, {
						x: 400,
						y: 0,
						z: -4950
					}, {
						x: 400,
						y: -10,
						z: -5400
					}, {
						x: 400,
						y: 20,
						z: -5850
					}, {
						x: 400,
						y: 0,
						z: -6300
					}, {
						x: 400,
						y: 0,
						z: -6750
					}, {
						x: 400,
						y: 0,
						z: -7200
					}, {
						x: 400,
						y: 0,
						z: -7650
					}, {
						x: 400,
						y: 0,
						z: -8100
					}, {
						x: 400,
						y: 0,
						z: -8550
					}, {
						x: 400,
						y: 0,
						z: -9000
					}, {
						x: 390,
						y: 0,
						z: -9450
					}, {
						x: 421,
						y: 0,
						z: -9900
					}, {
						x: -50,
						y: 0,
						z: -10350
					}, {
						x: 25,
						y: 0,
						z: -10800
					}, {
						x: 0,
						y: 0,
						z: -11250
					}, {
						x: 0,
						y: 0,
						z: -11700
					}, {
						x: 0,
						y: 0,
						z: -12150
					}, {
						x: 0,
						y: 0,
						z: -12600
					}, {
						x: 0,
						y: 0,
						z: -13050
					}, {
						x: 0,
						y: 0,
						z: -13500
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -850
					}, {
						x: 0,
						y: 0,
						z: -1700
					}, {
						x: 0,
						y: 40,
						z: -2550
					}, {
						x: 0,
						y: -20,
						z: -3400
					}, {
						x: 0,
						y: 20,
						z: -4250
					}, {
						x: 0,
						y: -10,
						z: -5100
					}, {
						x: 0,
						y: 20,
						z: -5950
					}, {
						x: 0,
						y: 0,
						z: -6800
					}, {
						x: 0,
						y: 0,
						z: -7650
					}, {
						x: -190,
						y: 0,
						z: -8500
					}, {
						x: -190,
						y: 0,
						z: -9350
					}, {
						x: -190,
						y: 0,
						z: -10200
					}, {
						x: -190,
						y: 0,
						z: -11050
					}, {
						x: -190,
						y: 0,
						z: -11900
					}, {
						x: -190,
						y: 0,
						z: -12750
					}, {
						x: 0,
						y: 0,
						z: -13600
					}, {
						x: -20,
						y: 0,
						z: -14450
					}, {
						x: 0,
						y: 0,
						z: -15300
					}, {
						x: 0,
						y: 0,
						z: -16150
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -380
					}, {
						x: 0,
						y: 0,
						z: -760
					}, {
						x: 0,
						y: 0,
						z: -1140
					}, {
						x: 0,
						y: 0,
						z: -1520
					}, {
						x: 0,
						y: 10,
						z: -1900
					}, {
						x: 0,
						y: 10,
						z: -2280
					}, {
						x: 0,
						y: 0,
						z: -2660
					}, {
						x: 0,
						y: 0,
						z: -3040
					}, {
						x: 0,
						y: -10,
						z: -3420
					}, {
						x: 0,
						y: -10,
						z: -3800
					}, {
						x: 0,
						y: 0,
						z: -4180
					}, {
						x: 0,
						y: 0,
						z: -4560
					}, {
						x: 0,
						y: 0,
						z: -4940
					}, {
						x: 10,
						y: 0,
						z: -5320
					}, {
						x: -20,
						y: 0,
						z: -5700
					}, {
						x: 0,
						y: 0,
						z: -6080
					}, {
						x: 0,
						y: 0,
						z: -6460
					}, {
						x: 0,
						y: 0,
						z: -6840
					}, {
						x: 0,
						y: 0,
						z: -7220
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -380
					}, {
						x: 0,
						y: 0,
						z: -760
					}, {
						x: -5,
						y: 0,
						z: -1140
					}, {
						x: 0,
						y: 0,
						z: -1520
					}, {
						x: 5,
						y: 0,
						z: -1900
					}, {
						x: 0,
						y: 0,
						z: -2280
					}, {
						x: 0,
						y: 10,
						z: -2660
					}, {
						x: 0,
						y: -10,
						z: -3040
					}, {
						x: 0,
						y: 10,
						z: -3420
					}, {
						x: 0,
						y: -10,
						z: -3800
					}, {
						x: 0,
						y: 0,
						z: -4180
					}, {
						x: 0,
						y: 0,
						z: -4560
					}, {
						x: 0,
						y: 0,
						z: -4940
					}, {
						x: 10,
						y: 0,
						z: -5320
					}, {
						x: -20,
						y: 0,
						z: -5700
					}, {
						x: 0,
						y: 0,
						z: -6080
					}, {
						x: 0,
						y: 0,
						z: -6460
					}, {
						x: 0,
						y: 0,
						z: -6840
					}, {
						x: 0,
						y: 0,
						z: -7220
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -380
					}, {
						x: 0,
						y: 0,
						z: -760
					}, {
						x: 0,
						y: -9,
						z: -1140
					}, {
						x: 0,
						y: 12,
						z: -1520
					}, {
						x: 0,
						y: 10,
						z: -1900
					}, {
						x: 0,
						y: 0,
						z: -2279
					}, {
						x: 0,
						y: 10,
						z: -2660
					}, {
						x: 0,
						y: -10,
						z: -3040
					}, {
						x: 0,
						y: 10,
						z: -3420
					}, {
						x: 0,
						y: -10,
						z: -3800
					}, {
						x: 0,
						y: 0,
						z: -4180
					}, {
						x: 0,
						y: 0,
						z: -4560
					}, {
						x: 20,
						y: 0,
						z: -4940
					}, {
						x: -22,
						y: 0,
						z: -5320
					}, {
						x: 0,
						y: 0,
						z: -5700
					}, {
						x: 0,
						y: 0,
						z: -6080
					}, {
						x: 0,
						y: 0,
						z: -6460
					}, {
						x: 0,
						y: 0,
						z: -6840
					}, {
						x: 0,
						y: 0,
						z: -7220
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -380
					}, {
						x: 0,
						y: 0,
						z: -760
					}, {
						x: -9,
						y: 0,
						z: -1140
					}, {
						x: -29,
						y: 0,
						z: -1520
					}, {
						x: 33,
						y: 0,
						z: -1900
					}, {
						x: -10,
						y: 0,
						z: -2280
					}, {
						x: 0,
						y: 0,
						z: -2660
					}, {
						x: 0,
						y: 0,
						z: -3040
					}, {
						x: 0,
						y: 0,
						z: -3420
					}, {
						x: 0,
						y: 5,
						z: -3800
					}, {
						x: 0,
						y: -48,
						z: -4180
					}, {
						x: 0,
						y: 10,
						z: -4560
					}, {
						x: 0,
						y: -8,
						z: -4982
					}, {
						x: 0,
						y: 0,
						z: -5320
					}, {
						x: 0,
						y: 0,
						z: -5700
					}, {
						x: 0,
						y: 0,
						z: -6080
					}, {
						x: 0,
						y: 0,
						z: -6460
					}, {
						x: 0,
						y: 0,
						z: -6840
					}, {
						x: 0,
						y: 0,
						z: -7220
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -380
					}, {
						x: 0,
						y: 0,
						z: -760
					}, {
						x: 0,
						y: 40,
						z: -1140
					}, {
						x: 0,
						y: -40,
						z: -1520
					}, {
						x: 0,
						y: 0,
						z: -1900
					}, {
						x: 40,
						y: 0,
						z: -2280
					}, {
						x: -32,
						y: 0,
						z: -2660
					}, {
						x: 15,
						y: 0,
						z: -3040
					}, {
						x: 0,
						y: 0,
						z: -3420
					}, {
						x: 0,
						y: 0,
						z: -3800
					}, {
						x: 0,
						y: 20,
						z: -4180
					}, {
						x: 0,
						y: -40,
						z: -4560
					}, {
						x: 0,
						y: 20,
						z: -4940
					}, {
						x: 0,
						y: -20,
						z: -5320
					}, {
						x: 0,
						y: 0,
						z: -5700
					}, {
						x: 0,
						y: 0,
						z: -6080
					}, {
						x: 0,
						y: 0,
						z: -6460
					}, {
						x: 0,
						y: 0,
						z: -6840
					}, {
						x: 0,
						y: 0,
						z: -7220
					}
				], [
					{
						x: 0,
						y: 0,
						z: 0
					}, {
						x: 0,
						y: 0,
						z: -380
					}, {
						x: 0,
						y: 0,
						z: -760
					}, {
						x: 0,
						y: 0,
						z: -1140
					}, {
						x: 0,
						y: -5,
						z: -1520
					}, {
						x: 0,
						y: 40,
						z: -1900
					}, {
						x: 0,
						y: -30,
						z: -2280
					}, {
						x: 0,
						y: 30,
						z: -2660
					}, {
						x: 0,
						y: -10,
						z: -3040
					}, {
						x: 0,
						y: 16,
						z: -3420
					}, {
						x: 0,
						y: 0,
						z: -3800
					}, {
						x: 0,
						y: 0,
						z: -4180
					}, {
						x: 0,
						y: 20,
						z: -4560
					}, {
						x: 0,
						y: -20,
						z: -4940
					}, {
						x: 0,
						y: 25,
						z: -5320
					}, {
						x: 0,
						y: -20,
						z: -5700
					}, {
						x: 0,
						y: 0,
						z: -6080
					}, {
						x: 0,
						y: 0,
						z: -6460
					}, {
						x: 0,
						y: 0,
						z: -6840
					}, {
						x: 0,
						y: 0,
						z: -7220
					}
				]
			];
			this.GAME_SPEED = [320, 370, 380, 300, 375, 400, 150];
			this.ROAD_SPLINE_POINT_NUM = [90, 90, 90, 90, 90, 90, 200];
			this.ROAD_SPLINE_POINT = [
				[
					{
						x: 0,
						y: 8
					}, {
					x: 0,
					y: -8
				}, {
					x: 0,
					y: 0
				}, {
					x: -10,
					y: 0
				}, {
					x: 20,
					y: 0
				}, {
					x: -5,
					y: 0
				}, {
					x: 0,
					y: 10
				}, {
					x: 0,
					y: -10
				}, {
					x: 0,
					y: 5
				}
				], [
					{
						x: 0,
						y: -8
					}, {
						x: 0,
						y: 8
					}, {
						x: 0,
						y: 0
					}, {
						x: -20,
						y: 0
					}, {
						x: 20,
						y: 0
					}, {
						x: -10,
						y: 0
					}, {
						x: 0,
						y: -20
					}, {
						x: 0,
						y: 20
					}, {
						x: 0,
						y: 0
					}
				], [
					{
						x: 0,
						y: 0
					}, {
						x: 10,
						y: 0
					}, {
						x: -10,
						y: 0
					}, {
						x: 0,
						y: 0
					}, {
						x: 8,
						y: 0
					}, {
						x: -8,
						y: 0
					}, {
						x: 0,
						y: 0
					}, {
						x: 0,
						y: 0
					}, {
						x: 0,
						y: 0
					}
				]
			];
			this.ROAD_LOOP_POINT_NUM = [~~(this.ROAD_SPLINE_POINT_NUM[0] * 0.8), ~~(this.ROAD_SPLINE_POINT_NUM[1] * 0.8), ~~(this.ROAD_SPLINE_POINT_NUM[2] * 0.8), ~~(this.ROAD_SPLINE_POINT_NUM[3] * 0.8), ~~(this.ROAD_SPLINE_POINT_NUM[4] * 0.8), ~~(this.ROAD_SPLINE_POINT_NUM[5] * 0.8), ~~(this.ROAD_SPLINE_POINT_NUM[6] * 0.7)];
			this.MAX_AYAKM = 99999;
			this.FAV = 45;
			this.BASE_FLOOR = 15;
			this.LOOK_AT_ROAD = 30;
			this.STAGE_NUM = 7;
			this.BG_OPACITY = [0.15, 0.5];
			this.PRE_SET_LINE_NUM = 6;
			this.PRE_SET_ITEM_NUM = 17;
			this.ITEM_RANK_RATE = [0.5, 0.3, 0.2];
			this.PRE_SET_STGPARTS_NUM = [60, 30];
			this.PRE_SET_RING_NUM = 7;
			this.CLOUD_POS = {
				BASE_X: 0,
				BASE_Y: -20,
				RANEGE_X: 50,
				RANEGE_Y: 50
			};
			this.SOUND_VOL = {
				MIN: -1,
				MAX: -0.7
			};
			this.ITEM_GET_SE_VOL = -0.5;
			this.ITEM_COLOR = [0xe23392, 0x92ef00, 0xf4ea00];
			this.RAINBOW_COLOR = [0xf9c0c4, 0xf8bf61, 0xfff661, 0xbada74, 0x7375b5, 0xbb65b2, 0xee61b0];
			this.MUSIC_NAME = ["銇仒銇勩倣", "number one", "Have fun!!", "銇傘倞銇屻仺銇嗐伄杓�", "No end", "銉勩儴銈兂銇�", "beautiful"];
			this.MAX_COMBO = 7;
			this.LINE_WEIGHT_PC = 1;
			this.LINE_WEIGHT_SMT = 0.75;
			this.LINE_HIDE_INTERVAL = [40, 60];
			this.STG_SIDE_OFFSET_X = [35, 10, 10, 10, 10, 10, 10];
			this.STG_LOADING_OFFSET_Z = [35, 10, 10, 10, 10, 10, 10];
			this.CAMERA_FAR = [10000, 10000];
			this.SKY_SCALE = [2.2, 2.2];
			this.STG7_LOOP_OFFSET = {
				Y: 10
			};
			this.STG6_OFFSET_Y = -160;
			this.ROAD_ANALYZE_P = 0.000007;
			this.DIVE_LOOP_OFFSET_X = 0;
			this.STG7_OFFSET_Y = 0;
			this.LOOP_PT = {
				X: 0,
				Y: 0
			};
			this.GROUND_SCALE = 5;
			this.GROUND_OFFSET = {
				Y: -60,
				SCALE1: 0.98,
				SCALE2: 0.95
			};
			this.HINT_NUM = 1;
			this.TOP_MOVE_SPEED = 1;
			this.UI_LIFE_SIZE = {
				WIDTH: [580, 300],
				HEIGHT: [26, 21],
				TRI_WIDTH: [28, 14],
				TRI_HEIGHT: [22, 11]
			};
			this.NUM_SPRITE_JSON = '{"frames": {"a0.png":{	"frame": {"x":0,"y":0,"w":28,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":28,"h":24},	"sourceSize": {"w":28,"h":24}},"a1.png":{	"frame": {"x":28,"y":0,"w":6,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":6,"h":24},	"sourceSize": {"w":6,"h":24}},"a2.png":{	"frame": {"x":34,"y":0,"w":30,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":30,"h":24},	"sourceSize": {"w":30,"h":24}},"a3.png":{	"frame": {"x":64,"y":0,"w":30,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":30,"h":24},	"sourceSize": {"w":30,"h":24}},"a4.png":{	"frame": {"x":94,"y":0,"w":32,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":32,"h":24},	"sourceSize": {"w":32,"h":24}},"a5.png":{	"frame": {"x":126,"y":0,"w":32,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":32,"h":24},	"sourceSize": {"w":32,"h":24}},"a6.png":{	"frame": {"x":158,"y":0,"w":32,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":32,"h":24},	"sourceSize": {"w":32,"h":24}},"a7.png":{	"frame": {"x":190,"y":0,"w":30,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":30,"h":24},	"sourceSize": {"w":30,"h":24}},"a8.png":{	"frame": {"x":220,"y":0,"w":30,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":30,"h":24},	"sourceSize": {"w":30,"h":24}},"a9.png":{	"frame": {"x":250,"y":0,"w":30,"h":24},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":30,"h":24},	"sourceSize": {"w":30,"h":24}},"b0.png":{	"frame": {"x":280,"y":0,"w":56,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":56,"h":46},	"sourceSize": {"w":56,"h":46}},"b1.png":{	"frame": {"x":336,"y":0,"w":10,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":10,"h":46},	"sourceSize": {"w":10,"h":46}},"b2.png":{	"frame": {"x":346,"y":0,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"b3.png":{	"frame": {"x":406,"y":0,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"b4.png":{	"frame": {"x":0,"y":46,"w":62,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":62,"h":46},	"sourceSize": {"w":62,"h":46}},"b5.png":{	"frame": {"x":62,"y":46,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"b6.png":{	"frame": {"x":122,"y":46,"w":62,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":62,"h":46},	"sourceSize": {"w":62,"h":46}},"b7.png":{	"frame": {"x":184,"y":46,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"b8.png":{	"frame": {"x":244,"y":46,"w":58,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":58,"h":46},	"sourceSize": {"w":58,"h":46}},"b9.png":{	"frame": {"x":302,"y":46,"w":58,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":58,"h":46},	"sourceSize": {"w":58,"h":46}},"c0.png":{	"frame": {"x":360,"y":46,"w":56,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":56,"h":46},	"sourceSize": {"w":56,"h":46}},"c1.png":{	"frame": {"x":416,"y":46,"w":10,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":10,"h":46},	"sourceSize": {"w":10,"h":46}},"c2.png":{	"frame": {"x":426,"y":46,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"c3.png":{	"frame": {"x":0,"y":92,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"c4.png":{	"frame": {"x":60,"y":92,"w":62,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":62,"h":46},	"sourceSize": {"w":62,"h":46}},"c5.png":{	"frame": {"x":122,"y":92,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"c6.png":{	"frame": {"x":182,"y":92,"w":62,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":62,"h":46},	"sourceSize": {"w":62,"h":46}},"c7.png":{	"frame": {"x":244,"y":92,"w":60,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":60,"h":46},	"sourceSize": {"w":60,"h":46}},"c8.png":{	"frame": {"x":304,"y":92,"w":58,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":58,"h":46},	"sourceSize": {"w":58,"h":46}},"c9.png":{	"frame": {"x":362,"y":92,"w":58,"h":46},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":58,"h":46},	"sourceSize": {"w":58,"h":46}},"d0.png":{	"frame": {"x":420,"y":92,"w":66,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":66,"h":56},	"sourceSize": {"w":66,"h":56}},"d1.png":{	"frame": {"x":486,"y":92,"w":12,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":12,"h":56},	"sourceSize": {"w":12,"h":56}},"d2.png":{	"frame": {"x":0,"y":148,"w":70,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":56},	"sourceSize": {"w":70,"h":56}},"d3.png":{	"frame": {"x":70,"y":148,"w":70,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":56},	"sourceSize": {"w":70,"h":56}},"d4.png":{	"frame": {"x":140,"y":148,"w":74,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":74,"h":56},	"sourceSize": {"w":74,"h":56}},"d5.png":{	"frame": {"x":214,"y":148,"w":72,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":72,"h":56},	"sourceSize": {"w":72,"h":56}},"d6.png":{	"frame": {"x":286,"y":148,"w":72,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":72,"h":56},	"sourceSize": {"w":72,"h":56}},"d7.png":{	"frame": {"x":358,"y":148,"w":70,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":56},	"sourceSize": {"w":70,"h":56}},"d8.png":{	"frame": {"x":428,"y":148,"w":68,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":68,"h":56},	"sourceSize": {"w":68,"h":56}},"d9.png":{	"frame": {"x":0,"y":204,"w":68,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":68,"h":56},	"sourceSize": {"w":68,"h":56}},"e0.png":{	"frame": {"x":68,"y":204,"w":66,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":66,"h":56},	"sourceSize": {"w":66,"h":56}},"e1.png":{	"frame": {"x":134,"y":204,"w":12,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":12,"h":56},	"sourceSize": {"w":12,"h":56}},"e2.png":{	"frame": {"x":146,"y":204,"w":70,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":56},	"sourceSize": {"w":70,"h":56}},"e3.png":{	"frame": {"x":216,"y":204,"w":70,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":56},	"sourceSize": {"w":70,"h":56}},"e4.png":{	"frame": {"x":286,"y":204,"w":74,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":74,"h":56},	"sourceSize": {"w":74,"h":56}},"e5.png":{	"frame": {"x":360,"y":204,"w":72,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":72,"h":56},	"sourceSize": {"w":72,"h":56}},"e6.png":{	"frame": {"x":432,"y":204,"w":72,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":72,"h":56},	"sourceSize": {"w":72,"h":56}},"e7.png":{	"frame": {"x":0,"y":260,"w":70,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":70,"h":56},	"sourceSize": {"w":70,"h":56}},"e8.png":{	"frame": {"x":70,"y":260,"w":68,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":68,"h":56},	"sourceSize": {"w":68,"h":56}},"e9.png":{	"frame": {"x":138,"y":260,"w":68,"h":56},	"rotated": false,	"trimmed": false,	"spriteSourceSize": {"x":0,"y":0,"w":68,"h":56},	"sourceSize": {"w":68,"h":56}}},"meta": {	"app": "Adobe Flash Professional",	"version": "14.1.0.96",	"image": "sprite.png",	"format": "RGBA8888",	"size": {"w":512,"h":512},	"scale": "1"}}';
		}

		return conf;

	}