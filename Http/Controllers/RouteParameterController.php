<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Extranet\Repositories\RouteParameterRepository;

use Modules\Extranet\Entities\RouteParameter;

use Modules\Extranet\Http\Requests\RoutesParameters\CreateRouteParameterRequest;
use Modules\Extranet\Http\Requests\RoutesParameters\UpdateRouteParameterRequest;
use Modules\Extranet\Http\Requests\RoutesParameters\DeleteRouteParameterRequest;

use Modules\Extranet\Jobs\RouteParameter\CreateRouteParameter;
use Modules\Extranet\Jobs\RouteParameter\UpdateRouteParameter;
use Modules\Extranet\Jobs\RouteParameter\DeleteRouteParameter;


/*use Modules\Extranet\Transformers\ModelReactTransformer;*/


use Config;
use Illuminate\Http\Request;
use Session;

class RouteParameterController extends Controller
{
    public function __construct(RouteParameterRepository $routes_parameters) {
        $this->routes_parameters = $routes_parameters;
    }

    public function index(Request $request)
    {
        return view('extranet::routes_parameters.index',['routes_parameters' => $this->routes_parameters->all()]);
    }

    public function data(Request $request)
    {
      return $this->routes_parameters->getDatatableData();
    }

    public function create(Request $request)
    {
        return view('extranet::routes_parameters.form');
    }

    public function show(RouteParameter $route_parameter, Request $request)
    {
        return view('extranet::routes_parameters.form',["route_parameter" => $route_parameter]);
    }

    public function store(CreateRouteParameterRequest $request)
    {
      try {
            $route_parameter = $this->dispatchNow(CreateRouteParameter::fromRequest($request));
            Session::flash('notify_success', 'Enregistrement effectué avec succès');

            return redirect()->route('extranet.routes_parameters.show', $route_parameter);
        } catch (\Exception $e) {
            Session::flash('notify_error', $e->getMessage());
        }

        return redirect()->route('extranet.routes_parameters.create')->withInput();

    }

    public function update(RouteParameter $route_parameter, UpdateRouteParameterRequest $request)
    {
        try {
            $this->dispatchNow(UpdateRouteParameter::fromRequest($route_parameter, $request));
            Session::flash('notify_success', 'Enregistrement effectué avec succès');
        } catch (\Exception $e) {
            Session::flash('notify_error', $e->getMessage());
        }

        return redirect()->route('extranet.routes_parameters.show', $route_parameter);
    }

    public function delete(RouteParameter $route_parameter, DeleteRouteParameterRequest $request)
    {
      return dispatch_now(DeleteRouteParameter::fromRequest($route_parameter, $request)) ? response()->json([
                'success' => true
            ]) : response()->json([
                'success' => false
            ], 500);
    }

}
