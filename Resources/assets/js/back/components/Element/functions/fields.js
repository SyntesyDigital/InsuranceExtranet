
/*
* Transform an object to
*/
export function exploteToObject(fields,elementType) {

  if(fields == null){
    return null;
  }

  var result = {};

  for(var i=0;i<fields.length;i++){
    if((fields[i] != 'searchable' &&  fields[i] != 'sortable') || exploteToObject == 'table'){
      result[fields[i]] = null;
    }
  }
  return result;
}

/**
*   Process all field information, to add it from fieldsList, to fields.
*/
export function getFieldToAdd(field,id,elementType) {

  var settings = exploteToObject(field.settings,elementType);
  var rules = exploteToObject(field.rules,elementType);

  if(field.fields != null){
    settings.fields = field.fields;
  }

  if(rules['required'] !== undefined){
    rules['required'] = field.required;
  }

  var field = {
    id : id,
    type : field.type,
    name : field.name,
    identifier : field.identifier,
    icon : field.icon,
    saved : false,
    editable : true,
    rules : rules,
    boby : field.boby,
    settings : settings,
    modelDefinition : field
  };

  return field;

}
