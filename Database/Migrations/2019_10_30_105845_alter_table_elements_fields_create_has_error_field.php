<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTableElementsFieldsCreateHasErrorField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('elements_fields', function (Blueprint $table) {
            $table->string('errors')
                ->nullable()
                ->after('settings');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('elements_fields', function (Blueprint $table) {
            $table->dropColumn('errors');
        });
    }
}
