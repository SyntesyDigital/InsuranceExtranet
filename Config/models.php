<?php

return [
    'fields' => [
      'text' => [
        'mapping' => 'texte',
        'identifier' => 'text',
        'label' => 'Text',
        'icon' => 'fa fa-font',
        'formats' => [
          'password',
        ],
        'rules' => [
          'required',
          'minCharacters',
          'maxCharacters',
          'searchable',
          'sortable',
          'sortableByDefault',
        ],
        'settings' => [
          'format',
          'maxLength',
          'hasRoute',
          'hasModal',
          'conditionalVisibility',
          'defaultValue',
          'conditionalFormatting',
          'conditionalIcon',
          'textAlign',
          'columnWidth',
          'readonly',
          'operation',
          'description',
          'hidden',
          'placeholder',
          'hidelabel',
          'labelInline'
        ],
      ],
      'number' => [
        'mapping' => 'num',
        'identifier' => 'number',
        'label' => 'Number',
        'icon' => 'fa fa-calculator',
        'formats' => [
          'price',
          'price_with_decimals',  //1000.00 €
          'price_with_decimals_2',  //1 000,00 €
        ],
        'rules' => [
          'required',
          'searchable',
          'sortable',
          'sortableByDefault',
          'maxNumber',
          'minNumber',
        ],
        'settings' => [
          'format',
          'hasRoute',
          'hasModal',
          'conditionalVisibility',
          'defaultValue',
          'conditionalFormatting',
          'hideCurrency',
          'textAlign',
          'columnWidth',
          'operation',
          'readonly',
          'currency',
          'description',
          'hidden',
          'hidelabel',
          'labelInline',
          'placeholder'
        ],
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
          'day_month_year_hour',
          'day_month',
          'month_year',
          'year',
          'hour',
        ],
        'rules' => [
          'required',
          'searchable',
          'sortable',
          'sortableByDefault',
          'maxDate',
          'minDate',
        ],
        'settings' => [
          'format',
          'conditionalVisibility',
          'textAlign',
          'columnWidth',
          'readonly',
          'description',
          'hidden',
          //'defaultValue'
          'hidelabel',
          'labelInline',
          'placeholder'
        ],
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
          'conditionalFormatting',
          'description',
          'hidden',
          'autosuggest',
          'hidelabel',
          'labelInline'
        ],
      ],
      'selectSearch' => [
        'mapping' => 'selectSearch',
        'identifier' => 'selectSearch',
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
          'conditionalFormatting',
          'description',
          'hidden',
          'addElement',
          'hidelabel',
          'labelInline'
        ],
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
          'conditionalFormatting',
          'description',
          'hidelabel',
          'labelInline'
        ],
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
          'conditionalFormatting',
          'description',
          'hidelabel',
          'labelInline'
        ],
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
          'sortableByDefault',
        ],
        'settings' => [
          'conditionalVisibility',
          'preview',
          'columnWidth',
          'description',
          'iframe',
          'hidelabel',
          'labelInline'
        ],
      ],
      'file_ws_fusion' => [
        'mapping' => 'doc2',
        'identifier' => 'file_ws_fusion',
        'label' => 'File fusion',
        'icon' => 'far fa-file-word',
        'formats' => [
        ],
        'rules' => [
          'required',
          'searchable',
          'sortable',
          'sortableByDefault',
        ],
        'settings' => [
          'conditionalVisibility',
          'preview',
          'columnWidth',
          'description',
        ],
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
          'sortableByDefault',
        ],
        'settings' => [
          'conditionalVisibility',
          'defaultValue',
          'textAlign',
          'description',
          'placeholder',
          'hidelabel',
          'labelInline'
        ],
      ],
      'html' => [
        'mapping' => 'html',
        'identifier' => 'html',
        'label' => 'Html',
        'icon' => 'fas fa-code',
        'formats' => [
        ],
        'rules' => [
          'required',
          'searchable',
          'sortable',
          'sortableByDefault',
        ],
        'settings' => [
          'conditionalVisibility',
          'defaultValue',
          'textAlign',
          'description',
          'hidelabel',
          'labelInline'
        ],
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
          'conditionalVisibility',
          'description',
          'hidelabel',
          'labelInline'
        ],
        'fields' => [
        ],
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
          'sortableByDefault',
        ],
        'settings' => [
          'booleanValues',
          'conditionalVisibility',
          'defaultValue',
          'bordered',
          'description',
          'hidelabel'
        ],
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
          'sortableByDefault',
        ],
        'settings' => [
          'booleanValues',
          'conditionalVisibility',
          'defaultValue',
          'description',
          'hidelabel',
          'labelInline'
        ],
      ],
      'label' => [
        'mapping' => 'LABEL',
        'identifier' => 'label',
        'label' => 'Label',
        'icon' => 'fas fa-tags',
        'formats' => [],
        'rules' => [],
        'settings' => [
          'conditionalVisibility',
          'description',
        ],
      ],
      'car' => [
        'mapping' => 'car',
        'identifier' => 'car',
        'label' => 'Vehicule',
        'icon' => 'fas fa-car-crash',
        'formats' => [],
        'rules' => [
          'required',
        ],
        'settings' => [
          'description',
          'hidelabel'
        ],
      ],
      'immat' => [
        'mapping' => 'immat',
        'identifier' => 'immat',
        'label' => 'Immat',
        'icon' => 'fas fa-car',
        'formats' => [],
        'rules' => [
          'required',
          'searchable',
        ],
        'settings' => [
          'conditionalVisibility',
          'defaultValue',
          'description',
          'hidelabel',
          'labelInline'
        ],
      ],
      'action' => [
        'mapping' => 'action',
        'identifier' => 'action',
        'label' => 'Action',
        'name' => 'Action',
        'type' => 'action',
        'icon' => 'fas fa-cog',
        'formats' => [],
        'rules' => [],
        'settings' => [
          'hasRoute',
          'hasModal',
          'conditionalVisibility',
          'conditionalIcon',
          'group',
          'description',
          'textAlign',
          'isFile',
          'isFileWSFusion',
        ],
      ],
    ],  // --- end fields ---

    'customFields' => [
      'action' => [
        'mapping' => 'action',
        'identifier' => 'action',
        'label' => 'Action',
        'name' => 'Action',
        'type' => 'action',
        'icon' => 'fas fa-cog',
        'formats' => [],
        'rules' => [],
        'settings' => [
          'hasRoute',
          'hasModal',
          'conditionalVisibility',
          'conditionalIcon',
          'group',
          'description',
        ],
      ],
    ], // --- end customFields ---

    'parameters' => [
      'settings' => [
        'required',
        'type', //filter : filter, variable
      ],
      'types' => [
        'filter', //it's totally necessary for WS, cames from Boby
        'variable', //it's for form variable, it cames from formVaraibles
      ],
    ],
];
