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
    <link rel="stylesheet" href="/assets/pc/css/ui/index.css?v=<% rand(0, 1000) %>">
    <script src="/assets/static/js/dom4.min.js"></script>
    <style>
        [compile] {
            opacity: 0;
        }

        [element="ui-select"][compile] {
            height: 60px;
        }
    </style>
</head>
<body>
    <section>
        <div element="ui-select" compile>
            <select>
                <option value="name1" selected>
                    name1
                </option>
                <option value="name2">
                    name2
                </option>
                <option value="name3">
                    name3
                </option>
            </select>
        </div>
        <form id="testForm" class="form">
            <div class="form__group">
                <div id="pat" class="form-field" data-regex="if: input, do: min(10) | max(15);"
                     v-on:regex-error="handleRegexError" v-on:regex-success="handleRegexSuccess" >
                    <input type="text">
                </div>
            </div>
            <div class="form__group">
                <div id="sat" class="form-field" data-regex="if: input, do: min(10) | max(15);"
                v-on:regex-error="handleRegexError" v-on:regex-success="handleRegexSuccess">
                    <input type="password">
                </div>
            </div>
            <div class="form__group">
                <div class="form-field">
                    <textarea name="" id=""></textarea>
                </div>
            </div>
            <div class="form__group">
                <div class="form-checkbox">
                    <input type="checkbox">
                    <div></div>
                </div>
            </div>
            <div class="form__group">
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
            <div class="form__group">
                <div element="ui-rangeslider" compile>
                    <input type="text">
                </div>
            </div>
            <div class="form__group">
                <div element="ui-select" compile>
                    <select>
                        <option value="name2" selected>
                            name2
                        </option>
                        <option value="name3">
                            name3
                        </option>
                        <option value="name4">
                            name4
                        </option>
                    </select>
                </div>
            </div>
            <div class="form__group">
                <button id="submit" type="submit" class="btn form__btn submit-btn">提交</button>
                <button type="reset" class="btn form__btn reset-btn">重置</button>
                <button type="button" class="btn form__btn">按钮</button>
            </div>
        </form>
    </section>
</body>
<script src="/assets/static/js/validator.min.js"></script>
<script src="/assets/static/js/vue.js"></script>
<script src="/assets/static/js/utils.js"></script>
<script src="/assets/static/js/easydom.js"></script>
<script src="/assets/pc/controller/ui/form.js"></script>
</html>