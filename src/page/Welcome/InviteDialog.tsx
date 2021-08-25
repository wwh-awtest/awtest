import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Button } from "../../component/Button";
import { InviteService } from "../../service/InviteService";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    //    padding: "60px 40px",
    "& > *": {
      marginBottom: 10,
    },
  },
  submitButton: {
    marginTop: 40,
  },
});

interface InviteRequest {
  name: string;
  email: string;
  confirmEmail: string;
}

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export function InviteDialog({ onClose, onSuccess }: Props) {
  const classes = useStyles();
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
        onSuccess();
      } else {
        dispatch({ type: "failed", message: _.errorMessage });
      }
    });
  });

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle> Request an Invite</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit} className={classes.form}>
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
              validate: (value) =>
                value === watch("email") || "Email must match",
            })}
            error={errors.confirmEmail != null}
            helperText={errors.confirmEmail?.message}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            loading={state.loading}
            className={classes.submitButton}
          >
            Send
          </Button>
          {state.errorMessage}
        </form>
      </DialogContent>
    </Dialog>
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
