<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableLoginAttempts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('login_attempts');

        Schema::create('login_attempts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('login');
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->string('count')->nullable();
            $table->string('env')->nullable();
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
        Schema::dropIfExists('login_attempts');
    }
}
