import React, { Component } from 'react';
import axios from 'axios';
import { components } from "react-select";
import AsyncSelect from "react-select/lib/Async";
import LabelTooltip from '../../../Common/LabelTooltip';
import moment from 'moment';
import ModalTable from './../../Table/ModalTable';
import iconSearch from './../../../../../../img/ico_search.png';
import {
    HIDDEN_FIELD
} from './../constants';
import {
    processBoby,
    getUrlParameters,
    joinUrls,
    updateParametersWithValues,
    hasEmptyParameters,
    isDefined,
    isArray
} from './../functions/';

class SearchField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addClassBordered: false,
        }
        this.handleOnChange = this.handleOnChange.bind(this);

        //get boby from service 
        var elementUrl = this.getModalUrlFromSettings(props.field);

        const {boby,bobyParameters} = processBoby(
            elementUrl,
            this.props.parameters
          );

        console.log("SearchField :: elementUrl, bobyParameters",elementUrl,bobyParameters);

        this.state = {
            loading: true,
            data: [],
            display: true,
            selectedOption: null,
            boby: elementUrl,
            bobyParameters: bobyParameters
        };
    }

    componentDidMount() {
        //if has no parameters load directly
        /*
        if (!this.hasBobyParameters()) {
            this.loadData();
        }
        */
    }

    componentDidUpdate(prevProps, prevState) {
        //this.processBobyParametersLoaded(prevProps, prevState);
    }

    loadOptions(inputValue, callback) {

        
        if(this.state.timer !== undefined) {
            clearTimeout(this.state.timer);
        }

        var self = this;
        this.setState({
            timer: setTimeout(() => {
                console.log("SearchField :: loadOptions : start query ",inputValue);
                self.query(inputValue,callback);
            }, 1000)
        }, function () {
            
        });
    }


    query(inputValue,callback) {

        var self = this;
        let {
            boby
        } = this.state;

        //get url info
        boby = boby.replace("_"+this.props.field.identifier,inputValue);
        boby = boby.split("?");
        var params = isDefined(boby[1]) ? '?'+boby[1] : '' ;

        console.log("SearchField : query : ",ASSETS + 'architect/extranet/' + boby[0] + '/model_values/data/' + params);

        axios.get(ASSETS + 'architect/extranet/' + boby[0] + '/model_values/data/' + params)
            .then(function (response) {
                if (response.status == 200
                    && response.data.modelValues !== undefined) {
                    
                    console.log("SearchField : response data : ",response.data.modelValues);

                    var data = response.data.modelValues;
                    for(var key in data){
                        data[key].value = data[key].label;
                    }

                    if(data.length > 0 ){
                        data.unshift({
                            label: self.getPlaceholder(),
                            value: "",
                        });
                    }

                    //console.log("SearchField : data : ",data);

                    callback(data);
                }

            }).catch(function (error) {
                console.log(error);
            });

    }

    cleanValue() {
        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: ''
        });
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

    handleOnChange(option) {

        console.log("SearchField :: handleOnChange :: option",(option));

        if(!this.hasPreload()){
        
            this.props.onFieldChange({
                name: this.props.field.identifier,
                value: option.value
            });
        }
        else {
            this.preloadValues(option);
        }
    }

    hasPreload() {
        return isDefined(this.props.field.settings.preload);
    }

    /**
     * Process all preload settings to match from table values to form values.
     * @param {*} option 
     */
    preloadValues(option){

        var values = this.props.values;

        values[this.props.field.identifier] = option.value;

        var preloadKeys = JSON.parse(this.props.field.settings.preload);

        for(var key in preloadKeys){
            
            if(isDefined(option[preloadKeys[key].value])){
                values[preloadKeys[key].key] = option[preloadKeys[key].value];
            }
            else {
                console.error("preload value is not defined in element, check indetifier ",reloadKeys[key].value,options);
            }
        }
    
        this.props.onMultipleFielChange(values);
    }

    getOption(value) {
        //console.log("SelectField :: getOption (value)",value);
        if (value === undefined || value == null || value == '')
            return null;

        for (var index in this.state.data) {
            if (this.state.data[index]['value'] == value) {
                return index;
            }
        }
        return null;
    }

    getBorderColor() {
        if (this.props.error) {
            return STYLES.elementForm.borderPxInputForm + ' solid ' + STYLES.elementForm.errorColor;
        }
        else if (this.state.addClassBordered || this.props.value != "") {
            return STYLES.elementForm.borderPxInputForm + ' solid ' + STYLES.elementForm.borderColorInput;
        }
        else {
            return null;
        }
    }

    /**
     *  modal Url format is [element_id]?[param_key]=[param_value]&[param_key_2]=[param_value_2]
     *  Example : 75?id_pol=11061240;
     */
    getModalUrlFromSettings(field) {
        if(isDefined(field.settings) && isDefined(field.settings.addElement) && isDefined(field.settings.addElement.id)) {
            return field.settings.addElement.id+this.getModalParametersFromSettings(field);    // TODO add parameters
        }
        else {
            console.error("SearchField : element is not defined. Please add Form to field configuration",this.props.field.identifier);
        }

        return null;
    }

    /**
     * Function to get the url parameters from settings. It returns parameters like they are used in boby : 
     * ?param1=_identifier&param2=_identifier2
     * Then the identifiers are replaced from form values.
     * @param {*} field 
     */
    getModalParametersFromSettings(field) {
        var urlParmeters = "";
        //console.log("getModalParametersFromSettings ",field);
        if(isDefined(field.settings.addElement.params) 
                && isArray(field.settings.addElement.params) 
                && field.settings.addElement.params.length > 0
            ){
            
            var parameters = field.settings.addElement.params;
            for(var key in parameters){
                var parameter = parameters[key];
                parameters[key] = parameter['identifier']+"="+"_"+parameter['value'];
            }
            urlParmeters = '?'+parameters.join('&');
            //console.log("getModalParametersFromSettings , parameters",parameters);
            //console.log("getModalParametersFromSettings , urlParmeters",urlParmeters);
        }
        return urlParmeters;
    }

    fieldHasPlaceholderSettings() {
        return this.props.field.settings.placeholder !== undefined && this.props.field.settings.placeholder !== null ? true : false;
    }
    
    getPlaceholder() {
        if (this.fieldHasPlaceholderSettings()) {
            return this.props.field.settings.placeholder !== '' ? this.props.field.settings.placeholder : 'Sélectionnez';
        }
        return 'Sélectionnez';
    }

    render() {
        var placeholder = this.getPlaceholder();
        const { field } = this.props;

        let defaultValue = placeholder;

        //let defaultValue = this.state.loading ? 'Chargement...' : placeholder;
        //defaultValue = this.state.waitingForParameters ? 'En attente de paramètres...' : defaultValue;
        //defaultValue = this.state.parameters != null ? defaultValue : 'Paramètres insuffisants';
        //const errors = this.props.error ? ' has-error' : '';
        const display = this.state.display;

        let isRequired = field.rules.required !== undefined ?
            field.rules.required : false;

        let hasDescription = this.props.field.settings.description !== undefined ?
            this.props.field.settings.description : false;

        let isHidden = field.settings.hidden !== undefined && field.settings.hidden != null ?
            field.settings.hidden : false;

        let isHideLabel = field.settings.hidelabel !== undefined ?
        field.settings.hidelabel : false;

        let isLabelInline = field.settings.labelInline !== undefined ?
            field.settings.labelInline : false;

        var colClassLabel = isLabelInline ? 
            'field-container-col col-xs-5' :
            'field-container-col col-xs-12';

        var colClassInput = isLabelInline ? 
            'field-container-col col-xs-7' :
            'field-container-col col-xs-12';

        //required can be set also directly with modals
        if (this.props.isModal !== undefined && this.props.isModal &&
            field.required !== undefined) {
            isRequired = field.required;
        }

        // required for react-select option, value and setting
        const options = this.state.data.map(
            item => ({
                label: item.name,
                value: item.value,   //convert all values to 
            }));

        var optionIndex = this.getOption(this.props.value);
        //console.log("SelectField :: getOption (optionIndex)",optionIndex);

        const customStyles = {
            control: (base) => ({
                ...base,
                height: STYLES.elementForm.heightInputForm,
                minHeight: STYLES.elementForm.heightInputForm,
                boxShadow: '1 !important',
                border: this.getBorderColor()
            }),
            menu: provided => ({ ...provided, zIndex: 99999 })
        };


        const CaretDownIcon = () => {
            return  <img id="ico-search" src={iconSearch} width={'20px'} height={'20px'}/>; 

        };

        const DropdownIndicator = props => {
            return (
                <components.DropdownIndicator {...props}>
                    <CaretDownIcon />
                </components.DropdownIndicator>
            );
        };

        //console.log("optionIndex : ",optionIndex);

        //console.log("SelectField :: value : (options,optionsIndex,this.props.value)",options,optionIndex,this.props.value);
        return (
            <div className={"form-group bmd-form-group"} style={{ display: display && !isHidden ? 'block' : 'none' }}>

                <div className={'row field-container'}>
                    <div className={colClassLabel}>

                        {!isHideLabel && 
                            <label className="bmd-label-floating">
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
                        <AsyncSelect
                            cacheOptions
                            loadOptions={this.loadOptions.bind(this)}
                            onBlur={this.handleBlur.bind(this)}
                            onFocus={this.handleFocus.bind(this)}
                            value={options[optionIndex]}
                            name={field.identifier}
                            defaultValue={optionIndex != null ? options[optionIndex] : ''}
                            options={options}
                            onChange={this.handleOnChange.bind(this)}
                            styles={customStyles}
                            placeholder={defaultValue}
                            menuContainerStyle={{ 'zIndex': 999 }}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: STYLES.elementForm.borderRadiusInput,
                                height: '34px',
                                colors: {
                                    ...theme.colors,
                                    primary25: STYLES.elementForm.hoverColorInput,
                                    primary: STYLES.elementForm.borderColorInput,
                                },
                            })}
                            components={{
                                DropdownIndicator,
                                IndicatorSeparator: () => null
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchField;
