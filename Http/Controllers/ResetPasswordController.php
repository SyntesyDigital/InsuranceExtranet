<?php

namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

use Modules\Extranet\Http\Requests\ResetPassword\SendEmailRequest;
use Modules\Extranet\Jobs\ResetPassword\SendResetPassword;

class ResetPasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(Request $request)
    {
      return view('extranet::auth.reset-password');
    }

    public function sendEmail(SendEmailRequest $request) 
    {

      try {

        if(dispatch_now(SendResetPassword::fromRequest($request))) {
          return redirect(route('reset-password'))
            ->with('success', "Success!");
        }
        
      } catch (\Exception $ex) {
        $error = $ex->getMessage();
      }

      return redirect(route('reset-password'))
        ->with('error', $error)
        ->withInput($request->input());
    }

    public function changePassword(Request $request) 
    {

      /*
      //si el token es correcto
      if(!Cache::has($email)){
        $request->session()->flash('error_message', Lang::get('form.flash.send_error'));

        return redirect('/password/reset');
      }

      $cacheToken = Cache::get($email);

      if($token != $cacheToken){
        $request->session()->flash('error_message', Lang::get('form.flash.token_missmatch'));

        return redirect('/password/reset');
      }

      //hacemos login con el WS

      $testMode = substr(strtolower($email), -4) == '-dev' ? true : false;

      //if($userToken = $this->loginWSUser()){
      $uid = $testMode ? 'WS-dev' : 'WS';
      if($this->dispatchNow(Login::fromAttributes($uid,'WS1234','fr'))) {

        //redirect to a Controller into the Auth to execute the bobys
        return redirect('/password/reset-form/'.$email.'/'.$token);
      }
      */

      return view('extranet::auth.change-password');
    }
}