<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldsToElementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('elements', function (Blueprint $table) {
          $table->string('model_identifier')->after('model_ws');
          $table->string('model_format')->after('model_identifier');
          $table->string('model_exemple')->after('model_format');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('elements', function (Blueprint $table) {
          $table->dropColumn('model_identifier');
          $table->dropColumn('model_format');
          $table->dropColumn('model_exemple');
        });
    }
}
