<style type="text/css">

/* HEADER */
header:first-child .row.row-header .logo-container{
  background-color: {{$headerLogoBackgroundColor}};
}

header:first-child .row.row-header .right-part-header{
  background-color: {{$headerRightPartBackgroundColor}};
  color: {{$headerRightPartTextColor}};
}

header:first-child .row.row-header .right-part-header.login-header {
  background-color: {{$headerLogoBackgroundColor}};
}

header:first-child .row.row-header .right-part-header .user-info .button-header-container .btn-header{
  border:1px solid {{$headerButtonColor}};
  color:{{$headerButtonColor}};

  border-radius: {{$buttonRadius}};
}

header:first-child .row.row-header .right-part-header .user-info .button-header-container .btn-header:hover{
  border:1px solid {{$headerHoverColor}};
  color:{{$headerHoverColor}};
}

/* select2 */
body .select2-container--default .select2-selection--single{
  border:1px solid {{$headerButtonColor}};
  color:{{$headerButtonColor}};
  border-radius: {{$buttonRadius}};
  background-color: {{$headerRightPartBackgroundColor}};
}
body .select2-container--default .select2-selection--single .select2-selection__arrow b{
  border-color: {{$headerButtonColor}} transparent transparent transparent;
}
body .select2-container--default .select2-selection--single .select2-selection__rendered{
  color: {{$headerButtonColor}};
}
body .select2-container--default .select2-results__option--highlighted[aria-selected]{
  background-color: {{$inputColor}};
}
/* end select2 */

header:first-child .navbar-toggle .icon-bar{
  background: {{$headerRightPartTextColor}};
}

/*SIDEBAR */
.sidebar{
  background-color: {{$sidebarBackgroundColor}};
  color:{{$sidebarColor}};
}
.sidebar .menu-sidebar-container ul li:hover, .sidebar .menu-sidebar-container ul li.active{
  background-color: {{$sidebarActiveBackgroundColor}};
  border-left: 4px solid {{$sidebarActiveColor}};
}
.sidebar ul li.menu-child.parent{
  background-color: {{$sidebarActiveBackgroundColor}};
}
.sidebar ul li:hover a, .sidebar ul li.active a{
  color:{{$sidebarActiveColor}};
}
.sidebar ul li a{
  color:{{$sidebarColor}};
}
.sub-menu-sidebar-container ul li a{
  color:{{$sidebarColor}};
}
.sub-menu-sidebar-container ul li:hover, .sub-menu-sidebar-container ul li.active{
  background-color: {{$sidebarActiveBackgroundColor}};
  border-left: 4px solid {{$sidebarActiveColor}};
}
.sidebar ul li a:hover{
  color:{{$sidebarActiveColor}};
}


/*FOOTER */
footer{
  background-color: {{$footerBackgroundColor}};
  border-top:1px solid {{$separatorLineColor}};
}
footer p{
  color:{{$footerTextColor}};
}
footer ul li{
  color:{{$footerTextColor}};
}
footer ul li a{
  color:{{$footerTextColor}};
}
footer ul li a:hover{
  color:{{$footerHoverTextColor}};
}
body .sidebar .footer-menu-sidebar ul .menu-item a{
  color: {{$footerTextColor}};
}
body .sidebar .contact-sidebar .wrapper-content .text{
  color: {{$footerTextContactColor}};
}
body .sidebar .contact-sidebar .wrapper-content .number a, body .sidebar .contact-sidebar .wrapper-content .number p{
  color: {{$footerTextNumberColor}};
}

/*FOOTER */
body {
  background-color: {{$bodyBackgroundColor}};
  color:{{$bodyTextColor}};
}

</style>
