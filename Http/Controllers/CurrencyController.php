<?php

namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

use Modules\Extranet\Adapters\PageBuilderAdapter;
use Modules\Extranet\Services\Currency\Entities\Currency;

class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(Request $request)
    {
      return view('extranet::currencies.index');
     /*   return view('extranet::currencies.index', [
            "currencies" => $this->currencies->all()
        ]);*/
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
