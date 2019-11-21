@php
  $storedStylesFront = \Cache::get('frontStyles');
@endphp

@if(!$storedStylesFront)
  @php
    $seconds = 24*3600;
    $style = \Modules\Architect\Entities\Style::where('identifier','front')->first();
    $storedStylesFront = (new \Modules\Architect\Transformers\StyleFormTransformer($style))->toArray();
    \Cache::put('frontStyles', $storedStylesFront, $seconds);
  @endphp
@endif


@php

  /*GENERAL*/
    $primaryColor=isset($storedStylesFront['frontPrimary']) ? $storedStylesFront['frontPrimary']->value :'#2A3649';
    $secondaryColor=isset($storedStylesFront['frontSecondary']) ? $storedStylesFront['frontSecondary']->value  :'#E84B37';

    $headerTextColor= isset($storedStylesFront['frontHeaderTextColor']) ? $storedStylesFront['frontHeaderTextColor']->value  :'#fff';
    $headerRightPartBackgroundColor= isset($storedStylesFront['frontHeaderRightPartBackgroundColor']) ? $storedStylesFront['frontHeaderRightPartBackgroundColor']->value  :'#1B3A6A';

    $sidebarBackgroundColor = isset($storedStylesFront['frontSidebarBackgroundColor']) ? $storedStylesFront['frontSidebarBackgroundColor']->value  :'#fff';

    $bodyBackgroundColor= isset($storedStylesFront['frontBodyBackgroundColor']) ? $storedStylesFront['frontBodyBackgroundColor']->value  :'#e7eaef';
    $separatorLineColor=' rgba(42, 54, 73, 0.22)';/*?????*/

    $frontFont=isset($storedStylesFront['frontFont']) ? $storedStylesFront['frontFont']->value : false;

    //radio tables/button
    $buttonRadius= isset($storedStylesFront['frontButtonRadius']) ? $storedStylesFront['frontButtonRadius']->value.'px' :'20px';


  //HEADER
    $headerLogoBackgroundColor = isset($storedStylesFront['frontHeaderLogoBackgroundColor']) ? $storedStylesFront['frontHeaderLogoBackgroundColor']->value  :$sidebarBackgroundColor;
    $headerRightPartTextColor= isset($storedStylesFront['frontHeaderRightPartTextColor']) ? $storedStylesFront['frontHeaderRightPartTextColor']->value  :$headerTextColor;
    $headerButtonColor= isset($storedStylesFront['frontHeaderButtonColor']) ? $storedStylesFront['frontHeaderButtonColor']->value  :$headerTextColor;
    $headerHoverColor= isset($storedStylesFront['frontHeaderHoverColor']) ? $storedStylesFront['frontHeaderHoverColor']->value  :$primaryColor;

  //sidebar
    $sidebarActiveBackgroundColor = isset($storedStylesFront['frontSidebarActiveBackgroundColor']) ? $storedStylesFront['frontSidebarActiveBackgroundColor']->value  :$sidebarBackgroundColor;
    $sidebarColor = isset($storedStylesFront['frontSidebarColor']) ? $storedStylesFront['frontSidebarColor']->value  :$secondaryColor;
    $sidebarActiveColor = isset($storedStylesFront['frontSidebarActiveColor']) ? $storedStylesFront['frontSidebarActiveColor']->value  :$primaryColor;

  //FOOTER
    $footerBackgroundColor = isset($storedStylesFront['frontFooterBackgroundColor']) ? $storedStylesFront['frontFooterBackgroundColor']->value  :$bodyBackgroundColor;
    $footerHoverTextColor= isset($storedStylesFront['frontFooterHoverTextColor']) ? $storedStylesFront['frontFooterHoverTextColor']->value  :$primaryColor;
    $footerTextColor= isset($storedStylesFront['frontFooterTextColor']) ? $storedStylesFront['frontFooterTextColor']->value  :$secondaryColor;

  //BODY
    $bodyTextColor= isset($storedStylesFront['frontBodyTextColor']) ? $storedStylesFront['frontBodyTextColor']->value  :$secondaryColor;

    $frontBodyH1Color = isset($storedStylesFront['frontBodyH1Color']) ? $storedStylesFront['frontBodyH1Color']->value  :$secondaryColor;
    $frontBodyH2Color = isset($storedStylesFront['frontBodyH2Color']) ? $storedStylesFront['frontBodyH2Color']->value  :$secondaryColor;
    $frontBodyH3Color = isset($storedStylesFront['frontBodyH3Color']) ? $storedStylesFront['frontBodyH3Color']->value  :$secondaryColor;

  //ELEMENTS
    $elementBorder= isset($storedStylesFront['frontElementBorder']) ? $storedStylesFront['frontElementBorder']->value  :$bodyBackgroundColor;
    $elementHeadBackground= isset($storedStylesFront['frontElementHeadBackground']) ? $storedStylesFront['frontElementHeadBackground']->value :$sidebarBackgroundColor;
    $frontElementHeadCollapsableBackground = isset($storedStylesFront['frontElementHeadCollapsableBackground']) ? $storedStylesFront['frontElementHeadCollapsableBackground']->value :$sidebarBackgroundColor;

    $elementHeadColor= isset($storedStylesFront['frontElementHeadColor']) ? $storedStylesFront['frontElementHeadColor']->value  :$secondaryColor;
    $elementHeadCollapsableColor= isset($storedStylesFront['elementHeadCollapsableColor']) ? $storedStylesFront['elementHeadCollapsableColor']->value  : $elementHeadColor;

    $elementBackground= isset($storedStylesFront['frontElementBackground']) ? $storedStylesFront['frontElementBackground']->value  :$sidebarBackgroundColor;

    $elementColor= isset($storedStylesFront['frontElementColor']) ? $storedStylesFront['frontElementColor']->value  :$secondaryColor;
    $elementLinkColor= isset($storedStylesFront['frontElementLinkColor']) ? $storedStylesFront['frontElementLinkColor']->value  :$secondaryColor;
    $elementLinkHoverColor= isset($storedStylesFront['frontElementLinkHoverColor']) ? $storedStylesFront['frontElementLinkHoverColor']->value  :$primaryColor;
    $elementButtonColor= isset($storedStylesFront['frontElementButtonColor']) ? $storedStylesFront['frontElementButtonColor']->value  :$primaryColor;
    $elementButtonHoverColor= isset($storedStylesFront['frontElementButtonHoverColor']) ? $storedStylesFront['frontElementButtonHoverColor']->value  :$secondaryColor;

    $titlesFontSize = isset($storedStylesFront['titleFontSize']) ? $storedStylesFront['titleFontSize']->value.'px' :'20px';
    $titleCollapsableFontSize = isset($storedStylesFront['titleCollapsableFontSize']) ? $storedStylesFront['titleCollapsableFontSize']->value.'px' : $titlesFontSize;

    $buttonPrimaryColor = isset($storedStylesFront['buttonPrimaryColor']) ? $storedStylesFront['buttonPrimaryColor']->value : $primaryColor;
    $buttonHoverColor = isset($storedStylesFront['buttonHoverColor']) ? $storedStylesFront['buttonHoverColor']->value : $secondaryColor;


    $fonts = config('fonts');
@endphp

<style type="text/css">

  /* HEADER */
  header:first-child .row.row-header .logo-container{
    background-color: {{$headerLogoBackgroundColor}};
  }

  header:first-child .row.row-header .right-part-header{
    background-color: {{$headerRightPartBackgroundColor}};
    color: {{$headerRightPartTextColor}};
  }

  header:first-child .row.row-header .right-part-header.login-header {
    background-color: {{$headerLogoBackgroundColor}};
  }

  header:first-child .row.row-header .right-part-header .user-info .button-header-container .btn-header{
    border:1px solid {{$headerButtonColor}};
    color:{{$headerButtonColor}};

    border-radius: {{$buttonRadius}};
  }

  header:first-child .row.row-header .right-part-header .user-info .button-header-container .btn-header:hover{
    border:1px solid {{$headerHoverColor}};
    color:{{$headerHoverColor}};
  }

  header:first-child .navbar-toggle .icon-bar{
    background: {{$headerRightPartTextColor}};
  }

  /*SIDEBAR */
  .sidebar{
    background-color: {{$sidebarBackgroundColor}};
    color:{{$sidebarColor}};
  }
  .sidebar ul li:hover, .sidebar ul li.active{
    background-color: {{$sidebarActiveBackgroundColor}};
    border-left: 4px solid {{$sidebarActiveColor}};
  }
  .sidebar ul li:hover a, .sidebar ul li.active a{
    color:{{$sidebarActiveColor}};
  }
  .sidebar ul li a{
    color:{{$sidebarColor}};
  }
  .sidebar ul li a:hover{
    color:{{$sidebarActiveColor}};
  }


  /*FOOTER */
  footer{
    background-color: {{$footerBackgroundColor}};
    border-top:1px solid {{$separatorLineColor}};
  }
  footer p{
    color:{{$footerTextColor}};
  }
  footer ul li{
    color:{{$footerTextColor}};
  }
  footer ul li a{
    color:{{$footerTextColor}};
  }
  footer ul li a:hover{
    color:{{$footerHoverTextColor}};
  }

  /*FOOTER */
  body {
    background-color: {{$bodyBackgroundColor}};
    color:{{$bodyTextColor}};
  }

  /*PAGE*/
  .page-builder h1{
    color:{{$frontBodyH1Color}};
  }
  .page-builder h2{
    color:{{$frontBodyH2Color}};
  }
  .page-builder h3{
    color:{{$frontBodyH3Color}};
  }


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
  }

  .element-file-container .element-file-container-body{
    background-color: {{$elementBackground}};
    border: 1px solid {{$elementBorder}};
  }
  .element-file-container .element-file-container-body .element-file-input-container{
    border-bottom: 1px solid {{$elementBackground}};
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


  /*FORMS*/
  .element-form-container a.btn-default {
    border-radius: {{$buttonRadius}};
    color:{{$elementColor}};
    border: 1px solid {{$elementColor}};
  }
  .element-form-container a.btn-default:hover{
    color:{{$elementLinkHoverColor}};
    border: 1px solid {{$elementLinkHoverColor}};
  }

  .element-form-container a.btn-primary {
    border-radius: {{$buttonRadius}};
  }
  .element-form-container a.btn-link{
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

  .element-form-container .element-collapsable.element-form-container-head{
    background-color: {{$frontElementHeadCollapsableBackground}};
    color: {{$elementHeadCollapsableColor}};
    font-size: {{$titleCollapsableFontSize}};
    padding-bottom:10px;
  }


  .element-form-container .element-form-container-head.collapsed{
    border-bottom-left-radius: {{$buttonRadius}};
    border-bottom-right-radius: {{$buttonRadius}};
  }

  .element-form-container .element-collapsable.element-form-container-head.collapsed {
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

  .element-form-container .element-form-row label span{
    color:{{$elementLinkHoverColor}};
  }
  .element-form-container .element-form-row .buttons .btn-back{
    border:1px solid {{$elementColor}};
  }
  .element-form-container .element-form-row .buttons .btn-back:hover{
    background-color: {{$elementBackground}};
    border-color: {{$elementBackground}};
    color: {{$elementColor}};
  }

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



  .total-box-container-a{
    color:{{$elementLinkColor}};
  }

  .total-box-container{
    color:{{$elementColor}};
    border-radius: {{$buttonRadius}};
  }

  .box-button-container-a .box-button-container:hover{
    color:{{$elementButtonHoverColor}};
    /*
    border: 1px solid {{$elementButtonHoverColor}};
    */
  }

  .box-button-container{
    color:{{$elementButtonColor}};
    /*border: 1px solid {{$elementButtonColor}};*/
    border-radius: {{$buttonRadius}};
  }

  .static-banner{
    border-radius: {{$buttonRadius}};
    background-color:{{$sidebarBackgroundColor}}
  }
  .static-banner .text-static-banner h1, .static-banner .text-static-banner a{
    color: {{$buttonPrimaryColor}};
  }


  /* button primary */
  .box-button-container,.box-button-container-a {
    color: {{$buttonPrimaryColor}};
  }

  .box-button-container-a .box-button-container:hover {
    color: {{$buttonHoverColor}};
  }

</style>

@if($frontFont)
  <style>
    @import url('https://fonts.googleapis.com/css?{{$fonts[$frontFont]['import']}}');

    body {
      font-family: {{$fonts[$frontFont]['name']}} !important;
    }
    .react-datepicker-wrapper{
      font-family: {{$fonts[$frontFont]['name']}}!important;
    }
    .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name{
      font-family: {{$fonts[$frontFont]['name']}} !important;
    }
    .react-datepicker__current-month, .react-datepicker-time__header{
      font-family: {{$fonts[$frontFont]['name']}} !important;
    }

    .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list{
      font-family: {{$fonts[$frontFont]['name']}} !important;
    }
  </style>
@endif
