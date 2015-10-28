<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
	protected $fillable = ['title', 'text', 'type_id', 'published_at', 'user_id', 'slug', 'video_id'];

	public $dates = ['published_at'];

	public function setPublishedAtAttribute($date)
	{
		$this->attributes['published_at'] = Carbon::createFromFormat('Y-m-d', $date);
	}

	public function scopePublished($query)
	{
		$query->where('published_at', '<=', Carbon::now());
	}

	public function user()
	{
		return $this->belongsTo('App\User');
	}

	public function scopePassCheck($query)
	{
		$query->where('status', '=', 1);
	}

	public function metas()
	{
		return $this->belongsToMany(Meta::class);
	}

	public function videos()
	{
		return $this->hasMany(Video::class);
	}
}
