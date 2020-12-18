
import {
    validateField,
    isVisible
} from '../functions';


export default class LayoutValidator {

    constructor() {
        
    }

    checkVisibility(field,values,formParameters,stageParameter) {

        //parameters update after submit and process forms
        return isVisible(
            field,
            formParameters,
            values,
            stageParameter
        );

    }

    validateNode(nodes,errors,values,formParameters,stageParameter) {

        
        for( var key in nodes){
            var node = nodes[key];

            switch (node.type) {
                case "row":
                    // console.log("parseNode :: row (node)", node);

                    if (this.checkVisibility(node,values,formParameters,stageParameter)){
                        if(node.children != null) {
                            errors = this.validateNode(
                                    node.children,
                                    errors,
                                    values,
                                    formParameters,
                                    stageParameter
                                );
                        }
                    }

                    break;

                case "col":
                    // console.log("parseNode :: col (node)", node.settings.boxClass);

                    if (this.checkVisibility(node,values,formParameters,stageParameter)){
                        if(node.children != null) {
                            errors = this.validateNode(
                                    node.children,
                                    errors,
                                    values,
                                    formParameters,
                                    stageParameter
                                );
                        }   
                    }
                    break;

                default:

                    if (this.checkVisibility(node.field,values,formParameters,stageParameter)){
                        if (node.type == 'element_field') {

                            var valid = validateField(node.field, values);
                            
                            if (!valid)
                                errors[node.field.identifier] = true;

                        }
                    }
                    break;
            }
        }

        return errors;
    }

    validateLayout(layout,values,formParameters,stageParameter) {
        var errors = {};

        return this.validateNode(layout,errors,values,formParameters,stageParameter);
    }

    /**
     * Validate array of fields when layout is not set
     * 
     * @param {*} fields 
     * @param {*} values 
     */
    validateFields(fields,values,formParameters) {

        var errors = {};
        
        for (var key in fields) {
            var field = fields[key];

            var valid = validateField(field, values);
            var visible = isVisible(
                field, 
                formParameters, 
                values
            );

            //if the field is not visible, is always valid
            if (!visible) {
                valid = true;
            }

            if (!valid)
                errors[field.identifier] = true;
        }

        return errors;
    }
}