import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PageTitle from '../PageTitle';
import ButtonPrimary from '../ButtonPrimary';
import ButtonSecondary from '../ButtonSecondary';
import DataTable from '../DataTable';
import Separator from '../Separator';

export default class Template1 extends Component {

    removeItem(id) {
      console.log("RolesIndex :: removeItem :: (id) ",id);
    }

    handleDatatableClick(type,payload) {
      switch(type) {
        case 'delete' : 
          this.removeItem(payload);
          return;
        default : 
          return;
      }
    }

    render() {
        return (
            <div className="container leftbar-page">
              <div className="col-xs-offset-2 col-xs-8 page-content">

                <PageTitle
                  title={'Name'}
                  icon={'fa fa-file'}
                >
                  <ButtonPrimary
                    label={'Ajouter'}
                    icon={'fa fa-plus'}
                  />
                  <ButtonSecondary
                    label={'Ajouter'}
                    icon={'fa fa-plus'}
                  />
                </PageTitle>

                <Separator
                  height={50}
                />

                <DataTable
                    id={'template-datatable'}
                    columns={[
                        {data: 'name', name: 'Nom'},
                        {data: 'age', name: 'Age'},
                        {data: 'default', name: 'Défaut'},
                        {data: 'action', name: '', orderable: false, searchable: false}
                    ]}
                    init={true}
                    route={routes['extranet.template.datatable']}
                    onClick={this.handleDatatableClick.bind(this)}
                />

              </div>
            </div>
        );
    }
}

if (document.getElementById('template-1')) {
    ReactDOM.render(<Template1 />, document.getElementById('template-1'));
}
