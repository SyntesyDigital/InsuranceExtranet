<?php

namespace Modules\Extranet\Services;

use Modules\Extranet\Entities\Customer;
use Modules\Extranet\Entities\Tools\SiteList;
use Collective\Html\FormBuilder;
use Form;

class MacrosService extends FormBuilder
{
    public function customers($name, $selected = null, $options = [])
    {
        $customers = Customer::get()
            ->mapWithKeys(function ($item, $key) {
                return [
                    $item->id => $item->name,
                ];
            });

        return Form::select($name, $customers, $selected, $options);
    }

    public function users($roles, $name, $selected = null, $options = [])
    {
        $users = app('Modules\Extranet\Repositories\UserRepository');

        $recruiters = $users->getAllByRoles($roles)
            ->mapWithKeys(function ($item, $key) {
                return [
                    $item->id => $item->full_name,
                ];
            });

        return Form::select($name, $recruiters, $selected, $options);
    }

    public function siteList($identifier, $name, $selected = null, $options = [], $showType = '')
    {
        $list = SiteList::where('identifier', $identifier)->first();

        if (! $list) {
            return false;
        }

        $values = collect(json_decode($list->value, true))->mapWithKeys(function ($item, $key) {
            return [$item['value'] => $item['name']];
        });

        if ('' == $showType) {
            $showType = $list->type;
        }

        switch ($showType) {
            case 'radios':
                    $html = null;
                    $html .= '<div class="radio">';
                    foreach ($values as $v => $k) {
                        $html .= '<label>';
                        $html .= Form::radio($name, $v, is_array($v) ? in_array($v, $selected) : ($selected == $v));
                        $html .= $k;
                        $html .= '</label>';
                    }
                    $html .= '</div>';

                    return $html;
                break;

            case 'checkbox':
                    $html = null;

                    $html .= '<div class="checkbox">';
                    foreach ($values as $v => $k) {
                        $html .= '<label>';
                        $html .= Form::checkbox($name.'[]', $v, is_array($selected) ? in_array($v, $selected) : ($selected == $v));
                        $html .= $k;
                        $html .= '</label>';
                        $html .= '<br />';
                    }
                    $html .= '</div>';

                    return $html;
                break;

            case 'inline-checkbox':
                $html = null;
                $html .= '<div class="checkbox">';
                $i = 1;
                foreach ($values as $v => $k) {
                    $html .= Form::checkbox($name.'[]', $v, is_array($selected) ? in_array($v, $selected) : ($selected == $v), ['class' => 'css-checkbox',
                                                                                                                                'id' => 'filter_check_'.$i,
                                                                                                                                'type' => 'checkbox', ]);
                    $html .= '<label for="filter_check_'.$i.'" class="css-label" style="background-image:url('.asset('images/lite-x-black.jpg').')">'.$k.'</label>';
                    ++$i;
                }
                $html .= '</div>';

                return $html;
            break;

            default:
                return Form::select($name, $values->toArray(), $selected, $options);
                break;
        }
    }
}
