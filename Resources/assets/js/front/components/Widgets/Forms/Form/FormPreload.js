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

    /**
     * Function to get first procedure
     */
    getFirstPreloadProcedure(procedures) {
      for(var key in procedures) {
        var procedure = procedures[key];
        if(procedure.PRELOAD == "Y" ){
          return procedure;
        }
      }
      return null;
    }

    preloadForm() {

      console.log("FormPreload :: preloadForm ");
      const procedures = this.props.form.procedures;

      if(procedures.length == 0){
        console.error("FormPreload :: preloadForm : no procedure to process");
        this.props.skipPreload();
        return;
      }

      var preloadProcedure = this.getFirstPreloadProcedure(procedures);

      //if there is a put procedure to preload
      if(this.props.version == "2" && preloadProcedure != null ){
        this.props.preloadForm(
          preloadProcedure,
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
