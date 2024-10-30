<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    // Określenie, które pola mogą być masowo przypisane
    protected $fillable = [
        'name',     // nazwa pliku
        'path',     // ścieżka do pliku
        'catalog_id', // ID katalogu
    ];

    // Zdefiniuj relację z modelem Catalog
    public function catalog()
    {
        return $this->belongsTo(Catalog::class);
    }
}
