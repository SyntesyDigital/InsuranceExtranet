
import {services} from './models/services';
import {elementModel} from './models/elementmodels';
import {procedures} from './models/modelProcedure';
import {fields} from './models/modelFields';

let api = {
    services : services,
    elementModel : elementModel,
    procedures : procedures,
    fields : fields
};

export default api;

