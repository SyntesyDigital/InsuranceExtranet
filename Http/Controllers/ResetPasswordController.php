<?php

namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Extranet\Http\Requests\ResetPassword\ChangePasswordRequest;
use Modules\Extranet\Http\Requests\ResetPassword\SendEmailRequest;
use Modules\Extranet\Jobs\ResetPassword\ChangePassword;
use Modules\Extranet\Jobs\ResetPassword\SendResetPassword;
use Validator;

class ResetPasswordController extends Controller
{
    const ERROR_MESSAGE = "E-mail d'utilisateur incorrect";
    const ERROR_CHANGE_MESSAGE = "E-mail d'utilisateur ou token incorrect";

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        return view('extranet::auth.reset-password');
    }

    public function sendEmail(SendEmailRequest $request)
    {
        $error = null;
        try {
            $result = dispatch_now(SendResetPassword::fromRequest($request));

            if ($result) {
                return redirect(route('reset-password'))
            ->with('message', 'E-mail envoyé avec succès')
            ->withInput($request->input());
            }
        } catch (\Exception $ex) {
            $error = $ex->getMessage();
        }
        $validator = Validator::make($request->all(), []);
        $validator->errors()->add('server', ResetPasswordController::ERROR_MESSAGE);

        return redirect(route('reset-password'))
        ->withErrors($validator)
        ->withInput($request->input());
    }

    public function changePassword(Request $request, $env = null)
    {
        // if (!$request->has('np') && !$request->old('token')) {
        //     return redirect(route('login'));
        // }

        return view('extranet::auth.change-password', [
            'env' => $env,
            'token' => $request->has('np') ? $request->get('np') : $request->old('token'),
        ]);
    }

    public function updatePassword(ChangePasswordRequest $request)
    {
        $error = null;
        try {
            $result = dispatch_now(ChangePassword::fromRequest($request));

            if ($result) {
                return redirect(route('login'))
            ->with('message', 'Mot de passe changé avec succès');
            }
        } catch (\Exception $ex) {
            $error = $ex->getMessage();
        }
        $validator = Validator::make($request->all(), []);
        $validator->errors()->add('server', ResetPasswordController::ERROR_CHANGE_MESSAGE);

        return redirect(route('change-password'))
        ->withErrors($validator)
        ->withInput($request->input());
    }
}
