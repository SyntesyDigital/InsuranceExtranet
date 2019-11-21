@extends('extranet::front.layouts.email')

@section('content')
  <tr>
    <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
        <tr>
          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">

            <p style="Margin-bottom: 30px;">Gracias {{$firstname}} {{$lastname}},</p>
            <p style="Margin-bottom: 30px;">Estos son los archivos de tu descarga : </p>

            @foreach($items as $id => $item)
              @php
                $fileId = $id."-".$typology."-".time();
              @endphp
              <p style="Margin-bottom: 15px;"> <a href="{{route('contact.download',$fileId)}}" target="_blank">Nombre archivo</a> </p>
            @endforeach


            <p style="Margin-bottom: 30px;">Estos enlaces caducaran en 48h</p>


          </td>
        </tr>
      </table>
    </td>
  </tr>
@endsection
