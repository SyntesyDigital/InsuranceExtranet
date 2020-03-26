import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  preloadForm,
  skipPreload
} from './actions'

class FormPreload extends Component {

    constructor(props)
    {
        super(props);

        this.state = {};
    }

    static getDerivedStateFromProps(nextProps, prevState){

      return null;

    }

    componentDidUpdate(prevProps, prevState) {

      if(!prevProps.parameters.formParametersLoaded && this.props.parameters.formParametersLoaded) {
        //preload form
        this.preloadForm();
      }

      if(!prevProps.preload.done && this.props.preload.done) {
        console.log("componentDidUpdate :: onPreloadDone :: ", this.props.preload)
        this.props.onPreloadDone(this.props.preload.values);
      }
      
    }

    preloadForm() {

      console.log("FormPreload :: preloadForm ");
      const procedures = this.props.form.procedures;

      if(procedures.length == 0){
        console.error("FormPreload :: preloadForm : no procedure to process");
        this.props.skipPreload();
        return;
      }

      if(this.props.version == "2" && procedures[0].SERVICE.METHODE == "PUT" 
        && procedures[0].PRELOAD == "Y" ){
        this.props.preloadForm(
          procedures[0],
          this.props.parameters.formParameters
        );
        
      }
      else {
        //not preload available
        this.props.skipPreload();
      }
    }

    render() {
        return (
          <div></div>
        );
    }
}

const mapStateToProps = state => {
    return {
        form : state.form,
        parameters : state.parameters,
        preload : state.preload
    }
}

const mapDispatchToProps = dispatch => {
    return {
      preloadForm: (procedure,formParameters) => {
        return dispatch(preloadForm(procedure,formParameters));
      },
      skipPreload : () => {
         return dispatch(skipPreload());
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPreload);
