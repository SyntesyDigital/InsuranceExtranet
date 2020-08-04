<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDuplicate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('models_procedures', 'duplicate')) {
            Schema::table('models_procedures', function (Blueprint $table) {
                $table->boolean('duplicate')->default(0);
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
        if (Schema::hasColumn('models_procedures', 'duplicate')) {
            Schema::table('models_procedures', function (Blueprint $table) {
                $table->dropColumn('duplicate');
            });
        }
    }
}
