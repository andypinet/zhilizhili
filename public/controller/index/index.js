(function(document) {

	var app = document.querySelector('#app');

	app.addEventListener('dom-change', function() {
		var movies = document.querySelectorAll('.movies');
		var data = {};
		data.movies = [];

		function prevHandler(e, moviedata, movie) {
			if (moviedata.currentIndex > 0) {
				moviedata.currentIndex--;
				movie.simpleSlider.go(moviedata.currentIndex);
			}
			app.index = moviedata.currentIndex;
		}

		function nextHandler(e, moviedata, movie) {
			if (moviedata.currentIndex < (movie.items.length - movie.pageView)) {
				moviedata.currentIndex++;
				movie.simpleSlider.go(moviedata.currentIndex);
			}
			app.index = moviedata.currentIndex;
		}

		function handler(i) {
			var movie = movies.item(i);
			movie.simpleSlider = movie.querySelector('simple-slider');
			movie.items = movie.simpleSlider.querySelectorAll('simple-slider-item');
			movie.pageView = 5;
			data.movies[i] = {
				currentIndex: 0
			};
			movie.querySelector('.simple-slider-prev').addEventListener('click', function handler(e){
				prevHandler(e, data.movies[i], movie);
			}, false);
			movie.querySelector('.simple-slider-next').addEventListener('click', function handler(e){
				nextHandler(e, data.movies[i], movie);
			}, false)
		}

		for (var i = 0; i < movies.length; i++) {
			handler(i);
		}

		setTimeout(function () {
			document.querySelector('#ajax').params = Object.assign(document.querySelector('#ajax').params, {
				append: 1
			});
			document.querySelector('#ajax').generateRequest();
		}, 3000);
	});

	window.addEventListener('WebComponentsReady', function() {
	});

})(document);

