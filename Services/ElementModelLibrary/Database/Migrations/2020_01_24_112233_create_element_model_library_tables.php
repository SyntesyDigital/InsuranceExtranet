<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Modules\Extranet\Services\ElementModelLibrary\Database\Migrations;

class CreateElementModelLibraryTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('elements_models', function (Blueprint $table) {
            $table->increments('id');
            $table->string('identifier');
            $table->string('name');
            $table->string('type');
            $table->string('description')->nullable();
            $table->string('icon')->nullable();
            $table->string('ws')->nullable();   //
            $table->string('ws_format')->nullable();    //
            $table->string('filtres')->nullable();  //
            $table->string('example')->nullable();  //
            $table->string('def1')->nullable();     //
            $table->string('def2')->nullable();     //

            $table->timestamps();
        });

        Schema::create('services', function (Blueprint $table) {
            $table->increments('id');
            $table->string('identifier');
            $table->string('name');
            $table->string('http_method');
            $table->string('url');
            $table->string('boby');
            $table->text('json')->nullable();
            $table->text('response')->nullable();
            $table->text('comment')->nullable();

            $table->timestamps();
        });

        Schema::create('models_procedures', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('service_id')->unsigned();
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');

            $table->integer('model_id')->unsigned();
            $table->foreign('model_id')->references('id')->on('elements_models')->onDelete('cascade');

            $table->string('name');
            $table->integer('order');   //
            $table->boolean('configurable')->default(0);
            $table->boolean('required')->default(0);
            $table->boolean('repeatable')->default(0);
            $table->text('repeatable_json')->nullable();
            $table->string('repeatable_jsonpath')->nullable();

            $table->timestamps();
        });

        Schema::create('models_fields', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('procedure_id')->unsigned();
            $table->foreign('procedure_id')->references('id')->on('models_procedures')->onDelete('cascade');

            $table->string('name');
            $table->string('identifier');
            $table->string('type');
            $table->string('format');
            $table->string('default_value')->nullable();
            $table->string('boby')->nullable();
            $table->string('jsonpath')->nullable();
            $table->text('example')->nullable();
            $table->boolean('required')->default(0);    //
            $table->boolean('configurable')->default(0);
            $table->boolean('visible')->default(0);

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
        Schema::dropIfExists('models_fields');
        Schema::dropIfExists('models_procedures');
        Schema::dropIfExists('services');
        Schema::dropIfExists('elements_models');
    }
}
