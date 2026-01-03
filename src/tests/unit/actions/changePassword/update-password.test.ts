import { prismaMock } from "@/../singleton";
import { updatePassword } from "@/actions/changePassword/update-password";
import { saltAndHashPassword } from "@/utils/auth/password";

jest.mock("@/utils/auth/password");

describe("updatePassword", () => {
  it("should return error if not found Token", async () => {
    prismaMock.resetToken.findUnique.mockResolvedValue(null);
    const result = await updatePassword({ token: "22", password: "123456" });
    expect(result).toEqual({ ok: false, error: "Invalid or expired token" });
  });

  it("should return error if Token is old", async () => {
    prismaMock.resetToken.findUnique.mockResolvedValue({
      id: "1",
      token: "aed21",
      userId: "2",
      expiresAt: new Date(Date.now() - 1000),
      createdAt: new Date(),
    });
    const result = await updatePassword({ token: "22", password: "123456" });
    expect(result).toEqual({ ok: false, error: "Invalid or expired token" });
  });

  it("should update password if all OK", async () => {
    const password = "123456";
    prismaMock.resetToken.findUnique.mockResolvedValue({
      id: "1",
      token: "aed21",
      userId: "2",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      createdAt: new Date(),
    });
    // @ts-ignore
    saltAndHashPassword.mockResolvedValue("HASHED");

    const result = await updatePassword({ token: "1", password: password });
    expect(result).toEqual({ ok: true });

    expect(saltAndHashPassword).toHaveBeenCalledWith(password);
    expect(prismaMock.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "2" },
        data: { password: "HASHED" },
      })
    );
    expect(prismaMock.resetToken.delete).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { token: "1" },
      })
    );
  });
});
