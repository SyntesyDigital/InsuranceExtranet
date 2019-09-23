<?php

return [
    'fields' => [
      'text' => [
        'mapping' => 'texte',
        'identifier' => 'text',
        'label' => 'Text',
        'icon' => 'fa fa-font',
        'formats' => [
          'email',
          'telephone'
        ],
        'rules' => [
          'required',
          'minCharacters',
          'maxCharacters',
          'searchable',
          'sortable',
          'sortableByDefault'
        ],
        'settings' => [
          'format',
          'maxLength',
          'hasRoute'
        ]
      ],
      'number' => [
        'mapping' => 'num',
        'identifier' => 'number',
        'label' => 'Number',
        'icon' => 'fa fa-calculator',
        'formats' => [
          'price',
          'price_with_decimals',
        ],
        'rules' => [
          'required',
          'searchable',
          'sortable',
          'sortableByDefault'
        ],
        'settings' => [
          'format',
          'hasRoute'
        ]
      ],
      'date' => [
        'mapping' => 'date',
        'identifier' => 'date',
        'label' => 'Date',
        'icon' => 'far fa-calendar',
        'formats' => [
          //'day_month_year_time',
          'day_month_year',
          'month_year',
          'year',
          'hour'
        ],
        'rules' => [
          'required',
          'searchable',
          'sortable',
          'sortableByDefault'
        ],
        'settings' => [
          'format'
        ]
      ],
      'select' => [
        'mapping' => 'select',
        'identifier' => 'select',
        'label' => 'Boby List',
        'icon' => 'fas fa-sort',
        'formats' => [
        ],
        'rules' => [
          'required',
          'searchable',
          'sortable',
          'sortableByDefault'
        ],
        'settings' => [
          'ws' => ''
        ]
      ],
      'file' => [
        'mapping' => 'doc',
        'identifier' => 'file',
        'label' => 'File',
        'icon' => 'fas fa-paperclip',
        'formats' => [
        ],
        'rules' => [
          'required',
          'searchable',
          'sortable',
          'sortableByDefault'
        ],
        'settings' => [
          'ws' => ''
        ]
      ],
      'richtext' => [
        'mapping' => 'richtext',
        'identifier' => 'richtext',
        'label' => 'Rich Text',
        'icon' => 'fas fa-align-left',
        'formats' => [
        ],
        'rules' => [
          'required',
          'minCharacters',
          'maxCharacters',
          'searchable',
          'sortable',
          'sortableByDefault'
        ],
        'settings' => [
          'ws' => ''
        ]
      ],
      'list' => [
        'mapping' => 'list',
        'identifier' => 'list',
        'label' => 'Fields list',
        'icon' => 'fas fa-list',
        'formats' => [
        ],
        'rules' => [
          'required',
        ],
        'settings' => [
        ],
        'fields' => [

        ]
      ]
    ]
];
