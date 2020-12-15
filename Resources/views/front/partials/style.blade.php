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
    $sidebarIconFontSize = isset($storedStylesFront['frontSidebarIconFontSize']) ? $storedStylesFront['frontSidebarIconFontSize']->value.'px' : '14px';

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
    $textBtnAddFileForm = isset($storedStylesFront['textBtnAddFileForm']) ? $storedStylesFront['textBtnAddFileForm']->value : 'télécharger le fichier';
    $textBtnAddValueForm = isset($storedStylesFront['textBtnAddValueForm']) ? $storedStylesFront['textBtnAddValueForm']->value : 'Nouveau souscripteur';

    $backgroundColorTooltipDescForm = isset($storedStylesFront['backgroundColorTooltipDescForm']) ? $storedStylesFront['backgroundColorTooltipDescForm']->value : $primaryColor;
    $colorTooltipDescForm = isset($storedStylesFront['colorTooltipDescForm']) ? $storedStylesFront['colorTooltipDescForm']->value : '#fff';
    $fontSizeTooltipDescForm = isset($storedStylesFront['fontSizeTooltipDescForm']) ? $storedStylesFront['fontSizeTooltipDescForm']->value.'px' : '16px';

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

    //REDUCED
    $fontSizeReduced = isset($storedStylesFront['fontSizeReduced']) ? $storedStylesFront['fontSizeReduced']->value.'px' : '14px';
    $paddingBottomTopReduced = isset($storedStylesFront['paddingBottomTopReduced']) ? $storedStylesFront['paddingBottomTopReduced']->value.'px' : '10px';
    $paddingBottomTopReducedValues = isset($storedStylesFront['paddingBottomTopReducedValues']) ? $storedStylesFront['paddingBottomTopReducedValues']->value.'px' : '8px';
    $paddingRightLeftReduced = isset($storedStylesFront['paddingRightLeftReduced']) ? $storedStylesFront['paddingRightLeftReduced']->value.'px' : '15px';
    $lineHeightReduced = isset($storedStylesFront['lineHeightReduced']) ? $storedStylesFront['lineHeightReduced']->value.'px' : '20px';
    $marginBetweenReduced = isset($storedStylesFront['marginBetweenReduced']) ? $storedStylesFront['marginBetweenReduced']->value.'px' : '0px';

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
    //CLASS 01
    $backgroundColorActionButton = isset($storedStylesFront['backgroundColorActionButton']) ? $storedStylesFront['backgroundColorActionButton']->value : '#fff';
    $backgroundHoverColorActionButton = isset($storedStylesFront['backgroundHoverColorActionButton']) ? $storedStylesFront['backgroundHoverColorActionButton']->value : '#fff';
    $iconColorActionButton = isset($storedStylesFront['iconColorActionButton']) ? $storedStylesFront['iconColorActionButton']->value : $secondaryColor;
    $iconHoverColorActionButton = isset($storedStylesFront['iconHoverColorActionButton']) ? $storedStylesFront['iconHoverColorActionButton']->value : $primaryColor;
    $titleColorActionButton = isset($storedStylesFront['titleColorActionButton']) ? $storedStylesFront['titleColorActionButton']->value : $primaryColor;
    $titleHoverColorActionButton = isset($storedStylesFront['titleHoverColorActionButton']) ? $storedStylesFront['titleHoverColorActionButton']->value : $secondaryColor;
    $borderTopLeftActionButton = isset($storedStylesFront['borderTopLeftActionButton']) ? $storedStylesFront['borderTopLeftActionButton']->value.'px' : '0px';
    $borderTopRightActionButton = isset($storedStylesFront['borderTopRightActionButton']) ? $storedStylesFront['borderTopRightActionButton']->value.'px' : '0px';
    $borderBottomRightActionButton = isset($storedStylesFront['borderBottomRightActionButton']) ? $storedStylesFront['borderBottomRightActionButton']->value.'px' : '0px';
    $borderBottomLeftActionButton = isset($storedStylesFront['borderBottomLeftActionButton']) ? $storedStylesFront['borderBottomLeftActionButton']->value.'px' : '0px';
    $fontSizeTitleActionButton = isset($storedStylesFront['fontSizeTitleActionButton']) ? $storedStylesFront['fontSizeTitleActionButton']->value.'px' : '18px';
    $boxShadowOpacityActionButton = isset($storedStylesFront['boxShadowOpacityActionButton']) ? $storedStylesFront['boxShadowOpacityActionButton']->value : '15';
    $numberColorActionButton = isset($storedStylesFront['numberColorActionButton']) ? $storedStylesFront['numberColorActionButton']->value : $primaryColor;
    $numberHoverColorActionButton = isset($storedStylesFront['numberHoverColorActionButton']) ? $storedStylesFront['numberHoverColorActionButton']->value : $secondaryColor;
    $fontSizeIconActionButton = isset($storedStylesFront['fontSizeIconActionButton']) ? $storedStylesFront['fontSizeIconActionButton']->value.'px' : '14px';

    //CLASS 02
    $backgroundColorActionButton2 = isset($storedStylesFront['backgroundColorActionButton2']) ? $storedStylesFront['backgroundColorActionButton2']->value : $secondaryColor;
    $backgroundHoverColorActionButton2 = isset($storedStylesFront['backgroundHoverColorActionButton2']) ? $storedStylesFront['backgroundHoverColorActionButton2']->value : '#fff';
    $iconColorActionButton2 = isset($storedStylesFront['iconColorActionButton2']) ? $storedStylesFront['iconColorActionButton2']->value : '#fff';
    $iconHoverColorActionButton2 = isset($storedStylesFront['iconHoverColorActionButton2']) ? $storedStylesFront['iconHoverColorActionButton2']->value : $primaryColor;
    $titleColorActionButton2 = isset($storedStylesFront['titleColorActionButton2']) ? $storedStylesFront['titleColorActionButton2']->value : '#fff';
    $titleHoverColorActionButton2 = isset($storedStylesFront['titleHoverColorActionButton2']) ? $storedStylesFront['titleHoverColorActionButton2']->value : $primaryColor;
    $borderTopLeftActionButton2 = isset($storedStylesFront['borderTopLeftActionButton2']) ? $storedStylesFront['borderTopLeftActionButton2']->value.'px' : '0px';
    $borderTopRightActionButton2 = isset($storedStylesFront['borderTopRightActionButton2']) ? $storedStylesFront['borderTopRightActionButton2']->value.'px' : '0px';
    $borderBottomRightActionButton2 = isset($storedStylesFront['borderBottomRightActionButton2']) ? $storedStylesFront['borderBottomRightActionButton2']->value.'px' : '0px';
    $borderBottomLeftActionButton2 = isset($storedStylesFront['borderBottomLeftActionButton2']) ? $storedStylesFront['borderBottomLeftActionButton2']->value.'px' : '0px';
    $fontSizeTitleActionButton2 = isset($storedStylesFront['fontSizeTitleActionButton2']) ? $storedStylesFront['fontSizeTitleActionButton2']->value.'px' : '18px';
    $boxShadowOpacityActionButton2 = isset($storedStylesFront['boxShadowOpacityActionButton2']) ? $storedStylesFront['boxShadowOpacityActionButton2']->value : '15';
    $numberColorActionButton2 = isset($storedStylesFront['numberColorActionButton2']) ? $storedStylesFront['numberColorActionButton2']->value : '#fff';
    $numberHoverColorActionButton2 = isset($storedStylesFront['numberHoverColorActionButton2']) ? $storedStylesFront['numberHoverColorActionButton2']->value : $secondaryColor;
    $fontSizeIconActionButton2 = isset($storedStylesFront['fontSizeIconActionButton2']) ? $storedStylesFront['fontSizeIconActionButton2']->value.'px' : '14px';

    //CLASS 03
    $backgroundColorActionButton3 = isset($storedStylesFront['backgroundColorActionButton3']) ? $storedStylesFront['backgroundColorActionButton3']->value : $primaryColor;
    $backgroundHoverColorActionButton3 = isset($storedStylesFront['backgroundHoverColorActionButton3']) ? $storedStylesFront['backgroundHoverColorActionButton3']->value : '#fff';
    $iconColorActionButton3 = isset($storedStylesFront['iconColorActionButton3']) ? $storedStylesFront['iconColorActionButton3']->value : $secondaryColor;
    $iconHoverColorActionButton3 = isset($storedStylesFront['iconHoverColorActionButton3']) ? $storedStylesFront['iconHoverColorActionButton3']->value : $primaryColor;
    $titleColorActionButton3 = isset($storedStylesFront['titleColorActionButton3']) ? $storedStylesFront['titleColorActionButton3']->value : $secondaryColor;
    $titleHoverColorActionButton3 = isset($storedStylesFront['titleHoverColorActionButton3']) ? $storedStylesFront['titleHoverColorActionButton3']->value : $primaryColor;
    $borderTopLeftActionButton3 = isset($storedStylesFront['borderTopLeftActionButton3']) ? $storedStylesFront['borderTopLeftActionButton3']->value.'px' : '0px';
    $borderTopRightActionButton3 = isset($storedStylesFront['borderTopRightActionButton3']) ? $storedStylesFront['borderTopRightActionButton3']->value.'px' : '0px';
    $borderBottomRightActionButton3 = isset($storedStylesFront['borderBottomRightActionButton3']) ? $storedStylesFront['borderBottomRightActionButton3']->value.'px' : '0px';
    $borderBottomLeftActionButton3 = isset($storedStylesFront['borderBottomLeftActionButton3']) ? $storedStylesFront['borderBottomLeftActionButton3']->value.'px' : '0px';
    $fontSizeTitleActionButton3 = isset($storedStylesFront['fontSizeTitleActionButton3']) ? $storedStylesFront['fontSizeTitleActionButton3']->value.'px' : '18px';
    $boxShadowOpacityActionButton3 = isset($storedStylesFront['boxShadowOpacityActionButton3']) ? $storedStylesFront['boxShadowOpacityActionButton3']->value : '15';
    $numberColorActionButton3 = isset($storedStylesFront['numberColorActionButton3']) ? $storedStylesFront['numberColorActionButton3']->value : $primaryColor;
    $numberHoverColorActionButton3 = isset($storedStylesFront['numberHoverColorActionButton3']) ? $storedStylesFront['numberHoverColorActionButton3']->value : $secondaryColor;
    $fontSizeIconActionButton3 = isset($storedStylesFront['fontSizeIconActionButton3']) ? $storedStylesFront['fontSizeIconActionButton3']->value.'px' : '14px';

    
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

    //TABS LIST
    $fontColorTab = isset($storedStylesFront['fontColorTab']) ? $storedStylesFront['fontColorTab']->value : $secondaryColor;
    $backgroundColorTab = isset($storedStylesFront['backgroundColorTab']) ? $storedStylesFront['backgroundColorTab']->value : $primaryColor;
    $fontColorActiveTab = isset($storedStylesFront['fontColorActiveTab']) ? $storedStylesFront['fontColorActiveTab']->value : $secondaryColor;
    $backgroundColorActiveTab = isset($storedStylesFront['backgroundColorActiveTab']) ? $storedStylesFront['backgroundColorActiveTab']->value : '#fff';
    $fontSizeTab = isset($storedStylesFront['fontSizeTab']) ? $storedStylesFront['fontSizeTab']->value.'px' : '14px';

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
    $fontSizeIconTable = isset($storedStylesFront['fontSizeIconTable']) ? $storedStylesFront['fontSizeIconTable']->value.'px' : '14px';

    //ELEMENT FILE
    $backgroundColorTooltipDescFile = isset($storedStylesFront['backgroundColorTooltipDescFile']) ? $storedStylesFront['backgroundColorTooltipDescFile']->value : $primaryColor;
    $colorTooltipDescFile = isset($storedStylesFront['colorTooltipDescFile']) ? $storedStylesFront['colorTooltipDescFile']->value : '#fff';
    $fontSizeTooltipDescFile = isset($storedStylesFront['fontSizeTooltipDescFile']) ? $storedStylesFront['fontSizeTooltipDescFile']->value : '16px';

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

    //MESSAGE-BOX
    // info
    $colorInfoMessageBox = isset($storedStylesFront['colorInfoMessageBox']) ? $storedStylesFront['colorInfoMessageBox']->value : '#0c5460';
    $backgroundColorInfoMessageBox = isset($storedStylesFront['backgroundColorInfoMessageBox']) ? $storedStylesFront['backgroundColorInfoMessageBox']->value : '#d1ecf1';
    $borderColorInfoMessageBox = isset($storedStylesFront['borderColorInfoMessageBox']) ? $storedStylesFront['borderColorInfoMessageBox']->value : '#bee5eb';
    $fontSizeInfoMessageBox = isset($storedStylesFront['fontSizeInfoMessageBox']) ? $storedStylesFront['fontSizeInfoMessageBox']->value.'px' : '16px';
    $paddingInfoMessageBox = isset($storedStylesFront['paddingInfoMessageBox']) ? $storedStylesFront['paddingInfoMessageBox']->value.'px' : '12px 20px';
    $fontSizeIconInfoMessageBox = isset($storedStylesFront['fontSizeIconInfoMessageBox']) ? $storedStylesFront['fontSizeIconInfoMessageBox']->value : '45';
    $iconInfoMessageBox = isset($storedStylesFront['iconInfoMessageBox']) ? $storedStylesFront['iconInfoMessageBox']->value : '';
    $fontSizeIconRemoveInfoMessageBox = isset($storedStylesFront['fontSizeIconRemoveInfoMessageBox']) ? $storedStylesFront['fontSizeIconRemoveInfoMessageBox']->value.'px' : '25px';

    // succes
    $colorSuccessMessageBox = isset($storedStylesFront['colorSuccessMessageBox']) ? $storedStylesFront['colorSuccessMessageBox']->value : '#155724';
    $backgroundColorSuccessMessageBox = isset($storedStylesFront['backgroundColorSuccessMessageBox']) ? $storedStylesFront['backgroundColorSuccessMessageBox']->value : '#d4edda';
    $borderColorSuccessMessageBox = isset($storedStylesFront['borderColorSuccessMessageBox']) ? $storedStylesFront['borderColorSuccessMessageBox']->value : '#c3e6cb';
    $fontSizeSuccessMessageBox = isset($storedStylesFront['fontSizeSuccessMessageBox']) ? $storedStylesFront['fontSizeSuccessMessageBox']->value.'px' : '16px';
    $paddingSuccessMessageBox = isset($storedStylesFront['paddingSuccessMessageBox']) ? $storedStylesFront['paddingSuccessMessageBox']->value.'px' : '12px 20px';
    $fontSizeIconSuccessMessageBox = isset($storedStylesFront['fontSizeIconSuccessMessageBox']) ? $storedStylesFront['fontSizeIconSuccessMessageBox']->value : '45';
    $iconSuccessMessageBox = isset($storedStylesFront['iconSuccessMessageBox']) ? $storedStylesFront['iconSuccessMessageBox']->value : '';
    $fontSizeIconRemoveSuccessMessageBox = isset($storedStylesFront['fontSizeIconRemoveSuccessMessageBox']) ? $storedStylesFront['fontSizeIconRemoveSuccessMessageBox']->value.'px' : '25px';

    // error
    $colorErrorMessageBox = isset($storedStylesFront['colorErrorMessageBox']) ? $storedStylesFront['colorErrorMessageBox']->value : '#721c24';
    $backgroundColorErrorMessageBox = isset($storedStylesFront['backgroundColorErrorMessageBox']) ? $storedStylesFront['backgroundColorErrorMessageBox']->value : '#f8d7da';
    $borderColorErrorMessageBox = isset($storedStylesFront['borderColorErrorMessageBox']) ? $storedStylesFront['borderColorErrorMessageBox']->value : '#f5c6cb';
    $fontSizeErrorMessageBox = isset($storedStylesFront['fontSizeErrorMessageBox']) ? $storedStylesFront['fontSizeErrorMessageBox']->value.'px' : '16px';
    $paddingErrorMessageBox = isset($storedStylesFront['paddingErrorMessageBox']) ? $storedStylesFront['paddingErrorMessageBox']->value.'px' : '12px 20px';
    $fontSizeIconErrorMessageBox = isset($storedStylesFront['fontSizeIconErrorMessageBox']) ? $storedStylesFront['fontSizeIconErrorMessageBox']->value : '45';
    $iconErrorMessageBox = isset($storedStylesFront['iconErrorMessageBox']) ? $storedStylesFront['iconErrorMessageBox']->value : '';
    $fontSizeIconRemoveErrorMessageBox = isset($storedStylesFront['fontSizeIconRemoveErrorMessageBox']) ? $storedStylesFront['fontSizeIconRemoveErrorMessageBox']->value.'px' : '25px';

    // warning
    $colorWarningMessageBox = isset($storedStylesFront['colorWarningMessageBox']) ? $storedStylesFront['colorWarningMessageBox']->value : '#856404';
    $backgroundColorWarningMessageBox = isset($storedStylesFront['backgroundColorWarningMessageBox']) ? $storedStylesFront['backgroundColorWarningMessageBox']->value : '#fff3cd';
    $borderColorWarningMessageBox = isset($storedStylesFront['borderColorWarningMessageBox']) ? $storedStylesFront['borderColorWarningMessageBox']->value : '#ffeeba';
    $fontSizeWarningMessageBox = isset($storedStylesFront['fontSizeWarningMessageBox']) ? $storedStylesFront['fontSizeWarningMessageBox']->value.'px' : '16px';
    $paddingWarningMessageBox = isset($storedStylesFront['paddingWarningMessageBox']) ? $storedStylesFront['paddingWarningMessageBox']->value.'px' : '12px 20px';
    $fontSizeIconWarningMessageBox = isset($storedStylesFront['fontSizeIconWarningMessageBox']) ? $storedStylesFront['fontSizeIconWarningMessageBox']->value : '45';
    $iconWarningMessageBox = isset($storedStylesFront['iconWarningMessageBox']) ? $storedStylesFront['iconWarningMessageBox']->value : '';
    $fontSizeIconRemoveWarningMessageBox = isset($storedStylesFront['fontSizeIconRemoveWarningMessageBox']) ? $storedStylesFront['fontSizeIconRemoveWarningMessageBox']->value.'px' : '25px';

    // FAQS
    $fontSizeTitleFaqs = isset($storedStylesFront['fontSizeTitleFaqs']) ? $storedStylesFront['fontSizeTitleFaqs']->value.'px' : '14px';
    $colorTitleFaqs = isset($storedStylesFront['colorTitleFaqs']) ? $storedStylesFront['colorTitleFaqs']->value : $secondaryColor;
    $backgroundColorTitleFaqs = isset($storedStylesFront['backgroundColorTitleFaqs']) ? $storedStylesFront['backgroundColorTitleFaqs']->value : '#fff';
    $colorDescFaqs = isset($storedStylesFront['colorDescFaqs']) ? $storedStylesFront['colorDescFaqs']->value : $secondaryColor;
    $backgroundColorDescFaqs = isset($storedStylesFront['backgroundColorDescFaqs']) ? $storedStylesFront['backgroundColorDescFaqs']->value : '#fff';
    $borderRadiusContainerFaqs = isset($storedStylesFront['borderRadiusContainerFaqs']) ? $storedStylesFront['borderRadiusContainerFaqs']->value.'px' : '20px';
    $colorIconFaqs = isset($storedStylesFront['colorIconFaqs']) ? $storedStylesFront['colorIconFaqs']->value : $secondaryColor;
    $fontSizeIconFaqs = isset($storedStylesFront['fontSizeIconFaqs']) ? $storedStylesFront['fontSizeIconFaqs']->value.'px' : '14px';

    //FORM PER ÉTAPES -> STEPPER
    $stepperCompletedBackgroundColor = isset($storedStylesFront['stepperCompletedBackgroundColor']) ? $storedStylesFront['stepperCompletedBackgroundColor']->value : '#C9D200';
    $colorCompletedLabelStepper = isset($storedStylesFront['colorCompletedLabelStepper']) ? $storedStylesFront['colorCompletedLabelStepper']->value : '#A8A8A8';
    $stepperCompletedColor = isset($storedStylesFront['stepperCompletedColor']) ? $storedStylesFront['stepperCompletedColor']->value : '#fff';

    $stepperActiveBackgroundColor = isset($storedStylesFront['stepperActiveBackgroundColor']) ? $storedStylesFront['stepperActiveBackgroundColor']->value : '#65C4DB';
    $stepperActiveColor = isset($storedStylesFront['stepperActiveColor']) ? $storedStylesFront['stepperActiveColor']->value : '#fff';
    $colorActiveLabelStepper = isset($storedStylesFront['colorActiveLabelStepper']) ? $storedStylesFront['colorActiveLabelStepper']->value : '#65C4DB';

    $stepperOuterBackgroundColor = isset($storedStylesFront['stepperOuterBackgroundColor']) ? $storedStylesFront['stepperOuterBackgroundColor']->value : '#E6E6E6';
    $stepperOuterColor = isset($storedStylesFront['stepperOuterColor']) ? $storedStylesFront['stepperOuterColor']->value : '#E6E6E6';
    $colorOuterLabelStepper = isset($storedStylesFront['colorOuterLabelStepper']) ? $storedStylesFront['colorOuterLabelStepper']->value : '#A8A8A8';

    $fontSizeLabelStepper = isset($storedStylesFront['fontSizeLabelStepper']) ? $storedStylesFront['fontSizeLabelStepper']->value.'px' : '14px';
    $distanceBetweenLabelStepper = isset($storedStylesFront['distanceBetweenLabelStepper']) ? $storedStylesFront['distanceBetweenLabelStepper']->value.'px' : '25px';
    $titleBackgroundColorFormStage = isset($storedStylesFront['titleBackgroundColorFormStage']) ? $storedStylesFront['titleBackgroundColorFormStage']->value : '#65c4db';
    $titleColorFormStage = isset($storedStylesFront['titleColorFormStage']) ? $storedStylesFront['titleColorFormStage']->value : '#fff';
    $titleLineHeightFormStage = isset($storedStylesFront['titleLineHeightFormStage']) ? $storedStylesFront['titleLineHeightFormStage']->value.'px' : '25px';
    $titlePaddingFormStage = isset($storedStylesFront['titlePaddingFormStage']) ? $storedStylesFront['titlePaddingFormStage']->value.'px' : '15px';
    $titleFontSizeFormStage = isset($storedStylesFront['titleFontSizeFormStage']) ? $storedStylesFront['titleFontSizeFormStage']->value.'px' : '24px';

    $colorPrevBtnStepper = isset($storedStylesFront['colorPrevBtnStepper']) ? $storedStylesFront['colorPrevBtnStepper']->value : '#A8A8A8';
    $colorHoverPrevBtnStepper = isset($storedStylesFront['colorHoverPrevBtnStepper']) ? $storedStylesFront['colorHoverPrevBtnStepper']->value : '#A8A8A8';
    $backgroundColorPrevBtnStepper = isset($storedStylesFront['backgroundColorPrevBtnStepper']) ? $storedStylesFront['backgroundColorPrevBtnStepper']->value : 'transparent';
    $backgroundHoverColorPrevBtnStepper = isset($storedStylesFront['backgroundHoverColorPrevBtnStepper']) ? $storedStylesFront['backgroundHoverColorPrevBtnStepper']->value : 'transparent';
    $borderColorPrevBtnStepper = isset($storedStylesFront['borderColorPrevBtnStepper']) ? $storedStylesFront['borderColorPrevBtnStepper']->value : '#A8A8A8';
    $borderHoverColorPrevBtnStepper = isset($storedStylesFront['borderHoverColorPrevBtnStepper']) ? $storedStylesFront['borderHoverColorPrevBtnStepper']->value : '#A8A8A8';
    $borderRadiusPrevBtnStepper = isset($storedStylesFront['borderRadiusPrevBtnStepper']) ? $storedStylesFront['borderRadiusPrevBtnStepper']->value.'px' : '24px';
    $fontSizePrevBtnStepper = isset($storedStylesFront['fontSizePrevBtnStepper']) ? $storedStylesFront['fontSizePrevBtnStepper']->value.'px' : '14px';
    $iconPrevBtnStepper = isset($storedStylesFront['iconPrevBtnStepper']) ? $storedStylesFront['iconPrevBtnStepper']->value : '';

    $colorNextBtnStepper = isset($storedStylesFront['colorNextBtnStepper']) ? $storedStylesFront['colorNextBtnStepper']->value : '#fff';
    $colorHoverNextBtnStepper = isset($storedStylesFront['colorHoverNextBtnStepper']) ? $storedStylesFront['colorHoverNextBtnStepper']->value : '#fff';
    $backgroundColorNextBtnStepper = isset($storedStylesFront['backgroundColorNextBtnStepper']) ? $storedStylesFront['backgroundColorNextBtnStepper']->value : '#004161';
    $backgroundHoverColorNextBtnStepper = isset($storedStylesFront['backgroundHoverColorNextBtnStepper']) ? $storedStylesFront['backgroundHoverColorNextBtnStepper']->value : '#004161D9';
    $borderColorNextBtnStepper = isset($storedStylesFront['borderColorNextBtnStepper']) ? $storedStylesFront['borderColorNextBtnStepper']->value : '#004161';
    $borderHoverColorNextBtnStepper = isset($storedStylesFront['borderHoverColorNextBtnStepper']) ? $storedStylesFront['borderHoverColorNextBtnStepper']->value : '#004161D9';
    $borderRadiusNextBtnStepper = isset($storedStylesFront['borderRadiusNextBtnStepper']) ? $storedStylesFront['borderRadiusNextBtnStepper']->value.'px' : '24px';
    $fontSizeNextBtnStepper = isset($storedStylesFront['fontSizeNextBtnStepper']) ? $storedStylesFront['fontSizeNextBtnStepper']->value.'px' : '14px';
    $iconPrevNextStepper = isset($storedStylesFront['iconPrevNextStepper']) ? $storedStylesFront['iconPrevNextStepper']->value : '';

    $colorSubmitBtnStepper = isset($storedStylesFront['colorSubmitBtnStepper']) ? $storedStylesFront['colorSubmitBtnStepper']->value : '#fff';
    $colorHoverSubmitBtnStepper = isset($storedStylesFront['colorHoverSubmitBtnStepper']) ? $storedStylesFront['colorHoverSubmitBtnStepper']->value : '#fff';
    $backgroundColorSubmitBtnStepper = isset($storedStylesFront['backgroundColorSubmitBtnStepper']) ? $storedStylesFront['backgroundColorSubmitBtnStepper']->value : '#65C4DB';
    $backgroundHoverColorSubmitBtnStepper = isset($storedStylesFront['backgroundHoverColorSubmitBtnStepper']) ? $storedStylesFront['backgroundHoverColorSubmitBtnStepper']->value : '#65C4DBD9';
    $borderColorSubmitBtnStepper = isset($storedStylesFront['borderColorSubmitBtnStepper']) ? $storedStylesFront['borderColorSubmitBtnStepper']->value : '#65C4DB';
    $borderHoverColorSubmitBtnStepper = isset($storedStylesFront['borderHoverColorSubmitBtnStepper']) ? $storedStylesFront['borderHoverColorSubmitBtnStepper']->value : '#65C4DBD9';
    $borderRadiusSubmitBtnStepper = isset($storedStylesFront['borderRadiusSubmitBtnStepper']) ? $storedStylesFront['borderRadiusSubmitBtnStepper']->value.'px' : '24px';
    $fontSizeSubmitBtnStepper = isset($storedStylesFront['fontSizeSubmitBtnStepper']) ? $storedStylesFront['fontSizeSubmitBtnStepper']->value.'px' : '14px';
    $iconSubmitStepper = isset($storedStylesFront['iconSubmitStepper']) ? $storedStylesFront['iconSubmitStepper']->value : '';

    //Contact info box
    $backgroundColorContactInfo = isset($storedStylesFront['backgroundColorContactInfo']) ? $storedStylesFront['backgroundColorContactInfo']->value : '#fff';
    $titleColorContactInfo = isset($storedStylesFront['titleColorContactInfo']) ? $storedStylesFront['titleColorContactInfo']->value : '#C9D200';
    $titleFontSizeContactInfo = isset($storedStylesFront['titleFontSizeContactInfo']) ? $storedStylesFront['titleFontSizeContactInfo']->value.'px' : '18px';
    $colorPhoneMailContactInfo = isset($storedStylesFront['colorPhoneMailContactInfo']) ? $storedStylesFront['colorPhoneMailContactInfo']->value : '#124261';
    $fontSizePhoneMailContactInfo = isset($storedStylesFront['fontSizePhoneMailContactInfo']) ? $storedStylesFront['fontSizePhoneMailContactInfo']->value.'px' : '16px';
    $borderRadiusTopRightContactInfo = isset($storedStylesFront['borderRadiusTopRightContactInfo']) ? $storedStylesFront['borderRadiusTopRightContactInfo']->value.'px' : '24px';
    $borderRadiusTopLeftContactInfo = isset($storedStylesFront['borderRadiusTopLeftContactInfo']) ? $storedStylesFront['borderRadiusTopLeftContactInfo']->value.'px' : '0px';
    $borderRadiusBottomLeftContactInfo = isset($storedStylesFront['borderRadiusBottomLeftContactInfo']) ? $storedStylesFront['borderRadiusBottomLeftContactInfo']->value.'px' : '24px';
    $borderRadiusBottomRightContactInfo = isset($storedStylesFront['borderRadiusBottomRightContactInfo']) ? $storedStylesFront['borderRadiusBottomRightContactInfo']->value.'px' : '0px';
    
    // Timeline
    $widthStageTimeline = isset($storedStylesFront['widthStageTimeline']) ? $storedStylesFront['widthStageTimeline']->value.'px' : '35px';
    $backgroundColorActiveTimeline = isset($storedStylesFront['backgroundColorActiveTimeline']) ? $storedStylesFront['backgroundColorActiveTimeline']->value : '#fff';
    $borderColorActiveTimeline = isset($storedStylesFront['borderColorActiveTimeline']) ? $storedStylesFront['borderColorActiveTimeline']->value : '#e7eaef';
    $backgroundColorOuterTimeline = isset($storedStylesFront['backgroundColorOuterTimeline']) ? $storedStylesFront['backgroundColorOuterTimeline']->value : '#e7eaef';
    $borderColorOuterTimeline = isset($storedStylesFront['borderColorOuterTimeline']) ? $storedStylesFront['borderColorOuterTimeline']->value : '#e7eaef';
    $colorDateTimeline = isset($storedStylesFront['colorDateTimeline']) ? $storedStylesFront['colorDateTimeline']->value : '#c8ccd1';
    $colorTextTimeline = isset($storedStylesFront['colorTextTimeline']) ? $storedStylesFront['colorTextTimeline']->value : '#004161';
    $fontSizeDateTimeline = isset($storedStylesFront['fontSizeDateTimeline']) ? $storedStylesFront['fontSizeDateTimeline']->value.'px' : '14px';
    $fontSizeTextTimeline = isset($storedStylesFront['fontSizeTextTimeline']) ? $storedStylesFront['fontSizeTextTimeline']->value.'px' : '16px';
    $borderColorTimeline = isset($storedStylesFront['borderColorTimeline']) ? $storedStylesFront['borderColorTimeline']->value : 'e7eaef';

    // Modal settings
    $backgroundColorHeaderModal = isset($storedStylesFront['backgroundColorHeaderModal']) ? $storedStylesFront['backgroundColorHeaderModal']->value : '#fff';
    $colorHeaderModal = isset($storedStylesFront['colorHeaderModal']) ? $storedStylesFront['colorHeaderModal']->value : '#ccc';
    $borderColorHeaderModal = isset($storedStylesFront['borderColorHeaderModal']) ? $storedStylesFront['borderColorHeaderModal']->value : '#ccc';
    $backgroundColorContentModal = isset($storedStylesFront['backgroundColorContentModal']) ? $storedStylesFront['backgroundColorContentModal']->value : '#fff';
    $backgroundColorbackgroundModal = isset($storedStylesFront['backgroundColorbackgroundModal']) ? $storedStylesFront['backgroundColorbackgroundModal']->value : '#000';
    $borderRadiusHeaderModal = isset($storedStylesFront['borderRadiusHeaderModal']) ? $storedStylesFront['borderRadiusHeaderModal']->value.'px' : '12px';
    $fontSizeHeaderModal = isset($storedStylesFront['fontSizeHeaderModal']) ? $storedStylesFront['fontSizeHeaderModal']->value.'px' : '20px';
    $borderRadiusContentModal = isset($storedStylesFront['borderRadiusContentModal']) ? $storedStylesFront['borderRadiusContentModal']->value.'px' : '12px';
    $opacityModal = isset($storedStylesFront['opacityModal']) ? $storedStylesFront['opacityModal']->value : '50';
    $backgroundColorButtonModal = isset($storedStylesFront['backgroundColorButtonModal']) ? $storedStylesFront['backgroundColorButtonModal']->value : $primaryColor;
    $borderColorButtonModal = isset($storedStylesFront['borderColorButtonModal']) ? $storedStylesFront['borderColorButtonModal']->value : $primaryColor;
    $colorButtonModal = isset($storedStylesFront['colorButtonModal']) ? $storedStylesFront['colorButtonModal']->value : '#fff';
    $boxShadowContentModal = isset($storedStylesFront['boxShadowContentModal']) ? $storedStylesFront['boxShadowContentModal']->value : '50';
    $paddingHeaderModal = isset($storedStylesFront['paddingHeaderModal']) ? $storedStylesFront['paddingHeaderModal']->value.'px' : '15px';
    $backgroundColorFooterButtonModal = isset($storedStylesFront['backgroundColorFooterButtonModal']) ? $storedStylesFront['backgroundColorFooterButtonModal']->value : '#fff';
    $paddingContentFormWrapperModal = isset($storedStylesFront['paddingContentFormWrapperModal']) ? $storedStylesFront['paddingContentFormWrapperModal']->value.'px' : '30px';
    $marginContentFormWrapperModal = isset($storedStylesFront['marginContentFormWrapperModal']) ? $storedStylesFront['marginContentFormWrapperModal']->value.'px' : '0px';
    $paddingContainerFormModal = isset($storedStylesFront['paddingContainerFormModal']) ? $storedStylesFront['paddingContainerFormModal']->value.'px' : '15px';
    $minHeightButtonModal = isset($storedStylesFront['minHeightButtonModal']) ? $storedStylesFront['minHeightButtonModal']->value.'px' : '76px';
    $colorCloseButtonModal = isset($storedStylesFront['colorCloseButtonModal']) ? $storedStylesFront['colorCloseButtonModal']->value.'px' : '#b4b4b4';

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
@include('extranet::front.partials.styles.simple-button')
@include('extranet::front.partials.styles.action-list')
@include('extranet::front.partials.styles.message-box')
@include('extranet::front.partials.styles.last-news-list')
@include('extranet::front.partials.styles.faqs')
@include('extranet::front.partials.styles.tabs-list')
@include('extranet::front.partials.styles.contact-info')
@include('extranet::front.partials.styles.timeline')
@include('extranet::front.partials.styles.modal')


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
            inputColor: '{{$inputColor}}',
            textBtnAddFileForm: '{{$textBtnAddFileForm}}',
            primaryColor: '{{$primaryColor}}',
            backgroundColorTooltipDescForm: '{{$backgroundColorTooltipDescForm}}',
            colorTooltipDescForm: '{{$colorTooltipDescForm}}',
            fontSizeTooltipDescForm: '{{$fontSizeTooltipDescForm}}',
            borderPxInputForm: '{{$borderPxInputForm}}',
            textBtnAddValueForm: '{{$textBtnAddValueForm}}'
        },
        elementFile: {
            backgroundColorTooltipDescFile: '{{$backgroundColorTooltipDescFile}}',
            colorTooltipDescFile: '{{$colorTooltipDescFile}}',
            fontSizeTooltipDescFile: '{{$fontSizeTooltipDescFile}}'
        },
        sidebarMenu: {
            sidebarWidth: '{{$sidebarWidth}}'
        },
        tabslist: {
            backgroundColorActiveTab: '{{$backgroundColorActiveTab}}',
            backgroundColorTab: '{{$backgroundColorTab}}'
        },
    };

    var ICONS = {
        messageBox: {
            success: '{{$iconSuccessMessageBox}}',
            danger: '{{$iconErrorMessageBox}}',
            warning: '{{$iconWarningMessageBox}}',
            info: '{{$iconWarningMessageBox}}'
        },
        formStage: {
            submit: '{{$iconSubmitStepper}}',
            next: '{{$iconPrevNextStepper}}',
            prev: '{{$iconPrevBtnStepper}}',
        }
    }

</script>






