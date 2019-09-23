<?php

namespace Modules\Extranet\Repositories;

use Modules\Extranet\Entities\ExtranetModel;
use Datatables;
use Prettus\Repository\Eloquent\BaseRepository;

class ExtranetModelRepository extends BaseRepository
{
    public function model()
    {
        return "Modules\\Extranet\\Entities\ExtranetModel";
    }

  /*  public function getDatatableData()
    {
        $agences = Agence::select(
                'id',
                'name',
                'address'
            );

        return Datatables::of($agences)
            ->addColumn('name', function ($item) {
                return $item->name;
            })
            ->addColumn('address', function ($item) {
                return $item->address;
            })
            ->addColumn('action', function ($item) {
                return '<a href="'.route('admin.agences.show', $item).'" class="btn btn-sm btn-success pull-right">Modifier</a>';
            })
        ->make(true);
    }*/
}
