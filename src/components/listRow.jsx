import React from 'react';
import styled from 'react-emotion';

const RowDiv = styled('div')`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 25%;
  background-color: white;
  text-align: center;
`;

const ListRow = ({ text }) => (
  <RowDiv>
    {text}
  </RowDiv>
);

export default ListRow;
