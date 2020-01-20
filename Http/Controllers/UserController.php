<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Extranet\Http\Requests\User\UpdateSessionRequest;
use Modules\Extranet\Jobs\User\SessionUpdate;
use Modules\Extranet\Repositories\UserRepository;

use Config;
use Illuminate\Http\Request;
use Session;
use Carbon\Carbon;

use Datatables;
use Illuminate\Support\Collection;
use Lang;


class UserController extends Controller
{
    public function __construct(UserRepository $users) {
        $this->users = $users;
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

        $veosUsers = $this->users->getUsers();

        $users = [];
        //process users
        foreach($veosUsers as $user) {
            $users[] = [
                'id' => $user->{'USEREXT.id_per'},
                'name' => $user->{'USEREXT.nom2_per'},
                'username' => $user->{'USEREXT.login_per'},
                'roles' => '',
                'active' => $user->{'USEREXT.actif'},
                'admin' => $user->{'USEREXT.admin'},
                'supervue' => $user->{'USEREXT.supervue'}
            ];
        }
        
        $collection = collect($users);

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
