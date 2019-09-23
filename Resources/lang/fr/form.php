<?php

return [

    'common' => [
        'submit' => 'Valider',
        'cancel' => 'Retour',
        'add_row' => 'Ajouter une ligne',
        'yes' => 'Oui',
        'no' => 'Non',
        'edit' => 'Modifier',
        'success' => 'Succès',
        'error' => 'Error',
        'connection' => 'Connexion',
        'login' => 'Connexion',
        'register' => 'Enregistrer',
        'profile' => 'Mon profil',
        'test' => 'TEST ENVIRONMENT',
        'disconnect' => 'Déconnexion',
        'open' => 'Ouvrir',
        'see_more' => 'Voir +'
    ],

    'errors' => [
        'title' => 'Des données ne sont pas bien renseignées',
        'multi_company' => "la vue multi-pays n'est pas encore disponible, utilisez un compte par pays",
        'no_company' => "This user has no company connected",
        'negative_value' => "Impossible de diminuer le montant des règlements enregistrés contactez l'assistance."
    ],

    'flash' => [
      'create_error' => 'An error ocurred.',
      'create_success' => 'Stored successfully!',
      'societe_error' => 'This user doesn\'t have a Societe',
      'remove_success' => 'Removed successfully!',
      'remove_confirmation' => 'Are you sure you want to remove this item ? ',
      'send_password' => 'Mot de passe envoyé avec succès',
      'send_error' => 'Cette URL a déjà été utilisée',
      'token_missmatch' => 'Erreur d\'incompatibilité du token',
      'email_error' => 'Aucun utilisateur trouvé avec cet email'
    ],

    'home' => [
      'title' => 'Dashboard',
      'stats_1' => 'Nombre de Polices',
      'stats_2' => 'Primes émises',
      'stats_3' => 'Nombre de sinistres',
      'currency' => 'Devise'
    ],

    'customer' => [
        'title' => [
            'subscriptor' => 'Client - Souscripteur',
            'new_customer' => 'Nouveau client',
            'edit_customer' => 'Modifier client'
        ],
        'label' => [
            'type' => 'Type',
            'customer' => 'Client',
            'name' => 'Nom',
            'group' => 'Groupe international',
            'address' => 'Adresse',
            'postcode' => 'Code postal',
            'city' => 'Ville',
            'country' => 'Pays',
            'phone' => 'Téléphone',
            'first_name' => 'Prénom',
            'last_name' => 'Nom',
            'function' => 'Fonction',
            'email' => 'Email',
            'particular' => 'Particulier',
            'company' => 'Entreprise',
            'longitude' => 'Longitude',
            'latitude' => 'Latitude',
            'new' => 'Nouveau client',
            'societe_text' => "Chaque société souscriptrice d'une police d'assurance doit être référencée en tant que client",
            'dedicated_team' => 'Équipe dédiée',


			      'contact_main' => 'Contact principal chez le client',
            'nbpolicies' => 'Nb Polices',
            'primesttc' => 'Primes TTC',
            'primesN1' => 'Primes TTC N-1',

            'customershow' => 'Détail client',
            'customeredit' => 'Editer client',
            'affiliate' => 'Filiale dans le périmètre de ce contrat',
            'polices_list' => 'Liste des polices',

            'branch' => 'Branche',
            'subbranch' => 'Sous branche',
            'carrier' => 'Assureur',
            'policenum' => 'No Police',
            'currency' => 'Devise'
        ],
    ],

    'user' => [
        'title' => 'Mon profil',
        'label' => [
            'first_name' => 'Prénom',
            'last_name' => 'Nom',
            'company' => 'Société',
            'country' => 'Pays',
            'email' => 'Email',
            'cellphone' => 'Tel mobile',
            'phone' => 'Tel fixe',
            'password' => 'Ancien mot de passe',
            'password_new' => 'Nouveau mot de passe',
            'password_confirm' => 'Confirmation mot de passe',
        ],
        'errors' => [
            'current_password' => 'Mot de passe actuel incorrect',
            'confirm_password' => 'La confirmation du mot de passe indiqué est incorrect'
        ]
    ],

    'policy' => [
        'title' => 'Création police',
        'label' => [

          'show' => 'Détail de la police',
          'client' => 'CLIENT - SOUSCRIPTEUR',
          'detail' => 'Détail de la police',
          'policy' => 'Police',
          'type' => 'Programme international ?',
          'policy_num' => 'N° de police locale',
          'carrier' => 'Assureur',
          'section' => 'Grande branche',
          'sub_section' => 'Branche',
          'product' => 'Produit',
          'effect_date' => 'Date d\'effet',
          'mastery' => 'Echeance principale',
          'duration' => 'Durée police (mois)',
          'type_regularization' => 'Type de regularisation',
          'resilation_notice' => 'Préavis de résiliation (mois)',
          'state' => 'Etat',
          'date_resilation' => 'Date de résiliation',
          'splitting' => 'Fractionnement',
          'currency' => 'Devise',
          'production_manager' => 'Gestionnaire production',
          'sinister_manager' => 'Gestionnaire sinistres',
          'commission_rate' => 'Taux de commission %',
          'retrocession_rate' => 'Taux de rétrocessions (si apporteurs rémunérés)',
          'bonus_ht' => 'Prime HT / an',
          'bonus_ttc' => 'Prime TTC / an',
          'risks' => 'Risques assurés',

          'type_1' => 'Semi-différence',
          'type_2' => 'Chiffre d\'affaires',

        ]
    ],

    'risks' => [
      'title' => 'Détail des risques de la police',
      'label' => [
        'risks' => 'Risques de la police',
        'limits' => 'Limites des garanties',

        'date' => 'Date',
        'garantie' => 'Garantie',
        'capital_type' => 'Capital type',
        'limit_garantie' => 'Limite de garantie',
        'franchise_type' => 'Franchise Type',
        'franchise' => 'Franchise',
        'franchise_max' => 'Franchise Max',
        'franchise_min' => 'Franchise Min',
        'effectif' => 'Effectif',
        'value' => 'Valeur des biens',
        'currency' => 'Devise'
      ],
    ],

    'policy_bonus' => [
        'title' => 'Détail des primes (tableau saisissable)',
        'label' => [
          'section_title' => 'Primes',
          'date' => 'Emise le',
          'date_start' => 'A effet du',
          'date_end' => 'A effet jusqu’au',
          'ttc' => 'TTC',
          'ht' => 'HT',
          'com' => 'Com',
          'currency' => 'Devise',
          'created_date' => 'Réglée le',
          'payment_date' => 'Paiement compagnie'
        ]
    ],



    'documents' => [
      'title' => 'Rattachement de documents',
      'label' => [
        'doc' => 'Doc',
        'type' => 'Type',
        'date' => 'date d\'ajout',
        'comment' => 'Libellé ou commentaire'
      ],
    ],

    'sinister' => [
        'title' => 'Sinistre',
        'title_garanties' => 'Règlements et provisions',
        'label' => [
            'firstname' => '',
            'add' => 'Saisie du sinistre',
            'country' => 'Pays',
            'detail' => 'Détail du sinistre',
            'form_text' => "Ce formulaire permet de déclarer les sinistres les plus importants",
            'customer' => 'Client',
            'group' => 'Groupe international',
            'branch' => 'Branche',
            'sub-branch' => 'Sous-branche',
            'insurer' => 'Assureur',
            'policy_number' => 'N° police',
            'policy_date' => 'Effet police',
            'policy_status' => 'Etat police',
            'broker_number' => 'Référence courtier',
            'insurer_number' => 'Référence assureur',
            'occurrence_date' => 'Date de survenance',
            'close_date' => 'Date de clôture',
            'damages_others' => 'Dommages à des tiers (RC)',
            'damages_insured' => 'Dommages à l\'assuré',
            'wounded' => 'Blessés, dommages corporels',
            'declaration_date' => 'Date déclaration',
            'responsability' => 'Responsabilité',
            'nature' => 'Nature',
            'notice_of_termination' => 'Préavis résiliation',
            'circumstance' => 'Circonstances',
            'subsidiary_company' => 'Filiale concernée',

            'paid_rc' => 'Réglé RC (Franchise incluse)',
            'remaining_provision' => 'Provision restante en RC (Franchise incluse)',
            'paid_damages' => 'Réglé en dommages (Franchise incluse)',
            'remaining_provision_damages' => 'Provision restante en dommages (Franchise incluse)',

            'pending_recourse' => 'Recours en attente',
            'paid_recourse' => 'Recours encaissé',
            'customer_franchise' => 'Franchise client',
            'type' => 'Type',
            'customer_reference' => 'Référence client',
            'reassureur_reference' => 'Référence réassureur',
            'apperteur_reference' => 'Référence courtier master',
            'ref_expert' => 'Référence expert',

            'exercise' => 'Exercice',

            'type_1' => 'Matériel',
            'type_2' => 'Immatériel',
            'type_3' => 'Corporel',
            'type_4' => 'Matériel et corporel',

            'non_determine' => 'Non déterminé',
            'contestable' => 'Contestable',

            'garanties' => [
              'garantie' => 'Garantie',
              'provision' => 'Provision',
              'reglement' => 'Règlement',
              'recourse_encaisse' => 'Recours encaissé',
              'recourse_attente' => 'Recours attente',
              'franchise' => 'Franchise',
              'franchise_estimees' => 'Franchises estimées',
              'franchises_reglees' => 'Franchises réglées',
              'date_update' => 'Date de modification',
              'currency' => 'Devise'
            ]
        ]
    ],

    'sinthesys' => [
      'title' => 'Synthèse Sinistres (Stats)',
      'label' => [
        'add' => 'Saisie synthèse sinistre (Stats)',
        'exercise' => 'Exercice (Année)',
        'nature' => 'Nature',
        'nb_sinisters' => 'Nb de sinistres',
        'nb_sinisters_current' => 'dont en cours',
        'reglements_assure' => "Dommages de l'assuré réglés",
        'reglements_tiers' => "Dommages des tiers réglés",
        'estim_restante_assure' => "Provision dommages de l'assuré",
        'estim_restante_tiers' => "Provision dommages des tiers",
        'franchise' => 'Franchises',
        'date' => 'Dernière mise à jour',
      ]
    ],

    'detail' => [
      'title' => 'Détail des coûts par garantie',
      'label' => [
        'date' => 'Date de mise à jour de la ligne',
        'year' => 'Exercice (Année)',
        'guarantee' => 'Garantie',
        'sub_category' => 'Sous catégorie',
        'amount' => 'Montant réglé',
        'supplies' => 'Provisions en cours',
        'resource_payed' => 'Recours encaissés',
        'resource_provided' => 'Recours prévus',
        'total_charged_insurance' => 'Total charge assureur',
        'total_charged_customer' => 'Total charge client'
      ]
    ],

    'modal-password' => [
        'title' => 'Vous devez mettre à jour votre mot de passe',
        'label' => [
            'password_new' => 'Nouveau mot de passe',
            'password_confirm' => 'Répéter le nouveau mot de passe',
            'submit' => 'Envoyer'
        ],
        'messages' => [
            'errors' => [
                'default' => 'Une erreur s\'est produite lors de la mise à jours de votre mot de passe.',
                'confirm_password' => 'La confirmation du mot de passe indiqué est incorrect',
                'empty_field' => 'Merci de renseigner tous les champs',
            ],
            'success' => 'Votre mot de passe vient d\'être mis à jour',
        ]
    ],


];
