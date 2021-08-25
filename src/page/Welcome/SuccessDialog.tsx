import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

interface Props {
  onClose: () => void;
}
export function SuccessDialog({ onClose }: Props) {
  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>All done!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You will be one of the first to experience Broccoli & Co. when we
          launch.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
