<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        phpinfo();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        $userArticles = $user->articles;
        return view('user/show', compact('userArticles'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * [upload description]
     * @return [type] [description]
     */
    public function upload(Request $request)
    {
        if (\Auth::check()) {
            $userId = \Auth::User()->id;
            $file = Input::file('movie');
            $extension = $file->getClientOriginalExtension();
            $fileName = strval(time()).str_random(5).'.'.$extension;

            $destinationPath = public_path().'/upload/';
            if (Input::hasFile('movie')) {
                $uploadSuccess = $file->move($destinationPath, $fileName);
                return response()->json(['upload' => 'success']);
            } else {
                return response()->json(['upload' => 'error']);
            }
        }
        else {
            return response()->json(['upload' => 'error']);
        }
    }

    public function time()
    {
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');

        $time = date('r');
        echo "data: The server time is: {$time}\n\n";
        flush();
    }
}
