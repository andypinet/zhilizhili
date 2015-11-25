@extends('plain')

@section("head")
    <link rel="import" href="/assets/pc/elements/view-controller/view-controller.html">
    <link rel="import" href="/bower_components/paper-input/paper-input.html">
    <link rel="stylesheet" href="/assets/pc/css/layout.css"/>
    <link rel="stylesheet" href="/assets/pc/css/auth/register.css">
@endsection

@section('content')
    <view-controller id="index">
        <div class="full-fixed body-background">
        </div>
        <div class="layout horizontal center-center full-parent">
            <div class="register-form register-form--default">
                {!! Form::open(['url' => '/auth/register']) !!}
                <div class="form-group">
                    <paper-input id="name" label="Name (由汉字, 字母, 数字组成 长度3到12位)" name="name" type="text" data-required-message="为什么不写名字呢" data-pattern-message="由汉字, 字母, 数字组成 长度3到12位" pattern="([\u4e00-\u9fa5\w]){3,12}" required></paper-input>
                </div>
                <div class="form-group">
                    <paper-input label="Email" name="email" type="email" required></paper-input>
                </div>
                <div class="form-group">
                    <paper-input label="Password" name="password" type="password" required></paper-input>
                </div>
                <div class="form-group">
                    <paper-input label="Password_confirmation" name="password_confirmation" type="password" required></paper-input>
                </div>
                <div class="form-group">
                    <paper-button class="register-form__btn" raised>
                        {!! Form::submit('注册',['class'=>'register-form__submit-btn']) !!}
                    </paper-button>
                </div>
                {!! Form::close() !!}
            </div>
        </div>
        @include('errors/listgroup')
    </view-controller>
@stop

@section('script')
    <script src="/assets/pc/controller/auth/register.js"></script>
@endsection