import * as React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { InviteDialog } from "../src/page/Welcome/InviteDialog";

beforeAll(() => {
  global.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve("success") })
    );
  return jest.spyOn(window, "fetch");
});
afterAll(() => {
  //@ts-ignore Set in beforeAll
  global.fetch.mockClear();
  //@ts-ignore Set in beforeAll
  delete global.fetch;
});

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

  it("Short full name", async function () {
    const { getByText, getByPlaceholderText, findByText } = render(
      <InviteDialog onClose={() => {}} onSuccess={() => {}} />
    );

    const fullNameInput = getByPlaceholderText("Please enter full name");
    act(() => {
      fireEvent.change(fullNameInput, { target: { value: "ss" } });
    });

    act(() => {
      fireEvent.click(getByText("Send"));
    });

    const errorMessage = "Full name must be as least 3 characters";
    const errorDom = await findByText(errorMessage);
    expect(errorDom.innerHTML).toBe(errorMessage);
  });

  it("Invalid email", async function () {
    const { getByText, getByPlaceholderText, findByText } = render(
      <InviteDialog onClose={() => {}} onSuccess={() => {}} />
    );

    const emailInput = getByPlaceholderText("Please enter your email");
    act(() => {
      fireEvent.change(emailInput, { target: { value: "ss" } });
    });

    act(() => {
      fireEvent.click(getByText("Send"));
    });

    const errorMessage = "Entered value does not match email format";
    const errorDom = await findByText(errorMessage);
    expect(errorDom.innerHTML).toBe(errorMessage);
  });

  it("Email not matched", async function () {
    const { getByText, getByPlaceholderText, findByText } = render(
      <InviteDialog onClose={() => {}} onSuccess={() => {}} />
    );

    const emailInput = getByPlaceholderText("Please enter your email");
    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "proper@email.com" },
      });
    });

    const confirmEmailInput = getByPlaceholderText("Please confirm your email");
    act(() => {
      fireEvent.change(confirmEmailInput, {
        target: { value: "prope@email.com" },
      });
    });

    act(() => {
      fireEvent.click(getByText("Send"));
    });

    const errorMessage = "Email must match";
    const errorDom = await findByText(errorMessage);
    expect(errorDom.innerHTML).toBe(errorMessage);
  });
});

describe("Should allow valid input to submit", () => {
  it("Form should submit", async () => {
    const { getByText, getByPlaceholderText, findByText } = render(
      <InviteDialog onClose={() => {}} onSuccess={() => {}} />
    );

    const fullNameInput = getByPlaceholderText("Please enter full name");
    act(() => {
      fireEvent.change(fullNameInput, {
        target: { value: "Full name" },
      });
    });

    const emailInput = getByPlaceholderText("Please enter your email");
    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "proper@email.com" },
      });
    });

    const confirmEmailInput = getByPlaceholderText("Please confirm your email");
    act(() => {
      fireEvent.change(confirmEmailInput, {
        target: { value: "proper@email.com" },
      });
    });

    act(() => {
      fireEvent.click(getByText("Send"));
    });

    const submitButton = await findByText("Send");

    expect(global.fetch).toBeCalled();
  });
});
