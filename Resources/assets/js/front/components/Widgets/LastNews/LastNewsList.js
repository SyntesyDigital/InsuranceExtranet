import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider from "react-slick";
import LastNews from './LastNews';
import SliderArrowRight from './SliderArrowRight';
import SliderArrowLeft from './SliderArrowLeft';

export default class LastNewsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contents: null,
            typology_id: this.props.typology_id ? this.props.typology_id : null,
        };
    }

    componentDidMount() {

        axios.get(ASSETS + 'api/contents?accept_lang=' + LOCALE + '&order=date,desc&typology_id=' + this.state.typology_id)
            .then(response => {
                var contents = [];

                if (response.status == 200 && response.data.data !== undefined
                    && response.data.data.length > 0) {
                    contents = response.data.data;
                }

                this.setState({
                    contents: contents
                });

            })
            .catch(function (error) {
                console.log(error);
            });

    }

    renderItems() {
        var result = [];
        const { contents } = this.state;

        for (var key in contents) {
            result.push(
                <LastNews
                    field={contents[key]}
                />
            );
        }
        return result;
    }

    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <SliderArrowRight to="next" />,
            prevArrow: <SliderArrowLeft to="prev" />
        };
        return (
            <React.Fragment>
                {this.state.contents != null && this.state.contents.length > 0 &&
                    <Slider {...settings}>
                        {this.renderItems()}
                    </Slider>
                }
            </React.Fragment>

        );
    }
}

if (document.getElementById('lastNewsList')) {
    document.querySelectorAll('[id=lastNewsList]').forEach(function (element) {
        var field = JSON.parse(atob(element.getAttribute('field')));
        var typology_id = element.getAttribute('typology_id');
        ReactDOM.render(<LastNewsList
            field={field}
            tipology_id={typology_id}
        />, element);
    });
}



