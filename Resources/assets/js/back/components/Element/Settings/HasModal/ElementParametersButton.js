
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  openModalElementParameters
} from './../../actions/';

import {
  checkValidParameters
} from './../../functions/';

import RedirectButton from './Redirect/RedirectButton';

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

  onButtonPressed(event) {
    event.preventDefault();

    console.log("button pressed!");

    this.props.openModalElementParameters();
  }

  render() {

    const element =  this.props.elements.element;
    console.log("ParameterButton element => ",element);
    const hasRedirect = element !== undefined && element != null && 
      element.type !== undefined && element.type == 'form';

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
        &nbsp;&nbsp;
        { hasRedirect &&
          <RedirectButton
          />
        }

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
