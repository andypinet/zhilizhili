<form class="form" action="">
    <div class="form__group volume-group">
        <div class="layout flex horizontal center vertical-center" role="group">
            <div class="btn layout__item layout__item--prefix">
                <span class="icon iconfont icon-volume-off"></span>
            </div>
            <div class="btn layout__item layout__item--content flex-center">
                <div class="ui-rangeslider" element="ui-rangeslider" compile>
                    <input type="range" value="60" max="100">
                </div>
            </div>
            <div class="btn layout__item layout__item--suffix">
                <span class="icon iconfont icon-volume-up"></span>
            </div>
        </div>
    </div>
    <div class="form__group volume-group">
        <div class="layout flex horizontal center vertical-center" role="group">
            <div class="btn layout__item layout__item--content flex-center">
                <div class="ui-progress" element="ui-progress" compile>
                    <input type="range" value="60" max="100">
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="layout flex horizontal center vertical-center" role="group">
            <div class="btn layout__item layout__item--content flex-center">
                <div class="form-field">
                    <input type="text">
                </div>
            </div>
        </div>
    </div>
</form>