<?php

namespace Modules\Extranet\Jobs\User;

use Modules\Extranet\Http\Requests\User\UpdateSessionRequest;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

use Session;
use Lang;

class SessionUpdate
{
    public function __construct(array $attributes)
    {
        $this->attributes = array_only($attributes, [
            'session_id'
        ]);
    }

    public static function fromRequest(UpdateSessionRequest $request)
    {
        return new SessionUpdate($request->all());
    }

    public function handle()
    {

        $userData = json_decode(Session::get('user'));

        $userData->session_id = $this->attributes['session_id'];
        Session::put('user', json_encode($userData));

        return true;

    }

}
