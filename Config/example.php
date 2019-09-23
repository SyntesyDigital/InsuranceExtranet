<?php

return [
    'rules' => [
        'title' => 'required',
        'description' => 'required',
        'recipient_id' => 'required',
        'contract' => 'required',
        //'salary' => 'required',
        // 'schedule' => 'required',
        'perfil' => 'required',
        'start_at' => 'required',
        'job_1' => 'required',
    ],
    'messages' => [
        'title.required' => 'Le champ titre est obligatoire',
        'description.required' => 'Le champ description est obligatoire',
        'recipient_id.required' => 'Le destinataire est obligatoire',
        'contract.required' => 'Le type de contrat est obligatoire',
        'schedule.required' => 'Vous devez indiquer au moins un horaire',
        'perfil.required' => 'Le champs du profil recherché est obligatoire',
        'start_at.required' => 'La date de publication est obligatoire',
        'job_1.required' => 'Le métier est obligatoire',
    ],

    'form' => [
      'right' => [

          // -----------------------------------------------------------------//
          //      RIGHT COL
          // -----------------------------------------------------------------//

            [
                'type' => 'col',
                'class' => 'col-md-12',
                'childs' => [
                    [
                        'type' => 'box',
                        'title' => 'Publication',
                        'subtitle' => '',
                        'childs' => [
                            [
                                'type' => 'field',
                                'input' => 'list',
                                'identifier' => 'offer_status',
                                'name' => 'status',
                                'label' => 'Status',
                                'default' => ''
                            ],
                            [
                                'type' => 'field',
                                'input' => 'date',
                                'name' => 'start_at',
                                'label' => 'Date affichage début',
                            ],
                            [
                                'type' => 'field',
                                'input' => 'users',
                                'roles' => ['recruiter', 'admin'],
                                'name' => 'recipient_id',
                                'label' => 'Destinataire interne',
                                'placeholder' => '---',
                            ],
                            [
                                'type' => 'field',
                                'input' => 'customers',
                                'name' => 'customer_id',
                                'label' => 'Client',
                                'placeholder' => '---',
                            ],
                        ],
                    ],
                ],
            ],

            [
                'type' => 'br',
            ],

            // Tags

            [
                'type' => 'col',
                'class' => 'col-md-12',
                'childs' => [
                    [
                        'type' => 'box',
                        'title' => 'Tags',
                        'subtitle' => '',
                        'childs' => [
                            [
                                'type' => 'field',
                                'input' => 'tags',
                                'name' => 'tags[]',
                                'label' => 'Tags',
                            ],
                        ],
                    ],
                ],
            ],

            [
                'type' => 'br',
            ],

            // Type de contrat

            [
                'type' => 'col',
                'class' => 'col-md-12',
                'childs' => [
                    [
                        'type' => 'box',
                        'title' => 'Type de contrat',
                        'subtitle' => '',
                        'childs' => [
                            [
                                'type' => 'field',
                                'input' => 'list',
                                'identifier' => 'contracts',
                                'name' => 'contract',
                                'label' => 'Contrat',
                            ],
                        ],
                    ],
                ],
            ],

            [
                'type' => 'br',
            ],

            // Salaire

            [
                'type' => 'col',
                'class' => 'col-md-12',
                'childs' => [
                    [
                        'type' => 'box',
                        'title' => 'Salaire',
                        'subtitle' => '',
                        'childs' => [
                            [
                                'type' => 'field',
                                'input' => 'list',
                                'identifier' => 'salaries',
                                'name' => 'salary',
                                'label' => 'Fourchette de salaire',
                            ],
                        ],
                    ],
                ],
            ],

            [
                'type' => 'br',
            ],

            // Horaires

            [
                'type' => 'col',
                'class' => 'col-md-12',
                'childs' => [
                    [
                        'type' => 'box',
                        'title' => 'Horaires',
                        'subtitle' => '',
                        'childs' => [
                            [
                                'type' => 'field',
                                'input' => 'list',
                                'identifier' => 'schedule',
                                'name' => 'schedule',
                                'label' => 'Horaires',
                            ],
                        ],
                    ],
                ],
            ],
      ],

      'left' => [
          // -----------------------------------------------------------------//
          //      LEFT COL
          // -----------------------------------------------------------------//
          [
              'type' => 'col',
              'class' => 'z',
              'childs' => [
                  [
                      'type' => 'box',
                      'title' => 'Détails de l\'offre',
                      'subtitle' => '',
                      'childs' => [
                          [
                              'type' => 'field',
                              'name' => 'title',
                              'input' => 'text',
                              'label' => 'Titre',
                          ],
                          [
                              'type' => 'field',
                              'name' => 'description',
                              'input' => 'richtext',
                              'label' => 'Description',
                          ],
                          [
                              'type' => 'field',
                              'name' => 'perfil',
                              'input' => 'richtext',
                              'label' => 'Profil recherché',
                          ],
                      ],
                  ],

                  [
                      'type' => 'br',
                  ],

                  // Métiers
                  [
                      'type' => 'box',
                      'title' => 'Métiers et Secteur',
                      'subtitle' => '',
                      'childs' => [
                          [
                              'type' => 'row',
                              'childs' => [
                                  [
                                      'type' => 'col',
                                      'class' => 'col-md-6',
                                      'childs' => [
                                          [
                                              'type' => 'field',
                                              'input' => 'list',
                                              'identifier' => 'jobs1',
                                              'name' => 'job_1',
                                              'label' => 'Métier',
                                          ],
                                      ],
                                  ],
                                  [
                                      'type' => 'col',
                                      'class' => 'col-md-6',
                                      'childs' => [
                                          [
                                              'type' => 'field',
                                              'input' => 'list',
                                              'identifier' => 'jobs2',
                                              'name' => 'job_2',
                                              'label' => 'Secteur',
                                          ],
                                      ],
                                  ],
                              ],
                          ],
                      ],
                  ],

                  [
                      'type' => 'br',
                  ],
                  [
                      'type' => 'br',
                  ],

                  // Localisation
                  [
                      'type' => 'box',
                      'title' => 'Localisation',
                      'subtitle' => '',
                      'childs' => [
                          [
                              'type' => 'field',
                              'name' => 'address',
                              'id' => 'address',
                              'input' => 'text',
                              'label' => 'Adresse : Ville, Pays',
                          ],
                          [
                              'type' => 'field',
                              'name' => 'visibility',
                              'input' => 'checkbox',
                              'label' => 'Visible',
                              'value' => '1',
                          ],
                          [
                              'type' => 'map',
                              'id' => 'map-container',
                              'label' => 'Emplacement',
                          ],
                          [
                              'type' => 'field',
                              'name' => 'latitude',
                              'input' => 'hidden',
                              'id' => 'latitude',
                          ],
                          [
                              'type' => 'field',
                              'name' => 'longitude',
                              'input' => 'hidden',
                              'id' => 'longitude',
                          ],
                      ],
                  ],

                  [
                      'type' => 'br',
                  ],


              ],
          ],

      ],

    ]
];
