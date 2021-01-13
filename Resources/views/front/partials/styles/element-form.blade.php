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
    .element-form-container .element-form-container-head i{
      color:{{$elementHeadIconColor}};
    }
    .form-component .element-collapsable.element-form-container-head{
      background-color: {{$frontElementHeadCollapsableBackground}};
      color: {{$elementHeadCollapsableColor}};
      font-size: {{$titleCollapsableFontSize}};
      padding-bottom:10px;
      padding-left: 35px;
    }
    body .element-form-container .element-form-container-head.collapsed{
      border-radius: {{$buttonRadius}};
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
    
    }

    .element-form-container .element-form{
      background-color:{{$elementBackground}};
      color:{{$elementColor}};
      border-bottom-left-radius: {{$buttonRadius}};
      border-bottom-right-radius: {{$buttonRadius}};
    
    }

    .element-form-container .element-form-container-body.collapse .element-form{
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    .form-component .element-form-row label span{
      color:{{$elementLinkHoverColor}};
    }
    .form-component .element-form-row .buttons .btn-back{
      border: 1px solid {{$elementColor}};
    }
    .form-component .element-form-row .buttons .btn-back:hover{
      background-color: {{$elementBackground}};
      border-color: {{$elementBackground}};
      color: {{$elementColor}};
    }
    
    /* FORM LABELS AND FIELDS */
    
    /* label */
    body .element-form label  {
      color: {{$labelInputColor}};
      font-size: {{$labelInputFontSize}};
      padding: {{$labelInputPadding}};
    }
    /* icon info ? form and files */
    body .element-form label .icon-desc-info, body #element-card .icon-desc-info {
        width: 20px;
        height: 20px;
    }

    body .element-form .left-text-container{
      overflow:hidden;
    }
    body .element-form .label-container{
      position: absolute;
      top: 10px;
      right: 10px;
      z-index:10;
    }

    body .element-form .label-container label{
      padding:2px;
    }

    body .element-form label button, body #element-card button.MuiButton-root{
        margin-left: 10px;
        border-radius: 10px;
        padding:0;
        min-width: unset;
    }
    /* input */
    body .element-form input.form-control{
        height: {{$heightInputForm}};
    }

    /* textarea */
    body .element-form input.form-control, body .element-form textarea.form-control, body .element-form select.form-control{
      border-radius: {{$borderRadiusInput}};
    }
    body .element-form input.form-control.bordered, body .element-form textarea.form-control.bordered, body .element-form select.form-control.bordered{
      border: {{$borderPxInputForm}} solid {{$borderColorInput}} !important;
    }

    body .element-form .has-error input.form-control.bordered, body .element-form .has-error textarea.form-control.bordered, body .element-form .has-error select.form-control.bordered{
      border: {{$borderPxInputForm}} solid #a94442 !important;
    }

    body .element-form input.form-control:focus, body .element-form textarea.form-control:focus, body .element-form select.form-control:focus{
      border: {{$borderPxInputForm}} solid {{$borderColorInput}} !important;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
    body .element-form input.form-control.bordered, body .element-form textarea.form-control.bordered{
      border: {{$borderPxInputForm}} solid {{$borderColorInput}};
    }
    
    /* radio-field */
    body .element-form .container-radio-field .MuiFormGroup-root .MuiFormControlLabel-root .Mui-checked{
      color: {{$borderColorInput}};
    }
    body .element-form .container-radio-field .bordered{
      border: {{$borderPxInputForm}} solid {{$borderColorInput}} !important;
    }
    body .element-form .container-radio-field .MuiFormControlLabel-root{
      border-radius: {{$borderRadiusInput}};
      height: {{$heightInputForm}};
    }
    
    /* select-search-field */
    body .element-form .select-search-field a{
        background-color: {{$btn2BackgroundColor}};
        color: {{$btn2Color}};
        border-color: {{$btn2BorderColor}};
        border-radius: {{$btn2BorderRadius}};
    }
    body .element-form .select-search-field a:hover{
        background-color: {{$btn2BackgroundHoverColor}};
        color: {{$btn2HoverColor}};
        border-color: {{$btn2BorderHoverColor}};
    }
    
    /* checkfield */
    body .element-form .check-field label {
      border: {{$borderPxInputForm}} solid;
      border-color: #eeeeee;
      border-radius: {{$borderRadiusInput}};
      padding: 0;
      padding-right: 40px;
      height: {{$heightInputForm}}
    }
    body .element-form .check-field.bordered label {
      border: {{$borderPxInputForm}} solid {{$borderColorInput}};
      border-radius: {{$borderRadiusInput}};
    }
    body .element-form .check-field label .MuiIconButton-label{
      color: #eeeeee;
    }
    body .element-form .check-field.bordered label .MuiIconButton-label{
      color: {{$borderColorInput}};
    }
    body .element-form .check-field label span.MuiTypography-root{
        color: {{$labelInputColor}} !important;
    }
    
    @if(isset($storedStylesFront['frontElementHeadTransparent']) && $storedStylesFront['frontElementHeadTransparent']->value == true)
      body .page-builder .element-form-container .element-form-container-head {
        background-color: transparent !important;
      }
      body .page-builder .element-form-container .element-form{
        border-top-left-radius: {{$buttonRadius}};
        border-top-right-radius: {{$buttonRadius}};
      }
      body .page-builder .element-form-container .element-form-container-body.collapse .element-form{
        border-top-left-radius: {{$buttonRadius}};
        border-top-right-radius: {{$buttonRadius}};
    }
    @endif

    @if(isset($storedStylesFront['iconDateForm']) && $storedStylesFront['iconDateForm']->value !== '')
        body .page-builder .element-form-container .react-datepicker-wrapper .react-datepicker__input-container:after{
            content: ''
        }
    @endif


    body .rangeslider__handle{
      z-index:10;
    }

    body .rangeslider__handle .rangeslider__handle-label{
      background-color:{{$elementBackground}};
    }
    
    </style>
    