<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateLanguageId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::table('elements_templates_fields', function (Blueprint $table) {
        //     // Remove Foreign key
        //     //DB::raw("ALTER TABLE 'elements_templates_fields' DROP INDEX 'elements_templates_fields_language_id_foreign'");

        //     // Change field and set foreign key
        //     $table->string('language_id')->unsigned()->nullable()->change();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::table('elements_templates_fields', function (Blueprint $table) {
        //     // Remove Foreign key
        //     //DB::raw("ALTER TABLE 'elements_templates_fields' DROP INDEX 'elements_templates_fields_language_id_foreign'");

        //     // Change field and set foreign key
        //     $table->string('language_id')->unsigned()->change();
        //     // $table->foreign('language_id')->references('id')->on('languages')->onDelete('cascade');
        // });
    }
}
