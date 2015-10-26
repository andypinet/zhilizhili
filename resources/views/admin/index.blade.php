@extends('base')

@section('head')
    <link rel="import" href="/bower_components/paper-drawer-panel/paper-drawer-panel.html">
    <link rel="import" href="/bower_components/paper-scroll-header-panel/paper-scroll-header-panel.html">
    <link rel="import" href="/bower_components/paper-button/paper-button.html">
    <link rel="import" href="/bower_components/iron-icons/iron-icons.html">
    <link rel="import" href="/bower_components/paper-toolbar/paper-toolbar.html">
    <link rel="import" href="/bower_components/paper-item/paper-item.html">
    <link rel="import" href="/bower_components/paper-menu/paper-menu.html">
    <link rel="import" href="/bower_components/paper-icon-button/paper-icon-button.html">
    <link rel="import" href="/bower_components/paper-menu/paper-submenu.html">
@stop

@section('content')
    <paper-drawer-panel>
        <paper-scroll-header-panel class="flex" drawer>
            <paper-toolbar>
                <div>zhilizhili</div>
            </paper-toolbar>
            <paper-menu>
                <paper-submenu>
                    <paper-item class="menu-trigger">Topics</paper-item>
                    <paper-menu class="menu-content">
                        <paper-item>Topic 1</paper-item>
                        <paper-item>Topic 2</paper-item>
                        <paper-item>Topic 3</paper-item>
                    </paper-menu>
                </paper-submenu>
                <paper-submenu>
                    <paper-item class="menu-trigger">Faves</paper-item>
                    <paper-menu class="menu-content">
                        <paper-item>Fave 1</paper-item>
                        <paper-item>Fave 2</paper-item>
                    </paper-menu>
                </paper-submenu>
                <paper-submenu disabled>
                    <paper-item class="menu-trigger">Unavailable</paper-item>
                    <paper-menu class="menu-content">
                        <paper-item>Disabled 1</paper-item>
                        <paper-item>Disabled 2</paper-item>
                    </paper-menu>
                </paper-submenu>
            </paper-menu>
        </paper-scroll-header-panel>
        <paper-scroll-header-panel class="flex" main>
            <paper-toolbar>
                <paper-icon-button icon="menu" paper-drawer-toggle></paper-icon-button>
                <div>content</div>
            </paper-toolbar>
            @if(count($articles))
                @foreach($articles as $article)
                    <h3><a href="<% url('article', $article->id) %>"><% $article->title %></a></h3>
                    <div><% $article->slug %></div>
                @endforeach
                <iron-selector selected="<% $articles->currentPage() - 1 %>">
                    @for ($i = 0; $i < $articles->lastPage(); $i++)
                        <a href="<% url('article?page='.($i + 1)) %>"><% $i + 1 %></a>
                    @endfor
                </iron-selector>
                <span>共<% $articles->total() %>篇</span>
            @else
                我们还没有发布一篇文章
            @endif
        </paper-scroll-header-panel>
    </paper-drawer-panel>
@stop