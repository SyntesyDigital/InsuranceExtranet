

import {isDefined} from './parameters';

/**
 * Iterate all layout and return a list of element fields by row stage if defined
 * @param {*} layout 
 */
export function getFieldsByStage(layout){
      
    var result = parseNode(layout,{},null);

    //console.log("getFieldsByStage :: ",layout,result);
    return result;
}

export function parseNode(nodes,result,parentStage) {
    for(var key in nodes){

        var node = nodes[key];

        switch (node.type) {
            case "row":

                //get current stage
                var stage = isDefined(parentStage) ? parentStage : null;
                if(!isDefined(stage)){
                    stage = isDefined(node.settings.stage) ? node.settings.stage : null ;
                }

                //console.log("getFieldsByStage :: row found : (node,parentStage,stage)",node,stage,result);

                if(node.children != null){
                    result = parseNode(
                        node.children,
                        result,
                        stage
                    )
                }
                break;

            case "col":
                if(node.children != null ){
                    result = parseNode(
                        node.children,
                        result,
                        parentStage
                    )
                }
                break;
            default:
                    
                //add field
                if(parentStage == null){
                    console.error("getFieldsByStage :: parent stage not defined. Please add all fields into stage.")
                }

                if(!isDefined(result[parentStage])){
                    result[parentStage] = [];
                }
                //if type is element_field ad to array
                if(node.type == "element_field"){
                    result[parentStage].push(node.field);
                }

                //console.log("getFieldsByStage :: field found : (node,parentStage,result)",node,parentStage,result);
        }
    }


    return result;
}
