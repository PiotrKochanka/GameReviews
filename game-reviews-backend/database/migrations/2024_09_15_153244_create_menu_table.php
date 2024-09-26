<?php

// database/migrations/xxxx_xx_xx_create_menu_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuTable extends Migration
{
    public function up()
    {
        Schema::create('menu', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('position_id');
            $table->enum('menu_type', ['link', 'menu', 'info']);
            $table->text('content')->nullable();
            $table->string('url')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();

            $table->foreign('position_id')->references('id')->on('menu_positions');
        });
    }

    public function down()
    {
        Schema::dropIfExists('menu');
    }
}
