<?php

namespace Modules\Extranet\Repositories;

use Auth;
use GuzzleHttp\Client;
use Modules\Extranet\Extensions\VeosWsUrl;
use Session;

class PersonneRepository
{
    const CD_CON_EXTRANET = 'UEXT';
    const CD_CON_FILIAL = 'FILIA';
    const CD_CON_SOCIETE = 'SOC';

    const ACCESS_TYPE_PERSONNE = 'PERSONNE';
    const ACCESS_TYPE_POLICE = 'POLICE';
    const ACCESS_TYPE_QUITTANCE = 'QUITTANCE';
    const ACCESS_TYPE_SINISTRE = 'SINISTRE';

    public function __construct()
    {
        $this->client = new Client();
    }

    /*
    *   Information de la personne connectée
    *   API : [GET] /personne
    *
    *   @return Personne Object
    */
    public function getConnected($token = null)
    {
        $response = $this->client->get(env('WS_URL').'personne', [
            'headers' => [
                'Authorization' => 'Bearer '.($token ?: Auth::user()->token),
            ],
        ]);

        return json_decode($response->getBody());
    }

    /*
    *   Information d'une personne par id
    *   API : [GET] /personne/{id}
    *
    *   @return Personne Object
    */
    public function find($id)
    {
        $userData = json_decode(Session::get('user'));
        
        $response = $this->client->get(VeosWsUrl::get().'personne/'.$id, [
            'headers' => [
                'Authorization' => 'Bearer '.$userData->token,
            ],
        ]);

        return json_decode($response->getBody());
    }

    /*
    *     Tableau contact principal
    *     API : [GET] /personne/{idPersonne}/connexeTo
    */
    public function findMainContact($id)
    {
        $response = $this->client->get(VeosWsUrl::get().'personne/'.$id.'/connexeTo', [
            'headers' => [
                'Authorization' => 'Bearer '.Auth::user()->token,
            ],
        ]);

        return json_decode($response->getBody());
    }

    /*
    *     Tableau des filiales
    *     API : /personne/{id}/connexe
    */
    public function findAffiliates($id)
    {
        $response = $this->client->get(VeosWsUrl::get().'personne/'.$id.'/connexe', [
          'headers' => [
              'Authorization' => 'Bearer '.Auth::user()->token,
          ],
      ]);

        $result = json_decode($response->getBody());

        $filiales = [];

        if (isset($result)) {
            foreach ($result as $b) {
                if ($b->categorie == 'FILIALE') {
                    $filiales[] = $b;
                }
            }
        }

        return $filiales;
    }

    /*
    *     User Societe
    *     API : /personne/{id}/connexe
    */
    public function getConnexe($id)
    {
        $response = $this->client->get(VeosWsUrl::get().'personne/'.$id.'/connexe', [
          'headers' => [
              'Authorization' => 'Bearer '.Auth::user()->token,
          ],
      ]);

        return json_decode($response->getBody());
    }

    /*
    *     User Societe
    *     API : /personne/{id}/connexe
    */
    public function findSociete($id)
    {
        $response = $this->client->get(VeosWsUrl::get().'personne/'.$id.'/connexe', [
          'headers' => [
              'Authorization' => 'Bearer '.Auth::user()->token,
          ],
      ]);

        $result = json_decode($response->getBody());

        if (isset($result)) {
            foreach ($result as $b) {
                if ($b->categorie == 'SOC') {
                    return $b;
                }
            }
        }

        return null;
    }

    /*
    *   Modification d'une personne
    *   API : [PUT] /personne/{id}
    *
    *   @return Personne Object
    */
    public function update($id, $data)
    {
        $response = $this->client->put(VeosWsUrl::get().'personne/'.$id, [
            'json' => $data,
            'headers' => [
                'Authorization' => 'Bearer '.Auth::user()->token,
            ],
        ]);

        return json_decode($response->getBody());
    }

    /*
    *   Création d'une personne
    *   API : [PUT] /personne/{id}
    *
    *   @return Personne Object
    */
    public function create($data)
    {
        $response = $this->client->post(VeosWsUrl::get().'personne/', [
            'json' => $data,
            'headers' => [
                'Authorization' => 'Bearer '.Auth::user()->token,
            ],
        ]);

        //dd($response);

        return json_decode($response->getBody());
    }

    /*
    *   Création d'une personne
    *   API : [POST] /personne/{id}/connexe
    *
    *   @return Personne Object
    */
    public function connectToPersonne($personeeId, $connectedId, $codeRelation)
    {
        $data = [
        'idPer' => $connectedId,
        'cdCon' => $codeRelation,
      ];

        $response = $this->client->post(VeosWsUrl::get().'personne/'.$personeeId.'/connexe', [
          'json' => $data,
          'headers' => [
              'Authorization' => 'Bearer '.Auth::user()->token,
          ],
      ]);

        return json_decode($response->getBody());
    }

    public function resetPasswordByUID($uid, $password, $language)
    {
        $data = [
        'uid' => $uid,
        'passwd' => $password,
        'language' => $language,
      ];

        $response = $this->client->post(VeosWsUrl::get().'login/reset', [
          'json' => $data,
          'headers' => [
              'Authorization' => 'Bearer '.Auth::user()->token,
          ],
      ]);

        return $response->getStatusCode() == 200 ? true : false;
    }
}
