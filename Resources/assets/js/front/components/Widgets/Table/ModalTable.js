import React, {Component} from 'react';
import { render } from 'react-dom';

import TableComponent from './TableComponent';
import FileComponent from './../File/FileComponent';
import FormComponent from './../Forms/Form/FormComponent';
import CardComponent from './../ElementCard/CardComponent';


import moment from 'moment';

class ModalTable extends Component {

  constructor(props){
    super(props);

    //console.log(" ModalTable :: construct ",props);

    this.state = {
      loading : true,
      model : null,
      element : null,
      parameters : '',
      isOn : false,
      formId : "modal-form"+moment().unix()
    };

    this.isOn = false;

    this.onModalClose = this.onModalClose.bind(this);
  }

  componentDidMount() {

    if(this.props.display && !this.isOn){
        this.modalOpen();
    }

  }

  static getDerivedStateFromProps(props, state) {
    //update state with new props
    /*
    if(!props.display){
      return {
        ...state,
        model : null,
        element : null,
        parameters : ''
      }
    }
    */

    return null;
  }

  componentDidUpdate(prevProps, prevState) {

    console.log(" ModalTable :: componentDidUpdate (prevProps,this.props)",prevProps,this.props);

    if(this.props.display){
      if(!this.isOn){
        this.isOn = true;
        this.loadElement(this.props.modalUrl);
      }
    } else {
      if(this.isOn)
        this.modalClose();
    }
  }

  loadElement(modalUrl) {

      console.log("loadElement :: ",modalUrl.split('?'));
      var modelId = modalUrl;
      var parameters = "";

      //modal Url format is [element_id]?[param_key]=[param_value]&[param_key_2]=[param_value_2]
      //Example : 75?id_pol=11061240;

      if(typeof modalUrl === 'string' && modalUrl.indexOf("?") != -1){
        var urlArray = modalUrl.split('?');
        modelId = urlArray[0];
        parameters = urlArray[1];
      }

      var self = this;

      axios.get(ASSETS+'/architect/extranet/element-modal/'+modelId)
        .then(function(response) {
            if(response.status == 200
                && response.data !== undefined)
            {
              console.log("ModalTable :: data => ",response.data);

              self.setState({
                model : response.data.model,
                element : response.data.element,
                parameters : parameters,
                loading : false
              });

              self.modalOpen();

            }
        }).catch(function (error) {
           console.log(error);
         });
  }

  onModalClose(e){
      e.preventDefault();
      this.props.onModalClose();
  }

  modalOpen()
  {
    $('body').css({overflow:'hidden'});
    TweenMax.to($("#"+this.props.id),0.5,{opacity:1,display:"block",ease:Power2.easeInOut});
  }

  modalClose() {

    this.isOn = false;

    var self = this;
      TweenMax.to($("#"+this.props.id),0.5,{display:"none",opacity:0,ease:Power2.easeInOut,onComplete:function(){
        $('body').css({overflow:'auto'});
        self.setState({
          model : null,
          element : null,
          parameters : ''
        });
      }});
  }

  renderHeader(){
    if(this.state.model == null)
      return null;

    return (
      <h2><i className={this.state.element.icon}></i> {this.state.element.name}</h2>
    )
  }

  handleFormFinished(formParameters) {
    //this.props.onModalClose();
    this.props.onFormFinished(formParameters);
  }

  renderElement() {

    const element = this.state.element;

    if(element == null)
      return null;

    if(element.type == "table"){
      return (
        <TableComponent
          elementObject={this.state.element}
          model={this.state.model}
          id={this.state.model.ID+moment().unix()}
          pagination={10}
          itemsPerPage={10}
          onOpenModal={this.props.onOpenModal}
          parameters={this.state.parameters}
        />
      );
    }
    else if(element.type == "file") {

      return (
        <CardComponent
          field={null}  // there's no field
          element={this.state.element}
          model={this.state.model}
          parameters={this.state.parameters}
        />
      );
      /*
      return (
        <FileComponent
          elementObject={this.state.element}
          model={this.state.model}
          doubleColumn={true}
          parameters={this.state.parameters}
        />
      );
      */
    }
    else if(element.type == "form") {
      return (
        <div className="row">
          <div className="col-xs-12 col-md-10 col-md-offset-1">
            <FormComponent
              elementObject={this.state.element}
              parameters={this.state.parameters}
              finalRedirectUrl={this.props.redirectUrl != null ? 
                this.props.redirectUrl : ''}
              onFormFinished={this.handleFormFinished.bind(this)}
              version={"1"}
              id={this.state.formId}
            />
          </div>
        </div>
      );
    }
    else if(element.type == "form-v2") {
      return (
        <div className="row">
          <div className="col-xs-12 col-md-10 col-md-offset-1">
            <FormComponent
              elementObject={this.state.element}
              parameters={this.state.parameters}
              finalRedirectUrl={this.props.redirectUrl != null ? 
                this.props.redirectUrl : ''}
              onFormFinished={this.handleFormFinished.bind(this)}
              version={"2"}
              id={this.state.formId}
            />
          </div>
        </div>
      );
    }

    return null;
  }

  render() {

    const size = this.state.element != null && this.state.element.type.indexOf('form') != -1 ? 'medium' : 'large';

    return (
      <div
        className="modal-table-component custom-modal modal-table "
        id={this.props.id}
        style={{
          zIndex: this.props.zIndex !== undefined ? this.props.zIndex : 500
        }}
      >
          <div className="modal-background"></div>


          <div className="modal-container">

            <div className={"modal-content "+size}>

              <div className="modal-header">
                {this.renderHeader()}

                <div className="modal-buttons">
                  <a className="btn btn-default close-button-modal" onClick={this.onModalClose}>
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </div>

              <div className="modal-body">

                {this.renderElement()}

              </div>

              <div className="modal-footer">

              </div>
            </div>
         </div>
      </div>
    );
  }

}

export default ModalTable;
