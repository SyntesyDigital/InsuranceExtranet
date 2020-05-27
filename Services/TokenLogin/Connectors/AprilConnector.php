<?php 

namespace Modules\Extranet\Services\TokenLogin\Connectors;
use SimpleXMLElement;
use GuzzleHttp\Client;

class AprilConnector 
{
    public function handle() 
    {
        $client = new Client();

        try { 
            $response = $client->post(env('APRIL_SSO_TOKEN_ENDPOINT', 'https://sso.rec.intrapril.fr/v4/ControleJeton.asmx'), [ 
                'body' => $this->getSoapRequest(), 
                'headers' => [ 
                    'Content-Type' => 'text/xml', 
                    'SOAPAction' => 'https://sso.rec.intrapril.fr/v4/ControleJeton.asmx' // SOAP Method to post to 
                ] 
            ]);

            dd($response->getBody());

        } catch (\Exception $e) { 
            echo $e->getMessage(); 
            exit();
        } 

        
    }

    public function getSoapRequest()
    {
        // $xml = new SimpleXMLElement('<NormalXmlGoesHere xmlns="https://api.xyz.com/DataService/"></NormalXmlGoesHere>'); 
        // $xml->addChild('Data', 'Test'); 
        
        // // Removing xml declaration node 
        // $customXML = new SimpleXMLElement($xml->asXML()); 
        // $dom = dom_import_simplexml($customXML); 
        // $cleanXml = $dom->ownerDocument->saveXML($dom->ownerDocument->documentElement); 

        // $soapHeader = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'; 
        // $soapFooter = '</soapenv:Body></soapenv:Envelope>'; 
        // $xmlRequest = $soapHeader . $cleanXml . $soapFooter; 

        // return $xmlRequest;

        return '<?xml version="1.0" encoding="utf-8"?>
        <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
          <soap12:Body>
            <VerificationJeton xmlns="http://april-technologies.com/crt/service/controle-jeton/4">
              <astr_Jeton>123</astr_Jeton>
              <astr_Appellant>IGA</astr_Appellant>
            </VerificationJeton>
          </soap12:Body>
        </soap12:Envelope>';
    }


    public function setToken($token) 
    {
        $this->token = $token;
    }
}