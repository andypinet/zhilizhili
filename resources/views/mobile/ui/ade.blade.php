<!doctype html>
<html class="" lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=EDGE" />
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Mobile Component</title>

    <link rel="stylesheet" href="/assets/static/css/normalize.css">
    <link rel="stylesheet" href="/assets/mobile/css/ui/tde.css?v=<% rand(0, 1000) %>">
    <script src="/assets/static/js/dom4.min.js"></script>
    <!--[if lte IE 10]>
    <script src="/assets/static/js/placeholders.min.js"></script>
    <![endif]-->
</head>
<body class="ui-tde dark-style">
    <main ms-controller="test">
        <table width="100%" height="300">
            <tr>
                <td width="250">
                    <ul>
                        <li><a href="#!/aaa">aaa</a></li>
                        <li><a href="#!/bbb?uu=3445345&were=4324">bbb</a></li>
                        <li><a href="#!/ccc/etretr">ccc</a></li>
                        <li><a href="#!/ddd/2014-09-19">ddd</a></li>
                        <li><a href="#!/eee/2222">eee</a></li>
                        <li><a href="#!/fff?a=1&nn=4&dfg=676">fff</a></li>
                    </ul>
                </td>
                <td>
                    <div style="color:red">this.path: {{currPath}}</div>
                    <div style="color:blue">arguments: {{args}}</div>
                    <fieldset>
                        <legend>this.params</legend>
                        <ol>
                            <li ms-repeat="params"> {{$key}}: {{$val}}</li>
                        </ol>
                    </fieldset>
                    <fieldset>
                        <legend>this.query</legend>
                        <ol>
                            <li ms-repeat="query"> {{$key}}: {{$val}}</li>
                        </ol>
                    </fieldset>
                </td>
            </tr>
        </table>
        <div style="height: 600px;width:1px;">

        </div>
        <p id="fff">会定位到这里</p>
    </main>
</body>
<script src="/assets/mobile/lib/avalon.mobile.js"></script>
<script>
    require(["mmRouter"], function() {
        var model = avalon.define({
            $id: "test",
            currPath: "",
            params: {},
            query: {},
            args: "[]"
        });
        function callback() {
            model.currPath = this.path;
            var params = this.params;
            if ("time" in params) {
                params.time = avalon.filters.date(params.time, "yyyy年M月dd日");
            }
            model.params = params;
            model.query = this.query;
            model.args = "[" + [].slice.call(arguments, 0) + "]";
        }
        avalon.router.get("/aaa/", callback);
        avalon.router.get("/bbb", callback);
        avalon.router.get("/ccc/:ccc", callback);
        avalon.router.get("/ddd/{time:date}/", callback);
        avalon.router.get("/eee/{count:\\d{4}}/", callback);
        avalon.router.get("/fff", callback);
        avalon.history.start({
            basepath: "/wex/atc"
        });
        avalon.scan()
    });
</script>
</html>