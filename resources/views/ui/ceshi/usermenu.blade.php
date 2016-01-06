<div class="layout full-parent utility-pos-relative">
    <div class="layout full-height utility-overflow-auto utility-pos-absolute" style="width: 80%; max-width: 320px; z-index: 1;">
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
                    <div class="layout__item"><span class="icon iconfont bilibili-postcard__user-sex icon-male"></span></div>
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
                            @for($i = 0; $i < 2; $i++)
                                @if($i == 0)
                                    <div class="layout__item table-view__cell active">
                                        @else
                                            <div class="layout__item table-view__cell">
                                                @endif
                                                <div class="layout flex horizontal vertical-center">
                                                    <div class="layout__item table-view__header"><span class="icon iconfont icon-star"></span></div>
                                                    <div class="layout__item flex-1 table-view__body">
                                                        <div class="layout flex horizontal justify-content-space-between vertical-center">
                                                            <div class="layout__item table-view__content">
                                                                <div class="test" style="height: 46.5px">
                                                                    <div class="layout flex full-height vertical vertical-center">
                                                                        <div class="layout__item">section 1 <% $i+1 %></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="layout__item table-view__accessory"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @endfor
                                    </div>
                        </div>
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
                                @for($i = 0; $i < 4; $i++)
                                    <div class="layout__item table-view__cell">
                                        <div class="layout flex horizontal vertical-center">
                                            <div class="layout__item  table-view__header"><span class="icon iconfont icon-star"></span></div>
                                            <div class="layout__item flex-1  table-view__body">
                                                <div class="layout flex horizontal justify-content-space-between vertical-center">
                                                    <div class="layout__item table-view__content">
                                                        <div class="test" style="height: 46.5px">
                                                            <div class="layout flex full-height vertical vertical-center">
                                                                <div class="layout__item">section 2 <% $i+1 %></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="layout__item table-view__accessory"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endfor
                            </div>
                        </div>
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
                                @for($i = 0; $i < 2; $i++)
                                    <div class="layout__item table-view__cell">
                                        <div class="layout flex horizontal vertical-center">
                                            <div class="layout__item  table-view__header"><span class="icon iconfont icon-star"></span></div>
                                            <div class="layout__item flex-1  table-view__body">
                                                <div class="layout flex horizontal justify-content-space-between vertical-center">
                                                    <div class="layout__item table-view__content">
                                                        <div class="test" style="height: 46.5px">
                                                            <div class="layout flex full-height vertical vertical-center">
                                                                <div class="layout__item">section 3 <% $i+1 %></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="layout__item table-view__accessory"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endfor
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%--  /drawer   --%>
    <div class="full-parent utility-pos-absolute" style="left: 0; top: 0">
        <div class="full-width text-align-right">测试</div>
    </div>
</div>