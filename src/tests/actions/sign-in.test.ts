// signInWithCredentials.test.ts
import { signInWithCredentials } from "@/actions/sign-in";
import { isCreateByGoogle } from "@/utils/auth/isCreateByGoogle";
import { signIn } from "next-auth/react";

// Мокаем внешние зависимости
jest.mock("@/utils/auth/isCreateByGoogle");
jest.mock("next-auth/react");

describe("signInWithCredentials", () => {
  const email = "a@mail.com";
  const password = "123456";

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should return error if account created by Google", async () => {
    // @ts-ignore
    isCreateByGoogle.mockResolvedValue(true);

    const result = await signInWithCredentials(email, password);
    expect(result).toEqual({ error: "GOOGLE_ACCOUNT" });
    expect(isCreateByGoogle).toHaveBeenCalledWith(email);
  });

  it("should call next-auth signIn if not a Google account", async () => {
    // @ts-ignore
    isCreateByGoogle.mockResolvedValue(false);

    const mockSignInResult = { ok: true, error: null };
    // @ts-ignore
    signIn.mockResolvedValue(mockSignInResult);

    const result = await signInWithCredentials(email, password);

    expect(isCreateByGoogle).toHaveBeenCalledWith(email);
    expect(signIn).toHaveBeenCalledWith("credentials", {
      email,
      password,
      redirect: false,
    });
    expect(result).toEqual(mockSignInResult);
  });

  it("should return error if something wrong", async () => {
    // @ts-ignore
    isCreateByGoogle.mockResolvedValue(false);
    // @ts-ignore
    signIn.mockRejectedValue(new Error("Sign in failed"));

    const result = await signInWithCredentials(email, password);
    expect(result).toEqual({ error: new Error("Sign in failed") });
  });
});
