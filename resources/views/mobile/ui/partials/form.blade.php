<form class="form" action="">
    <div class="form__group volume-group">
        <div class="layout flex horizontal center vertical-center" role="group">
            <div class="layout__item layout__item--prefix">
                <span class="icon iconfont icon-volume-off"></span>
            </div>
            <div class="layout__item layout__item--content flex-center">
                <div class="ui-rangeslider" element="ui-rangeslider" compile>
                    <input type="range" value="60" max="100">
                </div>
            </div>
            <div class="layout__item layout__item--suffix">
                <span class="icon iconfont icon-volume-up"></span>
            </div>
        </div>
    </div>
    <div class="form__group volume-group">
        <div class="layout flex horizontal center vertical-center" role="group">
            <div class="layout__item layout__item--content flex-center">
                <div class="ui-progress" element="ui-progress" compile>
                    <input type="range" value="60" max="100">
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="layout flex horizontal center vertical-center" role="group">
            <div class="layout__item layout__item--content flex-center">
                <div class="form-field">
                    <div class="layout flex horizontal vertical-center" role="group">
                        <div class="layout__item layout__item--prefix form-field__prefix">
                            <span class="icon iconfont icon-search"></span>
                        </div>
                        <div class="layout__item layout__item--content flex-center flex-1 form-field__content">
                            <input type="text" placeholder="1 infinity loop">
                        </div>
                        <div class="layout__item layout__item--suffix form-field__suffix">
                            <span class="icon iconfont icon-close-circle"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="layout flex horizontal center vertical-center" role="group">
            <div class="layout__item layout__item--content flex-center">
                <div class="form-checkbox">
                    <input type="checkbox">
                    <div></div>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="layout flex horizontal center vertical-center" role="group">
            <div class="layout__item layout__item--content flex-center">
                <div class="form-radio">
                    <input name="test" type="radio">
                    <div></div>
                </div>
                <div class="form-radio">
                    <input name="test" type="radio">
                    <div></div>
                </div>
                <div class="form-radio">
                    <input name="test" type="radio">
                    <div></div>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="layout flex horizontal center vertical-center" role="group">
            <div class="layout__item layout__item--content flex-center">
                <div class="switch">
                    <label><input type="checkbox" class="ios-switch" checked /><div><div></div></div></label>
                </div>
            </div>
        </div>
    </div>
</form>