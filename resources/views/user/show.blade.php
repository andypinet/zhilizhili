@extends('base')

@section('content')
    <h1><% $owneruser->name %>的空间</h1>
    @can('isSelf', $owneruser)
    <h3>未审核通过</h3>
    @if(count($userUnCheckArticles))
        @foreach($userUnCheckArticles as $userUnCheckArticle)
            <div>
                <div><% $userUnCheckArticle->title %></div>
                <div><a href="<% url('article', $userUnCheckArticle->id).'/edit' %>">编辑</a></div>
            </div>
        @endforeach
    @endif
    @endcan
    <h3>已审核通过</h3>
    @if(count($userCheckedArticles))
        @foreach($userCheckedArticles as $userCheckedArticle)
            <a href="<% url('article', $userCheckedArticle->id) %>"><% $userCheckedArticle->title %></a>
            <div><% $userCheckedArticle->slug %></div>
            <div><a href="<% url('article', $userCheckedArticle->id).'/edit' %>">编辑</a></div>
        @endforeach
    @endif
@stop
