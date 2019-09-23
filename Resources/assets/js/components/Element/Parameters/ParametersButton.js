
import React, {Component} from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';

import {openModalParameters
} from './../actions/';

class ParametersButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      valid : true
    };

  }

  checkValidParameters(content) {

    var params = content.params;

    if(params != null && params.length > 0){
        for(var key in params){
            if(params[key].value == ""){
              return false;
            }
        }
    }

    return true;
  }

  componentWillReceiveProps(nextProps) {

    var valid = true;

    if(nextProps.contents.content !== undefined &&
      nextProps.contents.content != null ){

        valid = this.checkValidParameters(nextProps.contents.content);
    }

    this.setState({
      valid : valid
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
          {!this.state.valid &&
          <span className="text-danger">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
          }
          {this.state.valid &&
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
