import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PageTitle from '../Layout/PageTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import DataTable from '../Layout/DataTable';
import Separator from '../Layout/Separator';


import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: ASSETS+'graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: 'Bearer '+SESSION.token
      },
    });
  },
});

console.log("client => ",SESSION.token);

const IMPORT_USER = gql`
  mutation ImportUser($id_per: Int!){
    importUser(id_per: $id_per) {
        id
        id_per
        firstname
        lastname
        phone
    }
  }
  `;

export default class UsersIndex extends Component {

    handleClick(type,payload) {
      switch(type) {
        case "add":
          var userId = payload;
          console.log("handleClick :: ",userId);
          
          client
            .mutate({
              mutation: IMPORT_USER,
              variables: {
                id_per: userId,
              },
            })
            .then(function (result) {
              console.log("result => ",result);
            })

          break;
      }
    }

    render() {
        return (
            <div className="container leftbar-page">
              <div className="col-xs-offset-2 col-xs-8 page-content">

                <PageTitle
                  title={Lang.get('settings.users')}
                  icon={'fas fa-users'}
                >
                </PageTitle>

                <Separator
                  height={50}
                />

                <DataTable
                    id={'users-datatable'}
                    columns={[
                        {data: 'name', name: 'Nom'},
                        {data: 'username', name: 'Username'},
                        {data: 'roles', name: 'Roles'},
                        {data: 'action', name: '', orderable: false, searchable: false}
                    ]}
                    init={true}
                    route={routes['extranet.users.datatable']}
                    onClick={this.handleClick.bind(this)}
                />

              </div>
            </div>
        );
    }
}

if (document.getElementById('users-index')) {
    ReactDOM.render(<UsersIndex />, document.getElementById('users-index'));
}
