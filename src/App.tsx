import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FXSWAPV2FACTORY_ADDRESS } from './constants/Addresses';
import { FXCORE_ENDPOINT, FXSWAP_MAINNET_SUBGRAPH } from './constants/Endpoints';
import Web3 from 'web3';
import axios from 'axios';
const FXSwapV2FactoryABI = require("./abis/FXSwapV2Factory.json");


function App() {

  //Test Provider method
  let web3 = new Web3(FXCORE_ENDPOINT);
  let fxswapfactory = new web3.eth.Contract(FXSwapV2FactoryABI.abi, FXSWAPV2FACTORY_ADDRESS);
  console.log(fxswapfactory);
  fxswapfactory.methods.allPairs(4).call().then((result: Promise<string>) => { console.log(result) })
  console.log(FXSWAPV2FACTORY_ADDRESS);

  //Test GraphQl method
  const query = `
  query getAllPairs {
    pairs(first: 10) {
      id
    }
  }
  `
  type GetAllPairsResponse = {
    data: { pairs: [ {id: string} ] }
  }

  const getAllPairs = async () => {
    const results = await axios.post(FXSWAP_MAINNET_SUBGRAPH,
      {
        headers: { "Content-Type" : "application/json" },
        query: query
      })
    const data = results.data;
    console.log(data);
  }

  getAllPairs();


  return (
    <div className="App">

    </div>
  );
}

export default App;
