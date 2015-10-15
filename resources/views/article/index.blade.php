@extends('base')

@section('content')
    @if(count($articles))
        @foreach($articles as $article)
            <h3><a href="<% url('article', $article->id) %>"><% $article->title %></a></h3>
            <div><% $article->text %></div>
            <div><% $article->type %></div>
        @endforeach
    @endif
@stop