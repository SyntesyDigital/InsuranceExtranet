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
                'identifier' => 'appUrl',
                'name' => 'appUrl',
                'label' => 'App url',
              ],
              [
                'type' => 'field',
                'input' => 'text',
                'identifier' => 'appName',
                'name' => 'appName',
                'label' => 'App name',
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
                'identifier' => 'googleAnalyticsId',
                'name' => 'googleAnalyticsId',
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
                'identifier' => 'charactersLimit',
                'name' => 'charactersLimit',
                'label' => 'Limite de caractères',
              ],
            ], //end children col
          ],
        ], //en children box
      ], //end box password
    ],
  ],

  'default' => [
    'appUrl' => 'http://localhost:8000',
    'appName' => 'App Name',
    'googleAnalyticsId' => 'UA-175206860-1',
    'charactersLimit' => '10',
  ],
];
