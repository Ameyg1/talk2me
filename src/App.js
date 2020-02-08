import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Page from "./components/PageBody/Page";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Page />
      <div style={{ flexGrow: 1 }}></div>
    </div>
  );
}

export default App;
