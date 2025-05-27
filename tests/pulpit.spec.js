import { test, describe, expect } from "@playwright/test";

test.describe("Pulpit", () => {
  test("Quick payment with correct data", async ({ page }) => {
    // Arrange
    const url = "https://demo-bank.vercel.app/";
    const username = "asdfasdf";
    const password = "qweqweqw";

    const option = "2";
    const amount = "123";
    const transferTitle = "pizza";
    const expectedReceiverName = "Chuck Demobankowy";

    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(username);
    await page.getByTestId("password-input").fill(password);
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption(option);
    await page.locator("#widget_1_transfer_amount").fill(amount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(
      `Przelew wykonany! ${expectedReceiverName} - ${amount},00PLN - ${transferTitle}`
    );
  });

  test("Phone topup with correct data", async ({ page }) => {
    // Arrange
    const url = "https://demo-bank.vercel.app/";
    const username = "asdfasdf";
    const password = "qweqweqw";

    const option = "502 xxx xxx";
    const amount = "123";

    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(username);
    await page.getByTestId("password-input").fill(password);
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_topup_receiver").selectOption(option);
    await page.locator("#widget_1_topup_amount").fill(amount);
    await page.locator("#widget_1_topup_agreement").click();
    await page.locator("#execute_phone_btn").click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(
      `Doładowanie wykonane! ${amount},00PLN na numer ${option}`
    );
  });
});
