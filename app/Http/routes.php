<?php
Auth::loginUsingId(1);

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

Route::get('/article/type/{type_id}', 'ArticleController@index');
Route::resource('article', 'ArticleController');

Route::get('/video/create', 'ArticleController@uploadVideo');
Route::post('/video/upload','ArticleController@upload');

Route::get('/user/time', 'UserController@time');
Route::group(['middleware' => 'cros'], function(\Illuminate\Routing\Router $router){
    $router->get('/user/ajax', 'UserController@ajax');
});
Route::resource('user', 'UserController');
Route::resource('admin', 'AdminController');
Route::resource('music', 'MusicController');

Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');

Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');

Route::get('auth/logout', 'Auth\AuthController@getLogout');

// restful api
//Route::group(['prefix' => 'api/v1'], function(){
//    Route::resource("videos", "VideoController");
//});

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {
    $api->group(['namespace' => 'App\Api\Controllers'], function($api) {
        $api->post('user/login', 'AuthController@authenticate');
        $api->post('user/register', 'AuthController@register');
        $api->group(["middleware" => "oauth"], function($api){
            $api->get('user/me', 'AuthController@getAuthenticatedUser');
            $api->get('videos', 'VideoController@index');
            $api->get('videos/{id}', 'VideoController@show');
        });
    });
});

Route::get('oauth/authorize', ['as' => 'oauth.authorize.get','middleware' => ['check-authorization-params'], function() {
    // display a form where the user can authorize the client to access it's data
    $authParams = Authorizer::getAuthCodeRequestParams();
    $formParams = array_except($authParams,'client');
    $formParams['client_id'] = $authParams['client']->getId();
    return view('oauth.authorization-form', ['params'=>$formParams,'client'=>$authParams['client']]);
}]);

Route::post('oauth/authorize', ['as' => 'oauth.authorize.post','middleware' => ['check-authorization-params'], function() {

    $params = Authorizer::getAuthCodeRequestParams();
    $params['user_id'] = Auth::user()->id;
    $redirectUri = '';

    // if the user has allowed the client to access its data, redirect back to the client with an auth code
    if (Input::get('approve') !== null) {
        $redirectUri = Authorizer::issueAuthCode('user', $params['user_id'], $params);
    }

    // if the user has denied the client to access its data, redirect back to the client with an error message
    if (Input::get('deny') !== null) {
        $redirectUri = Authorizer::authCodeRequestDeniedRedirectUri();
    }
    return Redirect::to($redirectUri);
}]);

Route::post('oauth/access_token', function() {
    return Response::json(Authorizer::issueAccessToken());
});