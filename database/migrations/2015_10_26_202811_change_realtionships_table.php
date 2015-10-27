<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeRealtionshipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('content_meta', function (Blueprint $table) {
            $table->foreign('content_id')
                ->references('id')
                ->on('contents')
                ->onDelete('cascade');

            $table->foreign('meta_id')
                ->references('id')
                ->on('metas')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('content_meta', function (Blueprint $table) {
            $table->dropForeign('content_meta_content_id_foreign');
            $table->dropForeign('content_meta_meta_id_foreign');
        });
    }
}
