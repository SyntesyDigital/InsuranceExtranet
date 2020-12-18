<?php

return [
    'providers' => [
        'april' => Modules\Extranet\Services\TokenLogin\Connectors\April\AprilConnector::class,
        'veos' => Modules\Extranet\Services\TokenLogin\Connectors\Veos\VeosConnector::class,
        'theoreme' => Modules\Extranet\Services\TokenLogin\Connectors\Theoreme\TheoremeConnector::class,
    ],
];
