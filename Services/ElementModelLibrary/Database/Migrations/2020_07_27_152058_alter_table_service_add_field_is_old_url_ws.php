<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableServiceAddFieldIsOldUrlWs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('services', 'is_old_url_ws')) {
            Schema::table('services', function (Blueprint $table) {
                $table->boolean('is_old_url_ws')->default(0);
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
        if (Schema::hasColumn('services', 'is_old_url_ws')) {
            Schema::table('services', function (Blueprint $table) {
                $table->dropColumn('is_old_url_ws');
            });
        }
    }
}
