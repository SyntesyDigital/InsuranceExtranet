<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Extranet\Http\Requests\User\UpdateSessionRequest;
use Modules\Extranet\Jobs\User\SessionUpdate;

use Config;
use Illuminate\Http\Request;
use Session;
use Carbon\Carbon;


class UserController extends Controller
{
    public function __construct() {

    }

    public function setUserSession(UpdateSessionRequest $request)
    {
        $success = false;
        $message = '';
        $redirect = null;

        try {
            $redirect = $this->dispatchNow(SessionUpdate::fromRequest($request));
            if(isset($redirect)) {
                $success = true;
                $message = '';
            }
        } catch (\Exception $ex) {
            $message = $ex->getMessage();
        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'redirect' => $redirect
        ]);
    }

}
