<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = ['title', 'image', 'background_image', 'banner_image', 'score', 'date', 'content'];
}
