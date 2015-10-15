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

//Route::get('/admin', 'AdminController@index');
//Route::get('/article', 'ArticleController@index');
//Route::get('/article/create', 'ArticleController@create');
//Route::get('/article/{id}', 'ArticleController@show');
//Route::post('/article', 'ArticleController@store');

Route::resource('article', 'ArticleController');
