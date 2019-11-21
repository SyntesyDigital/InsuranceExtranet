import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ModalThanks extends Component {

    constructor(props)
    {
        super(props);

        this.isIn = false;
    }

    componentDidMount() {
      //this.openModal();
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.display){
        this.openModal();
      }
      else {
        this.hideModal()
      }
    }

    openModal() {

      if(!this.isIn){
        this.isIn = true;

        $("#"+this.props.id).css({
            display:"block",
            zIndex:1000
        });

        $('body').css({overflow:'hidden'});

        TweenMax.to($("#"+this.props.id),1,{
            delay : 0.25,
            opacity:1,
            ease: Power2.easeInOut
        });
      }
    }

    onModalClose(e) {
      e.preventDefault();

      this.props.onModalClose();
    }

    hideModal() {

      if(this.isIn){

        this.isIn = false;
        var self = this;

        TweenMax.to($("#"+this.props.id),0.75,{opacity:0,ease: Power2.easeInOut,onComplete :function(){
              $("#"+self.props.id).css({
                  opacity:0,
                  display:'none',
                  zIndex:0
              });
              $('body').css({overflow:'auto'});
          }});

      }
    }

    render() {

        return (
            <div className="custom-modal modal-thanks" id={this.props.id}>
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
                      <h2>Gràcies!</h2>
                      <p>
                         Curabitur semper augue nec dignissim sagittis. Suspendisse molestie eleifend turpis id dictum. Donec viverra dolor eget metus mollis placerat.
                      </p>
                      <p>
                         Curabitur semper augue nec dignissim sagittis. Suspendisse molestie eleifend turpis id dictum. Donec viverra dolor eget metus mollis placerat.
                      </p>

                      <p className="links">
                        <a href="#" onClick={this.onModalClose.bind(this)}>Tancar</a>
                		  </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>

        );
    }
}
