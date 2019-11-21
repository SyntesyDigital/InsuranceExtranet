import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CountriesSelect extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
          countries : []
        };
    }

    componentDidMount() {
      this.loadCountries();
    }

    loadCountries() {

      var self = this;

      axios.get(ASSETS+LOCALE+'/countries/list')
        .then(function(response){

          self.setState({
            countries : response.data
          });
        }).catch(function(error){
          console.log(error);
        });
    }

    renderCountries() {

      const countries = this.state.countries;

      return Object.keys(countries).map((key,index) =>
        <option value={key} key={key}>{countries[key]}</option>
      );
    }

    render() {

        const {order} = this.state;

        return (
            <select
              className={this.props.className}
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
            >
              <option value="">{window.localization['GENERAL_FORM_NATIONALITY']}</option>
              {this.renderCountries()}
            </select>
        );
    }
}
