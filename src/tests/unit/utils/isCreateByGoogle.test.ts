import { isCreateByGoogle } from "@/utils/auth/isCreateByGoogle";
import { prismaMock } from "../../../../singleton";

describe("isCreateByGoogle", () => {
  test("should return true if create by Google", async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: "1",
      email: "a@mail.com",
      password: "123456",
      name: "a",
      provider: "google",
      emailVerified: null,
      image: null,
    });
    const result = await isCreateByGoogle("a@mail.com");
    expect(result).toBe(true);
  });

  test("should return false if create by credentials", async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: "1",
      email: "a@mail.com",
      password: "123456",
      name: "a",
      provider: "credentials",
      emailVerified: null,
      image: null,
    });
    const result = await isCreateByGoogle("a@mail.com");
    expect(result).toBe(false);
  });
});
