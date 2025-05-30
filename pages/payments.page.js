import { SideMenuComponent } from "../components/side-menu.component";

export class PaymentsPage {
  constructor(page) {
    this.page = page;
  }

  get sideMenu() {
    return new SideMenuComponent(this.page);
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

  async makeTransfer(receiver, transferAccount, amount) {
    await this.transferReceiver.fill(receiver);
    await this.transferId.fill(transferAccount);
    await this.amount.fill(amount);

    await this.executeButton.click();
    await this.closeButton.click();
  }
}
