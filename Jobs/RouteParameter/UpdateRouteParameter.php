<?php
namespace Modules\Extranet\Jobs\RouteParameter;

use Modules\Extranet\Http\Requests\RoutesParameters\UpdateRouteParameterRequest;
use Modules\Extranet\Entities\RouteParameter;

use Config;
use Carbon\Carbon;

class UpdateRouteParameter
{
  //  use FormFields;

    public function __construct(RouteParameter $route_parameter, array $attributes = [])
    {
      $this->route_parameter = $route_parameter;
      $this->attributes = array_only($attributes, [
          'name',
          'identifier'
      ]);
    }

    public static function fromRequest(RouteParameter $route_parameter, UpdateRouteParameterRequest $request)
    {
        return new self($route_parameter, $request->all());
    }

    public function handle()
    {
      $this->route_parameter->name = $this->attributes['name'];
      $this->route_parameter->identifier = $this->attributes['identifier'];
      $this->route_parameter->save();

      return $this->route_parameter;
    }
}
