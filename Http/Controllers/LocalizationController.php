<?php

namespace Modules\Extranet\Http\Controllers;

use Cache;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Architect\Entities\Language;
use Modules\Architect\Entities\Translation;

class LocalizationController extends Controller
{
    public function localization($locale, Request $request)
    {
        $language = Language::byIso($locale)->first();
        $cacheKey = 'localization.'.$locale;

        if (!$language) {
            abort(404);
        }

        $values = Cache::has($cacheKey) ? Cache::get($cacheKey) : [];

        if (empty($values)) {
            foreach (Translation::all() as $translation) {
                $field = $translation->fields->where('language_id', $language->id)->first();
                $values[$field->name] = $field->value;
            }
            Cache::forever($cacheKey, $values);
        }

        $contents = 'window.localization = '.json_encode($values, config('app.debug', false) ? JSON_PRETTY_PRINT : 0).';';
        $response = \Response::make($contents, 200);
        $response->header('Content-Type', 'application/javascript');

        return $response;
    }

    public function index($locale)
    {
        // config('app.locales') gives all supported locales
        if (!in_array($locale, config('app.locales'))) {
            $locale = config('app.fallback_locale');
        }

        // Add locale to the cache key
        $json = \Cache::rememberForever("lang-{$locale}.js", function () use ($locale) {
            $files = glob(resource_path('lang/'.$locale.'/*.php'));
            $strings = [];

            foreach ($files as $file) {
                $name = basename($file, '.php');
                $strings[$name] = require $file;
            }

            return $strings;
        });

        $contents = 'window.i18n = '.json_encode($json, config('app.debug', false) ? JSON_PRETTY_PRINT : 0).';';
        $response = \Response::make($contents, 200);
        $response->header('Content-Type', 'application/javascript');

        return $response;
    }
}
