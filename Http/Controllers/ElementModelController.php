<?php

namespace Modules\Extranet\Http\Controllers;

use Illuminate\Http\Request;

class ElementModelController extends Controller
{
    public function index(Request $request)
    {
        return view('extranet::elements-models.index');
    }

    public function show(Request $request)
    {
        return view('extranet::elements-models.forms.index');
    }

    public function update(Request $request, $id)
    {
        return view('extranet::elements-models.forms.update');
    }

    public function create(Request $request)
    {
        return view('extranet::elements-models.forms.update');
    }
}
