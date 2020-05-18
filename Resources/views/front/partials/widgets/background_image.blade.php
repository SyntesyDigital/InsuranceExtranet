@php
    $identifier = str_replace(",","",$field['identifier']);
    $identifier = str_replace("[","",$identifier);
    $identifier = str_replace("]","",$identifier).'_'.$iterator;
    $visible = check_visible($field['settings'],$parameters);
@endphp

@if($visible)
    @php
        $crop = "large";
        $settings = isset($settings) ? $settings : $field['settings'];
        $settings = json_decode(json_encode($settings), true);

        if(isset($settings) && isset($settings['cropsAllowed']) && $settings['cropsAllowed'] != null){
            $crop = $settings['cropsAllowed'];
        }

        $image = isset($field['fields'][0]['value']) && $field['fields'][0]['value']->getUrlsAttribute()[$crop] != null ? $field['fields'][0]['value']->getUrlsAttribute()[$crop] : null;
        $height = isset($settings['height'])  && $settings['height'] != null ? $settings['height'] : '200';
        
    @endphp 

    <div id="{{$field['settings']['htmlId'] or ''}}" class="background-image-widget-container {{$field['settings']['htmlClass'] or ''}}">
        <div id="background-image-widget" class="background-image-widget" style="background-image: url('/{{ $image }}'); min-height: {{ $height }}px;"></div>
    </div>

    @push('javascripts')
    <script>
        $(function(){
            $('div.row:has(div#background-image-widget)').addClass('background-image-widget-row');
        });
    </script>
    @endpush
@endif


  