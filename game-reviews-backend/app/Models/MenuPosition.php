<?php

// app/Models/MenuPosition.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuPosition extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function menuItems()
    {
        return $this->hasMany(Menu::class, 'position_id');
    }
}


