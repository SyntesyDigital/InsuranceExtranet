<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddWs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('services', 'ws')) {
            Schema::table('services', function (Blueprint $table) {
                $table->string('ws')->default('');
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
        if (Schema::hasColumn('services', 'ws')) {
            Schema::table('services', function (Blueprint $table) {
                $table->dropColumn('ws');
            });
        }
    }
}
