import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import ButtonSecondary from '../Layout/ButtonSecondary';
import Separator from '../Layout/Separator';
import CollapsableGroup from '../Layout/CollapsableGroup';
import FieldList from '../Layout/FieldList';
import FieldListItem from '../Layout/FieldListItem';

import SidebarTitle from '../Layout/SidebarTitle';

export default class RolesUpdate extends Component {
    render() {
        return (
            <div className="roles-update">
                <BarTitle
                    icon={'fa fa-file'}
                    title={this.state}
                    backRoute={'#'}
                >
                
                <ButtonSecondary
                    label={'Actions'}
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
                    title='CMS'
                  >
                  </CollapsableGroup>

                  <CollapsableGroup
                    identifier='1'
                    title='Front'
                  >
                  </CollapsableGroup>

                  <CollapsableGroup
                    identifier='1'
                    title='Sinisters'
                  >
                  </CollapsableGroup>
                </div>

                <div className="sidebar">
                    <SidebarTitle
                    label={'GROUP'}
                    />
                    <FieldListItem
                        icon={'fa fa-user'}
                        label={'name'}
                        name={'name'}
                        identifier={'id'}
                    />
                </div>
              </div>

            </div>
        );
    }
}

if (document.getElementById('roles-update')) {
    ReactDOM.render(<RolesUpdate />, document.getElementById('roles-update'));
}
