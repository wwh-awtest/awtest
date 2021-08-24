import React from "react";
import MuiButton, { ButtonProps } from "@material-ui/core/Button";
import { CircularProgress, makeStyles } from "@material-ui/core";

interface Props extends ButtonProps {
  loading?: boolean;
}

const useStyles = makeStyles({
  loading: {
    position: "absolute",
  },
});

export function Button({ loading, disabled, children, ...rest }: Props) {
  const classes = useStyles();

  return (
    <MuiButton disabled={disabled || loading} {...rest}>
      {children}
      {loading && <CircularProgress className={classes.loading} />}
    </MuiButton>
  );
}
