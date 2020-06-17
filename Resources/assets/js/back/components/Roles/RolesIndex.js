import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PageTitle from '../Layout/PageTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import DataTable from '../Layout/DataTable';
import Separator from '../Layout/Separator';
import api from "../../api/";

/**
 * Acciones : 
 *  - Borrar role a partir del id
 */
export default class RolesIndex extends Component {

    constructor(props){
      super(props);
      this.datatable = React.createRef();
    }

    removeItem(id) {
      console.log("RolesIndex :: removeItem :: (id) ",id);
      
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
            if(result){
              api.roles.delete(id)
                .then(function (response) {
                  toastr.success('Suppression effectué avec succès', {timeOut: 10000});
                  
                  const node = self.datatable.current;
                  node.refreshDatatable();
                  
                }, function(response) {
                  toastr.error('Il y avait une erreur');
                });
            }
          }
      });

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
                  title={'Roles'}
                  icon={'fas fa-user-shield'}
                >
                  <ButtonPrimary
                    label={'Ajouter'}
                    icon={'fa fa-plus'}
                    route={routes['extranet.roles.create']}
                  />
                </PageTitle>

                <Separator
                  height={50}
                />

                <DataTable
                    ref={this.datatable}
                    id={'roles-datatable'}
                    columns={[
                        {data: 'icon', name: 'Icon'},
                        {data: 'name', name: 'Name'},
                        {data: 'identifier', name: 'Identifier'},
                        {data: 'default', name: 'Default'},
                        {data: 'action', name: '', orderable: false, searchable: false}
                    ]}
                    init={true}
                    route={routes['extranet.roles.datatable']}
                    onClick={this.handleDatatableClick.bind(this)}
                />

              </div>
            </div>
        );
    }
}

if (document.getElementById('roles-index')) {
    ReactDOM.render(<RolesIndex />, document.getElementById('roles-index'));
}
