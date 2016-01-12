<style>
    .drawer-view__drawer.open {
        transform: translate3d(100%, 0, 0);
    }
</style>
<div id="drawerView" class="layout full-parent drawer-view drawer-view--basic">
    <div class="layout__item full-height utility-pos-absolute drawer-view__drawer open" touch-action="none" style="background-color: #00c4ff">
        <div class="layout full-parent">
            <div id="gotoscene5" class="button button--colored grey shape-circle--5px" touch-action="none">到scene 5去</div>
        </div>
    </div>
    <div class="layout__item full-parent utility-pos-absolute drawer-view__main" touch-action="none">
        <main class="full-parent" id="main" touch-action="none">
            <div class="layout full-parent stack-view scenes" touch-action="none">
                <div id="scene1" class="layout__item stack-view__item scene show" touch-action="none">
                    <div id="gotoscene2" class="button button--colored grey shape-circle--5px" touch-action="none">到scene 2去</div>
                </div>
                <div id="scene2" class="layout__item stack-view__item scene" style="background-color: pink" touch-action="none">
                    <div id="gotoscene3" class="button button--colored grey shape-circle--5px" touch-action="none">到scene 3去</div>
                    <div class="button button--colored grey shape-circle--5px" touch-action="none" page-back>back</div>
                </div>
                <div id="scene3" class="layout__item stack-view__item scene" style="background-color: deepskyblue" touch-action="none">
                    <div id="gotoscene4" class="button button--colored grey shape-circle--5px" touch-action="none">到scene 4去</div>
                    <div class="button button--colored grey shape-circle--5px" touch-action="none" page-back>back</div>
                </div>
                <div id="scene4" class="layout__item stack-view__item scene" touch-action="none">
                    <div class="button button--colored grey shape-circle--5px" touch-action="none" page-back>back</div>
                </div>
                <div id="scene5" class="layout__item stack-view__item scene" touch-action="none">5</div>
                <div id="scene6" class="layout__item stack-view__item scene" touch-action="none">6</div>
                <div id="scene7" class="layout__item stack-view__item scene" touch-action="none">7</div>
                <div id="scene8" class="layout__item stack-view__item scene" touch-action="none">8</div>
                <div id="scene9" class="layout__item stack-view__item scene" touch-action="none">9</div>
                <div id="scene10" class="layout__item stack-view__item scene" touch-action="none">10</div>
            </div>
        </main>
        <div class="full-width utility-pos-absolute drawer-view__polyfill" style="left: -999px; top: -999px; z-index: -1; opacity: 0; width: 0; height: 0;"></div>
    </div>
    <div class="layout__item full-parent utility-pos-absolute drawer-view__mask" touch-action="none"></div>
</div>
<script>
    document.addEventListener("DOMContentLoaded", function(){
        var uistack = new window.UIStack();
        uistack.add("#scene1", {});

        var gotoscene2 = document.getElementById("gotoscene2");
        gotoscene2.addEventListener("pointerdown", function() {
            Promise.resolve().then(function() {
                uistack.beginTransaction();
                return Promise.resolve();
            }).then(function() {
                uistack.addToBackStack("#scene2", {});
                return Promise.resolve();
            }).then(function() {
                uistack.commit();
            });
        });

        var gotoscene3 = document.getElementById("gotoscene3");
        gotoscene3.addEventListener("pointerdown", function() {
            Promise.resolve().then(function() {
                uistack.beginTransaction();
                return Promise.resolve();
            }).then(function() {
                uistack.addToBackStack("#scene3", {});
                return Promise.resolve();
            }).then(function() {
                uistack.commit();
            });
        });

        var gotoscene4 = document.getElementById("gotoscene4");
        gotoscene4.addEventListener("pointerdown", function() {
            Promise.resolve().then(function() {
                uistack.beginTransaction();
                return Promise.resolve();
            }).then(function() {
                uistack.addToBackStack("#scene4", {});
                return Promise.resolve();
            }).then(function() {
                uistack.commit();
            });
        });

        var gotoscene5 = document.getElementById("gotoscene5");
        gotoscene5.addEventListener("pointerdown", function() {
            Promise.resolve().then(function() {
                document.querySelector("#drawerView .drawer-view__drawer.open").classList.remove("open");
                return Promise.resolve();
            }).then(function() {
                uistack.beginTransaction();
                return Promise.resolve();
            }).then(function() {
                uistack.replace("#scene5", {
                    opreation: function(scope) {
                        scope.nextStack.stack.elememt.classList.add("fadeIn");
                        scope.nextStack.stack.elememt.classList.add("animated");
                        scope.nextStack.stack.elememt.classList.add("show");
                        scope.nextStack.stack.elememt.classList.add("showing");

                        var handler = function() {
                            scope.currentStack.stack.elememt.classList.remove("show");
                            scope.nextStack.stack.elememt.classList.remove("showing");
                            scope.nextStack.stack.elememt.classList.remove("fadeIn");
                            scope.nextStack.stack.elememt.classList.remove("animated");
                            setTimeout(function() {
                                scope.nextStack.stack.elememt.removeEventListener(animationEndEventName, handler);
                                scope.reset();
                            }, 0);
                        };

                        scope.nextStack.stack.elememt.addEventListener(animationEndEventName, handler);
                    }
                });
                return Promise.resolve();
            }).then(function() {
                uistack.commit();
            });
        });

        var backs = document.queryAll("[page-back]");
        backs.forEach(function(back) {
            back.addEventListener("pointerdown", function() {
                Promise.resolve().then(function() {
                    uistack.beginTransaction();
                    return Promise.resolve();
                }).then(function() {
                    uistack.popFromBackStack();
                    return Promise.resolve();
                }).then(function() {
                    uistack.commit();
                });
            });
        });
    });
</script>