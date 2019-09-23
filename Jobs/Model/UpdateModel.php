<?php
namespace Modules\Extranet\Jobs\Model;

use Modules\Extranet\Http\Requests\Models\UpdateModelRequest;
use Modules\Extranet\Entities\ExtranetModel;

use Config;
use Carbon\Carbon;

class UpdateModel
{
  //  use FormFields;

    public function __construct(ExtranetModel $model, array $attributes = [])
    {
      $this->model = $model;
      $this->attributes = array_only($attributes, [
          'name',
          'identifier',
          'icon',
          'fields'
      ]);
    }

    public static function fromRequest(ExtranetModel $model, UpdateModelRequest $request)
    {
        return new self($model, $request->all());
    }

    public function handle()
    {
      $this->model->title = $this->attributes['name'];
      $this->model->identifier = $this->attributes['identifier'];
      $this->model->icon = $this->attributes['icon'];
      $this->model->config = json_encode($this->attributes['fields']);
      $this->model->save();

      return $this->model;
    }
}
