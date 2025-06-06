import { SideMenuComponent } from "../components/side-menu.component";

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  get loginInput() {
    return this.page.getByTestId("login-input");
  }

  get passwordInput() {
    return this.page.getByTestId("password-input");
  }

  get loginButton() {
    return this.page.getByTestId("login-button");
  }

  get loginError() {
    return this.page.getByTestId("error-login-id");
  }

  get passwordError() {
    return this.page.getByTestId("error-login-password");
  }

  get userName() {
    return this.page.getByTestId("user-name");
  }

  async login(username, password) {
    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
