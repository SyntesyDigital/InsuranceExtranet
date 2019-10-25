
import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {
  openModalParameters
} from './../actions/';

import {
  checkValidParameters
} from './../functions/';

class ParametersButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      valid : true,
      loading : true,
    };

  }

  componentWillReceiveProps(nextProps) {

    var valid = true;
    var loading = true;

    if(nextProps.contents.content !== undefined &&
      nextProps.contents.content != null ){

        valid = checkValidParameters(nextProps.contents.content.params);
        loading = false;
    }

    this.setState({
      valid : valid,
      loading : loading
    });

  }

  onButtonPressed(event) {
    event.preventDefault();

    console.log("button pressed!");

    this.props.openModalParameters();
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
        contents: state.contents,
        app: state.app
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openModalParameters : () => {
            return dispatch(openModalParameters());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ParametersButton);
