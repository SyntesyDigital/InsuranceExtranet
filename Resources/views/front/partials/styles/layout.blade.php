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

header .session-changer {
  border:1px solid {{$headerButtonColor}};
  color:{{$headerButtonColor}};
  border-radius: {{$buttonRadius}};
  background-color: {{$headerRightPartBackgroundColor}};
}

header:first-child .navbar-toggle .icon-bar{
  background: {{$headerRightPartTextColor}};
}

/*SIDEBAR */
.sidebar{
  background-color: {{$sidebarBackgroundColor}};
  color:{{$sidebarColor}};
}
.sidebar ul li:hover, .sidebar ul li.active{
  background-color: {{$sidebarActiveBackgroundColor}};
  border-left: 4px solid {{$sidebarActiveColor}};
}
.sidebar ul li:hover a, .sidebar ul li.active a{
  color:{{$sidebarActiveColor}};
}
.sidebar ul li a{
  color:{{$sidebarColor}};
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

/*FOOTER */
body {
  background-color: {{$bodyBackgroundColor}};
  color:{{$bodyTextColor}};
}

</style>
