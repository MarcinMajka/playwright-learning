import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Pulpit", () => {
  test.beforeEach(async ({ page }) => {
    const username = "asdfasdf";
    const password = "qweqweqw";

    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(username);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();
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
    await page.locator("#widget_1_transfer_receiver").selectOption(option);
    await page.locator("#widget_1_transfer_amount").fill(amount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(expectedMessage);
    await expect(page.locator("#money_value")).toHaveText(`${expectedBalance}`);
  });

  test("Phone topup with correct data", async ({ page }) => {
    // Arrange
    const option = "502 xxx xxx";
    const amount = "123";
    const expectedMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${option}`;

    // Act
    await page.locator("#widget_1_topup_receiver").selectOption(option);
    await page.locator("#widget_1_topup_amount").fill(amount);
    await page.locator("#widget_1_topup_agreement").click();
    await page.locator("#execute_phone_btn").click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(expectedMessage);
  });
});
