
import {services} from './models/services';
import {elementModel} from './models/elementmodels';
import {procedures} from './models/modelProcedure';
import {fields} from './models/modelFields';
import {elementTemplates} from './models/elementTemplates';
import {elementTemplatesFields} from './models/elementTemplatesFields';

let api = {
    services : services,
    elementModel : elementModel,
    procedures : procedures,
    fields : fields,
    elementTemplates : elementTemplates,
    elementTemplatesFields : elementTemplatesFields
};

export default api;

