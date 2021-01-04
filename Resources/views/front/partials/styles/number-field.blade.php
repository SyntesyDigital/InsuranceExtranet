<style type="text/css">
    body .field-container .surface input::-webkit-outer-spin-button,
    body .field-container .surface input::-webkit-inner-spin-button,
    body .field-container .price_with_decimals_2 input::-webkit-outer-spin-button,
    body .field-container .price_with_decimals_2 input::-webkit-inner-spin-button,
    body .field-container .price_with_decimals input::-webkit-outer-spin-button,
    body .field-container .price_with_decimals input::-webkit-inner-spin-button,
    body .field-container .price input::-webkit-outer-spin-button,
    body .field-container .price input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    body .field-container .surface input[type=number],
    body .field-container .price_with_decimals input[type=number],
    body .field-container .price_with_decimals_2 input[type=number] {
        -moz-appearance: textfield;
        /* Firefox */
    }
    
    body .field-container .container-custom-icon i{
        font-size: {{$iconFontSizeForm}};
    }

    body .field-container .container-custom-icon svg{
        width: {{$iconFontSizeForm}};
        height: {{$iconFontSizeForm}};
    }
</style>
