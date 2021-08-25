import React from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { InviteDialog } from "./InviteDialog";
import { SuccessDialog } from "./SuccessDialog";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export function Welcome() {
  const [dialog, setDialog] = React.useState<null | "invite" | "success">(null);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3">A better way</Typography>
      <Typography variant="h3" gutterBottom>
        to enjoy everyday
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        Be the first to know hen we launch
      </Typography>
      <Button
        onClick={() => setDialog("invite")}
        color="primary"
        variant="contained"
      >
        Request an invite
      </Button>
      {dialog === "invite" && (
        <InviteDialog
          onClose={() => setDialog(null)}
          onSuccess={() => setDialog("success")}
        />
      )}
      {dialog === "success" && (
        <SuccessDialog onClose={() => setDialog(null)} />
      )}
    </div>
  );
}
