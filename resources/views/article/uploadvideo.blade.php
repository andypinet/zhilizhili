@extends('base')

@section('head')
    <link rel="import" href="/bower_components/iron-form/iron-form.html">
    <link rel="stylesheet" href="/css/article/create.css">
@stop

@section('content')
    <main>
        <h3>上传视频</h3>
        <form is="iron-form" id="uploadVideoForm" method="post" action="/form/handler">
            <input id="title" type="text" name="title" required>
            <input type="file" class="form-control" id="movie" name="movie" placeholder="上传影片" value="">
            {!! Form::select('type_id', $types , null , ['class' => 'form-control']) !!}
            <input id="upload" type="button" value="上传影片">
        </form>
    </main>

    <input id="token" type="hidden" value="<% csrf_token() %>">
@stop

@section('script')
    <script src="/bower_components/jquery/dist/jquery.js"></script>
    <script>
        var redirecturl = "<% url('/article/type') %>";

        var fileinput = document.querySelector('#movie');
        var tokenHiddenDom = document.querySelector('#token');
        var uploadVideoForm = document.querySelector('#uploadVideoForm');

        document.querySelector('#upload').addEventListener('click', function(){
            var formdata = new FormData();
            var files = fileinput.files;
            for (var i = 0; i < files.length; i++) {
                formdata.append('movie', files[i]);
            }
            var videoInfo = uploadVideoForm.serialize();
            for (var key in videoInfo) {
                if (key != 'movie') {
                    formdata.append(key, videoInfo[key]);
                }
            }
            formdata.append('_token', tokenHiddenDom.value);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/video/upload');
            xhr.onload = function(e) {
                if (this.status >= 200 && this.status < 400) {
                    // Success!
                    var data = JSON.parse(this.response);
                    if (data.upload == 'success') {
                        window.location = redirecturl + '/' + videoInfo['type_id'];
                    }
                } else {
                    // We reached our target server, but it returned an error

                }
            };
            xhr.onerror = function(e) {
            };

            xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    var complete = (e.loaded / e.total * 100 | 0);
                    console.log(complete);
                }
            };


            xhr.send(formdata);
        });
    </script>
@stop