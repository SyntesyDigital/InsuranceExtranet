<?php

namespace Modules\Extranet\Http\Requests\Models;

use Illuminate\Foundation\Http\FormRequest;

class DeleteModelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch ($this->method()) {
            case 'GET':
            case 'DELETE':
                return [];

            case 'POST':
                return [
            //        'name' => 'required',

                ];
                break;

            case 'PUT':
            case 'PATCH':
                return [
                //    'name' => 'required',
                ];
                break;

            default:
                break;
        }
    }
}
