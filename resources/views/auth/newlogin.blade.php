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
    <link rel="stylesheet" href="/assets/pc/css/auth/newlogin.css?v=<% rand(0, 1000) %>">
    <script src="/assets/static/js/dom4.min.js"></script>
    <!--[if lte IE 9]>
    <script src="/assets/static/js/placeholders.min.js"></script>
    <![endif]-->
</head>
<body class="auth-newlogin">
    <div class="center-set">
        <div class="center-set__item">
            <form id="loginForm" action="" class="form login-form">
                <div class="form__group">
                    <div id="email" class="form-field" data-regex="if: input, do: isEmail;"
                         v-on:regex-error="handleRegexError" v-on:regex-success="handleRegexSuccess" >
                        <input type="text" placeholder="Email">
                    </div>
                    <div class="tip">
                        <span class="icon"></span>
                    </div>
                </div>
                <div class="form__group">
                    <div id="password" class="form-field" data-regex="if: input, do: min(6) | max(15);"
                         v-on:regex-error="handleRegexError" v-on:regex-success="handleRegexSuccess">
                        <input type="password" placeholder="Password">
                    </div>
                    <div class="tip">
                        <span class="icon"></span>
                    </div>
                </div>
                <div class="form__group">
                    <button id="submit" type="submit" class="btn form__btn submit-btn">提交</button>
                </div>
                <div class="form__group">
                    <div class="center-set remeberme-set">
                        <div class="center-set__item">
                            <div class="form-checkbox">
                                <input type="checkbox">
                                <div></div>
                            </div>
                        </div>
                        <div class="center-set__item">
                            <span>keep me logged in</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</body>
<script src="/assets/static/js/validator.min.js"></script>
<script src="/assets/static/js/vue.js"></script>
<script src="/assets/pc/controller/auth/newlogin.js"></script>
</html>