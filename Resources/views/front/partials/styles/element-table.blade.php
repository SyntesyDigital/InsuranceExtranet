 <style type="text/css">

/*TABLES*/

/* .element-table-container .element-table-container-body{
  border-radius: {{$buttonRadius}};
} */

.element-table-container{
  border-radius: {{$buttonRadius}};
}
.element-table-container .element-table-container-head{
  background-color: {{$elementHeadBackground}};
  border-bottom: 1px solid {{$elementBorder}};
  color:{{$elementHeadColor}};
  font-size:{{$titlesFontSize}};
  padding-bottom:20px;
}

.element-table-container .element-table-container-head i{
  color:{{$elementHeadIconColor}};
}

.element-table-container .element-collapsable.element-table-container-head{
  background-color: {{$frontElementHeadCollapsableBackground}};
  color: {{$elementHeadCollapsableColor}};
  font-size: {{$titleCollapsableFontSize}};
  padding-bottom:10px;
  padding-left: 45px;
}

.element-table-container .element-collapsable.element-table-container-head{
  background-color: {{$frontElementHeadCollapsableBackground}};
}

.element-table-container .elementTable{
  color:{{$elementColor}};
}
.element-table-container .elementTable .react-table-container{
  background-color:{{$elementBackground}};
  border-radius: {{$buttonRadius}};

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

body .element-table-container .rt-thead.-header{
  background-color: {{$headerBackgroundColorTable}};
  font-size: {{$fontSizeHeaderTable}};
}
body .element-table-container .ReactTable .rt-thead .rt-resizable-header-content{
  color: {{$headerColorTable}};
}
body .element-table-container .elementTable .rt-tbody{
  color: {{$rowColorTable}};
  font-size: {{$fontSizeRowTable}};
}
body .element-table-container .rt-tr.-odd:hover, body .element-table-container .rt-tr.-even:hover {
    background: {{$rowBackgroundHoverColorTable}};
    color: {{$rowHoverColorTable}};
}
body .element-table-container .rt-tr.-odd:hover a, body .element-table-container .rt-tr.-even:hover a{
    color: {{$rowHoverColorTable}};
}

body .element-table-container .rt-tr.-odd:hover a.simple-btn, body .element-table-container .rt-tr.-even:hover a.simple-btn {
    color:{{$elementLinkColor}};
}

body .element-table-container .rt-tbody .rt-tr.-even, body .element-table-container .rt-tr.-odd{
    border-radius: {{$borderRadiusRowTable}};
}
body .element-table-container .rt-tr.-odd {
    background: {{$rowOddBackgroundColorTable}};
}
body .element-table-container .rt-tr.-even {
    background: {{$rowEvenBackgroundColorTable}};
}
body .element-table-container .rt-thead .rt-th.-cursor-pointer:before, body .element-table-container .rt-thead .rt-td.-cursor-pointer:before{
    color: {{$iconColorHeaderTable}};
    left: unset; 
    right: 10px;
}
body .element-table-container .rt-thead.-filters input:focus{
    border: 1px solid {{$inputColor}};
}
@php
@endphp
@if (isset($alignFilterTable) && $alignFilterTable == 'top')
  body .react-table-container .ReactTable .rt-thead.-filters{
    order: 1;
  }
  body .react-table-container .ReactTable .rt-thead.-header{
    order: 2;
  }
@endif

@if (isset($alignFilterTable) && $alignFilterTable == 'bottom')
  body .react-table-container .ReactTable .rt-thead.-filters{
    order: 2;
  }
  body .react-table-container .ReactTable .rt-thead.-filters{
    order: 1;
  }
@endif

@if (isset($lowerUpperCaseHeaderTable))
  body .react-table-container .ReactTable .rt-thead .rt-resizable-header-content{
    text-transform: {{$lowerUpperCaseHeaderTable}}
  }
@endif

@if(isset($storedStylesFront['frontElementHeadTransparent']) && $storedStylesFront['frontElementHeadTransparent']->value == true)
  body .page-builder .element-table-container .element-table-container-head  {
    background-color: transparent;
  }
  body .page-builder .element-table-container .element-table-container-body{
    border-top-left-radius: {{$buttonRadius}};
    border-top-right-radius: {{$buttonRadius}};
  }
@endif

</style>
