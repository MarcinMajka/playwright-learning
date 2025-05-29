export const PaymentsPage = class {
  constructor(page) {
    this.page = page;
  }

  get transferReceiver() {
    return this.page.getByTestId("transfer_receiver");
  }

  get transferId() {
    return this.page.getByTestId("form_account_to");
  }

  get amount() {
    return this.page.getByTestId("form_amount");
  }

  get closeButton() {
    return this.page.getByTestId("close-button");
  }

  get executeButton() {
    return this.page.locator("#execute_btn");
  }

  get messages() {
    return this.page.locator("#show_messages");
  }
};

// await page.getByRole("button", { name: "wykonaj przelew" }).click();
