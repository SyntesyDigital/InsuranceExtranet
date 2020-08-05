import React, {Component} from 'react';
import { render } from 'react-dom';

class NumberField extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      addClassBordered: false,
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    //si es campo operacion
    if(this.props.field.settings.operation !== undefined && this.props.field.settings.operation !== null && this.props.field.settings.operation !== ''){
      var max = this.getMaxValue();
      var min = this.getMinValue();
      console.log('VALOR ACTUAL', this.props.value );
      console.log('VALOR ANTIGUO', prevProps.value );
      //si ha cambiado el mismo campo operacion (caso ediciona mano)
      if(this.props.value !== prevProps.value){
      //miro si no es minimo o maximo i compruebo si para dejar el minimo o maximo
        if(result < min || result > max){
          if(result < min){
            console.log('es menor que el minimo');
            /* this.props.onFieldChange({
              name : this.props.field.identifier,
              value :min
            });*/
          }else{
            console.log('es mayor que el maximo');

            /* this.props.onFieldChange({
              name : this.props.field.identifier,
              value :max
            });*/
          }
        }
      }else{
        //si ha cambiado alguna otra cosa del props, otro campo
        var formule = this.props.field.settings.operation;
        var params = formule.match(/[^[\]]+(?=])/g);
        for(var key in params){
          var id = params[key];
          var value = this.props.values[id] !== undefined  && this.props.values[id] !== null && this.props.values[id] !== ''?this.props.values[id]:'0'; 
          formule = formule.replace('['+id+']',value);
        }
        var result = eval(formule);

        console.log('RESULT FORMULA',result);
        //si el valor actal del campo formula no coincide con la formula calculada
        if(this.props.value != result){
          //check si sobrepasa al maximo o minimo
          if(result < min || result > max){
            console.log('RESULT ES MENOR QUE MIN',result < min);
            console.log('VALOR ACTUAL NO ES MIN YA',this.props.value !== min);

            if(result < min ){
              console.log('modifico el valor por min',min);
              if(this.props.value !== min){
                this.props.onFieldChange({
                  name : this.props.field.identifier,
                  value :min
                });
              } 
            }else{
              if(this.props.value !== max){
                console.log('modifico el valor por max',max);

                this.props.onFieldChange({
                  name : this.props.field.identifier,
                  value :max
                });
              }  
            }
          }else{
            console.log('modifico el valor por result',result);

            this.props.onFieldChange({
              name : this.props.field.identifier,
              value :result
            });
          }
        }
      }

    }
    

  }

  // ==============================
  // Handlers
  // ==============================

  handleBlur(e){
    this.setState({ 
      addClassBordered: false 
    });
  }

  handleFocus(e){
    this.setState({ 
      addClassBordered: true
    });
  }

  handleFocus(e){
      if (e.target.value != '') {
          this.setState({ 
              addClassBordered: false
          });
      }else{
          this.setState({ 
              addClassBordered: true
          });
      }
  }  

  handleOnChange(event)
  {

    var value = parseInt(event.target.value);
    var max = this.getMaxValue();
    var min = this.getMinValue();

    console.log("Number Field :: handleOnChange (value,max,min,name)",value,max,min,event.target.name);

    if(isNaN(value)){
      this.props.onFieldChange({
        name : event.target.name,
        value : ''
      });
      return;
    }

    if(min !== '' && value < min){
      return;
    }
    if(max !== '' && value > max){
      return;
    }

    this.props.onFieldChange({
      name : event.target.name,
      value : event.target.value
    });

  }

  getNumberFromRules(key) {
    const {rules} = this.props.field;
    
    if(rules[key] !== undefined && rules[key] != null && rules[key] != '' ){
      return rules[key];
    }

    return '';
  }

  getMinValue(){
    var min = parseInt(this.getNumberFromRules('minNumber'));
    return min === 0 || (min && min !== "")? min : -Number.MAX_VALUE;
  }

  getMaxValue(){
    var max = parseInt(this.getNumberFromRules('maxNumber'));
    return max === 0 || (max && max !== "") ? max : Number.MAX_VALUE;
  }

  getPlaceholder() {
    var max = this.getNumberFromRules('maxNumber');
    var min = this.getNumberFromRules('minNumber');

    if(max == '' && min == '')
      return '';

    var result = '';

    result += (min != '' ) ? 'minimum '+min+' ' : '';
    result += (min != '' && max != '') ? ', ' : '';
    result += (max != '' ) ? 'maximum '+max+' ' : '';
    

    return result;

  }

  render() {

    const {field} = this.props;
    const errors = this.props.error ? ' has-error' : '';
    let isRequired = field.rules.required !== undefined ?
      field.rules.required : false;

    //required can be set also directly with modals
    if(this.props.isModal !== undefined && this.props.isModal &&
      field.required !== undefined){
      isRequired = field.required;
    }

    let textFieldClass = ["text-field"];
    if (this.state.addClassBordered || this.props.value != "") {
        textFieldClass.push('bordered');
    }

    return (

      <div className={"form-group bmd-form-group" + (errors)}>
        <label className="bmd-label-floating">
            {field.name} 
            {isRequired &&
              <span className="required">&nbsp; *</span>
            }
        </label>
        {!this.props.field.settings.readonly &&
            <input type="number" name={field.identifier}
            className={"form-control " + (textFieldClass.join(' '))}
            value={this.props.value}
            max={this.getNumberFromRules('maxNumber')}
            min={this.getNumberFromRules('minNumber')}
            onChange={this.handleOnChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            placeholder={this.getPlaceholder()}
          />
        }


      {this.props.field.settings.readonly &&
         <input type="number" name={field.identifier}
         className={"form-control " + (textFieldClass.join(' '))}
         value={this.props.value}
         max={this.getNumberFromRules('maxNumber')}
         min={this.getNumberFromRules('minNumber')}
         onChange={this.handleOnChange.bind(this)}
         onBlur={this.handleBlur.bind(this)}
         onFocus={this.handleFocus.bind(this)}
         placeholder={this.getPlaceholder()}
         readonly="readonly"
       />
      }

       
      </div>
    );
  }

}

export default NumberField;
