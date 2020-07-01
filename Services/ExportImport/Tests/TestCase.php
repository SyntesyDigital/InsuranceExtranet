<?php

namespace Modules\Extranet\Services\ExportImport\Tests;

use DB;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../../../../../bootstrap/app.php';

        $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

        return $app;
    }

    public function setUp()
    {
        parent::setUp();

        // FIX : http://novate.co.uk/supporting-delete-cascade-with-sqlite-and-laravel/
        DB::statement(DB::raw('PRAGMA foreign_keys = ON;'));

        $this->artisan('migrate', [
            '--path' => 'Modules/Architect/Database/Migrations',
        ]);

        $this->artisan('migrate', [
            '--path' => 'Modules/Extranet/Database/Migrations',
        ]);

        $this->artisan('migrate', [
            '--path' => 'database/migrations',
        ]);

        $this->artisan('migrate', [
            '--path' => 'Modules/Extranet/Services/ElementModelLibrary/Database/Migrations',
        ]);

        $this->artisan('migrate', [
            '--path' => 'Modules/Extranet/Services/ElementTemplate/Database/Migrations',
        ]);

        (new \Modules\Architect\Database\Seeders\ArchitectTestDatabaseSeeder())->run();
    }

    public function tearDown()
    {
        $this->artisan('migrate:rollback', [
            '--path' => 'Modules/Architect/Database/Migrations',
        ]);

        $this->artisan('migrate:rollback', [
            '--path' => 'Modules/Extranet/Database/Migrations',
        ]);

        $this->artisan('migrate:rollback', [
            '--path' => 'database/migrations',
        ]);

        $this->artisan('migrate:rollback', [
            '--path' => 'Modules/Extranet/Services/ElementModelLibrary/Database/Migrations',
        ]);

        parent::tearDown();
    }
}
