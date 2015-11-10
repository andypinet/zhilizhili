<?php

namespace App\Http\Controllers;

use App\Content;
use App\Meta;
use App\Type;
use App\User;
use App\Video;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Jenssegers\Agent\Agent;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $type_id)
    {
        $types = Type::all();
        $type = Type::findOrFail($type_id);
        if (!is_null($request->user()) && $request->user()->isAdmin()) {
            $articles = $type->contents()->orderBy('contents.id', 'desc')->published()->paginate(16);
        }
        else {
            $articles = $type->contents()->orderBy('contents.id', 'desc')->passCheck()->published()->paginate(16);
        }
        return view('article/index', compact('articles', 'types', 'type_id'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        if (is_null($request->user())) {
            abort('403', '你们是没有权限的 哈哈');
        }

        $user_id = \Auth::User()->id;
        $types = Type::selectData();
        return view('article/create', compact('user_id', 'types'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Requests\CreateArticleRequest $request)
    {
        $input = $request->all();
        Content::create($input);
        return redirect('/article/type/'.$input['type_id']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $agent = new Agent();
        $types = Type::all();
        $article = Content::findOrFail($id);
//        $this->authorize('show-content', $article);
//        if (\Gate::denies('update', $article))
//        {
//            abort('403', 'sorry');
//        }
        return view('article/show', compact('article', 'types'));
//        return view('mobile/article/show', compact('article', 'types'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $article = Content::findOrFail($id);
        if (\Gate::denies('update', $article))
        {
            abort('403', 'sorry');
        }
        $types = Type::selectData();
        return view('article/edit', compact('article', 'types'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Requests\CreateArticleRequest $request, $id)
    {
        $input = $request->all();
        $article = Content::findOrFail($id);
        $article->status = 0;
        $article->update($input);

        return redirect('/article/type/'.$input['type_id']);
    }

    public function uploadVideo()
    {
        if (!\Auth::check()) {
            abort('403', '你们是没有权限的 哈哈');
        }
        $user_id = \Auth::User()->id;
        $types = Type::selectData();
        return view('article/uploadvideo', compact('user_id', 'types'));
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

            $originExtension = $file->getClientOriginalExtension();
            $originalName = str_replace('.'.$originExtension, '', $file->getClientOriginalName());
            $dataName = $request->user()->name.'/'.$originalName;

            if (is_null(Video::findVideoByName($dataName)))
            {
                $fileName = strval(time()).str_random(5).'.'.$originExtension;
                $destinationPath = public_path().'/upload/';
                $filepath = $destinationPath . $fileName;

                if (Input::hasFile('movie')) {
                    $uploadSuccess = $file->move($destinationPath, $fileName);
                    if ($uploadSuccess)
                    {
                        $content = new Content();
                        $content->user_id = $request->user()->id;
                        $content->type_id = $request->input('type_id');
                        $content->title = $request->input('title');
                        $content->save();

                        $video = new Video();
                        $video->name = $dataName;
                        $video->filepath = $filepath;
                        $video->content_id = $content->id;
                        $video->save();
                        return response()->json(['upload' => 'success', 'id' => $video->id]);
                    }
                    return response()->json(['upload' => 'error']);
                }
                else {
                    return response()->json(['upload' => 'error']);
                }
            }
            else {
                return response()->json(['upload' => 'success', 'id'=>Video::findVideoByName($dataName)->id]);
            }

        }
        else {
            return response()->json(['upload' => 'error']);
        }
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
}
