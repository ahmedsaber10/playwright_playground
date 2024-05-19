import type { Page, Locator } from '@playwright/test';

export class HomePage {
    private CreateAccount: Locator;
  
    constructor(public readonly page: Page) {
    }
  
    async goto() {
      await this.page.goto('https://demo.playwright.dev/todomvc/');
    }
  
    async createAccount() {
      this.CreateAccount = this.page.locator('div').filter({ hasText: /^Create account$/ });
      await this.CreateAccount.click();
    }
}