import React, { Component } from 'react';
import './App.css';
import CheckBalance from './CheckBalance/CheckBalance';
import Header from './Header/index'
import Loading from './Loading/index'
import SendTransaction from './SendTransaction/SendTransaction'

class App extends Component {

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
        <CheckBalance checkBalance={checkBalance} mintTokens={mintTokens} />
        <SendTransaction transferToken={transferToken} />
      </div>
    );
  }
}

export default App;
