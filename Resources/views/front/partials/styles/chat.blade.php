<style type="text/css">

    /* sender */
    body .chat-field.container-active{
        background-color: {{$senderBackgroundColorChat}};
        border: 1.5px solid {{$senderBorderColorChat}};
        border-radius: {{$senderBorderRadiusChat}}
    }
    body .chat-field.container-active .field-container{
        color: {{$senderColorChat}};
        font-size: {{$senderFontSizeChat}};
    }
    body .chat-field.container-active .field-container .has-date{
        color: {{$senderDateColorChat}};
        font-size: {{$senderDateFontSizeChat}};
    }
    body .chat-field.container-active .field-container .has-mail{
        color: {{$senderMailColorChat}};
        font-size: {{$senderMailFontSizeChat}};
    }

    /* recipient */
    body .chat-field:not(.container-active){
        background-color: {{$recipientBackgroundColorChat}};
        border: 1px solid {{$recipientBorderColorChat}};
        border-radius: {{$recipientBorderRadiusChat}};
    }
    body .chat-field:not(.container-active) .field-container{
        color: {{$recipientColorChat}};
        font-size: {{$recipientFontSizeChat}};
    }
    body .chat-field:not(.container-active) .field-container .has-date{
        color: {{$recipientDateColorChat}};
        font-size: {{$recipientDateFontSizeChat}};
    }

    /* button */
    body .table-chat-container-body .table-chat-container .more-btn a{
        background-color: {{$buttonBackgroundColorChat}};
        color: {{$buttonColorChat}};
        border: 1px solid {{$buttonBorderColorChat}};
        font-size: {{$fontSizeButtonChat}};
        border-radius: {{$buttonRadiusChat}};
    }
    body .table-chat-container-body .table-chat-container .more-btn a:hover{
        background-color: {{$buttonBackgroundHoverColorChat}};
        color: {{$buttonColorHoverChat}};
        border: 1px solid {{$buttonborderHoverColorChat}};
    }
    @if (isset($alignButtonChat) && $alignButtonChat == 'top')
        body .table-chat-container .documents-container{
            order: 2;
        }
    @endif   
    @if (isset($alignButtonChat) && $alignButtonChat == 'bottom')
        body .table-chat-container .documents-container{
            order: unset;
        }
    @endif 
</style>


