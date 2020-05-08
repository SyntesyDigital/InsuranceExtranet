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

    $inputColor = isset($storedStylesFront['inputColor']) ? $storedStylesFront['inputColor']->value : '#77a9f4';
    $errorColor = isset($storedStylesFront['errorColor']) ? $storedStylesFront['errorColor']->value : '#bf5329';

    $headerTextColor = isset($storedStylesFront['frontHeaderTextColor']) ? $storedStylesFront['frontHeaderTextColor']->value : '#fff';
    $headerRightPartBackgroundColor = isset($storedStylesFront['frontHeaderRightPartBackgroundColor']) ? $storedStylesFront['frontHeaderRightPartBackgroundColor']->value : '#1B3A6A';

    $elementsBackgroundColor = isset($storedStylesFront['frontElementsBackgroundColor']) ? $storedStylesFront['frontElementsBackgroundColor']->value : '#fff';
    $sidebarBackgroundColor = isset($storedStylesFront['frontSidebarBackgroundColor']) ? $storedStylesFront['frontSidebarBackgroundColor']->value : $elementsBackgroundColor;

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
    $sidebarActiveBackgroundColor = isset($storedStylesFront['frontSidebarActiveBackgroundColor']) ? $storedStylesFront['frontSidebarActiveBackgroundColor']->value : $elementsBackgroundColor;
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
    $frontBodyH4Color = isset($storedStylesFront['frontBodyH4Color']) ? $storedStylesFront['frontBodyH4Color']->value : $secondaryColor;
    $frontBodyH5Color = isset($storedStylesFront['frontBodyH5Color']) ? $storedStylesFront['frontBodyH5Color']->value : $secondaryColor;

    $frontBodyH1FontSize = isset($storedStylesFront['frontBodyH1FontSize']) ? $storedStylesFront['frontBodyH1FontSize']->value.'px' : '36px';
    $frontBodyH2FontSize = isset($storedStylesFront['frontBodyH2FontSize']) ? $storedStylesFront['frontBodyH2FontSize']->value.'px' : '30px';
    $frontBodyH3FontSize = isset($storedStylesFront['frontBodyH3FontSize']) ? $storedStylesFront['frontBodyH3FontSize']->value.'px' : '24px';
    $frontBodyH4FontSize = isset($storedStylesFront['frontBodyH4FontSize']) ? $storedStylesFront['frontBodyH4FontSize']->value.'px' : '18px';
    $frontBodyH5FontSize = isset($storedStylesFront['frontBodyH5FontSize']) ? $storedStylesFront['frontBodyH5FontSize']->value.'px' : '14px';

  //ELEMENTS
    $elementBorder = isset($storedStylesFront['frontElementBorder']) ? $storedStylesFront['frontElementBorder']->value : $bodyBackgroundColor;
    $elementHeadBackground = isset($storedStylesFront['frontElementHeadBackground']) ? $storedStylesFront['frontElementHeadBackground']->value : $elementsBackgroundColor;
    $frontElementHeadCollapsableBackground = isset($storedStylesFront['frontElementHeadCollapsableBackground']) ? $storedStylesFront['frontElementHeadCollapsableBackground']->value : $elementsBackgroundColor;

    $elementHeadColor = isset($storedStylesFront['frontElementHeadColor']) ? $storedStylesFront['frontElementHeadColor']->value : $secondaryColor;
    $elementHeadCollapsableColor = isset($storedStylesFront['elementHeadCollapsableColor']) ? $storedStylesFront['elementHeadCollapsableColor']->value : $elementHeadColor;

    $elementBackground = isset($storedStylesFront['frontElementBackground']) ? $storedStylesFront['frontElementBackground']->value : $elementsBackgroundColor;

    $elementColor = isset($storedStylesFront['frontElementColor']) ? $storedStylesFront['frontElementColor']->value : $secondaryColor;
    $elementLinkColor = isset($storedStylesFront['frontElementLinkColor']) ? $storedStylesFront['frontElementLinkColor']->value : $secondaryColor;
    $elementLinkHoverColor = isset($storedStylesFront['frontElementLinkHoverColor']) ? $storedStylesFront['frontElementLinkHoverColor']->value : $primaryColor;
    $elementButtonColor = isset($storedStylesFront['frontElementButtonColor']) ? $storedStylesFront['frontElementButtonColor']->value : $primaryColor;
    $elementButtonHoverColor = isset($storedStylesFront['frontElementButtonHoverColor']) ? $storedStylesFront['frontElementButtonHoverColor']->value : $secondaryColor;

    $titlesFontSize = isset($storedStylesFront['titleFontSize']) ? $storedStylesFront['titleFontSize']->value.'px' : '20px';
    $titleCollapsableFontSize = isset($storedStylesFront['titleCollapsableFontSize']) ? $storedStylesFront['titleCollapsableFontSize']->value.'px' : $titlesFontSize;

    //ELEMENTS BUTTON
    //Button Primary
    $buttonPrimaryColor = isset($storedStylesFront['buttonPrimaryColor']) ? $storedStylesFront['buttonPrimaryColor']->value : $primaryColor;
    $buttonPrimaryHoverColor = isset($storedStylesFront['buttonPrimaryHoverColor']) ? $storedStylesFront['buttonPrimaryHoverColor']->value : $secondaryColor;
    $buttonPrimaryBorderRadius = isset($storedStylesFront['buttonPrimaryBorderRadius']) ? $storedStylesFront['buttonPrimaryBorderRadius']->value.'px' : $buttonRadius;

    $buttonPrimaryBackgroundIconHoverColor = isset($storedStylesFront['buttonPrimaryBackgroundIconHoverColor']) ? $storedStylesFront['buttonPrimaryBackgroundIconHoverColor']->value : '#eef0f4';
    $buttonPrimaryBackgroundLabelHoverColor = isset($storedStylesFront['buttonPrimaryBackgroundLabelHoverColor']) ? $storedStylesFront['buttonPrimaryBackgroundLabelHoverColor']->value : '#eef0f4';

    $buttonPrimaryBackgroundImageColor = isset($storedStylesFront['buttonPrimaryBackgroundImageColor']) ? $storedStylesFront['buttonPrimaryBackgroundImageColor']->value : '#fff';
    $buttonPrimaryBackgroundBottomColor = isset($storedStylesFront['buttonPrimaryBackgroundBottomColor']) ? $storedStylesFront['buttonPrimaryBackgroundBottomColor']->value : '#eef0f4';
    $buttonPrimaryIconColor = isset($storedStylesFront['buttonPrimaryIconColor']) ? $storedStylesFront['buttonPrimaryIconColor']->value : '#a2a8b0';
    $buttonPrimaryIconHoverColor = isset($storedStylesFront['buttonPrimaryIconHoverColor']) ? $storedStylesFront['buttonPrimaryIconHoverColor']->value : $primaryColor;

    //Button Secondary
    $buttonSecondaryColor = isset($storedStylesFront['buttonSecondaryColor']) ? $storedStylesFront['buttonSecondaryColor']->value : $secondaryColor;
    $buttonSecondaryHoverColor = isset($storedStylesFront['buttonSecondaryHoverColor']) ? $storedStylesFront['buttonSecondaryHoverColor']->value : $primaryColor;
    $buttonSecondaryBorderRadius = isset($storedStylesFront['buttonSecondaryBorderRadius']) ? $storedStylesFront['buttonSecondaryBorderRadius']->value.'px' : $buttonRadius;

    $buttonSecondaryBackgroundLabelHoverColor = isset($storedStylesFront['buttonSecondaryBackgroundLabelHoverColor']) ? $storedStylesFront['buttonSecondaryBackgroundLabelHoverColor']->value : '#eef0f4';
    $buttonSecondaryBackgroundIconHoverColor = isset($storedStylesFront['buttonSecondaryBackgroundIconHoverColor']) ? $storedStylesFront['buttonSecondaryBackgroundIconHoverColor']->value : '#eef0f4';

    $buttonSecondaryBackgroundImageColor = isset($storedStylesFront['buttonSecondaryBackgroundImageColor']) ? $storedStylesFront['buttonSecondaryBackgroundImageColor']->value : '#fff';
    $buttonSecondaryBackgroundBottomColor = isset($storedStylesFront['buttonSecondaryBackgroundBottomColor']) ? $storedStylesFront['buttonSecondaryBackgroundBottomColor']->value : '#eef0f4';
    $buttonSecondaryIconColor = isset($storedStylesFront['buttonSecondaryIconColor']) ? $storedStylesFront['buttonSecondaryIconColor']->value : '#a2a8b0';
    $buttonSecondaryIconHoverColor = isset($storedStylesFront['buttonSecondaryIconHoverColor']) ? $storedStylesFront['buttonSecondaryIconHoverColor']->value : $primaryColor;

    $elementFileInputBorder = isset($storedStylesFront['elementFileInputBorder']) ? $storedStylesFront['elementFileInputBorder']->value : $elementsBackgroundColor;
    $fonts = config('fonts');

    //BOX TOTAL
    $elementNumberColor = isset($storedStylesFront['elementNumberColor']) ? $storedStylesFront['elementNumberColor']->value : '#2A3649';
    $backgroundColorIcon = isset($storedStylesFront['backgroundColorIcon']) ? $storedStylesFront['backgroundColorIcon']->value : '#eef0f4';
    $iconColor = isset($storedStylesFront['iconColor']) ? $storedStylesFront['iconColor']->value : '#98a0aa';
    $titleColor = isset($storedStylesFront['titleColor']) ? $storedStylesFront['titleColor']->value : '#2A3649';
    $borderRadiusBox = isset($storedStylesFront['borderRadiusBox']) ? $storedStylesFront['borderRadiusBox']->value.'px' : $buttonRadius;
    $boxShadowOpacity = isset($storedStylesFront['boxShadowOpacity']) ? $storedStylesFront['boxShadowOpacity']->value : '0';
    $fontSizeIcon = isset($storedStylesFront['fontSizeIcon']) ? $storedStylesFront['fontSizeIcon']->value.'px' : '45px';
    $fontSizeNumbers = isset($storedStylesFront['fontSizeNumbers']) ? $storedStylesFront['fontSizeNumbers']->value.'px' : '40px';
    $fontSizeLabel = isset($storedStylesFront['fontSizeLabel']) ? $storedStylesFront['fontSizeLabel']->value.'px' : '16px';

    //LOGIN

   // $loginBackgroundColor = isset($storedStylesFront['loginBackgroundColor']) ? $storedStylesFront['loginBackgroundColor']->value : $bodyBackgroundColor;
    $loginContainerBackgroundColor = isset($storedStylesFront['loginContainerBackgroundColor']) ? $storedStylesFront['loginContainerBackgroundColor']->value : $elementsBackgroundColor;
    $loginContainerBorderRadius = isset($storedStylesFront['loginContainerBorderRadius']) ? $storedStylesFront['loginContainerBorderRadius']->value.'px' : $buttonRadius;
    $loginContainerTextColor = isset($storedStylesFront['loginContainerTextColor']) ? $storedStylesFront['loginContainerTextColor']->value : $secondaryColor;
    $loginButtonBackgroundColor = isset($storedStylesFront['loginButtonBackgroundColor']) ? $storedStylesFront['loginButtonBackgroundColor']->value : $primaryColor;
    $loginButtonHoverBackgroundColor = isset($storedStylesFront['loginButtonHoverBackgroundColor']) ? $storedStylesFront['loginButtonHoverBackgroundColor']->value : $secondaryColor;
    $loginButtonBorderRadius = isset($storedStylesFront['loginButtonBorderRadius']) ? $storedStylesFront['loginButtonBorderRadius']->value.'px' : $buttonRadius;
    $loginButtonTextColor = isset($storedStylesFront['loginButtonTextColor']) ? $storedStylesFront['loginButtonTextColor']->value : $secondaryColor;
    $loginButtonHoverTextColor = isset($storedStylesFront['loginButtonHoverTextColor']) ? $storedStylesFront['loginButtonHoverTextColor']->value : $primaryColor;

    //FORM
    $labelColor = isset($storedStylesFront['labelColor']) ? $storedStylesFront['labelColor']->value : $primaryColor;
    $labelFontSize = isset($storedStylesFront['labelFontSize']) ? $storedStylesFront['labelFontSize']->value.'px' : '18px';
    $labelPadding = isset($storedStylesFront['labelPadding']) ? $storedStylesFront['labelPadding']->value.'px' : '10px';

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
@include('extranet::front.partials.styles.form')
@include('extranet::front.partials.styles.total-box')
@include('extranet::front.partials.styles.form-template')
@include('extranet::front.partials.styles.stepper')
@include('extranet::front.partials.styles.document-table')
@include('extranet::front.partials.styles.missing-documents')

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
