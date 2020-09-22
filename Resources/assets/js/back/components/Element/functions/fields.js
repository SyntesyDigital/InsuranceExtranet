
/*
*   Relations between elements that don't implement this settings.
*/
export const SETTINGS_AVOID = {
  //rules
  'required': ['table','file'],
  'minCharacters': ['table','file'],
  'maxCharacters': ['table','file'],
  'searchable': ['form','file','form-v2'],
  'sortable': ['form','file','form-v2'],
  'sortableByDefault': ['form','file','form-v2'],
  'maxDate' : ['table','file'],
  'minDate' : ['table','file'],
  'minNumber' : ['table','file'], 
  'maxNumber' : ['table','file'],
  //settings
  //'format' : ['form'],
  'maxLength' : ['form','form-v2'],
  'hasRoute' : ['form','form-v2'],
  'hasModal' : ['form','file','form-v2'],
  'conditionalVisibility' : ['table','file'],
  'defaultValue' : ['table','file'],
  'columnWidth' : ['form','file','form-v2'],
  'operation' : ['table','file'],
  'readonly' : ['table','file'],
  'iframe' : ['file'],

};

/*
*   If the key has the element type into SETTINGS_AVOID then it's not allowed
*/
export function checkIfSettingsAllowed(key, elementType) {

  if(SETTINGS_AVOID[key] !== undefined && SETTINGS_AVOID[key].indexOf(elementType) != -1){
    return false;
  }
  return true;

}


/*
* Transform an array to object with null values.
*/
export function exploteToObject(fields,elementType) {

  if(fields == null){
    return null;
  }

  var result = {};

  for(var i=0;i<fields.length;i++){
    if(checkIfSettingsAllowed(fields[i],elementType)){
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

  //console.log("Rules => ",rules);

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

/*
*   Functions to merge field settings from its definition to
*   to field. Applied when modal is open.
*/
export function mergeFieldSettings(field,modelField,elementType) {
  //console.log("Merge => ,",field," => ",modelField);

  //if is array means this is an old configuration. Not possible to be array
  if(Array.isArray(field.settings))
    field.settings = {}

  //console.log("mergeFieldSettings :: field settings vale => ",field.settings);

  if(modelField.rules !== undefined){
    for(var key in modelField.rules){
      if(field.rules[modelField.rules[key]] === undefined &&
        checkIfSettingsAllowed(modelField.rules[key],elementType)){
        field.rules[modelField.rules[key]] = null;
      }
    }
  }

  if(modelField.settings !== undefined){
    for(var key in modelField.settings){
      if(field.settings[modelField.settings[key]] === undefined &&
        checkIfSettingsAllowed(modelField.settings[key],elementType)){
        field.settings[modelField.settings[key]] = null;
      }
    }
  }

  return field;
}

/*
*   Iterate through all fields to get all required fields and add
*   them automatically to dropzone.
*/
export function getRequiredFields(fieldsList,elementType) {

  var fields = [];

  for(var i=0;i<fieldsList.length;i++) {

    var field = fieldsList[i];

    if(field.required) {
      var settings = exploteToObject(field.settings,elementType);
  		var rules = exploteToObject(field.rules,elementType);

  		if(field.fields != null){
  			settings.fields = field.fields;
  		}

  		if(rules['required'] !== undefined){
  			rules['required'] = field.required;
  		}
      fieldsList[i].added = true;

      fields.push(getFieldToAdd(field,i + 1,elementType));
    }
  }

  return fields;

}

/*
*   Returns format depending on settings format
*/
export function getDatepickerFormat(format) {

  switch (format) {
    case 'day_month_year':
      return 'DD/MM/YYYY';
    case 'day_month_year_2':
      return 'DD-MM-YYYY';
    case 'month_year':
      return 'MM/YYYY';
    case 'year':
      return 'YYYY';
    case 'hour':
      return 'HH:mm';
    default:
      return 'DD/MM/YYYY';
  }

}
