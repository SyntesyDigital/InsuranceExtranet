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
          'hasRoute',
          'hasModal',
          'conditionalVisibility',
          'defaultValue',
          'conditionalFormatting'
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
          'sortableByDefault',
          'maxNumber',
          'minNumber'
        ],
        'settings' => [
          'format',
          'hasRoute',
          'hasModal',
          'conditionalVisibility',
          'defaultValue',
          'conditionalFormatting'
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
          'day_month_year_2',
          'day_month',
          'month_year',
          'year',
          'hour'
        ],
        'rules' => [
          'required',
          'searchable',
          'sortable',
          'sortableByDefault',
          'maxDate',
          'minDate'
        ],
        'settings' => [
          'format',
          'conditionalVisibility',
          //'defaultValue'
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
          'sortableByDefault',
        ],
        'settings' => [
          'ws',
          'conditionalVisibility',
          'defaultValue',
          'conditionalFormatting'
        ]
      ],
      'radio' => [
        'mapping' => 'radio',
        'identifier' => 'radio',
        'label' => 'Radio',
        'icon' => 'far fa-dot-circle',
        'formats' => [
        ],
        'rules' => [
          'required',
          'searchable',
          'sortable',
          'sortableByDefault',
        ],
        'settings' => [
          'ws',
          'conditionalVisibility',
          'defaultValue',
          'conditionalFormatting'
        ]
      ],
      'multi' => [
        'mapping' => 'multi',
        'identifier' => 'multi',
        'label' => 'Radio multi option',
        'icon' => 'fas fa-ellipsis-h',
        'formats' => [
        ],
        'rules' => [
          'required',
          'searchable',
          'sortable',
          'sortableByDefault',
        ],
        'settings' => [
          'ws',
          'conditionalVisibility',
          'defaultValue',
          'conditionalFormatting'
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
          'conditionalVisibility',
          'preview'
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
          'conditionalVisibility',
          'defaultValue'
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
          'conditionalVisibility'
        ],
        'fields' => [

        ]
      ],
      'boolean' => [
        'mapping' => 'boolean',
        'identifier' => 'boolean',
        'label' => 'Boolean',
        'icon' => 'far fa-check-square',
        'formats' => [],
        'rules' => [
          'required',
          'searchable',
          'sortable',
          'sortableByDefault'
        ],
        'settings' => [
          'booleanValues',
          'conditionalVisibility',
          'defaultValue',
        ]
      ],
      'yesno' => [
        'mapping' => 'yesno',
        'identifier' => 'yesno',
        'label' => 'Oui/Non',
        'icon' => 'fas fa-toggle-on',
        'formats' => [],
        'rules' => [
          'required',
          'searchable',
          'sortable',
          'sortableByDefault'
        ],
        'settings' => [
          'booleanValues',
          'conditionalVisibility',
          'defaultValue',
        ]
      ],
      'label' => [
        'mapping' => 'LABEL',
        'identifier' => 'label',
        'label' => 'Label',
        'icon' => 'fas fa-tags',
        'formats' => [],
        'rules' => [],
        'settings' => [
          'conditionalVisibility'
        ]
      ],
      'car' => [
        'mapping' => 'car',
        'identifier' => 'car',
        'label' => 'Vehicule',
        'icon' => 'fas fa-car-crash',
        'formats' => [],
        'rules' => [
          'required'
        ],
        'settings' => [
          
        ]
      ],
      'immat' => [
        'mapping' => 'immat',
        'identifier' => 'immat',
        'label' => 'Immat',
        'icon' => 'fas fa-car',
        'formats' => [],
        'rules' => [
          'required',
          'searchable'
        ],
        'settings' => [
          'conditionalVisibility',
          'defaultValue'
        ]
      ],
    ],  // --- end fields ---

    'parameters' => [
      'settings' => [
        'required',
        'type' //filter : filter, variable
      ],
      'types' => [
        'filter', //it's totally necessary for WS, cames from Boby
        'variable', //it's for form variable, it cames from formVaraibles
      ]
    ]
];
