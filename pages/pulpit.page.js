export const PulpitPage = class {
  constructor(page) {
    this.page = page;
  }

  get paymentsLink() {
    return this.page.locator("#payments_btn");
  }
};
