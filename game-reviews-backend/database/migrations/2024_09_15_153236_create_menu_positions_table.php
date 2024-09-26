<?php

// database/migrations/xxxx_xx_xx_create_menu_positions_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuPositionsTable extends Migration
{
    public function up()
    {
        Schema::create('menu_positions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('menu_positions');
    }
}
