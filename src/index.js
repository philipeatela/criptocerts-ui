import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Button from './components/button';
import ButtonList from './components/buttonList';

const buttonWidth = "70%";
const buttonHeight = "15%";

ReactDOM.render(
    <App>
        <ButtonList
            width="100%"
            height="100%"
            >
                <Button
                buttonText="Create Issuer"
                height={buttonHeight}
                width={buttonWidth}
                hidden={true}
                />
                <Button
                buttonText="New Certificate"
                height={buttonHeight}
                width={buttonWidth}
                />
                <Button
                buttonText="Issue Certificate"
                height={buttonHeight}
                width={buttonWidth}
                />
                <Button
                buttonText="About"
                height={buttonHeight}
                width={buttonWidth}
                />
        </ButtonList>
    </App>,
     document.getElementById('root'));
registerServiceWorker();
