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
    }
    body .sidebar .sub-menu-sidebar-container .sidebar-text{
        font-size: {{$sidebarFontSizeItems}};
    }
    body .sidebar .menu-sidebar-container .menu-item, body .sidebar .menu-sidebar-container .logo-container, body .sidebar .menu-sidebar-container .user-item, body .sidebar .menu-sidebar-container .menu-child{
        border-bottom: 1px solid {{$sidebarBorderColor}}
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
    body .sub-menu-sidebar-container {
        top: {{$sidebarHeightUser}}px;
    }
</style>