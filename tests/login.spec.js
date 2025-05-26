import { test, expect } from "@playwright/test";

test.describe("User login to Demobank", () => {
  test("Successful login with correct credentials", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("asdfasdf");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("qweqweqw");
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();

    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
  });

  test("Unsuccessful login with too short username", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("asdf");
    await page.getByTestId("password-input").click();
    await page.getByTestId("error-login-id").click();

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków"
    );
  });

  test("Unsuccessful login with too short password", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("asdfasdf");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("qweqweq");
    await page.getByTestId("password-input").blur();
    await page.getByTestId("error-login-password").click();

    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków"
    );
  });
});
