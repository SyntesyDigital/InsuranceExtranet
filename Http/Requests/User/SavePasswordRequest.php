<?php

namespace Modules\Extranet\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class SavePasswordRequest extends FormRequest
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
        return [
            // 'password' => 'required',
            // 'password_confirm' => 'required',
        ];
    }
}
