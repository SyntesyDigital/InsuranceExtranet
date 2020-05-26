<?php

namespace Modules\Extranet\Http\Controllers;

use Datatables;
use Illuminate\Http\Request;
use Lang;
use Modules\Extranet\Services\ElementModelLibrary\Entities\Service;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        return view('extranet::services.index');
    }

    public function datatable(Request $request)
    {
        return Datatables::of(Service::all())
            ->addColumn('action', function ($item) {
                return '
                <a href="'.route('extranet.services.update', ['id' => $item['id']]).'" class="btn btn-link" data-toogle="edit" ><i class="fa fa-pencil-alt"></i> '.Lang::get('architect::datatables.edit').'</a> &nbsp;
                <a href="#" class="btn btn-link text-danger has-event" data-type="delete" data-payload="'.$item['id'].'" ><i class="fa fa-trash-alt"></i> '.Lang::get('architect::datatables.delete').'</a> &nbsp;
                ';
            })
            ->make(true);
    }

    public function update(Service $service, Request $request)
    {
        return view('extranet::services.form', [
            'service' => $service,
        ]);
    }

    public function create(Service $service, Request $request)
    {
        return view('extranet::services.form', [
            'service' => $service,
        ]);
    }

    public function duplicate($id, Request $request)
    {
        // return view('extranet::services.update');
    }

    public function delete($id, Request $request)
    {
        return true;
    }
}
