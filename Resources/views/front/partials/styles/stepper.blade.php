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
</style>