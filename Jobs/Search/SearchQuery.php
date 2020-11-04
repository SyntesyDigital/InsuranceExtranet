<?php

namespace Modules\Extranet\Jobs\Search;

use Modules\Architect\Entities\Content;
use Modules\Extranet\Repositories\BobyRepository;

class SearchQuery
{
    private $policeId;
    private $attributes;

    public function __construct($query)
    {
        $this->query = $query;
    }

    public function handle()
    {
        // Retrieve results from boby WS
        $response = (new BobyRepository())->getQuery('WS2_MOD_RECHERCHE?'.get_session_parameter().'&rec='.$this->query);

        $results = isset($response->data)
            ? $response->data
            : [];

        // Builds array of unique slugs
        $slugs = array_unique(collect($results)->pluck('slug')->all());

        // Retrieve contents with by slugs
        $contents = Content::whereInField('slug', $slugs)
                ->with('fields')
                ->get()
                ->mapWithKeys(function ($content) {
                    return [$content->getFieldValue('slug') => $content];
                })->toArray();

        $counts = [];

        // Inject URL into result
        return collect($results)->filter(function ($result) use ($contents, &$counts) {
            $limit = get_config('SEARCH_MAX_RESULTS') ? get_config('SEARCH_MAX_RESULTS') : 5;

            if (!isset($counts[$result->category])) {
                $counts[$result->category] = 0;
            }

            if ($counts[$result->category] >= $limit) {
                return false;
            }

            ++$counts[$result->category];

            $url = isset($contents[$result->slug])
                ? $contents[$result->slug]['url']
                : null;

            $result->url = $url
                ? sprintf('%s%s', $url, $result->params)
                : false;

            return $result;
        });
    }
}
