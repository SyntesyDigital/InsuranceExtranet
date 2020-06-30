import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import "react-table/react-table.css";


export default class TotalBoxPrice extends Component {

  constructor(props) {
    super(props);

    const elementObject = props.elementObject ? JSON.parse(atob(props.elementObject)) : null;
    const model = props.model ? JSON.parse(atob(props.model)) : null;

    this.state = {
      elementObject: elementObject,
      total: 1000,
      model: model
    };
  }

  componentDidMount() {
    // this.query();
  }

  getUrlParameters() {
    //concat parameters, first constant parameters
    // var parameters = this.state.model.DEF1 != null ?
    //   this.state.model.DEF1 : '';

    // if (parameters != '')
    //   parameters += "&";

    // //then
    // parameters += this.props.parameters;

    // return parameters;
  }

  query() {
    // var self = this;
    // const { elementObject } = this.state;
    // const parameters = this.getUrlParameters();

    // axios.get('/architect/extranet/' + elementObject.id + '/model_values/data/1?' + parameters)
    //   .then(function (response) {
    //     if (response.status == 200
    //       && response.data.modelValues !== undefined) {
    //       console.log("ModelValues  :: componentDidMount => ", response.data);

    //       self.setState({
    //         total: response.data.total != null ? response.data.total : 0
    //       });
    //     }

    //   }).catch(function (error) {
    //     console.log(error);
    //     self.setState({
    //       loading: false
    //     });
    //   });
  }

  render() {
    return (
      <div>
        <NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value.replace(',', '.')}</div>} />
      </div>
    );
  }
}

if (document.getElementById('totalBoxPrice')) {
  document.querySelectorAll('[id=totalBoxPrice]').forEach(function (element) {
    var elementObject = element.getAttribute('elementObject');
    var model = element.getAttribute('model');
    var parameters = element.getAttribute('parameters');
    ReactDOM.render(<TotalBoxPrice
      elementObject={elementObject}
      model={model}
      parameters={parameters}
    />, element);
  });
}


