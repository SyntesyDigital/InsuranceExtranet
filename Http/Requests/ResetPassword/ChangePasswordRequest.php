<?php

namespace Modules\Extranet\Http\Requests\ResetPassword;

use Illuminate\Foundation\Http\FormRequest;
use Modules\Extranet\Rules\Request\PasswordPolicyRule;

class ChangePasswordRequest extends FormRequest
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
            'password' => ['required', 'confirmed', new PasswordPolicyRule()],
        ];
    }
}
