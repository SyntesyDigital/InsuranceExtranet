<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddServiceBody extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('services', 'body')) {
            Schema::table('services', function (Blueprint $table) {
                $table->string('body')->default('json');
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
        if (Schema::hasColumn('services', 'body')) {
            Schema::table('services', function (Blueprint $table) {
                $table->dropColumn('body');
            });
        }
    }
}
