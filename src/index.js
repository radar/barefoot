import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

function fetchAccounts() {
  let accounts = window.localStorage.getItem("accounts");
  if (accounts) {
    return JSON.parse(accounts);
  } else {
    const defaultAccounts = {
      "Daily Exp.": 60,
      Splurge: 10,
      Smile: 10,
      "Fire Ext.": 20
    };
    window.localStorage.setItem("accounts", JSON.stringify(defaultAccounts));
    return defaultAccounts;
  }
}

const accounts = fetchAccounts();

ReactDOM.render(<App accounts={accounts} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
