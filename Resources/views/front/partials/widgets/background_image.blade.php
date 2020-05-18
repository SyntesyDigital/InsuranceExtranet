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
        /*$image = isset($field['fields'][0]['value']) && isset($field['fields'][0]['value']->getUrlsAttribute([$crop])) ? $field['fields'][0]['value']->getUrlsAttribute([$crop]) : null ) */
    @endphp 
   
    <div id="{{$field['settings']['htmlId'] or ''}}" class="background-image-widget-container {{$field['settings']['htmlClass'] or ''}}">
        <div id="background-image-widget" class="background-image-widget" data-props="">
        </div>
    </div>

    @push('javascripts')
    <script>
        $(function(){
            $('div.row:has(div#background-image-widget)').addClass('background-image-widget-row');
        });
    </script>
    @endpush
@endif