
import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {
  openModalElementParameters
} from './../../actions/';

import {
  checkValidParameters
} from './../../functions/';

class ElementParametersButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      valid : true,
      loading : true,
    };

  }

  static getDerivedStateFromProps(props, state) {

    console.log("ElementParametersButton :: newElement :: getDerivedStateFromProps ",props.elements.element);

    if(props.elements.element !== undefined &&
      props.elements.element != null ){
        return {
          ...state,
          valid : checkValidParameters(props.elements.element.params),
          loading : false
        }
    }
    else {
      //not yet setup
      return {
        ...state,
        valid : true,
        loading : true
      }
    }

  }

  /*
  componentWillReceiveProps(nextProps) {

    var valid = true;
    var loading = true;

    console.log("ElementParametersButton :: componentWillReceiveProps ",nextProps.elements.element.params);

    if(nextProps.elements.element !== undefined &&
      nextProps.elements.element != null ){

        valid = checkValidParameters(nextProps.elements.element.params);
        loading = false;
    }

    this.setState({
      valid : valid,
      loading : loading
    });

  }
  */

  onButtonPressed(event) {
    event.preventDefault();

    console.log("button pressed!");

    this.props.openModalElementParameters();
  }

  render() {

    return (
      <div>

        <a href="" className="btn btn-default btn-parameters" onClick={this.onButtonPressed.bind(this)}> paramètres &nbsp;
          {!this.state.valid && !this.state.loading &&
          <span className="text-danger">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
          }
          {this.state.valid && !this.state.loading &&
            <span className="text-success">
              <i className="fas fa-check"></i>
            </span>
          }
        </a>
      </div>
    );
  }

}

const mapStateToProps = state => {
    return {
        elements: state.elements,
        app: state.app
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openModalElementParameters : () => {
            return dispatch(openModalElementParameters());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementParametersButton);
