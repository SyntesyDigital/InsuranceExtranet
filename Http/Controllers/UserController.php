<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;
use Datatables;
use Illuminate\Http\Request;
use Lang;
use Modules\Extranet\Entities\User;
use Modules\Extranet\Http\Requests\User\UpdateSessionRequest;
use Modules\Extranet\Jobs\User\SessionUpdate;
use Modules\Extranet\Repositories\UserRepository;

class UserController extends Controller
{
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    public function setUserSession(UpdateSessionRequest $request)
    {
        $success = false;
        $message = '';
        $redirect = null;

        try {
            $redirect = $this->dispatchNow(SessionUpdate::fromRequest($request));
            if (isset($redirect)) {
                $success = true;
                $message = '';
            }
        } catch (\Exception $ex) {
            $message = $ex->getMessage();
        }

        return response()->json([
            'success' => $success,
            'message' => $message,
            'redirect' => $redirect,
        ]);
    }

    public function index(Request $request)
    {
        return view('extranet::users.index');
    }

    public function datatable(Request $request)
    {
        $veosUsers = $this->users->getUsers();
        $idPers = User::all()->pluck('id','id_per')->toArray();

        $users = [];
        //process users
        foreach ($veosUsers as $user) {
            $users[] = [
                'id_per' => $user->{'USEREXT.id_per'},
                'name' => $user->{'USEREXT.nom2_per'},
                'username' => $user->{'USEREXT.login_per'},
                'roles' => '',
                'active' => $user->{'USEREXT.actif'},
                'admin' => $user->{'USEREXT.admin'},
                'supervue' => $user->{'USEREXT.supervue'},
            ];
        }

        $collection = collect($users);

        return Datatables::of($collection)
            //column with actions
            ->addColumn('action', function ($item) use ($idPers) {
                $id = isset($idPers[$item['id_per']]) ? $idPers[$item['id_per']] : null;
                if (isset($id)) {
                    return '
                        <a href="'.route('extranet.users.update', ['id' => $id]).'" class="btn btn-link" ><i class="fas fa-pencil-alt"></i> '.Lang::get('architect::datatables.edit').'</a>&nbsp;
                    ';
                }
                return '
                    <a href="" class="btn btn-link has-event" data-type="add" data-payload="'.$item['id_per'].'" ><i class="fas fa-plus"></i> Ajouter</a>&nbsp;
                ';
            })
            ->rawColumns(['action'])   //columns with html
            ->make(true);
    }

    public function update(Request $request,$id)
    {
        return view('extranet::users.update',["id"=>$id]);
    }

    public function delete(Request $request)
    {
        return true;
    }
}
