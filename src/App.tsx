import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Routes from "./routes";
import "./App.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes />
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
