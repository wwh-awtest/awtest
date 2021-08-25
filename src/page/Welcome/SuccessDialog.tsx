import React from "react";
import { Button, Dialog, DialogActions } from "@material-ui/core";

interface Props {
  onClose: () => void;
}
export function SuccessDialog({ onClose }: Props) {
  return (
    <Dialog open onClose={onClose}>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
