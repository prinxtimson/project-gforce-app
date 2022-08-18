<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = ['super-admin', 'admin', 'manager', 'supervisor', 'kitchen-manager', 'waiter', 'cashier', 'customer'];

        foreach($roles as $role){
            Role::create(['name' => $role]);
        }
    }
}
