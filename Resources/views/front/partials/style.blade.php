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

<?php

  /*GENERAL*/
    $primaryColor = isset($storedStylesFront['frontPrimary']) ? $storedStylesFront['frontPrimary']->value : '#2A3649';
    $secondaryColor = isset($storedStylesFront['frontSecondary']) ? $storedStylesFront['frontSecondary']->value : '#E84B37';

    $headerTextColor = isset($storedStylesFront['frontHeaderTextColor']) ? $storedStylesFront['frontHeaderTextColor']->value : '#fff';
    $headerRightPartBackgroundColor = isset($storedStylesFront['frontHeaderRightPartBackgroundColor']) ? $storedStylesFront['frontHeaderRightPartBackgroundColor']->value : '#1B3A6A';

    $sidebarBackgroundColor = isset($storedStylesFront['frontSidebarBackgroundColor']) ? $storedStylesFront['frontSidebarBackgroundColor']->value : '#fff';

    $bodyBackgroundColor = isset($storedStylesFront['frontBodyBackgroundColor']) ? $storedStylesFront['frontBodyBackgroundColor']->value : '#e7eaef';
    $separatorLineColor = ' rgba(42, 54, 73, 0.22)'; /*?????*/

    $frontFont = isset($storedStylesFront['frontFont']) ? $storedStylesFront['frontFont']->value : false;

    //radio tables/button
    $buttonRadius = isset($storedStylesFront['frontButtonRadius']) ? $storedStylesFront['frontButtonRadius']->value.'px' : '20px';

  //HEADER
    $headerLogoBackgroundColor = isset($storedStylesFront['frontHeaderLogoBackgroundColor']) ? $storedStylesFront['frontHeaderLogoBackgroundColor']->value : $sidebarBackgroundColor;
    $headerRightPartTextColor = isset($storedStylesFront['frontHeaderRightPartTextColor']) ? $storedStylesFront['frontHeaderRightPartTextColor']->value : $headerTextColor;
    $headerButtonColor = isset($storedStylesFront['frontHeaderButtonColor']) ? $storedStylesFront['frontHeaderButtonColor']->value : $headerTextColor;
    $headerHoverColor = isset($storedStylesFront['frontHeaderHoverColor']) ? $storedStylesFront['frontHeaderHoverColor']->value : $primaryColor;

  //sidebar
    $sidebarActiveBackgroundColor = isset($storedStylesFront['frontSidebarActiveBackgroundColor']) ? $storedStylesFront['frontSidebarActiveBackgroundColor']->value : $sidebarBackgroundColor;
    $sidebarColor = isset($storedStylesFront['frontSidebarColor']) ? $storedStylesFront['frontSidebarColor']->value : $secondaryColor;
    $sidebarActiveColor = isset($storedStylesFront['frontSidebarActiveColor']) ? $storedStylesFront['frontSidebarActiveColor']->value : $primaryColor;

  //FOOTER
    $footerBackgroundColor = isset($storedStylesFront['frontFooterBackgroundColor']) ? $storedStylesFront['frontFooterBackgroundColor']->value : $bodyBackgroundColor;
    $footerHoverTextColor = isset($storedStylesFront['frontFooterHoverTextColor']) ? $storedStylesFront['frontFooterHoverTextColor']->value : $primaryColor;
    $footerTextColor = isset($storedStylesFront['frontFooterTextColor']) ? $storedStylesFront['frontFooterTextColor']->value : $secondaryColor;

  //BODY
    $bodyTextColor = isset($storedStylesFront['frontBodyTextColor']) ? $storedStylesFront['frontBodyTextColor']->value : $secondaryColor;

    $frontBodyH1Color = isset($storedStylesFront['frontBodyH1Color']) ? $storedStylesFront['frontBodyH1Color']->value : $secondaryColor;
    $frontBodyH2Color = isset($storedStylesFront['frontBodyH2Color']) ? $storedStylesFront['frontBodyH2Color']->value : $secondaryColor;
    $frontBodyH3Color = isset($storedStylesFront['frontBodyH3Color']) ? $storedStylesFront['frontBodyH3Color']->value : $secondaryColor;

  //ELEMENTS
    $elementBorder = isset($storedStylesFront['frontElementBorder']) ? $storedStylesFront['frontElementBorder']->value : $bodyBackgroundColor;
    $elementHeadBackground = isset($storedStylesFront['frontElementHeadBackground']) ? $storedStylesFront['frontElementHeadBackground']->value : $sidebarBackgroundColor;
    $frontElementHeadCollapsableBackground = isset($storedStylesFront['frontElementHeadCollapsableBackground']) ? $storedStylesFront['frontElementHeadCollapsableBackground']->value : $sidebarBackgroundColor;

    $elementHeadColor = isset($storedStylesFront['frontElementHeadColor']) ? $storedStylesFront['frontElementHeadColor']->value : $secondaryColor;
    $elementHeadCollapsableColor = isset($storedStylesFront['elementHeadCollapsableColor']) ? $storedStylesFront['elementHeadCollapsableColor']->value : $elementHeadColor;

    $elementBackground = isset($storedStylesFront['frontElementBackground']) ? $storedStylesFront['frontElementBackground']->value : $sidebarBackgroundColor;

    $elementColor = isset($storedStylesFront['frontElementColor']) ? $storedStylesFront['frontElementColor']->value : $secondaryColor;
    $elementLinkColor = isset($storedStylesFront['frontElementLinkColor']) ? $storedStylesFront['frontElementLinkColor']->value : $secondaryColor;
    $elementLinkHoverColor = isset($storedStylesFront['frontElementLinkHoverColor']) ? $storedStylesFront['frontElementLinkHoverColor']->value : $primaryColor;
    $elementButtonColor = isset($storedStylesFront['frontElementButtonColor']) ? $storedStylesFront['frontElementButtonColor']->value : $primaryColor;
    $elementButtonHoverColor = isset($storedStylesFront['frontElementButtonHoverColor']) ? $storedStylesFront['frontElementButtonHoverColor']->value : $secondaryColor;

    $titlesFontSize = isset($storedStylesFront['titleFontSize']) ? $storedStylesFront['titleFontSize']->value.'px' : '20px';
    $titleCollapsableFontSize = isset($storedStylesFront['titleCollapsableFontSize']) ? $storedStylesFront['titleCollapsableFontSize']->value.'px' : $titlesFontSize;

  //elements buttons
    $buttonPrimaryColor = isset($storedStylesFront['buttonPrimaryColor']) ? $storedStylesFront['buttonPrimaryColor']->value : $primaryColor;
    $buttonPrimaryBackgroundColor = isset($storedStylesFront['buttonPrimaryBackgroundColor']) ? $storedStylesFront['buttonPrimaryBackgroundColor']->value : '#fff';
    $buttonPrimaryHoverColor = isset($storedStylesFront['buttonPrimaryHoverColor']) ? $storedStylesFront['buttonPrimaryHoverColor']->value : $secondaryColor;
    $buttonPrimaryHoverBackgroundColor = isset($storedStylesFront['buttonPrimaryHoverBackgroundColor']) ? $storedStylesFront['buttonPrimaryHoverBackgroundColor']->value : '#fff';
    $buttonPrimaryBorderRadius = isset($storedStylesFront['buttonPrimaryBorderRadius']) ? $storedStylesFront['buttonPrimaryBorderRadius']->value : $buttonRadius;

    $buttonSecondaryColor = isset($storedStylesFront['buttonSecondaryColor']) ? $storedStylesFront['buttonSecondaryColor']->value : $secondaryColor;
    $buttonSecondaryBackgroundColor = isset($storedStylesFront['buttonSecondaryBackgroundColor']) ? $storedStylesFront['buttonSecondaryBackgroundColor']->value : '#fff';
    $buttonSecondaryHoverColor = isset($storedStylesFront['buttonSecondaryHoverColor']) ? $storedStylesFront['buttonSecondaryHoverColor']->value : $primaryColor;
    $buttonSecondaryHoverBackgroundColor = isset($storedStylesFront['buttonSecondaryHoverBackgroundColor']) ? $storedStylesFront['buttonSecondaryHoverBackgroundColor']->value : '#fff';
    $buttonSecondaryBorderRadius = isset($storedStylesFront['buttonSecondaryBorderRadius']) ? $storedStylesFront['buttonSecondaryBorderRadius']->value : $buttonRadius;

    $elementFileInputBorder = isset($storedStylesFront['elementFileInputBorder']) ? $storedStylesFront['elementFileInputBorder']->value : $sidebarBackgroundColor;

    $fonts = config('fonts');

    //LOGIN

   // $loginBackgroundColor = isset($storedStylesFront['loginBackgroundColor']) ? $storedStylesFront['loginBackgroundColor']->value : $bodyBackgroundColor;
    $loginContainerBackgroundColor = isset($storedStylesFront['loginContainerBackgroundColor']) ? $storedStylesFront['loginContainerBackgroundColor']->value : $sidebarBackgroundColor;
    $loginContainerBorderRadius = isset($storedStylesFront['loginContainerBorderRadius']) ? $storedStylesFront['loginContainerBorderRadius']->value.'px' : $buttonRadius;
    $loginContainerTextColor = isset($storedStylesFront['loginContainerTextColor']) ? $storedStylesFront['loginContainerTextColor']->value : $secondaryColor;
    $loginButtonBackgroundColor = isset($storedStylesFront['loginButtonBackgroundColor']) ? $storedStylesFront['loginButtonBackgroundColor']->value : $primaryColor;
    $loginButtonHoverBackgroundColor = isset($storedStylesFront['loginButtonHoverBackgroundColor']) ? $storedStylesFront['loginButtonHoverBackgroundColor']->value : $secondaryColor;
    $loginButtonBorderRadius = isset($storedStylesFront['loginButtonBorderRadius']) ? $storedStylesFront['loginButtonBorderRadius']->value.'px' : $buttonRadius;
    $loginButtonTextColor = isset($storedStylesFront['loginButtonTextColor']) ? $storedStylesFront['loginButtonTextColor']->value : $secondaryColor;
    $loginButtonHoverTextColor = isset($storedStylesFront['loginButtonHoverTextColor']) ? $storedStylesFront['loginButtonHoverTextColor']->value : $primaryColor;

?>

<style type="text/css">

</style>

@include('extranet::front.partials.styles.login')
@include('extranet::front.partials.styles.layout')
@include('extranet::front.partials.styles.page-builder')
@include('extranet::front.partials.styles.element-file')
@include('extranet::front.partials.styles.element-form')
@include('extranet::front.partials.styles.element-table')
@include('extranet::front.partials.styles.modal-table')

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
