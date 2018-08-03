import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ArrowIcon extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <img
                  src="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-right-01-512.png"
                  width={this.props.width}
                  height={this.props.height}
                />
            </div>
        );
    }
}

ArrowIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired    
}
