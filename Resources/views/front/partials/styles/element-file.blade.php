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
  padding-left: 35px;
}

.element-file-container .element-file-container-body{
  background-color: {{$elementBackground}};
  /*border: 1px solid {{$elementBorder}};*/
  border:transparent;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, {{$boxShadowOpacity/100}});
}
.element-file-container .element-file-container-body .element-file-input-container{
  border-bottom: 1px solid {{$elementFileInputBorder}};
}

.element-collapsable{
  cursor: pointer;
}
.element-collapsable.collapsed:before{
  color:{{$elementHeadColor}};
}
.element-collapsable:before{
  color:{{$elementHeadColor}};
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

/* box-3 */
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

</style>
