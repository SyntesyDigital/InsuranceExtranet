import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider from "react-slick";
import ImageTextLink from './ImageTextLink';
import SliderArrowRight from './SliderArrowRight';
import SliderArrowLeft from './SliderArrowLeft';

export default class ImageTextLinkList extends Component {

    constructor(props) {
        super(props);
    }

    renderImageList() {

        return this.props.field.value.map((item, index) =>
            <ImageTextLink
                field={item}
                key={index}
            />
        );
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
            <Slider {...settings}>
                {this.renderImageList()}
            </Slider>
        );
    }
}

if (document.getElementById('imageTextLinkList')) {
    document.querySelectorAll('[id=imageTextLinkList]').forEach(function (element) {
        var field = JSON.parse(atob(element.getAttribute('field')));
        ReactDOM.render(<ImageTextLinkList
            field={field}
        />, element);
    });
}



