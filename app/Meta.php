<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Meta extends Model
{
    public function contents()
    {
        return $this->belongsToMany(Content::class);
    }
}
