<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddValidationWs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('elements_models', 'validation_ws')) {
            Schema::table('elements_models', function (Blueprint $table) {
                $table->string('validation_ws')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('elements_models', 'validation_ws')) {
            Schema::table('elements_models', function (Blueprint $table) {
                $table->dropColumn('validation_ws');
            });
        }
    }
}
