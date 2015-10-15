<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMetasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('metas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 200)->nullable();
            $table->string('slug', 200)->nullable();
            $table->string('type', 32)->nullable();
            $table->string('description', 200)->nullable();
            $table->integer('count', false, true)->nullable();
            $table->integer('order', false, true)->nullable();
            $table->timestamps();

            $table->index(array('slug'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('metas');
    }
}
