<div class="scroll-panel main-panel" style="display: none;">
    <div class="scroll-panel__head">
        <div class="layout table full-parent">
            <div class="layout__item auto">
                @include("ui.partials.top-bar")
                <%--  /top-bar   --%>
                @include("ui.partials.actions-bar")
                <%--  /action-bar   --%>
            </div>
            <div class="layout__item">
                <div class="icon-btn add-action">
                    <span class="icon iconfont icon-plus"></span>
                </div>
            </div>
        </div>
        <div class="dropdown__list filter-dropdwon-list">
            <div class="list-group">
                <div class="list-group__item">1</div>
                <div class="list-group__item">2</div>
                <div class="list-group__item">3</div>
            </div>
        </div>
    </div>
    <%--  /main head   --%>
    <div class="scroll-panel__body">
        <div class="fix-panel-bug">
            <div class="layout calcsize concat-main">
                <div class="layout__item layout__item--prefix">
                    <div class="concat-book">
                        <div class="layout calcsize concat-book-main">
                            <div class="layout__item layout__item--content">
                                <form action="" class="form concat-book__form">
                                    <div class="form__group">
                                        <div class="form-field concat-book__search-field">
                                            <input name="search-field" type="text" placeholder="search by number or name...">
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="layout__item layout__item--suffix">
                                <div class="list-group">
                                    <div class="list-group__item">1</div>
                                    <div class="list-group__item">2</div>
                                    <div class="list-group__item">3</div>
                                    <div class="list-group__item">4</div>
                                    <div class="list-group__item">5</div>
                                    <div class="list-group__item">6</div>
                                    <div class="list-group__item">7</div>
                                    <div class="list-group__item">8</div>
                                    <div class="list-group__item">9</div>
                                    <div class="list-group__item">10</div>
                                    <div class="list-group__item">11</div>
                                    <div class="list-group__item">12</div>
                                    <div class="list-group__item">13</div>
                                    <div class="list-group__item">14</div>
                                    <div class="list-group__item">15</div>
                                    <div class="list-group__item">16</div>
                                    <div class="list-group__item">17</div>
                                    <div class="list-group__item">18</div>
                                    <div class="list-group__item">19</div>
                                    <div class="list-group__item">20</div>
                                    <div class="list-group__item">21</div>
                                    <div class="list-group__item">22</div>
                                    <div class="list-group__item">23</div>
                                    <div class="list-group__item">24</div>
                                    <div class="list-group__item">25</div>
                                    <div class="list-group__item">26</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layout__item layout__item--content">
                    <p>主内容栏自适应宽度</p>
                </div>
                <div class="layout__item layout__item--suffix">
                    <p>侧边栏2固定宽度</p>
                </div>
            </div>
        </div>
    </div>
    <div class="scroll-panel__footer">
        <div class="fix-panel-bug">
            <div class="layout full-parent new-left-right">
                <div class="float-left" style="text-align: center">
                    <div class="left-inner">
                        <ul class="layout center-set nav reservation-indicator">
                            <li class="layout__item nav__item
                                                        reservation-indicator__item
                                                        reservation-indicator__item--reservation"><span
                                        class="icon icon-unicode icon-circle"></span><span>reservation</span></li>
                            <li class="layout__item nav__item
                                                        reservation-indicator__item
                                                        reservation-indicator__item--seated"><span
                                        class="icon icon-unicode icon-circle"></span><span>seated</span></li>
                            <li class="layout__item nav__item
                                                        reservation-indicator__item
                                                        reservation-indicator__item--arrived"><span
                                        class="icon icon-unicode icon-circle"></span><span>arrived</span></li>
                        </ul>
                    </div>
                    <div class="float-right">
                        <div class="layout center-set">
                            <div class="layout__item">
                                <div class="action vip-action">
                                    <span class="action__text">create block</span>
                                    <span class="icon iconfont icon-vip"></span>
                                </div>
                            </div>
                            <div class="layout__item">
                                <div class="action quick-search-action">
                                    <span class="action__text">quick search</span>
                                    <div class="layout center-set nav">
                                        <div class="layout__item nav__item">
                                            <div class="span icon iconfont icon-user">
                                                <div class="mask">1</div>
                                            </div>
                                        </div>
                                        <div class="layout__item nav__item">
                                            <div class="span icon iconfont icon-user-group">
                                                <div class="mask">2</div>
                                            </div>
                                        </div>
                                        <div class="layout__item nav__item">
                                            <div class="span icon iconfont icon-user-group">
                                                <div class="mask">3</div>
                                            </div>
                                        </div>
                                        <div class="layout__item nav__item">
                                            <div class="span icon iconfont icon-user-group">
                                                <div class="mask">4</div>
                                            </div>
                                        </div>
                                        <div class="layout__item nav__item">
                                            <div class="span icon iconfont icon-user-group">
                                                <div class="mask">5</div>
                                            </div>
                                        </div>
                                        <div class="layout__item nav__item">
                                            <div class="span icon iconfont icon-user-group">
                                                <div class="mask">6</div>
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
</div>