<?php

namespace Modules\Extranet\Services\ExportImport\Importers;

use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelField;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelProcedure;
use Modules\Extranet\Services\ElementModelLibrary\Entities\Service;
use Modules\Extranet\Services\ExportImport\Interfaces\ModelImporterInterface;

class ElementModelImporter extends Importer implements ModelImporterInterface
{
    public $duplicateIfNotExists = [
        Service::class => 'identifier',
    ];

    /**
     * import.
     *
     * @return void
     */
    public function import()
    {
        $nodes = json_decode($this->payload, true);

        $model = $this->createModel($nodes);

        foreach ($nodes['relations']['procedures'] as $node) {
            if (!isset($node['attributes'])) {
                continue;
            }

            $service = $this->saveService($node['relations']['service']);

            $procedure = ModelProcedure::create(array_merge($node['attributes'], [
                'service_id' => $service->id,
                'model_id' => $model->id,
            ]));

            $this->reportCreatedObject($procedure);

            // Save Procedure Fields
            if (isset($node['relations']['fields'])) {
                $fields = collect($node['relations']['fields'])
                    ->map(function ($field) {
                        return new ModelField($field);
                    });

                if ($fields->count() > 0) {
                    $procedure->fields()->saveMany($fields);

                    foreach ($fields as $field) {
                        $this->reportCreatedObject($field);
                    }
                }
            }
        }
    }

    /**
     * saveService.
     *
     * @param mixed $attributes
     *
     * @return void
     */
    public function saveService($attributes)
    {
        $service = Service::where('identifier', $attributes['identifier'])->first();

        if ($service) {
            $arr = $this->walkArrayAndRemoveDBFields($service->toArray());

            if ($this->getArrayChecksum($attributes) == $this->getArrayChecksum($arr)) {
                return $service;
            } else { // Check if exist service with this identifier and test if same with attributes
                $services = Service::where('identifier', 'like', '%'.$attributes['identifier'].'%')->get();

                if ($services) {
                    foreach ($services as $service) {
                        $serviceArray = $service->toArray();
                        array_forget($serviceArray, 'identifier');

                        $arr = $this->walkArrayAndRemoveDBFields($serviceArray);
                        $attrs = $attributes;

                        array_forget($attrs, 'identifier');

                        if ($this->getArrayChecksum($attrs) == $this->getArrayChecksum($arr)) {
                            return $service;
                        }
                    }
                }

                $attributes['identifier'] .= '_'.date('Ymd');
            }
        }

        // Create service
        if ($object = Service::create($attributes)) {
            // Report service
            $this->reportCreatedObject($object);
        }

        return $object;
    }

    /**
     * getArrayChecksum.
     *
     * @param mixed $arr
     *
     * @return void
     */
    public function getArrayChecksum($arr)
    {
        return md5(json_encode($arr, JSON_NUMERIC_CHECK));
    }
}
