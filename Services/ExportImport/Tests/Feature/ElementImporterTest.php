<?php

namespace Modules\Extranet\Services\ExportImport\Tests\Feature;

use Modules\Extranet\Entities\Element;
use Modules\Extranet\Entities\ElementAttribute;
use Modules\Extranet\Entities\ElementField;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ElementModel;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelField;
use Modules\Extranet\Services\ElementModelLibrary\Entities\ModelProcedure;
use Modules\Extranet\Services\ElementModelLibrary\Entities\Service;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplate;
use Modules\Extranet\Services\ElementTemplate\Entities\ElementTemplateField;
use Modules\Extranet\Services\ExportImport\Exporters\ElementExporter;
use Modules\Extranet\Services\ExportImport\Importers\ElementImporter;
use Modules\Extranet\Services\ExportImport\Tests\TestCase;

class ElementImporterTest extends TestCase
{
    public function createModels()
    {
        $elementModel = ElementModel::create([
            'identifier' => 'TBPOL',
            'name' => 'TBPOL',
            'description' => 'PHPunit test',
            'icon' => 'fas fa-calculator',
            'type' => 'form-v2',
            'ws' => null,
            'ws_format' => null,
            'filtres' => null,
            'example' => null,
            'def1' => null,
            'def2' => null,
        ]);

        $service = Service::create([
            'identifier' => 'TARIFPOST',
            'name' => 'tarif',
            'http_method' => 'POST',
            'url' => 'tarif',
            'boby' => '',
            'json' => '',
            'response' => 'statusCode',
            'comment' => 'tarification',
            'response_json' => null,
        ]);

        $procedure = ModelProcedure::create([
            'service_id' => $service->id,
            'model_id' => $elementModel->id,
            'name' => 'recup infos personne connectée',
            'order' => 1,
            'configurable' => 0,
            'required' => 1,
            'repeatable' => 0,
            'repeatable_json' => null,
            'repeatable_jsonpath' => '$.',
            'preload' => 0,
        ]);

        ModelField::create([
            'procedure_id' => $procedure->id,
            'name' => 'Locataire 3 : statut',
            'identifier' => "['INFOPOL.LOC3STATUT']",
            'type' => 'CTE',
            'format' => 'text',
            'default_value' => null,
            'boby' => 'WS_EXT2_SEL_STATUTLOC',
            'jsonpath' => null,
            'example' => 'CDI',
            'required' => 0,
            'configurable' => 1,
            'visible' => 1,
        ]);

        ModelField::create([
            'procedure_id' => $procedure->id,
            'name' => 'Locataire 4 : statut',
            'identifier' => "['INFOPOL.LOC3STATUT2']",
            'type' => 'CTE',
            'format' => 'text',
            'default_value' => null,
            'boby' => 'WS_EXT2_SEL_STATUTLOC',
            'jsonpath' => null,
            'example' => 'CDI',
            'required' => 0,
            'configurable' => 1,
            'visible' => 1,
        ]);

        $element = Element::create([
            'name' => 'Attestation Lot PNO',
            'icon' => 'far fa-file',
            'identifier' => 'TBPOL',
            'model_ws' => null,
            'model_identifier' => $elementModel->id,
            'model_format' => 'FORM',
            'model_exemple' => $elementModel->id,
            'type' => 'form-v2',
            'has_parameters' => '0',
        ]);

        ElementField::create([
            'name' => 'code pays assuré',
            'type' => 'text',
            'identifier' => 'ass.cd_pays',
            'element_id' => $element->id,
            'boby' => null,
            'icon' => 'fa fa-font',
            'rules' => '{"required":null,"minCharacters":null,"maxCharacters":null,"searchable":null,"sortable":null}',
            'settings' => '{"format":null,"maxLength":null,"hasRoute":null}',
        ]);

        ElementField::create([
            'name' => 'id assuré',
            'type' => 'number',
            'identifier' => 'ass.id_per',
            'element_id' => $element->id,
            'boby' => null,
            'icon' => 'fa fa-calculator',
            'rules' => '{"required":null,"searchable":null,"sortable":null}',
            'settings' => '{"format":null,"hasRoute":null}',
        ]);

        ElementAttribute::create([
            'name' => 'parameter',
            'value' => 6,
            'element_id' => $element->id,
            'language_id' => null,
            'settings' => '{"required":true,"type":"filter"}',
        ]);

        $elementTemplate = ElementTemplate::create([
            'name' => 'test',
            'layout' => '[{"type":"row","settings":{"htmlId":null,"htmlClass":null,"hasContainer":null},"children":[{"type":"col","settings":{"htmlId":null,"htmlClass":null},"colClass":"col-xs-12 col-sm-6","children":[{"type":"item","field":{"class":"Modules\\Extranet\\Services\\ElementTemplate\\Fields\\Types\\Text","rules":{"required":null,"unique":null,"maxCharacters":null,"minCharacters":null},"label":"Texte","name":"Texte","type":"text","icon":"fa-font","settings":{"entryTitle":null,"htmlId":null,"htmlClass":null},"identifier":"temp_[0,0,0]","fieldname":"templatefield_5e823667d915a"}}]},{"type":"col","settings":{"htmlId":null,"htmlClass":null},"colClass":"col-xs-12 col-sm-6","children":[{"type":"element_field","field":{"id":12644,"element_id":88,"identifier":"causeCirconstance","name":"Cause circonstance","type":"text","boby":null,"icon":"fa fa-font","rules":{"required":false,"minCharacters":null,"maxCharacters":null},"settings":[],"errors":null,"created_at":"2020-03-30 20:06:32","updated_at":"2020-03-30 20:06:32","fieldname":"Cause circonstance","value":{"id":12644,"element_id":88,"identifier":"causeCirconstance","name":"Cause circonstance","type":"text","boby":null,"icon":"fa fa-font","rules":{"required":false,"minCharacters":null,"maxCharacters":null},"settings":[],"errors":null,"created_at":"2020-03-30 20:06:32","updated_at":"2020-03-30 20:06:32"}}}]}]},{"type":"row","settings":{"htmlId":null,"htmlClass":null,"hasContainer":null},"children":[{"type":"col","settings":{"htmlId":null,"htmlClass":null},"colClass":"col-xs-12 col-sm-6","children":null},{"type":"col","settings":{"htmlId":null,"htmlClass":null},"colClass":"col-xs-12 col-sm-6","children":null}]}]',
            'element_id' => $element->id,
        ]);

        ElementTemplateField::create([
            'name' => 'templatefield_5e823667d915a',
            'language_id' => 1,
            'template_id' => 1,
            'value' => 'test',
        ]);
    }

    public function testExport()
    {
        $this->createModels();

        // Get clean procedure array
        $arr = Element::first()->toArray();
        array_forget($arr, 'id');
        array_forget($arr, 'updated_at');
        array_forget($arr, 'created_at');

        // Export element
        $exporter = new ElementExporter(Element::first());
        $export = $exporter->export();

        // Test Element exported
        $this->assertTrue(md5(json_encode($arr, JSON_NUMERIC_CHECK)) == md5(json_encode($export['attributes'], JSON_NUMERIC_CHECK)));

        $arr = ElementModel::first()->toArray();
        array_forget($arr, 'id');
        array_forget($arr, 'updated_at');
        array_forget($arr, 'created_at');

        // Test ElementModel exported
        $this->assertTrue(md5(json_encode($arr, JSON_NUMERIC_CHECK)) == md5(json_encode($export['relations']['elementModel']['attributes'], JSON_NUMERIC_CHECK)));

        // Test ModelProcedure exported
        $arr = ModelProcedure::first()->toArray();
        array_forget($arr, 'id');
        array_forget($arr, 'service_id');
        array_forget($arr, 'model_id');
        array_forget($arr, 'updated_at');
        array_forget($arr, 'created_at');

        $this->assertTrue(md5(json_encode($arr, JSON_NUMERIC_CHECK)) == md5(json_encode($export['relations']['elementModel']['relations']['procedures'][0]['attributes'], JSON_NUMERIC_CHECK)));
    }

    public function testImport()
    {
        $this->createModels();

        // Export element
        $exporter = new ElementExporter(Element::first());
        $export = $exporter->export();

        // Import element
        $importer = new ElementImporter(json_encode($export, JSON_NUMERIC_CHECK));
        $importer->import();

        $this->assertTrue(Element::count() == 2);

        // Check if ElementModel not imported because already exist
        $this->assertTrue(ElementModel::count() == 1);

        sleep(1);

        // Check if import ElementModel when modelProcedure change
        ModelProcedure::first()
            ->update([
                'name' => 'Testing import',
            ]);

        $importer = new ElementImporter(json_encode($export, JSON_NUMERIC_CHECK));
        $importer->import();

        $this->assertTrue(ModelProcedure::count() == 2);
    }
}
