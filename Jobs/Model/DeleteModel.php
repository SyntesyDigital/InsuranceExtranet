<?php
namespace Modules\Extranet\Jobs\Model;

use Modules\Extranet\Http\Requests\Models\DeleteModelRequest;
use Modules\Extranet\Entities\ExtranetModel;

use Config;
use Carbon\Carbon;

class DeleteModel
{
  //  use FormFields;

    public function __construct(ExtranetModel $model)
    {
      $this->model = $model;
    }

    public static function fromRequest(ExtranetModel $model, DeleteModelRequest $request)
    {
        return new self($model);
    }

    public function handle()
    {     
      return $this->model->delete();
    }
}
