import moment from 'moment';


/**
 * Same funciont as php number_format. Process number decimals.
 * 
 * @param {*} number 
 * @param {*} decimals 
 * @param {*} dec_point 
 * @param {*} thousands_sep 
 */
export function numberFormat (number, decimals, dec_point, thousands_sep) {
  // Strip all characters but numerical ones.
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
          var k = Math.pow(10, prec);
          return '' + Math.round(n * k) / k;
      };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

/**
 * Parse number following field settings format. 
 * 
 * @param {*} value 
 * @param {*} field 
 */
export function parseNumber(value,field) {

  if(value !== undefined && value != ""){

    var hideCurrency = field.settings.hideCurrency !== undefined 
      ? field.settings.hideCurrency : false;

    var currency = hideCurrency ? "" : "€";

    if(field.settings !== undefined && field.settings.format !== undefined){
      switch(field.settings.format) {
        case 'price':
          value = numberFormat(value, 0, ',', '.') + currency;
          break;
        case 'price_with_decimals':
          value = numberFormat(value, 2, ',', '.') + currency;
          break;
        case 'price_with_decimals_2':
          value = numberFormat(value, 2, '.', ' ') + currency;
          break;
      }
    }
  }
  
  return value;

}



/**
 * Parse date following date format.
 * 
 * @param {*} value 
 * @param {*} field 
 */
export function parseDate(value,field) {
  if(value !== undefined && value != "" && null !== value){

    if(field.settings !== undefined && field.settings.format !== undefined && field.settings.format != null){
      switch(field.settings.format) {
        case 'day_month_year':
          value = moment.unix(value).format('DD/MM/YYYY');
          break;
        case 'day_month_year_2':
          value = moment.unix(value).format('DD-MM-YYYY');
          break;
        case 'month_year':
          value = moment.unix(value).format('MM/YYYY');
          break;
        case 'year':
          value = moment.unix(value).format('YYYY');
          break;
        case 'hour':
          value = moment.unix(value).format('HH:mm');
          break;
        case 'day_month_year_hour':
          value = moment.unix(value).format('DD/MM/YYYY HH:mm');
          break;
      }
    }else{
      value = moment.unix(value).format('DD/MM/YYYY')
    }
  }else{
    value = '';
  }

  return value;
}

/**
 * Check if there is conditional formating and process the value
 * 
 * @param {*} field 
 * @param {*} value 
 */
export function getConditionalFormating(field,value) {


  if(value === undefined || value == null || value == ""){
    return {};
  }

  if(typeof value === 'string' || value instanceof String)
    value = value.toLowerCase();
  
  if(field.settings.conditionalFormatting !== undefined && 
    field.settings.conditionalFormatting != null) {
    
    for(var key in field.settings.conditionalFormatting.conditions){
      var condition = field.settings.conditionalFormatting.conditions[key];
      if(value.indexOf(condition.value.toLowerCase()) != -1) {
        //if the string is contained in the string
        return {
          color : condition.color,
          backgroundColor : condition.backgroundColor,
        };
      }
    }
  }

  return {};
}

/**
 * Check if ther eis conditional formating
 * @param {*} conditionalFormatting 
 */
export function hasConditionalFormatting(conditionalFormatting) {
  if(conditionalFormatting.color !== undefined){
    return true;
  }
  return false;
}

/**
 * 
 */
export function getTextAlign(field) {
  var textAlign = "";
  if(field.settings.textAlign !== undefined && field.settings.textAlign != null) {
    textAlign='text-'+field.settings.textAlign;
  }
  return textAlign;
}
