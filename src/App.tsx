import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Welcome } from "./page/Welcome";
import { Invite } from "./page/Invite";
import { Success } from "./page/Success";
import "./App.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  header: {},
  body: {
    flex: 1,
  },
  footer: {},
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>BROCCOLI & CO.</div>
      <div className={classes.body}>
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/invite" component={Invite} />
          <Route path="/success" component={Success} />
          <Redirect to="/welcome" />
        </Switch>
      </div>
      <div className={classes.footer}>
        <div>Made with &hearts; in Melbourne.</div>
        <div>@2021 Broccoli & Co. All rights reserved.</div>
      </div>
    </div>
  );
}

export default App;
