import ResetPasswordPage from "@/app/(auth)/accounts/password/reset/page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ResetPasswordPage", () => {
  test("EmailInput should return error message if email incorrect", async () => {
    render(<ResetPasswordPage />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    await userEvent.type(emailInput, "hello");
    await userEvent.tab();
    expect(
      await screen.findByText(/The email address must contain the "@" symbol./i)
    ).toBeInTheDocument();
  });

  test("EmailInput should return error message if email null", async () => {
    render(<ResetPasswordPage />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    await userEvent.type(emailInput, "hello");
    await userEvent.tab();
    await userEvent.clear(emailInput);
    await userEvent.tab();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });
});
