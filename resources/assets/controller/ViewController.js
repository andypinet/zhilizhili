class ViewController {
    constructor() {
    }
    domChange() {
    }
}

let protos = [];
let currentProto = {};

function getProtoType(instance) {
    let ins = Object.getPrototypeOf(instance);
    if (ins instanceof ViewController) {
        protos.unshift(ins);
        getProtoType(ins);
    }
    else {
        protos.unshift(ins);
        protos.forEach(function(proto) {
            var keys = Object.getOwnPropertyNames(proto);
            keys.forEach(function(key){
                if (key !== 'constructor') {
                    currentProto[key] = proto[key];
                }
            });
        });
    }
}

function bootstrap(instance, app) {
    getProtoType(instance);
    var keys = Object.getOwnPropertyNames(currentProto);
    keys.forEach(function(key){
        if (key !== "constructor") {
            app[key] = currentProto[key];
        }
    });
    for (let key in instance) {
        app[key] = instance[key];
    }
    app.addEventListener('dom-change', function() {
        app.domChange();
    });
    return app;
}

window.ViewController = ViewController;
window.bootstrap = bootstrap;