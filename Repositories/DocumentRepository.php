<?php

namespace Modules\Extranet\Repositories;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use Auth;

use App\Extensions\VeosWsUrl;

class DocumentRepository
{

    const SINISTER = "SINISTRE";
    const POLICE = "PROD";

    const TAB_POLICE = "POLICE";
    const TAB_SINISTER = "SINISTRE";

    public function __construct()
    {
        $this->client = new Client();
    }

    /*
    *   Récupération d'un document
    *   API : [GET] /document/{id}
    *
    *   @return Document Object
    */
    public function getDocuments($policyId)
    {
        $response = $this->client->get(VeosWsUrl::get() . 'document/v2/police/' . $policyId . '?all=1', [
            'headers' => [
                'Authorization' => "Bearer " . Auth::user()->token
            ]
        ]);


        return json_decode($response->getBody());
    }

    /*
    *   Récupération d'un document
    *   API : [GET] /document/{id}
    *
    *   @return Document Object
    */
    public function getSinisterDocuments($sinisterId)
    {
        $response = $this->client->get(VeosWsUrl::get() . 'document/v2/sinistre/' . $sinisterId . '?all=1', [
            'headers' => [
                'Authorization' => "Bearer " . Auth::user()->token
            ]
        ]);


        return json_decode($response->getBody());
    }

    /*
    *   Récupération d'un document
    *   API : [GET] /document/{id}
    *
    *   @return Document Object
    */
    public function find($id)
    {
        $response = $this->client->get(VeosWsUrl::get() . 'document/v2/' . $id, [
            'headers' => [
                'Authorization' => "Bearer " . Auth::user()->token
            ]
        ]);

        $result = json_decode($response->getBody());

        return $result;
    }



    /*
    *   document
    *   API : [POST] /document
    *
    *   @return Document Object
    */
    public function upload($data)
    {
        $response = $this->client->post(VeosWsUrl::get() . 'document/v2', [
            'json' => $data,
            'headers' => [
                'Authorization' => "Bearer " . Auth::user()->token,
            ]
        ]);

        return json_decode($response->getBody());
    }

    public function remove($id)
    {

        $document = $this->find($id);

        $document->confid = 1;

        $response = $this->client->put(VeosWsUrl::get() . 'document/v2/'.$document->id, [
            'json' => $document,
            'headers' => [
                'Authorization' => "Bearer " . Auth::user()->token,
            ]
        ]);

        return json_decode($response->getBody());
    }

    /*
    *   Customer dedicated team document.
    *   API : [GET] /document/v2/personne/{id}
    *
    *   @return Document Object
    */
    public function getCustomerDocument($customerId)
    {
        $response = $this->client->get(VeosWsUrl::get() . 'document/v2/personne/' . $customerId, [
            'headers' => [
                'Authorization' => "Bearer " . Auth::user()->token
            ]
        ]);

        return json_decode($response->getBody());
    }

}
