<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RolesPermissionsUsers extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        // Schema::dropIfExists('users_roles');
        // Schema::dropIfExists('users_permissions');
        // Schema::dropIfExists('roles_permissions');
        // Schema::dropIfExists('users');
        // Schema::dropIfExists('roles');
        // Schema::dropIfExists('permissions');
        // Schema::dropIfExists('permissions_groups');
        // DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('id_per');
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->timestamps();
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('identifier');
            $table->string('name');
            $table->string('icon')->nullable();
            $table->boolean('default')->default(0);
            $table->string('description')->nullable();
            $table->timestamps();
        });

        Schema::create('permissions_groups', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('identifier');
            $table->integer('order');
            $table->timestamps();
        });

        Schema::create('permissions', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('group_id')->unsigned();
            $table->foreign('group_id')->references('id')->on('permissions_groups')->onDelete('cascade');

            $table->string('identifier');
            $table->string('name');
            $table->string('description')->nullable();

            $table->timestamps();
        });

        Schema::create('roles_permissions', function (Blueprint $table) {
            $table->integer('role_id')->unsigned();
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');

            $table->integer('permission_id')->unsigned();
            $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade');
        });

        Schema::create('users_roles', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('role_id')->unsigned();
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');

            $table->boolean('default')->default(0)->nullable();
        });

        Schema::create('users_permissions', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('permission_id')->unsigned();
            $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade');

            $table->boolean('enabled')->default(1)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('users_roles');
        Schema::dropIfExists('users_permissions');
        Schema::dropIfExists('roles_permissions');
        Schema::dropIfExists('users');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('permissions_groups');
    }
}
