import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

interface InviteRequest {
  name: string;
  email: string;
  confirmEmail: string;
}

export function Invite() {
  const history = useHistory();
  const { register, handleSubmit } = useForm<InviteRequest>();
  const onSubmit = handleSubmit((request) => {
    history.push("/success");
  });
  return (
    <form onSubmit={onSubmit}>
      <TextField label="Full name" {...register("name")} />
      <TextField label="Email" {...register("email")} />
      <TextField label="Confirm Email" {...register("confirmEmail")} />
      <Button variant="contained" color="primary" type="submit">
        Send
      </Button>
    </form>
  );
}
