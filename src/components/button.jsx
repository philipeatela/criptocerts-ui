import React, { Component } from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';

import ArrowIcon from './arrowIcon';

const TextStyle = styled('span')`
    color: #880B0D;
    font-weight: bolder;
    font-size: 24px;
`

const ButtonElement = styled('div')`
    
`

export default class Button extends Component {
    constructor(props) {
        super(props);
    
    }
    render() {
        const ButtonDiv = styled('div')`
            background-color: #FBDCDC;
            padding: 15px;
            border: 2px solid black;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: ${this.props.height};
            width: ${this.props.width};
            margin-bottom: 5px;
        ` 
        
        if(this.props.hidden){
            return null;
        }

        return (
            <ButtonDiv>
                <ButtonElement>
                    <TextStyle>{this.props.buttonText}</TextStyle>
                </ButtonElement>
                <ButtonElement>
                    <ArrowIcon
                        height="100px"
                        width="100px"
                    />
                </ButtonElement>
            </ButtonDiv>
        );
    }
}

Button.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired    
}
