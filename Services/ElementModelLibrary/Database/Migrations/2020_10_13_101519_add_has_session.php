<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddHasSession extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('services', 'has_session_id')) {
            Schema::table('services', function (Blueprint $table) {
                $table->boolean('has_session_id')->default(0);
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
        if (Schema::hasColumn('services', 'has_session_id')) {
            Schema::table('services', function (Blueprint $table) {
                $table->dropColumn('has_session_id');
            });
        }
    }
}
