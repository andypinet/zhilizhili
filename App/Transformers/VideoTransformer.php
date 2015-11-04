<?php
/**
 * Created by PhpStorm.
 * User: lbc
 * Date: 15/11/3
 * Time: 下午2:32
 */

namespace App\Transformers;


/**
 * Class VideoTransformer
 * @package App\Transformer
 */
class VideoTransformer extends Transformer
{

    /**
     * @param $item
     * @return array
     */
    public function transform($item)
    {
        return [
            'title' => $item['title'],
            'text' => $item['text']
        ];
    }
}