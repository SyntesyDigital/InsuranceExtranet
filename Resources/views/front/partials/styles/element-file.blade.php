<style type="text/css">

/*FILES*/
.element-file-container{
  border-radius: {{$buttonRadius}};
}

.element-file-container .element-file-container-head{
  background-color: {{$elementHeadBackground}};
  color:{{$elementHeadColor}};
  font-size:{{$titlesFontSize}};
  padding-bottom:10px;
}

.element-file-container .element-collapsable.element-file-container-head{
  background-color: {{$frontElementHeadCollapsableBackground}};
  color: {{$elementHeadCollapsableColor}};
  font-size: {{$titleCollapsableFontSize}};
  padding-bottom:10px;
  padding-left: 50px;
}

.element-file-container .element-file-container-head i{
  color:{{$elementHeadIconColor}};
}

.element-file-container .element-file-container-body{
  background-color: {{$elementBackground}};
  border:transparent;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, {{$boxShadowOpacity/100}});
}

.element-file-container .element-file-container-body .element-file-input-container{
  border-bottom: 1px solid {{$elementFileInputBorder}};
}

.element-collapsable{
  cursor: pointer;
  text-transform: {{$elementHeadTextTransform}} !important;
}

.element-collapsable.collapsed:before{
  color:{{$elementHeadIconColor}};
}

.element-collapsable:before{
  color:{{$elementHeadIconColor}};
}

.more-btn{
  background-color:{{$elementBackground}};
}

.more-btn  a {
  border-radius: {{$buttonRadius}};
  color:{{$elementLinkColor}};
  border: 1px solid {{$elementLinkColor}};
}

.more-btn  a:hover{
  color:{{$elementLinkHoverColor}};
  border: 1px solid {{$elementLinkHoverColor}};
}

/** Box into an Element */

/* box-1 */
body .element-file-container .box-class-1 *{
  /*color: {{$textColorBox1}};*/
}
body .element-file-container .box-class-1{
  background-color: {{$backgroundColorBox1}};
  border-radius: {{$borderRadiusBox1}};
  border: 1.5px solid {{$borderColorBox1}};
} 
body .layout .box-class-1 .container-fields-default .stripped:nth-of-type(even){
  /*
  background-color: {{$backgroundColorBox1}};
  border-radius: {{$borderRadiusBox1}};
  */
}
body .layout .box-class-1 .container-fields-default .stripped:nth-of-type(odd){
  /*
  background-color: {{$backgroundColorBox1}};
  border-radius: {{$borderRadiusBox1}};
  */
}

/* box-2 */
body .element-file-container .box-class-2 *{
  color: {{$textColorBox2}};
}
body .element-file-container .box-class-2{
  background-color: {{$backgroundColorBox2}};
  border-radius: {{$borderRadiusBox2}};
  border: 1.5px solid {{$borderColorBox2}};
} 
body .layout .box-class-2 .container-fields-default .stripped:nth-of-type(even){
  background-color: {{$backgroundColorBox2}};
  border-radius: {{$borderRadiusBox2}};
}
body .layout .box-class-2 .container-fields-default .stripped:nth-of-type(odd){
  background-color: {{$backgroundColorBox2}};
  border-radius: {{$borderRadiusBox2}};
}

/* box-3 */
body .element-file-container .box-class-3 *{
  color: {{$textColorBox3}};
}
body .element-file-container .box-class-3{
  background-color: {{$backgroundColorBox3}};
  border-radius: {{$borderRadiusBox3}};
  border: 1.5px solid {{$borderColorBox3}};
} 
body .layout .box-class-3 .container-fields-default .stripped:nth-of-type(even){
  background-color: {{$backgroundColorBox3}};
  border-radius: {{$borderRadiusBox3}};
}
body .layout .box-class-3 .container-fields-default .stripped:nth-of-type(odd){
  background-color: {{$backgroundColorBox3}};
  border-radius: {{$borderRadiusBox3}};
}


/** Element into a Box */
/* box-1 */
body .box-class-1 .element-file-container {
  /*border: 1.5px solid {{$borderColorBox1}};*/
  /*border-radius: {{$borderRadiusBox1}};*/
}

body .box-class-1 .element-file-container *{
  /*color: {{$textColorBox1}} !important;*/
  /*background-color: {{$backgroundColorBox1}} !important;*/
}

/* box-2 */
body .box-class-2 .element-file-container .element-file-container-body {
  padding:0px;
}

body .box-class-2 .element-file-container *{
  color: {{$textColorBox2}} !important;
  background-color: {{$backgroundColorBox2}} !important;
  border: transparent;
}

body .box-class-2 .element-file-container .element-collapsable:before {
  color: {{$textColorBox2}} !important;
}

 /*box-3 */
body .box-class-3 .element-file-container .element-file-container-body {
  padding:0px;
}

body .box-class-3 .element-file-container *{
  color: {{$textColorBox3}} !important;
  background-color: {{$backgroundColorBox3}} !important;
}

body .box-class-3 .element-file-container .element-collapsable:before {
  color: {{$textColorBox3}} !important;
}

/* class reduced */
body .reduced div{
    padding: 0;
    margin: 0;
}
body .reduced .element-file-container .element-file-container-body{
    box-shadow: none;
}
body .reduced .element-file-container h1, 
body .reduced .element-file-container h2, 
body .reduced .element-file-container h3, 
body .reduced .element-file-container h4, 
body .reduced .element-file-container h5{
    margin: 0;
    padding: 8px;
    padding-bottom: 5px;
}
body .reduced .element-file-container .element-file-container-body{
    padding: 0;
    padding: {{$paddingBottomTopReduced}} {{$paddingRightLeftReduced}};
    font-size: {{$fontSizeReduced}};
    line-height: {{$lineHeightReduced}};
}
body .reduced .element-file-container .element-file-container-body span{
    padding-top: {{$paddingBottomTopReducedValues}} !important;
    padding-bottom: {{$paddingBottomTopReducedValues}} !important;
    border-radius: 20px;
}
body .reduced .element-file-container .element-file-container-body .container-fields-default div{
    margin: {{$marginBetweenReduced}} 0px;
}
body .reduced .container-fields-default div{
    background: transparent !important; 
}
body .reduced .element-file-container .element-file-container-body .container-fields-default div.stripped .row div:not(:first-child){
    text-align: right;
}

/* display label and display inline settings ficha */
body .element-file-container .element-file-container-body .container-fields-default.display_inline div .row div:first-child, 
body .element-file-container .element-file-container-body .display_inline .container-fields-default div .row div:first-child,
body .element-file-container .element-file-container-body .container-fields-default.display_label div .row div:first-child{
    display: none;
}
body .element-file-container .element-file-container-body .container-fields-default.display_inline div .row div:not(:first-child), 
body .element-file-container .element-file-container-body .display_inline .container-fields-default .row div:not(:first-child),
body .element-file-container .element-file-container-body .display_label .container-fields-default .row div:not(:first-child){
    width: 100%;
    padding: 0;
}
body .element-file-container .element-file-container-body .container-fields-default.display_inline div .row div:not(:first-child):after, 
body .element-file-container .element-file-container-body .display_inline .container-fields-default div .row div:not(:first-child):after{
    content: "/";
}

body .element-file-container .element-file-container-body .container-fields-default.display_inline div:last-child .row div:not(:first-child):after, 
body .element-file-container .element-file-container-body .display_inline .container-fields-default div:last-child .row div:not(:first-child):after{
    content: "";
}

body .element-file-container .element-file-container-body .container-fields-default.display_inline, 
body .element-file-container .element-file-container-body .display_inline .container-fields-default{
    display: flex;
}

@if(isset($storedStylesFront['frontElementHeadTransparent']) && $storedStylesFront['frontElementHeadTransparent']->value == true)
  body .element-file-container .element-file-container-head, body .element-file-container .element-collapsable.element-file-container-head{
    background-color: transparent;
  }
  body .page-builder .element-file-container .element-file-container-body{
    border-top-left-radius: {{$buttonRadius}};
    border-top-right-radius: {{$buttonRadius}};
  }
@endif

</style>
