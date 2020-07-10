<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableProcedureAddFieldPrefixed extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('models_procedures', 'prefixed')) {
            Schema::table('models_procedures', function (Blueprint $table) {
                $table->boolean('prefixed')->default(0);
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
        if (Schema::hasColumn('models_procedures', 'prefixed')) {
            Schema::table('models_procedures', function (Blueprint $table) {
                $table->dropColumn('prefixed');
            });
        }
    }
}
