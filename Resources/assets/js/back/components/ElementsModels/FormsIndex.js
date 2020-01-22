import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PageTitle from '../Layout/PageTitle';
import BoxList from '../Layout/BoxList';
import BoxWithIcon from '../Layout/BoxWithIcon';
import BoxAdd from '../Layout/BoxAdd';
import ButtonPrimary from '../Layout/ButtonPrimary';

export default class FormsIndex extends Component {

    render() {

        return (
            
            <div className="container grid-page elements-models-page">

                <div className="col-xs-offset-2 col-xs-8 page-content">

                    <PageTitle
                        title={'Formulaires'}
                        icon={'fas fa-cog'}
                        backRoute={routes['extranet.elements-models.index']}
                    >
                        
                        <ButtonPrimary
                            label={'Ajouter'}
                            icon={'fa fa-plus'}
                            route={routes["extranet.elements-models.forms.create"]}
                        />

                    </PageTitle>

                    <BoxList
                        subtitle={'Configuration générale des modèles utilisés dans les éléments'}
                    >
                        <BoxWithIcon
                            icon={'fas fa-list-ul'}
                            name={'Form 1'}
                            
                        />

                        <BoxAdd
                            label={'Ajouter'}
                            route={routes["extranet.elements-models.forms.create"]}
                        />

                    </BoxList>

                </div>

            </div>
        );
    }
}

if (document.getElementById('elements-models-forms-index')) {
    ReactDOM.render(<FormsIndex />, document.getElementById('elements-models-forms-index'));
}
