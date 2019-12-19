<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;

use Config;
use Illuminate\Http\Request;
use Session;
use Datatables;
use Illuminate\Support\Collection;
use Lang;

class TemplateController extends Controller
{
    public function __construct() {

    }

    /**
    *   Render template from template name. Useful to render any template.
    */
    public function template($templateName, Request $request)
    {
        return view('extranet::templates.'.$templateName.'.index');
    }

    public function datatable(Request $request)
    {

        $collection = collect([
          ['name' => 'Regena', 'age' => 12],
          ['name' => 'Linda', 'age' => 14],
          ['name' => 'Diego', 'age' => 23],
          ['name' => 'Linda', 'age' => 84],
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
                <a href="" class="btn btn-link" data-toogle="edit" ><i class="fa fa-pencil-alt"></i> '.Lang::get("architect::datatables.edit").'</a>&nbsp;
                <a href="#" class="btn btn-link text-danger" data-toogle="delete" data-confirm-message="'.Lang::get("architect::language.del_lang_msg").'"><i class="fa fa-trash-alt"></i> '.Lang::get("architect::datatables.delete").'</a> &nbsp;
                ';
            })
            ->rawColumns(['default','action'])   //columns with html
            ->make(true);
    }

}
