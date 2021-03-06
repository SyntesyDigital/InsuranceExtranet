<?php

return [
    [
        'route' => 'extranet.elements.index',
        'icon' => 'fa-sitemap',
        'label' => Lang::get('extranet::settings.elements'),
        'roles' => [ROLE_SYSTEM],
    ],
    [
        'route' => 'extranet.routes_parameters.index',
        'icon' => 'far fa-question-circle',
        'label' => Lang::get('extranet::settings.parameters'),
        'roles' => [ROLE_SYSTEM],
    ],
    [
        'route' => 'extranet.users.index',
        'icon' => 'fas fa-users',
        'label' => Lang::get('extranet::settings.users'),
        'roles' => [ROLE_SYSTEM],
    ],
    [
        'route' => 'extranet.roles.index',
        'icon' => 'fas fa-user-shield',
        'label' => Lang::get('extranet::settings.roles'),
        'roles' => [ROLE_SYSTEM],
    ],
    [
        'route' => 'extranet.elements-models.index',
        'icon' => 'fas fa-cog',
        'label' => Lang::get('extranet::settings.element_models'),
        'roles' => [ROLE_SYSTEM],
    ],
    [
        'route' => 'extranet.services.index',
        'icon' => 'fas fa-external-link-alt',
        'label' => Lang::get('extranet::settings.services'),
        'roles' => [ROLE_SYSTEM],
    ],
];
