import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export function Welcome() {
  return (
    <div>
      <Button>
        <Link to="/invite">Request an invite</Link>
      </Button>
    </div>
  );
}
