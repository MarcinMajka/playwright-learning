import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";

test.describe("User login to Demobank", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new LoginPage(page);
  });

  test(
    "Successful login with correct credentials",
    {
      tag: ["@login", "@smoke"],
      annotation: {
        type: "Happy path",
        description: "Basic happy path test for login",
      },
    },
    async ({ page }) => {
      // Arrange
      const username = loginData.userID;
      const password = loginData.password;
      const expectedUserName = "Jan Demobankowy";

      // Act
      await loginPage.login(username, password);

      // Assert
      await expect(loginPage.userName).toHaveText(expectedUserName);
    }
  );

  test(
    "Unsuccessful login with too short username",
    { tag: ["@login", "@unhappy_path"] },
    async ({ page }) => {
      // Arrange
      const username = "asdf";
      const errorMessage = "identyfikator ma min. 8 znaków";

      // Act
      await loginPage.loginInput.fill(username);
      await loginPage.loginInput.blur();

      // Assert
      await expect(loginPage.loginError).toHaveText(errorMessage);
    }
  );

  test(
    "Unsuccessful login with too short password",
    { tag: ["@login", "@unhappy_path"] },
    async ({ page }) => {
      // Arrange
      const username = "asdfasdf";
      const incorrectPassword = "qweqweq";
      const errorMessage = "hasło ma min. 8 znaków";

      // Act
      await loginPage.loginInput.fill(username);
      await loginPage.passwordInput.fill(incorrectPassword);
      await loginPage.passwordInput.blur();

      // Assert
      await expect(loginPage.passwordError).toHaveText(errorMessage);
    }
  );
});
