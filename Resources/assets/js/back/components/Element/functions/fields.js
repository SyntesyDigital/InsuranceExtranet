
/*
*   Relations between elements that don't implement this settings.
*/
const TABLE_V1 = "table";
const TABLE_V2 = "table-v2";
const FILE_V1 = "file";
const FILE_V2 = "file-v2";
const FORM_V1 = "form";
const FORM_V2 = "form-v2";

export const SETTINGS_AVOID = {
  //rules
  'required': [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
  'minCharacters': [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
  'maxCharacters': [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
  'searchable': [FORM_V1,FILE_V1,FORM_V2,FILE_V2],
  'sortable': [FORM_V1,FILE_V1,FORM_V2,FILE_V2],
  'sortableByDefault': [FORM_V1,FILE_V1,FORM_V2,FILE_V2],
  'maxDate' : [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
  'minDate' : [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
  'minNumber' : [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2], 
  'maxNumber' : [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
  //settings
  //'format' : [FORM_V1],
  'maxLength' : [FORM_V1,FORM_V2],
  'hasRoute' : [FORM_V1,FORM_V2],
  'hasModal' : [FORM_V1,FILE_V1,FORM_V2,FILE_V2],
  'conditionalVisibility' : [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
  'defaultValue' : [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
  'columnWidth' : [FORM_V1,FILE_V1,FORM_V2,FILE_V2],
  'operation' : [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
  'readonly' : [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
  'iframe' : [TABLE_V1,FORM_V1,TABLE_V2,FORM_V2],
  'group' : [FORM_V1,FILE_V1,FORM_V2,FILE_V2],
  'description' : [TABLE_V1,TABLE_V2],
  'hidden' : [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
  'isFile' : [FORM_V1,FILE_V1,FORM_V2,FILE_V2],
  'isFileWSFusion' : [FORM_V1,FILE_V1,FORM_V2,FILE_V2],
  'addElement' : [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
  'placeholder' : [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
  'hidelabel' : [TABLE_V1,FILE_V1,TABLE_V2,FILE_V2],
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

  //if is a list item, add fields into settings.fields
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

/**
 *   Widget configuration can be changed because some settings or $rule
 *   added directly to PHP. It's necessary to update the json stored in BBDD
 *   to update the avialabe settings, and modifiy if necessary
 */
export function updateSettingsFromConfig(field,elementType) {

      var config = MODELS_FIELDS[field.type];
      config = config == null ? MODELS_CUSTOM_FIELDS[field.type] : config;

      if(config == null){
          return field;
      }

      console.log("updateSettingsFromConfig :: (field,config)",field,config);

      if(config.rules !== undefined ) {
          for(var id in config.rules){
              var rule = config.rules[id];
              if(checkIfSettingsAllowed(rule,elementType) 
                && field.rules[rule] === undefined){
                field.rules[rule] = null;
              }
          }
      }
      
      if(config.settings !== undefined ) {
          for(var id in config.settings){
              var setting = config.settings[id];
              console.log("updateSettingsFromConfig :: (checkIfSettingsAllowed(setting,elementType",setting,elementType,checkIfSettingsAllowed(setting,elementType));
              if(checkIfSettingsAllowed(setting,elementType) 
                && field.settings[setting] === undefined){
                field.settings[setting] = null;
              }
          }
      }

      return field;
  }