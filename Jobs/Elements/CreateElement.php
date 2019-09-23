<?php
namespace Modules\Extranet\Jobs\Element;

use Modules\Extranet\Http\Requests\Elements\CreateElementRequest;
use Modules\Extranet\Entities\Element;
use Modules\Extranet\Entities\ElementField;
use Modules\Extranet\Entities\ElementAttribute;

use Config;
use Carbon\Carbon;

class CreateElement
{
  //  use FormFields;

    public function __construct($attributes)
    {
      $this->attributes = array_only($attributes, [
          'name',
          'identifier',
          'fields',
          'icon',
          'wsModelIdentifier',
          'wsModel',
          'wsModelFormat',
          'wsModelExemple',
          'elementType',
          'has_parameters',
          'parameters'
      ]);
    }

    public static function fromRequest(CreateElementRequest $request)
    {
        return new self($request->all());
    }

    public function handle()
    {
      $element = Element::create([
        'identifier' => $this->attributes['identifier'],
        'name' => $this->attributes['name'],
        'icon' => isset($this->attributes["icon"]) ? $this->attributes["icon"] : null,
        'model_ws' => isset($this->attributes["wsModel"]) ? $this->attributes["wsModel"] : null,
        'model_identifier' => isset($this->attributes["wsModelIdentifier"]) ? $this->attributes["wsModelIdentifier"] : null,
        'model_format' => isset($this->attributes["wsModelFormat"]) ? $this->attributes["wsModelFormat"] : 'FORM',
        'model_exemple' => isset($this->attributes["wsModelExemple"]) ? $this->attributes["wsModelExemple"] : null,
        'type' => isset($this->attributes["elementType"]) ? $this->attributes["elementType"] : null,
        'has_parameters' => count($this->attributes["parameters"]) > 0 ?1:0
      ]);

      foreach($this->attributes["fields"] as $field) {
          $element->fields()->save(new ElementField([
              'icon' => $field['icon'],
              'name' => $field['name'],
              'identifier' => $field['identifier'],
              'type' => $field['type'],
              'rules' => isset($field['rules']) ? $field['rules'] : null,
              'settings' => $field['settings'],
              'boby' => $field['boby'],
          ]));
      }

      if(count($this->attributes["parameters"]) > 0){
        foreach ($this->attributes["parameters"] as $parameter) {
          $element->attrs()->save(new ElementAttribute([
              'name' => 'parameter',
              'value' => $parameter['id']
          ]));
        }
      }

//      (new CreateUrlsTypology($typology))->run();

      return $element;
    }
}
