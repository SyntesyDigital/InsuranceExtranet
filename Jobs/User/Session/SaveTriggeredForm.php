<?php

namespace Modules\Extranet\Jobs\User\Session;

use Illuminate\Http\Request;
use Session;

class SaveTriggeredForm
{
    public function __construct($attributes)
    {
        $this->attributes = array_only($attributes, [
            'id',
        ]);
    }

    public static function fromRequest(Request $request)
    {
        return new self($request->all());
    }

    public function handle()
    {
        if (!isset($this->attributes['id']) && !$this->attributes['id']) {
            return false;
        }

        $user = json_decode(Session::get('user'));

        if (isset($user->triggered_forms)) {
            if (!in_array($this->attributes['id'], $user->triggered_forms)) {
                $user->triggered_forms[] = $this->attributes['id'];
            }
        } else {
            $user->triggered_forms = [$this->attributes['id']];
        }

        Session::put('user', json_encode($user));

        return $user;
    }
}
