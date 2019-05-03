import React, { Component } from 'react';
import './App.css';
import CheckBalance from './CheckBalance/CheckBalance';
import Header from './Header/index'
import Loading from './Loading/index'

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
      setAccountInfo,
      web3
    } = this.props;

    console.log("web3 props", this.props)

    return (
      <div className="App">
        <Loading isLoading={isLoading} />
        <Header mycurrency={mycurrency} />
        <CheckBalance setAccountInfo={setAccountInfo} />
      </div>
    );
  }
}

export default App;
