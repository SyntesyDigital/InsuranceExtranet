<?php
namespace Modules\Extranet\Jobs\Element;

use Modules\Extranet\Http\Requests\Elements\UpdateElementRequest;

use Modules\Extranet\Entities\Element;
use Modules\Extranet\Entities\ElementField;
use Modules\Extranet\Entities\ElementAttribute;
use Modules\Architect\Entities\Page;

use Modules\Extranet\Jobs\Validation\ElementsPageRouteValidation;
use Modules\Extranet\Jobs\Validation\ElementsModalValidation;
use Modules\Extranet\Tasks\Elements\ValidateElementFieldPageRouteParameters;

use Config;
use Carbon\Carbon;

class UpdateElement
{
  //  use FormFields;

    public function __construct(Element $element, array $attributes = [])
    {
      $this->element = $element;

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

    public static function fromRequest(Element $element, UpdateElementRequest $request)
    {
        return new self($element, $request->all());
    }

    public function handle()
    {
      $this->element->name = $this->attributes['name'];
      $this->element->identifier = $this->attributes['identifier'];
      $this->element->icon =$this->attributes["icon"];
      $this->element->has_parameters = count($this->attributes["parameters"]) > 0 ? 1:0;
      $this->element->save();

      // Delete all errors on ElementField
      $this->element->fields->map(function($field) {
        $field->errors()->delete();
      });

      // Rebuild all fields
      $this->element->fields()->delete();

      foreach($this->attributes["fields"] as $field) {
          $elementField = new ElementField([
            'icon' => $field['icon'],
            'name' => $field['name'],
            'identifier' => $field['identifier'],
            'type' => $field['type'],
            'rules' => isset($field['rules']) ? $field['rules'] : null,
            'settings' => $field['settings'],
            'boby' => $field['boby'],
          ]);

          $this->element->fields()->save($elementField);
      }

      // Rebuild all attrs
      $this->element->attrs()->delete();

      if(count($this->attributes["parameters"]) > 0){
        foreach ($this->attributes["parameters"] as $parameter) {
          $this->element->attrs()->save(new ElementAttribute([
              'name' => 'parameter',
              'value' => $parameter['id'],
              'settings' => json_encode($parameter['settings'])
          ]));
        }
      }

      // Check elements configuration
      ElementsPageRouteValidation::dispatch();
      ElementsModalValidation::dispatch();

      return $this->element;
    }
}
