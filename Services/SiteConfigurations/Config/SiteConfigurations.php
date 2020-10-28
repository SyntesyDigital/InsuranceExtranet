<?php

//when adding a new variable, remember to add default value on default array.
return [
  'general' => [
    'sidebar' => [
      // -----------------------------------------------------------------//
      //      RIGHT COL
      // -----------------------------------------------------------------//

      [
        'type' => 'box',
        'title' => 'General',
        'identifier' => 'box_1',
        'children' => [
          [
            'type' => 'col',
            'class' => 'col-md-12',
            'children' => [
              [
                'type' => 'field',
                'input' => 'text',
                'identifier' => 'APP_URL',
                'name' => 'APP_URL',
                'label' => 'App url',
              ],
              [
                'type' => 'field',
                'input' => 'text',
                'identifier' => 'APP_NAME',
                'name' => 'APP_NAME',
                'label' => 'App name',
              ],
              [
                'type' => 'field',
                'input' => 'boolean',
                'identifier' => 'APP_DEBUG',
                'name' => 'APP_DEBUG',
                'label' => 'App debug',
              ],
              [
                'type' => 'field',
                'input' => 'boolean',
                'identifier' => 'BREADCUMB_IS_ACTIVE',
                'name' => 'BREADCUMB_IS_ACTIVE',
                'label' => 'Disable / Enable link breadcrumbs',
              ],
              [
                'type' => 'field',
                'input' => 'boolean',
                'identifier' => 'SEARCH_IS_ACTIVE',
                'name' => 'SEARCH_IS_ACTIVE',
                'label' => 'Enable / Disable search top bar',
              ],
            ], //end children col
          ],
        ], //en children box
      ], //end general
    ], //end sidebar

    'body' => [
      // -----------------------------------------------------------------//
      //      LEFT COL
      // -----------------------------------------------------------------//
      [
        'type' => 'box',
        'title' => 'App WS',
        'identifier' => 'box_ws',
        'children' => [
          [
            'type' => 'col',
            'class' => 'col-md-12',
            'children' => [
              [
                'type' => 'field',
                'input' => 'text',
                'identifier' => 'WS_URL',
                'name' => 'WS_URL',
                'label' => 'WS Prod (WS_URL)',
              ],
              [
                'type' => 'field',
                'input' => 'text',
                'identifier' => 'WS_URL_TEST',
                'name' => 'WS_URL_TEST',
                'label' => 'WS Preprod (WS_URL_TEST)',
              ],
              [
                'type' => 'field',
                'input' => 'text',
                'identifier' => 'WS_URL_REC',
                'name' => 'WS_URL_REC',
                'label' => 'WS Rec (WS_URL_REC)',
              ],
            ], //end children col
          ],
        ], //en children box
      ], //end WS
      [
        'type' => 'box',
        'title' => 'Google Analytics',
        'identifier' => 'box_2',
        'children' => [
          [
            'type' => 'col',
            'class' => 'col-sm-12 col-md-6',
            'children' => [
              [
                'type' => 'field',
                'input' => 'text',
                'identifier' => 'GA_ID',
                'name' => 'GA_ID',
                'label' => 'Google Analytics id',
              ],
            ],
          ], //end children col
        ],
      ], //end box Google Analytiucs

      [
        'type' => 'box',
        'title' => 'Mot de passe',
        'identifier' => 'box_3',
        'children' => [
          [
            'type' => 'col',
            'class' => 'col-sm-12 col-md-6',
            'children' => [
              [
                'type' => 'field',
                'input' => 'number',
                'identifier' => 'PASSWORD_LIMIT',
                'name' => 'PASSWORD_LIMIT',
                'label' => 'Limite de caractères',
              ],
            ], //end children col
          ],
        ], //en children box
      ], //end box password

      [
        'type' => 'box',
        'title' => 'Utilisateur',
        'identifier' => 'box_4',
        'children' => [
          [
            'type' => 'col',
            'class' => 'col-sm-12 col-md-6',
            'children' => [
              [
                'type' => 'field',
                'input' => 'text',
                'identifier' => 'URL_MY_ACCOUNT',
                'name' => 'URL_MY_ACCOUNT',
                'label' => 'URL Lien Mon Compte',
              ],
            ], //end children col
          ],
        ], //en children box
      ], //end box password
    ],
  ],

  'default' => [
    'APP_URL' => 'http://localhost:8000',
    'APP_NAME' => 'App Name',
    'GA_ID' => '',
    'PASSWORD_LIMIT' => '6',
  ],
];
