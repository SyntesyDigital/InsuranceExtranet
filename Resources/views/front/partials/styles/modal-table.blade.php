<style type="text/css">

  /* Modal Table Component  */
  #modal-table-component.custom-modal .modal-content {
    border-bottom-left-radius : {{$buttonRadius}};
    border-bottom-right-radius: {{$buttonRadius}};
  }

  #modal-table-component.custom-modal .modal-header {
    border-top-left-radius :{{$buttonRadius}};
    border-top-right-radius: {{$buttonRadius}};
  }

  /* Override .form-component methods */
  #modal-table-component.form-component a.btn-default {
    border-radius: {{$buttonRadius}};
    color:{{$elementColor}};
    border: 1px solid {{$elementColor}};
  }
  #modal-table-component.form-component a.btn-default:hover{
    color:{{$elementLinkHoverColor}};
    border: 1px solid {{$elementLinkHoverColor}};
  }

  #modal-table-component.form-component a.btn-primary {
    border-radius: {{$buttonRadius}};
  }
  #modal-table-component.form-component a.btn-link{
    color:{{$elementColor}};
  }

</style>
