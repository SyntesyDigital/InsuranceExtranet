import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PageTitle from '../Layout/PageTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import DataTable from '../Layout/DataTable';
import Separator from '../Layout/Separator';

export default class ServicesIndex extends Component {

    // ==============================
    // Handlers
    // ==============================

    handleRemoveItem(id) {
        console.log("ServicesIndex :: removeItem :: (id) ", id);
    }

    handleDatatableClick(type, payload) {
        switch (type) {
            case 'delete':
                this.handleRemoveItem(payload);
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
                            { data: 'identifier', name: 'Identifiant' },
                            { data: 'name', name: 'Nom' },
                            { data: 'http_method', name: 'Methode' },
                            { data: 'url', name: 'URL' },
                            { data: 'boby', name: 'Boby' },
                            { data: 'action', name: '', orderable: false, searchable: false }
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
