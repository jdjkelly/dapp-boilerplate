import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import migrationsABI from 'contracts/Migrations.json';
import contract from 'truffle-contract';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  async getMigrationState(migrations) {
    const instance = await migrations.deployed();
    const owner = await instance.owner();
    const lastCompleted = await instance.last_completed_migration();
    this.setState({
      owner: owner.toString(),
      lastCompleted: lastCompleted.toString(),
      loaded: true,
      migrations,
    });
  }

  componentWillMount() {
    let migrations = contract(migrationsABI);
    migrations.setProvider(window.web3.currentProvider);
    this.getMigrationState(migrations);
  }

  render() {
    const migrations = this.state.loaded ? (
      <section>
        <p>address: {this.state.migrations.address}</p>
        <p>owner: {this.state.owner}</p>
        <p>lastCompleted: {this.state.lastCompleted}</p>
      </section>
    ) : (
      <p>
        Loading
      </p>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dapp Boilerplate</h1>
        </header>
        <p className="App-intro">
          An opinionated boilerplate for making Ethereum Dapps with Truffle and React
        </p>
        <h2>Migration Contract</h2>
        { migrations }
      </div>
    );
  }
}

export default App;
