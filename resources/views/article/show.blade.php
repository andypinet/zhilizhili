@extends('base')

@section('content')
    <h3><a href=""><% $article->title %></a></h3>
    <div><% $article->text %></div>
    <div><% $article->type %></div>
@stop