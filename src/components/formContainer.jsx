import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const ContainerDiv = styled('div')`
  display: flex;
  background-color: #FBDCDC;
  border: 2px solid black;
  border-radius: 5px;
`

export default class FormContainer extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <ContainerDiv>
              
            </ContainerDiv>
        );
    }
}

FormContainer.propTypes = {
  
}
