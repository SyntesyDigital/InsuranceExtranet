<style type="text/css">
    body #actionList .action-list-container label{
        color: {{$labelActionListColor}};
        font-size: {{$labelActionListFontSize}};
    }
    body #actionList .action-list-container .btn-action{
        background-color: {{$actionListButtonBackgroundColor}};
        border: 1px solid {{$actionListButtonBorderColor}};
        transition: 0.5s;
    }
    body #actionList .action-list-container .btn-action:hover{
        background-color: {{$actionListButtonBackgroundHoverColor}};
        border: 1px solid {{$actionListButtonBorderHoverColor}};
    }
    body #actionList .action-list-container .btn-action:hover i{
        color: {{$actionListButtonHoverColorIcon}};
    }
    body #actionList .action-list-container .btn-action i{
        color: {{$actionListButtonColorIcon}};
    }
    body #actionList .action-list-container ul.dropdown-menu{
        background-color: {{$actionListDropdownBackgroundColor}};
        border-radius: {{$actionListDropdownBorderRadius}};
    }
    body #actionList .action-list-container ul.dropdown-menu div a{
        color: {{$actionListDropdownColor}};
        font-size: {{$actionListDropdownTextFontSize}}; 
    }
    body #actionList .action-list-container ul.dropdown-menu div a:hover{
        color: {{$actionListDropdownHoverColor}};
    }
</style>


