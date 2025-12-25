import LoginForm from "@/forms/loginForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as nextAuth from "next-auth/react";
import { signInWithCredentials } from "@/actions/sign-in";

jest.mock("next-auth/react", () => {
  const actual = jest.requireActual("next-auth/react");
  return {
    ...actual,
    useSession: jest.fn(),
  };
});

jest.mock("@/actions/sign-in", () => ({
  signInWithCredentials: jest.fn(),
}));

describe("loginForm", () => {
  const changeFormMock = jest.fn();
  (nextAuth.useSession as jest.Mock).mockReturnValue({
    data: null,
    status: "unauthenticated",
  });

  test("EmailInput should return error message if email incorrect", async () => {
    render(<LoginForm changeForm={changeFormMock} />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    await userEvent.type(emailInput, "hello");
    await userEvent.tab();
    expect(
      await screen.findByText(/The email address must contain the "@" symbol./i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  test("EmailInput should return error message if email null", async () => {
    render(<LoginForm changeForm={changeFormMock} />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    await userEvent.type(emailInput, "hello");
    await userEvent.tab();
    await userEvent.clear(emailInput);
    await userEvent.tab();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  test("PasswordInput should return error message if password less than 6 chars", async () => {
    render(<LoginForm changeForm={changeFormMock} />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
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
    render(<LoginForm changeForm={changeFormMock} />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    await userEvent.type(passwordInput, "hello");
    await userEvent.tab();
    await userEvent.clear(passwordInput);
    await userEvent.tab();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  test("should redirect if login success", async () => {
    (signInWithCredentials as jest.Mock).mockResolvedValue({ error: null });
    render(<LoginForm changeForm={changeFormMock} />);
    await userEvent.type(screen.getByPlaceholderText(/email/i), "a@mail.com");
    await userEvent.type(screen.getByPlaceholderText(/password/i), "123456");

    expect(screen.getByTestId("submit-button")).not.toBeDisabled();
  });
});
