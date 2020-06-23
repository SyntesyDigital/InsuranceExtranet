<?php

return [
    'ROLE_SYSTEM' => 1,  //config all
    'ROLE_SUPERADMIN' => 2, //NOT USED BY NOW, create contents and config pages, don't configure elements
    'ROLE_ADMIN' => 3,  //edit styles, USEREXT.admin
    'ROLE_USER' => 4  //only front, other roles are applied to filter content
];
