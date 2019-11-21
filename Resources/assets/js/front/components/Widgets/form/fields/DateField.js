import React, {Component} from 'react';
import { render } from 'react-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class DateField extends Component
{
  constructor(props)
  {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);

    this.state = {
      value : props.value != '' ? moment(props.value) : null
    }
  }


  handleOnChange(date)
  {

    var field = {
      name : this.props.field.identifier,
      value : date.format(this.getDateFormat())
    };

    this.props.onFieldChange(field);

    this.setState({
      value : date
    });

  }

  componentWillReceiveProps(nextProps) {

  }

  isTime() {
    const {settings} = this.props.field;

    if(settings.format !== undefined){
      if(settings.format == "hour")
        return true;
    }

    return false;
  }

  isMonthYear() {
    const {settings} = this.props.field;

    if(settings.format !== undefined){
      if(settings.format == "month_year")
        return true;
    }

    return false;
  }

  getDateFormat() {
    const {settings} = this.props.field;

    if(settings.format === undefined){
      return 'DD/MM/YYYY';
    }

    switch (settings.format) {
      case 'day_month_year':
        return 'DD/MM/YYYY';
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

  /*
  handleOnBlur () {
    this.setState({
      errors : !this.isValid(this.props.value)
    });
  }
  */

  render() {

    const {field} = this.props;
    const errors = this.props.error ? 'is-invalid' : '';
    const isRequired = field.rules.required !== undefined ?
      field.rules.required : false;

    return (

      <div className="row element-form-row">
        <div className="col-sm-4">
          <label>{field.name}
            {isRequired &&
              <span className="required">&nbsp; *</span>
            }
          </label>
        </div>
        <div className="col-sm-6">
          <DatePicker
              className={"form-control "+errors}
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
              //onBlur={this.handleOnBlur.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default DateField;
