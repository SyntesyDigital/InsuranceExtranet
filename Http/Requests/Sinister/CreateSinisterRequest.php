<?php

namespace Modules\Extranet\Http\Requests\Sinister;

use Illuminate\Foundation\Http\FormRequest;

use Config;

class CreateSinisterRequest extends FormRequest
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
        return Config::get('models.sinister.rules');
    }
}
