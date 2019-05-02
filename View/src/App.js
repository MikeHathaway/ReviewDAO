import React, { Component } from 'react';
import './App.css';
import CheckBalance from './CheckBalance/CheckBalance';
import Header from './Header/index'
import Loading from './Loading/index'

class App extends Component {

  componentDidMount() {
    const {
      connectContract
    } = this.props;

    connectContract();
  }

  render() {
    const {
      isLoading,
      mycurrency,
      setAccountInfo
    } = this.props;

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
