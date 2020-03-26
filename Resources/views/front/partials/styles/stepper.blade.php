<style type="text/css">
    body .stepper-item#stepper-item-completed .stepper-item-outer{
        background-color: {{$inputColor}};
        border: 3px solid {{$inputColor}};
    }
    body .stepper-item#stepper-item-completed .stepper-title:not(.stepper-title-active){
        color: {{$inputColor}};
    }
    body .stepper-item .stepper-item-outer.stepper-item-outer-active{
        border: 3px solid {{$inputColor}};
    }
    body .stepper-item .stepper-title-active{
        color: {{$inputColor}};
    }
    body .stepper-item-outer:nth-of-type(odd) .stepper-item-inner.stepper-item-inner-active{
        color: {{$inputColor}};
    }
    body .stepper-item-outer-inner{
        background-color: {{$inputColor}};
    }
</style>