<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConfigurationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('site_configurations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('identifier')->unique();
            $table->string('icon')->nullable();
            $table->timestamps();
        });

        Schema::create('site_configurations_fields', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('site_configuration_id')->unsigned();
            $table->foreign('site_configuration_id')->references('id')->on('site_configurations')->onDelete('cascade');
            $table->integer('language_id')->unsigned()->nullable();
            $table->foreign('language_id')->references('id')->on('languages');
            $table->string('name');
            $table->longText('value')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Schema::dropIfExists('site_configurations_fields');
        Schema::dropIfExists('site_configurations');
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
