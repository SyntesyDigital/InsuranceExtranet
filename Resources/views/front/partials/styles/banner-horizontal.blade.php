<style type="text/css">
    /* container */
    body .horizontal-banner{
        border-top-right-radius: {{$borderRadiusHorizontalBanner}};
        border-top-left-radius: {{$borderRadiusHorizontalBanner}};
        border-bottom-right-radius: {{$borderRadiusHorizontalBanner}};
        border-bottom-left-radius: {{$borderRadiusHorizontalBanner}};
        background-color: {{$backgroundColorHorizontalBanner}};
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, {{$boxShadowOpacityHorizontalBanner/100}});
    }
    body .horizontal-banner:hover{
        background-color: {{$backgroundColorHoverHorizontalBanner}}
    }
    /* title */
    body .horizontal-banner .text-static-banner p {
        font-size: {{$titleFontSizeHorizontalBanner}};
        color: {{$titleColorHorizontalBanner}}
    }
    body .horizontal-banner:hover .text-static-banner p{
        color: {{$titleHoverColorHorizontalBanner}}
    }
    /* subtitle */
    body .horizontal-banner .text-static-banner h4 {
        font-size: {{$subtitleFontSizeHorizontalBanner}};
        color: {{$subtitleColorHorizontalBanner}}
    }
    body .horizontal-banner:hover .text-static-banner h4 {
        color: {{$subtitleHoverColorHorizontalBanner}}
    }
    /* icon arrow */
    body .horizontal-banner .text-static-banner i {
        color: {{$iconArrowColorHorizontalBanner}}
    }
</style>


