import React, {Component} from 'react';
import { render } from 'react-dom';

class ConditionsModal extends Component {

  constructor(props) {
    super(props);

    this.onModalClose = this.onModalClose.bind(this);

    this.state = {
      id : 'modal-conditions',
      isOpen : false,
      zIndex : 13000
    };

    this.handleInputChange = this.handleInputChange.bind(this);

  }

  onModalClose(e) {
    e.preventDefault();

    this.props.onModalClose();
  }

  componentWillReceiveProps(nextProps) {
      console.log("ModalParameters :: ",nextProps);

      if(nextProps.display != this.state.isOpen){
          if(nextProps.display){
            this.openModal();
          }
          else {
            this.closeModal();
          }
      }
  }

  openModal() {
      $("#"+this.state.id).css({
          display: "block"
      });
      TweenMax.to($("#"+this.state.id), 0.5, {
          opacity: 1,
          ease: Power2.easeInOut
      });
      this.setState({
          isOpen : true
      });

  }

  closeModal() {
      var self = this;

      TweenMax.to($("#"+this.state.id), 0.5, {
          display: "none",
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: function() {
              self.setState({
                  isOpen : false
              });
          }
      });
  }


  render() {

    if(this.props.conditionIndex == null)
      return null;

    const condition = this.props.conditions[this.props.conditionIndex];

    return (
      <div style={{zIndex:this.state.zIndex}}>
        <div className="custom-modal" id={this.state.id}>
          <div className="modal-background"></div>
            <div className="modal-container">
              <div className="modal-header">

                  <h2>conditions de visibilité</h2> &nbsp;&nbsp;

                <div className="modal-buttons">
                  <a className="btn btn-default close-button-modal" onClick={this.onModalClose}>
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </div>

              <div className="modal-content">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12 col-md-8 col-md-offset-2">

                      {this.props.initialValue.name} si :

                      <div className="form-group bmd-form-group">
                         <label htmlFor="num" className="bmd-label-floating">
                            Type of field
                         </label>
                         <select className="form-control" name="type" value={} onChange={this.handleInputChange} >

                         </select>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <a href="" className="btn btn-default" onClick={this.onModalClose}> Fermer </a> &nbsp;
                </div>

              </div>
          </div>
        </div>
      </div>
    );
  }

}
export default ConditionsModal;
