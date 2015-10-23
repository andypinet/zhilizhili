<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('title', 200)->nullable();
            $table->string('slug', 200)->nullable();
            $table->text('text')->nullable();
            $table->integer('order')->nullable();
            $table->integer('authorid', false, true)->nullable();
            $table->string('template', 32)->nullable();
            $table->string('type', 16)->nullable();
            $table->string('status', 16)->nullable();
            $table->string('password', 32)->nullable();
            $table->integer('comments_num', false, true)->nullable();
            $table->boolean('allow_comment')->default(true);
            $table->boolean('allow_ping')->default(true);
            $table->boolean('allow_feed')->default(true);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contents', function(Blueprint $table){
            $table->dropForeign('contents_user_id_foreign');
        });
        Schema::drop('contents');
    }
}
