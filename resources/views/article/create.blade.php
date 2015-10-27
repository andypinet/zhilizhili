@extends('base')

@section('head')
    <link rel="stylesheet" href="/bower_components/editor.md/css/editormd.css">
    <link rel="stylesheet" href="/css/article/create.css">
@stop

@section('content')
    <main>
        <h3>撰写新文章</h3>

        {!! Form::open(['url' => '/article']) !!}
        {!! Form::hidden('user_id',$user_id,['class'=>'form-control']) !!}
        <div class="form-group">
            {!! Form::label('title','标题:') !!}
            {!! Form::text('title',null,['class'=>'form-control']) !!}
        </div>
        <div class="form-group">
            {!! Form::label('slug','简介:') !!}
            {!! Form::textarea('slug',null) !!}
        </div>
        <div class="form-group">
            {!! Form::label('text','正文:') !!}
            <div id="test-editormd">
                {!! Form::textarea('text',null) !!}
            </div>
        </div>
        <div class="form-group">
            {!! Form::select('type_id', $types, null , ['class' => 'form-control']) !!}
        </div>
        <div class="form-group">
            {!! Form::label('published_at','发布时间:') !!}
            {!! Form::input('date','published_at',date('Y-m-d'),['class'=>'form-control']) !!}
        </div>
        <div class="form-group">
            {!! Form::submit('发表文章',['class'=>'btn btn-success form-control']) !!}
        </div>
        {!! Form::close() !!}
        @include('errors/listgroup')
    </main>
@stop

@section('script')
    <script src="/bower_components/jquery/dist/jquery.js"></script>
    <script src="/bower_components/editor.md/editormd.js"></script>
    <script>
        testEditor = editormd("test-editormd", {
            width   : "90%",
            height  : 640,
            syncScrolling : "single",
            path    : "/bower_components/editor.md/lib/"
        });
    </script>
@stop