import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import InputField from '../Layout/Fields/InputField';
import ButtonDropdown from '../Layout/ButtonDropdown';
import InputFieldJsonEdit from '../Layout/Fields/InputFieldJsonEdit';
import SelectField from '../Layout/Fields/SelectField';

const arrayOfGroup = [
    {
      id: '1 - Nico',
      name: 'nico'
    },
    {
      id: '2 - Sergi',
      name: 'sergi'
    },
    {
      id: '3 - Francicso',
      name: 'francisco'
    },
    {
      id: '4 - dani',
      name: 'dani'
    },
];

export default class ServicesUpdate extends Component {

    constructor(props) {

        super(props);

        this.state = {
            selectedValue: 'Nothing selected'
        };
    }

    handleSelectChange(selectedValue) {
        this.setState({
            selectedValue: selectedValue
        });
    }

    render() {

        return (

            <div className="services-update">

                <BarTitle
                    icon={'fa fa-file'}
                    title={'Services'}
                    backRoute={'#'}
                >

                    <ButtonDropdown
                        label={'Actions'}
                        list={[
                            {
                                label: 'Nouveau',
                                icon: 'fa fa-plus-circle',
                                route: '/architect/contents/page/create',
                                className: ''
                            },
                            {
                                label: 'Supprimier',
                                icon: 'fas fa-trash-alt',
                                route: '/architect/contents/page/create',
                                className: 'text-danger'
                            }
                        ]}
                    />

                    <ButtonPrimary
                        label={'Sauvegarder'}
                        icon={'fa fa-save'}
                    />

                </BarTitle>

                <div className="container rightbar-page">

                    <div className="col-md-9 page-content form-fields">

                        <InputFieldJsonEdit
                            width={'100%'}
                        />

                    </div>

                    <div className="sidebar">

                        <InputField
                            title={'Identifier'}
                            value={''}
                            name={'identifiant'}

                        />

                        <InputField
                            title={'Name'}
                            value={''}
                            name={'nom'}

                        />
                        <div className="form-group">
                            <SelectField
                                arrayOfGroup={arrayOfGroup}
                                title={'Methode'}
                                onSelectChange={this.handleSelectChange.bind(this)}
                            />
                        </div>
                        
                
                        <InputField
                            title={'Url'}
                            value={''}
                            name={'url'}

                        />

                        <InputField
                            title={'Response'}
                            value={''}
                            name={'response'}

                        />

                        <InputField
                            title={'Commentaire'}
                            value={''}
                            name={'commentaire'}

                        />

                    </div>
                </div>
            </div>
        );
    }


}

if (document.getElementById('services-update')) {
    ReactDOM.render(<ServicesUpdate />, document.getElementById('services-update'));
}


