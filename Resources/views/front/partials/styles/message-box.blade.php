<style type="text/css">
    /* info */
    body .messageBox .alert-info{
        color: {{$colorInfoMessageBox}};
        font-size: {{$fontSizeInfoMessageBox}};
        border-color: {{$borderColorInfoMessageBox}};
        background-color: {{$backgroundColorInfoMessageBox}};
        padding: {{$paddingInfoMessageBox}} 20px;
    }
    body .messageBox .alert-info .close{
        font-size: {{$fontSizeIconRemoveInfoMessageBox}};
    }
    body .messageBox .alert-info i{
        font-size: {{$fontSizeIconInfoMessageBox}}px;
    }
    body .reduced .messageBox .alert-info i{
        left: -{{$fontSizeIconInfoMessageBox/2}}px;
    }
    /* error */
    body .messageBox .alert-danger{
        color: {{$colorErrorMessageBox}};
        font-size: {{$fontSizeErrorMessageBox}};
        border-color: {{$borderColorErrorMessageBox}};
        background-color: {{$backgroundColorErrorMessageBox}};
        padding: {{$paddingErrorMessageBox}} 20px;
    }
    body .messageBox .alert-danger .close{
        font-size: {{$fontSizeIconRemoveErrorMessageBox}};
    }
    body .messageBox .alert-danger i{
        font-size: {{$fontSizeIconErrorMessageBox}}px;
    }
    body .reduced .messageBox .alert-danger i{
        left: -{{$fontSizeIconErrorMessageBox/2}}px;
    }
    /* success */
    body .messageBox .alert-success{
        color: {{$colorSuccessMessageBox}};
        font-size: {{$fontSizeSuccessMessageBox}};
        border-color: {{$borderColorSuccessMessageBox}};
        background-color: {{$backgroundColorSuccessMessageBox}};
        padding: {{$paddingSuccessMessageBox}} 20px;
    }
    body .messageBox .alert-success .close{
        font-size: {{$fontSizeIconRemoveSuccessMessageBox}};
    }
    body .messageBox .alert-success i{
        font-size: {{$fontSizeIconSuccessMessageBox}};
    }
    body .reduced .messageBox .alert-success i{
        left: -{{$fontSizeIconSuccessMessageBox/2}}px;
    }
    /* warning */
    body .messageBox .alert-warning{
        color: {{$colorWarningMessageBox}};
        font-size: {{$fontSizeWarningMessageBox}};
        border-color: {{$borderColorWarningMessageBox}};
        background-color: {{$backgroundColorWarningMessageBox}};
        padding: {{$paddingWarningMessageBox}} 20px;
    }
    body .messageBox .alert-warning .close{
        font-size: {{$fontSizeIconRemoveWarningMessageBox}};
    }
    body .messageBox .alert-warning i{
        font-size: {{$fontSizeIconWarningMessageBox}}px;
    }
    body .reduced .messageBox .alert-warning i{
        left: -{{$fontSizeIconWarningMessageBox/2}}px;
    }
    
    /* reduced general */
    body .reduced .message-box-container{
        @if (isset($storedStylesFront['fontSizeIconWarningMessageBox']))
            padding-left: {{$fontSizeIconWarningMessageBox/2}}px;
        @elseif (isset($storedStylesFront['fontSizeIconErrorMessageBox']))
            padding-left: {{$fontSizeIconErrorMessageBox/2}}px;
        @elseif (isset($storedStylesFront['fontSizeIconSuccessMessageBox']))
            padding-left: {{$fontSizeIconSuccessMessageBox/2}}px;
        @elseif (isset($storedStylesFront['fontSizeIconInfoMessageBox']))
            padding-left: {{$fontSizeIconInfoMessageBox/2}}px;
        @endif
    }
    body .reduced .messageBox .alert{
        padding: 10px 20px 10px 30px;
        background: #FFFFFF;
        border: none;
    }
    body .reduced .messageBox .alert button span{
        display: none;
    }
    body .reduced .messageBox .alert i{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

</style>

