<?php

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

Route::group([
  'prefix' => 'architect',
  'namespace' => 'Modules\Extranet\Http\Controllers',
  'middleware' => [
    'web',
    'auth:veos-ws',
    'roles:ROLE_SUPERADMIN,ROLE_SYSTEM',
    'DetectUserLocale'
  ],
], function() {

    // Templates
    Route::get('/template/datatable', 'TemplateController@datatable')->name('extranet.template.datatable');
    Route::get('/template/{name}', 'TemplateController@template')->name('extranet.template');

    Route::get('/roles', 'RoleController@index')->name('extranet.roles.index');
    Route::get('/roles/datatable', 'RoleController@datatable')->name('extranet.roles.datatable');
    Route::get('/roles/update', 'RoleController@update')->name('extranet.roles.update');
    Route::get('/users/roles-update', 'UserController@update')->name('extranet.users.roles.update');

    // Models
    Route::get('/models', 'ModelController@index')->name('extranet.models.index');
    Route::get('/models/create/{class}', 'ModelController@create')->name('extranet.models.create');
    Route::get('/models/{id}/show', 'ModelController@show')->name('extranet.models.show');
    Route::post('/models/store', 'ModelController@store')->name('extranet.models.store');
    Route::put('/models/{model}/update', 'ModelController@update')->name('extranet.models.update');
    Route::delete('/models/{model}/delete', 'ModelController@delete')->name('extranet.models.delete');

    // Lists
    Route::get('/sitelists', 'Admin\SiteListController@index')->name('extranet.admin.sitelists.index');
    Route::get('/sitelists/create', 'Admin\SiteListController@create')->name('extranet.admin.sitelists.create');
    Route::post('/sitelists/store', 'Admin\SiteListController@store')->name('extranet.admin.sitelists.store');
    Route::get('/sitelists/{sitelist?}', 'Admin\SiteListController@show')->name('extranet.admin.sitelists.show');
    Route::put('/sitelists/{sitelist?}/update', 'Admin\SiteListController@update')->name('extranet.admin.sitelists.update');
    Route::delete('/sitelists/{sitelist?}/delete', 'Admin\SiteListController@delete')->name('extranet.admin.sitelists.delete');


    // Elements
    Route::get('/elements', 'ElementController@index')->name('extranet.elements.index');
    Route::get('/elements/datatable', 'ElementController@getDataTable')->name('extranet.elements.datatable');
    Route::get('/elements/{element_type}', 'ElementController@typeIndex')->name('extranet.elements.typeIndex');
    Route::get('/elements/create/{element_type}/{model_id}', 'ElementController@create')->name('extranet.element.create');
    Route::get('/elements/{element}/show', 'ElementController@show')->name('extranet.elements.show');
    Route::post('/elements/store', 'ElementController@store')->name('extranet.elements.store');
    Route::put('/elements/{element}/update', 'ElementController@update')->name('extranet.elements.update');
    Route::delete('/elements/{element}/delete', 'ElementController@delete')->name('extranet.elements.delete');
    Route::get('/api/elements/data', 'ElementController@data')->name('extranet.api.elements.data');

    // Routes Parameters
    Route::get('/routes_parameters', 'RouteParameterController@index')->name('extranet.routes_parameters.index');
    Route::get('/routes_parameters/data', 'RouteParameterController@data')->name('extranet.routes_parameters.data');
    Route::get('/routes_parameters/create', 'RouteParameterController@create')->name('extranet.routes_parameters.create');
    Route::get('/routes_parameters/{route_parameter}/show', 'RouteParameterController@show')->name('extranet.routes_parameters.show');
    Route::post('/routes_parameters/store', 'RouteParameterController@store')->name('extranet.routes_parameters.store');
    Route::put('/routes_parameters/{route_parameter}/update', 'RouteParameterController@update')->name('extranet.routes_parameters.update');
    Route::delete('/routes_parameters/{route_parameter}/delete', 'RouteParameterController@delete')->name('extranet.routes_parameters.delete');

});

Route::group([
  'middleware' => ['web', 'auth:veos-ws'],
  'prefix' => 'architect',
  'namespace' => 'Modules\Extranet\Http\Controllers'
], function() {
  //update user session
  Route::post('/session','UserController@setUserSession')->name('session.update');


  Route::get('/extranet/content/{content}/parameters', 'ContentController@getContentParameters')->name('extranet.content.parameters');
  Route::get('/extranet/element/{element}/parameters', 'ElementController@getElementParameters')->name('extranet.element.parameters');
  Route::get('/extranet/element-modal/{element}', 'ElementController@getElementForModal')->name('extranet.element.modal');


  //filters
  Route::get('/extranet/filters/', 'ElementController@getFilterVariables')->name('elements.filters');

  //tables
  Route::get('/elements/{element}/export/{limit?}', 'ElementController@export')->name('table.export');
  Route::get('/extranet/{element}/model_values/data/{limit?}', 'ElementController@getModelValues')->name('extranet.element.mode_values.data');

  //form
  Route::get('/elements/select/data/{name}', 'ElementController@getSelectData')->name('elements.select.data');
  Route::get('/elements/procedures/{modelId}', 'ElementController@getFormProcedures')->name('elements.procedures');
  Route::post('/elements/form/process-service', 'ElementController@postService')->name('elements.postservice');


});

/*
|--------------------------------------------------------------------------
|   FRONT
|--------------------------------------------------------------------------
*/

Route::group([
  //'prefix' => LaravelLocalization::setLocale(),
  //'middleware' => ['web','auth:veos-ws','localeSessionRedirect', 'localeViewPath','localize'],
  'middleware' => ['web','auth:veos-ws', 'roles:ROLE_SUPERADMIN,ROLE_SYSTEM'],
  'namespace' => 'Modules\Extranet\Http\Controllers'
], function() {
    Route::get('/preview/{id}', 'ContentController@preview')->name('preview');
});


Route::group([
  //'prefix' => LaravelLocalization::setLocale(),
  'middleware' => ['web','auth:veos-ws', 'roles:ROLE_SUPERADMIN,ROLE_SYSTEM,ROLE_ADMIN,ROLE_USER'],
  'namespace' => 'Modules\Extranet\Http\Controllers'
], function() {

    Route::get(LaravelLocalization::transRoute('routes.category.index'), 'CategoryController@index')->name('blog.category.index');
    Route::get(LaravelLocalization::transRoute('routes.tag.index'), 'TagController@index')->name('blog.tag.index');
    Route::get(LaravelLocalization::transRoute('search'), 'ContentController@search')->name('front.search');

    Route::get('/', 'ContentController@index')->name('home');
    Route::get('/document/show/{id}', 'ContentController@showDocument')->name('document.show');
    Route::get('/document/show/preview/{id}', 'ContentController@showDocumentPreview')->name('document.show.preview');

    Route::get('/not-found', 'ContentController@languageNotFound')->name('language-not-found');

    // Localization to JS
    Route::get('js/lang-{locale}.js', 'LocalizationController@index')->name('messages');
    Route::get('js/localization-{locale}.js', 'LocalizationController@localization')->name('localization.js');

    Route::get('/{slug}','ContentController@show')
      ->where('slug', '([A-Za-z0-9\-\/]+)')
      ->name('content.show');
});
