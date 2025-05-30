import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Pulpit", () => {
  let pulpitPage;

  test.beforeEach(async ({ page }) => {
    const username = "asdfasdf";
    const password = "qweqweqw";

    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(username);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();

    pulpitPage = new PulpitPage(page);
  });

  test("Quick payment with correct data", async ({ page }) => {
    // Arrange
    const option = "2";
    const amount = "123";
    const transferTitle = "pizza";
    const expectedReceiverName = "Chuck Demobankowy";
    const expectedMessage = `Przelew wykonany! ${expectedReceiverName} - ${amount},00PLN - ${transferTitle}`;
    const initialBalance = await page.locator("#money_value").innerText();
    const expectedBalance = Number(initialBalance) - Number(amount);

    // Act
    await pulpitPage.paymentReceiver.selectOption(option);
    await pulpitPage.paymentAmount.fill(amount);
    await pulpitPage.paymentTitle.fill(transferTitle);
    await pulpitPage.executeButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.messages).toHaveText(expectedMessage);
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });

  test("Phone topup with correct data", async ({ page }) => {
    // Arrange
    const option = "502 xxx xxx";
    const amount = "123";
    const expectedMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${option}`;

    // Act
    await pulpitPage.phoneTopupReceiver.selectOption(option);
    await pulpitPage.phoneTopupAmount.fill(amount);
    await pulpitPage.topupAgreement.click();
    await pulpitPage.executePhoneButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.messages).toHaveText(expectedMessage);
  });
});
