import React, { Component } from 'react';
import axios from 'axios';
import { components } from "react-select";
//import AsyncSelect from "react-select/lib/Async";
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

        this.state = {
            loading: true,
            data: [],
            display: true,
            selectedOption: null,
            boby: boby,
            bobyParameters: bobyParameters,
            parameters: this.props.parameters,
            waitingForParameters: false,  //true when parameters need are not yet set
        };

        if (this.hasBobyParameters()) {
            this.state.waitingForParameters = true;
        }
    }

    componentDidMount() {
        //if has no parameters load directly
        /*
        if (!this.hasBobyParameters()) {
            this.loadData();
        }
        */
    }

    /**
     * 
     */
    hasBobyParameters() {
        return this.state.bobyParameters != null;
    }

    /**
     * Join parameters coming from URL and parameters coming from values
     */
    processUrlParameters() {
        var parameters = this.state.parameters;
        var bobyParametersURL = this.hasBobyParameters() ?
            getUrlParameters(this.state.bobyParameters) : '';

        return joinUrls([parameters, bobyParametersURL]);
    }

    /**
     * Check for every update the algorithm if necessary perameters
     */
    processBobyParametersLoaded(prevProps, prevState) {

        //if no boby parameters
        if (!this.hasBobyParameters()) {
            return null;
        }

        //update parameters and check if necessary to update
        const { hasChanged, parameters } = updateParametersWithValues(
            this.state.bobyParameters,
            this.props.values
        );

        //console.log("updateParametersWithValues :: ",{hasChanged,parameters});

        if (hasChanged) {
            //check if there is parameters not defined yet
            var empty = hasEmptyParameters(parameters);

            var self = this;
            this.setState({
                bobyParameters: parameters,
                waitingForParameters: empty,
                data: [],
                preloadData: []
            }, function () {
                if (!empty) {
                    self.cleanValue();

                    //if is not wainting for parameters to define
                    self.loadData();
                }
            });
        }

    }

    componentDidUpdate(prevProps, prevState) {
        this.processBobyParametersLoaded(prevProps, prevState);
    }

    loadOptions(inputValue, callback) {
        var self = this;
        setTimeout(() => {
            callback(self.query(inputValue));
          }, 1000);
    }


    query(inputValue) {

        var self = this;
        const {
            boby,bobyParameters
        } = this.state;

        var params = bobyParameters.replace("_"+this.props.identifier,inputValue);

        axios.get(ASSETS + 'architect/extranet/' + boby + '/model_values/data/' + params)
            .then(function (response) {
                if (response.status == 200
                    && response.data.modelValues !== undefined) {
                    
                    console.log("SearchField : response data : ",response.data.modelValues);

                }

            }).catch(function (error) {
                console.log(error);
                
            });
    }

    /*
    loadData() {

        var self = this;


        this.setState({
            loading: true,
            data: [],
            preloadData: []
        }, function () {
            axios.get(ASSETS + 'architect/elements/select/data/' + this.state.boby + "?" + this.processUrlParameters())
                .then(function (response) {
                    if (response.status == 200 && response.data.data !== undefined) {

                        var display = false;

                        console.log("SearchField : response data : ",response.data.data);

                        if (response.data.data.length == 0) {
                            //no data set this field as hidden, not needed
                            self.setHidden();
                        }
                        else if (response.data.data.length == 1) {
                            //only one value, selected it and hide
                            self.setUniqueValue(response.data.data[0].value);
                        }
                        else {
                            display = true;
                        }

                        //add first item with empty result, necessary to remove value
                        response.data.data.unshift({
                            name: self.getPlaceholder(),
                            value: "",
                            value_preload: null
                        });

                        self.setState({
                            data: response.data.data,
                            loading: false,
                            display: display,
                            preloadData: preloadData
                        });
                        

                    }
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
    }
    

    setHidden() {
        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: HIDDEN_FIELD
        });
    }
    */

    cleanValue() {
        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: ''
        });
    }

    /*
    setUniqueValue(value) {
        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: value
        });
    }
    */

    
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

        //console.log("SelectField :: handleOnChange :: option",(option));

        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: option.value
        });
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
        let defaultValue = this.state.loading ? 'Chargement...' : placeholder;
        defaultValue = this.state.waitingForParameters ? 'En attente de paramètres...' : defaultValue;
        defaultValue = this.state.parameters != null ? defaultValue : 'Paramètres insuffisants';
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
                height: 34,
                minHeight: 34,
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

        console.log("optionIndex : ",optionIndex);

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
                            /*
                            filterOption={createFilter({ 
                                ignoreAccents: false 
                            })}
                            */
                            //width='200px'
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
