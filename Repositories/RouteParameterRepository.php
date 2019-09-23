<?php

namespace Modules\Extranet\Repositories;

use Modules\Extranet\Entities\RouteParameter;
use Datatables;
use Prettus\Repository\Eloquent\BaseRepository;
use Lang;

class RouteParameterRepository extends BaseRepository
{
    public function model()
    {
        return "Modules\\Extranet\\Entities\RouteParameter";
    }

    public function getDatatableData()
    {
        $routes_parameters = RouteParameter::all();

        return Datatables::of($routes_parameters)
            ->addColumn('identifier', function ($item) {
                return $item->identifier;
            })
            ->addColumn('name', function ($item) {
                return $item->name;
            })
            ->addColumn('action', function ($item) {
                return '<a href="'.route('extranet.routes_parameters.show', $item).'" class="btn btn-link text-pimary "><i class="fa fa-pencil-alt"></i></a>
                <a title="'.Lang::get("architect::datatables.delete").'" href="#" class="btn btn-link text-danger" data-toogle="delete" data-ajax="' . route('extranet.routes_parameters.delete', $item) . '" data-confirm-message="'.Lang::get('architect::datatables.sure').'"><i class="fa fa-trash"></i> </a>';
            })
        ->make(true);
    }
}
