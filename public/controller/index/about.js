var tl = new TimelineLite();
var theater = new TheaterJS();

function ready(app) {
	var $log = document.querySelector("#log");
	var pageContent = document.querySelector('#page-content');

	// First, describe actors by passing a name,
	// an experience and finally a selector string.
	theater
		.describe("Me", { speed: .8, accuracy: .6, invincibility: 4 }, "#me")

	// TheaterJS has a built-in event handler.
	// Here we use it to for 2 things:
	// 1 - Listen to all events (*) and log the code running (scenes).
	// 2 - Add a caret to the proper element when adequate.
	theater
		.on("*", function (eventName, originalEvent, sceneName, arg) {
			var args  = Array.prototype.splice.apply(arguments, [3]),
				log   = '{\n      name: "' + sceneName + '"';

			log += ",\n      args: " + JSON.stringify(args).split(",").join(", ");
			log += "\n    }";

			$log.innerHTML = log;
		})
		.on("say:start, erase:start", function (eventName) {
			// this refer to the TheaterJS instance.
			var self    = this,

			// The current actor is referenced as this.current
			// Its voice is the third element passed to the describe method.
			// It could be of two types: a DOM element or a function.
				current = self.current.voice;

			// TheaterJS has some useful methods such as
			// addClass, hasClass, removeClass, ...
			// Note: the "saying" class adds the blinking caret.
			self.utils.addClass(current, "saying");
		})
		.on("say:end, erase:end", function (eventName) {
			var self    = this,
				current = self.current.voice;

			// When say or erase ends, remove the caret.
			self.utils.removeClass(current, "saying");
		});

// The write method adds scenes to the theater's scenario.
// It accepts an indefinite number of parameters and is chainable.
// theater.write("I:Hello", 400).write("You:Wassup?", 400);
// Is the same as:
// theater.write("I:Hello", 400, "Your:Wassup?", 400);
//	theater
//
//		// "Me:Luke" adds 2 scenes:
//		// 1 - Update current actor.
//		// 2 - Add a "say" scene with the speech (Luke in this example).
//		.write("Me:大家好 我叫凌柏超.")
//
//		// 等待600毫秒
//		.write(600)
//
//		.write('Me:我是扬州人')
//
//		// 召唤地图
//		.write({ name: "call", args: [showMap, false] })
//
//		// 等待600毫秒
//		.write(600)
//
//		.write("Me: 我们开始新的单元吧")
//
//		.write({name: 'call', args: [nextPage, true]});

	// Code below is used for the purpose of the demo.
	function showMap() {
		console.log('我就是地图');
		// 百度地图API功能
		var map = new BMap.Map("allmap");    // 创建Map实例
		map.centerAndZoom("扬州", 9);  // 初始化地图,设置中心点坐标和地图级别
		map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	}

	app.currentIndex = 0;

	function nextPage() {
		app.currentIndex++;
		pageContent.go(app.currentIndex);
	}

	nextPage();
}

(function(document) {

	// Grab a reference to our auto-binding template
	// and give it some initial binding values
	// Learn more about auto-binding templates at http://goo.gl/Dx1u2g
	var app = document.querySelector('#app');

	// Listen for template bound event to know when bindings
	// have resolved and content has been stamped to the page
	app.addEventListener('dom-change', function() {
		ready(app);
	});

	// See https://github.com/Polymer/polymer/issues/1381
	window.addEventListener('WebComponentsReady', function() {
		// imports are loaded and elements have been registered
	});

})(document);

