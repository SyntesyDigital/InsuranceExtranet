<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;
use Datatables;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Lang;

class TemplateController extends Controller
{
    public function template($templateName, Request $request)
    {
        return view('extranet::templates.'.$templateName.'.index');
    }

    public function datatable(Request $request)
    {
        $collection = collect([
          ['id' => 1, 'name' => 'Regena', 'age' => 12],
          ['id' => 2, 'name' => 'Linda', 'age' => 14],
          ['id' => 3, 'name' => 'Diego', 'age' => 23],
          ['id' => 4, 'name' => 'Linda', 'age' => 84],
        ]);

        return Datatables::of($collection)
            //column added from the values of the collection
            ->addColumn('default', function ($item) {
                return $item['age'] == 12 ?
                "<i class='fa fa-check-circle'></i>" :
                "<i class='far fa-circle'></i>";
            })
            //column with actions
            ->addColumn('action', function ($item) {
                return '
                <a href="" class="btn btn-link" data-toogle="edit" ><i class="fa fa-pencil-alt"></i> '.Lang::get('architect::datatables.edit').'</a>&nbsp;
                <a href="#" class="btn btn-link text-danger has-event" data-type="delete" data-payload="'.$item['id'].'" ><i class="fa fa-trash-alt"></i> '.Lang::get('architect::datatables.delete').'</a> &nbsp;
                ';
            })
            ->rawColumns(['default', 'action'])   //columns with html
            ->make(true);
    }
}
