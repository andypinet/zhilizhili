@extends('base')

@section('content')
    @if(count($userArticles))
        @foreach($userArticles as $userArticle)
            <h3><% $userArticle->title %></h3>
            <div><% $userArticle->text %></div>
            <div><% $userArticle->type %></div>
        @endforeach
    @endif
@stop