@extends('base')

@section('content')
    <div>
        {!! Form::open(['url' => '/auth/login']) !!}
        <div class="form-group">
            {!! Form::label('email','Email:') !!}
            {!! Form::email('email',null,['class'=>'form-control']) !!}
        </div>
        <div class="form-group">
            {!! Form::label('password','Password:') !!}
            {!! Form::password('password',['class'=>'form-control']) !!}
        </div>
        <div class="form-group">
            {!! Form::submit('登陆',['class'=>'btn btn-success form-control']) !!}
        </div>
        {!! Form::close() !!}
    </div>
@stop