<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Extranet\Http\Requests\User\UpdateSessionRequest;
use Modules\Extranet\Jobs\User\SessionUpdate;

use Config;
use Illuminate\Http\Request;
use Session;
use Carbon\Carbon;

use Datatables;
use Illuminate\Support\Collection;
use Lang;


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

    public function index(Request $request){
        return view('extranet::users.index');
    }

    public function datatable(Request $request)
    {

        $collection = collect([
          ['id' => 1,'name' => 'User 1', 'username' => 'user1', 'roles' => 'Admin, Client'],
          ['id' => 2,'name' => 'User 2', 'username' => 'user2', 'roles' => 'Admin'],
        ]);

        return Datatables::of($collection)
            //column with actions
            ->addColumn('action', function ($item) {
                return '
                <a href="'.route('extranet.users.update',['id' => $item['id']]).'" class="btn btn-link" data-toogle="edit" ><i class="fa fa-pencil-alt"></i> '.Lang::get("architect::datatables.edit").'</a>&nbsp;
                ';
            })
            ->rawColumns(['action'])   //columns with html
            ->make(true);
    }    


    public function update(Request $request){
        return view('extranet::users.update');
    }

    public function delete(Request $request){
        return true;
    }

}
