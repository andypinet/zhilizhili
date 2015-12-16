<!doctype html>
<!--[if IE 8 ]><html class="ie8" lang="zh-cn"><![endif]-->
<!--[if IE 9 ]><html class="ie9" lang="zh-cn"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html class="" lang="zh-cn"><!--<![endif]-->
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/static/css/normalize.css">
    <link rel="stylesheet" href="/assets/pc/css/ui/common.css?v=<% rand(0, 1000) %>">
    <script src="/assets/static/js/dom4.min.js"></script>
    <!--[if lte IE 9]>
    <script src="/assets/static/js/placeholders.min.js"></script>
    <![endif]-->
</head>
<body class="ui-common">
    <section>
        <div class="calendar">
            <div class="calendar__head">
                <div class="center-set table">
                    <div class="center-set__item">
                        <div class="calendar__prev">
                            <span class="icon icon-angle-left"></span>
                        </div>
                    </div>
                    <div class="center-set__item">
                        <div class="calendar__month">JANUARY</div>
                        <div class="calendar__year">2014</div>
                    </div>
                    <div class="center-set__item">
                        <div class="calendar__next">
                            <span class="icon icon-angle-right"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calendar__body">
                <div class="calendar__mode-day">
                    <table>
                        <tr>
                            <th class="calendar__item calendar__indicator">S</th>
                            <th class="calendar__item calendar__indicator">M</th>
                            <th class="calendar__item calendar__indicator">T</th>
                            <th class="calendar__item calendar__indicator">W</th>
                            <th class="calendar__item calendar__indicator">T</th>
                            <th class="calendar__item calendar__indicator">F</th>
                            <th class="calendar__item calendar__indicator">S</th>
                        </tr>
                        <tr>
                            <td class="calendar__item calendar__day calendar__item--prev-month">30</td>
                            <td class="calendar__item calendar__day calendar__item--prev-month">31</td>
                            <td class="calendar__item calendar__day">1</td>
                            <td class="calendar__item calendar__day">2</td>
                            <td class="calendar__item calendar__day">3</td>
                            <td class="calendar__item calendar__day">4</td>
                            <td class="calendar__item calendar__day">5</td>
                        </tr>
                        <tr>
                            <td class="calendar__item calendar__day">6</td>
                            <td class="calendar__item calendar__day">7</td>
                            <td class="calendar__item calendar__day">8</td>
                            <td class="calendar__item calendar__day">9</td>
                            <td class="calendar__item calendar__day">10</td>
                            <td class="calendar__item calendar__day">11</td>
                            <td class="calendar__item calendar__day">12</td>
                        </tr>
                        <tr>
                            <td class="calendar__item calendar__day">13</td>
                            <td class="calendar__item calendar__day">14</td>
                            <td class="calendar__item calendar__day">15</td>
                            <td class="calendar__item calendar__day calendar__item--current-day">16</td>
                            <td class="calendar__item calendar__day">17</td>
                            <td class="calendar__item calendar__day">18</td>
                            <td class="calendar__item calendar__day">19</td>
                        </tr>
                        <tr>
                            <td class="calendar__item calendar__day">20</td>
                            <td class="calendar__item calendar__day">21</td>
                            <td class="calendar__item calendar__day">22</td>
                            <td class="calendar__item calendar__day">23</td>
                            <td class="calendar__item calendar__day">24</td>
                            <td class="calendar__item calendar__day">25</td>
                            <td class="calendar__item calendar__day">26</td>
                        </tr>
                        <tr>
                            <td class="calendar__item calendar__day">27</td>
                            <td class="calendar__item calendar__day">28</td>
                            <td class="calendar__item calendar__day">29</td>
                            <td class="calendar__item calendar__day">30</td>
                            <td class="calendar__item calendar__day">31</td>
                            <td class="calendar__item calendar__day calendar__item--next-month">1</td>
                            <td class="calendar__item calendar__day calendar__item--next-month">2</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="calendar">
            <div class="calendar__head">
                <div class="center-set table">
                    <div class="center-set__item">
                        <div class="calendar__prev">
                            <span class="icon icon-angle-left"></span>
                        </div>
                    </div>
                    <div class="center-set__item">
                        <div class="calendar__month">JANUARY</div>
                        <div class="calendar__year">2014</div>
                    </div>
                    <div class="center-set__item">
                        <div class="calendar__next">
                            <span class="icon icon-angle-right"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calendar__body">
                <div class="calendar__mode-month">
                    <div element="ui-stackview">
                        <ul class="list-group list-group--custom" ui-stackview-render="true">
                            <li class="list-group__item list-group__item--top">
                                <div class="text">1</div>
                            </li>
                            <li class="list-group__item">
                                <div class="text">2</div>
                            </li>
                            <li class="list-group__item">
                                <div class="text">3</div>
                            </li>
                            <li class="list-group__item">
                                <div class="text">4</div>
                            </li>
                            <li class="list-group__item">
                                <div class="text">5</div>
                            </li>
                            <li class="list-group__item">
                                <div class="text">6</div>
                            </li>
                            <li class="list-group__item">
                                <div class="text">7</div>
                            </li>
                            <li class="list-group__item">
                                <div class="text">8</div>
                            </li>
                            <li class="list-group__item">
                                <div class="text">9</div>
                            </li>
                            <li class="list-group__item">
                                <div class="text">10</div>
                            </li>
                            <li class="list-group__item">
                                <div class="text">11</div>
                            </li>
                            <li class="list-group__item">
                                <div class="text">12</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="calendar">
            <div class="calendar__head">
                <div class="center-set table">
                    <div class="center-set__item">
                        <div class="calendar__prev">
                            <span class="icon icon-angle-left"></span>
                        </div>
                    </div>
                    <div class="center-set__item">
                        <div class="calendar__month">JANUARY</div>
                        <div class="calendar__year">2014</div>
                    </div>
                    <div class="center-set__item">
                        <div class="calendar__next">
                            <span class="icon icon-angle-right"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="calendar__body">
                <div class="calendar__mode-year">
                    <div element="ui-stackview">
                        <ul class="list-group list-group--custom" ui-stackview-render="true">
                            @for($i = 1970; $i < 2023; $i++)
                                @if($i == 2015)
                                    <li class="list-group__item list-group__item--top">
                                        <div class="text"><% $i %></div>
                                    </li>
                                @else
                                    <li class="list-group__item">
                                        <div class="text"><% $i %></div>
                                    </li>
                                @endif
                            @endfor
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <button id="prev">上一首</button>
        <button id="next">下一首</button>
    </section>
</body>
<script src="/assets/static/js/validator.min.js"></script>
<script src="/assets/static/js/vue.js"></script>
<script src="/assets/static/js/utils.js"></script>
<script src="/assets/static/js/easydom.js"></script>
<script src="/assets/pc/controller/ui/common.js"></script>
<script>
    // Todo utils.dom.toggleClass
</script>
</html>