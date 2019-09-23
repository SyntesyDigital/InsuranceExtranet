<?php
namespace Modules\Extranet\Jobs\RouteParameter;

use Modules\Extranet\Http\Requests\RoutesParameters\DeleteRouteParameterRequest;
use Modules\Extranet\Entities\RouteParameter;

use Config;
use Carbon\Carbon;

class DeleteRouteParameter
{
  //  use FormFields;

    public function __construct(RouteParameter $route_parameter)
    {
      $this->route_parameter = $route_parameter;
    }

    public static function fromRequest(RouteParameter $route_parameter, DeleteRouteParameterRequest $request)
    {
        return new self($route_parameter);
    }

    public function handle()
    {
      return $this->route_parameter->delete();
    }
}
