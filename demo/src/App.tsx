/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import ConnectedPlayground from "./containers/ConnectedPlayground";
import ConnectedPlayground2 from "./containers/ConnectedPlayground2";
import "./App.css";

function App() {
  const [hidden, setHide] = useState(false);
  return (
    <div className="App">
      <a className="App-link">Vue in React Demo</a>
      <div className="playground">
        {!hidden && <ConnectedPlayground />}
        {!hidden && <ConnectedPlayground2 />}
        <p></p>
      </div>
      <button className="button-close" onClick={() => setHide(!hidden)}> hide now </button>
    </div>
  );
}

export default App;
