{{-- ROW --}}
@if($node['type'] == "row")
    <div class="row">
@endif

{{-- COL --}}
@if($node['type'] == "col")
    <div class="{{$node['class']}}">
@endif

{{-- BOX --}}
@if($node['type'] == "box")
    <!--div class="card">
        <div class="card-body"-->
            <h3 class="card-title">{{$node['title'] or ''}}</h3>
            @if(isset($node['subtitle']))
            <h6 class="card-subtitle mb-2 text-muted">{{$node['subtitle'] or ''}}</h6>
            @endif
@endif

{{-- HR --}}
@if($node['type'] == "hr")
    <hr />
@endif

{{-- BR --}}
@if($node['type'] == "br")
    <div class="separator"></div><br />
@endif

@if($node['type'] == "map")
     <div class="form-group">
        <div class="location-box">
            <label>{{$node["label"]}}</label>
            <div id="{{ $node["id"] or rand() }}" class="map-container">
            </div>
        </div>
     </div>
@endif

{{-- FIELDS --}}
@if($node['type'] == "field")
    @if($node["input"] == 'text')
        <div class="form-group bmd-form-group {{$errors->has($node["name"]) ? 'has-error' : ''}}">
            <label class="bmd-label-floating">{{$node["label"]}}</label>
            <input
                id="{{$node["id"] or rand()}}"
                type="text"
                class="form-control"
                name="{{$node["name"]}}"
                placeholder="{{$node["placeholder"] or ''}}"
                value="{{ isset($item) ? $item->{$node["name"]} : old($node["name"]) }}"
            >
        </div>
    @endif

     @if($node["input"] == 'hidden')
            <input type="hidden" class="form-control" id="{{ $node["id"] or rand() }}" name="{{$node["name"]}}" placeholder="{{$node["placeholder"] or ''}}" value="{{ isset($item) ? $item->{$node["name"]} : old($node["name"]) }}">
    @endif


    @if($node["input"] == 'date')
        <div class="form-group {{$errors->has($node["name"]) ? 'has-error' : ''}}">
            <label>{{$node["label"]}}</label>
            <input type="text" autocomplete="off" class="form-control datepicker-offer" id="{{ $node["id"] or rand() }}" name="{{$node["name"]}}" placeholder="{{$node["placeholder"] or ''}}" value="{{ isset($item) ? date('d/m/Y', $item->{$node["name"]}) : old($node["name"]) }}">
        </div>
    @endif

    @if($node["input"] == 'textarea')
        <div class="form-group">
            <label>{{$node["label"]}}</label>
            <textarea class="form-control" id="{{ $node["id"] or rand() }}" rows="6" name="{{$node["name"]}}" placeholder="{{$node["placeholder"] or ''}}">{{ isset($item) ? $item->{$node["name"]} : old($node["name"]) }}</textarea>
        </div>
    @endif

    @if($node["input"] == 'richtext')
        <div class="form-group {{$errors->has($node["name"]) ? 'has-error' : ''}}">
            <label>{{$node["label"]}}</label>
            <textarea class="form-control" id="{{ $node["name"] }}_editor" name="{{$node["name"]}}" rows="6" placeholder="{{$node["placeholder"] or ''}}">{{ isset($item) ? $item->{$node["name"]} : old($node["name"]) }}</textarea>
        </div>

        <script type="text/javascript">
            $(document).ready(function() {
                CKEDITOR.replace('{{$node["name"]}}_editor', {
                    height: '300px',
                    toolbarGroups :  [
                        {"name":"basicstyles","groups":["basicstyles"]},
                        {"name":"links","groups":["links"]},
                        {"name":"paragraph","groups":["list","blocks"]},
                        {"name":"document","groups":["mode"]},
                        {"name":"styles","groups":["styles"]},
                        {"name":"architect","groups":["architect"]},
                    ],
                    removeButtons : 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar',
                    allowedContent: true
                });
            });
        </script>
    @endif

    @if($node["input"] == 'checkbox')
        <div class="form-group {{$errors->has($node["name"]) ? 'has-error' : ''}}">
            <label>
                <input type="checkbox" id="{{ $node["id"] or rand() }}" name="{{$node["name"]}}" value="{{$node["value"] or old($node["name"])}}" @if($item && $item->{$node["name"]}) checked @endif />
                {{$node["label"]}}
            </label>
        </div>
    @endif

    @if($node["input"] == 'tags')
        <div class="form-group {{$errors->has($node["name"]) ? 'has-error' : ''}}">
            {!!
                Form::select(
                    $node["name"],
                    \Modules\Extranet\Entities\Tag::pluck('name', 'id'),
                    isset($item) ? $item->{str_replace('[]', '', $node["name"])} : old($node["name"]),
                    [
                        'class' => 'form-control toggle-select2',
                        'multiple' => 'multiple'
                    ]
                )
            !!}
            <script>
                $(document).ready(function() {
                    $('.toggle-select2').select2();
                });
            </script>
        </div>
    @endif

    @if($node["input"] == 'list')
        <div class="form-group {{$errors->has($node["name"]) ? 'has-error' : ''}}">
            <label>{{$node["label"]}}</label>
            @php
                $default = isset($node["default"]) ? $node["default"] : null;
            @endphp

            {!!
                Form::siteList(
                    $node["identifier"],
                    $node["name"],
                    isset($item) ? $item->{$node["name"]} : $default,
                    [
                        'class' => 'form-control',
                        'placeholder' => isset($node["placeholder"]) ? $node["placeholder"] : '-'
                    ]
                )
            !!}
        </div>
    @endif

    @if($node["input"] == 'users')
        <div class="form-group {{$errors->has($node["name"]) ? 'has-error' : ''}}">
            <label>{{$node["label"]}}</label>
            {!!
                Form::users(
                    $node["roles"],
                    $node["name"],
                    isset($item) ? $item->{$node["name"]} : old($node["name"]),
                    [
                        'class' => 'form-control',
                        'placeholder' => isset($node["placeholder"]) ? $node["placeholder"] : null,
                    ]
                )
            !!}
        </div>
    @endif


     @if($node["input"] == 'customers')
        <div class="form-group {{$errors->has($node["name"]) ? 'has-error' : ''}}">
            <label>{{$node["label"]}}</label>
            {!!
                Form::customers(
                    $node["name"],
                    isset($item) ? $item->{$node["name"]} : old($node["name"]),
                    [
                        'class' => 'form-control customers',
                        'placeholder' => isset($node["placeholder"]) ? $node["placeholder"] : null,
                    ]
                )
            !!}
        </div>
    @endif


    @if($node["input"] == 'customers_contacts')
         <div class="form-group {{$errors->has($node["name"]) ? 'has-error' : ''}}">
            {{-- {!!
                Form::select(
                    $node["name"],
                    isset($item) ? \Modules\Extranet\Entities\CustomerContact::where('customer_id',$item->customer_id)->pluck('firstname', 'id'):[],
                    isset($item) ? $item->{str_replace('[]', '', $node["name"])} : old($node["name"]),
                    [
                        'class' => 'form-control'
                    ]
                )
            !!} --}}

        </div>
    @endif


    @if($node["input"] == 'submit')
        <input value="Enregistrer" type="submit" class="btn {{$node["class"] or ''}}" />
    @endif

    @if($node["input"] == 'customer_documents')

        @php
            $customer = $item;
            switch($node["config"]["type"]) {
                case 'ajax':
                    $node["config"]["route"] = route($node["config"]["route"], $customer);
                break;
            }
        @endphp

         <div class="form-group">
            <div
                id="customer_documents"
                config="{{ isset($node["config"]) ? base64_encode(json_encode($node["config"], true))  : null }}"
            ></div>
        </div>
    @endif

    @if($node["input"] == 'customer_users')

        @php
            $customer = $item;
            switch($node["config"]["type"]) {
                case 'ajax':
                    $node["config"]["route"] = route($node["config"]["route"], $customer);
                break;
            }
        @endphp

         <div class="form-group">
            <div
                id="customer_users"
                config="{{ isset($node["config"]) ? base64_encode(json_encode($node["config"], true))  : null }}"
            >
            </div>
        </div>
    @endif
@endif





{{-- RECURSIVE CALL --}}
@if(isset($node['childs']))
    @foreach($node['childs'] as $n)
        @include('extranet::admin.partials.form.node', [
            'node' => $n,
            'item' => isset($item) ? $item : null
        ])
    @endforeach
@endif

{{-- CLOSE BOX --}}
@if($node['type'] == "box")
        <!--/div>
    </div-->
@endif

{{-- CLOSE ROW AND COL --}}
@if($node['type'] == "row" || $node['type'] == "col")
    </div>
@endif
