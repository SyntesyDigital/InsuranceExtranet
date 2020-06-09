
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

//libs
require('./libs/jquery-ui-1.12.1/jquery-ui.min.js');
require('./libs/slick/slick.js');
require('./libs/tweenMax/tweenmax.js');

//require('./components/Home');
require('./components/Fields/MapField');
require('./components/Widgets/ElementFile');
require('./components/Widgets/Table/ElementTable');
require('./components/Widgets/ElementForm');
require('./components/Widgets/ElementFormV2');
require('./components/Widgets/ElementFormButton');
require('./components/Widgets/ElementFormPreload');
require('./components/Widgets/TotalBox');
require('./components/Widgets/FormTemp/FormComponentTemp');
require('./components/Widgets/ElementCard/ElementCard');
require('./components/Widgets/ImageText/ImageTextLinkContainer');
require('./components/Widgets/ImageText/ImageTextLinkList');

//Lists
require('./components/Widgets/Lists/MissingDocuments/MissingDocuments');
require('./components/Widgets/Lists/TableDocument/TableDocument');
require('./components/Widgets/Lists/TableList/TableList');
 
import { 
    default as UserSessionService 
} from './../services/UserSessionService';

const userSession = new UserSessionService(SESSION !== undefined ? SESSION : {});