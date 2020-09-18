import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import LabelTooltip from '../../../Common/LabelTooltip';
import { getParametersFromURL } from './../functions';

class DateField extends Component {
    constructor(props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);

        this.state = {
            value: props.value != '' ? moment(props.value) : null,
            addClassBordered: false,
        }
    }

    componentDidUpdate(prevProps, prevState) {

        //console.log("DateField :: componentDidUpdate :: nextProps", this.props.value);

        //if value is different
        if (prevProps.value != this.props.value) {

            var date = this.props.value != '' && this.props.value != null ?
                moment(this.props.value, this.getDateFormat()) : null;
            this.setState({
                value: date
            });
        }

    }

    /*
    componentWillReceiveProps(nextProps) {
  
      this.state = {
        value : nextProps.value != '' ? moment(nextProps.value) : null
      }
    }
    */

    // ==============================
    // Handlers
    // ==============================

    handleOnChange(date) {

        var field = {
            name: this.props.field.identifier,
            value: date ? date.format(this.getDateFormat()) : ''
        };

        this.props.onFieldChange(field);

        this.setState({
            value: date
        });

    }

    /*
    handleOnBlur () {
      this.setState({
        errors : !this.isValid(this.props.value)
      });
    }
    */

    isTime() {
        const { settings } = this.props.field;

        if (settings.format !== undefined) {
            if (settings.format == "hour")
                return true;
        }

        return false;
    }

    // ==============================
    // Getters
    // ==============================

    getMaxDate() {
        return this.getDateFromRules('maxDate');
    }

    getMinDate() {
        return this.getDateFromRules('minDate');
    }

    getDateFromRules(key) {
        const { rules } = this.props.field;
        var parameters = getParametersFromURL(this.props.parameters);

        if (rules[key] !== undefined && rules[key] != null && rules[key].type != ''
            && rules[key].parameter != '') {

            if (rules[key].type == 'SYSTEM') {
                switch (rules[key].parameter) {
                    case '_now':
                        return moment();
                }
            }
            else if (rules[key].type == 'PARAMETER') {
                if (parameters[rules[key].parameter] === undefined) {
                    console.error("Config Error : parameter not set as form parameter (parameter)", rules[key].parameter)
                    return null;
                }
                return moment(parameters[rules[key].parameter], 'DD/MM/YYYY');
            }
        }

        return null;
    }

    isMonthYear() {
        const { settings } = this.props.field;

        if (settings.format !== undefined) {
            if (settings.format == "month_year")
                return true;
        }

        return false;
    }

    getDateFormat() {
        const { settings } = this.props.field;

        if (settings.format === undefined) {
            return 'DD/MM/YYYY';
        }

        switch (settings.format) {
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

    isReadOnly() {
        const field = this.props.field;
        const operation = field.settings.operation;
        return field.settings.readonly || (operation !== undefined && operation !== null && operation !== '') ?
            true : false;
    }

    // ==============================
    // Renderers
    // ==============================

    render() {

        const { field } = this.props;
        const errors = this.props.error ? ' has-error' : '';

        let isRequired = field.rules.required !== undefined ?
            field.rules.required : false;

        let hasDescription = this.props.field.settings.description !== undefined ?
            this.props.field.settings.description : false;

        const maxDate = this.getMaxDate();
        const minDate = this.getMinDate();

        //console.log("DateField : Max Date, Min Date => ", maxDate, minDate);

        //required can be set also directly with modals
        if (this.props.isModal !== undefined && this.props.isModal &&
            field.required !== undefined) {
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
                    {hasDescription && 
                        <LabelTooltip 
                            description={this.props.field.settings.description ? 
                                this.props.field.settings.description : ''}
                        />
                    }
                </label>
                <DatePicker
                    className={"form-control " + (textFieldClass.join(' '))}
                    selected={this.state.value}
                    onChange={this.handleOnChange}
                    dateFormat={this.getDateFormat()}
                    timeIntervals={15}
                    locale="fr"
                    showTimeSelect={this.isTime()}
                    showTimeSelectOnly={this.isTime()}
                    //showMonthYearPicker={this.isMonthYear()}
                    timeCaption="Heure"
                    timeFormat="HH:mm"
                    maxDate={maxDate}
                    minDate={minDate}
                    disabled={this.isReadOnly()}
                />
            </div>
        );
    }

}

export default DateField;
