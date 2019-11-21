import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Paginator from './../Common/Paginator';
import ListItem from './../Common/ListItem';
import ModalForm from './../Common/ModalForm';
import ModalThanks from './../Common/ModalThanks';



export default class ContactForm extends Component {

    constructor(props)
    {
        super(props);

        const field = props.field ? JSON.parse(atob(props.field)) : '';

        this.state = {
            field : field,
            displayModal : false,
            displayThanks : false,
            initProgram : field.settings.program
        };
    }

    processText(fields,fieldName){
      return fields[fieldName].value != null && fields[fieldName].value[LOCALE] !== undefined ?
        fields[fieldName].value[LOCALE] : '' ;
    }

    openForm(event) {
      event.preventDefault();

      this.setState({
        displayModal : true
      });
    }

    handleModalClose() {
      this.setState({
        displayModal : false
      });
    }

    handleFormSubmited() {
      this.setState({
        displayModal : false,
        displayThanks : true
      });
    }

    handleThanksClose() {
      this.setState({
        displayThanks : false
      });
    }

    render() {

        const fields = this.state.field.fields;

        const title = this.processText(fields,0);

        return (
            <div>

                <ModalForm
                  csrf_token={this.props.csrf_token}
                  initProgram={this.state.initProgram}
                  display={this.state.displayModal}
                  onModalClose={this.handleModalClose.bind(this)}
                  onSubmitSuccess={this.handleFormSubmited.bind(this)}
                />

                <ModalThanks
                  id="modal-thanks-contact"
                  display={this.state.displayThanks}
                  onModalClose={this.handleThanksClose.bind(this)}
                />

                <button type="button" className="btn" onClick={this.openForm.bind(this)}>
                  {title}
                </button>
            </div>
        );
    }
}

if (document.getElementById('contact-form')) {

    document.querySelectorAll('[id=contact-form]').forEach( element => {

        var field = element.getAttribute('field');
        var csrf_token = element.getAttribute('csrf_token');

        ReactDOM.render(<ContactForm
            field={field}
            csrf_token={csrf_token}
          />, element);
    });
}
