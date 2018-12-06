import styled, { css } from 'react-emotion';
import { Form, FormGroup, Input } from 'reactstrap';

export const colors = {
  green: '#40532f',
  brown: '#a4a38e',
}

// Text
export const TitleText = styled('span')`
  color: white;
  font-family: sans-serif;
  font-size: 32px;
`

export const LabelText = styled('span')`
  font-family: sans-serif;
  font-size: 18px;
`

export const LabelTextCss = css`
 font-family: sans-serif;
 font-size: 18px;
`

// Dimensions
export const LargeButton = css`
  height: 50px;
  width: 250px;
  margin: 10px;
`;

export const SmallButton = css`
  height: 40px;
  width: 200px;
  margin: 10px;
`;

// Form
export const DescriptionContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`

export const ButtonsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
`;

export const StyledForm = styled(Form)`
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 30px;
  border: 2.5px solid #21271b;
  border-radius: 5px;
`
export const FormGroupItem = styled(FormGroup)`
  padding: 10px;
`;

export const InputItem = styled(Input)`
  margin-left: 5px;
  padding: 3px;
`;

export const DescriptionInput = styled(InputItem)`
  height: 125px;
  width: 300px;
`;