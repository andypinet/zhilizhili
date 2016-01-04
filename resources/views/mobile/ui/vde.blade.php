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
    <main id="app">
        <h1>Hello App!</h1>
        <p>
            <!-- 使用指令 v-link 进行导航。 -->
            <a v-link="{ path: '/foo' }">Go to Foo</a>
            <a v-link="{ path: '/bar' }">Go to Bar</a>
        </p>
        <!-- 路由外链 -->
        <router-view></router-view>
    </main>
</body>
<script src="/assets/mobile/controller/ui/vde.js"></script>
</html>