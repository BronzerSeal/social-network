import { registerUser } from "@/actions/auth/register";
import { saltAndHashPassword } from "@/utils/auth/password";
import { prismaMock } from "@/../singleton";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("@/utils/auth/password");

describe("registerUser", () => {
  const user = {
    email: "a@mail.com",
    password: "123456",
    confirmPassword: "123456",
    name: "a",
  };

  it("should return the passwords don't match", async () => {
    const response = await registerUser({
      email: "a@mail.com",
      password: "123456",
      confirmPassword: "123",
      name: "a",
    });
    expect(response).toEqual({ error: "The passwords don't match" });
  });

  it("should return password length is too small", async () => {
    const response = await registerUser({
      email: "a@mail.com",
      password: "1234",
      confirmPassword: "1234",
      name: "a",
    });
    expect(response).toEqual({
      error: "The password must be at least 6 characters long.",
    });
  });

  it("should return error if user already exist", async () => {
    // @ts-ignore
    saltAndHashPassword.mockResolvedValue("2313423");

    prismaMock.user.findUnique.mockResolvedValue({
      id: "1",
      name: "a",
      password: "123456",
      email: "a@mail.com",
      emailVerified: null,
      image: null,
      provider: "credentials",
    });

    await expect(registerUser(user)).resolves.toEqual({
      error: "A user with this email already exists.",
    });
  });

  it("should create new user if all OK", async () => {
    // @ts-ignore
    saltAndHashPassword.mockResolvedValue("2313423");

    prismaMock.user.create.mockResolvedValue({
      id: "1",
      email: "a@mail.com",
      password: "123456",
      name: "a",
      provider: "credentials",
      emailVerified: null,
      image: null,
    });

    await expect(registerUser(user)).resolves.toEqual({
      email: "a@mail.com",
      name: "a",
      password: "123456",
      provider: "credentials",
      emailVerified: null,
      id: "1",
      image: null,
    });
    expect(saltAndHashPassword).toHaveBeenCalledWith("123456");
  });
});
