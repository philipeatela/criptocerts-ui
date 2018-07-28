import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Button from './components/button';
import ButtonList from './components/buttonList';

const buttonWidth = "80%";
const buttonHeight = "100%";

ReactDOM.render(
    <App>
        <ButtonList
            width="100%"
            height="100%"
            >
                <Button
                buttonText="Cadastrar emissor"
                height={buttonHeight}
                width={buttonWidth}
                />
                <Button
                buttonText="Criar novo certificado"
                height={buttonHeight}
                width={buttonWidth}
                />
                <Button
                buttonText="Emitir certificado"
                height={buttonHeight}
                width={buttonWidth}
                />
                <Button
                buttonText="Sobre"
                height={buttonHeight}
                width={buttonWidth}
                />
        </ButtonList>
    </App>,
     document.getElementById('root'));
registerServiceWorker();
