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
          ['id' => '1', 'identifiant' => 'CSRIN', 'nom' => 'Sinistre', 'methode' => 'POST', 'url' => 'sinistre'],
          ['id' => '2', 'identifiant' => 'CSRIN2', 'nom' => 'Sinistre2', 'methode' => 'GET', 'url' => 'sinistre/2'],
          ['id' => '3', 'identifiant' => 'CSRIN3', 'nom' => 'Sinistre3', 'methode' => 'PUT', 'url' => 'sinistre/3'],
        ]);

        return Datatables::of($collection)
        ->addColumn('action', function ($item) {
            return '
            <a href="'.route('extranet.services.update', ['id' => $item['id']]).'" class="btn btn-link" data-toogle="edit" ><i class="fa fa-pencil-alt"></i> '.Lang::get('architect::datatables.edit').'</a> &nbsp;
            <a href="#" class="btn btn-link text-danger has-event" data-type="delete" data-payload="'.$item['id'].'" ><i class="fa fa-trash-alt"></i> '.Lang::get('architect::datatables.delete').'</a> &nbsp;
            ';
        })
            ->rawColumns(['default', 'action', 'icon'])
            ->make(true);
    }

    public function update(Request $request)
    {
        return view('extranet::services.update');
    }

    public function create(Request $request)
    {
        return view('extranet::services.update');
    }

    public function duplicate(Request $request, $id)
    {
        return view('extranet::services.update');
    }

    public function delete(Request $request, $id)
    {
        return true;
    }
}
