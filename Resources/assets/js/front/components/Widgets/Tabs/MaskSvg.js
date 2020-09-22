import React from 'react';
import PropTypes from 'prop-types';

export default class MaskSvg extends React.Component {
    render() {
        return (
            <div className="mask-svg">
                <svg className="tab-background" version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width={this.props.width} height={this.props.height} viewBox="0 0 216.000000 143.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,143.000000) scale(0.100000,-0.100000)"
                        fill={this.props.fill} stroke="none">
                        <path d="M0 721 l0 -711 973 1 c571 1 949 5 917 10 -103 16 -165 31 -230 57
                    -240 94 -420 306 -585 687 -60 139 -167 353 -212 425 -67 105 -146 170 -259
                    212 -54 20 -82 22 -331 26 l-273 4 0 -711z"/>
                    </g>
                </svg>
            </div>
        );
    }
}

MaskSvg.propTypes = {
    fill: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
};