<?php

namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;
use Datatables;
use Lang;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        return view('extranet::services.index');
    }

    public function datatable(Request $request)
    {
        $collection = collect([
          ['identifiant' => 'CSRIN', 'nom' => 'administrator', 'methode' => 'POST', 'url' => 'sinistre'],
          ['identifiant' => 'CSRIN', 'nom' => 'administrator', 'methode' => 'POST', 'url' => 'sinistre'],
          ['identifiant' => 'CSRIN', 'nom' => 'administrator', 'methode' => 'POST', 'url' => 'sinistre'],
        ]);

        return Datatables::of($collection)
            ->addColumn('action', function ($item) {
                return '
                <a href="roles/update" class="btn btn-link" data-toogle="edit" ><i class="fa fa-pencil-alt"></i> '.Lang::get('architect::datatables.edit').'</a>&nbsp;
                <a href="#" class="btn btn-link text-danger" data-toogle="delete" data-confirm-message="'.Lang::get('architect::language.del_lang_msg').'"><i class="fa fa-trash-alt"></i> '.Lang::get('architect::datatables.delete').'</a> &nbsp;
                ';
            })
            ->rawColumns(['default', 'action', 'icon'])
            ->make(true);
    }

    public function update(Request $request)
    {
        return view('extranet::services.update');
    }
}
