
import {services} from './models/services';
import {elementModel} from './models/elementmodels';
import {procedures} from './models/modelProcedure';
import {fields} from './models/modelFields';
import {elementTemplates} from './models/elementTemplates';
import {elementTemplatesFields} from './models/elementTemplatesFields';
import {exportImport} from './services/exportImport';
import {permissions} from './models/permissions';
import {roles} from './models/roles';
import {users} from './models/users';

let api = {
    services : services,
    elementModel : elementModel,
    procedures : procedures,
    fields : fields,
    elementTemplates : elementTemplates,
    elementTemplatesFields : elementTemplatesFields,
    exportImport : exportImport,
    permissions : permissions,
    roles : roles,
    users : users
};

export default api;

