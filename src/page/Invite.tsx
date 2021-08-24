import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { InviteService } from "../service/InviteService";

interface InviteRequest {
  name: string;
  email: string;
  confirmEmail: string;
}

export function Invite() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InviteRequest>();
  const onSubmit = handleSubmit(({ name, email }) => {
    InviteService.requestInvite({ name, email }).then((_) => {
      history.push("/success");
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Full name"
        {...register("name", {
          required: "Full name is required",
          minLength: {
            value: 3,
            message: "Full name must be as least 3 characters",
          },
        })}
        error={errors.name != null}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        })}
        error={errors.email != null}
        helperText={errors.email?.message}
      />
      <TextField
        label="Confirm Email"
        {...register("confirmEmail", {
          required: "Confirm Email is required",
          validate: (value) => value === watch("email") || "Email must match",
        })}
        error={errors.confirmEmail != null}
        helperText={errors.confirmEmail?.message}
      />
      <Button variant="contained" color="primary" type="submit">
        Send
      </Button>
    </form>
  );
}
