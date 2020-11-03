<style type="text/css">
    body .stepper-item .stepper-title{
        font-size: {{$fontSizeLabelStepper}};
        margin-top: {{$distanceBetweenLabelStepper}};
    }
    /* completed */
    body .stepper-item#stepper-item-completed .stepper-item-outer{
        background-color: {{$stepperCompletedBackgroundColor}};
        border: 3px solid {{$stepperCompletedBackgroundColor}};
    }
    body .stepper-item-outer:nth-of-type(odd) .stepper-item-inner{
        color: {{$stepperCompletedColor}};
    }
    body .stepper-item#stepper-item-completed .stepper-title{
        color: {{$colorCompletedLabelStepper}};
    }
    /* active */
    body .stepper-item .stepper-item-outer.stepper-item-outer-active{
        background-color: {{$stepperActiveBackgroundColor}};
    }
    body .stepper-item-outer:nth-of-type(odd) .stepper-item-inner.stepper-item-inner-active{
        color: {{$stepperActiveColor}};
    }
    body .stepper-item .stepper-title-active{
        color: {{$colorActiveLabelStepper}} !important;
    }
    /* outer */
    body .stepper-item .stepper-item-outer .stepper-item-inner-future{
        background-color: {{$stepperOuterBackgroundColor}};
    }
    body .stepper-item .stepper-item-outer .stepper-item-inner-future{
        color: {{$stepperOuterColor}} !important;
    }
    body .stepper-item:not(#stepper-item-completed) .stepper-title{
        color: {{$colorOuterLabelStepper}};
    }
    /* button prev */
    body #element-staged-form .btn-prev{
        color: {{$colorPrevBtnStepper}};
        background-color: {{$backgroundColorPrevBtnStepper}};
        border-color: {{$borderColorPrevBtnStepper}};
        border-radius: {{$borderRadiusPrevBtnStepper}};
        font-size: {{$fontSizePrevBtnStepper}};
    }
    body #element-staged-form .btn-prev:hover{
        color: {{$colorHoverPrevBtnStepper}};
        background-color: {{$backgroundHoverColorPrevBtnStepper}};
        border-color: {{$borderHoverColorPrevBtnStepper}}
    }
    /* button next */
    body #element-staged-form .btn-next{
        color: {{$colorNextBtnStepper}};
        background-color: {{$backgroundColorNextBtnStepper}};
        border-color: {{$borderColorNextBtnStepper}};
        border-radius: {{$borderRadiusNextBtnStepper}};
        font-size: {{$fontSizeNextBtnStepper}};
    }
    body #element-staged-form .btn-next:hover{
        color: {{$colorHoverNextBtnStepper}};
        background-color: {{$backgroundHoverColorNextBtnStepper}};
        border-color: {{$borderHoverColorNextBtnStepper}}
    }
    /* button submit */
    body #element-staged-form .btn-submit{
        color: {{$colorSubmitBtnStepper}};
        background-color: {{$backgroundColorSubmitBtnStepper}};
        border-color: {{$borderColorSubmitBtnStepper}};
        border-radius: {{$borderRadiusSubmitBtnStepper}};
        font-size: {{$fontSizeSubmitBtnStepper}};
    }
    body #element-staged-form .btn-submit:hover{
        color: {{$colorHoverSubmitBtnStepper}};
        background-color: {{$backgroundHoverColorSubmitBtnStepper}};
        border-color: {{$borderHoverColorSubmitBtnStepper}}
    }
</style>