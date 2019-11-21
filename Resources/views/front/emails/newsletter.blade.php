@extends('extranet::front.layouts.email')

@section('content')
  <tr>
    <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
        <tr>
          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">

            <p style="Margin-bottom: 15px;">Nombre : {{$firstname}} {{$lastname}}</p>
            <p style="Margin-bottom: 15px;">Email : {{$email}}</p>
            <p style="Margin-bottom: 15px;">Pais : {{$country}}</p>
            <p style="Margin-bottom: 15px;">Idioma : {{$language}}</p>
            <p style="Margin-bottom: 15px;">Empresa : {{$company}}</p>
            <p style="Margin-bottom: 15px;">Cargo / posición : {{$occupation}}</p>
            <p style="Margin-bottom: 15px;">Programas : {{$programs}}</p>
            <p style="Margin-bottom: 15px;">Message : {{$comment}}</p>
            <p style="Margin-bottom: 15px;">Privacidad aceptada : {{isset($privacity) && $privacity == 1 ? 'Si' : 'No'}}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
@endsection
