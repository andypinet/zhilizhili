<div class="layout flex full-height vertical">
    <div class="layout__item">
        <div class="nav-bar nav-bar--basic sys-tab-bar">
            1
        </div>
    </div>
    <div class="layout__item flex-1 utility-pos-relative">
        <div class="layout full-parent utility-pos-absolute collection-view phone-test" style="background-color: #93C47D">
            content
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