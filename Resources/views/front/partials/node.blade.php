{{-- ROW --}}
@if($node['type'] == "row")
    <div 
        id="{{$node['settings']['htmlId'] or ''}}" 
        class="row {{$node['settings']['htmlClass'] or ''}} {{$node['settings']['boxClass'] or ''}}"
    >
    @if($node['settings']['hasContainer'])
        <div class="container">
            <div class="row">
    @endif
@endif

{{-- COL --}}
@if($node['type'] == "col")
    <div 
        id="{{$node['settings']['htmlId'] or ''}}" 
        class="{{$node['colClass']}} {{$node['settings']['htmlClass'] or ''}} {{$node['settings']['boxClass'] or ''}} "
    >
@endif

{{-- FIELDS --}}
@if($node['type'] == "item")
  @if(isset($node['field']))
    @if(isset($node['field']['type']) && ( $node['field']['type'] == "widget" || $node['field']['type'] == "widget-list") )

        @includeIf('extranet::front.partials.widgets.' . strtolower($node['field']['label']),[
            "field" => $node['field'],
            "iterator" => $iterator
        ])

    @else
    
        @if(isset($node['field']['type']) && isset($node['field']['value']))
            @includeIf('extranet::front.partials.fields.' . $node['field']['type'], [
                "field" => $node['field'],
                "settings" => $node['field']['settings'],
            ])
        @endif
    @endif
  @endif
@endif

{{-- RECURSIVE CALL --}}
@if(isset($node['children']))
    @php 
        $isVisible = isset($node['settings']) && isset($node['settings']['conditionalVisibility'])
            ? check_visible($node['settings'], $parameters)
            : true;
    @endphp 

    @if($isVisible)
        @foreach($node['children'] as $index => $n)

            @php 
                $isVisible = true;

                if($n['type'] == "row" || $n['type'] == "col") {
                    $conditionalVisibility = isset($n['settings']['conditionalVisibility'])
                        ? $n['settings']['conditionalVisibility']
                        : null;

                    if($conditionalVisibility) {
                        $isVisible = check_visible($n['settings'], $parameters);
                    } 
                }
            @endphp 

            @if($isVisible)
                @include('extranet::front.partials.node', [
                    'node' => $n,
                    'iterator' => $index,
                ])
            @endif

        @endforeach
    @endif
@endif

{{-- CLOSE BOX --}}
@if($node['type'] == "box")
        </div>
    </div>
@endif

{{-- CLOSE ROW AND COL --}}
@if($node['type'] == "row" || $node['type'] == "col")
        @if(isset($node['settings']['hasContainer']) && $node['settings']['hasContainer'])
            </div>
        </div>
        @endif
    </div>
@endif
