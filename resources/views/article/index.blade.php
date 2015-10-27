@extends('base')

@section('head')
    <link rel="import" href="/bower_components/iron-selector/iron-selector.html">
@stop

@section('content')
    @if(count($types))
        @foreach($types as $type)
            <a href="<% url('article/type', $type->id) %>"><% $type->label %></a>
        @endforeach
    @endif
    @if(count($articles))
        @foreach($articles as $article)
            <h3><a href="<% url('article', $article->id) %>"><% $article->title %></a></h3>
            <div><% $article->slug %></div>
        @endforeach
        <iron-selector selected="<% $articles->currentPage() - 1 %>">
            @for ($i = 0; $i < $articles->lastPage(); $i++)
                <a href="<% url('article/type', $type_id).'?page='.($i+1) %>"><% $i + 1 %></a>
            @endfor
        </iron-selector>
        <span>共<% $articles->total() %>篇</span>
    @else
        我们还没有发布一篇文章
    @endif
@stop