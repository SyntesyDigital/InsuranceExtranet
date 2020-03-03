<style type="text/css">
/*FILES*/

.element-file-container{
  border-radius: {{$buttonRadius}};
}
.element-file-container .element-file-container-head{
  background-color: {{$elementHeadBackground}};
  color:{{$elementHeadColor}};
  font-size:{{$titlesFontSize}};
  padding-bottom:20px;
}

.element-file-container .element-collapsable.element-file-container-head{
  background-color: {{$frontElementHeadCollapsableBackground}};
  color: {{$elementHeadCollapsableColor}};
  font-size: {{$titleCollapsableFontSize}};
  padding-bottom:10px;
  padding-left: 35px;
}

.element-file-container .element-file-container-body{
  background-color: {{$elementBackground}};
  border: 1px solid {{$elementBorder}};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, {{$boxShadowOpacity/100}});
}
.element-file-container .element-file-container-body .element-file-input-container{
  border-bottom: 1px solid {{$elementFileInputBorder}};
}

.element-collapsable{
  cursor: pointer;
}
.element-collapsable.collapsed:before{
  color:{{$elementHeadColor}};
}
.element-collapsable:before{
  color:{{$elementHeadColor}};
}

.more-btn{
  background-color:{{$elementBackground}};
}
.more-btn  a {
  border-radius: {{$buttonRadius}};
  color:{{$elementLinkColor}};
  border: 1px solid {{$elementLinkColor}};
}
.more-btn  a:hover{
  color:{{$elementLinkHoverColor}};
  border: 1px solid {{$elementLinkHoverColor}};
}




</style>
