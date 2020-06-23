<style type="text/css">
    body .total-box-price-container {
        background-color: {{$backgroundColorBoxPrice}};
        border-radius: {{$borderRadiusBoxPrice}};
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, {{$boxShadowOpacityBoxPrice/100}});
        transition: 0.5s;
    }
    body .total-box-price-container:hover {
        background-color: {{$backgroundHoverColorBoxPrice}};
    }
    body .total-box-price-container .title{
        color: {{$titleColorBoxPrice}};
        font-size: {{$fontSizeTitleBoxPrice}};
    }
    body .total-box-price-container .subtitle{
        color: {{$subtitleColorBoxPrice}};
        font-size: {{$fontSizeSubTitleBoxPrice}}
    }
    body .total-box-price-container .container-subtitle p{
        color: {{$subtitleColorBoxPrice}};
    }
    body .total-box-price-container .subtitle2{
        color: {{$subtitle2ColorBoxPrice}};
        font-size: {{$fontSizeSubTitle2BoxPrice}}
    }
    body .total-box-price-container .container-subtitle2 p{
        color: {{$subtitle2ColorBoxPrice}};
    }
    body .total-box-price-container div#totalBoxPrice{
        color: {{$elementNumberPriceColorBoxPrice}};
        font-size: {{$fontSizeNumberBoxPrice}}
    }
</style>

