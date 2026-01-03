import { test, expect } from "@playwright/test";

test.describe("interact with post tests", () => {
  const randomTestNum = Math.floor(Math.random() * 100000);

  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    page.goto("http://localhost:3000/");

    await page.getByPlaceholder("email").click();
    await page.keyboard.type("test@example.com");

    await page.getByPlaceholder("password").click();
    await page.keyboard.type("123456");

    const submitBtn = page.getByTestId("submit-button");
    await submitBtn.click();
  });

  test("create new post without image", async ({ page }) => {
    await page.getByRole("button", { name: "Create new post" }).click();

    await page.getByRole("textbox", { name: "Write something" }).fill("");
    await page
      .getByRole("textbox", { name: "Write something" })
      .fill(`Test post-${randomTestNum}`);

    await expect(page.getByRole("button", { name: "Submit" })).toBeEnabled();
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText(`Test post-${randomTestNum}`)).toBeVisible();

    const deleteBtn = page.getByTestId("deletePost").first();
    await deleteBtn.click();

    await expect(page.getByText(`Test post-${randomTestNum}`)).toHaveCount(0);
  });

  test("create new post with image", async ({ page }) => {
    await page.getByRole("button", { name: "Create new post" }).click();

    await page.getByRole("textbox", { name: "Write something" }).fill("");
    await page
      .getByRole("textbox", { name: "Write something" })
      .fill(`Test post-${randomTestNum}`);

    //add files
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(["src/tests/e2e/assets/testImg.png"]);

    //submit
    await expect(page.getByRole("button", { name: "Submit" })).toBeEnabled();
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText(`Test post-${randomTestNum}`)).toBeVisible();

    const deleteBtn = page.getByTestId("deletePost").first();
    await deleteBtn.click();

    await expect(page.getByText(`Test post-${randomTestNum}`)).toHaveCount(0);
  });

  test.only("interact with post", async ({ page }) => {
    await page.getByRole("button", { name: "Create new post" }).click();

    await page.getByRole("textbox", { name: "Write something" }).fill("");
    await page
      .getByRole("textbox", { name: "Write something" })
      .fill(`Test post-${randomTestNum}`);

    await expect(page.getByRole("button", { name: "Submit" })).toBeEnabled();
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText(`Test post-${randomTestNum}`)).toBeVisible();

    // heart changes
    const heartContainer = page.getByTestId("postHeart").first();
    const heartCountLocator = heartContainer.locator("p");

    // сколько сейчас лайков
    const beforeLike = parseInt((await heartCountLocator.textContent()) || "0");

    // чек +1 лайк
    await heartContainer.click();
    await expect(heartCountLocator).toHaveText((beforeLike + 1).toString());
    // чек -1 лайк
    await heartContainer.click();
    await expect(heartCountLocator).toHaveText(beforeLike.toString());
    //--------------------------------------------------------------------------------

    //share changes
    const ShareContainer = page.getByTestId("postShare").first();
    const ShareCountLocator = ShareContainer.locator("p");

    // сколько сейчас раз поделились
    const beforeShare = parseInt(
      (await ShareCountLocator.textContent()) || "0"
    );

    // Вместо фактического копирования, просто вызываем toggle для теста
    await ShareContainer.click(); // симулируем отправку
    await expect(ShareCountLocator).toHaveText((beforeShare + 1).toString());

    // Ещё один клик
    await ShareContainer.click();
    await expect(ShareCountLocator).toHaveText((beforeShare + 2).toString());
    //--------------------------------------------------------------------------------

    //comment changes
    const CommentContainer = page.getByTestId("comments").first();
    const CommentCountLocator = CommentContainer.locator("p");

    // сколько сейчас комментов
    const beforeComment = parseInt(
      (await CommentCountLocator.textContent()) || "0"
    );

    //идем писать коммент
    await CommentContainer.click();

    await page.getByPlaceholder("write comment").fill("test comment");

    await expect(page.getByTestId("commentSubmit")).toBeEnabled();
    await page.getByTestId("commentSubmit").click();

    await expect(page.getByText("test comment")).toBeVisible();

    // закрыл модалку через скрытую кнопку
    await page.getByTestId("closeModalForTest").click();

    // проверяем, что модалка закрыта
    await expect(page.getByTestId("customModalContent")).toHaveCount(0);

    await expect(CommentContainer).toHaveText((beforeComment + 1).toString());

    //идем удалять коммент
    await CommentContainer.click();

    await page.getByTestId("CommentDelete").click();

    // закрыл модалку через скрытую кнопку
    await page.getByTestId("closeModalForTest").click();

    // проверяем, что модалка закрыта
    await expect(page.getByTestId("customModalContent")).toHaveCount(0);

    await expect(CommentContainer).toHaveText(beforeComment.toString());

    //--------------------------------------------------------------------------------

    // delete post
    const deleteBtn = page.getByTestId("deletePost").first();
    await deleteBtn.click();

    await expect(page.getByText(`Test post-${randomTestNum}`)).toHaveCount(0);
  });
});
