<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDateToMenuTable extends Migration
{
    public function up()
    {
        Schema::table('menu', function (Blueprint $table) {
            $table->date('date')->default(now())->after('name'); // Ustawienie domyślnej wartości na bieżącą datę
        });
    }

    public function down()
    {
        Schema::table('menu', function (Blueprint $table) {
            $table->dropColumn('date');
        });
    }
}
