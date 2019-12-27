import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PageTitle from '../Layout/PageTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import ButtonSecondary from '../Layout/ButtonSecondary';
import DataTable from '../Layout/DataTable';
import Separator from '../Layout/Separator';

export default class RolesIndex extends Component {
    render() {
        return (
            <div className="container leftbar-page">
              <div className="col-xs-offset-2 col-xs-8 page-content">

                <PageTitle
                  title={'Roles'}
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
                        {data: 'icon', name: 'Icon'},
                        {data: 'name', name: 'Name'},
                        {data: 'role', name: 'Identifier'},
                        {data: 'default', name: 'Default'},
                        {data: 'action', name: '', orderable: false, searchable: false}
                    ]}
                    init={true}
                    route={routes['extranet.roles.datatable']}
                />

              </div>
            </div>
        );
    }
}

if (document.getElementById('roles-index')) {
    ReactDOM.render(<RolesIndex />, document.getElementById('roles-index'));
}
