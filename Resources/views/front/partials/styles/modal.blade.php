<style type="text/css">
  
    /* header */
    body .custom-modal.modal-table .modal-header{
        background-color: {{$backgroundColorHeaderModal}};
        color: {{$colorHeaderModal}};
        border-top-left-radius: {{$borderRadiusHeaderModal}};
        border-top-right-radius: {{$borderRadiusHeaderModal}};
        padding-left: 0;
    }
    body .custom-modal.modal-table .modal-header h2{
        padding-top: {{$paddingHeaderModal}};
        padding-left: {{$paddingHeaderModal}};
        padding-bottom: {{$paddingHeaderModal}};
        font-size: {{$fontSizeHeaderModal}};
        text-transform: Capitalize;
    }
    body .custom-modal.modal-table .modal-header .btn i{
        color: {{$colorHeaderModal}};
    }

    /* content */
    body .custom-modal.modal-table .modal-background{
        background-color: {{$backgroundColorbackgroundModal}};
        opacity: {{$opacityModal/100}};
    }
    body .custom-modal.modal-table .modal-content{
        box-shadow: 0 5px 15px rgba(0, 0, 0, {{$boxShadowContentModal/100}} );
    }
    body .custom-modal.modal-table .modal-body{
        background-color: {{$backgroundColorContentModal}};
        border-bottom-left-radius: {{$borderRadiusContentModal}};
        border-bottom-right-radius: {{$borderRadiusContentModal}};
    } 
    body .custom-modal.modal-table .element-form-wrapper{
        padding: {{$paddingContentFormWrapperModal}};
    }
    body .custom-modal.modal-table .container-custom-form{
        padding: {{$paddingContainerFormModal}};
    }

    /* footer buttons */
    body .custom-modal.modal-table .form-component .buttons{
        background-color: {{$backgroundColorFooterButtonModal}};
    }

    /* button close */
    body .custom-modal.modal-table .modal-buttons .close-button-modal svg{
        color: {{$colorCloseButtonModal}} !important;
    }

    /* button */
    body .custom-modal.modal-table .form-component .buttons .btn-primary{
        color: {{$colorButtonModal}};
        background-color: {{$backgroundColorButtonModal}};
        border-color: {{$borderColorButtonModal}};
    }
    body .custom-modal.modal-table .form-component .buttons {
        min-height: {{$minHeightButtonModal}};
    }

</style>

