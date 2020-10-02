<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Extranet\Entities\ExtranetModel;
use Modules\Extranet\Http\Requests\Models\CreateModelRequest;
use Modules\Extranet\Http\Requests\Models\DeleteModelRequest;
use Modules\Extranet\Http\Requests\Models\UpdateModelRequest;
use Modules\Extranet\Jobs\Model\CreateModel;
use Modules\Extranet\Jobs\Model\DeleteModel;
use Modules\Extranet\Jobs\Model\UpdateModel;
use Modules\Extranet\Repositories\ExtranetModelRepository;

class ModelController extends Controller
{
    public function __construct(ExtranetModelRepository $models)
    {
        $this->models = $models;
    }

    /**
     * index.
     *
     * @param mixed $request
     *
     * @return void
     */
    public function index(Request $request)
    {
        return view('extranet::models.index', ['models' => $this->models->all()]);
    }

    public function data(Request $request)
    {
    }

    /**
     * create.
     *
     * @param mixed $class
     *
     * @return void
     */
    public function create($class)
    {
        return view('extranet::models.form', ['class' => $class]);
    }

    /**
     * show.
     *
     * @param mixed $request
     * @param mixed $id
     *
     * @return void
     */
    public function show(ExtranetModel $request, $id)
    {
        $model = ExtranetModel::where('id', $id)->first();
        $info['id'] = $model->id;
        $info['name'] = $model->title;
        $info['identifier'] = $model->identifier;
        $info['icon'] = $model->icon;
        $info['fields'] = json_decode($model->config);

        return view('extranet::models.form', ['model' => $info]);
    }

    public function store(CreateModelRequest $request)
    {
        $model = dispatch_now(CreateModel::fromRequest($request));

        return $model ? response()->json([
                  'success' => true,
                  'model_id' => $model->id,
              ]) : response()->json([
                  'success' => false,
              ], 500);
    }

    /**
     * update.
     *
     * @param mixed $model
     * @param mixed $request
     *
     * @return void
     */
    public function update(ExtranetModel $model, UpdateModelRequest $request)
    {
        $model = dispatch_now(UpdateModel::fromRequest($model, $request));

        return $model ? response()->json([
            'success' => true,
            'model_id' => $model->id,
        ]) : response()->json([
            'success' => false,
        ], 500);
    }

    /**
     * delete.
     *
     * @param mixed $model
     * @param mixed $request
     *
     * @return void
     */
    public function delete(ExtranetModel $model, DeleteModelRequest $request)
    {
        return dispatch_now(DeleteModel::fromRequest($model, $request)) ? response()->json([
            'success' => true,
        ]) : response()->json([
            'success' => false,
        ], 500);
    }
}
