import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PageTitle from '../Layout/PageTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import DataTable from '../Layout/DataTable';
import Separator from '../Layout/Separator';

export default class ServicesIndex extends Component {
    render() {
        return (
            <div className="container leftbar-page">
              <div className="col-xs-offset-2 col-xs-8 page-content">

                <PageTitle
                  title={'Services'}
                  icon={'fa fa-file'}
                >
                  <ButtonPrimary
                    label={'Ajouter'}
                    icon={'fa fa-plus'}
                  />
                </PageTitle>

                <Separator
                  height={50}
                />

                <DataTable
                    columns={[
                        {data: 'identifiant', name: 'Identifiant'},
                        {data: 'nom', name: 'Nom'},
                        {data: 'methode', name: 'Methode'},
                        {data: 'url', name: 'Url'},
                        {data: 'action', name: '', orderable: false, searchable: false}
                    ]}
                    init={true}
                    route={routes['extranet.services.datatable']}
                />

              </div>
            </div>
        );
    }
}

if (document.getElementById('services-index')) {
    ReactDOM.render(<ServicesIndex />, document.getElementById('services-index'));
}
