<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=cbfe44e1c0313a88de1731433641e0d8"></script>
<div class="scroll-panel main-panel" style="display: none;">
    <div class="scroll-panel__head">
        <div class="layout table full-parent">
            <div class="layout__item auto">
                @include("ui.partials.top-bar")
                <%--  /top-bar   --%>
                @include("ui.kde.map-action-bar")
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
            <div class="full-parent" id="historymap"></div>
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
<script type="text/javascript">
//    function drawshape(mappoints) {
//        return new BMap.Polyline(mappoints, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5})
//    }
//
//    // 百度地图API功能
//    var map = new BMap.Map("historymap");    // 创建Map实例
//    map.centerAndZoom(new BMap.Point(116.404, 39.915), 6);
//    map.enableScrollWheelZoom();
//
//    var mappoints = [
//    ];
//
//    var polygon = drawshape(mappoints);  //创建多边形
//    map.addOverlay(polygon);   //增加多边形
//
//    //单击获取点击的经纬度
//    map.addEventListener("click",function(e){
//        map.removeOverlay(polygon);
//        requestAnimationFrame(function() {
//            mappoints.push(new BMap.Point(e.point.lng, e.point.lat));
//            polygon = drawshape(mappoints);
//            map.addOverlay(polygon);
//        });
//    });

//    polygon.enableEditing();

function drawshape(mappoints) {
    return new AMap.Polyline({
        path: mappoints,          //设置线覆盖物路径
        strokeColor: "#3366FF", //线颜色
        strokeOpacity: 1,       //线透明度
        strokeWeight: 1,        //线宽
        strokeStyle: "solid",   //线样式
        strokeDasharray: [10, 5] //补充线样式
    })
}

var map = new AMap.Map('historymap', {
    layers: [new AMap.TileLayer()],
    zoom: 6
});

map.plugin(["AMap.MapType"],function(){
    //地图类型切换
    var type= new AMap.MapType({
        defaultType: 1, //使用2D地图
        showRoad: true
    });
    map.addControl(type);
});

var mappoints = [
];
var polyline = drawshape(mappoints);
polyline.setMap(map);

map.on('click', function(e) {
    var pointX = e.lnglat.getLng();
    var pointY = e.lnglat.getLat();
    polyline.setMap(null);
    requestAnimationFrame(function() {
        mappoints.push([pointX, pointY]);
        polyline = drawshape(mappoints);
        polyline.setMap(map);
    });
});
</script>
