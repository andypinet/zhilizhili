@extends('base')

@section('head')
    <link rel="stylesheet" href="/css/app.css"/>
@stop

@section('content')
    <template id="app" is="dom-bind">
        <h1>zhilizhili beta</h1>
        @foreach($articles as $article)
            <div>
                <h3><% $article->title %></h3>
            </div>
        @endforeach
    </template>
@stop

@section('script')
    <script src="bower_components/TheaterJS/build/theater.js"></script>
    <script src="/controller/index/index.js"></script>
@stop