<style type="text/css">
    body .action-button-container{
        background-color: {{$backgroundColorActionButton}};
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, {{$boxShadowOpacityActionButton/100}});
    }
    body .action-button-container:hover{
        background-color: {{$backgroundHoverColorActionButton}};
    }
    body .action-button-container{
        border-top-left-radius: {{$borderTopLeftActionButton}}px;
        border-top-right-radius: {{$borderTopRightActionButton}}px;
        border-bottom-right-radius: {{$borderBottomRightActionButton}}px;
        border-bottom-left-radius: {{$borderBottomLeftActionButton}}px;
    }
    body .action-button-container .container-icon i{
        color: {{$iconColorActionButton}};
    }
    body .action-button-container .container-icon svg.icon{
        width: {{$fontSizeIconActionButton}};
        height: {{$fontSizeIconActionButton}};
    }
    body .action-button-container:hover .container-icon i{
        color: {{$iconHoverColorActionButton}};
    }
    body .action-button-container:hover .container-number span{
        color: {{$numberHoverColorActionButton}};
    }
    body .action-button-container .container-number span{
        color: {{$numberColorActionButton}};
    }
    body .action-button-container .container-title p{
        color: {{$titleColorActionButton}};
        font-size: {{$fontSizeTitleActionButton}};
    }
    body .action-button-container:hover .container-title p{
        color: {{$titleHoverColorActionButton}};
    }
</style>


