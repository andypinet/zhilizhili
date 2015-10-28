var app = document.querySelector('#app');

class PlayAvContrller extends ViewController {
    constructor(name) {
        super();
        this.name = 'PlayAvController';
    }
    domChange() {
        console.log(`${this.name}#`);
    }
    fun() {
    }
}

bootstrap(new PlayAvContrller('hihi'), app);