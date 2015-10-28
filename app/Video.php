<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    public static function findVideoByName($name)
    {
        return self::where('name', $name)->first();
    }
}
