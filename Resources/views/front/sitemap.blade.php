<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  @foreach($languages as $language => $languageObject)
    @foreach($urls as $urlLanguages)
        @php
          $currentUrl = $urlLanguages[$language];
        @endphp
        <url>
          <loc>{{$currentUrl["url"]}}@if(isset($currentUrl["slug"]))/{{$currentUrl["slug"]}}@endif</loc>

          @if(isset($currentUrl["priority"]))
            <priority>{{$currentUrl["priority"]}}</priority>
          @endif

          @foreach($urlLanguages as $key => $urlLanguage)
             @php
               $altUrl = $urlLanguages[$key];
             @endphp
             <xhtml:link
                rel="alternate"
                hreflang="{{$key}}"
                href="{{$altUrl["url"]}}@if(isset($altUrl["slug"]))/{{$altUrl["slug"]}}@endif"
                />
          @endforeach
        </url>
    @endforeach
  @endforeach
</urlset>
