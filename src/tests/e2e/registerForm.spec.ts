import { test, expect } from "@playwright/test";

test.describe("registerForm e2e tests", () => {
  const randomEmail = `test${Math.floor(Math.random() * 100000)}@gmail.com`;

  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://localhost:3000/");
  });

  test("redirect to sign in", async ({ page }) => {
    await expect(page).toHaveURL("http://localhost:3000/");

    await page.getByRole("button", { name: "Create" }).click();

    const registerText = page.locator("p", {
      hasText: "Already have an account?",
    });

    await expect(registerText).toBeVisible();
    await expect(registerText).toHaveText(/Already have an account\?/);
  });

  test("Register new account", async ({ page }) => {
    await expect(page).toHaveURL("http://localhost:3000/");

    await page.getByRole("button", { name: "Create" }).click();

    await page.getByPlaceholder("email").fill(randomEmail);
    await page
      .getByRole("textbox", { name: "password", exact: true })
      .fill("123456");
    await page
      .getByRole("textbox", { name: "confirm password" })
      .fill("123456");
    await page.getByPlaceholder("name").fill(`test-${randomEmail}`);

    //btn
    await expect(page.getByRole("button", { name: "Create" })).toBeEnabled();
    await page.getByRole("button", { name: "Create" }).click();

    //redirect to auth
    await expect(
      page.getByText("User is registered successfully!")
    ).toBeAttached();
    const redirectToAuth = page.locator("p", {
      hasText: "Don't have an account?",
    });
    await expect(redirectToAuth).toBeVisible();
  });
});
