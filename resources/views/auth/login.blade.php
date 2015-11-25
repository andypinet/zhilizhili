@extends('plain')

@section("head")
    <link rel="import" href="/assets/pc/elements/view-controller/view-controller.html">
    <link rel="import" href="/bower_components/paper-input/paper-input.html">
    <link rel="stylesheet" href="/assets/pc/css/layout.css"/>
    <link rel="stylesheet" href="/assets/pc/css/auth/login.css">
@endsection

@section('content')
    <view-controller id="index">
        <div class="full-fixed body-background">
        </div>
        <div class="layout horizontal center-center full-parent">
            <div class="login-form">
                {!! Form::open(['url' => '/auth/login']) !!}
                <div class="form-group">
                    <paper-input label="Email" name="email" type="email"></paper-input>
                </div>
                <div class="form-group">
                    <paper-input label="Password" name="password" type="password"></paper-input>
                </div>
                <div class="form-group">
                    <paper-button class="login-form__btn" raised>
                        {!! Form::submit('登陆',['class'=>'login-form__submit-btn']) !!}
                    </paper-button>
                </div>
                {!! Form::close() !!}
            </div>
        </div>
    </view-controller>
@stop

@section('script')
    <script src="/assets/pc/controller/auth/login.js"></script>
@endsection