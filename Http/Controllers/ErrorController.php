<?php

namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;

class ErrorController extends Controller
{
    public function expiredToken(Request $request)
    {
        $request->session()->forget('user');

        return view('extranet::front.errors.expired-token');
    }
}