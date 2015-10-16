@extends('base')

@section('content')
    <div>
        {!! Form::open(['url' => '/auth/register']) !!}
        <div class="form-group">
            {!! Form::label('name','Name:') !!}
            {!! Form::text('name',null,['class'=>'form-control']) !!}
        </div>
        <div class="form-group">
            {!! Form::label('email','Email:') !!}
            {!! Form::email('email',null,['class'=>'form-control']) !!}
        </div>
        <div class="form-group">
            {!! Form::label('password','Password:') !!}
            {!! Form::password('password',['class'=>'form-control']) !!}
        </div>
        <div class="form-group">
            {!! Form::label('password_confirmation','Password_confirmation:') !!}
            {!! Form::password('password_confirmation',['class'=>'form-control']) !!}
        </div>
        <div class="form-group">
            {!! Form::submit('注册',['class'=>'btn btn-success form-control']) !!}
        </div>
        {!! Form::close() !!}
    </div>
    @include('errors/listgroup')
@stop