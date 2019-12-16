import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-vuex-hook";
import store from "./store";
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
