<style type="text/css">
  
    /* header */
    body .custom-modal.modal-table .modal-header{
        background-color: {{$backgroundColorHeaderModal}};
        color: {{$colorHeaderModal}};
        border-radius: {{$borderRadiusHeaderModal}};
        padding-left: 0;
    }
    body .custom-modal.modal-table .modal-header h2{
        padding-top: {{$paddingHeaderModal}};
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
        border-radius: {{$borderRadiusContentModal}};
        box-shadow: 0 5px 15px rgba(0, 0, 0, {{$boxShadowContentModal}});
    }
    body .custom-modal.modal-table .container-custom-form{
        padding: {{$paddingContainerFormModal}};
    }
    @media (min-width: 992px){
        body .custom-modal.modal-table .container-custom-form{
            margin-left: {{$marginContainerFormModal}};
        }
    }
    body .custom-modal.modal-table .modal-body{
        background-color: {{$backgroundColorContentModal}};
    } 
    body .custom-modal.modal-table .element-form-wrapper{
        padding: {{$paddingContentFormWrapperModal}};
    }
    /* footer buttons */
    body .custom-modal.modal-table .form-component .buttons{
        background-color: {{$backgroundColorFooterButtonModal}};
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

