<style type="text/css">
    body .sidebar .btn-ham .icon:before{
        background-color: {{$colorSidebarIconMenu}};
    }
    body .sidebar .btn-ham .icon:after{
        background-color: {{$colorSidebarIconMenu}};
    }
    body .sidebar .btn-ham .icon{
        background-color: {{$colorSidebarIconMenu}};
    }
    body header:first-child .menu-container #sidebar-button.navbar-toggle .icon-bar{
        background-color: {{$colorSidebarIconMenu}};
    }
    body .ui-tooltip {
        background-color: {{$backgroundColorSidebarTooltip}};
        color: {{$colorSidebarTooltip}}
    }
    body .sidebar .contact-sidebar{
        width: {{$sidebarWidth}};
    }
    @media (min-width: 768px){
        body .sidebar.initial{
            width: {{$sidebarWidth}} !important;
        }
        body .sidebar {
            border-bottom-right-radius: {{$sidebarBorderRadiusBottomRight}};
            font-size: {{$sidebarFontSizeItems}};
            width: {{$sidebarWidth}};
        }
        body .sidebar .sub-menu-sidebar-container{
            width: {{$sidebarWidth}};
        }
        body .content-wrapper {
            margin-left: {{$sidebarWidth}};
        }
    }
    body .sidebar .wrapper-menu .sub-menu-sidebar-container .sidebar-text{
        font-size: {{$sidebarFontSizeItems}};
    }
    body .sidebar .menu-sidebar-container .menu-item, body .sidebar .menu-sidebar-container .logo-container, body .sidebar .menu-sidebar-container .user-item, body .sidebar .menu-sidebar-container .menu-child{
        border-bottom: 1px solid {{$sidebarBorderColor}};
    }
    body .sidebar li a i{
        font-size: {{$sidebarIconFontSize}};
    }
    body .sidebar .menu-sidebar-container .menu-item svg.icon ~ .sidebar-text, body .sidebar .menu-sidebar-container .menu-child svg.icon ~ .sidebar-text{
        position: relative;
        top: -20px;
    }
    body .sidebar .menu-sidebar-container .menu-item svg.icon ~ .arrowright, body .sidebar .menu-sidebar-container .menu-child svg.icon ~ .arrowright{
        top: 35%;
    }
    body .sidebar li a svg{
        width: {{$sidebarIconFontSize}};
        height: -webkit-fill-available;
    }
    body .sidebar .sub-menu-sidebar-container .menu-child a{
        color: {{$sidebarActiveColor}};
    }
    body .sidebar .sub-menu-sidebar-container .menu-child a:hover {
        color: {{$sidebarColor}};
    }
    body .sidebar .user-item{
        height: {{$sidebarHeightUser}}px;
        line-height: {{$sidebarHeightUser}}px;
    }
    body .wrapper-menu .sub-menu-sidebar-container {
        top: {{$sidebarHeightUser}}px;
    }
</style>