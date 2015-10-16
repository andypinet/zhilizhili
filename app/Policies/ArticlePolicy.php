<?php

namespace App\Policies;

use App\Content;
use App\User;

class ArticlePolicy
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

    public function update(User $user, Content $article)
    {
        return $user->owns($article);
    }
}
