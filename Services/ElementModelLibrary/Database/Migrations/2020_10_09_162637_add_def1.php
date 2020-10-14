<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDef1 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('elements_models', 'default_parameters')) {
            Schema::table('elements_models', function (Blueprint $table) {
                $table->string('default_parameters')->nullable();
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
        if (Schema::hasColumn('elements_models', 'default_parameters')) {
            Schema::table('elements_models', function (Blueprint $table) {
                $table->dropColumn('default_parameters');
            });
        }
    }
}
