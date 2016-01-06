<div class="layout flex full-height vertical">
    <div class="layout__item">
        <div class="nav-bar nav-bar--basic sys-tab-bar">
            <div class="layout flex horizontal justify-content-space-between" role="group">
                <div class="layout__item layout__item--prefix nav-bar__item">
                    <div class="layout flex full-height vertical vertical-center">
                        <div class="layout__item">back</div>
                    </div>
                </div>
                <div class="layout__item layout__item--content nav-bar__item">
                    <div class="layout flex full-height vertical vertical-center">
                        <div class="layout__item">title</div>
                    </div>
                </div>
                <div class="layout__item layout__item--suffix nav-bar__item">
                    <div class="layout flex full-height vertical vertical-center">
                        <div class="layout__item">right</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="layout__item flex-1 utility-pos-relative">
        <div class="layout full-parent utility-pos-absolute utility-overflow-auto table-view table-view--basic grey table-test" style="background-color: #93C47D">
            <div class="layout flex full-height vertical">
                <div class="layout__item table-view__section">
                    <div class="layout">
                        <div class="table-view__section-header">
                            <div class="layout flex horizontal vertical-center">
                                <div class="layout__item">
                                    <h3>section 1 header</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="layout">
                        @for($i = 0; $i < 2; $i++)
                            <div class="layout__item table-view__cell">
                                <div class="layout flex horizontal vertical-center">
                                    <div class="layout__item table-view__header"><span class="icon iconfont icon-star"></span></div>
                                    <div class="layout__item flex-1 table-view__body">
                                        <div class="layout flex horizontal justify-content-space-between vertical-center">
                                            <div class="layout__item table-view__content">
                                                <div class="test" style="height: 40px">
                                                    <div class="layout flex full-height vertical vertical-center">
                                                        <div class="layout__item">section 1 <% $i+1 %></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="layout__item table-view__accessory"><span class="icon iconfont icon-arrow-right"></span></div>
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
                                    <h3>section 2 header</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="layout">
                        @for($i = 0; $i < 7; $i++)
                            <div class="layout__item table-view__cell">
                                <div class="layout flex horizontal vertical-center">
                                    <div class="layout__item  table-view__header"><span class="icon iconfont icon-star"></span></div>
                                    <div class="layout__item flex-1  table-view__body">
                                        <div class="layout flex horizontal justify-content-space-between vertical-center">
                                            <div class="layout__item table-view__content">
                                                <div class="test" style="height: 40px">
                                                    <div class="layout flex full-height vertical vertical-center">
                                                        <div class="layout__item">section 2 <% $i+1 %></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="layout__item table-view__accessory"><span class="icon iconfont icon-arrow-right"></span></div>
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
    <div class="layout__item">
        <div class="tab-bar tab-bar--basic sys-tab-bar">
            <div class="layout flex horizontal">
                @for($i = 0; $i < 4; $i++)
                    <div class="layout__item flex-1 tab-bar__item">
                        <div class="layout flex full-height vertical horizontal-center vertical-center">
                            <div class="layout__item">
                                <div class="button icon-button app-launcher-button">
                                    <picture class="icon-button__picture">
                                        <source srcset="/assets/static/img/mm.jpeg" media="(min-width: 600px)">
                                        <img src="/assets/static/img/tubiao.png" alt="MDN">
                                    </picture>
                                    <div class="text-align-center icon-button__content"><% $i+1 %></div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endfor
            </div>
        </div>
    </div>
</div>