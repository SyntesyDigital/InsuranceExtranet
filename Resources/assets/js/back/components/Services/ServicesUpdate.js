import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import InputField from '../Layout/Fields/InputField';
import ButtonDropdown from '../Layout/ButtonDropdown';
import InputFieldJsonEdit from '../Layout/Fields/InputFieldJsonEdit';
import SelectField from '../Layout/Fields/SelectField';

export default class ServicesUpdate extends Component {

    constructor(props) {

        super(props);

        this.state = {

            service:
            {
                id: 1,
                identifiant: 'CSRIN',
                name: 'Sinistre',
                url: 'sinistre',
                response: 'id',
                methode: 'GET',
                commentaire: 'modification sinistre',
                P1: null,
                P2: null
            },

            methodes: [
                {
                    name: 'POST',
                    value: 'POST'
                },
                {
                    name: 'GET',
                    value: 'GET'
                },
                {
                    name: 'PUT',
                    value: 'PUT'
                },
            ],

            
        };


    }

    // ==============================
    // Handlers
    // ==============================

    handleFieldChange(name, value) {
        console.log("handleFieldChange :: (name,value) ", name, value);
        const { service } = this.state;
        service[name] = value;
        this.setState({
            service: service
        });
    }

    handleRemove() {
        console.log("handleRemoveRole");
    }

    handleSubmit() {
        console.log("handleSubmit");
    }

    // ==============================
    // Renderers
    // ==============================

    render() {

        return (

            <div className="services-update">

                <BarTitle
                    icon={'far fa-question-circle'}
                    title={this.state.service.name}
                    backRoute={routes['extranet.services.index']}
                >

                    <ButtonDropdown
                        label={'Actions'}
                        list={[
                            {
                                label: 'Nouveau',
                                icon: 'fa fa-plus-circle',
                                route: routes["extranet.services.create"],
                            },
                            {
                                label: 'Supprimer',
                                icon: 'fa fa-trash-alt',
                                onClick: this.handleRemove.bind(this),
                                className: 'text-danger'
                            }
                        ]}
                    />

                    <ButtonPrimary
                        label={'Sauvegarder'}
                        icon={'fa fa-save'}
                        onClick={this.handleSubmit.bind(this)}
                    />

                </BarTitle>

                <div className="container rightbar-page">

                    <div className="col-md-9 page-content form-fields">

                        <InputFieldJsonEdit
                            label={'JSON'}
                            width={'100%'}
                        />

                    </div>

                    <div className="sidebar">

                        <InputField
                            label={'Identifier'}
                            value={this.state.service.identifiant}
                            name={'identifiant'}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                        <InputField
                            label={'Name'}
                            value={this.state.service.name}
                            name={'name'}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                        <div className="form-group">
                            <SelectField
                                label={'Methode'}
                                value={this.state.service.methode}
                                name={'methode'}
                                arrayOfOptions={this.state.methodes}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                        </div>

                        <InputField
                            label={'Url'}
                            value={this.state.service.url}
                            name={'url'}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                        <InputField
                            label={'Response'}
                            value={this.state.service.response}
                            name={'response'}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                        <InputField
                            label={'Commentaire'}
                            value={this.state.service.commentaire}
                            name={'commentaire'}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                    </div>
                </div>
            </div>
        );
    }


}

if (document.getElementById('services-update')) {
    ReactDOM.render(<ServicesUpdate />, document.getElementById('services-update'));
}


