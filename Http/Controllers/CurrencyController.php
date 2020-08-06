<?php

namespace Modules\Extranet\Http\Controllers;

use Datatables;
use Lang;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\Extranet\Services\Currency\Entities\Currency;

class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request)
    {
        return view('extranet::currencies.index');
        /*   return view('extranet::currencies.index', [
               "currencies" => $this->currencies->all()
           ]);*/
    }

    public function datatable(Request $request)
    {
        return Datatables::of(Currency::all())
            ->addColumn('label', function ($item) {
                return $item['label'];
            })
            ->addColumn('code', function ($item) {
                return $item['code'];
            })
            ->addColumn('symbole', function ($item) {
                return $item['symbole'];
            })
            ->addColumn('default', function ($item) {
                return $item['default'] ?
                "<i class='fa fa-check-circle'></i>" :
                "<i class='far fa-circle'></i>";
            })
            ->addColumn('action', function ($item) {
                return '
                <a href="#" class="btn btn-link has-event" data-type="update" data-payload="'.$item['id'].'"><i class="fa fa-pencil-alt"></i> '.Lang::get('architect::datatables.edit').'</a>&nbsp;
                <a href="#" class="btn btn-link text-danger has-event" data-type="delete" data-payload="'.$item['id'].'" ><i class="fa fa-trash-alt"></i> '.Lang::get('architect::datatables.delete').'</a> &nbsp;
                ';
            })
            ->rawColumns(['code', 'label', 'action', 'symbole', 'default'])
            ->make(true);
    }

    public function create(Request $request)
    {
        return view('extranet::currencies.form');
    }

    /*   public function data(Request $request)
       {
           return $this->currencies->getDatatable();
       }
*/
    public function show(Currencies $currency, Request $request)
    {
        return view('extranet::currencies.form', [
            'currency' => $currency,
        ]);
    }

    public function store(Request $request)
    {
        /* try {
             $currency = dispatch_now(CreateCurrencies::fromRequest($request));

             if(!$currency) {
                 throw new \Exception(Lang::get("extranet::fields.error"));
             }

             return redirect(route('currencies.show', $currency))->with('success', Lang::get("extranet::fields.success"));
         } catch (\Exception $ex) {
             $error = $ex->getMessage();
         }*

         return redirect(route('currencies.create'))->with('error', $error);*/
        return view('extranet::currencies.form');
    }

    public function update(Currencies $currency, UpdateCurrenciesRequest $request)
    {
        /*try {
            $currency = dispatch_now(UpdateCurrencies::fromRequest($currency, $request));

            if(!$currency) {
                throw new \Exception(Lang::get("extranet::fields.error"));
            }

            return redirect(route('currencies.show', $currency))->with('success', Lang::get("extranet::fields.success"));
        } catch (\Exception $ex) {
            $error = $ex->getMessage();
        }

        return redirect(route('currencies.show', $currency))->with('error', $error);*/

        return view('extranet::currencies.form');
    }

    public function delete(Currencies $currency, DeleteCurrenciesRequest $request)
    {
        /*   return dispatch_now(DeleteCurrencies::fromRequest($currency, $request)) ? response()->json([
               'success' => true
           ]) : response()->json([
               'success' => false
           ], 500);*/

        return view('extranet::currencies.form');
    }
}
