import React, { Component } from "react";
import Router from "./Router";
import Info from "./Info";
import GlobalStyles from "./GlobalStyles";

class App extends Component {
  render() {
    return (
      <>
        <Router />
        <Info />
        <GlobalStyles />
      </>
    );
  }
}

export default App;