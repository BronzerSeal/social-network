import NewPasswordForm from "@/forms/newPasswordForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as nextNavigation from "next/navigation";

const pushMock = jest.fn();
const getMock = jest.fn().mockReturnValue("fake-token");

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: getMock,
  }),
}));

describe("newPasswordForm", () => {
  beforeEach(() => {
    pushMock.mockClear();
    getMock.mockClear();
  });

  test("PasswordInput should return error message if password less than 6 chars", async () => {
    render(<NewPasswordForm />);
    const passwordInput = screen.getByPlaceholderText("password");
    await userEvent.type(passwordInput, "hello");
    await userEvent.tab();
    expect(
      await screen.findByText(
        "The password must be at least 6 characters long."
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  test("PasswordInput should return error message if password null", async () => {
    render(<NewPasswordForm />);
    const passwordInput = screen.getByPlaceholderText("password");
    await userEvent.type(passwordInput, "hello");
    await userEvent.tab();
    await userEvent.clear(passwordInput);
    await userEvent.tab();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  test("confirmPasswordInput should return error message if it null", async () => {
    render(<NewPasswordForm />);
    const confirmInput = screen.getByPlaceholderText("confirm password");
    await userEvent.type(confirmInput, "hello");
    await userEvent.tab();
    await userEvent.clear(confirmInput);
    await userEvent.tab();
    expect(
      await screen.findByText("This field is required")
    ).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  test("confirmPasswordInput should return error message if it's not same", async () => {
    render(<NewPasswordForm />);
    await userEvent.type(screen.getByPlaceholderText("password"), "123456");
    await userEvent.type(
      screen.getByPlaceholderText("confirm password"),
      "1234567"
    );
    await userEvent.tab();

    expect(
      await screen.findByText("The password is not the same")
    ).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  test("should activate submitButton if all OK", async () => {
    render(<NewPasswordForm />);

    await userEvent.type(screen.getByPlaceholderText("password"), "123456");
    await userEvent.type(
      screen.getByPlaceholderText("confirm password"),
      "123456"
    );

    expect(screen.getByTestId("submit-button")).not.toBeDisabled();
  });
});
