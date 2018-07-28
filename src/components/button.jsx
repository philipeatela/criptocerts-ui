import React, { Component } from 'react';
import styled from 'react-emotion';

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

        return (
            <ButtonDiv>
                <ButtonElement>
                    <TextStyle>{this.props.buttonText}</TextStyle>
                </ButtonElement>
                <ButtonElement>
                    <TextStyle>----></TextStyle>
                </ButtonElement>
            </ButtonDiv>
        );
    }
}