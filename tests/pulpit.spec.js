import { test, describe, expect } from "@playwright/test";

test.describe("Pulpit", () => {
  test("Quick payment with correct data", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("asdfasdf");
    await page.getByTestId("password-input").fill("password");
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption("2");
    await page.locator("#widget_1_transfer_amount").fill("123");
    await page.locator("#widget_1_transfer_title").fill("pizza");
    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(
      "Przelew wykonany! Chuck Demobankowy - 123,00PLN - pizza"
    );
  });

  test.only("Phone topup with correct data", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("asdfasdf");
    await page.getByTestId("password-input").fill("password");
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_topup_receiver").selectOption("502 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("123");
    await page.locator("#widget_1_topup_agreement").click();
    await page.locator("#execute_phone_btn").click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(
      "Doładowanie wykonane! 123,00PLN na numer 502 xxx xxx"
    );
  });
});
