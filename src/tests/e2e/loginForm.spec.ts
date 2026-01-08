import { test, expect } from "@playwright/test";

test.describe("loginForm e2e tests", () => {
  test("authorization test", async ({ page }) => {
    page.goto("http://localhost:3000/");

    await page.getByPlaceholder("email").click();
    await page.keyboard.type("test@example.com");

    await page.getByPlaceholder("password").click();
    await page.keyboard.type("123456");

    const submitBtn = page.getByTestId("submit-button");
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    await expect(page.getByText("Login successful!")).toBeAttached();
    await expect(page.getByText("Create new post")).toBeVisible();
  });
});
