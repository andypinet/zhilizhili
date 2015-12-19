<!doctype html>
<!--[if IE 8 ]><html class="ie8" lang="zh-cn"><![endif]-->
<!--[if IE 9 ]><html class="ie9" lang="zh-cn"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html class="" lang="zh-cn"><!--<![endif]-->
<head>
    <meta charset="UTF-8">
    <meta http-eq\v="X-UA-Compatible" content="IE=EDGE" />
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/static/css/normalize.css">
    <link rel="stylesheet" href="/assets/pc/css/ui/index.css?v=<% rand(0, 1000) %>">
</head>
<body>
    <div class="main-menu">
        <div class="layout full-parent">
            <div class="float-left">
                <div class="center-set">
                    <div class="center-set__item">
                        <div class="main-menu__brand">
                            <a class="link" href=""><img src="/assets/static/img/bussolini.com.png" alt=""></a>
                        </div>
                    </div>
                    <div class="center-set__item">
                        <div class="main-menu__action">
                            <ul class="nav">
                                <li class="nav__item">
                                    <div class="center-set">
                                        <div class="center-set__item">
                                            <a class="link" href="">Home</a>
                                        </div>
                                    </div>
                                </li>
                                <li class="nav__item">
                                    <div class="center-set">
                                        <div class="center-set__item">
                                            <a class="link" href="">about</a>
                                        </div>
                                    </div>
                                </li>
                                <li class="nav__item">
                                    <div class="center-set">
                                        <div class="center-set__item">
                                            <a class="link" href="">Portfolio</a>
                                        </div>
                                    </div>
                                </li>
                                <li class="nav__item">
                                    <div class="center-set">
                                        <div class="center-set__item">
                                            <a class="link" href="">services</a>
                                        </div>
                                    </div>
                                </li>
                                <li class="nav__item">
                                    <div class="center-set">
                                        <div class="center-set__item">
                                            <a class="link" href="">services</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <%-- /float-left --%>
            <div class="pull-right">
                <div class="main-menu__addons">
                    <div class="center-set">
                        <div class="center-set__item">
                            <form class="form">
                                <div class="form-group search-box">
                                    <input class="form-control" type="text">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <%-- /pull-right --%>
        </div>
    </div>
    <%-- /main-menu --%>
    <section>
        <div class="popover bottom popover-dark popover-debug">
            <div class="arrow"></div>
            <div class="popover-content">
                <ul class="list-group list-group--dark">
                    <li class="list-group__item">MENU 1</li>
                    <li class="list-group__item active">MENU 2</li>
                    <li class="list-group__item">MENU 3</li>
                </ul>
            </div>
        </div>
    </section>
    <section>
        <div class="sort-dropdown">
            <div class="sort-dropdown__toggle">
                <div class="layout full-parent">
                    <div class="layout-inner">
                        SORT BY
                        <div class="pull-right icon icon-angle-down"></div>
                    </div>
                </div>
            </div>
            <div class="sort-dropdown__content">
                <ul class="list-group list-group--dark">
                    <li class="list-group__item">Name</li>
                    <li class="list-group__item">Added</li>
                    <li class="list-group__item">Price</li>
                    <li class="list-group__item">Size</li>
                </ul>
            </div>
        </div>
    </section>
    <section>
        <div class="light-box light-box--dark">
            <div class="light-box__header">
                <div class="light-box__close-btn">
                    <div class="icon icon-close"></div>
                </div>
            </div>
            <div class="light-box__body">
                <div>Are you sure want to quit</div>
            </div>
            <div class="light-box__footer">
                <div class="btn light-box__ok-btn">quit</div>
                <div class="btn light-box__cancel-btn">cancel</div>
            </div>
        </div>
    </section>
    <section>
        <div class="video video--dark">
            <video src="">
            </video>
            <div class="video__toggle-btn">
                <div class="icon icon-play"></div>
            </div>
            <div class="video__control">
                <div class="center-set">
                    <div class="center-set__item video__play-btn">
                        <div class="icon icon-play"></div>
                    </div>
                    <div class="center-set__item video__prev-btn">
                        <div class="icon icon-arrow-left"></div>
                    </div>
                    <div class="center-set__item video__current-time">
                        <span>0:15</span>
                    </div>
                    <div class="center-set__item video__time-line">
                        <span>timeline</span>
                    </div>
                    <div class="center-set__item video__total-time">
                        <span>20:12</span>
                    </div>
                    <div class="center-set__item video__next-btn">
                        <div class="icon icon-arrow-right"></div>
                    </div>
                    <div class="center-set__item video__voice">
                        <div class="icon icon-volume-up"></div>
                    </div>
                    <div class="center-set__item video__full-screen">
                        <div class="icon icon-expand"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="weather-report">
            <div class="weather-report__head">
                <div class="weather-report__bg"></div>
                <div class="weather-report__info">
                    <div class="weather-report__icon">
                        <img src="/assets/static/img/cloud&sun-icon.png" alt="">
                    </div>
                    <div class="weather-report__temperature">
                        24 c
                    </div>
                    <div class="weather-report__state">
                        cloudy & sunny
                    </div>
                </div>
            </div>
            <div class="weather-report__body">
                <div class="center-set">
                    <div class="center-set__item">
                        <div class="weather-report__info">
                            <div class="weather-report__temperature">
                                24 c
                            </div>
                            <div class="weather-report__icon">
                                <img src="/assets/static/img/thunder-icon.png" alt="">
                            </div>
                            <div class="weather-report__state">
                                cloudy & sunny
                            </div>
                        </div>
                    </div>
                    <div class="center-set__item">
                        <div class="weather-report__info">
                            <div class="weather-report__temperature">
                                24 c
                            </div>
                            <div class="weather-report__icon">
                                <img src="/assets/static/img/rain.png" alt="">
                            </div>
                            <div class="weather-report__state">
                                cloudy & sunny
                            </div>
                        </div>
                    </div>
                    <div class="center-set__item">
                        <div class="weather-report__info">
                            <div class="weather-report__temperature">
                                24 c
                            </div>
                            <div class="weather-report__icon">
                                <img src="/assets/static/img/cloud.png" alt="">
                            </div>
                            <div class="weather-report__state">
                                cloudy & sunny
                            </div>
                        </div>
                    </div>
                    <div class="center-set__item">
                        <div class="weather-report__info">
                            <div class="weather-report__temperature">
                                24 c
                            </div>
                            <div class="weather-report__icon">
                                <img src="/assets/static/img/cloud&sun.png" alt="">
                            </div>
                            <div class="weather-report__state">
                                cloudy & sunny
                            </div>
                        </div>
                    </div>
                    <div class="center-set__item">
                        <div class="weather-report__info">
                            <div class="weather-report__temperature">
                                24 c
                            </div>
                            <div class="weather-report__icon">
                                <img src="/assets/static/img/wind.png" alt="">
                            </div>
                            <div class="weather-report__state">
                                cloudy & sunny
                            </div>
                        </div>
                    </div>
                    <div class="center-set__item">
                        <div class="weather-report__info">
                            <div class="weather-report__temperature">
                                24 c
                            </div>
                            <div class="weather-report__icon">
                                <img src="/assets/static/img/sun.png" alt="">
                            </div>
                            <div class="weather-report__state">
                                cloudy & sunny
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="icon-btn">
            <div class="icon icon-qq"></div>
        </div>
        <div class="icon-btn">
            <div class="icon icon-weixin"></div>
        </div>
        <div class="icon-btn">
            <div class="icon icon-weibo"></div>
        </div>
    </section>
    <section>
        <div class="subscribe">
            <div class="layout full-parent left-and-right">
                <div class="float-left">
                    <div class="center-set subscribe__icons">
                        <div class="center-set__item">
                            <div class="icon-btn">
                                <div class="icon icon-weixin"></div>
                            </div>
                        </div>
                        <div class="center-set__item">
                            <div class="icon-btn">
                                <div class="icon icon-weixin"></div>
                            </div>
                        </div>
                        <div class="center-set__item">
                            <div class="icon-btn">
                                <div class="icon icon-weixin"></div>
                            </div>
                        </div>
                        <div class="center-set__item">
                            <div class="icon-btn">
                                <div class="icon icon-weixin"></div>
                            </div>
                        </div>
                        <div class="center-set__item">
                            <div class="icon-btn">
                                <div class="icon icon-weixin"></div>
                            </div>
                        </div>
                        <div class="center-set__item">
                            <div class="icon-btn">
                                <div class="icon icon-weixin"></div>
                            </div>
                        </div>
                    </div>
                    <div class="pull-right">
                        <div class="center-set subscribe__addons">
                            <div class="center-set__item">
                                input
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="stats stats--dark">
            <div class="stats__head">
                <h3>
                    stats
                    <span class="sub-header">
                        last 30 days
                    </span>
                </h3>
            </div>
            <div class="stats__body">
                <div class="center-set">
                    <div class="center-set__item">
                        <div class="number">7205</div>
                        <div class="info">visit</div>
                    </div>
                    <div class="center-set__item">
                        <div class="number">563</div>
                        <div class="info">visit</div>
                    </div>
                    <div class="center-set__item">
                        <div class="number">180</div>
                        <div class="info">comment</div>
                    </div>
                    <div class="center-set__item">
                        <div class="number">869</div>
                        <div class="info">download</div>
                    </div>
                    <div class="center-set__item">
                        <div class="number">702</div>
                        <div class="info">share</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="card card--dark">
            <div class="card__body">
                <div class="list-group">
                    <div class="list-group__item">
                        <div class="layout full-parent custom">
                            <div class="float-left">
                                turn on switch menu
                                <div class="float-right">
                                    <div class="switch">
                                        <label><input type="checkbox" class="ios-switch" checked /><div><div></div></div></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list-group__item">
                        <div class="layout full-parent custom">
                            <div class="float-left">
                                turn off switch menu
                                <div class="float-right">
                                    <div class="switch">
                                        <label><input type="checkbox" class="ios-switch" /><div><div></div></div></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <nav>
            <ul class="pagination pagination--dark">
                <li class="pagination__item prev">
                    <a class="pagination__link" href="#" aria-label="Previous">
                        <span class="icon icon-angle-left"></span>
                    </a>
                </li>
                <li class="pagination__item"><a class="pagination__link" href="#">1</a></li>
                <li class="pagination__item active"><a class="pagination__link" href="#">2</a></li>
                <li class="pagination__item"><a class="pagination__link" href="#">3</a></li>
                <li class="pagination__item"><a class="pagination__link" href="#">4</a></li>
                <li class="pagination__item"><a class="pagination__link" href="#">5</a></li>
                <li class="pagination__item next">
                    <a class="pagination__link" href="#" aria-label="Next">
                        <span class="icon icon-angle-right"></span>
                    </a>
                </li>
            </ul>
        </nav>
    </section>
    <section>
        <nav>
            <ul class="pagination pagination--custom pagination--dark">
                <li class="pagination__item prev">
                    <a class="pagination__link" href="#" aria-label="Previous">
                        <span class="center-set"><span class="center-set__item"><span class="icon icon-angle-left"></span></span><span
                                    class="center-set__item"><span>previous</span></span></span>
                    </a>
                </li>
                <li class="pagination__item next">
                    <a class="pagination__link" href="#" aria-label="Next">
                        <span class="center-set"><span class="center-set__item"><span>next</span></span><span
                                    class="center-set__item"><span class="icon icon-angle-right"></span></span></span>
                    </a>
                </li>
            </ul>
        </nav>
    </section>
    <section>
        <div class="audio audio--dark">
            <audio src="">
            </audio>
            <div class="audio__poster">
                poster
            </div>
            <div class="audio__control">
                <div class="center-set audio__time">
                    <div class="center-set__item audio__current-time">
                        <span>0:15</span>
                    </div>
                    <div class="center-set__item audio__total-time">
                        <span>20:12</span>
                    </div>
                </div>
                <div class="center-set">
                    <div class="center-set__item audio__time-line">
                        <span>timeline</span>
                    </div>
                </div>
                <div class="center-set audio__action">
                    <div class="center-set__item audio__loop-btn">
                        <div class="icon-btn">
                            <span class="icon icon-random"></span>
                        </div>
                    </div>
                    <div class="center-set__item audio__prev-btn">
                        <div class="icon-btn">
                            <span class="icon icon-arrow-left"></span>
                        </div>
                    </div>
                    <div class="center-set__item audio__play-btn">
                        <div class="icon-btn">
                            <span class="icon icon-play"></span>
                        </div>
                    </div>
                    <div class="center-set__item audio__next-btn">
                        <div class="icon-btn">
                            <span class="icon icon-arrow-right"></span>
                        </div>
                    </div>
                    <div class="center-set__item audio__voice">
                        <div class="icon-btn">
                            <span class="icon icon-volume-up"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="card card--dark">
            <div class="card__body">
                <div class="toast toast--dark">
                    <div class="toast__head">
                        <div class="layout full-parent left-and-right">
                            <div class="float-left">
                                <div class="toast__title">
                                    one msg
                                </div>
                                <div class="pull-right">
                                    <div class="toast__addons">
                                        <div class="time">Apr 30</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="toast__body">
                        <div class="toast__msg">
                            App recets
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="select-dropdown select-dropdown--dark">
            <div class="select-dropdown__toggle">
                <div class="layout new-left-right full-parent">
                    <div class="float-left">
                        <div class="center-set">
                            <div class="center-set__item">
                                last result
                            </div>
                        </div>
                        <div class="float-right">
                            <div class="icon-btn icon-btn--block">
                                <div class="icon icon-angle-up"></div>
                                <div class="icon icon-angle-down"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="select-dropdown__list">
                <div class="list-group">
                    <div class="list-group__item">result 1</div>
                    <div class="list-group__item">result 2</div>
                    <div class="list-group__item">result 3</div>
                    <div class="list-group__item">result 4</div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="tab tab--custom tab--dark">
            <ul class="nav tab__nav">
                <li class="tab__navitem active">article 1</li>
                <li class="tab__navitem">article 2</li>
                <li class="tab__navitem">article 3</li>
            </ul>
            <div class="tab__content">
                <div class="tab__contentitem active">
                    asdsdsdsdsdsds
                </div>
                <div class="tab__contentitem">
                    sdsdsdsdsdsdsds
                </div>
                <div class="tab__contentitem">
                    sdsdsdsdsdsdsds
                </div>
            </div>
        </div>
    </section>
    <sectionn>
        <div class="accordion">
            <div class="dropdown carousel active">
                <div class="dropdown__toggle">
                    <div class="layout new-left-right full-parent">
                        <div class="float-left">
                            <div class="center-set">
                                <div class="center-set__item">
                                    last result
                                </div>
                            </div>
                            <div class="float-right">
                                <div class="icon-btn icon-btn--block">
                                    <div class="icon icon-angle-up"></div>
                                    <div class="icon icon-angle-down"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dropdown__list">
                    <div class="card">
                        <div class="card__body">
                            casdsdsds
                        </div>
                    </div>
                </div>
            </div>
            <div class="dropdown carousel">
                <div class="dropdown__toggle">
                    <div class="layout new-left-right full-parent">
                        <div class="float-left">
                            <div class="center-set">
                                <div class="center-set__item">
                                    last result
                                </div>
                            </div>
                            <div class="float-right">
                                <div class="icon-btn icon-btn--block">
                                    <div class="icon icon-angle-up"></div>
                                    <div class="icon icon-angle-down"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dropdown__list">
                    <div class="card">
                        <div class="card__body">
                            casdsdsds
                        </div>
                    </div>
                </div>
            </div>
            <div class="dropdown carousel">
                <div class="dropdown__toggle">
                    <div class="layout new-left-right full-parent">
                        <div class="float-left">
                            <div class="center-set">
                                <div class="center-set__item">
                                    last result
                                </div>
                            </div>
                            <div class="float-right">
                                <div class="icon-btn icon-btn--block">
                                    <div class="icon icon-angle-up"></div>
                                    <div class="icon icon-angle-down"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dropdown__list">
                    <div class="card">
                        <div class="card__body">
                            casdsdsds
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </sectionn>
</body>
</html>