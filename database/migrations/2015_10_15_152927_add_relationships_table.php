<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRelationshipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('realtionships', function (Blueprint $table) {
            $table->integer('cid', false, true);
            $table->integer('mid', false, true);
            $table->timestamps();

            $table->primary(array('cid', 'mid'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('realtionships');
    }
}
