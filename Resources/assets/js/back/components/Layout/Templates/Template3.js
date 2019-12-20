import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import BarTitle from '../BarTitle';
import ButtonPrimary from '../ButtonPrimary';
import ButtonSecondary from '../ButtonSecondary';
import Separator from '../Separator';
import CollapsableGroup from '../CollapsableGroup';
import FieldList from '../FieldList';
import FieldListItem from '../FieldListItem';

export default class Template3 extends Component {
    render() {
        return (
            <div className="template-3">
              <BarTitle
                icon={'fa fa-file'}
                title={'Pate title'}
                backRoute={'#'}
              >

                <ButtonSecondary
                  label={'Secondary'}
                  icon={'fa fa-plus'}
                />

                <ButtonPrimary
                  label={'Sauvegarder'}
                  icon={'fa fa-plus'}
                />

              </BarTitle>

              <div className="container rightbar-page">
                <div className="col-md-9 page-content form-fields">
                  <CollapsableGroup
                    identifier='1'
                    title='title'
                  >
                    <ButtonPrimary
                      label={'Sauvegarder'}
                      icon={'fa fa-plus'}
                    />
                  </CollapsableGroup>


                  <FieldList>
                    <FieldListItem
                      icon={'fa fa-file'}
                      label={'Name'}
                      identifier={'id'}
                    />

                  </FieldList>


                </div>
                <div className="sidebar">

                </div>
              </div>

            </div>
        );
    }
}

if (document.getElementById('template-3')) {
    ReactDOM.render(<Template3 />, document.getElementById('template-3'));
}
