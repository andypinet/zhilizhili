@extends('base')

@section('content')
    <h3>修改文章</h3>
    {!! Form::model($article, ['method'=>'PATCH', 'url' => '/article/'.$article->id]) !!}
    <div class="form-group">
        {!! Form::label('title','标题:') !!}
        {!! Form::text('title',null,['class'=>'form-control']) !!}
    </div>
    <div class="form-group">
        {!! Form::label('text','正文:') !!}
        {!! Form::textarea('text',null,['class'=>'form-control']) !!}
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
@stop