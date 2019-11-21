@extends('extranet::front.layouts.email')

@section('content')
  <tr>
    <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
        <tr>
          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">

            <p style="Margin-bottom: 15px;">DATOS DEL MEDIO</p>
            <p style="Margin-bottom: 15px;">Tipo del medio : {{$media_type}}</p>
            <p style="Margin-bottom: 15px;">Nombre del medio : {{$media_name}}</p>
            <p style="Margin-bottom: 15px;">Distribución : {{$media_distribution}}</p>
            <p style="Margin-bottom: 15px;">País : {{$media_country}}</p>
            <p style="Margin-bottom: 15px;">Web : {{$media_web}}</p>
            <p style="Margin-bottom: 15px;">Email : {{$media_email}}</p>
            <p style="Margin-bottom: 15px;">Comentario : {{$media_comment}}</p>

            <p style="Margin-bottom: 15px;"></p>
            <p style="Margin-bottom: 15px;">DATOS DEL PERIODISTA</p>
            <p style="Margin-bottom: 15px;">Nombre : {{$firstname}} {{$lastname}}</p>
            <p style="Margin-bottom: 15px;">Genero : {{$gender}}</p>
            <p style="Margin-bottom: 15px;">Email : {{$email}}</p>
            <p style="Margin-bottom: 15px;">País : {{$country}}</p>
            <p style="Margin-bottom: 15px;">Cargo / posición : {{$occupation}}</p>
            <p style="Margin-bottom: 15px;">Web : {{$web}}</p>
            <p style="Margin-bottom: 15px;">Inicio : {{$dateStart}}</p>
            <p style="Margin-bottom: 15px;">Final : {{$dateEnd}}</p>
            <p style="Margin-bottom: 15px;">Comentario : {{$comment}}</p>
            <p style="Margin-bottom: 15px;">Fecha recogida : {{$delivery}}</p>
            <p style="Margin-bottom: 15px;"></p>

            <p style="Margin-bottom: 15px;">Privacidad aceptada : {{isset($privacity) && $privacity == 1 ? 'Si' : 'No'}}</p>
            <p style="Margin-bottom: 15px;">Newsletter : {{isset($newsletter) && $newsletter == 1 ? 'Si' : 'No'}}</p>

          </td>
        </tr>
      </table>
    </td>
  </tr>
@endsection
