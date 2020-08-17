import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ButtonPrimary, PageTitle } from "architect-components-library";
import DataTable from '../../Layout/DataTable';
import Separator from '../../Layout/Separator';
import ModalEditCurrencies from '../components/ModalEditCurrencies';
import api from '../../../api/index.js';

export default class CurrenciesIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false,
            currencyId:null
        }
        this.datatable = React.createRef();
    }

   
    // ==============================
    // Remove item
    // ==============================

    removeItem(id) {
        console.log("Currencies :: removeItem :: (id) ", id);

        var self = this;

        bootbox.confirm({
            message: Lang.get('fields.sure'),
            buttons: {
                confirm: {
                    label: Lang.get('fields.si'),
                    className: 'btn-primary'
                },
                cancel: {
                    label: Lang.get('fields.no'),
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                     api.currencies.delete(id)
                         .then(function (response) {
                             toastr.success('Suppression effectué avec succès', { timeOut: 10000 });

                             const node = self.datatable.current;
                             node.refreshDatatable();

                         }, function (response) {
                             toastr.error('Il y avait une erreur');
                         });
                }
            }
        });

    }


    


    // ==============================
    // Handlers
    // ==============================

    handleCreateCurrency() {
        this.setState({
            display: true,
            currencyId: null
        });
    }

    handleCancelCurrency() {
        this.setState({
            display: false,
            currencyId:null
        });
    }

    handleCreatedUpdatedItem() {
        this.setState({
            display: false,
            currencyId:null
        });
        this.datatable.current.refreshDatatable();
    }

    handleDatatableClick(type, payload, datatable) {
        console.log("handleDatatableClick :: " ,type, payload, datatable);
        switch (type) {
            case 'delete':
                this.removeItem(payload);
                return;
            case 'update':

                this.setState({
                    display: true,
                    currencyId:payload
                });
                console.log("update", payload)
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
                    <ModalEditCurrencies
                        id={'modal-edit-currencies'}
                        icon={'fas fa-bars'}
                        size={'medium'}
                        title={'Edit | Currency'}
                        display={this.state.display}
                        currency={{}}
                        currencyId={this.state.currencyId}
                        zIndex={10000}
                        onModalClose={this.handleCancelCurrency.bind(this)}
                        onCancel={this.handleCancelCurrency.bind(this)}
                        onSaveUpdate={this.handleCreatedUpdatedItem.bind(this)}
                       // onRemove={this.removeItem(this)}
                    />
                    <PageTitle
                        title={'Divises'}
                        icon={'fas fa-coins'}
                    >
                        <ButtonPrimary
                            label={'Ajouter'}
                            icon={'fa fa-plus'}
                            onClick={this.handleCreateCurrency.bind(this)}
                        />
                    </PageTitle>
                    <Separator
                        height={50}
                    />
                    <DataTable
                        ref={this.datatable}
                        id={'currencies-datatable'}
                        columns={[
                            { data: 'label', name: 'label', label: 'Libelle' },
                            { data: 'code', name: 'code', label: 'ISO' },
                            { data: 'symbole', name: 'symbole', label: 'Symbol' },
                            { data: 'default', name: 'default', label: 'Défault' },
                            { data: 'action', name: '', orderable: false, searchable: false }
                        ]}
                        init={true}
                        route={routes['extranet.currencies.datatable']}
                        onClick={this.handleDatatableClick.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

if (document.getElementById('currencies-index')) {
    ReactDOM.render(<CurrenciesIndex />, document.getElementById('currencies-index'));
}
