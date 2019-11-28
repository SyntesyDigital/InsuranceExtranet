<?php 

namespace Modules\Extranet\Entities\Errors;

use Modules\Architect\Core\EntityError\EntityError;
use Modules\Architect\Core\EntityError\EntityErrorInterface;

class ElementFieldPageRouteParametersError extends EntityError implements EntityErrorInterface 
{
    const ERROR_MESSAGE = 'error message...';
    const ERROR_TYPE = 'CONTENT_ERROR';

    public function getMessage()
    {
        return ERROR_MESSAGE;
    }
}

