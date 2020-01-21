import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PageTitle from '../PageTitle';
import ButtonPrimary from '../ButtonPrimary';
import BoxList from '../BoxList';
import BoxAdd from '../BoxAdd';
import BoxWithIcon from '../BoxWithIcon';

export default class Template2 extends Component {
  render() {
    return (
      <div className="container grid-page elements-page template-2">
        <div className="col-xs-offset-2 col-xs-8 page-content">

          <PageTitle
            title={'Name'}
            icon={'fa fa-file'}
          >
            <ButtonPrimary
              label={'Ajouter'}
              icon={'fa fa-plus'}
            />

          </PageTitle>

          <BoxList>
            <BoxWithIcon
              icon={'fa fa-eye'}
              name={'Opcion 1'}
            />
            <BoxWithIcon
              icon={'fa fa-eye'}
              name={'Opcion 2'}
            />
            <BoxWithIcon
              icon={'fa fa-eye'}
              name={'Opcion 1'}
            />
            <BoxWithIcon
              icon={'fa fa-eye'}
              name={'Opcion 2'}
            />
            <BoxAdd
              label={'Ajouter'}
            />
          </BoxList>




        </div>
      </div>
    );
  }
}

if (document.getElementById('template-2')) {
  ReactDOM.render(<Template2 />, document.getElementById('template-2'));
}
