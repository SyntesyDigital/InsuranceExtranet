<?php
namespace Modules\Extranet\Jobs\RouteParameter;

use Modules\Extranet\Http\Requests\RoutesParameters\CreateRouteParameterRequest;
use Modules\Extranet\Entities\RouteParameter;

use Config;
use Carbon\Carbon;

class CreateRouteParameter
{
  //  use FormFields;

    public function __construct($attributes)
    {
      $this->attributes = array_only($attributes, [
          'name',
          'identifier'
      ]);
    }

    public static function fromRequest(CreateRouteParameterRequest $request)
    {
        return new self($request->all());
    }

    public function handle()
    {
      $route_parameter = RouteParameter::create([
        'identifier' => $this->attributes['identifier'],
        'name' => $this->attributes['name'],
      ]);
      return $route_parameter;
    }
}
