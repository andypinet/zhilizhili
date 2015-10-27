<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        // $this->call(UserTableSeeder::class);

        factory(\App\User::class, 10)->create();
        factory(\App\Type::class, 3)->create();
        factory(\App\Content::class, 30)->create();

        Model::reguard();
    }
}
