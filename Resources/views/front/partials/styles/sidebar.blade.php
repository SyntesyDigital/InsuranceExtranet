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
    body .sidebar {
        border-bottom-right-radius: {{$sidebarBorderRadiusBottomRight}}
    }
    body .sidebar .menu-sidebar-container .menu-item, body .sidebar .menu-sidebar-container .logo-container, body .sidebar .menu-sidebar-container .user-item, body .sidebar .menu-sidebar-container .menu-child{
        border-bottom: 1px solid {{$sidebarBorderColor}}
    }

</style>