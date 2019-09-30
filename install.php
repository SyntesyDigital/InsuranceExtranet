<?php 

// --------------------------------------------------------------------- //
//
//      Insurrance Extranet installer
//
//      Author : nicolas.delcastillo@syntesy.io
//
// --------------------------------------------------------------------- //


// --------------------------------------------------------------------- //
//      DB MIGRATION
// --------------------------------------------------------------------- //
echo PHP_EOL;
echo "-> Migrate DB for module " . basename(__DIR__) . PHP_EOL;
exec('php artisan module:migrate ' . basename(__DIR__));
// --------------------------------------------------------------------- //


// --------------------------------------------------------------------- //
//      ASSETS BUILDING
// --------------------------------------------------------------------- //
echo PHP_EOL;
echo "Would you want to build assets for production (prod) or development (dev) ? ";
$handle = fopen ("php://stdin","r");
$env = trim(fgets($handle)) == 'prod' ? 'prod' : 'dev';
echo "-> Buidling $env assets for module " . basename(__DIR__) . PHP_EOL;
exec("npm run $env");
// --------------------------------------------------------------------- //

// --------------------------------------------------------------------- //		
 //      CONFIGURE PROD WS		
 // --------------------------------------------------------------------- //		
 echo PHP_EOL;		
 echo "Enter the webservice URL for production ? ";		
 $handle = fopen ("php://stdin","r");		
 $url = trim(fgets($handle));		
 if(updateEnv('WS_URL', $url) !== false) {		
     echo "-> OK";		
 }		
 // --------------------------------------------------------------------- //		
		
		
 // --------------------------------------------------------------------- //		
 //      CONFIGURE TEST WS		
 // --------------------------------------------------------------------- //		
 echo PHP_EOL;		
 echo "Enter the webservice URL for test ? ";		
 $handle = fopen ("php://stdin","r");		
 $url = trim(fgets($handle));		
 if(updateEnv('WS_URL_TEST', $url) !== false) {		
     echo "-> OK";		
 }		
 // --------------------------------------------------------------------- //		
		
		
 // --------------------------------------------------------------------- //		
 //      CONFIGURE TEST WS		
 // --------------------------------------------------------------------- //		
 echo PHP_EOL;		
 echo "Enter the webservice URL for recette ? ";		
 $handle = fopen ("php://stdin","r");		
 $url = trim(fgets($handle));		
 if(updateEnv('WS_URL_REC', $url) !== false) {		
     echo " -> OK";		
 }		
 echo PHP_EOL;		
 // --------------------------------------------------------------------- //

 
echo PHP_EOL;