import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class FilterBarBlog extends Component {

    constructor(props)
    {
        super(props);
        const category = props.category ? props.category : '';
        const text = props.text ? props.text : '';
        const startDate = props.startDate ? props.startDate : null;
        const endDate = props.endDate ? props.endDate : null;

        this.state = {
          category:category,
          text : text,
          dateStart :  startDate?moment.unix(startDate/1000):null,
          dateEnd : endDate?moment.unix(endDate/1000):null,
          categories : [],

        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
      event.preventDefault();
      var params = '';
      var first = true;
      if(this.state.category != null && this.state.category != '')
      {
        if(first)
        {
          first = false;
          params = '?';
        }
        else
        {
          params = '&'
        }
        params +='category='+this.state.category;
      }
      if(this.state.text != null && this.state.text != '')
      {
        if(first)
        {
          first = false;
          params = '?';
        }
        else
        {
          params += '&'
        }
        params +='text='+this.state.text;
      }
      if(this.state.dateStart != null && this.state.dateStart != '')
      {
        if(first)
        {
          first = false;
          params = '?';
        }
        else
        {
          params += '&'
        }
        params +='startDate='+this.state.dateStart;
      }
      if(this.state.dateEnd != null && this.state.dateEnd != '')
      {
        if(first)
        {
          first = false;
          params = '?';
        }
        else
        {
          params += '&'
        }
        params +='endDate='+this.state.dateEnd;
      }

      window.location.href = '/'+LOCALE+'/blog/'+params;

    }

    handleChange(event) {
      event.preventDefault();
      const state = this.state;
      state[event.target.name] = event.target.value;

      this.setState(state);

    }

    handleDateChange(name,date){
    //  console.log("handleDateChange => ",date,name);

      const state = this.state;
      state[name] = date;

      this.setState(state);
    }

    componentDidMount() {
      this.loadCategories();
    }


    loadCategories() {

      var self = this;

      axios.get(ASSETS+'api/categories/tree?accept_lang='+LOCALE)
        .then(function (response) {
            if(response.status == 200
                && response.data.data !== undefined
                && response.data.data)
            {

                self.setState({
                    categories : response.data.data
                });
            }


        }).catch(function (error) {
           console.log(error);
         });

    }



     printSpace(level)
    {

      if(level <= 1)
        return null;

      var spaces = [];
      for(var i=1;i<level;i++){
        spaces.push(
          "- "
        );
      }

      return spaces;
    }

    printCategories(categories, level, html){
      level++;
      for (var i = 0; i< categories.length; i++ ){
          html.push(<option key={categories[i].id} value={categories[i].id}>{this.printSpace(level)}{categories[i].name}</option>);
          if(categories[i].descendants.length > 0){
             this.printCategories(categories[i].descendants,level, html);
          }
      }

    }


    renderCategories() {
      var level = 0;
      var self = this;
      var html = [];
      self.printCategories(this.state.categories, level, html);
      console.log('RESULTAT:',html);
      return html;
    }

    render() {
        return (
          <div className="grey">
            <div className="row">
              <div className="container">
                <form onSubmit={this.handleSubmit.bind(this)} className="blog-search">

                  <div className="row">
                    <label className="col-md-3 col-sm-4 col-xs-12">{window.localization['GENERAL_WIDGET_SELECT_CATEGORY']}</label>
                    <select name="category" className="col-md-9 col-sm-8 col-xs-12" onChange={this.handleChange} value={this.state.category}>
                        <option value="">{window.localization['GENERAL_WIDGET_SELECT_CATEGORY']}</option>
                        {this.renderCategories()}
                          </select>
                      </div>
                    <div className="row">
                      <div className="input-date">
                        <DatePicker
                            className="input-date"
                            selected={this.state.dateStart?  this.state.dateStart : ''}

                            selectsStart
                            startDate={this.state.dateStart}
                            endDate={this.state.dateEnd}
                            onChange={this.handleDateChange.bind(this,'dateStart')}
                            placeholderText={window.localization['GENERAL_WIDGET_FROM']}
                            locale="{LOCALE}"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-date">
                        <DatePicker
                            className="input-date"
                            selected={ this.state.dateEnd ? this.state.dateEnd : '' }
                            selectsEnd
                            startDate={this.state.dateStart}
                            minDate={this.state.dateStart}
                            endDate={this.state.dateEnd}
                            onChange={this.handleDateChange.bind(this,'dateEnd')}
                            placeholderText={window.localization['GENERAL_WIDGET_TO']}
                            locale="{LOCALE}"
                        />
                      </div>
                    </div>

                    <div className="row">
                        <input className="col-md-9 col-sm-8 col-xs-12" value={this.state.text} name="text" onChange={this.handleChange} placeholder={window.localization['WIDGET_BLOG_TEXT_TO_SEARCH']} type="text"/>
                    </div>
                    <div className="row">
                      <input value={window.localization['GENERAL_BUTTON_SEARCH']} className="btn" type="submit"/>
                    </div>
                  <div className="separator"></div>

                </form>
              </div>
            </div>
          </div>

        );
    }
}

export default FilterBarBlog;
