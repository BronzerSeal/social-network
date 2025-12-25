import { saltAndHashPassword } from "@/utils/auth/password";
import bcryptjs from "bcryptjs";

jest.mock("bcryptjs");

describe("password", () => {
  test("should return hashed password", async () => {
    // @ts-ignore
    bcryptjs.hash.mockResolvedValue("random password");
    const result = await saltAndHashPassword("a@mail.com");

    expect(result).toBe("random password");
  });
});
