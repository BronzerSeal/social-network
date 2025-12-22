import { signInWithCredentials } from "@/actions/sign-in";

jest.mock("@/utils/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("sign-in tests", () => {
  test("workable", async () => {
    const enter = await signInWithCredentials("a@mail.com", "123456");
    expect(enter).not.toBeNull();
  });
});
