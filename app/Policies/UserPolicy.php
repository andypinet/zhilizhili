<?php

namespace App\Policies;

use App\User;

class UserPolicy
{
    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function isSelf(User $user, User $owneruser)
    {
        return $user->id == $owneruser->id;
    }
}
