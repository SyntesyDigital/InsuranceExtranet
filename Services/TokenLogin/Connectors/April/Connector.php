<?php

namespace Modules\Extranet\Services\TokenLogin\Connectors\April;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;
use Modules\Extranet\Services\TokenLogin\Connectors\Interfaces\TokenLoginConnectorInterface;

class Connector implements TokenLoginConnectorInterface
{
    /**
     * __construct.
     *
     * @param mixed $token
     * @param mixed $caller
     *
     * @return void
     */
    public function __construct($token, $caller = 'AIMM')
    {
        $this->token = $token;
        $this->caller = $caller;
    }

    /**
     * handle.
     *
     * @return void
     */
    public function handle()
    {
        $client = new Client();

        try {
            $response = $client->post('https://sso.rec.intrapril.fr/v4/ControleJeton.asmx', [
                'body' => $this->getSoapRequest(),
                'headers' => [
                    'Content-Type' => 'application/soap+xml;charset=UTF-8',
                    'SOAPAction' => 'http://april-technologies.com/crt/service/controle-jeton/4/VerificationJeton',
                ],
            ]);

            return new ResponseAdapter($this->parseSoapResponse($response->getBody()->getContents()));
        } catch (ServerException $e) {
            abort(505, $e->getResponse()->getBody()->getContents());
        } catch (Exception $e) {
            abort(505, $e->getMessage());
        } catch (ClientException $e) {
            abort(505, $e->getResponse()->getBody()->getContents());
        }

        return null;
    }

    /**
     * parseSoapResponse.
     *
     * @param mixed $response
     *
     * @return void
     */
    public function parseSoapResponse($response)
    {
        $clean_xml = str_ireplace(['SOAP-ENV:', 'SOAP:'], '', $response);
        $xml = simplexml_load_string($clean_xml);

        return json_decode(json_encode($xml->Body->VerificationJetonResponse->VerificationJetonResult));
    }

    /**
     * getSoapRequest.
     *
     * @return void
     */
    public function getSoapRequest()
    {
        return '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://april-technologies.com/crt/service/controle-jeton/4">
            <soap:Header/>
            <soap:Body>
            <ns:VerificationJeton>
                <ns:astr_Jeton>'.$this->token.'</ns:astr_Jeton>
                <ns:astr_Appellant>'.$this->caller.'</ns:astr_Appellant>
            </ns:VerificationJeton>
            </soap:Body>
        </soap:Envelope>';
    }

    /**
     * setToken.
     *
     * @param mixed $token
     *
     * @return void
     */
    public function setToken($token)
    {
        $this->token = $token;
    }

    /**
     * setCaller.
     *
     * @param mixed $caller
     *
     * @return void
     */
    public function setCaller($caller)
    {
        $this->caller = $caller;
    }
}
