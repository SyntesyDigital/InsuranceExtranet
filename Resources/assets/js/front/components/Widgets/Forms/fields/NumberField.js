import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import LabelTooltip from '../../../Common/LabelTooltip';
import CustomIcon from './../../../Common/CustomIcon';
import {
    CONDITION_FIELD_TYPE_PARAMETER,
    CONDITION_FIELD_TYPE_CONFIGURABLE
} from './../../../../../back/components/Element/constants';

class NumberField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addClassBordered: false,
        }
        this.handleOnChange = this.handleOnChange.bind(this);

        /*
        //We do this to get 0 instead whitespace for initial values
        if(this.props.value == ''){
          this.props.onFieldChange({
            name : this.props.field.identifier,
            value : 0
          });
        } 
        */

    }

    componentDidUpdate(prevProps, prevState) {
        //si es campo operacion
        if (this.fieldHasOperationSettingsEnable()) {
            this.processOperation(prevProps);
        }

    }
    fieldHasOperationSettingsEnable() {
        return this.props.field.settings.operation !== undefined && this.props.field.settings.operation !== null && this.props.field.settings.operation !== '' ? true : false;
    }
    fieldHasCurrencySettings() {
        var currencySettings = this.props.field.settings !== undefined && this.props.field.settings.currency !== undefined && this.props.field.settings.currency !== null ? this.props.field.settings.currency : null
        var hideCurrency = this.props.field.settings.hideCurrency !== undefined ? this.props.field.settings.hideCurrency : false;
        if (currencySettings) {
            //Caso por parametro
            if (currencySettings.type == CONDITION_FIELD_TYPE_PARAMETER) {
                var parametersObject = {};
                this.props.parameters.split("&").forEach(function (part) {
                    var item = part.split("=");
                    parametersObject[item[0]] = decodeURIComponent(item[1]);
                });
                var currencyIso = parametersObject[currencySettings.identifier]
            } else {
                var currencyIso = this.props.values[currencySettings.identifier]
            }
            var currencyInfo = CURRENCIES[currencyIso] !== undefined ? CURRENCIES[currencyIso] : CURRENCIES['default'];
            //console.log('CURRENCY INFO',currencyInfo);
            //We prepare values with a trick to be able to use whitespaces comming from back as ' '
            if (currencyInfo) {
                currencyInfo.decimals = currencyInfo.decimals && currencyInfo.decimals !== '' ? currencyInfo.decimals : 0;
                currencyInfo.decimals_separator = currencyInfo.decimals_separator ? currencyInfo.decimals_separator.replace("' '", " ") : '';
                currencyInfo.thousands_separator = currencyInfo.thousands_separator ? currencyInfo.thousands_separator.replace("' '", " ") : '';
                currencyInfo.symbole = !hideCurrency && currencyInfo.symbole ? currencyInfo.symbole.replace("' '", " ") : '';
                return currencyInfo
            }
        }

        return null;
    }

    processOperation(prevProps) {

        var max = this.getMaxValue();
        var min = this.getMinValue();

        //miramos si ha cambiado un campo diferente al campo con formula para recalcular
        if (this.props.value === prevProps.value) {
            var formule = this.props.field.settings.operation;
            var params = formule.match(/[^[\]]+(?=])/g);
            for (var key in params) {
                var id = params[key];
                var value = this.props.values[id] !== undefined && this.props.values[id] !== null && this.props.values[id] !== '' ? this.props.values[id] : '0';
                //console.log("primeNet :: processOperation :  params,key,value,id => ",params,key,value,id);
                formule = formule.replace('[' + id + ']', value);
            }
            var result = eval(formule);
            //console.log("Number Field :: eval result => ",result);
            //miramos si el nuevo resultado esta dentro del rango max y minimo definido para cambiar por el resultado y sino por el valor maximo o minimo
            if (min !== '' && result < min) {
                result = min
            }
            if (max !== '' && result > max) {
                result = max;
            }

            //miramos si ha cambiado o no el resultado de la formula para updatear el campo
            if (this.props.value !== result) {
                this.props.onFieldChange({
                    name: this.props.field.identifier,
                    value: result
                });
            }
        }

    }

    isReadOnly() {
        return this.props.field.settings.readonly || (this.props.field.settings.operation !== undefined && this.props.field.settings.operation !== null && this.props.field.settings.operation !== '') ? 'readonly' : null;
    }
    // ==============================
    // Handlers
    // ==============================

    handleBlur(e) {
        this.setState({
            addClassBordered: false
        });
    }

    handleFocus(e) {
        this.setState({
            addClassBordered: true
        });
    }

    handleFocus(e) {
        if (e.target.value != '') {
            this.setState({
                addClassBordered: false
            });
        } else {
            this.setState({
                addClassBordered: true
            });
        }
    }

    handleOnChange(event) {

        var value = parseFloat(event.target.value);
        var max = this.getMaxValue();
        var min = this.getMinValue();

        if (isNaN(value)) {
            this.props.onFieldChange({
                name: this.props.field.identifier,
                value: ''
            });
            return;
        }

        if (min !== '' && value < min) {
            return;
        }
        if (max !== '' && value > max) {
            return;
        }

        /*
        if(this.props.field.identifier == 'primeNet'){
          console.log("primeNet :: handleOnChange : ",value);
        }
        */

        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: value
        });

    }

    handleNumberFormatChange(value) {

        var value = value.floatValue;
        var max = this.getMaxValue();
        var min = this.getMinValue();

        //console.log("Number Field :: handleOnChange (value,max,min,name)",value,max,min,event.target.name);

        if (isNaN(value)) {
            this.props.onFieldChange({
                name: this.props.field.identifier,
                value: ''
            });
            return;
        }

        if (min !== '' && value < min) {
            return;
        }
        if (max !== '' && value > max) {
            return;
        }

        /*
        if(this.props.field.identifier == 'primeNet'){
          console.log("primeNet :: handleNumberFormatChange : ",value);
        }
        */

        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: value
        });
    }

    getNumberFromRules(key) {
        const { rules } = this.props.field;

        if (rules[key] !== undefined && rules[key] != null && rules[key] != '') {
            return rules[key];
        }

        return '';
    }

    getMinValue() {
        var min = parseInt(this.getNumberFromRules('minNumber'));
        return min === 0 || (min && min !== "") ? min : -Number.MAX_VALUE;
    }

    getMaxValue() {
        var max = parseInt(this.getNumberFromRules('maxNumber'));
        return max === 0 || (max && max !== "") ? max : Number.MAX_VALUE;
    }

    fieldHasPlaceholderSettings() {
        return this.props.field.settings.placeholder !== undefined && this.props.field.settings.placeholder !== null ? true : false;
    }

    getPlaceholder() {
        if (this.fieldHasPlaceholderSettings()) {
            return this.props.field.settings.placeholder !== '' ? this.props.field.settings.placeholder : '';
        } else {
            var max = this.getNumberFromRules('maxNumber');
            var min = this.getNumberFromRules('minNumber');

            if (max == '' && min == '')
                return '';

            var result = '';

            result += (min != '') ? 'minimum ' + min + ' ' : '';
            result += (min != '' && max != '') ? ', ' : '';
            result += (max != '') ? 'maximum ' + max + ' ' : '';


            return result;
        }
    }


    renderIconFormat() {

        var icon = null;

        const { field } = this.props;

        if (field.settings !== undefined && field.settings.format !== undefined) {

            switch (field.settings.format) {
                case 'price':
                    icon = STYLES.elementForm.iconCurrencyForm;
                    break;
                case 'price_with_decimals':
                    icon = STYLES.elementForm.iconCurrencyForm;
                    break;
                case 'price_with_decimals_2':
                    icon = STYLES.elementForm.iconCurrencyForm;
                    break;
                case 'surface':
                    icon = STYLES.elementForm.iconSurfaceForm;
                    break;
                default:
                    icon = '';
                    break;
            }

            return icon;
        }
    }

    render() {

        const { field } = this.props;
        const errors = this.props.error ? ' has-error' : '';
        let isRequired = field.rules.required !== undefined ?
            field.rules.required : false;

        var placeholder = this.getPlaceholder();

        let hasDescription = this.props.field.settings.description !== undefined ?
            this.props.field.settings.description : false;

        let isHidden = field.settings.hidden !== undefined && field.settings.hidden != null ?
            field.settings.hidden : false;

        let isHideLabel = field.settings.hidelabel !== undefined ?
            field.settings.hidelabel : false;

        let isLabelInline = field.settings.labelInline !== undefined ?
            field.settings.labelInline : false;

        var colClassLabel = isLabelInline ?
            'field-container-col number-field col-xs-5' :
            'field-container-col number-field col-xs-12';

        var colClassInput = isLabelInline ?
            'field-container-col number-field col-xs-7' :
            'field-container-col number-field col-xs-12';

        const currency = this.fieldHasCurrencySettings();

        /*
        if(field.identifier == 'primeNet'){
          console.log("primeNet :: currency : ",currency,this.props.value);
        }
        */

        //required can be set also directly with modals
        if (this.props.isModal !== undefined && this.props.isModal &&
            field.required !== undefined) {
            isRequired = field.required;
        }

        let textFieldClass = ["text-field"];
        if (this.state.addClassBordered || this.props.value != "") {
            textFieldClass.push('bordered');
        }

        console.log("currency", currency);

        return (

            <div className={"form-group bmd-form-group " + (errors) + " " + (isHidden ? ' hidden' : '')}>
                <div className={'row field-container'}>
                    <div className={colClassLabel}>
                        {!isHideLabel &&
                            <label className={'bmd-label-floating '}>
                                {field.name}
                                {isRequired &&
                                    <span className="required">&nbsp; *</span>
                                }
                                {hasDescription &&
                                    <LabelTooltip
                                        description={this.props.field.settings.description ?
                                            this.props.field.settings.description : ''}
                                    />
                                }
                            </label>
                        }
                    </div>
                    <div className={colClassInput}>
                        {!currency &&
                            <React.Fragment>
                                <input
                                    type="number"
                                    name={field.identifier}
                                    className={"form-control numberfield " + (textFieldClass.join(' '))}
                                    value={this.props.value}
                                    max={this.getNumberFromRules('maxNumber')}
                                    min={this.getNumberFromRules('minNumber')}
                                    onChange={this.handleOnChange.bind(this)}
                                    onBlur={this.handleBlur.bind(this)}
                                    onFocus={this.handleFocus.bind(this)}
                                    placeholder={this.getPlaceholder()}
                                    readOnly={this.isReadOnly()}
                                />
                                {field.settings !== undefined && field.settings.format !== undefined && field.settings.format !== null &&
                                    <React.Fragment>
                                        <div className={'container-custom-icon'}>
                                            <span class="indicatorSeparator"></span>
                                            <CustomIcon
                                                icon={this.renderIconFormat()}
                                            />
                                        </div>
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        }
                        {currency &&
                            <React.Fragment>
                                <NumberFormat
                                    value={this.props.value}
                                    name={field.identifier}
                                    className={"form-control numberfield " + (textFieldClass.join(' '))}
                                    max={this.getNumberFromRules('maxNumber')}
                                    min={this.getNumberFromRules('minNumber')}
                                    onValueChange={this.handleNumberFormatChange.bind(this)}
                                    onBlur={this.handleBlur.bind(this)}
                                    placeholder={this.getPlaceholder()}
                                    readOnly={this.isReadOnly()}
                                    decimalScale={currency.decimals}
                                    decimalSeparator={currency.decimals_separator}
                                    thousandSeparator={currency.thousands_separator}
                                    prefix={currency.symbole_position == 'L' ? currency.symbole : ''}
                                    suffix={currency.symbole_position == 'R' ? currency.symbole : ''}
                                />
                                {STYLES.elementForm.iconSurfaceForm !== '' &&
                                    <React.Fragment>
                                        <div className={'container-custom-icon'}>
                                            <span class="indicatorSeparator"></span>
                                            <CustomIcon
                                                icon={this.renderIconFormat()}
                                            />
                                        </div>
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default NumberField;
