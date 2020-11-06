<?php

namespace Modules\Extranet\Repositories;

use Auth;
use Exception;
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
    public function update($id, $data, $token = null, $env = null)
    {
        $url = $env ? VeosWsUrl::getEnvironmentUrl($env) : VeosWsUrl::get();
        $token = $token ? $token : Auth::user()->token;

        $response = $this->client->put($url.'personne/'.$id, [
            'json' => $data,
            'headers' => [
                'Authorization' => 'Bearer '.$token,
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

    public function getByUid($uid, $env = 'prod')
    {
        // try {
        // 1. Get Token
        $response = $this->client->post(VeosWsUrl::getEnvironmentUrl($env).'login', [
                'json' => [
                    'uid' => 'WS',
                    'passwd' => 'WS1234',
                ],
            ]);

        $payload = json_decode($response->getBody()->getContents());

        if (!$payload->token) {
            return null;
        }

        $security = [
            'headers' => [
                'Authorization' => 'Bearer '.$payload->token,
            ],
        ];

        // 2. Get ID PER of account
        $response = $this->client->get(VeosWsUrl::getEnvironmentUrl($env).'boBy/v2/WS2_SEL_IDPERLOGIN?login='.$uid, $security);

        $payload = json_decode($response->getBody()->getContents());

        $id = isset($payload->data[0]) ? $payload->data[0]->ID_PER : null;

        if (!$id) {
            return null;
        }

        // 3. Get account object
        $response = $this->client->get(VeosWsUrl::getEnvironmentUrl($env).'personne/'.$id, $security);

        return json_decode($response->getBody()->getContents());
        // } catch (Exception $ex) {
        // }

        return null;
    }

    public function flushLoginAttempt($uid, $env = 'prod')
    {
        $user = $this->getByUid($uid, $env);

        // Increase user attempts
        $user->listInfos = collect($user->listInfos)->map(function ($item, $key) {
            if ($item->key == 'INFOPER.TENTATIVE') {
                $item->value = 0;
            }

            if ($item->key == 'INFOPER.ACTIFEXTRANET') {
                $item->value = 1;
            }
            return $item;
        })->toArray();

        // Get Token
        $response = $this->client->post(VeosWsUrl::getEnvironmentUrl($env).'login', [
            'json' => [
                'uid' => 'WS',
                'passwd' => 'WS1234',
            ],
        ]);

        $payload = json_decode($response->getBody()->getContents());

        if (!$payload->token) {
            return null;
        }

        // Update user account
        $this->update($user->id, $user, $payload->token, $env);        
    }
}
