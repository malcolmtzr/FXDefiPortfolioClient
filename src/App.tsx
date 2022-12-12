import React, { useState, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { Constants } from "./constants";
import Web3 from 'web3';
import axios from 'axios';
import Layout from './layout/Layout';
import ColorModeContext from './components/ColorModeContext';
import { theme as CustomTheme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Helmet, HelmetProvider } from "react-helmet-async";
const FXSwapV2FactoryABI = require("./abis/FXSwapV2Factory.json");


const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState("dark");
  const colorMode = useMemo(() => ({
    //Switching themes will call this
    toggleColorMode: () => {
      window.localStorage.setItem("themeMode", themeMode === "dark" ? "light" : "dark");
      setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
    }
  }), [themeMode]);

  useEffect(() => {
    try {
      const localTheme = window.localStorage.getItem("themeMode");
      localTheme ? setThemeMode(localTheme) : setThemeMode("dark")
    } catch {
      setThemeMode("dark");
    }
  }, []);

  //Test Provider method
  let web3 = new Web3(Constants.Endpoint.FXCORE_ENDPOINT);
  let fxswapfactory = new web3.eth.Contract(FXSwapV2FactoryABI.abi, Constants.Address.FXSWAPV2FACTORY_ADDRESS);
  console.log(fxswapfactory);
  fxswapfactory.methods.allPairs(4).call().then((result: Promise<string>) => { console.log(result) })
  console.log(Constants.Address.FXSWAPV2FACTORY_ADDRESS);

  //Test GraphQl method
  const query = `
  query getAllPairs {
    pairs(first: 10) {
      id
    }
  }
  `
  type GetAllPairsResponse = {
    data: { pairs: [{ id: string }] }
  }

  const getAllPairs = async () => {
    const results = await axios.post(Constants.Endpoint.FXSWAP_MAINNET_SUBGRAPH,
      {
        headers: { "Content-Type": "application/json" },
        query: query
      })
    const data = results.data;
    console.log(data);
  }

  getAllPairs();


  return (
    <HelmetProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={CustomTheme[themeMode as keyof typeof CustomTheme]}>
          <CssBaseline>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/Login" element={<Login />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </CssBaseline>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </HelmetProvider>
  );
}

export default App;
