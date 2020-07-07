<?php

namespace Modules\Extranet\Jobs\User;

use Modules\Extranet\Http\Requests\User\SavePasswordRequest;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

use Modules\Extranet\Repositories\PersonneRepository;

use Session;
use Lang;

class PasswordUpdate
{
    public function __construct(array $attributes)
    {
        $this->attributes = array_only($attributes, [
            'password',
            'password_confirm'
        ]);
    }

    public static function fromRequest(SavePasswordRequest $request)
    {
        return new PasswordUpdate($request->all());
    }

    public function handle()
    {
        if(!$this->attributes['password'] || !$this->attributes['password_confirm']) {
            throw new \Exception(Lang::get('extranet::form.modal-password.messages.errors.empty_field'));
        }

        if($this->attributes['password'] != $this->attributes['password_confirm']) {
            throw new \Exception(Lang::get('extranet::form.modal-password.messages.errors.confirm_password'));
        }

        return $this->queryWs();
    }

    public function queryWs()
    {
        
        $user = json_decode(Session::get('user'));

        $repository = new PersonneRepository();
        $obj = $repository->find($user->id);

        if(!$obj) {
            throw new \Exception('User not exist !');
            return false;
        }

        // Update Person Obj data
        $obj->pass = $this->attributes['password'];
        foreach($obj->listInfos as $i => $info) {
            if($info->key == 'INFOPER.RESETMDP') {
                $obj->listInfos[$i]->value = 0;
            }
        }

        if($repository->update($user->id, $obj)){
            $user->must_reset_password = 0;

            Session::put('user', json_encode($user));

            return true;
        }

        return false;
    }
}
