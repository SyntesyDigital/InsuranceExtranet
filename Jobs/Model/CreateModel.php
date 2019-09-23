<?php
namespace Modules\Extranet\Jobs\Model;

use Modules\Extranet\Http\Requests\Models\CreateModelRequest;
use Modules\Extranet\Entities\ExtranetModel;

use Config;
use Carbon\Carbon;

class CreateModel
{
  //  use FormFields;

    public function __construct($attributes)
    {
      $this->attributes = array_only($attributes, [
          'name',
          'identifier',
          'icon',
          'fields'
      ]);
    }

    public static function fromRequest(CreateModelRequest $request)
    {
        return new self($request->all());
    }

    public function handle()
    {
      $model = ExtranetModel::create([
        'title' => $this->attributes['name'],
        'type' => 'sinister',
        'identifier' => $this->attributes['identifier'],
        'icon' => $this->attributes['icon'],
        'config' => json_encode($this->attributes['fields']),
      ]);
      return $model;
    }
}
