import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Payments", () => {
  test.beforeEach(async ({ page }) => {
    const username = "asdfasdf";
    const password = "qweqweqw";

    await page.goto("https://demo-bank.vercel.app/");
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(username);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();
    await page.getByRole("link", { name: "płatności" }).click();
  });

  test("Simple payment", async ({ page }) => {
    // Arrange
    const transferReceiver = "lrgtjnkknbb";
    const transferId = "12 1212 1212 1212 1212 1212 12122";
    const amount = "123";
    const expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${transferReceiver}`;

    // Act
    await page.getByTestId("transfer_receiver").fill(transferReceiver);
    await page.getByTestId("form_account_to").fill(transferId);
    await page.getByTestId("form_amount").fill(amount);
    await page.getByRole("button", { name: "wykonaj przelew" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(expectedMessage);
  });
});
