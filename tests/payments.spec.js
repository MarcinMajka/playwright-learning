import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { PaymentsPage } from "../pages/payments.page";

test.describe("Payments", () => {
  let paymentsPage;

  test.beforeEach(async ({ page }) => {
    const username = "asdfasdf";
    const password = "qweqweqw";

    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);

    paymentsPage = new PaymentsPage(page);
    await paymentsPage.sideMenu.paymentsLink.click();
  });

  test(
    "Simple payment",
    { tag: ["@payments", "@integration"] },
    async ({ page }) => {
      // Arrange
      const transferReceiver = "lrgtjnkknbb";
      const transferId = "12 1212 1212 1212 1212 1212 12122";
      const amount = "123";
      const expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${transferReceiver}`;

      // Act
      await paymentsPage.makeTransfer(transferReceiver, transferId, amount);

      // Assert
      await expect(paymentsPage.messages).toHaveText(expectedMessage);
    }
  );
});
