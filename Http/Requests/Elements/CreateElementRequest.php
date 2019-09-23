<?php

namespace Modules\Extranet\Http\Requests\Elements;

use Illuminate\Foundation\Http\FormRequest;

class CreateElementRequest extends FormRequest
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
                    'name' => 'required',
                    'identifier' => 'required|unique:elements'
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
