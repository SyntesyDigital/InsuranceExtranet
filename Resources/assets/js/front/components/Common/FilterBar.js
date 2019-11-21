import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class FilterBar extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
          text : '',
          dateStart : null,
          dateEnd : null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
      event.preventDefault();

      const state = this.state;

      this.props.onSubmit({
        text : this.state.text != '' ? this.state.text : null,
        startDate : this.state.dateStart != null ? this.state.dateStart : null,
        endDate : this.state.dateEnd != null ? this.state.dateEnd : null,
      });
    }

    handleChange(event) {
      event.preventDefault();

      const state = this.state;
      state[event.target.name] = event.target.value;

      this.setState(state);

    }

    handleDateChange(name,date){
      console.log("handleDateChange => ",date,name);

      const state = this.state;
      state[name] = date;

      this.setState(state);
    }

    render() {

        return (
            <div className="filter-bar">
              <form onSubmit={this.handleSubmit.bind(this)} className="nova-cerca">
                {this.props.displayText &&
                  <input type="text" name="text" value={this.state.text} onChange={this.handleChange} placeholder={window.localization['GENERAL_FORM_SEND']} />
                }

                {this.props.displayDates &&
                  <div>
                    <div className="input-date">
                      <DatePicker
                          className="input-date"
                          selected={this.state.dateStart}
                          selectsStart
                          startDate={this.state.dateStart}
                          endDate={this.state.dateEnd}
                          onChange={this.handleDateChange.bind(this,'dateStart')}
                          placeholderText={window.localization['GENERAL_WIDGET_FROM']}
                          locale="{LOCALE}"
                      />
                    </div>

                    <div className="input-date">
                      <DatePicker
                          className="input-date"
                          selected={this.state.dateEnd}
                          selectsEnd
                          startDate={this.state.dateStart}
                          minDate={this.state.dateStart}
                          endDate={this.state.dateEnd}
                          onChange={this.handleDateChange.bind(this,'dateEnd')}
                          placeholderText={window.localization['GENERAL_WIDGET_TO']}
                          locale="{LOCALE}"
                      />
                    </div>
                  </div>
                }

                <input type="submit" value={window.localization['GENERAL_BUTTON_SEARCH']} className="btn" />
                <div className="separator"></div>
              </form>
            </div>
        );
    }
}

export default FilterBar;
