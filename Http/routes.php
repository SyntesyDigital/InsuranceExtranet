<?php

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

Route::group([
  'middleware' => ['web', 'auth:veos-ws', 'roles:ROLE_SUPERADMIN,ROLE_SYSTEM', 'DetectUserLocale'],
  'prefix' => 'architect',
  'namespace' => 'Modules\Extranet\Http\Controllers'
], function() {

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
    Route::get('/elements/{element_type}', 'ElementController@typeIndex')->name('extranet.elements.typeIndex');
    Route::get('/elements/create/{element_type}/{model_id}', 'ElementController@create')->name('extranet.element.create');
    Route::get('/elements/{element}/show', 'ElementController@show')->name('extranet.elements.show');
    Route::post('/elements/store', 'ElementController@store')->name('extranet.elements.store');
    Route::put('/elements/{element}/update', 'ElementController@update')->name('extranet.elements.update');
    Route::delete('/elements/{element}/delete', 'ElementController@delete')->name('extranet.elements.delete');

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


  //tables
  Route::get('/elements/{element}/export/{limit?}', 'ElementController@export')->name('table.export');
  Route::get('/extranet/{element}/model_values/data/{limit?}', 'ElementController@getModelValues')->name('extranet.element.mode_values.data');

  //form
  Route::get('/elements/select/data/{name}', 'ElementController@getSelectData')->name('elements.select.data');
  Route::get('/elements/procedures/{modelId}', 'ElementController@getFormProcedures')->name('elements.procedures');
  Route::post('/elements/form/process-service', 'ElementController@postService')->name('elements.postservice');
});
