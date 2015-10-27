@extends('base')

@section('content')
    <h1><% $owneruser->name %>的空间</h1>
    <input type="file" class="form-control" id="movie" name="movie" placeholder="上传影片" value="">
    <input id="upload" type="button" value="上传影片">
    @can('isSelf', $owneruser)
    <h3>未审核通过</h3>
    @if(count($userUnCheckArticles))
        @foreach($userUnCheckArticles as $userUnCheckArticle)
            <a href="<% url('article', $userUnCheckArticle->id) %>"><% $userUnCheckArticle->title %></a>
            <div><% $userUnCheckArticle->text %></div>
            <div><% $userUnCheckArticle->type %></div>
        @endforeach
    @endif
    @endcan
    <h3>已审核通过</h3>
    @if(count($userCheckedArticles))
        @foreach($userCheckedArticles as $userCheckedArticle)
            <a href="<% url('article', $userCheckedArticle->id) %>"><% $userCheckedArticle->title %></a>
            <div><% $userCheckedArticle->text %></div>
            <div><% $userCheckedArticle->type %></div>
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
