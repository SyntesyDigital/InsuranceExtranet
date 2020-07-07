import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ListItem from './../Common/ListItem';

export default class TypologyLast extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            typology_id : this.props.typology_id ? this.props.typology_id : null,
            size: this.props.size ? this.props.size : null,
            contents: null,
        };
    }

    componentDidMount() {

      axios.get(ASSETS+'api/contents?accept_lang='+LOCALE+'&order=date,desc&typology_id='+this.state.typology_id)
        .then(response => {
          var contents = [];

          if(response.status == 200 && response.data.data !== undefined
            && response.data.data.length > 0){
              contents = response.data.data;
          }

          this.setState({
            contents : contents
          });

        })
         .catch(function (error) {
           console.log(error);
         });

    }

    renderContents() {

      var result = [];
      const { contents } = this.state;

      for(var key in contents){
        result.push(
          <li key={key}>
            <ListItem
              field={contents[key]}
            />
          </li>
        );
      }
      return result;

    }

    render() {
        return (
            <div>
              {window.localization['MENU_FOOTER_1']}
              {this.state.contents == null &&
                <p>
                  {/*Carregant dades...*/}
                </p>
              }
              {this.state.contents != null && this.state.contents.length == 0 &&
                <p>
                  {window.localization['GENERAL_WIDGET_LAST_TYPOLOGY_EMPTY']}
                </p>
              }
              {this.state.contents != null && this.state.contents.length > 0 &&
                <ul>
                  {this.renderContents()}
                </ul>
              }
            </div>
        );
    }
}

if (document.getElementById('typology-last')) {

    var typologyLast = document.querySelectorAll('[id=typology-last]');
    typologyLast = [].slice.call(typologyLast);
    typologyLast.forEach( element => {

      var size = element.getAttribute('size');
      var typology_id = element.getAttribute('typology_id');

      ReactDOM.render(<TypologyLast
          size={size}
          tipology_id={typology_id}
        />, element);
    });
}
