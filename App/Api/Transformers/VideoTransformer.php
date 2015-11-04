<?php

namespace App\Api\Transformers;
use League\Fractal\TransformerAbstract;

/**
 * Created by PhpStorm.
 * User: lbc
 * Date: 15/11/3
 * Time: 下午6:51
 */
class VideoTransformer extends TransformerAbstract
{
    public function transform($video)
    {
        return [
            'title' => $video['title'],
            'text' => $video['text']
        ];
    }
}