import React, {Component} from 'react';
import { render } from 'react-dom';

import TableComponent from './TableComponent';

class ModalTable extends Component {

  constructor(props){
    super(props);

    //console.log(" ModalTable :: construct ",props);

    this.state = {
      loading : true,
      model : null,
      element : null,
      parameters : '',
      isOn : false
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
    if(!props.display){
      return {
        ...state,
        model : null,
        element : null,
        parameters : ''
      }
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
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

      var urlArray = modalUrl.split('?');

      var self = this;

      axios.get('/architect/extranet/element-modal/'+urlArray[0])
        .then(function(response) {
            if(response.status == 200
                && response.data !== undefined)
            {
              console.log("ModalTable :: data => ",response.data);

              self.setState({
                model : response.data.model,
                element : response.data.element,
                parameters : urlArray[1],
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
      }});
  }

  renderHeader(){
    if(this.state.model == null)
      return null;

    return (
      <h2><i className={this.state.element.icon}></i> {this.state.element.name}</h2>
    )
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
          pagination={25}
          itemsPerPage={25}
          onOpenModal={this.props.onOpenModal}
          parameters={this.state.parameters}
        />
      );
    }

    return null;
  }

  render() {

    return (
      <div
        className="custom-modal"
        id={this.props.id}
        style={{
          zIndex: this.props.zIndex !== undefined ? this.props.zIndex : 500
        }}
      >
          <div className="modal-background"></div>


          <div className="modal-container">
            <div className="modal-header">
              {this.renderHeader()}

              <div className="modal-buttons">
                <a className="btn btn-default close-button-modal" onClick={this.onModalClose}>
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>

            <div className="modal-content">

              <div className="row">
                <div className="col-xs-12 col-md-10 col-md-offset-1">
                  {this.renderElement()}
                </div>
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
