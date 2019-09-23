<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateElementsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('elements', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('identifier')->unique();
            $table->string('icon')->nullable();
            $table->string('model_ws')->nullable();
            $table->string('type')->nullable();
            $table->boolean('has_parameters')->nullable();
            $table->timestamps();
        });

        Schema::create('elements_attributes', function (Blueprint $table) {
          $table->increments('id');
          $table->integer('element_id')->unsigned();
          $table->foreign('element_id')->references('id')->on('elements')->onDelete('cascade');
          $table->integer('language_id')->unsigned()->nullable();
          $table->foreign('language_id')->references('id')->on('languages');
          $table->string('name');
          $table->longText('value')->nullable();
          $table->timestamps();
        });

        Schema::create('elements_fields', function (Blueprint $table) {
          $table->increments('id');
          $table->integer('element_id')->unsigned();
          $table->foreign('element_id')->references('id')->on('elements')->onDelete('cascade');
          $table->string('identifier');
          $table->string('name');
          $table->string('type');
          $table->string('boby')->nullable();
          $table->string('icon')->nullable();
          $table->string('rules')->nullable();
          $table->longText('settings')->nullable();
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
      Schema::dropIfExists('elements_fields');
      Schema::dropIfExists('elements_attributes');
      Schema::dropIfExists('elements');
    }
}
