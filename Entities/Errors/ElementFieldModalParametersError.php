<?php 

namespace Modules\Extranet\Entities\Errors;

use Modules\Architect\Core\EntityError\EntityError;
use Modules\Architect\Core\EntityError\EntityErrorInterface;

class ElementFieldModalParametersError extends EntityError implements EntityErrorInterface 
{
    const ERROR_MESSAGE = 'La modal n\'est pas bien configurée';
    const ERROR_TYPE = 'ELEMENT_FIELD_MODAL_PARAMETERS';

    public function getMessage()
    {
        return self::ERROR_MESSAGE;
    }
}

