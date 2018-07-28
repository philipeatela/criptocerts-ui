import React, { Component } from 'react';
import styled from 'react-emotion';
import logo from './logo.svg';
import './App.css';

const AppDiv = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height:100vh;
`
const AppHeader = styled('header')`
  background-color: #880B0D;
  width: 100%;
  padding: 20px;
  color: white;
  text-align: center;
`
const BodyDiv = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #D5C6C6;  
  width:100%;
  height:100%;
  padding-top: 5px;
`
const AppTitle = styled('h1')`
  font-size: 32px;
`

export default class App extends Component {
  render() {
    return (
      <AppDiv>
        <AppHeader>
          <AppTitle>
            Welcome to Criptocerts!
          </AppTitle>
        </AppHeader>
        <BodyDiv>
          {this.props.children}
        </BodyDiv>
      </AppDiv>
    );
  }
}

{/* <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <h1 className="App-title">Welcome to React</h1>
</header>
{this.props.children}
</div> */}