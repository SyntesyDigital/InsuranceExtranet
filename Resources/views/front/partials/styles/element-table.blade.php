 <style type="text/css">

/*TABLES*/
.element-table-container{
  border-radius: {{$buttonRadius}};
}
.element-table-container .element-table-container-body{
  border-radius: {{$buttonRadius}};
}
.element-table-container .element-table-container-head{
  background-color: {{$elementHeadBackground}};
  border-bottom: 1px solid {{$elementBorder}};
  color:{{$elementHeadColor}};
  font-size:{{$titlesFontSize}};
  padding-bottom:20px;
}

.element-table-container .element-collapsable.element-table-container-head{
  background-color: {{$frontElementHeadCollapsableBackground}};
  color: {{$elementHeadCollapsableColor}};
  font-size: {{$titleCollapsableFontSize}};
  padding-bottom:10px;
  padding-left: 35px;
}

.element-table-container .element-collapsable.element-table-container-head{
  background-color: {{$frontElementHeadCollapsableBackground}};
}

.element-table-container .elementTable{
  background-color:{{$elementBackground}};
  color:{{$elementColor}};
}
.element-table-container .elementTable a{
  color:{{$elementLinkColor}};
}
.element-table-container .elementTable a:hover{
  color:{{$elementLinkHoverColor}};
}

.element-table-container .elementTable .navigation li a{
  color:{{$elementColor}};
}

.element-table-container .elementTable .navigation li.active, .element-table-container .elementTable .navigation li:hover{
  background-color: {{$elementBackground}};
}
.element-table-container .elementTable .navigation li.active a, .element-table-container .elementTable .navigation li:hover a{
  color: {{$elementColor}};
}

</style>
