<?php

namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;

class ElementModelController extends Controller
{
    public function index(Request $request)
    {
        return view('extranet::elements-models.index');
    }

    public function show($type, Request $request)
    {
        return view('extranet::elements-models.forms.index', [
            'type' => $type,
        ]);
    }

    public function update($type, $id, Request $request)
    {
        return view('extranet::elements-models.forms.update', [
            'id' => $id,
            'type' => $type,
        ]);
    }

    public function create($type, Request $request)
    {
        return view('extranet::elements-models.forms.update', [
            'type' => $type,
        ]);
    }
}
