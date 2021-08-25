import * as React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { InviteDialog } from "../src/page/Welcome/InviteDialog";

describe("Should show error on bad input", () => {
  it("All empty", async function () {
    const { getByText, findByText } = render(
      <InviteDialog onClose={() => {}} onSuccess={() => {}} />
    );
    act(() => {
      fireEvent.click(getByText("Send"));
    });

    const errorMessages = [
      "Full name is required",
      "Email is required",
      "Confirm Email is required",
    ];
    for (const errorMessage of errorMessages) {
      const errorDom = await findByText(errorMessage);
      expect(errorDom.innerHTML).toBe(errorMessage);
    }
  });
});
