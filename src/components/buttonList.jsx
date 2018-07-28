import React, { Component } from 'react';
import styled from 'react-emotion';
import _ from 'lodash';
import Button from './button';

export default class ButtonList extends Component {
    constructor(props) {
        super(props);

    }
    
    render() {
        const ListDiv = styled('div')`
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: start;
            height: ${this.props.height};
            width: ${this.props.width}; 
        `
        return (
            <ListDiv>
                {this.props.children}
            </ListDiv>
        );
    }
}