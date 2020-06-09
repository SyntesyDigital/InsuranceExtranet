<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;
use Auth;
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
            if ($redirect = $this->dispatchNow(SessionUpdate::fromRequest($request))) {
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
        $idPers = User::all()->pluck('id', 'id_per')->toArray();
        $users = collect([]);

        foreach ($this->users->getUsers() as $user) {
            $users->push([
                'id_per' => $user->{'USEREXT.id_per'},
                'name' => $user->{'USEREXT.nom2_per'},
                'username' => $user->{'USEREXT.login_per'},
                'roles' => '',
                'active' => $user->{'USEREXT.actif'},
                'admin' => $user->{'USEREXT.admin'},
                'supervue' => $user->{'USEREXT.supervue'},
            ]);
        }

        return Datatables::of($users)
            ->addColumn('action', function ($item) use ($idPers) {
                if (isset($idPers[$item['id_per']])) {
                    // return '<a href="'.route('extranet.users.update', ['id' => $idPers[$item['id_per']]]).'" class="btn btn-link">
                    //     <i class="fas fa-pencil-alt"></i> '.Lang::get('architect::datatables.edit').'
                    // </a>&nbsp;';

                    return null;
                }

                return '<a href="" class="btn btn-link has-event" data-type="add" data-payload="'.$item['id_per'].'"><i class="fas fa-plus"></i> Ajouter</a>&nbsp;';
            })
            ->rawColumns(['action'])
            ->make(true)
            ->header('token', Auth::user()->token);
    }

    public function update(Request $request, $id)
    {
        return view('extranet::users.update', ['id' => $id]);
    }

    public function delete(Request $request)
    {
        return true;
    }
}
