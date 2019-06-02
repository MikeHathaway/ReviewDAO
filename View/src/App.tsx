import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ThemeProvider } from 'styled-components'

import { Action } from 'typesafe-actions';

import Landing from './Landing/index'
import TokenManager from './TokenManager'
import './App.css';
import theme from './theme'


// TODO: set type to Action
type AppProps = {
  connectWeb3: any
}



class App extends Component<AppProps> {

  componentDidMount() {
    const {
      connectWeb3
    } = this.props;

    // Use Web3 to connect to Ethereum Smart Contract
    connectWeb3();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={Landing} />
          <Route path="/token-manager/" component={TokenManager} />
        </Router>
      {/* <ThemeProvider theme={theme}> */}

      {/* </ThemeProvider> */}
      </div>
    );
  }
}

export default App;
