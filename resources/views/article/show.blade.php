@extends('base')

@section('head')
    <link rel="stylesheet" href="">
@stop

@section('content')
    @can('edit_form')
    <a href="">编辑文章</a>
    @endcan
    <h3><a href=""><% $article->title %></a></h3>
    <div><% $article->text %></div>
    <div><% $article->type %></div>
@stop