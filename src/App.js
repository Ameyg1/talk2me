import React from "react";
import "./App.css";
import Temp from "./components/Temp/Temp";

function App() {
  return (
    <div className="App">
      <Temp />
      <div style={{ flexGrow: 1 }}></div>
    </div>
  );
}

export default App;
