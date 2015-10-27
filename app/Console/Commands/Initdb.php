<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Initdb extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'zhilizhili:initdb';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $role = new \App\Role();
        $role->name = 'admin';
        $role->label = 'admin';
        $role->save();
        $user = new \App\User();
        $user->name = 'andypinet';
        $user->email = '1585638808@qq.com';
        $user->password = bcrypt('lbc1992');
        $user->save();
        $user->roles()->save($role);

        $type = new \App\Type();
        $type->name = 'richang';
        $type->label = '日常';
        $type->save();

        $type = new \App\Type();
        $type->name = 'junwu';
        $type->label = '军武';
        $type->save();

        $type = new \App\Type();
        $type->name = 'ditu';
        $type->label = '地图';
        $type->save();
    }
}
