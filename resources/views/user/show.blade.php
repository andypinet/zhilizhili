@extends('base')

@section('content')
      <input type="file" class="form-control" id="movie" name="movie" placeholder="上传影片" value="">
      <input id="upload" type="button" value="上传影片">
    @if(count($userArticles))
        @foreach($userArticles as $userArticle)
            <h3><% $userArticle->title %></h3>
            <div><% $userArticle->text %></div>
            <div><% $userArticle->type %></div>
        @endforeach
    @endif
    <input id="token" type="hidden" value="<% csrf_token() %>">
  <script>
      var fileinput = document.querySelector('#movie');
      var tokenHiddenDom = document.querySelector('#token');

      document.querySelector('#upload').addEventListener('click', function(){
          var formdata = new FormData();
          var files = fileinput.files;
          for (var i = 0; i < files.length; i++) {
              formdata.append('movie', files[i]);
          }
          formdata.append('_token', tokenHiddenDom.value);

          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/user/upload');
          xhr.onload = function(e) {
              console.log(e);
          };
          xhr.onerror = function(e) {
              console.log(e);
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
