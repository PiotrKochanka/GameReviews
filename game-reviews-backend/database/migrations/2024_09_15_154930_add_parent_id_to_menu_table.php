<?php

// database/migrations/xxxx_xx_xx_add_parent_id_to_menu_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddParentIdToMenuTable extends Migration
{
    public function up()
    {
        Schema::table('menu', function (Blueprint $table) {
            $table->unsignedBigInteger('parent_id')->nullable()->after('position_id');
            $table->foreign('parent_id')->references('id')->on('menu')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('menu', function (Blueprint $table) {
            $table->dropForeign(['parent_id']);
            $table->dropColumn('parent_id');
        });
    }
}

