import React, { Component } from 'react';
import './App.css';
import CheckBalance from './CheckBalance/CheckBalance';
import Loading from './Loading/index'
import Header from './Header/index'
import Landing from './Landing/index'
import SendTransaction from './SendTransaction/SendTransaction'
import { Action } from 'typesafe-actions';

type AppProps = {
  connectWeb3: any,
  mycurrency: {
    isLoading: boolean,
    token: Number
  },
  checkBalance: Action,
  transferToken: Action,
  mintTokens: Action
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
    const {
      mycurrency,
      mycurrency: {
        isLoading
      },
      checkBalance,
      transferToken,
      mintTokens
    } = this.props;

    console.log("web3 props", this.props)

    return (
      <div className="App">
        <Loading isLoading={isLoading} />
        <Header mycurrency={mycurrency} />
        <Landing />
        <CheckBalance checkBalance={checkBalance} mintTokens={mintTokens} />
        <SendTransaction transferToken={transferToken} />
      </div>
    );
  }
}

export default App;
