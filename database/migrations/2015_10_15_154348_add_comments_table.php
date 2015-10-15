<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('cid', false, true);
            $table->string('author', 200)->nullable();
            $table->integer('authorid', false, true)->nullable();
            $table->integer('ownerid', false, true)->nullable();
            $table->string('email', 200)->nullable();
            $table->string('url', 200)->nullable();
            $table->string('ip', 64)->nullable();
            $table->string('agent', 200)->nullable();
            $table->text('text')->nullable();
            $table->string('type', 16)->nullable();
            $table->string('status', 16)->nullable();
            $table->integer('parent')->nullable();
            $table->timestamps();

            $table->index(array('cid'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('comments');
    }
}
