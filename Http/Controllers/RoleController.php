<?php


namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;
use Datatables;
use Illuminate\Support\Collection;
use Lang;


class RoleController extends Controller
{
       
    public function index(Request $request)
    {
        return view('extranet::roles.index');
    }

    public function datatable(Request $request)
    {

        $collection = collect([
          ['name' => 'Admin', 'role' => 'administrator'],
          ['name' => 'Editor', 'role' => 'editor'],
          ['name' => 'Subscriber', 'role' => 'subscriber'],
        ]);

        return Datatables::of($collection)
            ->addColumn('default', function ($item) {
              return $item['role'] == 'administrator' ?
                "<i class='fa fa-check-circle'></i>" :
                "<i class='far fa-circle'></i>";
            })
            ->addColumn('icon', function($item){
                return '
                    <i class="fas fa-user"></i>
                ';
            })
            ->addColumn('action', function ($item) {
                return '
                <a href="roles/update" class="btn btn-link" data-toogle="edit" ><i class="fa fa-pencil-alt"></i> '.Lang::get("architect::datatables.edit").'</a>&nbsp;
                <a href="#" class="btn btn-link text-danger" data-toogle="delete" data-confirm-message="'.Lang::get("architect::language.del_lang_msg").'"><i class="fa fa-trash-alt"></i> '.Lang::get("architect::datatables.delete").'</a> &nbsp;
                ';
            })
            ->rawColumns(['default','action', 'icon'])
            ->make(true);
    }

    public function update(Request $request){
        return view('extranet::roles.update');
    }
}
