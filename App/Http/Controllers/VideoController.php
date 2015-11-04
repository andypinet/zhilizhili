<?php

namespace App\Http\Controllers;

use App\Content;
use App\Transformers\VideoTransformer;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\DocBlock\Type\Collection;

class VideoController extends ApiController
{
    protected $videoTransformer;

    /**
     * VideoController constructor.
     * @param $videoTransformer
     */
    public function __construct(VideoTransformer $videoTransformer)
    {
        $this->videoTransformer = $videoTransformer;
        $this->middleware('auth.basic', ['only' => ['store', 'update']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $videos = Content::all();
        return $this->response([
            'status' => 'success',
            'data' => $this->videoTransformer->transformCollection($videos->toArray())
        ]);
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
        if (!$request->get('title') || !$request->get('text'))
        {
            return $this->setStatusCode(422)->responseError('Validate fails');
        }
        if (!$request->get('type_id'))
        {
            return $this->setStatusCode(422)->responseError('Need set Type');
        }
        $data = array_merge($request->all(), ['user_id' => Auth::user()->id]);
        Content::create($data);
        return $this->setStatusCode(201)->response([
            'status' => 'success',
            'message' => 'video created'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $video = Content::find($id);
        if (!$video)
        {
            return $this->responseNotFound();
        }

        return $this->response([
            'state' => 'success',
            'data' => $this->videoTransformer->transform($video)
        ]);
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
}
