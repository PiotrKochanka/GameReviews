<?php

// app/Models/Menu.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $table = 'menu';
    protected $fillable = ['name', 'date', 'position_id', 'menu_type', 'content', 'url', 'image', 'parent_id'];

    public function position()
    {
        return $this->belongsTo(MenuPosition::class, 'position_id');
    }

    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id');
    }
}






