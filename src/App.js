import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Shortcuts from "./Shortcuts";

function App() {
  return (
    <div id="wrapper">
      <header>
        <h1>Shortcuts</h1>
      </header>
      <div id="wrap">
        <Shortcuts />
      </div>
    </div>
  );
}

export default App;
