@php

    $fieldValue = isset($field['value']) ? $field['value'] : (isset($field['values']) ? $field['values'] : null);

    $url = isset($fieldValue) && isset($fieldValue['urls']['files']) ? asset($fieldValue['urls']['files']) : null;

    $fileName = (isset($field['value']) && isset($field['value']->uploaded_filename)) ? $field['value']->uploaded_filename : 'Télécharger le document';

    $visible = check_visible($field['settings'],$parameters);

    $storedStylesFront = \Cache::get('frontStyles');
        if(!isset($storedStylesFront)){
        $seconds = 24*3600;
        $style = \Modules\Architect\Entities\Style::where('identifier','front')->first();
        $storedStylesFront = (new \Modules\Architect\Transformers\StyleFormTransformer($style))->toArray();
        \Cache::put('frontStyles', $storedStylesFront, $seconds);
    }

    $icon = isset($storedStylesFront['iconFichierButton']) ? $storedStylesFront['iconFichierButton']->value  : 'fas fa-download' ;
    
    $subtitle = isset($storedStylesFront['subtitleFichierButton']) ? $storedStylesFront['subtitleFichierButton']->value  : 'Pdf' ;

@endphp

@if ($visible)
    @if (isset($url))
        <div class="file-field-container">
            <a 
                id="{{ $settings['htmlId'] or '' }}" 
                class="{{ $settings['htmlClass'] or '' }} {{ $class or '' }}"
                target="_blank" href="{{ $url }}">
                @if (is_creatic_enable() && is_creatic_icon($icon))
                    <svg class="icon {{ $icon or '' }}">
                        <use xlink:href="#{{ $icon or '' }}"></use>
                    </svg>
                @elseif(is_font_awesome_enable())
                    <i class="{{ $icon or '' }}" ></i>
                @endif
                <div class="label-container">
                    <span class="title-file"> {{ $fileName }}</span><br>
                    @if($subtitle)
                        <span class="subtitle-file"> {{ $subtitle }} </span>
                    @endif
                </div>
            </a>
        </div>
    @endif
@endif
