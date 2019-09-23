
<div class="custom-modal model-modal" id="new-model-modal">
  <div class="modal-background"></div>


    <div class="modal-container">

      <div class="modal-header">
        <h2>{{Lang::get('extranet::models.select')}}</h2>

        <div class="modal-buttons">
          <a class="btn btn-default close-button-modal close-btn" >
            <i class="fa fa-times"></i>
          </a>
        </div>
      </div>

      <div class="modal-content">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 table">
              <div class="table-header">
                <div class="cell first-column">{{Lang::get('extranet::models.name')}}</div>
              </div>
              @php
                $models = config('models');
              @endphp
              @foreach ($models as $key => $value)
                <div class="table-row">
                  <div class="cell first-column">{{$key}}</div>
                  <div class="cell second-column"><a href="{{route('extranet.models.create',$key)}}"><i class="fa fa-plus"></i>{{Lang::get('extranet::models.add_simple')}}</a></div>
                </div>
              @endforeach

            </div>
          </div>
        </div>

        <div class="modal-footer">
          <a href="" class="btn btn-default close-btn" > {{Lang::get('architect::fields.cancel')}} </a>
        </div>

      </div>
  </div>
</div>
