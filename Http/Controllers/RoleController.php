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
          ['id' => 1, 'name' => 'Admin', 'role' => 'administrator'],
          ['id' => 2, 'name' => 'Editor', 'role' => 'editor'],
          ['id' => 3, 'name' => 'Subscriber', 'role' => 'subscriber'],
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
                <a href="'.route('extranet.roles.update',['id' => $item['id']]).'" class="btn btn-link" data-toogle="edit" ><i class="fa fa-pencil-alt"></i> '.Lang::get("architect::datatables.edit").'</a>&nbsp;
                <a href="#" class="btn btn-link text-danger has-event" data-type="delete" data-payload="'.$item['id'].'" ><i class="fa fa-trash-alt"></i> '.Lang::get("architect::datatables.delete").'</a> &nbsp;
                ';
            })
            ->rawColumns(['default','action', 'icon'])
            ->make(true);
    }

    public function create(Request $request){
        return view('extranet::roles.update');
    }

    public function duplicate(Request $request,$id){
        return view('extranet::roles.update');
    }

    public function delete(Request $request,$id){
        return true;
    }
    
    public function update(Request $request,$id){
        return view('extranet::roles.update');
    }
}
