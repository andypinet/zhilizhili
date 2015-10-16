@extends('base')

@section('content')
    <h3>撰写新文章</h3>
    {!! Form::open(['url' => '/article']) !!}
    {!! Form::hidden('user_id',$user_id,['class'=>'form-control']) !!}
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