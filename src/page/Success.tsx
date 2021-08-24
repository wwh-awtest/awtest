import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export function Success() {
  return (
    <div>
      <Button variant="contained" color="primary">
        <Link to="welcome">OK</Link>
      </Button>
    </div>
  );
}
