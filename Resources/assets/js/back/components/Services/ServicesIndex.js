import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PageTitle from '../Layout/PageTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import DataTable from '../Layout/DataTable';
import Separator from '../Layout/Separator';
import api from '../../api/index.js';

export default class ServicesIndex extends Component {

    // ==============================
    // Handlers
    // ==============================
    
    handleDatatableClick(type, payload, datatable) {
        switch (type) {
            case 'delete':

                bootbox.confirm({
                    message: "Êtes-vous sur de vouloir supprimer cette service?",
                    buttons: {
                        confirm: {
                          label: 'Oui',
                          className: 'btn-primary'
                        },
                        cancel: {
                          label: 'Non',
                          className: 'btn-default'
                        }
                    },
                    callback: function (result) {
                        if(result) {
                            api.services.delete(payload)
                                .then(function (payload) {
                                    datatable.ajax.reload();
                                    toastr.success('Service supprimé !');
                                });
                        }
                    }
                });

                return;
            default:
                return;
        }
    }

    // ==============================
    // Renderers
    // ==============================

    render() {
        return (
            <div className="container leftbar-page">
                <div className="col-xs-offset-2 col-xs-8 page-content">

                    <PageTitle
                        title={'Services'}
                        icon={'fa fas fa-external-link-alt'}
                    >
                        <ButtonPrimary
                            label={'Ajouter'}
                            icon={'fa fa-plus'}
                            route={routes['extranet.services.create']}
                        />

                    </PageTitle>

                    <Separator
                        height={50}
                    />

                    <DataTable
                        id={'services-datatable'}
                        columns={[
                            //{ data: 'identifier', name: 'identifier', label : 'Identifiant' },
                            { data: 'name', name: 'name', label : 'Nom' },
                            { data: 'http_method', name: 'http_method',label : 'Methode'  },
                            { data: 'url', name: 'url',label : 'URL'  },
                            { data: 'create_at', name: 'create_at', label : 'Date' },
                            { data: 'action', name: '', orderable: false, searchable: false, label : '' }
                        ]}
                        init={true}
                        route={routes['extranet.services.datatable']}
                        onClick={this.handleDatatableClick.bind(this)}
                    />

                </div>
            </div>
        );
    }
}

if (document.getElementById('services-index')) {
    ReactDOM.render(<ServicesIndex />, document.getElementById('services-index'));
}
