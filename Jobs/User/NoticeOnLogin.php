<?php

namespace Modules\Extranet\Jobs\User;

use Modules\Extranet\Repositories\PersonneRepository;

class NoticeOnLogin
{
    public function __construct($session)
    {
        $this->session = $session;
    }

    public function handle()
    {
        $repository = new PersonneRepository();

        $payload = $repository->find($this->session->user->id_per);

        dd($payload);

        $repository->update($obj->id, $payload, $this->session->token);

        //"INFOPER.CONEX"
        // dd($obj);
    }
}
