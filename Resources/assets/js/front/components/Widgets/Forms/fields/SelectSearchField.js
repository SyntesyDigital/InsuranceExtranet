import React, { Component } from 'react';
import axios from 'axios';
import Select, { components, createFilter } from "react-select";
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
} from './../functions/';

class SelectSearchField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addClassBordered: false,
        }
        this.handleOnChange = this.handleOnChange.bind(this);

        const {boby,bobyParameters} = processBoby(
            this.props.field.boby,
            this.props.parameters
          );

        this.state = {
            loading: true,
            data: [],
            display: true,
            preloadData: [],
            selectedOption: null,
            boby: boby,
            bobyParameters: bobyParameters,
            parameters: this.props.parameters,
            waitingForParameters: false,  //true when parameters need are not yet set

            displayModal : false,
            modalUrl : this.getModalUrlFromSettings(this.props.field),
            redirectUrl : null,
            id :  props.field.id+moment().unix()
        };

        if (this.hasBobyParameters()) {
            this.state.waitingForParameters = true;
        }
    }

    componentDidMount() {
        //if has no parameters load directly
        if (!this.hasBobyParameters()) {
            this.loadData();
        }
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

    /**
     * For every update process the preloeaded info if exist.
     * This is necessary when boby has diferent values for VEOS and for info
     * coming from preload GET.
     */
    processUpdatePreloadedData(prevProps, prevState) {

        const identifier = this.props.field.identifier;
        const { preloadData } = this.state;

        /*    
        console.log("SelectField :: componentDidUpdate : (currentValue, oldValue)",
          this.props.value,
          prevProps.value
        );
        */

        //console.log("SelectField :: (identifier,currentValue, oldValue,preloadData)", identifier,this.props.value,preloadData, prevProps.value);

        if (this.props.value != prevProps.value) {

            var dataPosition = preloadData.indexOf(this.props.value);
            //console.log("SelectField :: (dataPosition,this.props.value)", dataPosition,this.props.value);      

            //console.log("SelectField :: (identifier,currentValue, oldValue,preloadData,dataPosition)", identifier,this.props.value,preloadData, prevProps.value,dataPosition);      

            if (dataPosition != -1) {

                //console.log("SelectField :: is different, update (value)",this.state.data[dataPosition].value);
                //console.log("SelectField :: update preload : (dataPosition,value)",dataPosition,this.state.data[dataPosition].value);
                //if exist the value into preload data, change to veos valu
                if (this.state.data[dataPosition] === undefined || this.state.data[dataPosition].value === undefined) {
                    console.error("SelectField :: processUpdatePreloadedData : data[dataPosition].value undefined (dataPosition,data) ", dataPosition, this.state.data);
                    return null;
                }

                this.props.onFieldChange({
                    name: identifier,
                    value: this.state.data[dataPosition].value
                });
            }
        }

    }

    componentDidUpdate(prevProps, prevState) {

        this.processBobyParametersLoaded(prevProps, prevState);
        this.processUpdatePreloadedData(prevProps, prevState);

    }

    /**
     * Process data array to allow indeOf to check if exists.
     * @param {*} data 
     */
    processPreloadData(data) {
        //first is always empty
        var result = [""];

        if (data.length == 0) {
            return [];
        }

        for (var key in data) {
            if (data[key].value_preload != null) {
                result.push(data[key].value_preload);
            }
            else {
                result.push(data[key].value);
            }

        }
        return result;
    }

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

                        var preloadData = self.processPreloadData(response.data.data);

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
                            name: "Sélectionnez",
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

    cleanValue() {
        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: ''
        });
    }

    setUniqueValue(value) {
        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: value
        });
    }

    setFromPreload() {

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

        //console.log("SelectField :: handleOnChange :: option",(option));

        this.props.onFieldChange({
            name: this.props.field.identifier,
            value: option.value
        });
    }

    getOption(value) {
        //console.log("SelectField :: getOption (value)",value);
        if (value === undefined || value == null)
            return null;

        for (var index in this.state.data) {
            if (this.state.data[index]['value'] === value) {
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

    handleModalClose(){
        this.setState({
          displayModal : false
        });

        
    }

    handleFormFinished(formParameters) {

        console.log("handleFormFinished :: formParameters",formParameters);

        this.setState({
            displayModal : false
        });
        
        //if modal has a value defined, then select is automatically updated with result
        if(formParameters["_value"]){
            this.props.onFieldChange({
                name: this.props.field.identifier,
                value: formParameters["_value"]
            });
        }

        //reload select
        if (!this.hasBobyParameters()) {
            this.loadData();
        }
    }

    openModal() {
        this.setState({
            displayModal : true
        });
    }

    /**
     *  modal Url format is [element_id]?[param_key]=[param_value]&[param_key_2]=[param_value_2]
     *  Example : 75?id_pol=11061240;
     */
    getModalUrlFromSettings(field) {
        if(isDefined(field.settings) && isDefined(field.settings.addElement) && isDefined(field.settings.addElement.id)) {
            return field.settings.addElement.id+'?';    // TODO add parameters
        }
        else {
            console.error("SelectSearchField : element is not defined. Please add Form to field configuration",this.props.field.identifier);
        }

        return null;
    }

    render() {

        const { field } = this.props;
        let defaultValue = this.state.loading ? 'Chargement...' : 'Sélectionnez';
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
                value: item.value,
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

        //if url not defined button is not enabled
        const linkDisabled = this.state.modalUrl == null || this.state.displayModal;

        //console.log("SelectField :: value : (options,optionsIndex,this.props.value)",options,optionIndex,this.props.value);
        return (
            <div className={"form-group bmd-form-group"} style={{ display: display && !isHidden ? 'block' : 'none' }}>

                <ModalTable
                    field={this.props.field}
                    display={this.state.displayModal}
                    id={"modal-table-component-"+this.state.id}
                    zIndex={1000}
                    onModalClose={this.handleModalClose.bind(this)}
                    modalUrl={this.state.modalUrl}
                    redirectUrl={this.state.redirectUrl}
                    //onOpenModal={this.handleOpenModal.bind(this)}
                    onFormFinished={this.handleFormFinished.bind(this)}
                />
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
                        <div className="col-xs-12 select-search-field buttons">
                            <Select
                                onBlur={this.handleBlur.bind(this)}
                                onFocus={this.handleFocus.bind(this)}
                                value={options[optionIndex]}
                                name={field.identifier}
                                defaultValue={optionIndex != null ? options[optionIndex] : ''}
                                options={options}
                                onChange={this.handleOnChange.bind(this)}
                                styles={customStyles}
                                placeholder={defaultValue}
                                filterOption={createFilter({ 
                                    ignoreAccents: false 
                                })}
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
                            <a className="btn" onClick={this.openModal.bind(this)} style={{
                                    opacity:linkDisabled ? 0.5 : 1,
                                    pointerEvents : linkDisabled ? 'none' : 'auto'
                                }}>
                                {STYLES.elementForm.textBtnAddValueForm ?
                                    STYLES.elementForm.textBtnAddValueForm :
                                    Lang.get('fields.new_suscriptor')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectSearchField;