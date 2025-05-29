export const PulpitPage = class {
  constructor(page) {
    this.page = page;
  }

  get paymentsLink() {
    return this.page.locator("#payments_btn");
  }

  get paymentReceiver() {
    return this.page.locator("#widget_1_transfer_receiver");
  }

  get paymentAmount() {
    return this.page.locator("#widget_1_transfer_amount");
  }

  get paymentTitle() {
    return this.page.locator("#widget_1_transfer_title");
  }

  get executeButton() {
    return this.page.locator("#execute_btn");
  }

  get closeButton() {
    return this.page.getByTestId("close-button");
  }

  get phoneTopupReceiver() {
    return this.page.locator("#widget_1_topup_receiver");
  }

  get phoneTopupAmount() {
    return this.page.locator("#widget_1_topup_amount");
  }

  get messages() {
    return this.page.locator("#show_messages");
  }

  get moneyValue() {
    return this.page.locator("#money_value");
  }

  get topupReceiver() {
    return this.page.locator("#widget_1_topup_receiver");
  }

  get topupAmount() {
    return this.page.locator("#widget_1_topup_amount");
  }

  get topupAgreement() {
    return this.page.locator("#widget_1_topup_agreement");
  }

  get executePhoneButton() {
    return this.page.locator("#execute_phone_btn");
  }
};
