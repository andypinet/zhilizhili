@extends('base')

@section('head')
    <link rel="stylesheet" href="/bower_components/editor.md/css/editormd.preview.css">
    <link rel="stylesheet" href="/css/article/show.css">
@stop

@section('content')
    <main>
        @can('edit_form')
        <a href="">编辑文章</a>
        @endcan
        <article class="markdown-body">
            <h3><a href=""><% $article->title %></a></h3>
            <div id="test-editormd-view2">
                <textarea id="append-test" style="display:none;">
                    <% $article->text %>
                </textarea>
            </div>
        </article>
    </main>
@stop

@section('script')
    <script src="/bower_components/jquery/dist/jquery.js"></script>
    <script src="/bower_components/editor.md/lib/marked.min.js"></script>
    <script src="/bower_components/editor.md/lib/prettify.min.js"></script>
    <script src="/bower_components/editor.md/lib/raphael.min.js"></script>
    <script src="/bower_components/editor.md/lib/underscore.min.js"></script>
    <script src="/bower_components/editor.md/lib/sequence-diagram.min.js"></script>
    <script src="/bower_components/editor.md/lib/flowchart.min.js"></script>
    <script src="/bower_components/editor.md/lib/jquery.flowchart.min.js"></script>
    <script src="/bower_components/editor.md/editormd.js"></script>
    <script>
        $(function(){
            testEditormdView2 = editormd.markdownToHTML("test-editormd-view2", {
                htmlDecode      : "style,script,iframe",  // you can filter tags decode
                emoji           : true,
                taskList        : true,
                tex             : true,  // 默认不解析
                flowChart       : true,  // 默认不解析
                sequenceDiagram : true,  // 默认不解析
            });
        });
    </script>
@stop