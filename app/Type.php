<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    public function contents()
    {
        return $this->hasMany(Content::class);
    }

    public static function selectData()
    {
        $allTypes = Type::all();
        $data = [];
        foreach($allTypes as $allType)
        {
            $data[$allType->id++] = $allType->label;
        }
        return $data;
    }
}
