<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('url', 200)->nullable();
            $table->string('screen_name', 32)->nullable();
            $table->integer('activated')->nullable();
            $table->integer('logged')->nullable();
            $table->string('group', 16);
            $table->string('auth_code', 40)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->dropColumn('url');
            $table->dropColumn('screen_name');
            $table->dropColumn('activated');
            $table->dropColumn('logged');
            $table->dropColumn('group');
            $table->dropColumn('auth_code');
        });
    }
}
