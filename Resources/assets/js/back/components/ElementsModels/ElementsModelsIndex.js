import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PageTitle from '../Layout/PageTitle';
import BoxList from '../Layout/BoxList';
import BoxWithIcon from '../Layout/BoxWithIcon';

export default class ElementsModelsIndex extends Component {

    render() {

        return (

            <div className="container grid-page elements-models-page">

                <div className="col-xs-offset-2 col-xs-8 page-content">

                    <PageTitle
                        title={'Modèles D\'élément'}
                        icon={'fas fa-cog'}
                        backRoute={routes['settings']}
                    />

                    <BoxList
                        subtitle={'Configuration générale des modèles utilisés dans les éléments'}
                    >
                        <BoxWithIcon
                            icon={'fas fa-list-ul'}
                            name={'Formulaire'}
                            route={routes['extranet.elements-models.index'].replace(':type', 'form-v2')}
                        />

                        <BoxWithIcon
                            icon={'fas fa-table'}
                            name={'Tableau'}
                            route={routes['extranet.elements-models.index'].replace(':type', 'table')}
                        />
                    </BoxList>

                </div>

            </div>
        );
    }
}

if (document.getElementById('elements-models-index')) {
    ReactDOM.render(<ElementsModelsIndex />, document.getElementById('elements-models-index'));
}
