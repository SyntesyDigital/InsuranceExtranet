require('./bootstrap');

//Components
require('./components/Element/ElementApp');

//Templates
require('./components/Layout/Templates/Template1');
require('./components/Layout/Templates/Template2');
require('./components/Layout/Templates/Template3');
require('./components/Layout/Templates/Template4/Template4');

require('./components/Roles/RolesIndex');
require('./components/Roles/RolesUpdate');

require('./components/ElementsModels/ElementsModelsIndex');
require('./components/ElementsModels/FormsIndex');
require('./components/ElementsModels/FormsUpdate');

require('./components/Users/UserUpdate');
require('./components/Users/UsersIndex');

require('./components/Services/ServicesIndex');
require('./components/Services/ServiceForm');

require('./components/ElementTemplate/Template');

import { 
    default as AuthService 
} from './services/AuthService';

const auth = new AuthService(CURRENT_USER);

console.log(auth.getRole());


