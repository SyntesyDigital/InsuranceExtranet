<style type="text/css">
    body .ImageTextTitleDocuments .container-image-text-title-documents {
        border-radius: {{$borderRadiusImgTxtTitleDocuments}};
    }
    body .ImageTextTitleDocuments .container-image-text-title-documents .container-image img {
        border-top-left-radius: {{$borderRadiusImgTxtTitleDocuments}};
        border-top-right-radius: {{$borderRadiusImgTxtTitleDocuments}};
    }
    body .ImageTextTitleDocuments .container-image-text-title-documents .container-title h4{
        font-size: {{$titleFontSizeImgTitleDocuments}};
        color: {{$titleColorImgTxtTitleDocuments}};
    }
    body .ImageTextTitleDocuments .container-image-text-title-documents .container-title{
        border-bottom: 1.5px solid {{$borderTitleColorImgTxtTitleDocuments}};
    }
    body .ImageTextTitleDocuments .container-image-text-title-documents .container-description{
        font-size: {{$descFontSizeImgTxtTitleDocuments}};
        color: {{$descColorImgTxtTitleDocuments}};
    }
    body .ImageTextTitleDocuments .container-image-text-title-documents .btn-primary{
        background-color: {{$buttonBackgroundColorImgTxtTitleDocuments}};
        border: 1px solid {{$buttonBorderColorImgTxtTitleDocuments}};
        border-radius: {{$borderRadiusButtons1ImgTxtTitleDocuments}};
    }
    body .ImageTextTitleDocuments .container-image-text-title-documents .btn-primary h5{
        font-size: {{$button1FontSizeImgTitleDocuments}};
        color: {{$buttonColorImgTxtTitleDocuments}};
        font-weight: {{$titleFontWeightImgTitleDocuments}};
    }
    body .ImageTextTitleDocuments .container-image-text-title-documents .btn-default h5{
        font-size: {{$button2FontSizeImgTitleDocuments}};
        color: {{$button2ColorImgTxtTitleDocuments}};

    }
    body .ImageTextTitleDocuments .container-image-text-title-documents .btn-default{
        background-color: {{$button2BackgroundColorImgTxtTitleDocuments}};
        border: 1px solid {{$button2BorderColorImgTxtTitleDocuments}};
        border-radius: {{$borderRadiusButtons2ImgTxtTitleDocuments}};
    }
    body .ImageTextTitleDocuments .container-image-text-title-documents .btn-primary:hover{
        color: {{$buttonColorHoverImgTxtTitleDocuments}};
    }
    body .ImageTextTitleDocuments .container-image-text-title-documents .btn-default:hover{
        color: {{$button2ColorHoverImgTxtTitleDocuments}};
        background-color: {{$button2BackgroundHoverColorImgTxtTitleDocuments}};
    }

    @if(isset($storedStylesFront['buttonTransparentImgTxtTitleDocuments']) && $storedStylesFront['buttonTransparentImgTxtTitleDocuments']->value == true)
        body .ImageTextTitleDocuments .container-image-text-title-documents .container-image a{
            background-color: {{$buttonBackgroundColorImgTxtTitleDocuments}}80;
            border-color: transparent;
        }
        body .ImageTextTitleDocuments .container-image-text-title-documents .container-image a:hover{
            background-color: {{$buttonBackgroundColorImgTxtTitleDocuments}}80;
            border-color: transparent;
        }
    @endif

    @if(isset($storedStylesFront['iconButton1ImgTitleDocuments']) && isset($storedStylesFront['iconButton1ImgTitleDocuments']->value))
        body .ImageTextTitleDocuments .container-image-text-title-documents .container-image a:before{
            background-image: url('/{{ $storedStylesFront['iconButton1ImgTitleDocuments']->value->urls['original'] }}');
        } 
    @endif
</style>