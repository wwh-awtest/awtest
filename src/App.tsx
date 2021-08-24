import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Welcome } from "./Welcome";
import { Invite } from "./Invite";
import { Success } from "./Success";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/welcome" component={Welcome} />
        <Route path="/invite" component={Invite} />
        <Route path="/success" component={Success} />
        <Redirect to="/welcome" />
      </Switch>
    </div>
  );
}

export default App;
