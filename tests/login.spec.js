import { test, expect } from "@playwright/test";

test.describe("User login to Demobank", () => {
  test.only("Successful login with correct credentials", async ({ page }) => {
    // Arrange
    const url = "https://demo-bank.vercel.app/";
    const username = "asdfasdf";
    const password = "qweqweqw";
    const expectedUserName = "Jan Demobankowy";

    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(username);
    await page.getByTestId("password-input").fill(password);
    await page.getByTestId("login-button").click();

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("Unsuccessful login with too short username", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("asdf");
    await page.getByTestId("login-input").blur();

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków"
    );
  });

  test("Unsuccessful login with too short password", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("asdfasdf");
    await page.getByTestId("password-input").fill("qweqweq");
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków"
    );
  });
});
