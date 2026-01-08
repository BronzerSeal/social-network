import { test, expect } from "@playwright/test";

test.describe("user profile tests", () => {
  const testUrl = "http://localhost:3000/user/cmjxzwq170000dsuo9qjvww31";
  const anotherTestAccUrl =
    "http://localhost:3000/user/cmk5ea1c20001ukuodfjk0j2z";
  test("should show error if user not found", async ({ page }) => {
    await page.goto(testUrl + "1");

    await expect(
      await page.getByText(/unable to find user, Try again later/i)
    ).toBeVisible();
  });

  test("should change name and dop Info ", async ({ page }) => {
    //authorization
    page.goto("http://localhost:3000/");

    await page.getByPlaceholder("email").click();
    await page.keyboard.type("test@example.com");

    await page.getByPlaceholder("password").click();
    await page.keyboard.type("123456");

    const submitBtn = page.getByTestId("submit-button");
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    //test
    await page.getByText(/profile/i).click();
    const settingsBtn = await page.getByTestId("settings");
    const usernameInput = await page.getByLabel("username");
    const dopInfoInput = await page.getByLabel("dop info");

    await settingsBtn.click();
    await usernameInput.fill("Example1");
    await dopInfoInput.fill("dop info example");
    await page.getByRole("button", { name: "Send" }).click();

    await expect(page.getByText("Example1").first()).toBeVisible();
    await expect(page.getByText("dop info example")).toBeVisible();

    //return to normal
    await settingsBtn.click();
    await usernameInput.fill("Example");
    await dopInfoInput.clear();
    await page.getByRole("button", { name: "Send" }).click();

    await expect(page.getByText("Example").first()).toBeVisible();
    await expect(page.getByText("Something about you")).toBeVisible();
  });

  test("should subscribe/redirect to another person page/unsubscribe ", async ({
    page,
  }) => {
    //authorization
    page.goto("http://localhost:3000/");

    await page.getByPlaceholder("email").click();
    await page.keyboard.type("test@example.com");

    await page.getByPlaceholder("password").click();
    await page.keyboard.type("123456");

    const submitBtn = page.getByTestId("submit-button");
    await expect(submitBtn).toBeEnabled();
    await Promise.all([
      page.waitForURL("http://localhost:3000/feed"),
      submitBtn.click(),
    ]);

    //subscribe
    page.goto(anotherTestAccUrl);
    await page.getByText(/subscribe/i).click();

    //test redirect from my acc
    await page.getByText(/profile/i).click();
    const avatar = page.getByTestId("friendAvatar").first();
    await expect(avatar).toBeVisible();
    await avatar.click();

    await expect(page).toHaveURL(anotherTestAccUrl);

    //unsubscribe
    await page.getByText(/subscribe/i).click();

    //check
    await page.getByText(/profile/i).click();
    await expect(
      page.getByText("This user is not following anyone yet.")
    ).toBeVisible();
  });
});
