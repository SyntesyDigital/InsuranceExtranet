<?php

namespace Modules\Extranet\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Architect\Entities\Style;
use Modules\Architect\Entities\Menu;
use Modules\Architect\Entities\Content;
use Modules\Architect\Entities\ContentField;
use Modules\Architect\Entities\Page;
use Modules\Architect\Entities\Language;

class ExtranetDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $language = Language::first();

        $front = Style::create([
         'identifier' => 'front',
         'icon' => 'fas fa-desktop',
       ]);
        $back = Style::create([
         'identifier' => 'back',
         'icon' => 'fas fa-user-lock',
       ]);

        $back->fields()->create([
         'language_id' => $language->id,
         'name' => 'backPrimary',
         'value' => '{"type":"color","value":"#ff403d"}',
       ]);

        $back->fields()->create([
         'language_id' => $language->id,
         'name' => 'backSecondary',
         'value' => '{"type":"color","value":"#455660"}',
       ]);

        $front->fields()->create([
         'language_id' => $language->id,
         'name' => 'frontPrimary',
         'value' => '{"type":"color","value":"#e84b37"}',
       ]);

        $front->fields()->create([
         'language_id' => $language->id,
         'name' => 'frontSecondary',
         'value' => '{"type":"color","value":"#2a3649"}',
       ]);

        $sidebar = Menu::create([
         'name' => 'sidebar',
       ]);

        $footer = Menu::create([
         'name' => 'footer',
       ]);

        $homepagecontent = Content::create([
         'status' => 1,
         'published_at' => date('Y-m-d H:i:s'),
         'is_page' => 1,
         'settings' => '{"htmlClass":null,"pageType":null}',
         'typology_id' => null,
         'parent_id' => null,
       ]);

        $homepagecontent->languages()->attach($language);

        ContentField::create([
         'content_id' => $homepagecontent->id,
         'name' => 'title',
         'language_id' => $language->id,
         'value' => 'Home',
       ]);

        ContentField::create([
         'content_id' => $homepagecontent->id,
         'name' => 'slug',
         'language_id' => $language->id,
         'value' => 'accueil',
       ]);

        ContentField::create([
         'content_id' => $homepagecontent->id,
         'name' => 'description',
         'language_id' => $language->id,
         'value' => '<p>Home description</p>',
       ]);

        $homepage = Page::create([
         'content_id' => $homepagecontent->id,
       ]);

        $examplepagecontent = Content::create([
         'status' => 1,
         'published_at' => date('Y-m-d H:i:s'),
         'is_page' => 1,
         'settings' => '{"htmlClass":null,"pageType":null}',
         'typology_id' => null,
         'parent_id' => null,
       ]);

        $examplepagecontent->languages()->attach($language);

        ContentField::create([
         'content_id' => $examplepagecontent->id,
         'name' => 'title',
         'language_id' => $language->id,
         'value' => 'Sample Page',
       ]);

        ContentField::create([
         'content_id' => $examplepagecontent->id,
         'name' => 'slug',
         'language_id' => $language->id,
         'value' => 'sample-page',
       ]);

        ContentField::create([
         'content_id' => $examplepagecontent->id,
         'name' => 'description',
         'language_id' => $language->id,
         'value' => '<p>Sample page description</p>',
       ]);

        $examplepage = Page::create([
         'content_id' => $examplepagecontent->id,
       ]);
    }
}
