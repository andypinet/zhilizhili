<div class="scroll-panel main-panel">
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
                                <div class="concat-book-talkers">
                                    <div class="list-group">
                                        <div class="list-group__item">
                                            <div class="concat-book-talker">
                                                <div class="layout calcsize concat-book-talker__wrapper">
                                                    <div class="layout__item layout__item--prefix concat-book-talker__marker">
                                                        <span class="icon iconfont icon-star"></span>
                                                    </div>
                                                    <div class="layout__item layout__item--content concat-book-talker__content">
                                                        <div class="layout new-left-right">
                                                            <div class="float-left center">
                                                                <div class="left-inner">
                                                                    <div class="concat-book-talker__name">Jaye Rowe</div>
                                                                </div>
                                                                <div class="float-right">
                                                                    <div class="concat-book-talker__phone">213123213</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <%--  /concat-book-talker   --%>
                                        </div>
                                        <div class="list-group__item">
                                            <div class="concat-book-talker active">
                                                <div class="layout calcsize concat-book-talker__wrapper">
                                                    <div class="layout__item layout__item--prefix concat-book-talker__marker">
                                                        <span class="icon iconfont icon-star"></span>
                                                    </div>
                                                    <div class="layout__item layout__item--content concat-book-talker__content">
                                                        <div class="layout new-left-right">
                                                            <div class="float-left center">
                                                                <div class="left-inner">
                                                                    <div class="concat-book-talker__name">Jaye Rowe</div>
                                                                </div>
                                                                <div class="float-right">
                                                                    <div class="concat-book-talker__phone">213123213</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <%--  /concat-book-talker   --%>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="layout__item layout__item--suffix">
                                <div class="list-group">
                                    @for($i = 0; $i < 26; $i++)
                                        <div class="list-group__item">
                                            @if($i == 15)
                                                <span class="concat-book__indicator active"><% $i+1 %></span>
                                            @else
                                                <span class="concat-book__indicator"><% $i+1 %></span>
                                            @endif
                                        </div>
                                    @endfor
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <%--  /concat-main prefix   --%>
                <div class="layout__item layout__item--content">
                    <div class="full-height user">
                        <div class="list-group">
                            <div class="list-group__item">
                                <div class="user-info">
                                    <div class="layout center-set">
                                        <div class="layout__item"><h1 class="text--blue user-info__name">Feilsa Oshiro</h1></div>
                                        <div class="layout__item"><div class="label label--default user-info__label"><span class="icon iconfont icon-star"></span><span>sdsdsds</span></div></div>
                                    </div>
                                    <div class="layout center-set">
                                        <div class="layout__item"><div class="user-info__email">sdasdsadsds</div></div>
                                        <div class="layout__item"><div class="user-info__phone">17232122</div></div>
                                    </div>
                                    <div class="layout center-set">
                                        <div class="layout__item"><div class="btn btn--normal bg--normal bg--green"><span>send sms</span><div class="icon iconfont icon-message"></div></div></div>
                                        <div class="layout__item"><div class="btn btn--normal bg--normal bg--green"><span>call</span><div class="icon iconfont icon-phone"></div></div></div>
                                        <div class="layout__item"><div class="user-info__addons">
                                                <div class="layout center-set">
                                                    <div class="layout__item">left <a href="">3 reviews</a></div>
                                                    <div class="layout__item"><div class="raty">raty</div></div>
                                                </div></div></div>
                                    </div>
                                </div>
                            </div>
                            <div class="list-group__item">
                                <div class="user-status">
                                    <div class="layout calcsize user-status__wrapper">
                                        <div class="layout__item layout__item--prefix"><div id="user-info__chart" class="chart-container user-info__chart"></div></div>
                                        <div class="layout__item layout__item--content">resurtant status</div>
                                    </div>
                                </div>
                            </div>
                            <div class="list-group__item">
                                <div class="user-perfernce">
                                    <h3>perfernce</h3>
                                    <div class="user-perfernce__seating">
                                        <div class="layout calcsize user-perfernce__item">
                                            <div class="layout__item layout__item--prefix">seating</div>
                                            <div class="layout__item layout__item--content">
                                                <div class="user-perfernce__foods">
                                                    <div class="layout center-set">
                                                        <div class="layout__item">
                                                            <div class="label label--colored blue shape-round-circle">
                                                                <span class="label__content">p3</span>
                                                                <span class="label__addons"><span class="icon iconfont icon-remove"></span></span>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item">
                                                            <div class="label label--colored blue shape-round-circle">
                                                                <span class="label__content">p4</span>
                                                                <span class="label__addons"><span class="icon iconfont icon-remove"></span></span>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item">
                                                            <div class="label label--colored blue shape-round-circle">
                                                                <span class="label__content">l17</span>
                                                                <span class="label__addons"><span class="icon iconfont icon-remove"></span></span>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item">
                                                            <div class="button button--basic blue shape-circle user-perfernce__add-seat"><span class="icon iconfont icon-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <%--  /user-perfernce__seatings   --%>
                                            </div>
                                            <%--  /layout__item--content   --%>
                                        </div>
                                    </div>
                                    <%--  /user-perference__seating   --%>
                                    <div class="user-perfernce__food">
                                        <div class="layout calcsize user-perfernce__item">
                                            <div class="layout__item layout__item--prefix">food</div>
                                            <div class="layout__item layout__item--content">
                                                <div class="user-perfernce__seatings">
                                                    <div class="layout center-set">
                                                        <div class="layout__item">
                                                            <div class="label label--colored green shape-round-circle">
                                                                <span class="label__content">seafood</span>
                                                                <span class="label__addons"><span class="icon iconfont icon-remove"></span></span>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item">
                                                            <div class="label label--colored green shape-round-circle">
                                                                <span class="label__content">football</span>
                                                                <span class="label__addons"><span class="icon iconfont icon-remove"></span></span>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item">
                                                            <div class="label label--colored green shape-round-circle">
                                                                <span class="label__content">baseball</span>
                                                                <span class="label__addons"><span class="icon iconfont icon-remove"></span></span>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item">
                                                            <div class="label label--colored green shape-round-circle">
                                                                <span class="label__content">beer</span>
                                                                <span class="label__addons"><span class="icon iconfont icon-remove"></span></span>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item">
                                                            <div class="label label--colored blue shape-round-circle">
                                                                <span class="label__content">p3</span>
                                                                <span class="label__addons"><span class="icon iconfont icon-remove"></span></span>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item">
                                                            <div class="label label--colored blue shape-round-circle">
                                                                <span class="label__content">p4</span>
                                                                <span class="label__addons"><span class="icon iconfont icon-remove"></span></span>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item">
                                                            <div class="label label--colored blue shape-round-circle">
                                                                <span class="label__content">l17</span>
                                                                <span class="label__addons"><span class="icon iconfont icon-remove"></span></span>
                                                            </div>
                                                        </div>
                                                        <div class="layout__item">
                                                            <div class="button button--basic blue shape-circle user-perfernce__add-seat"><span class="icon iconfont icon-plus"></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <%--  /user-perfernce__seatings   --%>
                                            </div>
                                            <%--  /layout__item--content   --%>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <%--  /user   --%>
                </div>
                <%--  /concat-main content   --%>
                <div class="layout__item layout__item--suffix">
                    <div class="full-parent user-statistics">
                        <div class="user-statistics__events">
                            <div class="list-group">
                                <div class="list-group__item" data-role="title">
                                    <h3 class="user-statistics__title">event / pronitins history</h3>
                                </div>
                                <div class="list-group__item">
                                    <div class="user-statistics__event">
                                        <div class="layout new-left-right">
                                            <div class="float-left">
                                                <div class="left-inner">
                                                    <div class="layout center-set">
                                                        <div class="layout__item"><span>happy hours</span></div>
                                                    </div>
                                                </div>
                                                <div class="float-right">
                                                    <div class="layout center-set">
                                                        <div class="layout__item"><span class="number">10</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <%--  /user-statistics__event   --%>
                                </div>
                                <div class="list-group__item">
                                    <div class="user-statistics__event">
                                        <div class="layout new-left-right">
                                            <div class="float-left">
                                                <div class="left-inner">
                                                    <div class="layout center-set">
                                                        <div class="layout__item"><span>happy hours</span></div>
                                                    </div>
                                                </div>
                                                <div class="float-right">
                                                    <div class="layout center-set">
                                                        <div class="layout__item"><span class="number">10</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <%--  /user-statistics__event   --%>
                                </div>
                            </div>
                        </div>
                        <%--  /user-statistics__events   --%>
                        <div class="user-statistics__history">
                            <div class="list-group">
                                <div class="list-group__item" data-role="title">
                                    <div class="layout table full-width user-statistics__history-item">
                                        <div class="layout__item"><h3 class="user-statistics__title">recebt dining history</h3></div>
                                        <div class="layout__item">covers</div>
                                        <div class="layout__item">table</div>
                                    </div>
                                </div>
                                <div class="list-group__item">
                                    <div class="layout table full-width user-statistics__history-item">
                                        <div class="layout__item"><span class="label label--colored shape-circle--5px green">18:50</span> recebt dining history</div>
                                        <div class="layout__item"><span class="label label--colored shape-circle green user-statistics__badge">1</span></div>
                                        <div class="layout__item">2</div>
                                    </div>
                                </div>
                                <div class="list-group__item">
                                    <div class="layout table full-width user-statistics__history-item">
                                        <div class="layout__item"><span class="label label--colored shape-circle--5px grey">20:00</span> recebt dining history</div>
                                        <div class="layout__item"><span class="label label--colored shape-circle green user-statistics__badge">1</span></div>
                                        <div class="layout__item">2</div>
                                    </div>
                                </div>
                                <div class="list-group__item">
                                    <div class="layout table full-width user-statistics__history-item">
                                        <div class="layout__item"><span class="label label--colored shape-circle--5px blue">20:00</span> recebt dining history</div>
                                        <div class="layout__item"><span class="label label--colored shape-circle green user-statistics__badge">1</span></div>
                                        <div class="layout__item">2</div>
                                    </div>
                                </div>
                                <div class="list-group__item">
                                    <div class="layout table full-width user-statistics__history-item">
                                        <div class="layout__item"><span class="label label--colored shape-circle--5px green">18:50</span> recebt dining history</div>
                                        <div class="layout__item"><span class="label label--colored shape-circle green user-statistics__badge">1</span></div>
                                        <div class="layout__item">2</div>
                                    </div>
                                </div>
                                <div class="list-group__item">
                                    <div class="layout table full-width user-statistics__history-item">
                                        <div class="layout__item"><span class="label label--colored shape-circle--5px green">18:50</span> recebt dining history</div>
                                        <div class="layout__item"><span class="label label--colored shape-circle green user-statistics__badge">1</span></div>
                                        <div class="layout__item">2</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <%--  /user-statistics__history   --%>
                        <div class="user-statistics__upcoming">
                            <div class="list-group">
                                <div class="list-group__item" data-role="title">
                                    <div class="layout table full-width user-statistics__upcoming-item">
                                        <div class="layout__item"><h3 class="user-statistics__title">recebt dining history</h3></div>
                                        <div class="layout__item">covers</div>
                                        <div class="layout__item">table</div>
                                    </div>
                                </div>
                                <div class="list-group__item">
                                    <div class="layout table full-width user-statistics__upcoming-item">
                                        <div class="layout__item"><span class="label label--colored shape-circle--5px pink">18:50</span> recebt dining history</div>
                                        <div class="layout__item"><span class="label label--colored shape-circle green user-statistics__badge">1</span></div>
                                        <div class="layout__item">2</div>
                                    </div>
                                </div>
                                <div class="list-group__item">
                                    <div class="layout table full-width user-statistics__upcoming-item">
                                        <div class="layout__item"><span class="label label--colored shape-circle--5px grey">18:50</span> recebt dining history</div>
                                        <div class="layout__item"><span class="label label--colored shape-circle green user-statistics__badge">1</span></div>
                                        <div class="layout__item">2</div>
                                    </div>
                                </div>
                                <div class="list-group__item">
                                    <div class="layout table full-width user-statistics__upcoming-item">
                                        <div class="layout__item"><span class="label label--colored shape-circle--5px grey">18:50</span> recebt dining history</div>
                                        <div class="layout__item"><span class="label label--colored shape-circle green user-statistics__badge">1</span></div>
                                        <div class="layout__item">2</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <%--  /user-statistics__upcoming   --%>
                    </div>
                </div>
                <%--  /concat-main suffix   --%>
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
<style>

    .arc text {
        font: 10px sans-serif;
        text-anchor: middle;
    }

    .arc path {
        stroke: #fff;
    }

</style>
<script type="text/javascript">
    var width = 260,
            height = 260,
            radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 40);

    var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.population; });

    var svg = d3.select("#user-info__chart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.csv("/assets/static/data/chart/data.csv", type, function(error, data) {
        if (error) throw error;

        var g = svg.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc");

        g.append("path")
                .attr("d", arc)
                .style("fill", function(d) { return color(d.data.age); });

        g.append("text")
                .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                .attr("dy", ".35em")
                .text(function(d) { return d.data.age; });
    });

    function type(d) {
        d.population = +d.population;
        return d;
    }
</script>
