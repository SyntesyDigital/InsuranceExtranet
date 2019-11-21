import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import CountriesSelect from './CountriesSelect';

class ModalForm extends Component {

    constructor(props)
    {
        super(props);

        var initProgram = props.initProgram != null && props.initProgram != '' ?
          props.initProgram : null;

        var programCheckboxes = {};
        if(initProgram != null && initProgram != ''){
          programCheckboxes[initProgram] = true;
        }

        this.state = {
          fields : {
            firstname : '',
            lastname : '',
            email : '',
            country : '',
            company : '',
            company_type : '',
            comment : '',
            privacity : false,
            newsletter : false,
            programCheckboxes : programCheckboxes,
            initProgram : initProgram
          },
          programs : [],
          savig : false,
          errors : {}
        }

        this.hideModal = this.hideModal.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);


    }

    loadPrograms() {
      var self = this;

      axios.get(ASSETS+'externalapi/programs')
        .then(function (response) {

            if(response.status == 200
                && response.data.data !== undefined
                && response.data.data.length > 0)
            {
                self.setState({
                    programs : response.data.data
                });
            }


        }).catch(function (error) {
           console.log(error);
         });
    }

    componentDidMount() {
      //this.openModal();
      this.loadPrograms();
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.display){
        this.openModal();
      }
      else {
        this.hideModal()
      }
    }

    getFormData()
    {

        const {fields} = this.state;

        fields['_token'] = this.props.csrf_token;

        return fields;
    }

    onFieldChange(event) {

      const {fields} = this.state;

      fields[event.target.name] = event.target.value;

      this.setState({
        fields : fields
      });

    }

    onCheckboxChange(event) {

      const {fields} = this.state;

      fields[event.target.name] = event.target.checked;

      this.setState({
        fields : fields
      });

    }

    onProgramChange(event) {

      const {fields} = this.state;

      if(event.target.checked){
          fields.programCheckboxes[event.target.name] = event.target.checked;
      }
      else {
        delete fields.programCheckboxes[event.target.name];
      }


      this.setState({
        fields : fields
      });

    }

    handleSubmit(event) {
      event.preventDefault();

      this.setState({
        saving : true,
        errors : {}
      });

      var _this = this;
      axios.put(WEBROOT+'/contact/save', this.getFormData())
          .then((response) => {
              if(response.data.success) {
                  _this.onSaveSuccess(response.data);
              }
          })
          .catch((error) => {
              if (error.response) {
                  _this.onSaveError(error.response.data);
              } else if (error.message) {
                  //toastr.error(error.message);
              } else {
                  console.log('Error', error.message);
              }
              //console.log(error.config);
          });

    }

    onSaveSuccess(response)
    {
        this.setState({
            errors : {},
            saving : false
        });

        this.props.onSubmitSuccess();
    }


   onSaveError(response)
   {

      console.log("onSaveError => ",response);

       var errors = response.errors ? response.errors : null;
       var _this = this;
       var stateErrors = this.state.errors;

       if(errors) {
           var fields = errors ? errors : null;

           if(fields) {
               Object.keys(fields).map(function(identifier){
                      stateErrors[identifier] = true;
                });
           }
       }

       this.setState({
         saving : false,
         errors : stateErrors
       });


       if(response.message) {
           //toastr.error(response.message);
       }
    }

    openModal() {
      $("#modal-form").css({
          display:"block",
          zIndex:1000
      });

      $('body').css({overflow:'hidden'});

      TweenMax.to($("#modal-form"),1,{
          delay : 0.25,
          opacity:1,
          ease: Power2.easeInOut
      });
    }

    onModalClose(e) {
      e.preventDefault();

      this.props.onModalClose();
    }

    hideModal() {
      TweenMax.to($("#modal-form"),0.75,{opacity:0,ease: Power2.easeInOut,onComplete :function(){
            $("#modal-form").css({
                opacity:0,
                display:'none',
                zIndex:0
            });
            $('body').css({overflow:'auto'});
        }});
    }

    hasErrors(name){
      if(this.state.errors[name] !== undefined){
        return 'error';
      }

      return '';
    }

    renderCheckboxes() {

      var result = [];

      const programValues = this.state.fields.programCheckboxes;
      const programs = this.state.programs;

      //console.log("renderCheckboxes :: ",programValues,programs);

      for(var key in programs){
        result.push(
          <label className="col-xs-12 col-md-6" key={key}>
            <input type="checkbox" name={programs[key].id} value="" id="checkbox_1" onChange={this.onProgramChange.bind(this)} checked={programValues[programs[key].id] !== undefined} />
              {programs[key]['description_'+LOCALE]}
          </label>
        );
      }

      return result;

    }



    render() {

        const errors = Object.keys(this.state.errors).length > 0 ? true : false;
        const {programs,fields} = this.state;
        const initProgram = fields.initProgram;
        //console.log("Programs : ",programs,initProgram);

        return (
            <div className="custom-modal" id="modal-form">
              <div className="modal-background"></div>
              <div className="modal-container">
                <div className="modal-content">

                  <div className="modal-buttons">
                    <a className="close-button-modal" href="#" onClick={this.onModalClose.bind(this)}>
                      x
                    </a>
                  </div>

                  <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                      <form className="nova-cerca contact-form" onSubmit={this.handleSubmit.bind(this)}>
                        <h2>{window.localization['CONTACT_FORM_TITLE']}</h2>

                        {initProgram != null && programs[initProgram] !== undefined &&
                          <p dangerouslySetInnerHTML={{__html: window.localization['CONTACT_FORM_THANKS'].replace("%s", "<strong>"+programs[initProgram]['description_'+LOCALE]+"</strong>")}}>
                          </p>
                        }

                        {initProgram == null &&
                          <p dangerouslySetInnerHTML={{__html: window.localization['CONTACT_FORM_SUBTITLE'] }}>
                          </p>
                        }

                        <p>
                          {window.localization['CONTACT_FORM_SUBTITLE2']}

                        </p>

                        <div className="separator" style={{height:30}}></div>

                        <div className="row">

                          <div className="col-xs-12 col-md-6">
                            <div className="form-group ">
                              {/*<label htmlFor="title" >Nombre</label>*/}
                              <input type="text" className={this.hasErrors('firstname')} name="firstname" value={fields.firstname} placeholder={window.localization['GENERAL_FORM_NAME']} onChange={this.onFieldChange} />
                            </div>
                          </div>

                          <div className="col-xs-12 col-md-6">
                            <div className="form-group ">
                              <input type="text" className={this.hasErrors('lastname')} name="lastname" value={fields.lastname} placeholder={window.localization['GENERAL_FORM_SURNAME']} onChange={this.onFieldChange} />
                            </div>
                          </div>

                          <div className="col-xs-12 col-md-6">
                            <div className="form-group ">
                              <input type="text" className={this.hasErrors('email')} name="email" value={fields.email} placeholder={window.localization['GENERAL_FORM_MAIL']} onChange={this.onFieldChange}  />
                            </div>
                          </div>

                          <div className="col-xs-12 col-md-6">
                            <div className="form-group ">

                              <CountriesSelect
                                  className={this.hasErrors('country')} name="country" value={fields.country} onChange={this.onFieldChange}
                              />

                            </div>
                          </div>

                          <div className="col-xs-12 col-md-6">
                            <div className="form-group ">
                              <input type="text" className={this.hasErrors('company')} name="company" placeholder={window.localization['GENERAL_FORM_ENTERPRISE']} value={fields.company} onChange={this.onFieldChange} />
                            </div>
                          </div>

                          {initProgram != null &&
                            <div className="col-xs-12 col-md-6">
                              <div className="form-group ">
                                <select className={this.hasErrors('company_type')} name="company_type" value={fields.company_type} onChange={this.onFieldChange}>
                                  <option value="">{window.localization['GENERAL_FORM_ENTERPRISE_TYPE']}</option>
                                  <option value="ttoo">TTOO</option>
                                  <option value="aavv">AAVV</option>
                                  <option value="otros">{window.localization['GENERAL_FORM_OTHERS']}</option>
                                </select>
                              </div>
                            </div>
                          }

                        </div>

                        <div className="separator" style={{height:30}}></div>

                        {initProgram != null && programs[initProgram] !== undefined &&
                          <p>
                            Sector de interés: {programs[initProgram]['description_'+LOCALE]}
                          </p>
                        }
                        <p>
                        {window.localization['CONTACT_FORM_SUBTEXT']}

                        </p>

                        <div className="separator" style={{height:30}}></div>

                        <div className="row checkbox">

                            <div className="col-xs-12 col-md-offset-1 col-md-10">

                              {this.renderCheckboxes()}

                            </div>

                        </div>

                        <div className="separator" style={{height:30}}></div>

                        <div className="row">
                          <div className="col-xs-12">
                            <p>
                            {window.localization['GENERAL_FORM_COMMENT_TITLE']}
                            </p>

                            <textarea className="col-xs-12" name="comment" value={fields.comment} onChange={this.onFieldChange} />

                          </div>
                        </div>

                        <div className="separator" style={{height:30}}></div>

                        <div className="row checkbox">

                          <div className="col-xs-12">

                            <label className={"col-xs-12 "+this.hasErrors('privacity')}>
                              <input type="checkbox" className={this.hasErrors('privacity')} name="privacity" value={fields.comment} onChange={this.onCheckboxChange}  />
                              {window.localization['GENERAL_FORM_CHECKBOX_RGPD']}
                            </label>

                            <label className={"col-xs-12 "+this.hasErrors('newsletter')}>
                              <input type="checkbox" className={this.hasErrors('newsletter')} name="newsletter" value={fields.newsletter} onChange={this.onCheckboxChange}  />
                              {window.localization['GENERAL_FORM_CHECKBOX_NEWS']}
                            </label>

                            {/*
                            <label className={"col-xs-12 "+this.hasErrors('privacity')}>
                              <input type="checkbox" className={this.hasErrors('conditions')} name="conditions" value={fields.conditions} onChange={this.onCheckboxChange}  />
                              Aceptación de las <a href="">Condiciones de uso (PDF)</a>.
                            </label>
                            */}


                          </div>

                        </div>

                        <div className="separator" style={{height:40}}></div>

                        {errors &&
                          <p className="error-message">
                            {window.localization['GENERAL_FORM_ERROR']}
                          </p>
                        }

                        <div className="centered form-button-wrapper">
                          <input type="submit" disabled={this.state.saving} value={window.localization['GENERAL_FORM_SEND']} className="btn" />
                        </div>

                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>

        );
    }
}

export default ModalForm;
