<?php

namespace App\Http\Controllers;

use App\Content;
use App\Meta;
use App\Type;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

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
            $articles = $type->contents()->orderBy('contents.id', 'desc')->published()->paginate(10);
        }
        else {
            $articles = $type->contents()->orderBy('contents.id', 'desc')->passCheck()->published()->paginate(10);
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
        $types = [];
        foreach(Type::all() as $type)
        {
            array_push($types, $type->label);
        }
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
        $input['type_id']++;
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
        $article = Content::findOrFail($id);
//        $this->authorize('show-content', $article);
//        if (\Gate::denies('update', $article))
//        {
//            abort('403', 'sorry');
//        }
        return view('article/show', compact('article'));
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
        return view('article/edit', compact('article'));
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
        $article->update($input);

        return redirect('/article');
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
