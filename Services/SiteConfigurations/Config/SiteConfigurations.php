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

              [
                'type' => 'field',
                'input' => 'select',
                'identifier' => 'ON_LOGIN_TRIGGER_FORM',
                'name' => 'ON_LOGIN_TRIGGER_FORM',
                'label' => 'Modele à éxécuter lors du login',
                'options' => \Modules\Extranet\Entities\Element::where('type', 'form-v2')->get()->map(function ($element) {
                    return [
                        'name' => $element->name,
                        'value' => $element->id,
                    ];
                })->prepend([
                    'name' => '---',
                    'value' => null,
                ]),
              ],

              [
                'type' => 'field',
                'input' => 'text',
                'identifier' => 'LOGIN_LIMIT_ATTEMPTS',
                'name' => 'LOGIN_LIMIT_ATTEMPTS',
                'label' => 'Limite de tentative de connexion avant changement de mot de passe',
              ],
            ], //end children col
          ],
        ], //en children box
      ], //end box password

      [
        'type' => 'box',
        'title' => 'Sécurité des mot de passe',
        'identifier' => 'box_4',
        'children' => [
          [
            'type' => 'col',
            'class' => 'col-sm-12 col-md-6',
            'children' => [
              [
                'type' => 'field',
                'input' => 'boolean',
                'identifier' => 'PASSWORD_RULE_UPPERCASE',
                'name' => 'PASSWORD_RULE_UPPERCASE',
                'label' => 'Doit contenir au moins 1 caractères majuscule',
              ],
              [
                'type' => 'field',
                'input' => 'boolean',
                'identifier' => 'PASSWORD_RULE_LOWERCASE',
                'name' => 'PASSWORD_RULE_LOWERCASE',
                'label' => 'Doit contenir au moins 1 caractères minuscule',
              ],
              [
                'type' => 'field',
                'input' => 'boolean',
                'identifier' => 'PASSWORD_RULE_NUMBER',
                'name' => 'PASSWORD_RULE_NUMBER',
                'label' => 'Doit contenir au moins 1 numéro',
              ],
              [
                'type' => 'field',
                'input' => 'boolean',
                'identifier' => 'PASSWORD_RULE_SPECIAL',
                'name' => 'PASSWORD_RULE_SPECIAL',
                'label' => 'Doit contenir au moins 1 caractères spécial',
              ],
              [
                'type' => 'field',
                'input' => 'text',
                'identifier' => 'PASSWORD_MIN_RULES_TO_SATISFY',
                'name' => 'PASSWORD_MIN_RULES_TO_SATISFY',
                'label' => 'Minimum de règle à satisfaire',
              ],
              [
                    'type' => 'field',
                    'input' => 'text',
                    'identifier' => 'PASSWORD_RULE_MINLENGTH',
                    'name' => 'PASSWORD_RULE_MINLENGTH',
                    'label' => 'Taille minimum du mot de passe ',
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
