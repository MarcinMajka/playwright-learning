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
    await loginPage.login(username, password);

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
    await pulpitPage.makePayment(option, amount, transferTitle);

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
    await pulpitPage.phoneTopup(option, amount);

    // Assert
    await expect(pulpitPage.messages).toHaveText(expectedMessage);
  });
});
