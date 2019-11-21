import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Paginator extends Component {

    constructor(props)
    {
        super(props);
        this.onPageChange.bind(this);
    }

    onPageChange(page, e) {
        e.preventDefault();
        this.props.onChange(page);
    }

    render() {

        const prevPage = this.props.currPage > 2 ? (this.props.currPage - 1) : 1;
        const nextPage = this.props.currPage < this.props.lastPage ? (this.props.currPage + 1) : this.props.lastPage;
        const currPage = this.props.currPage;
        const lastPage = this.props.lastPage;
        /*
        <!--li className="start"> <a href="#" onClick={(e) => this.onPageChange(1, e)}>&lt;&lt;</a> </li-->
        <!--li className="end"><a href="#" onClick={(e) => this.onPageChange(lastPage, e)}> &gt;&gt;</a></li-->
        */
        console.log("Paginator :: currPage => ",currPage);
        return (
                <ul className="navigation">
                  <li className="before"><a href="#" onClick={(e) => this.onPageChange(prevPage, e)}>&lt;</a></li>
                    {Array.apply(null, Array(this.props.lastPage + 1)).map(function(item, i){
                        if(i > 0){
                            if(i == currPage -3 ){
                                return (
                                  <li key={i} >
                                      <a href="#" onClick={(e) => this.onPageChange(i, e)}>{i==1?i:'..'}</a>
                                  </li>
                                );
                            }
                            if(currPage -3 < i && i < currPage +3 ){
                                return (
                                  <li key={i} className={i == currPage ? 'active' : null}>
                                      <a href="#" onClick={(e) => this.onPageChange(i, e)}>{i}</a>
                                  </li>
                                );
                            }
                            if(i == currPage +3 ){
                                return (
                                  <li key={i} >
                                      <a href="#" onClick={(e) => this.onPageChange(i, e)}>{i==lastPage?i:'..'}</a>
                                  </li>
                                );
                            }
                        }



                    }, this)}
                  <li className="next"><a href="#" onClick={(e) => this.onPageChange(nextPage, e)}> &gt;</a></li>
                </ul>
        );
    }
}

export default Paginator;
