import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PageTitle from '../Layout/PageTitle';
import BoxList from '../Layout/BoxList';
import BoxWithIcon from '../Layout/BoxWithIcon';
import BoxAdd from '../Layout/BoxAdd';
import ButtonPrimary from '../Layout/ButtonPrimary';
import api from '../../api/index.js';

export default class FormsIndex extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            models : []
        };
    }

    componentDidMount() {
        var _this = this;
        
        api.elementModel.getAll()
            .then(function (payload) {
                _this.setState({
                    models : payload.data.elementModels
                })
            });
    }
    renderModels() {
        return this.state.models.map((item,index) => 
            <BoxWithIcon
                icon={item.icon}
                name={item.name}
                route={routes['extranet.elements-models.forms.update'].replace(':id',item.id)}
            />
        );
    }
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
                        {this.renderModels()}
                        
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
