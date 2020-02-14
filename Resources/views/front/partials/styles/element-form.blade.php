<style type="text/css">

/*FORMS*/
.form-component a.btn-default {
  border-radius: {{$buttonRadius}};
  color:{{$elementColor}};
  border: 1px solid {{$elementColor}};
}
.form-component a.btn-default:hover{
  color:{{$elementLinkHoverColor}};
  border: 1px solid {{$elementLinkHoverColor}};
}

.form-component a.btn-primary {
  border-radius: {{$buttonRadius}};
}
.form-component a.btn-link{
  color:{{$elementColor}};
}

.element-form-container .element-form-container-head{
  background-color: {{$elementHeadBackground}};
  color:{{$elementHeadColor}};
  border-bottom: 1px solid {{$elementBorder}};
  border-top-left-radius: {{$buttonRadius}};
  border-top-right-radius: {{$buttonRadius}};
  font-size:{{$titlesFontSize}};
  padding-bottom:20px;
}

.form-component .element-collapsable.element-form-container-head{
  background-color: {{$frontElementHeadCollapsableBackground}};
  color: {{$elementHeadCollapsableColor}};
  font-size: {{$titleCollapsableFontSize}};
  padding-bottom:10px;
  padding-left: 35px;
}


.form-component .element-form-container-head.collapsed{
  border-bottom-left-radius: {{$buttonRadius}};
  border-bottom-right-radius: {{$buttonRadius}};
}

.form-component .element-collapsable.element-form-container-head.collapsed {
  background-color: {{$frontElementHeadCollapsableBackground}};
  color:{{$elementHeadColor}};

}


.element-form-container .element-form{
  background-color:{{$elementBackground}};
  color:{{$elementColor}};
  border-bottom-left-radius: {{$buttonRadius}};
  border-bottom-right-radius: {{$buttonRadius}};
  border-top-left-radius: {{$buttonRadius}};
  border-top-right-radius: {{$buttonRadius}};

}

.element-form-container .element-form-container-body.collapse .element-form{
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.form-component .element-form-row label span{
  color:{{$elementLinkHoverColor}};
}
.form-component .element-form-row .buttons .btn-back{
  border:1px solid {{$elementColor}};
}
.form-component .element-form-row .buttons .btn-back:hover{
  background-color: {{$elementBackground}};
  border-color: {{$elementBackground}};
  color: {{$elementColor}};
}

</style>
