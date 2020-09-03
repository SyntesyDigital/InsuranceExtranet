<?php

namespace Modules\Extranet\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\Extranet\Services\SiteConfigurations\Entities\SiteConfiguration;
use Modules\Extranet\Services\SiteConfigurations\Jobs\UpdateSiteConfiguration;
use Modules\Extranet\Services\SiteConfigurations\Transformers\SiteConfigurationsFormTransformer;

class SiteConfigurationsController extends Controller
{
    public function index()
    {
        //at the moment we only have one config file called general
        return redirect()->route('site.configuration.show', 'general');
    }

    public function show($name)
    {
        $data = [
                'layout' => config('siteConfigurations.'.$name),
            ];

        $siteConfiguration = SiteConfiguration::where('identifier', $name)->first();

        return view('extranet::site-configurations.form', [
              'layout' => $data,
              'form' => $siteConfiguration, // object for the update
              'name' => $name,
              'fields' => (new SiteConfigurationsFormTransformer($siteConfiguration))->toArray(),
            ]);
    }

    public function update(SiteConfiguration $siteConfiguration, Request $request)
    {
        $siteConfiguration = dispatch_now(UpdateSiteConfiguration::fromRequest($siteConfiguration, $request));

        return $siteConfiguration ? response()->json([
                'success' => true,
                'siteConfiguration' => $siteConfiguration,
            ]) : response()->json([
                'success' => false,
            ], 500);
    }

    /*public function delete(Style $style, DeleteStyleRequest $request)
    {
        return dispatch_now(DeleteStyle::fromRequest($style, $request)) ? response()->json([
            'success' => true
        ]) : response()->json([
            'success' => false
        ], 500);
    }*/
}
