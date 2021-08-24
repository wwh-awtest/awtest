import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { InviteService } from "../service/InviteService";
import { Button } from "../component/Button";

interface InviteRequest {
  name: string;
  email: string;
  confirmEmail: string;
}

export function Invite() {
  const history = useHistory();
  const [state, dispatch] = useReducer(inviteRequestReducer, {
    loading: false,
    errorMessage: null,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InviteRequest>();
  const onSubmit = handleSubmit(({ name, email }) => {
    dispatch({ type: "request" });
    InviteService.requestInvite({ name, email }).then((_) => {
      if (_ === "Registered") {
        dispatch({ type: "success" });
        history.push("/success");
      } else {
        dispatch({ type: "failed", message: _.errorMessage });
      }
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
      <Button
        variant="contained"
        color="primary"
        type="submit"
        loading={state.loading}
      >
        Send
      </Button>
      {state.errorMessage}
    </form>
  );
}

interface InviteRequestState {
  loading: boolean;
  errorMessage: "success" | string | null;
}

type Action =
  | { type: "request" }
  | { type: "success" }
  | { type: "failed"; message: string };
function inviteRequestReducer(
  state: InviteRequestState,
  action: Action
): InviteRequestState {
  switch (action.type) {
    case "request":
      return { loading: true, errorMessage: null };
    case "success":
      return { loading: false, errorMessage: null };
    case "failed":
      return { loading: false, errorMessage: action.message };
  }
}
