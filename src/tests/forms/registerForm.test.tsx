import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "@/forms/registerForm";

jest.mock("next-auth/react", () => {
  const actual = jest.requireActual("next-auth/react");
  return {
    ...actual,
    useSession: jest.fn(),
  };
});

describe("registerForm", () => {
  const changeFormMock = jest.fn();

  test("EmailInput should return error message if email incorrect", async () => {
    render(<RegisterForm changeForm={changeFormMock} />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    await userEvent.type(emailInput, "hello");
    await userEvent.tab();
    expect(
      await screen.findByText(/The email address must contain the "@" symbol./i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  test("EmailInput should return error message if email null", async () => {
    render(<RegisterForm changeForm={changeFormMock} />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    await userEvent.type(emailInput, "hello");
    await userEvent.tab();
    await userEvent.clear(emailInput);
    await userEvent.tab();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  test("PasswordInput should return error message if password less than 6 chars", async () => {
    render(<RegisterForm changeForm={changeFormMock} />);
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
    render(<RegisterForm changeForm={changeFormMock} />);
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
    render(<RegisterForm changeForm={changeFormMock} />);
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
    render(<RegisterForm changeForm={changeFormMock} />);
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

  test("nameInput should return error message if it null", async () => {
    render(<RegisterForm changeForm={changeFormMock} />);
    const nameInput = screen.getByPlaceholderText("name");
    await userEvent.type(nameInput, "hello");
    await userEvent.tab();
    await userEvent.clear(nameInput);
    await userEvent.tab();
    expect(await screen.findByText("The name is required")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  test("should activate submitButton if all OK", async () => {
    render(<RegisterForm changeForm={changeFormMock} />);

    await userEvent.type(screen.getByPlaceholderText(/email/i), "a@mail.com");
    await userEvent.type(screen.getByPlaceholderText("password"), "123456");
    await userEvent.type(
      screen.getByPlaceholderText("confirm password"),
      "123456"
    );
    await userEvent.type(screen.getByPlaceholderText("name"), "A");

    expect(screen.getByTestId("submit-button")).not.toBeDisabled();
  });
});
