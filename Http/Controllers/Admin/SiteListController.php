<?php

namespace Modules\Extranet\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Modules\Extranet\Http\Requests\Admin\Tools\SiteList\CreateSiteListRequest;
use Modules\Extranet\Http\Requests\Admin\Tools\SiteList\UpdateSiteListRequest;
use Modules\Extranet\Jobs\Tools\SiteList\CreateSiteList;
use Modules\Extranet\Jobs\Tools\SiteList\DeleteSiteList;
use Modules\Extranet\Jobs\Tools\SiteList\UpdateSiteList;
use Modules\Extranet\Entities\Tools\SiteList;
use Illuminate\Http\Request;
use Session;

class SiteListController extends Controller
{
    public function index(Request $request)
    {
        return view('extranet::admin.sitelists.index', [
            'sitelists' => SiteList::where('type', '!=', 'documents')->paginate(20),
        ]);
    }

    public function create(Request $request)
    {
        return view('extranet::admin.sitelists.form');
    }

    public function store(CreateSiteListRequest $request)
    {
        try {
            $sitelist = $this->dispatchNow(CreateSiteList::fromRequest($request));
            Session::flash('notify_success', 'Enregistrement effectué avec succès');

            return redirect()->route('extranet.admin.sitelists.show', $sitelist);
        } catch (\Exception $e) {
            Session::flash('notify_error', $e->getMessage());
        }

        return redirect()->route('extranet.admin.sitelists.create');
    }

    public function show($id, Request $request)
    {
        return view('extranet::admin.sitelists.form', [
            'sitelist' => SiteList::find($id),
        ]);
    }

    public function update(SiteList $sitelist, UpdateSiteListRequest $request)
    {
        try {
            $this->dispatchNow(UpdateSiteList::fromRequest($sitelist, $request));
            Session::flash('notify_success', 'Enregistrement effectué avec succès');
        } catch (\Exception $e) {
            Session::flash('notify_error', $e->getMessage());
        }

        return redirect()->route('extranet.admin.sitelists.show', $sitelist);
    }

    public function delete(SiteList $sitelist)
    {
        return $this->dispatchNow(new DeleteSiteList($sitelist)) ? response()->json([
            'success' => true
        ]) : response()->json([
            'success' => false
        ], 500);
    }
}
