import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";
import { PaymentsPage } from "../pages/payments.page";

test.describe("Payments", () => {
  test.beforeEach(async ({ page }) => {
    const username = "asdfasdf";
    const password = "qweqweqw";

    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(username);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.paymentsLink.click();
  });

  test("Simple payment", async ({ page }) => {
    // Arrange
    const transferReceiver = "lrgtjnkknbb";
    const transferId = "12 1212 1212 1212 1212 1212 12122";
    const amount = "123";
    const expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${transferReceiver}`;

    // Act
    const paymentsPage = new PaymentsPage(page);
    await paymentsPage.transferReceiver.fill(transferReceiver);
    await paymentsPage.transferId.fill(transferId);
    await paymentsPage.amount.fill(amount);
    await paymentsPage.executeButton.click();
    await paymentsPage.closeButton.click();

    // Assert
    await expect(paymentsPage.messages).toHaveText(expectedMessage);
  });
});
