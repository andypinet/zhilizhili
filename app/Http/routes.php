<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Blade::setContentTags('<%', '%>');         // for variables and all things Blade
Blade::setEscapedContentTags('<%%', '%%>');     // for escaped dat

Route::get('/', 'IndexController@index');
Route::get('/about', 'IndexController@about');

Route::resource('article', 'ArticleController');
Route::post('/user/upload','UserController@upload');
Route::get('/user/time', 'UserController@time');
Route::group(['middleware' => 'cros'], function(\Illuminate\Routing\Router $router){
    $router->get('/user/ajax', 'UserController@ajax');
});
Route::resource('user', 'UserController');

Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');

Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');

Route::get('auth/logout', 'Auth\AuthController@getLogout');
