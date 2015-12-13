<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>API 测试</title>
</head>
<body>
<input id="text" type="text">
<button id="button">按钮</button>
</body>
<script>
    document.querySelector("#button").addEventListener("click", function(e) {
        if (document.querySelector("#text").value.trim() !== '') {
            alertText(document.querySelector("#text").value);
        } else {
            alertText("输入不能为空");
        }
    });

    function alertText(text) {
        alert(text);
    }
</script>
</html>