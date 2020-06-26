<style type="text/css">

  /* logo */
  body .login-container .login-box-container .logo-container{
    border-top: 1.5px solid {{$loginContainerBorderColor}};
    border-right: 1.5px solid {{$loginContainerBorderColor}};
    border-left: 1.5px solid {{$loginContainerBorderColor}};
    border-top-left-radius: {{$loginContainerBorderRadius}};
    border-top-right-radius: {{$loginContainerBorderRadius}};
    background-color: {{$loginContainerBackgroundColor}};
  }
  body .login-container .login-box-container .logo-container img {
    max-height: {{$loginMaxHeightLogo}} !important;
  }
  @if(isset($storedStylesFront['boxBackgroundLogoLogin']) && $storedStylesFront['boxBackgroundLogoLogin']->value == true)
    body.template-login .login-container .login-box-container .logo-container{
      background: transparent;
      border: none;
    }
    body.template-login .login-container .login-box-container .login-box{
      border-top-left-radius: {{$loginContainerBorderRadius}};
      border-top-right-radius: {{$loginContainerBorderRadius}};
      border-top: 1.5px solid {{$loginContainerBorderColor}} !important;
    }
    body.template-login .login-box-container:before{
      right: -105px;
      top: 155px;
      width: 45%;
    }
  @endif

  /* box */
  body.template-login .login-container .login-box-container .login-box {
    background-color: {{$loginContainerBackgroundColor}};
    @if(isset($storedStylesFront['loginContainerBackgroundColor']) && isset($storedStylesFront['displayIconsLogin']->value))
      border-top: 1px solid {{$loginContainerBackgroundColor}};
    @endif
    border-bottom-left-radius: {{$loginContainerBorderRadius}};
    border-bottom-right-radius: {{$loginContainerBorderRadius}};
    border-bottom: 1.5px solid {{$loginContainerBorderColor}};
    border-right: 1.5px solid {{$loginContainerBorderColor}};
    border-left: 1.5px solid {{$loginContainerBorderColor}};
  }

  /* icons */
  @if(isset($storedStylesFront['displayIconsLogin']) && $storedStylesFront['displayIconsLogin']->value == true)
  .login-container .login-box-container .login-box form i{
    display: none;
  }
  @endif
  
  /* label */
  .login-container .login-box-container .login-box label{
    color: {{$loginContainerLabelColor}};
  }

  /* input */
  body .login-container .login-box-container .login-box form .form-group .form-control{
    border-radius: {{$buttonRadius}};
  }
  body .login-container .login-box-container .login-box form .form-group .form-control:focus{
    border: 1px solid {{$inputColor}};
  }
  
  /* title */
  .login-container .login-box-container .login-box form h2, .login-container .login-box-container .login-box form h1, .login-container .login-box-container .login-box form h3, .login-container .login-box-container .login-box form h4{
    color: {{$loginContainerTitleColor}};
  }

  /* mot de passe */
  .login-container .login-box-container .login-box form .form-group .forgot a {
    color: {{$loginContainerMotPasseColor}};
  }

  /* button */
  .login-container .login-box-container .login-box form .form-group .buttons-group .btn{
    background-color: {{$loginButtonBackgroundColor}};
    border-color: {{$loginButtonBackgroundColor}};
    border-radius: {{$loginButtonBorderRadius}};
    color:{{$loginButtonTextColor}};
    text-transform: {{$lowerUpperCaseButtonLogin}};
  }
  .login-container .login-box-container .login-box form .form-group .buttons-group .btn:hover{
    background-color: {{$loginButtonHoverBackgroundColor}};
    border-color: {{$loginButtonHoverBackgroundColor}};
    color:{{$loginButtonHoverTextColor}};
  }

  /* footer */
  @if(isset($storedStylesFront['alignFooterLogin']) && isset($storedStylesFront['alignFooterLogin']->value))
    body.template-login footer ul{
      text-align: {{$alignFooterLogin}};
      transform: translate(5%, 0%);
    }
    body.template-login footer .version{
      display: none;
    } 
  @endif
  @if(isset($storedStylesFront['loginBorderColorFooter']) && isset($storedStylesFront['loginBorderColorFooter']->value))
    body.template-login footer{
      border-top: 1px solid {{$loginBorderColorFooter}} !important;
    }
  @endif
</style>
