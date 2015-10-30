var app = document.querySelector('#app');

function showVieo() {
    var videos = document.querySelectorAll('.video');
    var videoInfo = document.querySelector('.video-info');
    Array.prototype.slice.call(videos).forEach(function (video, index) {
        var info = video.querySelector('.info');
        var infoEmpty = video.querySelector('.info-empty');
        video.addEventListener('click', function handle() {
            if (info.innerText.trim() == '') {
                videoInfo.innerHTML = infoEmpty.innerHTML;
            } else {
                videoInfo.innerHTML = info.innerHTML;
            }
        }, false);
    });
}

class PlayAvContrller extends ViewController {
    constructor(name) {
        super();
        this.name = 'PlayAvController';
    }
    domChange() {
        var self = this;
        showVieo();
    }
    fun() {
    }
}

bootstrap(new PlayAvContrller('hihi'), app);