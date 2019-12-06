<?php 

namespace Modules\Extranet\Entities\Errors;

use Modules\Architect\Core\EntityError\EntityError;
use Modules\Architect\Core\EntityError\EntityErrorInterface;
use Modules\Architect\Entities\Content;

class ElementFieldPageRouteParametersError extends EntityError implements EntityErrorInterface 
{
    const ERROR_MESSAGE = 'La route vers la page %s, sur le champ %s est mal configurée.';
    const ERROR_MESSAGE_ONLY_FIELD = 'La route pour le champs %s est mal configurée';
    const ERROR_TYPE = 'ELEMENT_FIELD_PAGE_ROUTE_PARAMETERS';

    public function getMessage()
    {
        $hasRoute = isset($this->entity->settings["hasRoute"]) ? $this->entity->settings["hasRoute"] : null;
        $page = isset($hasRoute["id"]) ? Content::find($hasRoute["id"]) : null;

        if($page) {
            return sprintf(
                self::ERROR_MESSAGE, 
                $page->title, 
                $this->entity->name
            );
        }

        return sprintf(
            self::ERROR_MESSAGE_ONLY_FIELD, 
            $this->entity->name
        );
    }
}

