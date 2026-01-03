import { prismaMock } from "@/../singleton";
import { sendResetLink } from "@/actions/changePassword/send-reset-link-change-password";
import crypto from "crypto";
import { Resend } from "resend";

jest.mock("crypto", () => ({
  randomBytes: () => ({
    toString: () => "fixed-token",
  }),
}));

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn(),
    },
  })),
}));

describe("send-reset-link-change-password", () => {
  const email = "a@mail.com";
  //   const resend = new Resend(process.env.RESEND_API_KEY!);

  it("should return if user not found", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const result = await sendResetLink("not-real@gmail.com");
    expect(result).toEqual({
      code: 400,
      error: "This email is not registered.",
    });
  });

  it("should return error if user created by Google", async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: "1",
      name: "a",
      password: "123456",
      email: email,
      emailVerified: null,
      image: null,
      provider: "google",
    });

    const result = await sendResetLink(email);
    expect(result).toEqual({
      success: false,
      error:
        "You created an account using Google, so you won't be able to use this page.",
      code: 400,
    });
  });

  it("should send email if all OK", async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: "1",
      name: "a",
      password: "123456",
      email: email,
      emailVerified: null,
      image: null,
      provider: "credentials",
    });

    await sendResetLink(email);

    expect(prismaMock.resetToken.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          token: "fixed-token",
          userId: "1",
        }),
      })
    );
  });
});
