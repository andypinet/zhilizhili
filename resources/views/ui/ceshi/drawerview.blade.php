<div id="drawerView" class="layout full-parent drawer-view drawer-view--basic">
    <div class="layout__item full-height utility-pos-absolute drawer-view__drawer" touch-action="none" style="background-color: lightskyblue">
        <div class="layout full-parent utility-overflow-auto">
            <div class="layout__item">
                <div class="card card--basic postcard bilibili-postcard" style="background-color: pink">
                    <div class="layout flex full-width horizontal justify-content-space-between">
                        <div class="layout__item">
                            <div class="shape shape--square-circle utility-overflow-hidden postcard__picture postcard__user">
                                <div class="shape shape-circle full-parent utility-pos-absolute utility-overflow-hidden">
                                    <picture class="full-parent">
                                        <source srcset="/assets/static/img/mm.jpeg" media="(min-width: 600px)">
                                        <img class="full-parent" src="/assets/static/img/tubiao.png" alt="MDN">
                                    </picture>
                                </div>
                            </div>
                        </div>
                        <div class="layout__item">
                            <div class="layout flex horizontal">
                                <div class="layout__item">
                                    <div class="shape shape--square-circle utility-overflow-hidden postcard__picture postcard__action grey">
                                        <div class="full-parent utility-pos-absolute">
                                            <div class="layout flex full-height vertical horizontal-center vertical-center">
                                                <div class="layout__item"><span class="icon iconfont icon-email"></span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="layout__item">
                                    <div class="shape shape--square-circle utility-overflow-hidden postcard__picture postcard__action grey">
                                        <div class="full-parent utility-pos-absolute">
                                            <div class="layout flex full-height vertical horizontal-center vertical-center">
                                                <div class="layout__item"><span class="icon iconfont icon-moon"></span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <%--  /user  --%>
                    <div class="layout flex horizontal vertical-center bilibili-postcard__user-info">
                        <div class="layout__item"><div class="text">修电脑找妹子</div></div>
                        <div class="layout__item"><div class="label label--basic grey shape-circle--5px bilibili-postcard__user-level">LV3</div></div>
                        <div class="layout__item"><span id="o" class="icon iconfont bilibili-postcard__user-sex icon-male"></span></div>
                    </div>
                    <div class="layout flex horizontal">
                        <div class="layout__item"><div class="label label--colored grey shape-round-circle bilibili-postcard__dogpai">正式会员</div></div>
                    </div>
                    <div class="layout flex horizontal vertical-center">
                        <div class="layout__item"><div class="text">硬币:</div></div>
                        <div class="layout__item"><div class="number">222</div></div>
                    </div>
                </div>
            </div>
            <div class="layout__item utility-pos-relative">
                <div class="layout full-width utility-pos-absolute utility-overflow-auto table-view table-view--basic bilibili-action-bar">
                    <div class="layout flex full-height vertical">
                        <div class="layout__item table-view__section">
                            <div class="layout">
                                <div class="table-view__section-header">
                                    <div class="layout flex horizontal vertical-center">
                                        <div class="layout__item">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="layout">
                                <div id="gotoscene3" class="layout__item table-view__cell active" touch-action="none">
                                    <div class="layout flex horizontal vertical-center">
                                        <div class="layout__item table-view__header"><span class="icon iconfont icon-star"></span></div>
                                        <div class="layout__item flex-1 table-view__body">
                                            <div class="layout flex horizontal justify-content-space-between vertical-center">
                                                <div class="layout__item table-view__content">
                                                    <div class="test" style="height: 46.5px">
                                                        <div class="layout flex full-height vertical vertical-center">
                                                            <div class="layout__item">go to secne3</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="layout__item table-view__accessory"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="layout__item full-parent utility-pos-absolute drawer-view__main" touch-action="none">
        <main class="full-parent" id="main" touch-action="none">
            <div class="layout full-parent stack-view scenes" touch-action="none">
                <div id="scene1" class="layout__item stack-view__item scene show" touch-action="none">
                    <div id="gotoscene2" class="button button--colored grey shape-circle--5px" touch-action="none">到scene 2去</div>
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
        </main>
        <div class="full-width utility-pos-absolute drawer-view__polyfill" style="left: -999px; top: -999px; z-index: -1; opacity: 0; width: 0; height: 0;"></div>
    </div>
    <div class="layout__item full-parent utility-pos-absolute drawer-view__mask" touch-action="none"></div>
</div>
