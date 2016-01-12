<div class="layout full-parent stack-view scenes" touch-action="none">
    <div id="scene1" class="layout__item stack-view__item scene show" touch-action="none">
        <div id="gotoscene2" class="button button--colored grey shape-circle--5px" touch-action="none">到scene 2去</div>
        <div id="gotoscene3" class="button button--colored grey shape-circle--5px" touch-action="none">到scene 3去</div>
    </div>
    <div id="scene2" class="layout__item stack-view__item scene" style="background-color: pink" touch-action="none">
        <div id="gotoscene1" class="button button--colored grey shape-circle--5px" touch-action="none">回scene 1去</div>
    </div>
    <div id="scene3" class="layout__item stack-view__item scene" style="background-color: deepskyblue" touch-action="none">
        <div id="back" class="button button--colored grey shape-circle--5px" touch-action="none">回scene 1去</div>
    </div>
    <div id="scene4" class="layout__item stack-view__item scene" touch-action="none">4</div>
    <div id="scene5" class="layout__item stack-view__item scene" touch-action="none">5</div>
    <div id="scene6" class="layout__item stack-view__item scene" touch-action="none">6</div>
    <div id="scene7" class="layout__item stack-view__item scene" touch-action="none">7</div>
    <div id="scene8" class="layout__item stack-view__item scene" touch-action="none">8</div>
    <div id="scene9" class="layout__item stack-view__item scene" touch-action="none">9</div>
    <div id="scene10" class="layout__item stack-view__item scene" touch-action="none">10</div>
</div>
<script>
    var transEndEventNames = {
        'WebkitTransition' : 'webkitTransitionEnd', // * Saf 6, Android Browser
        'MozTransition'    : 'transitionend',       // * only for FF < 15
        'transition'       : 'transitionend'    // * IE10, Opera, Chrome, FF 15+, Saf 7+
    };
    var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    var animationEndEventNames = {
        'WebkitAnimation' : 'webkitAnimationEnd', // * Saf 6, Android Browser
        'MozAnimation'    : 'animationend',       // * only for FF < 15
        'animation'       : 'animationend'    // * IE10, Opera, Chrome, FF 15+, Saf 7+
    };
    var animationEndEventName = animationEndEventNames[ Modernizr.prefixed('animation') ];

    var scene1 = document.getElementById("scene1");
    var scene2 = document.getElementById("scene2");
    var scene3 = document.getElementById("scene3");
    var lastSecene = scene1;

    var gotoscene1 = document.getElementById("gotoscene1");
    var gotoscene2 = document.getElementById("gotoscene2");
    var gotoscene3 = document.getElementById("gotoscene3");
    var back = document.getElementById("back");

    gotoscene2.addEventListener("pointerdown", function() {
        scene2.classList.add("slideInRight");
        scene2.classList.add("animated");
        scene2.classList.add("show");
        scene2.classList.add("showing");
        scene2.addEventListener(animationEndEventName, function() {
            lastSecene.classList.remove("show");
            scene2.classList.remove("showing");
            scene2.classList.remove("slideInRight");
            scene2.classList.remove("animated");
            setTimeout(function() {
                lastSecene = scene2;
            }, 0);
        });
    });

    gotoscene3.addEventListener("pointerdown", function() {
        scene3.classList.add("slideInRight");
        scene3.classList.add("animated");
        scene3.classList.add("show");
        scene3.classList.add("showing");
        scene3.addEventListener(animationEndEventName, function() {
            lastSecene.classList.remove("show");
            scene3.classList.remove("showing");
            scene3.classList.remove("slideInRight");
            scene3.classList.remove("animated");
            setTimeout(function() {
                lastSecene = scene3;
            }, 0);
        });
    });

    gotoscene1.addEventListener("pointerdown", function() {
        lastSecene.classList.add("slideOutRight");
        lastSecene.classList.add("animated");
        lastSecene.classList.add("showing");
        scene1.classList.add("show");
        lastSecene.addEventListener(animationEndEventName, function() {
            lastSecene.classList.remove("show");
            lastSecene.classList.remove("showing");
            lastSecene.classList.remove("slideOutRight");
            lastSecene.classList.remove("animated");
            setTimeout(function() {
                lastSecene = scene1;
            }, 0);
        });
    });

    back.addEventListener("pointerdown", function() {
        lastSecene.classList.add("slideOutRight");
        lastSecene.classList.add("animated");
        lastSecene.classList.add("showing");
        scene1.classList.add("show");
        lastSecene.addEventListener(animationEndEventName, function() {
            lastSecene.classList.remove("show");
            lastSecene.classList.remove("showing");
            lastSecene.classList.remove("slideOutRight");
            lastSecene.classList.remove("animated");
            setTimeout(function() {
                lastSecene = scene1;
            }, 0);
        });
    });
</script>