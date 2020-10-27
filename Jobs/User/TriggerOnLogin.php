<?php

namespace Modules\Extranet\Jobs\User;

use Modules\Extranet\Repositories\PersonneRepository;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;

class TriggerOnLogin
{
    public function __construct($session)
    {
        $this->model = ElementModel::find(get_config('ON_LOGIN_TRIGGER_FORM'));
        $this->session = $session;
    }

    public function handle()
    {
        // $repository = new PersonneRepository();

        // $payload = $repository->find($this->session->user->id_per);

        // dd($payload);

        // $repository->update($obj->id, $payload, $this->session->token);

        //"INFOPER.CONEX"
        // dd($obj);
    }
}
