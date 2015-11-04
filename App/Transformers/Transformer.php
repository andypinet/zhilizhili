<?php
/**
 * Created by PhpStorm.
 * User: lbc
 * Date: 15/11/3
 * Time: 下午2:28
 */

namespace App\Transformers;


/**
 * Class Transformer
 * @package App\Transformer
 */
abstract class Transformer
{
    /**
     * @param \Illuminate\Database\Eloquent\Collection $items
     * @return array
     */
    public function transformCollection($items)
    {
        return array_map([$this, 'transform'], $items);
    }

    /**
     * @param $item
     * @return mixed
     */
    public abstract function transform($item);
}