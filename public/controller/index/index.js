var tl = new TimelineLite();
var theater = new TheaterJS();

function ready() {
	var testDom = document.querySelector('.test');
	var box = document.querySelectorAll('.box');
	var $log = document.querySelector("#log");

	tl.from(testDom, 3, {
		opacity: 0,
		scale: 0,
		ease: Bounce.easeOut
	});


	tl.staggerFrom(box, 1, {
		opacity: 0,
		y: 200,
		rotation: 360,
		delay: 0.5
	}, 0.2);

	tl.to([testDom, box], 3, {
		opacity: 0,
		delay: 2,
		onComplete: complete
	});

	function complete() {
		console.log('all done');
	}

	$("#play").click(function() {
		tl.play();
	});

	$("#pause").click(function() {
		tl.pause();
	});

	$("#reverse").click(function() {
		tl.reverse();
	});

	$("#resume").click(function() {
		tl.resume();
	});

	$("#restart").click(function() {
		tl.restart();
	});

	// First, describe actors by passing a name,
	// an experience and finally a selector string.
	theater
		.describe("Vader", { speed: .8, accuracy: .6, invincibility: 4 }, "#vader")
		.describe("Luke", .6, "#luke");

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
	theater

		// "Vader:Luke" adds 2 scenes:
		// 1 - Update current actor.
		// 2 - Add a "say" scene with the speech (Luke in this example).
		.write("Vader:Luke.")

		// When passing a positive int to the write method,
		// it adds a "wait" scene.
		// A break lasting for the amout of the passed argument (ms).
		.write(400)

		// A function is added as a "call" scene.
		// It simply call the passed function by setting
		// the context to the TheaterJS instance.
		// In this case, the toggleClass is simply toggling body's class.
		// Luke has a white background while Vader has a darker one.
		.write(toggleClass)

		.write("Luke:What?", toggleClass)
		.write("Vader:I am your father.", toggleClass)

		// Previous arguments are just shorthands that build the proper scene object.
		// However, you can pass a scene object with more complex args.
		.write({ name: "call", args: [kill, true] })

		.write("Luke:Nooo...")

		// A negative int creates an "erase" scene that removes x characters.
		.write(-3)

		.write("!!! ", 400, "No! ", 400)
		.write("Luke:That's not true!", 400)
		.write("Luke:That's impossible!", toggleClass)
		.write("Vader:Search your feelings.", 1600)
		.write("Vader:You know it to be true.", 1000, toggleClass)

		// Passing the actor's name in the string update the current actor.
		// It also erase the previous speech to show the new one.
		// If you want to append a value rather than replacing it, simply omit the actor's name.
		// e.g.: theater.write("Luke:Noooooooo! ", "No!");
		.write("Luke:Noooooooo! ", 400, "No!", toggleClass)
		.write("Vader:Luke.", 800)
		.write("Vader:You can destroy the Emperor.", 1600)
		.write("Vader:He has foreseen this. ", 800)
		.write("Vader:It is your destiny.", 1600)
		.write("Vader:Join me.", 800)
		.write("Vader:Together we can rule the galaxy.", 800)
		.write("Vader:As father and son.", 1600)
		.write("Vader:Come with me. ", 800)
		.write("Vader:It is the only way.", 2000)

		// This last statement makes the scenario loop.
		// The true argument means "restart from scratch".
		.write(function () { theater.play(true); });

	// Code below is used for the purpose of the demo.
		var body = document.getElementsByTagName("BODY")[0];

		function toggleClass (className) {
			if (typeof className !== "string") className = "light";

			if (theater.utils.hasClass(body, className)) theater.utils.removeClass(body, className);
			else theater.utils.addClass(body, className);
		}

		function kill () {
			var self    = this,
				delay   = 300,
				i       = 0,
				timeout = setTimeout(function blink () {
					toggleClass("blood");
					if (++i < 6) timeout = setTimeout(blink, delay);
					else self.next();
				}, delay);

			return self;
		}
}

(function(document) {

	// Grab a reference to our auto-binding template
	// and give it some initial binding values
	// Learn more about auto-binding templates at http://goo.gl/Dx1u2g
	var app = document.querySelector('#app');

	app.changeAnimation = function(e) {
		var immediateValue = e.target.immediateValue;
		tl.pause();
		tl.progress(immediateValue / 100);
	};

	// Listen for template bound event to know when bindings
	// have resolved and content has been stamped to the page
	app.addEventListener('dom-change', function() {
		ready();
	});

	// See https://github.com/Polymer/polymer/issues/1381
	window.addEventListener('WebComponentsReady', function() {
		// imports are loaded and elements have been registered
	});

})(document);

