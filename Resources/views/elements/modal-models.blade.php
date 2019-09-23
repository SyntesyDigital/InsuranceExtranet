
<div class="custom-modal model-modal" id="modal-models">
  <div class="modal-background"></div>


    <div class="modal-container">

      <div class="modal-header">
        <h2><i class="fa fa-reorder"></i> Select model</h2>

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
                <div class="cell first-column">Nom</div>
                <div class="cell first-column"></div>
              </div>
              @foreach ($models as $model)
                <div class="table-row">
                  <div class="cell second-column">
                    <a href="{{route('extranet.element.create',[$element_type_array['identifier'],$model->ID])}}"><i class="fa fa-plus"></i> Ajouter</a>
                  </div>
                  <div class="cell first-column"><i class="{{$model->ICONE}}"></i> {{$model->TITRE}}</div>

                </div>
              @endforeach

            </div>
          </div>
        </div>

        <div class="modal-footer">
          <a href="" class="btn btn-default close-btn" > Cancel </a>
        </div>

      </div>
  </div>
</div>
