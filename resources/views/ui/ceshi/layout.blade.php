<section class="full-width">
    <h3>layout basic</h3>
    <p>basic </p>
    <div>
        <div class="layout flex horizontal">hihi</div>
    </div>
    <div>
        <p><strong>兼容浏览器</strong></p>
        <div class="tip">微信浏览器不支持justify-content-space-around</div>
        <h3>三个是最常见的布局小tip</h3>
        <div class="layout flex horizontal">
            <div class="layout__item">1</div><div class="layout__item">2</div><div class="layout__item">3</div>
        </div>
        <h3>flex row 默认采用justify-content-start</h3>
        <div class="layout flex horizontal justify-content-start">
            <div class="layout__item">1</div><div class="layout__item">2</div><div class="layout__item">3</div>
        </div>
        <h3>flex row justify-content-end 到后面</h3>
        <div class="layout flex horizontal justify-content-end">
            <div class="layout__item">1</div><div class="layout__item">2</div><div class="layout__item">3</div>
        </div>
        <h3>flex row justify-content-center 到中间</h3>
        <div class="layout flex horizontal justify-content-center">
            <div class="layout__item">1</div><div class="layout__item">2</div><div class="layout__item">3</div>
        </div>
        <h3>flex row justify-content-space-between 间隔在中间</h3>
        <div class="layout flex horizontal justify-content-space-between">
            <div class="layout__item">1</div><div class="layout__item">2</div><div class="layout__item">3</div>
        </div>
        <p><strong>兼容浏览器</strong></p>
        <h3>flex row justify-content-space-around 间隔在两旁</h3>
        <div class="layout flex horizontal justify-content-space-around">
            <div class="layout__item">1</div><div class="layout__item">2</div><div class="layout__item">3</div>
        </div>
    </div>
    <div>
        <h3>layout group 左边绝对布局 右边绝对布局</h3>
        <img class="full-width" src="/assets/static/img/layout--left-pos-and-right-pos.png" alt="">
        <div class="layout flex horizontal left-pos-and-right-pos full-width" role="group" style="height: 30px;">
            <div class="layout__item layout__item--prefix full-height">
                <div class="layout flex full-height horizontal horizontal-center vertical-center">
                    <div class="layout__item">1</div>
                </div>
            </div>
            <div class="layout__item layout__item--content full-height">
                <div class="layout flex full-height horizontal horizontal-center vertical-center">
                    <div class="layout__item full-height flex-1">1</div>
                </div>
            </div>
            <div class="layout__item layout__item--suffix full-height">
                <div class="layout flex full-height horizontal horizontal-center vertical-center">
                    <div class="layout__item">1</div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <select name="" id="" style="-webkit-appearance: none;">
            <option value="1">测试1</option>
            <option value="2">测试2</option>
            <option value="3">测试3</option>
        </select>
    </div>
    <div>
        <div class="form-select form-select--basic grey">
            <div class="layout flex horizontal left-pos-and-right-pos full-width" role="group" style="height: 30px;">
                <div class="layout__item layout__item--prefix full-height form-select--prefix">
                    <div class="layout flex full-height horizontal horizontal-center vertical-center">
                        <div class="layout__item"></div>
                    </div>
                </div>
                <div class="layout__item layout__item--content full-height form-select--content">
                    <div class="layout flex full-height horizontal horizontal-center vertical-center">
                        <div class="layout__item full-height flex-1">
                            <select class="full-parent" name="" id="">
                                <option value="1">测试1</option>
                                <option value="2">测试2</option>
                                <option value="3">测试3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="layout__item layout__item--suffix full-height form-select--suffix utility-poiner-events-none">
                    <div class="layout flex full-height horizontal horizontal-center vertical-center">
                        <div class="layout__item"><span class="icon css-shape shape--arrow-down"></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <label>Choose a browser from this list:
            <input list="browsers" name="myBrowser" />
        </label>
        <datalist id="browsers">
            <option value="Chrome">
            <option value="Firefox">
            <option value="Internet Explorer">
            <option value="Opera">
            <option value="Safari">
        </datalist>
    </div>
</section>