{!!
    Form::open([
        'route' => 'modal.update-password',
        'method' => 'POST',
        'id' => 'password-modal-form'
    ])
!!}

<div class="modal fade bootstrap-modal" id="modal-password">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">{{ Lang::get('extranet::form.modal-password.title') }}</h4>
      </div>

      <div class="modal-body">

          <!-- New password -->
          <div class="form-group">
              <div class="row">
                <div class="col-sm-12">
                    <div class="form-group bmd-form-group">
                        <label class="col-form-label ">{{Lang::get('extranet::form.modal-password.label.password_new')}}</label>
                        <input type="password" class="form-control" name="password" value="" />
                    </div>
                </div>
              </div>
              <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group bmd-form-group">
                        <label class="col-form-label">{{Lang::get('extranet::form.modal-password.label.password_confirm')}}</label>
                        <input type="password" class="form-control" name="password_confirm" value="" />
                    </div>
                  </div>
              </div>
          </div>

      </div>

      <div class="modal-footer">
          <div class="pull-left message" style="color: #C00;font-weight: bold;">

          </div>
          <button  type="submit" class="btn btn-primary">{{ Lang::get('extranet::form.modal-password.label.submit') }}</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
 {!! Form::close() !!}

<div class="modal fade bootstrap-modal" id="modal-password-success">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <p align="center">
                    {{ Lang::get('extranet::form.modal-password.messages.success') }}.
                </p>
                <p align="center">
                    <button type="button" class="btn btn-success" data-dismiss="modal">Ok</button>
                </p>
            </div>
        </div>
    </div>
</div>


@push('javascripts')
<script>
$('#modal-password').modal({
    backdrop: 'static',
    keyboard: false
});

//reload page after password changed
$('#modal-password-success').on('hidden.bs.modal', function (e) {
  window.location.href = "/";
});

$('#password-modal-form').on('submit', function(e){
    e.preventDefault();

    var el = $(this);
    var formData =  $(this).serialize();

    $.ajax({
        method: "POST",
        url: '{{ route('modal.update-password') }}',
        data: formData,
        dataType: 'json'
    }).done(function(response) {
        if(response.success) {
            $('#modal-password').modal('hide');
            $('#modal-password-success').modal();
        } else {
            el.find('.modal-footer .message').html(response.message);
        }
    }).fail(function(jqXHR, textStatus) {
        el.find('.modal-footer .message').html(jqXHR.responseJSON.message);
    });
});
</script>
@endpush
