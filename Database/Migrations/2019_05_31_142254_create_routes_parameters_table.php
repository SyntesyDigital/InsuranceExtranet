<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoutesParametersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('routes_parameters', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('identifier')->unique();
            $table->timestamps();
        });
        Schema::create('contents_routes_parameters', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('route_parameter_id')->unsigned();
            $table->foreign('route_parameter_id')->references('id')->on('routes_parameters')->onDelete('cascade');
            $table->integer('content_id')->unsigned();
            $table->foreign('content_id')->references('id')->on('contents')->onDelete('cascade');
            $table->string('preview_default_value');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contents_routes_parameters');
        Schema::dropIfExists('routes_parameters');
    }
}
