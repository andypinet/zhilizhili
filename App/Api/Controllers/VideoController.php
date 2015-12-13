<?php
/**
 * Created by PhpStorm.
 * User: lbc
 * Date: 15/11/3
 * Time: 下午6:45
 */

namespace App\Api\Controllers;


use App\Content;
use App\Api\Transformers\VideoTransformer;

class VideoController extends BaseController
{
    public function index()
    {
        $videos = Content::all();
        return $this->collection($videos, new VideoTransformer());
    }

    public function show($id)
    {
        $video = Content::find($id);
        if (!$video)
        {
            return $this->response->errorNotFound();
        }
        return $this->item($video, new VideoTransformer());
    }
}
