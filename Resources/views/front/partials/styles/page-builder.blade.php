<style type="text/css">

/*PAGE*/
.page-builder h1{
  color:{{$frontBodyH1Color}};
  font-size:{{$frontBodyH1FontSize}};
}
.page-builder h2{
  color:{{$frontBodyH2Color}};
  font-size:{{$frontBodyH2FontSize}};
}
.page-builder h3{
  color:{{$frontBodyH3Color}};
  font-size:{{$frontBodyH3FontSize}};
}
.page-builder h4{
  color:{{$frontBodyH4Color}};
  font-size:{{$frontBodyH4FontSize}};
}
.page-builder h5{
  color:{{$frontBodyH5Color}};
  font-size:{{$frontBodyH5FontSize}};
}
.total-box-container-a{
  color:{{$elementLinkColor}};
}
.total-box-container{
  color:{{$elementColor}};
}
.box-button-container-a .box-button-container:hover{
  color:{{$elementButtonHoverColor}};
}
.box-button-container{
  color:{{$elementButtonColor}};
  border-radius: {{$buttonRadius}};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, {{$boxShadowOpacity/100}});
}
.static-banner{
  border-radius: {{$buttonRadius}};
  background-color:{{$elementsBackgroundColor}};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, {{$boxShadowOpacity/100}});
}
.static-banner .text-static-banner h1, .static-banner .text-static-banner a{
  color: {{$primaryColor}};
}

/* button primary */
.box-button-container, .box-button-container-a {
  color: {{$buttonPrimaryColor}};
  border-radius: {{$buttonPrimaryBorderRadius}};
}
.box-button-container-a .image-container{
  background-color: {{$buttonPrimaryBackgroundImageColor}};
}
.box-button-container-a .box-button-container:not(.box-button-secondary) .image-container i{
  color: {{$buttonPrimaryIconColor}};
}
.box-button-container-a .label-container{
  background-color: {{$buttonPrimaryBackgroundBottomColor}};
}
.box-button-container-a .box-button-container:hover {
  color: {{$buttonPrimaryHoverColor}};
}
.box-button-container-a .box-button-container:not(.box-button-secondary):hover > .wrap-box-button .image-container i{
  color: {{$buttonPrimaryIconHoverColor}};
}
.box-button-container-a .box-button-container:not(.box-button-secondary):hover > .wrap-box-button .image-container{
  background-color: {{$buttonPrimaryBackgroundIconHoverColor}}
}
.box-button-container-a .box-button-container:not(.box-button-secondary):hover > .wrap-box-button .label-container{
  background-color: {{$buttonPrimaryBackgroundLabelHoverColor}}
}

/* button Secondary */
.box-button-container.box-button-secondary, .box-button-container-a .box-button-secondary {
  color: {{$buttonSecondaryColor}};
  border-radius: {{$buttonSecondaryBorderRadius}};
}
.box-button-container.box-button-secondary .label-container{
  background-color: {{$buttonSecondaryBackgroundBottomColor}};
}
.box-button-container.box-button-secondary .image-container{
  background-color: {{$buttonSecondaryBackgroundImageColor}};
}
.box-button-container-a .box-button-container.box-button-secondary:hover {
  color: {{$buttonSecondaryHoverColor}};
}
.box-button-container.box-button-secondary .image-container i{
  color: {{$buttonSecondaryIconColor}};
}
.box-button-container.box-button-secondary.box-button-container:hover > .wrap-box-button .image-container i{
  color: {{$buttonSecondaryIconHoverColor}};
}
.box-button-container.box-button-secondary:hover > .wrap-box-button .image-container{
  background-color: {{$buttonSecondaryBackgroundIconHoverColor}}
}
.box-button-container.box-button-secondary:hover > .wrap-box-button .label-container{
  background-color: {{$buttonSecondaryBackgroundLabelHoverColor}}
}
</style>
