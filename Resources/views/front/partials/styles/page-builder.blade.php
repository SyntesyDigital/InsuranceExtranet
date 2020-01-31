<style type="text/css">

/*PAGE*/
.page-builder h1{
  color:{{$frontBodyH1Color}};
}
.page-builder h2{
  color:{{$frontBodyH2Color}};
}
.page-builder h3{
  color:{{$frontBodyH3Color}};
}

.total-box-container-a{
  color:{{$elementLinkColor}};
}

.total-box-container{
  color:{{$elementColor}};
  border-radius: {{$buttonRadius}};
}

.box-button-container-a .box-button-container:hover{
  color:{{$elementButtonHoverColor}};
  /*
  border: 1px solid {{$elementButtonHoverColor}};
  */
}

.box-button-container{
  color:{{$elementButtonColor}};
  /*border: 1px solid {{$elementButtonColor}};*/
  border-radius: {{$buttonRadius}};
}

.static-banner{
  border-radius: {{$buttonRadius}};
  background-color:{{$sidebarBackgroundColor}}
}
.static-banner .text-static-banner h1, .static-banner .text-static-banner a{
  color: {{$buttonPrimaryColor}};
}

/* button primary */
.box-button-container,.box-button-container-a {
  color: {{$buttonPrimaryColor}};
  background-color: {{$buttonPrimaryBackgroundColor}};
  border-radius: {{$buttonPrimaryBorderRadius}};
}

.box-button-container-a .box-button-container:hover {
  color: {{$buttonPrimaryHoverColor}};
  background-color: {{$buttonPrimaryHoverBackgroundColor}};

}

/* button Secondary */
.box-button-container.box-button-secondary, .box-button-container-a .box-button-secondary {
  color: {{$buttonSecondaryColor}};
  background-color: {{$buttonSecondaryBackgroundColor}};
  border-radius: {{$buttonSecondaryBorderRadius}};
}

.box-button-container-a .box-button-container.box-button-secondary:hover {
  color: {{$buttonSecondaryHoverColor}};
  background-color: {{$buttonSecondaryHoverBackgroundColor}};

}

</style>
