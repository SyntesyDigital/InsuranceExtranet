<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Extranet\Repositories\ExtranetModelRepository;

use Modules\Extranet\Entities\ExtranetModel;

use Modules\Extranet\Http\Requests\Models\CreateModelRequest;
use Modules\Extranet\Http\Requests\Models\UpdateModelRequest;
use Modules\Extranet\Http\Requests\Models\DeleteModelRequest;

use Modules\Extranet\Jobs\Model\CreateModel;
use Modules\Extranet\Jobs\Model\UpdateModel;
use Modules\Extranet\Jobs\Model\DeleteModel;


use Modules\Extranet\Transformers\ModelReactTransformer;


use Config;
use Illuminate\Http\Request;
use Session;

class ModelController extends Controller
{
    public function __construct(ExtranetModelRepository $models) {
        $this->models = $models;
    }

    public function index(Request $request)
    {
        return view('extranet::models.index',['models' => $this->models->all()]);
    }

    public function data(Request $request)
    {

    }

    public function create($class)
    {
        return view('extranet::models.form',["class" => $class]);
    }

    public function show(ExtranetModel $request, $id)
    {
        $model = ExtranetModel::where('id',$id)->first();
        $info['id'] = $model->id;
        $info['name'] = $model->title;
        $info['identifier'] = $model->identifier;
        $info['icon'] = $model->icon;
        $info['fields'] = json_decode($model->config);
        return view('extranet::models.form',["model" => $info]);
    }

    public function store(CreateModelRequest $request)
    {
      $model = dispatch_now(CreateModel::fromRequest($request));

      return $model ? response()->json([
                  'success' => true,
                  'model_id' => $model->id,
              ]) : response()->json([
                  'success' => false
              ], 500);
    }

    public function update(ExtranetModel $model, UpdateModelRequest $request)
    {
      $model = dispatch_now(UpdateModel::fromRequest($model, $request));

      return $model ? response()->json([
                  'success' => true,
                  'model_id' => $model->id,
              ]) : response()->json([
                  'success' => false
              ], 500);
    }

    public function delete(ExtranetModel $model, DeleteModelRequest $request)
    {
      return dispatch_now(DeleteModel::fromRequest($model, $request)) ? response()->json([
                'success' => true
            ]) : response()->json([
                'success' => false
            ], 500);
    }

}
