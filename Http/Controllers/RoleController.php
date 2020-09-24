<?php

namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;
use Datatables;
use Lang;
use Auth;
use Modules\Extranet\Services\RolesPermissions\Entities\Role;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        return view('extranet::roles.index');
    }

    public function datatable(Request $request)
    {
        return Datatables::of(Role::all())
            ->addColumn('default', function ($item) {
                return $item['default'] ?
                "<i class='fa fa-check-circle'></i>" :
                "<i class='far fa-circle'></i>";
            })
            ->addColumn('icon', function ($item) {
                return '
                    <i class="'.$item['icon'].'"></i>
                ';
            })
            ->addColumn('action', function ($item) {
                return '
                <a href="'.route('extranet.roles.update', ['id' => $item['id']]).'" class="btn btn-link" data-toogle="edit" ><i class="fa fa-pencil-alt"></i> '.Lang::get('architect::datatables.edit').'</a>&nbsp;
                <a href="#" class="btn btn-link text-danger has-event" data-type="delete" data-payload="'.$item['id'].'" ><i class="fa fa-trash-alt"></i> '.Lang::get('architect::datatables.delete').'</a> &nbsp;
                ';
            })
            ->rawColumns(['default', 'action', 'icon'])
            ->make(true)
            ->header('token', Auth::user()->token);
    }

    public function create(Request $request)
    {
        return view('extranet::roles.update');
    }

    public function duplicate(Request $request, $id)
    {
        return view('extranet::roles.update', ['id' => $id]);
    }

    public function update(Request $request, $id)
    {
        return view('extranet::roles.update', ['id' => $id]);
    }
}
