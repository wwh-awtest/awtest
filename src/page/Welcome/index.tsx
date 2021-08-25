import React from "react";
import { Button } from "@material-ui/core";
import { InviteDialog } from "./InviteDialog";
import { SuccessDialog } from "./SuccessDialog";

export function Welcome() {
  const [dialog, setDialog] = React.useState<null | "invite" | "success">(null);

  return (
    <div>
      <Button onClick={() => setDialog("invite")}>Request an invite</Button>
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
