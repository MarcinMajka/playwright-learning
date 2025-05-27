import { test, expect } from "@playwright/test";

test.describe("User login to Demobank", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Successful login with correct credentials", async ({ page }) => {
    // Arrange
    const username = "asdfasdf";
    const password = "qweqweqw";
    const expectedUserName = "Jan Demobankowy";

    // Act
    await page.getByTestId("login-input").fill(username);
    await page.getByTestId("password-input").fill(password);
    await page.getByTestId("login-button").click();

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("Unsuccessful login with too short username", async ({ page }) => {
    // Arrange
    const username = "asdf";
    const errorMessage = "identyfikator ma min. 8 znaków";

    // Act
    await page.getByTestId("login-input").fill(username);
    await page.getByTestId("login-input").blur();

    // Assert
    await expect(page.getByTestId("error-login-id")).toHaveText(errorMessage);
  });

  test("Unsuccessful login with too short password", async ({ page }) => {
    // Arrange
    const username = "asdfasdf";
    const incorrectPassword = "qweqweq";
    const errorMessage = "hasło ma min. 8 znaków";

    // Act
    await page.getByTestId("login-input").fill(username);
    await page.getByTestId("password-input").fill(incorrectPassword);
    await page.getByTestId("password-input").blur();

    // Assert
    await expect(page.getByTestId("error-login-password")).toHaveText(
      errorMessage
    );
  });
});
