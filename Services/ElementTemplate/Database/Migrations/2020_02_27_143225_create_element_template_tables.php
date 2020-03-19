<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateElementTemplateTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('elements_templates', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('element_id')->unsigned();
            $table->foreign('element_id')->references('id')->on('elements')->onDelete('cascade');
            $table->string('name');
            $table->longText('layout')->nullable();
            $table->timestamps();
        });

        Schema::create('elements_templates_fields', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('template_id')->unsigned();
            $table->foreign('template_id')->references('id')->on('elements_templates')->onDelete('cascade');
            $table->integer('language_id')->unsigned();
            $table->foreign('language_id')->references('id')->on('languages')->onDelete('cascade');
            $table->string('name');
            $table->longText('value')->nullable();
            $table->text('relation')->nullable();
            $table->integer('parent_id')->unsigned()->nullable();
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
        Schema::dropIfExists('elements_templates_fields');
        Schema::dropIfExists('elements_templates');
    }
}
