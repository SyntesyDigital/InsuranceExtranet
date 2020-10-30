<?php

namespace Modules\Extranet\Rules\Request;

use Illuminate\Contracts\Validation\Rule;
use Modules\Extranet\Rules\String\ContainLowerCaseChar;
use Modules\Extranet\Rules\String\ContainNumberChar;
use Modules\Extranet\Rules\String\ContainNumberOfChars;
use Modules\Extranet\Rules\String\ContainSpecialChar;
use Modules\Extranet\Rules\String\ContainUpperCaseChar;

class PasswordPolicyRule implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed  $value
     *
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $this->errors = [];

        if (!get_config('PASSWORD_RULES_ENABLED')) {
            return true;
        }

        if (!ContainNumberOfChars::satisfy($value, get_config('PASSWORD_RULE_MINLENGTH'))) {
            $this->error = sprintf('doit contenir un minimum de %s caractères', get_config('PASSWORD_RULE_MINLENGTH'));

            return false;
        }

        $rules = $this->checkSatisfiedRules([
            'PASSWORD_RULE_UPPERCASE' => [
                'class' => ContainUpperCaseChar::class,
                'satisfied' => false,
                'label' => 'une majuscule',
            ],
            'PASSWORD_RULE_LOWERCASE' => [
                'class' => ContainLowerCaseChar::class,
                'satisfied' => false,
                'label' => 'une minuscule',
            ],
            'PASSWORD_RULE_NUMBER' => [
                'class' => ContainNumberChar::class,
                'satisfied' => false,
                'label' => 'un chiffre',
            ],
            'PASSWORD_RULE_SPECIAL' => [
                'class' => ContainSpecialChar::class,
                'satisfied' => false,
                'label' => 'un caractère spéciale',
            ],
        ], $value);

        if ($this->getSatisfied($rules) < get_config('PASSWORD_MIN_RULES_TO_SATISFY')) {
            $labels = collect($rules)->reduce(function ($carry, $rule) {
                $carry[] = $rule['label'];

                return $carry;
            }, []);

            $this->error = sprintf(
                'doit contenir au moins %s de ces règles : %s',
                get_config('PASSWORD_MIN_RULES_TO_SATISFY'),
                implode(', ', $labels)
            );

            return false;
        }

        return true;
    }

    private function checkSatisfiedRules($list, $value)
    {
        return collect($list)->map(function ($rule, $key) use ($value) {
            switch ($key) {
                case 'PASSWORD_RULE_MINLENGTH':
                    $rule['satisfied'] = $rule['class']::satisfy($value, get_config($key));
                break;

                default:
                    $rule['satisfied'] = $rule['class']::satisfy($value);
                break;
            }

            if (get_config($key)) {
                return $rule;
            }
        });
    }

    private function getSatisfied($rules)
    {
        $satisfedRules = 0;
        foreach ($rules as $rule) {
            if ($rule['satisfied']) {
                ++$satisfedRules;
            }
        }

        return $satisfedRules;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Le champs :attribute '.$this->error;
    }
}
