<?php

Route::post('/create', 'AutosaveController@create')->name('create');
Route::post('/update', 'AutosaveController@update')->name('update');
Route::post('/read', 'AutosaveController@read')->name('read');
Route::post('/delete', 'AutosaveController@delete')->name('delete');

