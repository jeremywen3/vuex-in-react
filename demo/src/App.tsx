/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import VisibleChild1 from "./containers/ConnectedPlayground";
import "./App.css";

function App() {
  const [hidden, setHide] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <a className="App-link">React-vuex-hook Demo</a>
        {!hidden && <VisibleChild1 />}
        <button className="button-close" onClick={() => setHide(!hidden)}> hide now </button>
      </header>
    </div>
  );
}

export default App;
