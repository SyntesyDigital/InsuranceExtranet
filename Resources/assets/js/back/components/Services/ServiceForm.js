import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import InputField from '../Layout/Fields/InputField';
import ButtonDropdown from '../Layout/ButtonDropdown';
import InputFieldJsonEdit from '../Layout/Fields/InputFieldJsonEdit';
import SelectField from '../Layout/Fields/SelectField';
import api from '../../api/index.js';

export default class ServiceForm extends Component {

    constructor(props) {

        super(props);

        this.state = {

            service: {
                http_method : 'POST',
                json : '{}'
            },

            errors: {},

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

            json : {}


        };


    }

    componentDidMount() {       
        this.props.serviceId ? this.load() : null;
    }

    // ==============================
    // Actions
    // ==============================
    load() {
        api.services.get(this.props.serviceId)
            .then(payload => this.setState({
                'service': payload.data.service ? payload.data.service : null,
                'json' : JSON.parse(payload.data.service.json)
            }));
    }

    create() {
        api.services.create(this.state.service)
            .then(payload => this.handleSaveSuccess(payload.data.createService))
            .catch(error => this.handleSaveError(error));
    }

    update() {
        api.services.update(this.state.service.id, this.state.service)
            .then(payload => this.handleSaveSuccess(payload.data.updateService))
            .catch(error => this.handleSaveError(error));
    }

    save() {
        return this.state.service.id !== undefined 
            ? this.update()
            : this.create();
    }

    // ==============================
    // Handlers
    // ==============================

    handleSaveSuccess(service) {
        this.setState({
            service: service,
            errors: {}
        });
        toastr.success('Service enregistré');
    }

    handleSaveError(error) {
        toastr.error('Une erreur est survenue lors de l\'enregistrement du service');
        
        error.graphQLErrors.map(({ extensions }, i) => {
            Object.keys(extensions.validation).map((k) => {
                // FIXME: better way to do this ?
                var errors = this.state.errors;
                errors[k.split('.')[1]] = true;
                this.setState({
                    errors : errors
                });
            }, this);
        }, this);
    }

    handleFieldChange(name, value) {
        const { service } = this.state;
        service[name] = value;

        this.setState({
            service: service
        });
    }

    handleRemove() {
        
        var _this = this;

        bootbox.confirm({
            message: this.props.rempoveMessage !== undefined ? 
            this.props.rempoveMessage : Lang.get('fields.delete_row_alert'),
            buttons: {
                confirm: {
                    label: Lang.get('fields.si') ,
                    className: 'btn-primary'
                },
                cancel: {
                    label:  Lang.get('fields.no'),
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if(result){
                    api.services.delete(_this.state.service.id)
                        .then(function(data){
                            window.location.href = routes['extranet.services.index'];
                        })
                }
              }
            });        
    }

    handleSubmit() {
        this.save();
    }

    // ==============================
    // Renderers
    // ==============================

    render() {

        return (
            <div className="services-update">

                <BarTitle
                    icon={'fas fa-external-link-alt'}
                    title={this.state.service.name ? this.state.service.name : 'Nouveau service'}
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
                            id={'json'}
                            label={'JSON'}
                            width={'100%'}
                            name={'json'}
                            placeholder={this.state.json}
                            onChange={this.handleFieldChange.bind(this)}
                            
                        />
                    </div>

                    <div className="sidebar">

                        <InputField
                            label={'Identifier'}
                            value={this.state.service.identifier ? this.state.service.identifier : ''}
                            name={'identifier'}
                            onChange={this.handleFieldChange.bind(this)}
                            error={this.state.errors.identifier ? true : false}
                        />

                        <InputField
                            label={'Name'}
                            value={this.state.service.name ? this.state.service.name : ''}
                            name={'name'}
                            onChange={this.handleFieldChange.bind(this)}
                            error={this.state.errors.name ? true : false}
                        />

                        <div className="form-group">
                            <SelectField
                                label={'Methode HTTP'}
                                value={this.state.service.http_method ? this.state.service.http_method : ''}
                                name={'http_method'}
                                arrayOfOptions={this.state.methodes}
                                onChange={this.handleFieldChange.bind(this)}
                                error={this.state.errors.http_method ? true : false}
                            />
                        </div>

                        <InputField
                            label={'Boby (WS)'}
                            value={this.state.service.boby ? this.state.service.boby : ''}
                            name={'boby'}
                            onChange={this.handleFieldChange.bind(this)}
                            error={this.state.errors.boby ? true : false}
                        />

                        <InputField
                            label={'Url'}
                            value={this.state.service.url ? this.state.service.url : ''}
                            name={'url'}
                            onChange={this.handleFieldChange.bind(this)}
                            error={this.state.errors.url ? true : false}
                        />

                        <InputField
                            label={'Response'}
                            value={this.state.service.response ? this.state.service.response : ''}
                            name={'response'}
                            onChange={this.handleFieldChange.bind(this)}
                            error={this.state.errors.response ? true : false}
                        />

                        <InputField
                            label={'Commentaire'}
                            value={this.state.service.comment ? this.state.service.comment : ''}
                            name={'comment'}
                            onChange={this.handleFieldChange.bind(this)}
                            error={this.state.errors.comment ? true : false}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('services-form')) {
    var element = document.getElementById('services-form');

    ReactDOM.render(<ServiceForm serviceId={element.getAttribute('serviceId')} />, element);
}


