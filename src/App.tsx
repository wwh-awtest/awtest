import React from "react";
import { Welcome } from "./page/Welcome";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    },
    header: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: "20px 80px",
    },
    body: {
      flex: 1,
    },
    footer: {
      padding: "20px 80px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  };
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h2">BROCCOLI & CO.</Typography>
      </div>
      <div className={classes.body}>
        <Welcome />
      </div>
      <div className={classes.footer}>
        <Typography>Made with &hearts; in Melbourne.</Typography>
        <Typography variant="subtitle1">
          @2021 Broccoli & Co. All rights reserved.
        </Typography>
      </div>
    </div>
  );
}

export default App;
