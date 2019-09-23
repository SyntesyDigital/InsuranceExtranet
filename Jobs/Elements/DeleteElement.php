<?php
namespace Modules\Extranet\Jobs\Element;

use Modules\Extranet\Http\Requests\Elements\DeleteElementRequest;
use Modules\Extranet\Entities\Element;

use Config;
use Carbon\Carbon;

class DeleteElement
{
  //  use FormFields;

    public function __construct(Element $element)
    {
      $this->element = $element;
    }

    public static function fromRequest(Element $element, DeleteElementRequest $request)
    {
        return new self($element);
    }

    public function handle()
    {
      return $this->element->delete();
    }
}
