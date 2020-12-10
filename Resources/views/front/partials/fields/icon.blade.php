
@php
    if(isset($field['settings'])){
        $visible = check_visible($field['settings'],$parameters);
    }
    else {
        $visible = true;
    }


    $icon = null;

    if(isset($field['value'])){
        if(isset($field['value'][App::getLocale()])){
            $icon = $field['value'][App::getLocale()];
        }else{
            $icon = $field['value'];
        }
    }

@endphp

@if (isset($icon))
    @if ($visible)

        @if (!isset($div))
            <div id="{{ $field['settings']['htmlId'] or '' }}" class="{{ $field['settings']['htmlClass'] or '' }}">
        @endif
        @if (is_creatic_enable() && is_creatic_icon($icon))
            <svg class="icon {{ $icon or '' }}" style="font-size: {{ $field['settings']['fontSize'] or '' }}px;">
                <use xlink:href="#{{ $icon or '' }}"></use>
            </svg>
        @elseif(is_font_awesome_enable())
            <i class="{{ $icon or '' }}" style="font-size: {{ $field['settings']['fontSize'] or '' }}px;"></i>
        @endif
        @if (!isset($div))
            </div>
        @endif
    @endif
@endif
