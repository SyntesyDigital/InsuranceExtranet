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
    $colorSidebarIconMenu = isset($storedStylesFront['colorSidebarIconMenu']) ? $storedStylesFront['colorSidebarIconMenu']->value : $secondaryColor;
    $backgroundColorSidebarTooltip = isset($storedStylesFront['backgroundColorSidebarTooltip']) ? $storedStylesFront['backgroundColorSidebarTooltip']->value : $sidebarBackgroundColor;
    $colorSidebarTooltip = isset($storedStylesFront['colorSidebarTooltip']) ? $storedStylesFront['colorSidebarTooltip']->value : $secondaryColor;
    $sidebarBorderRadiusBottomRight = isset($storedStylesFront['frontSidebarBorderRadiusBottomRight']) ? $storedStylesFront['frontSidebarBorderRadiusBottomRight']->value.'px' : '0';
    $sidebarBorderColor = isset($storedStylesFront['frontSidebarBorderColor']) ? $storedStylesFront['frontSidebarBorderColor']->value : $sidebarBackgroundColor;
    $sidebarHeightUser = isset($storedStylesFront['frontSidebarHeightUser']) ? $storedStylesFront['frontSidebarHeightUser']->value : '50';
    $sidebarFontSizeItems = isset($storedStylesFront['frontSidebarFontSizeItems']) ? $storedStylesFront['frontSidebarFontSizeItems']->value.'px' : '16px';
    $sidebarWidth = isset($storedStylesFront['frontSidebarWidth']) ? $storedStylesFront['frontSidebarWidth']->value.'px' : '250px';

  //FOOTER
    $footerBackgroundColor = isset($storedStylesFront['frontFooterBackgroundColor']) ? $storedStylesFront['frontFooterBackgroundColor']->value : $bodyBackgroundColor;
    $footerHoverTextColor = isset($storedStylesFront['frontFooterHoverTextColor']) ? $storedStylesFront['frontFooterHoverTextColor']->value : $primaryColor;
    $footerTextColor = isset($storedStylesFront['frontFooterTextColor']) ? $storedStylesFront['frontFooterTextColor']->value : $secondaryColor;
    $footerVersionColor = isset($storedStylesFront['frontFooterVersionColor']) ? $storedStylesFront['frontFooterVersionColor']->value : $secondaryColor;
    $footerTextContactColor = isset($storedStylesFront['frontFooterTextContactColor']) ? $storedStylesFront['frontFooterTextContactColor']->value : $secondaryColor;
    $footerTextNumberColor = isset($storedStylesFront['frontFooterTextNumberColor']) ? $storedStylesFront['frontFooterTextNumberColor']->value : $primaryColor;

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

    $frontBodyH1FontWeight = isset($storedStylesFront['frontBodyH1FontWeight']) ? $storedStylesFront['frontBodyH1FontWeight']->value : '500';
    $frontBodyH2FontWeight = isset($storedStylesFront['frontBodyH2FontWeight']) ? $storedStylesFront['frontBodyH2FontWeight']->value : '500';
    $frontBodyH3FontWeight = isset($storedStylesFront['frontBodyH3FontWeight']) ? $storedStylesFront['frontBodyH3FontWeight']->value : '500';
    $frontBodyH4FontWeight = isset($storedStylesFront['frontBodyH4FontWeight']) ? $storedStylesFront['frontBodyH4FontWeight']->value : '500';
    $frontBodyH5FontWeight = isset($storedStylesFront['frontBodyH5FontWeight']) ? $storedStylesFront['frontBodyH5FontWeight']->value : '500';

  //ELEMENTS
    $elementBorder = isset($storedStylesFront['frontElementBorder']) ? $storedStylesFront['frontElementBorder']->value : $bodyBackgroundColor;
    $elementHeadBackground = isset($storedStylesFront['frontElementHeadBackground']) ? $storedStylesFront['frontElementHeadBackground']->value : $elementsBackgroundColor;
    $frontElementHeadCollapsableBackground = isset($storedStylesFront['frontElementHeadCollapsableBackground']) ? $storedStylesFront['frontElementHeadCollapsableBackground']->value : $elementsBackgroundColor;
    $elementHeadColor = isset($storedStylesFront['frontElementHeadColor']) ? $storedStylesFront['frontElementHeadColor']->value : $secondaryColor;
    $elementHeadIconColor = isset($storedStylesFront['frontElementHeadIconColor']) ? $storedStylesFront['frontElementHeadIconColor']->value : $secondaryColor;
    $elementHeadCollapsableColor = isset($storedStylesFront['elementHeadCollapsableColor']) ? $storedStylesFront['elementHeadCollapsableColor']->value : $elementHeadColor;
    $elementBackground = isset($storedStylesFront['frontElementBackground']) ? $storedStylesFront['frontElementBackground']->value : $elementsBackgroundColor;
    $elementColor = isset($storedStylesFront['frontElementColor']) ? $storedStylesFront['frontElementColor']->value : $secondaryColor;
    $elementLinkColor = isset($storedStylesFront['frontElementLinkColor']) ? $storedStylesFront['frontElementLinkColor']->value : $secondaryColor;
    $elementLinkHoverColor = isset($storedStylesFront['frontElementLinkHoverColor']) ? $storedStylesFront['frontElementLinkHoverColor']->value : $primaryColor;
    $elementButtonColor = isset($storedStylesFront['frontElementButtonColor']) ? $storedStylesFront['frontElementButtonColor']->value : $primaryColor;
    $elementButtonHoverColor = isset($storedStylesFront['frontElementButtonHoverColor']) ? $storedStylesFront['frontElementButtonHoverColor']->value : $secondaryColor;
    $elementHeadTextTransform = isset($storedStylesFront['elementHeadTextTransform']) ? $storedStylesFront['elementHeadTextTransform']->value : 'uppercase';
    $elementHeadTransparent = isset($storedStylesFront['frontElementHeadTransparent']) ? $storedStylesFront['frontElementHeadTransparent']->value : false;

    $titlesFontSize = isset($storedStylesFront['titleFontSize']) ? $storedStylesFront['titleFontSize']->value.'px' : '20px';
    $titleCollapsableFontSize = isset($storedStylesFront['titleCollapsableFontSize']) ? $storedStylesFront['titleCollapsableFontSize']->value.'px' : $titlesFontSize;

    $iconFontSizeElement = isset($storedStylesFront['iconFontSizeElement']) ? $storedStylesFront['iconFontSizeElement']->value.'px' : '25px';
    $iconColorElement = isset($storedStylesFront['iconColorElement']) ? $storedStylesFront['iconColorElement']->value : '#a2a8b3';

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

    //Simple Button
    // btn-1
    $btn1Color = isset($storedStylesFront['btn1Color']) ? $storedStylesFront['btn1Color']->value : $secondaryColor;
    $btn1BackgroundColor = isset($storedStylesFront['btn1BackgroundColor']) ? $storedStylesFront['btn1BackgroundColor']->value : $primaryColor;
    $btn1BorderColor = isset($storedStylesFront['btn1BorderColor']) ? $storedStylesFront['btn1BorderColor']->value : $secondaryColor;
    $btn1BackgroundHoverColor = isset($storedStylesFront['btn1BackgroundHoverColor']) ? $storedStylesFront['btn1BackgroundHoverColor']->value : $secondaryColor;
    $btn1HoverColor = isset($storedStylesFront['btn1HoverColor']) ? $storedStylesFront['btn1HoverColor']->value : $primaryColor;
    $btn1HoverBorderColor = isset($storedStylesFront['btn1HoverBorderColor']) ? $storedStylesFront['btn1HoverBorderColor']->value : $primaryColor;
    $btn1FontSize = isset($storedStylesFront['btn1FontSize']) ? $storedStylesFront['btn1FontSize']->value.'px' : '14px';
    $btn1BorderRadius = isset($storedStylesFront['btn1BorderRadius']) ? $storedStylesFront['btn1BorderRadius']->value.'px' : '24px';

    // btn-2
    $btn2Color = isset($storedStylesFront['btn2Color']) ? $storedStylesFront['btn2Color']->value : $secondaryColor;
    $btn2BackgroundColor = isset($storedStylesFront['btn2BackgroundColor']) ? $storedStylesFront['btn2BackgroundColor']->value : $primaryColor;
    $btn2BorderColor = isset($storedStylesFront['btn2BorderColor']) ? $storedStylesFront['btn2BorderColor']->value : $secondaryColor;
    $btn2BackgroundHoverColor = isset($storedStylesFront['btn2BackgroundHoverColor']) ? $storedStylesFront['btn2BackgroundHoverColor']->value : $secondaryColor;
    $btn2HoverColor = isset($storedStylesFront['btn2HoverColor']) ? $storedStylesFront['btn2HoverColor']->value : $primaryColor;
    $btn2BorderHoverColor = isset($storedStylesFront['btn2BorderHoverColor']) ? $storedStylesFront['btn2BorderHoverColor']->value : $primaryColor;
    $btn2FontSize = isset($storedStylesFront['btn2FontSize']) ? $storedStylesFront['btn2FontSize']->value.'px' : '14px';
    $btn2BorderRadius = isset($storedStylesFront['btn2BorderRadius']) ? $storedStylesFront['btn2BorderRadius']->value.'px' : '24px';

    // btn-3
    $btn3Color = isset($storedStylesFront['btn3Color']) ? $storedStylesFront['btn3Color']->value : $secondaryColor;
    $btn3BackgroundColor = isset($storedStylesFront['btn3BackgroundColor']) ? $storedStylesFront['btn3BackgroundColor']->value : $primaryColor;
    $btn3BorderColor = isset($storedStylesFront['btn3BorderColor']) ? $storedStylesFront['btn3BorderColor']->value : $secondaryColor;
    $btn3BackgroundHoverColor = isset($storedStylesFront['btn3BackgroundHoverColor']) ? $storedStylesFront['btn3BackgroundHoverColor']->value : $secondaryColor;
    $btn3HoverColor = isset($storedStylesFront['btn3HoverColor']) ? $storedStylesFront['btn3HoverColor']->value : $primaryColor;
    $btn3BorderHoverColor = isset($storedStylesFront['btn3BorderHoverColor']) ? $storedStylesFront['btn3BorderHoverColor']->value : $primaryColor;
    $btn3FontSize = isset($storedStylesFront['btn3FontSize']) ? $storedStylesFront['btn3FontSize']->value.'px' : '14px';
    $btn3BorderRadius = isset($storedStylesFront['btn3BorderRadius']) ? $storedStylesFront['btn3BorderRadius']->value.'px' : '24px';

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

    //BOX TOTAL PRICE
    $titleColorBoxPrice = isset($storedStylesFront['titleColorBoxPrice']) ? $storedStylesFront['titleColorBoxPrice']->value : $primaryColor;
    $backgroundColorBoxPrice = isset($storedStylesFront['backgroundColorBoxPrice']) ? $storedStylesFront['backgroundColorBoxPrice']->value : $secondaryColor;
    $backgroundHoverColorBoxPrice = isset($storedStylesFront['backgroundHoverColorBoxPrice']) ? $storedStylesFront['backgroundHoverColorBoxPrice']->value : $secondaryColor;
    $subtitleColorBoxPrice = isset($storedStylesFront['subtitleColorBoxPrice']) ? $storedStylesFront['subtitleColorBoxPrice']->value : $primaryColor;
    $subtitle2ColorBoxPrice = isset($storedStylesFront['subtitle2ColorBoxPrice']) ? $storedStylesFront['subtitle2ColorBoxPrice']->value : $primaryColor;
    $elementNumberPriceColorBoxPrice = isset($storedStylesFront['elementNumberPriceColorBoxPrice']) ? $storedStylesFront['elementNumberPriceColorBoxPrice']->value : $primaryColor;
    $fontSizeTitleBoxPrice = isset($storedStylesFront['fontSizeTitleBoxPrice']) ? $storedStylesFront['fontSizeTitleBoxPrice']->value.'px' : '16px';
    $fontSizeSubTitleBoxPrice = isset($storedStylesFront['fontSizeSubTitleBoxPrice']) ? $storedStylesFront['fontSizeSubTitleBoxPrice']->value.'px' : '16px';
    $fontSizeSubTitle2BoxPrice = isset($storedStylesFront['fontSizeSubTitle2BoxPrice']) ? $storedStylesFront['fontSizeSubTitle2BoxPrice']->value.'px' : '12px';
    $fontSizeNumberBoxPrice = isset($storedStylesFront['fontSizeNumberBoxPrice']) ? $storedStylesFront['fontSizeNumberBoxPrice']->value.'px' : '30px';
    $borderRadiusBoxPrice = isset($storedStylesFront['borderRadiusBoxPrice']) ? $storedStylesFront['borderRadiusBoxPrice']->value.'px' : $buttonRadius;
    $boxShadowOpacityBoxPrice = isset($storedStylesFront['boxShadowOpacityBoxPrice']) ? $storedStylesFront['boxShadowOpacityBoxPrice']->value : '0';

    //LOGIN

    $loginInputBorderColor = isset($storedStylesFront['loginInputBorderColor']) ? $storedStylesFront['loginInputBorderColor']->value : '#E6E6E6';
    $loginContainerBackgroundColor = isset($storedStylesFront['loginContainerBackgroundColor']) ? $storedStylesFront['loginContainerBackgroundColor']->value : $elementsBackgroundColor;
    $loginContainerBorderRadius = isset($storedStylesFront['loginContainerBorderRadius']) ? $storedStylesFront['loginContainerBorderRadius']->value.'px' : $buttonRadius;
    $loginContainerLabelColor = isset($storedStylesFront['loginContainerLabelColor']) ? $storedStylesFront['loginContainerLabelColor']->value : $secondaryColor;
    $loginContainerMotPasseColor = isset($storedStylesFront['loginContainerMotPasseColor']) ? $storedStylesFront['loginContainerMotPasseColor']->value : $secondaryColor;
    $loginContainerTitleColor = isset($storedStylesFront['loginContainerTitleColor']) ? $storedStylesFront['loginContainerTitleColor']->value : $secondaryColor;
    $lowerUpperCaseButtonLogin = isset($storedStylesFront['lowerUpperCaseButtonLogin']) ? $storedStylesFront['lowerUpperCaseButtonLogin']->value : 'capitalize';
    $loginBorderColorFooter = isset($storedStylesFront['loginBorderColorFooter']) ? $storedStylesFront['loginBorderColorFooter']->value : $secondaryColor;
    $loginContainerBorderColor = isset($storedStylesFront['loginContainerBorderColor']) ? $storedStylesFront['loginContainerBorderColor']->value : '#e4e4e4';
    $alignMotDePasseLogin = isset($storedStylesFront['alignMotDePasseLogin']) ? $storedStylesFront['alignMotDePasseLogin']->value : '0';
    $alignHorizontalMotDePasseLogin = isset($storedStylesFront['alignHorizontalMotDePasseLogin']) ? $storedStylesFront['alignHorizontalMotDePasseLogin']->value : '0';
    $alignFooterLogin = isset($storedStylesFront['alignFooterLogin']) ? $storedStylesFront['alignFooterLogin']->value : 'right';
    $loginMaxHeightLogo = isset($storedStylesFront['loginMaxHeightLogo']) ? $storedStylesFront['loginMaxHeightLogo']->value.'px' : '75';
    $loginButtonBackgroundColor = isset($storedStylesFront['loginButtonBackgroundColor']) ? $storedStylesFront['loginButtonBackgroundColor']->value : $primaryColor;
    $loginButtonHoverBackgroundColor = isset($storedStylesFront['loginButtonHoverBackgroundColor']) ? $storedStylesFront['loginButtonHoverBackgroundColor']->value : $secondaryColor;
    $loginButtonBorderRadius = isset($storedStylesFront['loginButtonBorderRadius']) ? $storedStylesFront['loginButtonBorderRadius']->value.'px' : $buttonRadius;
    $loginButtonTextColor = isset($storedStylesFront['loginButtonTextColor']) ? $storedStylesFront['loginButtonTextColor']->value : $secondaryColor;
    $loginButtonHoverTextColor = isset($storedStylesFront['loginButtonHoverTextColor']) ? $storedStylesFront['loginButtonHoverTextColor']->value : $primaryColor;
    $letterSpacingTitleLogin = isset($storedStylesFront['letterSpacingTitleLogin']) ? $storedStylesFront['letterSpacingTitleLogin']->value.'px' : '3px';
    $loginButtonHoverBorderColor = isset($storedStylesFront['loginButtonHoverBorderColor']) ? $storedStylesFront['loginButtonHoverBorderColor']->value : $primaryColor;

    //FORM SETTINGS
    $labelColor = isset($storedStylesFront['labelColor']) ? $storedStylesFront['labelColor']->value : $primaryColor;
    $labelFontSize = isset($storedStylesFront['labelFontSize']) ? $storedStylesFront['labelFontSize']->value.'px' : '18px';
    $labelPadding = isset($storedStylesFront['labelPadding']) ? $storedStylesFront['labelPadding']->value.'px' : '10px';
    $labelRadioFieldFontSize = isset($storedStylesFront['labelRadioFieldFontSize']) ? $storedStylesFront['labelRadioFieldFontSize']->value.'px' : '14px';

    $labelInputColor = isset($storedStylesFront['labelInputColor']) ? $storedStylesFront['labelInputColor']->value : $primaryColor;
    $labelInputFontSize = isset($storedStylesFront['labelInputFontSize']) ? $storedStylesFront['labelInputFontSize']->value.'px' : '14px';
    $labelInputPadding = isset($storedStylesFront['labelInputPadding']) ? $storedStylesFront['labelInputPadding']->value.'px' : '0';
    $borderPxInputForm = isset($storedStylesFront['borderPxInputForm']) ? $storedStylesFront['borderPxInputForm']->value.'px' : '1px';

    $borderRadiusInput = isset($storedStylesFront['borderRadiusInput']) ? $storedStylesFront['borderRadiusInput']->value.'px' : '0';
    $borderColorInput = isset($storedStylesFront['borderColorInput']) ? $storedStylesFront['borderColorInput']->value : $inputColor;
    $hoverColorInput = isset($storedStylesFront['hoverColorInput']) ? $storedStylesFront['hoverColorInput']->value : $inputColor;

    //BOX-1
    $backgroundColorBox1 = isset($storedStylesFront['backgroundColorBox1']) ? $storedStylesFront['backgroundColorBox1']->value : 'transparent';
    $textColorBox1 = isset($storedStylesFront['textColorBox1']) ? $storedStylesFront['textColorBox1']->value : $secondaryColor;
    $borderColorBox1 = isset($storedStylesFront['borderColorBox1']) ? $storedStylesFront['borderColorBox1']->value : 'transparent';
    $borderRadiusBox1 = isset($storedStylesFront['borderRadiusBox1']) ? $storedStylesFront['borderRadiusBox1']->value.'px' : '0';

    //BOX-2
    $backgroundColorBox2 = isset($storedStylesFront['backgroundColorBox2']) ? $storedStylesFront['backgroundColorBox2']->value : 'transparent';
    $textColorBox2 = isset($storedStylesFront['textColorBox2']) ? $storedStylesFront['textColorBox2']->value : $secondaryColor;
    $borderColorBox2 = isset($storedStylesFront['borderColorBox2']) ? $storedStylesFront['borderColorBox2']->value : 'transparent';
    $borderRadiusBox2 = isset($storedStylesFront['borderRadiusBox2']) ? $storedStylesFront['borderRadiusBox2']->value.'px' : '0';

    //BOX-3
    $backgroundColorBox3 = isset($storedStylesFront['backgroundColorBox3']) ? $storedStylesFront['backgroundColorBox3']->value : 'transparent';
    $textColorBox3 = isset($storedStylesFront['textColorBox3']) ? $storedStylesFront['textColorBox3']->value : $secondaryColor;
    $borderColorBox3 = isset($storedStylesFront['borderColorBox3']) ? $storedStylesFront['borderColorBox3']->value : 'transparent';
    $borderRadiusBox3 = isset($storedStylesFront['borderRadiusBox3']) ? $storedStylesFront['borderRadiusBox3']->value.'px' : '0';

    //IMAGE TEXT LINK
    $titleFontSizeImgTxtLink = isset($storedStylesFront['titleFontSizeImgTxtLink']) ? $storedStylesFront['titleFontSizeImgTxtLink']->value.'px' : '24px';
    $titleColorImgTxtLink = isset($storedStylesFront['titleColorImgTxtLink']) ? $storedStylesFront['titleColorImgTxtLink']->value : $inputColor;
    $linkFontSizeImgTxtLink = isset($storedStylesFront['linkFontSizeImgTxtLink']) ? $storedStylesFront['linkFontSizeImgTxtLink']->value.'px' : '14px';
    $linkColorImgTxtLink = isset($storedStylesFront['linkColorImgTxtLink']) ? $storedStylesFront['linkColorImgTxtLink']->value : $inputColor;
    $dateFontSizeImgTxtLink = isset($storedStylesFront['dateFontSizeImgTxtLink']) ? $storedStylesFront['dateFontSizeImgTxtLink']->value.'px' : '16px';
    $dateColorImgTxtLink = isset($storedStylesFront['dateColorImgTxtLink']) ? $storedStylesFront['dateColorImgTxtLink']->value : $secondaryColor;
    $descFontSizeImgTxtLink = isset($storedStylesFront['descFontSizeImgTxtLink']) ? $storedStylesFront['descFontSizeImgTxtLink']->value.'px' : '14px';
    $descColorImgTxtLink = isset($storedStylesFront['descColorImgTxtLink']) ? $storedStylesFront['descColorImgTxtLink']->value : $secondaryColor;
    $borderRadiusImgTxtLink = isset($storedStylesFront['borderRadiusImgTxtLink']) ? $storedStylesFront['borderRadiusImgTxtLink']->value.'px' : '20px';

    //IMAGE TEXT TITLE DOCUMENTS
    $titleColorImgTxtTitleDocuments = isset($storedStylesFront['titleColorImgTxtTitleDocuments']) ? $storedStylesFront['titleColorImgTxtTitleDocuments']->value : $primaryColor;
    $descColorImgTxtTitleDocuments = isset($storedStylesFront['descColorImgTxtTitleDocuments']) ? $storedStylesFront['descColorImgTxtTitleDocuments']->value : $primaryColor;
    $borderTitleColorImgTxtTitleDocuments = isset($storedStylesFront['borderTitleColorImgTxtTitleDocuments']) ? $storedStylesFront['borderTitleColorImgTxtTitleDocuments']->value : $primaryColor;
    $buttonColorImgTxtTitleDocuments = isset($storedStylesFront['buttonColorImgTxtTitleDocuments']) ? $storedStylesFront['buttonColorImgTxtTitleDocuments']->value : $primaryColor;
    $buttonBackgroundColorImgTxtTitleDocuments = isset($storedStylesFront['buttonBackgroundColorImgTxtTitleDocuments']) ? $storedStylesFront['buttonBackgroundColorImgTxtTitleDocuments']->value : $secondaryColor;
    $buttonBackgroundHoverColorImgTxtTitleDocuments = isset($storedStylesFront['buttonBackgroundHoverColorImgTxtTitleDocuments']) ? $storedStylesFront['buttonBackgroundHoverColorImgTxtTitleDocuments']->value : $primaryColor;
    $buttonColorHoverImgTxtTitleDocuments = isset($storedStylesFront['buttonColorHoverImgTxtTitleDocuments']) ? $storedStylesFront['buttonColorHoverImgTxtTitleDocuments']->value : $secondaryColor;
    $buttonBorderColorImgTxtTitleDocuments = isset($storedStylesFront['buttonBorderColorImgTxtTitleDocuments']) ? $storedStylesFront['buttonBorderColorImgTxtTitleDocuments']->value : '#A8A8A8';
    $button2ColorImgTxtTitleDocuments = isset($storedStylesFront['button2ColorImgTxtTitleDocuments']) ? $storedStylesFront['button2ColorImgTxtTitleDocuments']->value : $secondaryColor;
    $button2BackgroundColorImgTxtTitleDocuments = isset($storedStylesFront['button2BackgroundColorImgTxtTitleDocuments']) ? $storedStylesFront['button2BackgroundColorImgTxtTitleDocuments']->value : $primaryColor;
    $button2BackgroundHoverColorImgTxtTitleDocuments = isset($storedStylesFront['button2BackgroundHoverColorImgTxtTitleDocuments']) ? $storedStylesFront['button2BackgroundHoverColorImgTxtTitleDocuments']->value : $secondaryColor;
    $button2ColorHoverImgTxtTitleDocuments = isset($storedStylesFront['button2ColorHoverImgTxtTitleDocuments']) ? $storedStylesFront['button2ColorHoverImgTxtTitleDocuments']->value : $primaryColor;
    $button2BorderColorImgTxtTitleDocuments = isset($storedStylesFront['button2BorderColorImgTxtTitleDocuments']) ? $storedStylesFront['button2BorderColorImgTxtTitleDocuments']->value : $primaryColor;
    $descColorImgTxtTitleDocuments = isset($storedStylesFront['descColorImgTxtTitleDocuments']) ? $storedStylesFront['descColorImgTxtTitleDocuments']->value : $primaryColor;
    $titleFontSizeImgTitleDocuments = isset($storedStylesFront['titleFontSizeImgTitleDocuments']) ? $storedStylesFront['titleFontSizeImgTitleDocuments']->value.'px' : '20px';
    $titleFontWeightImgTitleDocuments = isset($storedStylesFront['titleFontWeightImgTitleDocuments']) ? $storedStylesFront['titleFontWeightImgTitleDocuments']->value : '400';
    $descFontSizeImgTxtTitleDocuments = isset($storedStylesFront['descFontSizeImgTxtTitleDocuments']) ? $storedStylesFront['descFontSizeImgTxtTitleDocuments']->value.'px' : '16px';
    $borderRadiusButtons1ImgTxtTitleDocuments = isset($storedStylesFront['borderRadiusButtons1ImgTxtTitleDocuments']) ? $storedStylesFront['borderRadiusButtons1ImgTxtTitleDocuments']->value.'px' : '0';
    $borderRadiusButtons2ImgTxtTitleDocuments = isset($storedStylesFront['borderRadiusButtons2ImgTxtTitleDocuments']) ? $storedStylesFront['borderRadiusButtons2ImgTxtTitleDocuments']->value.'px' : '30px';
    $borderRadiusImgTxtTitleDocuments = isset($storedStylesFront['borderRadiusImgTxtTitleDocuments']) ? $storedStylesFront['borderRadiusImgTxtTitleDocuments']->value.'px' : '20px';
    $button1FontSizeImgTitleDocuments = isset($storedStylesFront['button1FontSizeImgTitleDocuments']) ? $storedStylesFront['button1FontSizeImgTitleDocuments']->value.'px' : '16px';
    $button2FontSizeImgTitleDocuments = isset($storedStylesFront['button2FontSizeImgTitleDocuments']) ? $storedStylesFront['button2FontSizeImgTitleDocuments']->value.'px' : '16px';

    //HORIZONTAL BANNER
    $titleColorHorizontalBanner = isset($storedStylesFront['titleColorHorizontalBanner']) ? $storedStylesFront['titleColorHorizontalBanner']->value : $primaryColor;
    $titleHoverColorHorizontalBanner = isset($storedStylesFront['titleHoverColorHorizontalBanner']) ? $storedStylesFront['titleHoverColorHorizontalBanner']->value : $primaryColor;
    $subtitleColorHorizontalBanner = isset($storedStylesFront['subtitleColorHorizontalBanner']) ? $storedStylesFront['subtitleColorHorizontalBanner']->value : $secondaryColor;
    $subtitleHoverColorHorizontalBanner = isset($storedStylesFront['subtitleHoverColorHorizontalBanner']) ? $storedStylesFront['subtitleHoverColorHorizontalBanner']->value : $secondaryColor;
    $backgroundColorHorizontalBanner = isset($storedStylesFront['backgroundColorHorizontalBanner']) ? $storedStylesFront['backgroundColorHorizontalBanner']->value : '#fff';
    $backgroundColorHoverHorizontalBanner = isset($storedStylesFront['backgroundColorHoverHorizontalBanner']) ? $storedStylesFront['backgroundColorHoverHorizontalBanner']->value : '#fff';
    $iconArrowColorHorizontalBanner = isset($storedStylesFront['iconArrowColorHorizontalBanner']) ? $storedStylesFront['iconArrowColorHorizontalBanner']->value : $primaryColor;
    $iconArrowHoverColorHorizontalBanner = isset($storedStylesFront['iconArrowHoverColorHorizontalBanner']) ? $storedStylesFront['iconArrowHoverColorHorizontalBanner']->value : $primaryColor;
    $titleFontSizeHorizontalBanner = isset($storedStylesFront['titleFontSizeHorizontalBanner']) ? $storedStylesFront['titleFontSizeHorizontalBanner']->value.'px' : '14px';
    $subtitleFontSizeHorizontalBanner = isset($storedStylesFront['subtitleFontSizeHorizontalBanner']) ? $storedStylesFront['subtitleFontSizeHorizontalBanner']->value.'px' : '18px';
    $borderRadiusHorizontalBanner = isset($storedStylesFront['borderRadiusHorizontalBanner']) ? $storedStylesFront['borderRadiusHorizontalBanner']->value.'px' : $buttonRadius;
    $boxShadowOpacityHorizontalBanner = isset($storedStylesFront['boxShadowOpacityHorizontalBanner']) ? $storedStylesFront['boxShadowOpacityHorizontalBanner']->value : '15';

    //ACTION BUTTON
    $backgroundColorActionButton = isset($storedStylesFront['backgroundColorActionButton']) ? $storedStylesFront['backgroundColorActionButton']->value : '#fff';
    $backgroundHoverColorActionButton = isset($storedStylesFront['backgroundHoverColorActionButton']) ? $storedStylesFront['backgroundHoverColorActionButton']->value : '#fff';
    $iconColorActionButton = isset($storedStylesFront['iconColorActionButton']) ? $storedStylesFront['iconColorActionButton']->value : $secondaryColor;
    $iconHoverColorActionButton = isset($storedStylesFront['iconHoverColorActionButton']) ? $storedStylesFront['iconHoverColorActionButton']->value : $primaryColor;
    $titleColorActionButton = isset($storedStylesFront['titleColorActionButton']) ? $storedStylesFront['titleColorActionButton']->value : $primaryColor;
    $titleHoverColorActionButton = isset($storedStylesFront['titleHoverColorActionButton']) ? $storedStylesFront['titleHoverColorActionButton']->value : $secondaryColor;
    $borderTopLeftActionButton = isset($storedStylesFront['borderTopLeftActionButton']) ? $storedStylesFront['borderTopLeftActionButton']->value : '0px';
    $borderTopRightActionButton = isset($storedStylesFront['borderTopRightActionButton']) ? $storedStylesFront['borderTopRightActionButton']->value : '0px';
    $borderBottomRightActionButton = isset($storedStylesFront['borderBottomRightActionButton']) ? $storedStylesFront['borderBottomRightActionButton']->value : '0px';
    $borderBottomLeftActionButton = isset($storedStylesFront['borderBottomLeftActionButton']) ? $storedStylesFront['borderBottomLeftActionButton']->value : '0px';
    $fontSizeTitleActionButton = isset($storedStylesFront['fontSizeTitleActionButton']) ? $storedStylesFront['fontSizeTitleActionButton']->value.'px' : '18px';
    $boxShadowOpacityActionButton = isset($storedStylesFront['boxShadowOpacityActionButton']) ? $storedStylesFront['boxShadowOpacityActionButton']->value : '15';

    //ACTION LIST

    $labelActionListFontSize = isset($storedStylesFront['labelActionListFontSize']) ? $storedStylesFront['labelActionListFontSize']->value.'px' : '14px';
    $labelActionListColor = isset($storedStylesFront['labelActionListColor']) ? $storedStylesFront['labelActionListColor']->value : $primaryColor;
    $actionListButtonBackgroundColor = isset($storedStylesFront['actionListButtonBackgroundColor']) ? $storedStylesFront['actionListButtonBackgroundColor']->value : $secondaryColor;
    $actionListButtonBackgroundHoverColor = isset($storedStylesFront['actionListButtonBackgroundHoverColor']) ? $storedStylesFront['actionListButtonBackgroundHoverColor']->value : $primaryColor;
    $actionListButtonBorderColor = isset($storedStylesFront['actionListButtonBorderColor']) ? $storedStylesFront['actionListButtonBorderColor']->value : $primaryColor;
    $actionListButtonBorderHoverColor = isset($storedStylesFront['actionListButtonBorderHoverColor']) ? $storedStylesFront['actionListButtonBorderHoverColor']->value : $secondaryColor;
    $actionListButtonColorIcon = isset($storedStylesFront['actionListButtonColorIcon']) ? $storedStylesFront['actionListButtonColorIcon']->value : $primaryColor;
    $actionListButtonHoverColorIcon = isset($storedStylesFront['actionListButtonHoverColorIcon']) ? $storedStylesFront['actionListButtonHoverColorIcon']->value : $secondaryColor;
    $actionListDropdownBackgroundColor = isset($storedStylesFront['actionListDropdownBackgroundColor']) ? $storedStylesFront['actionListDropdownBackgroundColor']->value : '#fffffff';
    $actionListDropdownColor = isset($storedStylesFront['actionListDropdownColor']) ? $storedStylesFront['actionListDropdownColor']->value : $primaryColor;
    $actionListDropdownTextFontSize = isset($storedStylesFront['actionListDropdownTextFontSize']) ? $storedStylesFront['actionListDropdownTextFontSize']->value.'px' : '14px';
    $actionListDropdownHoverColor = isset($storedStylesFront['actionListDropdownHoverColor']) ? $storedStylesFront['actionListDropdownHoverColor']->value : $primaryColor;
    $actionListDropdownBorderRadius = isset($storedStylesFront['actionListDropdownBorderRadius']) ? $storedStylesFront['actionListDropdownBorderRadius']->value.'px' : '8px';

    //TABS
    $fontColorTab = isset($storedStylesFront['fontColorTab']) ? $storedStylesFront['fontColorTab']->value : $secondaryColor;
    $backgroundColorTab = isset($storedStylesFront['backgroundColorTab']) ? $storedStylesFront['backgroundColorTab']->value : $primaryColor;
    $fontColorActiveTab = isset($storedStylesFront['fontColorActiveTab']) ? $storedStylesFront['fontColorActiveTab']->value : $secondaryColor;
    $backgroundColorActiveTab = isset($storedStylesFront['backgroundColorActiveTab']) ? $storedStylesFront['backgroundColorActiveTab']->value : '#fff';
    $backgroundHoverColorTab = isset($storedStylesFront['backgroundHoverColorTab']) ? $storedStylesFront['backgroundHoverColorTab']->value : $primaryColor;
    $backgroundColorContentTab = isset($storedStylesFront['backgroundColorContentTab']) ? $storedStylesFront['backgroundColorContentTab']->value : '#fff';
    $fontSizeTab = isset($storedStylesFront['fontSizeTab']) ? $storedStylesFront['fontSizeTab']->value.'px' : '14px';
    $borderRadiusTab = isset($storedStylesFront['borderRadiusTab']) ? $storedStylesFront['borderRadiusTab']->value.'px' : '10px';

    //ELEMENT TABLE
    $headerColorTable = isset($storedStylesFront['headerColorTable']) ? $storedStylesFront['headerColorTable']->value : '#868d97';
    $headerBackgroundColorTable = isset($storedStylesFront['headerBackgroundColorTable']) ? $storedStylesFront['headerBackgroundColorTable']->value : '#fff';
    $rowColorTable = isset($storedStylesFront['rowColorTable']) ? $storedStylesFront['rowColorTable']->value : $secondaryColor;
    $rowHoverColorTable = isset($storedStylesFront['rowHoverColorTable']) ? $storedStylesFront['rowHoverColorTable']->value : $secondaryColor;
    $rowBackgroundHoverColorTable = isset($storedStylesFront['rowBackgroundHoverColorTable']) ? $storedStylesFront['rowBackgroundHoverColorTable']->value : '#f7f9fa';
    $rowOddBackgroundColorTable = isset($storedStylesFront['rowOddBackgroundColorTable']) ? $storedStylesFront['rowOddBackgroundColorTable']->value : '#fff';
    $rowEvenBackgroundColorTable = isset($storedStylesFront['rowEvenBackgroundColorTable']) ? $storedStylesFront['rowEvenBackgroundColorTable']->value : '#f7f9fa';
    $fontSizeHeaderTable = isset($storedStylesFront['fontSizeHeaderTable']) ? $storedStylesFront['fontSizeHeaderTable']->value.'px' : '14px';
    $fontSizeRowTable = isset($storedStylesFront['fontSizeRowTable']) ? $storedStylesFront['fontSizeRowTable']->value.'px' : '14px';
    $iconColorHeaderTable = isset($storedStylesFront['iconColorHeaderTable']) ? $storedStylesFront['iconColorHeaderTable']->value : '#d7d7d7';
    $borderRadiusRowTable = isset($storedStylesFront['borderRadiusRowTable']) ? $storedStylesFront['borderRadiusRowTable']->value.'px' : '0';
    $alignFilterTable = isset($storedStylesFront['alignFilterTable']) ? $storedStylesFront['alignFilterTable']->value : '3';
    $lowerUpperCaseHeaderTable = isset($storedStylesFront['lowerUpperCaseHeaderTable']) ? $storedStylesFront['lowerUpperCaseHeaderTable']->value : 'capitalize';

    //CHAT
    $senderColorChat = isset($storedStylesFront['senderColorChat']) ? $storedStylesFront['senderColorChat']->value : $secondaryColor;
    $senderBackgroundColorChat = isset($storedStylesFront['senderBackgroundColorChat']) ? $storedStylesFront['senderBackgroundColorChat']->value : $primaryColor;
    $senderBorderColorChat = isset($storedStylesFront['senderBorderColorChat']) ? $storedStylesFront['senderBorderColorChat']->value : $primaryColor;
    $senderMailColorChat = isset($storedStylesFront['senderMailColorChat']) ? $storedStylesFront['senderMailColorChat']->value : $secondaryColor;
    $senderDateColorChat = isset($storedStylesFront['senderDateColorChat']) ? $storedStylesFront['senderDateColorChat']->value : $secondaryColor;
    $senderBorderRadiusChat = isset($storedStylesFront['senderBorderRadiusChat']) ? $storedStylesFront['senderBorderRadiusChat']->value.'px' : $buttonRadius;
    $recipientColorChat = isset($storedStylesFront['recipientColorChat']) ? $storedStylesFront['recipientColorChat']->value : $secondaryColor;
    $recipientBackgroundColorChat = isset($storedStylesFront['recipientBackgroundColorChat']) ? $storedStylesFront['recipientBackgroundColorChat']->value : '#868d97';
    $recipientBorderColorChat = isset($storedStylesFront['recipientBorderColorChat']) ? $storedStylesFront['recipientBorderColorChat']->value : '#868d97';
    $recipientBorderRadiusChat = isset($storedStylesFront['recipientBorderRadiusChat']) ? $storedStylesFront['recipientBorderRadiusChat']->value.'px' : $buttonRadius;
    $recipientDateColorChat = isset($storedStylesFront['recipientDateColorChat']) ? $storedStylesFront['recipientDateColorChat']->value : $secondaryColor;
    $buttonColorChat = isset($storedStylesFront['buttonColorChat']) ? $storedStylesFront['buttonColorChat']->value : $primaryColor;
    $buttonBackgroundColorChat = isset($storedStylesFront['buttonBackgroundColorChat']) ? $storedStylesFront['buttonBackgroundColorChat']->value : $secondaryColor;
    $buttonBorderColorChat = isset($storedStylesFront['buttonBorderColorChat']) ? $storedStylesFront['buttonBorderColorChat']->value : $primaryColor;
    $buttonBackgroundHoverColorChat = isset($storedStylesFront['buttonBackgroundHoverColorChat']) ? $storedStylesFront['buttonBackgroundHoverColorChat']->value : $primaryColor;
    $buttonColorHoverChat = isset($storedStylesFront['buttonColorHoverChat']) ? $storedStylesFront['buttonColorHoverChat']->value : $secondaryColor;
    $buttonborderHoverColorChat = isset($storedStylesFront['buttonborderHoverColorChat']) ? $storedStylesFront['buttonborderHoverColorChat']->value : $secondaryColor;
    $buttonRadiusChat = isset($storedStylesFront['buttonRadiusChat']) ? $storedStylesFront['buttonRadiusChat']->value.'px' : $buttonRadius;
    $senderFontSizeChat = isset($storedStylesFront['senderFontSizeChat']) ? $storedStylesFront['senderFontSizeChat']->value.'px' : '14px';
    $senderDateFontSizeChat = isset($storedStylesFront['senderDateFontSizeChat']) ? $storedStylesFront['senderDateFontSizeChat']->value.'px' : '14px';
    $senderMailFontSizeChat = isset($storedStylesFront['senderMailFontSizeChat']) ? $storedStylesFront['senderMailFontSizeChat']->value.'px' : '14px';
    $recipientFontSizeChat = isset($storedStylesFront['recipientFontSizeChat']) ? $storedStylesFront['recipientFontSizeChat']->value.'px' : '14px';
    $recipientDateFontSizeChat = isset($storedStylesFront['recipientDateFontSizeChat']) ? $storedStylesFront['recipientDateFontSizeChat']->value.'px' : '14px';
    $fontSizeButtonChat = isset($storedStylesFront['fontSizeButtonChat']) ? $storedStylesFront['fontSizeButtonChat']->value.'px' : '14px';

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
@include('extranet::front.partials.styles.total-box')
@include('extranet::front.partials.styles.total-box-price')
@include('extranet::front.partials.styles.form')
@include('extranet::front.partials.styles.form-template')
@include('extranet::front.partials.styles.stepper')
@include('extranet::front.partials.styles.document-table')
@include('extranet::front.partials.styles.missing-documents')
@include('extranet::front.partials.styles.chat')
@include('extranet::front.partials.styles.action-button')
@include('extranet::front.partials.styles.image-text-link')
@include('extranet::front.partials.styles.image-text-title-documents')
@include('extranet::front.partials.styles.banner-horizontal')
@include('extranet::front.partials.styles.sidebar')
@include('extranet::front.partials.styles.range-field')
@include('extranet::front.partials.styles.tabs')
@include('extranet::front.partials.styles.simple-button')
@include('extranet::front.partials.styles.action-list')

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

<script>
  var STYLES = {
    elementForm: {
      borderColorInput: '{{$borderColorInput}}',
      borderRadiusInput: '{{$borderRadiusInput}}',
      hoverColorInput: '{{$hoverColorInput}}',
      iconFontSizeElement: '{{$iconFontSizeElement}}',
      iconColorElement: '{{$iconColorElement}}',
      errorColor : '{{$errorColor}}',
      inputColor: '{{$inputColor}}'
    },
    sidebarMenu: {
      sidebarWidth: '{{$sidebarWidth}}'
    }
  };
</script>






