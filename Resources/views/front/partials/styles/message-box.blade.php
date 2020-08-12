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
        font-size: {{$fontSizeIconInfoMessageBox}};
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
        font-size: {{$fontSizeIconErrorMessageBox}};
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
        font-size: {{$fontSizeIconWarningMessageBox}};
    }
    /* reduced */
    body .reduced .messageBox .alert{
        padding: 10px 20px 10px 65px;
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
        left: -5px;
    }
</style>

