export class SideMenuComponent {
  constructor(page) {
    this.page = page;
  }

  get paymentsLink() {
    return this.page.locator("#payments_btn");
  }
}
